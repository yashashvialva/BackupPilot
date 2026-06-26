const { EC2Client, CreateSnapshotCommand, DescribeSnapshotsCommand, DeleteSnapshotCommand } = require("@aws-sdk/client-ec2");
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
  console.log("Backup Worker Triggered. Event:", JSON.stringify(event));

  const { policy_id } = event;
  if (!policy_id) {
    console.error("Missing policy_id in event.");
    return { statusCode: 400, body: "Missing policy_id" };
  }

  const jobId = crypto.randomUUID();
  let ec2Client = null;
  let db = null;

  try {
    // 1. Connect to Aurora PostgreSQL
    db = new Client({
      connectionString: DATABASE_URL,
      ssl: DATABASE_URL && (DATABASE_URL.includes("localhost") || DATABASE_URL.includes("127.0.0.1"))
        ? false
        : { rejectUnauthorized: false }
    });
    await db.connect();

    // 2. Fetch policy, target and user details
    const policyQuery = `
      SELECT p.id AS policy_id, p.status AS policy_status, p.retention_days, p.email_alerts, p.name AS policy_name,
             t.volume_id, t.instance_id, t.region AS target_region,
             u.id AS user_id, u.email AS user_email
      FROM backup_policies p
      JOIN backup_targets t ON p.target_id = t.id
      JOIN users u ON t.user_id = u.id
      WHERE p.id = $1
    `;
    const policyRes = await db.query(policyQuery, [policy_id]);
    
    if (policyRes.rows.length === 0) {
      throw new Error(`Policy not found for ID: ${policy_id}`);
    }

    const policy = policyRes.rows[0];

    if (policy.policy_status === "Deleted") {
      throw new Error(`Cannot trigger backup for a deleted policy.`);
    }

    // 3. Initialize BackupJob in database
    console.log(`Initializing backup job ${jobId} in database...`);
    await db.query(
      `INSERT INTO backup_jobs (id, policy_id, started_at, status) 
       VALUES ($1, $2, NOW(), 'Running')`,
      [jobId, policy_id]
    );

    // 4. Start EC2 snapshot
    ec2Client = new EC2Client({ region: policy.target_region });
    console.log(`Triggering EC2 CreateSnapshot for volume=${policy.volume_id} in region=${policy.target_region}`);

    const createCmd = new CreateSnapshotCommand({
      VolumeId: policy.volume_id,
      Description: `BackupPilot automated snapshot. Policy: ${policy_id}, Job: ${jobId}`,
      TagSpecifications: [
        {
          ResourceType: "snapshot",
          Tags: [
            { Key: "BackupPilot-Policy-Id", Value: policy_id },
            { Key: "BackupPilot-Job-Id", Value: jobId },
            { Key: "Name", Value: `bp-snap-${jobId.substring(0, 8)}` },
          ],
        },
      ],
    });

    const snapshotRes = await ec2Client.send(createCmd);
    const snapshotId = snapshotRes.SnapshotId;
    console.log(`Snapshot initiated. ID: ${snapshotId}`);

    // 5. Poll DescribeSnapshots until completion
    let state = snapshotRes.State;
    let volumeSize = snapshotRes.VolumeSize;
    const startTime = Date.now();
    const maxPollTimeMs = 13 * 60 * 1000; // 13 minutes (respect 15-min Lambda timeout)
    const pollIntervalMs = 15000; // Poll every 15 seconds

    while (state === "pending") {
      if (Date.now() - startTime > maxPollTimeMs) {
        throw new Error("Polling timed out. Snapshot creation is taking longer than 13 minutes.");
      }

      console.log(`Polling snapshot state for ${snapshotId}... Current state: ${state}`);
      await new Promise((resolve) => setTimeout(resolve, pollIntervalMs));

      const describeCmd = new DescribeSnapshotsCommand({
        SnapshotIds: [snapshotId],
      });
      const describeRes = await ec2Client.send(describeCmd);
      if (describeRes.Snapshots && describeRes.Snapshots.length > 0) {
        state = describeRes.Snapshots[0].State;
        volumeSize = describeRes.Snapshots[0].VolumeSize;
      } else {
        throw new Error(`Snapshot ${snapshotId} not found during polling.`);
      }
    }

    console.log(`Snapshot terminal state reached: ${state}`);

    if (state === "completed") {
      // 6. Save snapshot record in database
      console.log(`Saving snapshot ${snapshotId} to database...`);
      await db.query(
        `INSERT INTO snapshots (snapshot_id, job_id, size, state, created_at) 
         VALUES ($1, $2, $3, $4, NOW())`,
        [snapshotId, jobId, parseInt(volumeSize || 0), "completed"]
      );

      // 7. Update BackupJob status to Success
      await db.query(
        `UPDATE backup_jobs 
         SET status = 'Success', completed_at = NOW() 
         WHERE id = $1`,
        [jobId]
      );

      // 8. Apply Retention (Delete expired snapshots in AWS EC2 and database)
      const retentionCutoff = new Date();
      retentionCutoff.setDate(retentionCutoff.getDate() - policy.retention_days);

      console.log(`Calculating retention. Cutoff date: ${retentionCutoff.toISOString()}`);
      const expiredRes = await db.query(
        `SELECT s.snapshot_id 
         FROM snapshots s
         JOIN backup_jobs j ON s.job_id = j.id
         WHERE j.policy_id = $1 AND s.created_at < $2`,
        [policy_id, retentionCutoff]
      );

      const expiredSnapshotIds = expiredRes.rows.map((r) => r.snapshot_id);
      if (expiredSnapshotIds.length > 0) {
        console.log(`Starting cleanup of ${expiredSnapshotIds.length} expired snapshots:`, expiredSnapshotIds);
        for (const expSnapId of expiredSnapshotIds) {
          try {
            console.log(`Deleting expired snapshot ${expSnapId} in EC2...`);
            await ec2Client.send(new DeleteSnapshotCommand({ SnapshotId: expSnapId }));
            
            // Delete from database
            await db.query(`DELETE FROM snapshots WHERE snapshot_id = $1`, [expSnapId]);
            console.log(`Successfully deleted snapshot ${expSnapId}`);
          } catch (deleteErr) {
            console.error(`Failed to delete expired snapshot ${expSnapId}:`, deleteErr.message || deleteErr);
          }
        }
      }

      // 9. Create In-app Notification
      const msg = `Backup completed successfully for policy "${policy.policy_name}" (Volume: ${policy.volume_id}).`;
      await db.query(
        `INSERT INTO notifications (id, user_id, type, message, status, created_at) 
         VALUES ($1, $2, 'BACKUP_SUCCESS', $3, 'Sent', NOW())`,
        [crypto.randomUUID(), policy.user_id, msg]
      );

      // 10. Log audit record
      await db.query(
        `INSERT INTO audit_logs (id, actor, action, entity_type, entity_id, details, created_at) 
         VALUES ($1, 'system/lambda', 'RUN_BACKUP_SUCCESS', 'BackupJob', $2, $3, NOW())`,
        [crypto.randomUUID(), jobId, JSON.stringify({ policy_id, snapshot_id: snapshotId })]
      );

      // 11. Publish SNS notification
      if (policy.email_alerts) {
        const subject = `[BackupPilot Alert] Backup Job Success - ${policy.policy_name}`;
        const snsBody = `Backup Job Result Notification

Policy: ${policy.policy_name}
Instance: ${policy.instance_id}
Volume: ${policy.volume_id}
Status: Success
Snapshot ID: ${snapshotId}
Size: ${volumeSize} GB
Completed At: ${new Date().toISOString()}

Access your console here to verify: ${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}`;
        
        await publishSNSAlert(subject, snsBody);
      }

      return { statusCode: 200, body: `Backup Job ${jobId} Completed Successfully.` };
    } else {
      throw new Error(`EC2 snapshot creation resolved to state: ${state}`);
    }
  } catch (error) {
    console.error("Backup Worker Execution Failed:", error);

    // If job was initialized, report failure directly in database
    if (jobId && db) {
      try {
        const errMsg = error.message || String(error);
        await db.query(
          `UPDATE backup_jobs 
           SET status = 'Failed', completed_at = NOW(), error_message = $1 
           WHERE id = $2`,
          [errMsg, jobId]
        );

        // Fetch policy and user details for notification
        const policyRes = await db.query(
          `SELECT p.email_alerts, p.name AS policy_name,
                  t.volume_id, t.instance_id,
                  u.id AS user_id
           FROM backup_policies p
           JOIN backup_targets t ON p.target_id = t.id
           JOIN users u ON t.user_id = u.id
           WHERE p.id = $1`,
          [policy_id]
        );

        if (policyRes.rows.length > 0) {
          const policy = policyRes.rows[0];
          const failMsg = `Backup failed for policy "${policy.policy_name}": ${errMsg}.`;
          
          await db.query(
            `INSERT INTO notifications (id, user_id, type, message, status, created_at) 
             VALUES ($1, $2, 'BACKUP_FAILED', $3, 'Sent', NOW())`,
            [crypto.randomUUID(), policy.user_id, failMsg]
          );

          await db.query(
            `INSERT INTO audit_logs (id, actor, action, entity_type, entity_id, details, created_at) 
             VALUES ($1, 'system/lambda', 'RUN_BACKUP_FAILED', 'BackupJob', $2, $3, NOW())`,
            [crypto.randomUUID(), jobId, JSON.stringify({ policy_id, error_message: errMsg })]
          );

          if (policy.email_alerts) {
            const subject = `[BackupPilot Alert] Backup Job Failed - ${policy.policy_name}`;
            const snsBody = `Backup Job Result Notification

Policy: ${policy.policy_name}
Instance: ${policy.instance_id}
Volume: ${policy.volume_id}
Status: Failed
Reason: ${errMsg}
Completed At: ${new Date().toISOString()}

Access your console here to verify: ${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}`;
            await publishSNSAlert(subject, snsBody);
          }
        }
      } catch (reportErr) {
        console.error("Failed to record job failure in database:", reportErr);
      }
    }

    return { statusCode: 500, body: `Backup Job Failed: ${error.message}` };
  } finally {
    if (db) {
      await db.end();
    }
  }
};
