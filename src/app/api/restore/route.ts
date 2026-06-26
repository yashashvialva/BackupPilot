import { NextResponse } from "next/server";
import { getTenantContext } from "@/lib/tenant";
import { triggerRestoreLambda } from "@/lib/aws";

export async function GET(request: Request) {
  try {
    const { customerDb: prisma, awsClients, connection } = await getTenantContext(request);

    const userId = request.headers.get("x-user-id");
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const restoreJobs = await prisma.restoreJob.findMany({
      where: {
        snapshot: {
          job: {
            policy: {
              target: {
                user_id: userId,
              },
            },
          },
        },
      },
      include: {
        snapshot: {
          include: {
            job: {
              include: {
                policy: {
                  include: {
                    target: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: { started_at: "desc" },
    });

    return NextResponse.json({ success: true, restoreJobs });
  } catch (err: any) {
    console.error("GET /api/restore Error:", err);
    if (err.message?.includes("AWS Connection not found") || err.message?.includes("AssumeRole") || err.message?.includes("Secrets Manager") || err.name === "CredentialsProviderError") {
      return NextResponse.json({ error: "AWS connection unavailable or revoked", code: "TENANT_CONNECTION_FAILED" }, { status: 503 });
    }
    return NextResponse.json({ error: err.message || "Failed to retrieve restore list." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { customerDb: prisma, awsClients, connection } = await getTenantContext(request);

    const userId = request.headers.get("x-user-id");
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { snapshot_id, attach_to_instance } = await request.json();

    if (!snapshot_id) {
      return NextResponse.json({ error: "Snapshot ID is required." }, { status: 400 });
    }

    // Verify snapshot ownership
    const snapshot = await prisma.snapshot.findUnique({
      where: { snapshot_id },
      include: {
        job: {
          include: {
            policy: {
              include: {
                target: true,
              },
            },
          },
        },
      },
    });

    if (!snapshot || snapshot.job.policy.target.user_id !== userId) {
      return NextResponse.json({ error: "Snapshot not found or unauthorized." }, { status: 404 });
    }

    // Create restore job in database
    const restoreJob = await prisma.restoreJob.create({
      data: {
        snapshot_id,
        status: "Pending",
      },
    });

    // Fire restore worker Lambda
    const target = snapshot.job.policy.target;
    const triggerRes = await triggerRestoreLambda(awsClients, prisma, connection, {
      restoreJobId: restoreJob.id,
      snapshotId: snapshot_id,
      region: target.region,
      instanceId: target.instance_id,
      attachToInstance: !!attach_to_instance,
    });

    if (!triggerRes.success) {
      // Mark as failed if execution fails
      const failedJob = await prisma.restoreJob.update({
        where: { id: restoreJob.id },
        data: {
          status: "Failed",
          completed_at: new Date(),
        },
      });
      return NextResponse.json({ error: triggerRes.error || "Failed to trigger restore Lambda." }, { status: 500 });
    }

    // Audit Log
    await prisma.auditLog.create({ data: { 
      actor: userId,
      action: "INITIATE_RESTORE",
      entity_type: "RestoreJob",
      entity_id: restoreJob.id,
      details: { snapshot_id, instance_id: target.instance_id, attach_to_instance },
     } });

    return NextResponse.json({ success: true, restoreJob });
  } catch (err: any) {
    console.error("POST /api/restore Error:", err);
    if (err.message?.includes("AWS Connection not found") || err.message?.includes("AssumeRole") || err.message?.includes("Secrets Manager") || err.name === "CredentialsProviderError") {
      return NextResponse.json({ error: "AWS connection unavailable or revoked", code: "TENANT_CONNECTION_FAILED" }, { status: 503 });
    }
    return NextResponse.json({ error: err.message || "Failed to start restore." }, { status: 500 });
  }
}
