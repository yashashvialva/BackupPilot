import { NextResponse } from "next/server";
import { getTenantContext } from "@/lib/tenant";

export async function GET(request: Request) {
  try {
    const { customerDb: prisma, awsClients, connection } = await getTenantContext(request);

    const userId = request.headers.get("x-user-id");
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 1. Active policies count
    const activePolicies = await prisma.backupPolicy.count({
      where: {
        status: "Active",
        target: {
          user_id: userId,
        },
      },
    });

    // 2. Failed backups count
    const failedJobs = await prisma.backupJob.count({
      where: {
        status: "Failed",
        policy: {
          target: {
            user_id: userId,
          },
        },
      },
    });

    // 3. Storage used (sum of all user snapshot sizes)
    const snapshotsSelect = await prisma.snapshot.findMany({
      where: {
        job: {
          policy: {
            target: {
              user_id: userId,
            },
          },
        },
      },
      select: {
        size: true,
      },
    });
    const storageUsedGB = snapshotsSelect.reduce((acc, curr) => acc + curr.size, 0);

    // 4. Latest Snapshot details
    const latestSnapshot = await prisma.snapshot.findFirst({
      where: {
        job: {
          policy: {
            target: {
              user_id: userId,
            },
          },
        },
      },
      orderBy: { created_at: "desc" },
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

    // 5. Active restore jobs count
    const activeRestores = await prisma.restoreJob.count({
      where: {
        status: { in: ["Pending", "Running"] },
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
    });

    // 6. Total Targets
    const totalTargets = await prisma.backupTarget.count({
      where: { user_id: userId },
    });

    return NextResponse.json({
      success: true,
      summary: {
        activePolicies,
        failedJobs,
        storageUsedGB,
        activeRestores,
        totalTargets,
        latestSnapshot: latestSnapshot
          ? {
              snapshot_id: latestSnapshot.snapshot_id,
              size: latestSnapshot.size,
              created_at: latestSnapshot.created_at,
              policy_name: latestSnapshot.job.policy.name,
              target_name: latestSnapshot.job.policy.target.name,
            }
          : null,
      },
    });
  } catch (err: any) {
    console.error("GET /api/dashboard/summary Error:", err);
    if (err.message?.includes("AWS Connection not found") || err.message?.includes("AssumeRole") || err.message?.includes("Secrets Manager") || err.name === "CredentialsProviderError") {
      return NextResponse.json({ error: "AWS connection unavailable or revoked", code: "TENANT_CONNECTION_FAILED" }, { status: 503 });
    }
    return NextResponse.json({ error: err.message || "Failed to load dashboard summary." }, { status: 500 });
  }
}
