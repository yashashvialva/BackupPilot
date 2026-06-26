import { NextResponse } from "next/server";
import { getTenantContext } from "@/lib/tenant";

export const dynamic = "force-dynamic";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { customerDb: prisma, awsClients, connection } = await getTenantContext(request);

    const userId = request.headers.get("x-user-id");
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const snapshot = await prisma.snapshot.findUnique({
      where: { snapshot_id: params.id },
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

    return NextResponse.json({ success: true, snapshot });
  } catch (err: any) {
    console.error(`GET /api/snapshots/${params.id} Error:`, err);
    if (err.message?.includes("AWS Connection not found") || err.message?.includes("AssumeRole") || err.message?.includes("Secrets Manager") || err.name === "CredentialsProviderError") {
      return NextResponse.json({ error: "AWS connection unavailable or revoked", code: "TENANT_CONNECTION_FAILED" }, { status: 503 });
    }
    return NextResponse.json({ error: err.message || "Failed to retrieve snapshot details." }, { status: 500 });
  }
}
