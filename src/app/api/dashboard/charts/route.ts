import { NextResponse } from "next/server";
import { getTenantContext } from "@/lib/tenant";

export async function GET(request: Request) {
  try {
    const { customerDb: prisma, awsClients, connection } = await getTenantContext(request);

    const userId = request.headers.get("x-user-id");
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Generate dates for the last 7 days (YYYY-MM-DD)
    const dates: string[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      dates.push(d.toISOString().split("T")[0]);
    }

    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - 7);
    cutoffDate.setHours(0, 0, 0, 0);

    // Get jobs in the last 7 days
    const jobs = await prisma.backupJob.findMany({
      where: {
        policy: {
          target: {
            user_id: userId,
          },
        },
        started_at: { gte: cutoffDate },
      },
      select: {
        status: true,
        started_at: true,
      },
    });

    // Get all snapshots to compute cumulative storage growth
    const snapshots = await prisma.snapshot.findMany({
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
        created_at: true,
      },
      orderBy: { created_at: "asc" },
    });

    // 1. Success Rate & Failed Jobs by Day
    const jobStats = dates.map((date) => {
      const dayJobs = jobs.filter((j) => j.started_at.toISOString().split("T")[0] === date);
      const success = dayJobs.filter((j) => j.status === "Success").length;
      const failed = dayJobs.filter((j) => j.status === "Failed").length;
      const running = dayJobs.filter((j) => j.status === "Running").length;
      return {
        date,
        success,
        failed,
        running,
        total: dayJobs.length,
      };
    });

    // 2. Storage Growth over time (cumulative)
    // First, sum snapshot sizes created before the 7-day cutoff period
    const startingStorage = snapshots
      .filter((s) => s.created_at < cutoffDate)
      .reduce((sum, s) => sum + s.size, 0);

    let cumulativeStorage = startingStorage;

    const storageGrowth = dates.map((date) => {
      const daySnapshots = snapshots.filter((s) => s.created_at.toISOString().split("T")[0] === date);
      const added = daySnapshots.reduce((sum, s) => sum + s.size, 0);
      cumulativeStorage += added;
      return {
        date,
        added,
        total: cumulativeStorage,
      };
    });

    return NextResponse.json({
      success: true,
      jobStats,
      storageGrowth,
    });
  } catch (err: any) {
    console.error("GET /api/dashboard/charts Error:", err);
    if (err.message?.includes("AWS Connection not found") || err.message?.includes("AssumeRole") || err.message?.includes("Secrets Manager") || err.name === "CredentialsProviderError") {
      return NextResponse.json({ error: "AWS connection unavailable or revoked", code: "TENANT_CONNECTION_FAILED" }, { status: 503 });
    }
    return NextResponse.json({ error: err.message || "Failed to load dashboard chart data." }, { status: 500 });
  }
}
