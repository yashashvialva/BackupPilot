import { NextResponse } from "next/server";
import { getTenantContext } from "@/lib/tenant";
import { syncEventBridgeSchedule } from "@/lib/aws";

export const dynamic = "force-dynamic";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { customerDb: prisma, awsClients, connection } = await getTenantContext(request);

    const userId = request.headers.get("x-user-id");
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { status } = await request.json();

    if (status !== "Active" && status !== "Paused") {
      return NextResponse.json({ error: "Status must be either 'Active' or 'Paused'." }, { status: 400 });
    }

    const policy = await prisma.backupPolicy.findFirst({
      where: {
        id: params.id,
        target: { user_id: userId },
      },
      include: { target: true },
    });

    if (!policy) {
      return NextResponse.json({ error: "Backup policy not found or unauthorized." }, { status: 404 });
    }

    if (policy.status === "Deleted") {
      return NextResponse.json({ error: "Cannot modify status of a deleted policy." }, { status: 400 });
    }

    const isActive = status === "Active";
    const syncRes = await syncEventBridgeSchedule(awsClients, connection, {
      policyId: policy.id,
      userId,
      volumeId: policy.target.volume_id,
      targetName: policy.target.name,
      policyName: policy.name,
      region: policy.target.region,
      frequency: policy.frequency,
      active: isActive,
    });

    if (!syncRes.success) {
      return NextResponse.json({ error: syncRes.error || "Failed to update EventBridge schedule state." }, { status: 500 });
    }

    const updatedPolicy = await prisma.backupPolicy.update({
      where: { id: params.id },
      data: { status },
      include: { target: true },
    });

    await prisma.auditLog.create({ data: { 
      actor: userId,
      action: status === "Active" ? "RESUME_POLICY" : "PAUSE_POLICY",
      entity_type: "BackupPolicy",
      entity_id: params.id,
      details: { status },
     } });

    return NextResponse.json({ success: true, policy: updatedPolicy });
  } catch (err: any) {
    console.error(`PUT /api/policies/${params.id}/status Error:`, err);
    if (err.message?.includes("AWS Connection not found") || err.message?.includes("AssumeRole") || err.message?.includes("Secrets Manager") || err.name === "CredentialsProviderError") {
      return NextResponse.json({ error: "AWS connection unavailable or revoked", code: "TENANT_CONNECTION_FAILED" }, { status: 503 });
    }
    return NextResponse.json({ error: err.message || "Failed to update status." }, { status: 500 });
  }
}
