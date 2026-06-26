import { NextResponse } from "next/server";
import { getTenantContext } from "@/lib/tenant";
import { syncEventBridgeSchedule } from "@/lib/aws";

export async function GET(request: Request) {
  try {
    const { customerDb: prisma, awsClients, connection } = await getTenantContext(request);

    const userId = request.headers.get("x-user-id");
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const policies = await prisma.backupPolicy.findMany({
      where: {
        target: {
          user_id: userId,
        },
      },
      include: {
        target: true,
      },
      orderBy: { created_at: "desc" },
    });

    return NextResponse.json({ success: true, policies });
  } catch (err: any) {
    console.error("GET /api/policies Error:", err);
    if (err.message?.includes("AWS Connection not found") || err.message?.includes("AssumeRole") || err.message?.includes("Secrets Manager") || err.name === "CredentialsProviderError") {
      return NextResponse.json({ error: "AWS connection unavailable or revoked", code: "TENANT_CONNECTION_FAILED" }, { status: 503 });
    }
    return NextResponse.json({ error: err.message || "Failed to fetch policies." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { customerDb: prisma, awsClients, connection } = await getTenantContext(request);

    const userId = request.headers.get("x-user-id");
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { target_id, name, frequency, retention_days, email_alerts } = await request.json();

    if (!target_id || !name || !frequency || retention_days === undefined) {
      return NextResponse.json(
        { error: "Missing required fields: target_id, name, frequency, and retention_days." },
        { status: 400 }
      );
    }

    // Verify user owns the target
    const target = await prisma.backupTarget.findFirst({
      where: {
        id: target_id,
        user_id: userId,
      },
    });

    if (!target) {
      return NextResponse.json({ error: "Linked backup target not found or unauthorized." }, { status: 404 });
    }

    // Create the policy record in DB (temporary schedule name)
    const policy = await prisma.backupPolicy.create({
      data: {
        target_id,
        name,
        frequency,
        retention_days: parseInt(retention_days),
        email_alerts: email_alerts ?? true,
        status: "Active",
        eventbridge_schedule_name: "pending",
      },
    });

    // Create the schedule in AWS EventBridge Scheduler
    const scheduleName = `bp-policy-${policy.id}`;
    const syncRes = await syncEventBridgeSchedule(awsClients, connection, {
      policyId: policy.id,
      userId,
      volumeId: target.volume_id,
      targetName: target.name,
      policyName: name,
      region: target.region,
      frequency,
      active: true,
    });

    if (!syncRes.success) {
      // Rollback database transaction on AWS failure
      await prisma.backupPolicy.delete({
        where: { id: policy.id },
      });
      return NextResponse.json({ error: syncRes.error || "Failed to create EventBridge schedule." }, { status: 500 });
    }

    // Save final EventBridge schedule name
    const finalPolicy = await prisma.backupPolicy.update({
      where: { id: policy.id },
      data: {
        eventbridge_schedule_name: scheduleName,
      },
      include: {
        target: true,
      },
    });

    // Audit Log
    await prisma.auditLog.create({ data: { 
      actor: userId,
      action: "CREATE_POLICY",
      entity_type: "BackupPolicy",
      entity_id: finalPolicy.id,
      details: { name, frequency, retention_days, email_alerts, scheduleName },
     } });

    return NextResponse.json({ success: true, policy: finalPolicy });
  } catch (err: any) {
    console.error("POST /api/policies Error:", err);
    if (err.message?.includes("AWS Connection not found") || err.message?.includes("AssumeRole") || err.message?.includes("Secrets Manager") || err.name === "CredentialsProviderError") {
      return NextResponse.json({ error: "AWS connection unavailable or revoked", code: "TENANT_CONNECTION_FAILED" }, { status: 503 });
    }
    return NextResponse.json({ error: err.message || "Failed to create backup policy." }, { status: 500 });
  }
}
