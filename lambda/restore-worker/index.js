const {
  EC2Client,
  CreateVolumeCommand,
  DescribeInstancesCommand,
  DescribeVolumesCommand,
  AttachVolumeCommand,
} = require("@aws-sdk/client-ec2");
const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns");
const { Client } = require("pg");
const crypto = require("crypto");

const DATABASE_URL = process.env.DATABASE_URL;
const SNS_TOPIC_ARN = process.env.SNS_TOPIC_ARN;
const AWS_REGION_CUSTOM = process.env.AWS_REGION_CUSTOM || "us-east-1";

async function publishSNSAlert(subject, message) {
  if (!SNS_TOPIC_ARN) {
    console.error("Missing SNS_TOPIC_ARN env variable.");
    return;
  }
  const sns = new SNSClient({ region: AWS_REGION_CUSTOM });
  try {
    await sns.send(new PublishCommand({
      TopicArn: SNS_TOPIC_ARN,
      Subject: subject,
      Message: message,
    }));
    console.log("SNS Alert published successfully.");
  } catch (err) {
    console.error("SNS Publish Error:", err);
  }
}

exports.handler = async (event) => {
  console.log("Restore Worker Triggered. Event:", JSON.stringify(event));

  const { restoreJobId: restore_job_id, snapshotId: snapshot_id, region, instanceId: instance_id, attachToInstance: attach_to_instance } = event;

  if (!restore_job_id || !snapshot_id || !region) {
    console.error("Missing required parameters in event.");
    return { statusCode: 400, body: "Missing parameters" };
  }

  let ec2Client = null;
  let db = null;
  let restoreJobData = null;

  try {
    // 1. Connect to Aurora PostgreSQL
    db = new Client({
      connectionString: DATABASE_URL,
      ssl: DATABASE_URL && (DATABASE_URL.includes("localhost") || DATABASE_URL.includes("127.0.0.1"))
        ? false
        : { rejectUnauthorized: false }
    });
    await db.connect();

    // 2. Fetch User & Policy details via restore_job_id
    const detailsQuery = `
      SELECT r.snapshot_id, r.status,
             s.job_id,
             j.policy_id,
             p.name AS policy_name, p.email_alerts,
             t.user_id, t.volume_id AS original_volume_id,
             u.email AS user_email
      FROM restore_jobs r
      JOIN snapshots s ON r.snapshot_id = s.snapshot_id
      JOIN backup_jobs j ON s.job_id = j.id
      JOIN backup_policies p ON j.policy_id = p.id
      JOIN backup_targets t ON p.target_id = t.id
      JOIN users u ON t.user_id = u.id
      WHERE r.id = $1
    `;
    const detailsRes = await db.query(detailsQuery, [restore_job_id]);

    if (detailsRes.rows.length === 0) {
      throw new Error(`Restore job not found for ID: ${restore_job_id}`);
    }

    restoreJobData = detailsRes.rows[0];

    // 3. Update restore job status to Running in database
    console.log(`Reporting RUNNING status for restore job: ${restore_job_id}`);
    await db.query(
      `UPDATE restore_jobs 
       SET status = 'Running' 
       WHERE id = $1`,
      [restore_job_id]
    );

    // 4. Log Audit record
    await db.query(
      `INSERT INTO audit_logs (id, actor, action, entity_type, entity_id, details, created_at) 
       VALUES ($1, 'system/lambda', 'RESTORE_JOB_RUNNING', 'RestoreJob', $2, $3, NOW())`,
      [crypto.randomUUID(), restore_job_id, JSON.stringify({ status: "Running" })]
    );

    // 5. Setup EC2 Client
    ec2Client = new EC2Client({ region });
    let az = `${region}a`; // Default AZ

    // 6. Find AZ of Target Instance to avoid mismatch during AttachVolume
    if (attach_to_instance && instance_id) {
      console.log(`Describing target instance ${instance_id} to resolve Availability Zone...`);
      const instRes = await ec2Client.send(
        new DescribeInstancesCommand({
          InstanceIds: [instance_id],
        })
      );

      if (instRes.Reservations && instRes.Reservations[0]?.Instances[0]) {
        az = instRes.Reservations[0].Instances[0].Placement.AvailabilityZone;
        console.log(`Resolved AZ: ${az}`);
      } else {
        throw new Error(`Target instance ${instance_id} not found.`);
      }
    }

    // 7. Create Volume from Snapshot
    console.log(`Creating EBS volume in AZ=${az} from snapshot=${snapshot_id}`);
    const createVolRes = await ec2Client.send(
      new CreateVolumeCommand({
        SnapshotId: snapshot_id,
        AvailabilityZone: az,
        VolumeType: "gp3",
        TagSpecifications: [
          {
            ResourceType: "volume",
            Tags: [
              { Key: "BackupPilot-Restore-Job-Id", Value: restore_job_id },
              { Key: "BackupPilot-Source-Snapshot", Value: snapshot_id },
              { Key: "Name", Value: `bp-restored-${restore_job_id.substring(0, 8)}` },
            ],
          },
        ],
      })
    );

    const volumeId = createVolRes.VolumeId;
    console.log(`Volume creation initiated. ID: ${volumeId}`);

    // 8. Poll DescribeVolumes until volume is available
    let volState = createVolRes.State;
    const startTime = Date.now();
    const maxPollTimeMs = 10 * 60 * 1000; // 10 minutes
    const pollIntervalMs = 10000; // 10 seconds

    while (volState === "creating" || volState === "uninitialized") {
      if (Date.now() - startTime > maxPollTimeMs) {
        throw new Error("Polling timed out waiting for EBS volume creation.");
      }

      console.log(`Polling volume ${volumeId} state... Current: ${volState}`);
      await new Promise((resolve) => setTimeout(resolve, pollIntervalMs));

      const volRes = await ec2Client.send(
        new DescribeVolumesCommand({
          VolumeIds: [volumeId],
        })
      );

      if (volRes.Volumes && volRes.Volumes.length > 0) {
        volState = volRes.Volumes[0].State;
      } else {
        throw new Error(`Volume ${volumeId} not found during polling.`);
      }
    }

    if (volState !== "available") {
      throw new Error(`EBS Volume created but entered state: ${volState}`);
    }

    console.log(`Volume ${volumeId} is now available.`);

    // 9. Optional: Attach Volume to Target Instance
    if (attach_to_instance && instance_id) {
      const device = "/dev/sdf";
      console.log(`Attaching volume ${volumeId} to instance ${instance_id} at device ${device}...`);

      const attachRes = await ec2Client.send(
        new AttachVolumeCommand({
          VolumeId: volumeId,
          InstanceId: instance_id,
          Device: device,
        })
      );

      let attachState = attachRes.State;
      const attachStartTime = Date.now();

      while (attachState === "attaching") {
        if (Date.now() - attachStartTime > maxPollTimeMs) {
          throw new Error("Polling timed out waiting for EBS volume attachment.");
        }

        console.log(`Polling volume ${volumeId} attachment state... Current: ${attachState}`);
        await new Promise((resolve) => setTimeout(resolve, pollIntervalMs));

        const volRes = await ec2Client.send(
          new DescribeVolumesCommand({
            VolumeIds: [volumeId],
          })
        );

        if (volRes.Volumes && volRes.Volumes[0]?.Attachments?.length > 0) {
          attachState = volRes.Volumes[0].Attachments[0].State;
        } else {
          throw new Error(`Volume ${volumeId} or its attachments not found.`);
        }
      }

      if (attachState !== "attached") {
        throw new Error(`Volume attachment failed with state: ${attachState}`);
      }

      console.log(`Volume ${volumeId} successfully attached to instance ${instance_id}`);
    }

    // 10. Update restore job status to Completed in database
    console.log(`Reporting SUCCESS for restore job: ${restore_job_id}`);
    await db.query(
      `UPDATE restore_jobs 
       SET status = 'Completed', completed_at = NOW(), new_volume_id = $1 
       WHERE id = $2`,
      [volumeId, restore_job_id]
    );

    // 11. Create In-app Notification
    const msg = `Volume restoration completed successfully! New EBS Volume: ${volumeId}.`;
    await db.query(
      `INSERT INTO notifications (id, user_id, type, message, status, created_at) 
       VALUES ($1, $2, 'RESTORE_SUCCESS', $3, 'Sent', NOW())`,
      [crypto.randomUUID(), restoreJobData.user_id, msg]
    );

    // 12. Log Audit record
    await db.query(
      `INSERT INTO audit_logs (id, actor, action, entity_type, entity_id, details, created_at) 
       VALUES ($1, 'system/lambda', 'RESTORE_JOB_SUCCESS', 'RestoreJob', $2, $3, NOW())`,
      [crypto.randomUUID(), restore_job_id, JSON.stringify({ snapshot_id, new_volume_id: volumeId })]
    );

    // 13. Publish SNS Notification
    if (restoreJobData.email_alerts) {
      const subject = `[BackupPilot Alert] Volume Restoration Completed`;
      const snsBody = `Restore Job Status Update

Snapshot ID: ${snapshot_id}
Original Policy: ${restoreJobData.policy_name}
Status: Completed
New Volume ID: ${volumeId}
Completed At: ${new Date().toISOString()}

Check restore details: ${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/restore`;

      await publishSNSAlert(subject, snsBody);
    }

    return { statusCode: 200, body: `Restore Job ${restore_job_id} Completed Successfully.` };
  } catch (error) {
    console.error("Restore Worker Execution Failed:", error);

    // Report failure directly in database
    if (restore_job_id && db) {
      try {
        const errMsg = error.message || String(error);
        await db.query(
          `UPDATE restore_jobs 
           SET status = 'Failed', completed_at = NOW() 
           WHERE id = $1`,
          [restore_job_id]
        );

        if (restoreJobData) {
          const failMsg = `Volume restoration failed: ${errMsg}.`;
          
          await db.query(
            `INSERT INTO notifications (id, user_id, type, message, status, created_at) 
             VALUES ($1, $2, 'RESTORE_FAILED', $3, 'Sent', NOW())`,
            [crypto.randomUUID(), restoreJobData.user_id, failMsg]
          );

          await db.query(
            `INSERT INTO audit_logs (id, actor, action, entity_type, entity_id, details, created_at) 
             VALUES ($1, 'system/lambda', 'RESTORE_JOB_FAILED', 'RestoreJob', $2, $3, NOW())`,
            [crypto.randomUUID(), restore_job_id, JSON.stringify({ snapshot_id, error_message: errMsg })]
          );

          if (restoreJobData.email_alerts) {
            const subject = `[BackupPilot Alert] Volume Restoration Failed`;
            const snsBody = `Restore Job Status Update

Snapshot ID: ${snapshot_id}
Original Policy: ${restoreJobData.policy_name}
Status: Failed
Error: ${errMsg}
Completed At: ${new Date().toISOString()}

Check restore details: ${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/restore`;

            await publishSNSAlert(subject, snsBody);
          }
        }
      } catch (dbErr) {
        console.error("Failed to record restore failure in database:", dbErr);
      }
    }

    return { statusCode: 500, body: `Restore Job Failed: ${error.message}` };
  } finally {
    if (db) {
      await db.end();
    }
  }
};
