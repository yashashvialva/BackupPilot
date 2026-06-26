import { NextResponse } from "next/server";
import { getTenantContext } from "@/lib/tenant";
import { syncEventBridgeSchedule, deleteEventBridgeSchedule } from "@/lib/aws";

export const dynamic = "force-dynamic";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { customerDb: prisma, awsClients, connection } = await getTenantContext(request);

    const userId = request.headers.get("x-user-id");
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, frequency, retention_days, email_alerts } = await request.json();

    if (!name || !frequency || retention_days === undefined) {
      return NextResponse.json(
        { error: "Missing required fields: name, frequency, and retention_days." },
        { status: 400 }
      );
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
      return NextResponse.json({ error: "Cannot update a deleted policy." }, { status: 400 });
    }

    const isScheduleActive = policy.status === "Active";
    const syncRes = await syncEventBridgeSchedule(awsClients, connection, {
      policyId: policy.id,
      userId,
      volumeId: policy.target.volume_id,
      targetName: policy.target.name,
      policyName: name,
      region: policy.target.region,
      frequency,
      active: isScheduleActive,
    });

    if (!syncRes.success) {
      return NextResponse.json({ error: syncRes.error || "Failed to update EventBridge schedule." }, { status: 500 });
    }

    const updatedPolicy = await prisma.backupPolicy.update({
      where: { id: params.id },
      data: {
        name,
        frequency,
        retention_days: parseInt(retention_days),
        email_alerts: email_alerts ?? true,
      },
      include: { target: true },
    });

    await prisma.auditLog.create({ data: { 
      actor: userId,
      action: "UPDATE_POLICY",
      entity_type: "BackupPolicy",
      entity_id: params.id,
      details: { name, frequency, retention_days, email_alerts },
     } });

    return NextResponse.json({ success: true, policy: updatedPolicy });
  } catch (err: any) {
    console.error(`PUT /api/policies/${params.id} Error:`, err);
    if (err.message?.includes("AWS Connection not found") || err.message?.includes("AssumeRole") || err.message?.includes("Secrets Manager") || err.name === "CredentialsProviderError") {
      return NextResponse.json({ error: "AWS connection unavailable or revoked", code: "TENANT_CONNECTION_FAILED" }, { status: 503 });
    }
    return NextResponse.json({ error: err.message || "Failed to update policy." }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { customerDb: prisma, awsClients, connection } = await getTenantContext(request);

    const userId = request.headers.get("x-user-id");
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const policy = await prisma.backupPolicy.findFirst({
      where: {
        id: params.id,
        target: { user_id: userId },
      },
    });

    if (!policy) {
      return NextResponse.json({ error: "Backup policy not found or unauthorized." }, { status: 404 });
    }

    const deleteRes = await deleteEventBridgeSchedule(awsClients, params.id);
    if (!deleteRes.success) {
      return NextResponse.json({ error: deleteRes.error || "Failed to delete EventBridge schedule." }, { status: 500 });
    }

    await prisma.backupPolicy.update({
      where: { id: params.id },
      data: { status: "Deleted" },
    });

    await prisma.auditLog.create({ data: { 
      actor: userId,
      action: "DELETE_POLICY",
      entity_type: "BackupPolicy",
      entity_id: params.id,
      details: { name: policy.name, status: "Deleted" },
     } });

    return NextResponse.json({ success: true, message: "Backup policy deleted successfully and EventBridge schedule removed." });
  } catch (err: any) {
    console.error(`DELETE /api/policies/${params.id} Error:`, err);
    if (err.message?.includes("AWS Connection not found") || err.message?.includes("AssumeRole") || err.message?.includes("Secrets Manager") || err.name === "CredentialsProviderError") {
      return NextResponse.json({ error: "AWS connection unavailable or revoked", code: "TENANT_CONNECTION_FAILED" }, { status: 503 });
    }
    return NextResponse.json({ error: err.message || "Failed to delete policy." }, { status: 500 });
  }
}
