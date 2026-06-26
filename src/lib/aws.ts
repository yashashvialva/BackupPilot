import { DescribeInstancesCommand, DescribeVolumesCommand, CreateSnapshotCommand, CreateTagsCommand, CreateVolumeCommand, DescribeSnapshotsCommand } from "@aws-sdk/client-ec2";
import { CreateScheduleCommand, UpdateScheduleCommand, DeleteScheduleCommand } from "@aws-sdk/client-scheduler";
import { PublishCommand } from "@aws-sdk/client-sns";
import { InvokeCommand } from "@aws-sdk/client-lambda";
import { PrismaClient as CustomerPrismaClient } from "@prisma/customer-client";

const mockMode = process.env.MOCK_AWS === "true";

export async function validateEC2Target(
  awsClients: any,
  targetRegion: string,
  instanceId: string,
  volumeId: string
): Promise<{ success: boolean; error?: string }> {
  if (mockMode) {
    console.log(`[MOCK AWS] Validating EC2 target: instance=${instanceId}, volume=${volumeId} in region=${targetRegion}`);
    if (instanceId.startsWith("i-") && volumeId.startsWith("vol-")) {
      return { success: true };
    }
    return { success: false, error: "Mock validation: Instance ID must start with 'i-' and Volume ID must start with 'vol-'" };
  }

  try {
    // The provided awsClients.ec2 is already configured for the tenant's region via getTenantContext
    await awsClients.ec2.send(
      new DescribeInstancesCommand({
        InstanceIds: [instanceId],
      })
    );

    await awsClients.ec2.send(
      new DescribeVolumesCommand({
        VolumeIds: [volumeId],
      })
    );

    return { success: true };
  } catch (err: any) {
    console.error("EC2 Target Validation Error:", err);
    return { success: false, error: err.message || "Failed to validate EC2 target resources in AWS." };
  }
}

export async function syncEventBridgeSchedule(
  awsClients: any,
  connection: any, // AwsConnection object
  params: {
    policyId: string;
    userId: string;
    volumeId: string;
    targetName: string;
    policyName: string;
    region: string;
    frequency: string;
    active: boolean;
  }
): Promise<{ success: boolean; scheduleName: string; error?: string }> {
  const scheduleName = `bp-policy-${params.policyId}`;
  
  if (mockMode) {
    console.log(`[MOCK AWS] Syncing EventBridge schedule ${scheduleName}: frequency=${params.frequency}, state=${params.active ? "ENABLED" : "DISABLED"}`);
    return { success: true, scheduleName };
  }

  // The lambdas are prefixed with the stack name in CF template (e.g. StackName-BackupWorker)
  const lambdaArn = `arn:aws:lambda:${connection.region}:${connection.account_id}:function:${connection.stack_name}-BackupWorker`;
  // We need the role for EventBridge to invoke lambda
  const roleArn = `arn:aws:iam::${connection.account_id}:role/${connection.stack_name}-SchedulerRole`;

  try {
    const inputPayload = JSON.stringify({
      policyId: params.policyId,
      userId: params.userId,
      volumeId: params.volumeId,
      targetName: params.targetName,
      policyName: params.policyName,
      region: params.region,
    });

    const scheduleState = params.active ? "ENABLED" : "DISABLED";

    try {
      await awsClients.scheduler.send(
        new UpdateScheduleCommand({
          Name: scheduleName,
          FlexibleTimeWindow: { Mode: "OFF" },
          ScheduleExpression: params.frequency,
          Target: {
            Arn: lambdaArn,
            RoleArn: roleArn,
            Input: inputPayload,
          },
          State: scheduleState,
        })
      );
    } catch (updateErr: any) {
      if (updateErr.name === "ResourceNotFoundException" || updateErr.message?.includes("not found")) {
        await awsClients.scheduler.send(
          new CreateScheduleCommand({
            Name: scheduleName,
            FlexibleTimeWindow: { Mode: "OFF" },
            ScheduleExpression: params.frequency,
            Target: {
              Arn: lambdaArn,
              RoleArn: roleArn,
              Input: inputPayload,
            },
            State: scheduleState,
          })
        );
      } else {
        throw updateErr;
      }
    }

    return { success: true, scheduleName };
  } catch (err: any) {
    console.error("Scheduler Sync Error:", err);
    return { success: false, scheduleName, error: err.message || "Failed to sync EventBridge schedule." };
  }
}

export async function deleteEventBridgeSchedule(awsClients: any, policyId: string): Promise<{ success: boolean; error?: string }> {
  const scheduleName = `bp-policy-${policyId}`;
  
  if (mockMode) {
    console.log(`[MOCK AWS] Deleting EventBridge schedule ${scheduleName}`);
    return { success: true };
  }

  try {
    await awsClients.scheduler.send(
      new DeleteScheduleCommand({
        Name: scheduleName,
      })
    );
    return { success: true };
  } catch (err: any) {
    if (err.name === "ResourceNotFoundException" || err.message?.includes("not found")) {
      return { success: true };
    }
    console.error("Scheduler Delete Error:", err);
    return { success: false, error: err.message || "Failed to delete EventBridge schedule." };
  }
}

export async function triggerRestoreLambda(
  awsClients: any,
  customerDb: CustomerPrismaClient,
  connection: any,
  params: {
    restoreJobId: string;
    snapshotId: string;
    region: string;
    instanceId: string;
    attachToInstance: boolean;
  }
): Promise<{ success: boolean; error?: string }> {
  if (mockMode) {
    console.log(`[MOCK AWS] Triggering Restore Lambda for job=${params.restoreJobId}, snapshot=${params.snapshotId}`);
    
    // Simulate restoration asynchronously in local mock environment
    setTimeout(async () => {
      try {
        await customerDb.restoreJob.update({
          where: { id: params.restoreJobId },
          data: { status: "Running" },
        });

        await new Promise((r) => setTimeout(r, 4000));

        const newVolumeId = "vol-mockrestored-" + Math.random().toString(36).substring(2, 10);
        await customerDb.restoreJob.update({
          where: { id: params.restoreJobId },
          data: {
            status: "Completed",
            completed_at: new Date(),
            new_volume_id: newVolumeId,
          },
        });

        // Notifications
        const restoreJob = await customerDb.restoreJob.findUnique({
          where: { id: params.restoreJobId },
          include: {
            snapshot: { include: { job: { include: { policy: { include: { target: { include: { user: true } } } } } } } },
          },
        });

        if (restoreJob) {
          const user = restoreJob.snapshot.job.policy.target.user;
          await customerDb.notification.create({
            data: {
              user_id: user.id,
              type: "RESTORE_SUCCESS",
              message: `Volume restoration completed successfully! New EBS Volume: ${newVolumeId}.`,
              status: "Sent",
            },
          });
          
          await customerDb.auditLog.create({
            data: {
              actor: "system/lambda-mock",
              action: "RESTORE_JOB_SUCCESS",
              entity_type: "RestoreJob",
              entity_id: params.restoreJobId,
              details: { snapshot_id: params.snapshotId, new_volume_id: newVolumeId } as any,
            }
          });
        }
      } catch (err) {
        console.error("[MOCK AWS] Failed to run simulated restore:", err);
      }
    }, 1000);

    return { success: true };
  }

  try {
    await customerDb.restoreJob.update({
      where: { id: params.restoreJobId },
      data: { status: "Running" },
    });

    const snapDesc = await awsClients.ec2.send(new DescribeSnapshotsCommand({ SnapshotIds: [params.snapshotId] }));
    const volumeSize = snapDesc.Snapshots?.[0]?.VolumeSize || 8;

    const volRes = await awsClients.ec2.send(new CreateVolumeCommand({
      SnapshotId: params.snapshotId,
      AvailabilityZone: `${params.region || connection.region}a`,
      VolumeType: 'gp3',
      Size: volumeSize,
    }));
    const newVolumeId = volRes.VolumeId;

    await awsClients.ec2.send(new CreateTagsCommand({
      Resources: [newVolumeId],
      Tags: [
        { Key: 'BackupPilot:RestoredFrom', Value: params.snapshotId },
        { Key: 'BackupPilot:RestoreJobId', Value: params.restoreJobId },
        { Key: 'Name', Value: `bp-restore-${params.restoreJobId.substring(0, 8)}` },
      ],
    }));

    await customerDb.restoreJob.update({
      where: { id: params.restoreJobId },
      data: {
        status: "Completed",
        completed_at: new Date(),
        new_volume_id: newVolumeId,
      },
    });

    return { success: true };
  } catch (err: any) {
    console.error("Direct Restore Execution Error:", err);
    return { success: false, error: err.message || "Failed to execute restore." };
  }
}

export async function publishSNSAlert(awsClients: any, connection: any, subject: string, message: string): Promise<{ success: boolean; error?: string }> {
  if (mockMode) {
    console.log(`[MOCK AWS SNS] Subject: ${subject}\nMessage: ${message}`);
    return { success: true };
  }

  const topicArn = `arn:aws:sns:${connection.region}:${connection.account_id}:${connection.stack_name}-Alerts`;

  try {
    await awsClients.sns.send(
      new PublishCommand({
        TopicArn: topicArn,
        Subject: subject,
        Message: message,
      })
    );
    return { success: true };
  } catch (err: any) {
    console.error("SNS Publish Error:", err);
    return { success: false, error: err.message || "Failed to send SNS alert." };
  }
}

export async function triggerBackupLambda(
  awsClients: any,
  customerDb: any,
  connection: any,
  params: {
    policyId: string;
    userId: string;
    volumeId: string;
    targetName: string;
    policyName: string;
    region: string;
  }
): Promise<{ success: boolean; error?: string }> {
  if (mockMode) {
    console.log(`[MOCK AWS] Triggering Backup Lambda for policy=${params.policyId}`);
    
    setTimeout(async () => {
      try {
        const job = await customerDb.backupJob.create({
          data: { policy_id: params.policyId, status: "Running" },
        });

        await new Promise((r) => setTimeout(r, 4000));

        const snapshotId = "snap-mock-" + Math.random().toString(36).substring(2, 10);
        
        await customerDb.snapshot.create({
          data: { snapshot_id: snapshotId, job_id: job.id, size: 8, state: "completed" },
        });

        await customerDb.backupJob.update({
          where: { id: job.id },
          data: { status: "Success", completed_at: new Date() },
        });

        const policy = await customerDb.backupPolicy.findUnique({
          where: { id: params.policyId },
          include: { target: { include: { user: true } } },
        });

        if (policy) {
          const user = policy.target.user;
          await customerDb.notification.create({
            data: { user_id: user.id, type: "BACKUP_SUCCESS", message: `Backup completed successfully! Snapshot: ${snapshotId}.`, status: "Sent" },
          });
          
          await customerDb.auditLog.create({
            data: { actor: "system/lambda-mock", action: "BACKUP_JOB_SUCCESS", entity_type: "BackupJob", entity_id: job.id, details: { snapshot_id: snapshotId } as any }
          });
        }
      } catch (err) {
        console.error("[MOCK AWS] Failed to run simulated backup:", err);
      }
    }, 1000);

    return { success: true };
  }

  try {
    // 1. Create Job in Database
    const job = await customerDb.backupJob.create({
      data: { policy_id: params.policyId, status: "Running" },
    });

    // 2. Create EC2 Snapshot
    const snapRes = await awsClients.ec2.send(new CreateSnapshotCommand({
      VolumeId: params.volumeId,
      Description: `BackupPilot | Policy: ${params.policyName} | Job: ${job.id}`,
    }));
    const snapshotId = snapRes.SnapshotId;

    // 3. Tag the Snapshot
    await awsClients.ec2.send(new CreateTagsCommand({
      Resources: [snapshotId],
      Tags: [
        { Key: 'BackupPilot:PolicyId', Value: params.policyId },
        { Key: 'BackupPilot:JobId', Value: job.id },
        { Key: 'Name', Value: `bp-${params.targetName}-${new Date().toISOString().split('T')[0]}` },
      ],
    }));

    // 4. Update Database Records
    await customerDb.snapshot.create({
      data: { snapshot_id: snapshotId, job_id: job.id, size: 20, state: "completed" },
    });

    await customerDb.backupJob.update({
      where: { id: job.id },
      data: { status: "Success", completed_at: new Date() },
    });

    return { success: true };
  } catch (err: any) {
    console.error("Direct Backup Execution Error:", err);
    return { success: false, error: err.message || "Failed to execute backup." };
  }
}

