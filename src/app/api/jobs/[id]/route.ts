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

    const job = await prisma.backupJob.findUnique({
      where: { id: params.id },
      include: {
        policy: {
          include: {
            target: true,
          },
        },
        snapshots: true,
      },
    });

    if (!job || job.policy.target.user_id !== userId) {
      return NextResponse.json({ error: "Backup job not found or unauthorized." }, { status: 404 });
    }

    return NextResponse.json({ success: true, job });
  } catch (err: any) {
    console.error(`GET /api/jobs/${params.id} Error:`, err);
    if (err.message?.includes("AWS Connection not found") || err.message?.includes("AssumeRole") || err.message?.includes("Secrets Manager") || err.name === "CredentialsProviderError") {
      return NextResponse.json({ error: "AWS connection unavailable or revoked", code: "TENANT_CONNECTION_FAILED" }, { status: 503 });
    }
    return NextResponse.json({ error: err.message || "Failed to fetch job details." }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { customerDb: prisma } = await getTenantContext(request);

    const userId = request.headers.get("x-user-id");
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const job = await prisma.backupJob.findUnique({
      where: { id: params.id },
      include: {
        policy: {
          include: {
            target: true,
          },
        },
      },
    });

    if (!job || job.policy.target.user_id !== userId) {
      return NextResponse.json({ error: "Backup job not found or unauthorized." }, { status: 404 });
    }

    await prisma.backupJob.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true, message: "Job deleted successfully." });
  } catch (err: any) {
    console.error(`DELETE /api/jobs/${params.id} Error:`, err);
    return NextResponse.json({ error: err.message || "Failed to delete job." }, { status: 500 });
  }
}
