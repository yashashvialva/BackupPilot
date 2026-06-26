import { NextResponse } from "next/server";
import { getTenantContext } from "@/lib/tenant";

export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  try {
    const { customerDb: prisma, awsClients, connection } = await getTenantContext(request);

    const userId = request.headers.get("x-user-id");
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "10");
    const policyId = searchParams.get("policyId");
    const targetId = searchParams.get("targetId");

    const skip = (page - 1) * pageSize;

    // Filters
    const where: any = {
      job: {
        policy: {
          target: {
            user_id: userId,
          },
        },
      },
    };

    if (policyId) {
      where.job = {
        policy_id: policyId,
        policy: {
          target: {
            user_id: userId,
          },
        },
      };
    }

    if (targetId) {
      where.job = {
        policy: {
          target_id: targetId,
          target: {
            user_id: userId,
          },
        },
      };
    }

    const totalItems = await prisma.snapshot.count({ where });

    const snapshots = await prisma.snapshot.findMany({
      where,
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
      orderBy: { created_at: "desc" },
      skip,
      take: pageSize,
    });

    return NextResponse.json({
      success: true,
      snapshots,
      pagination: {
        page,
        pageSize,
        totalItems,
        totalPages: Math.ceil(totalItems / pageSize),
      },
    });
  } catch (err: any) {
    console.error("GET /api/snapshots Error:", err);
    if (err.message?.includes("AWS Connection not found") || err.message?.includes("AssumeRole") || err.message?.includes("Secrets Manager") || err.name === "CredentialsProviderError") {
      return NextResponse.json({ error: "AWS connection unavailable or revoked", code: "TENANT_CONNECTION_FAILED" }, { status: 503 });
    }
    return NextResponse.json({ error: err.message || "Failed to retrieve snapshots." }, { status: 500 });
  }
}
