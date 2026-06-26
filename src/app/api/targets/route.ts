import { NextResponse } from "next/server";
import { getTenantContext } from "@/lib/tenant";
import { validateEC2Target } from "@/lib/aws";

export async function GET(request: Request) {
  try {
    const { customerDb: prisma, awsClients, connection } = await getTenantContext(request);

    const userId = request.headers.get("x-user-id");
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const targets = await prisma.backupTarget.findMany({
      where: { user_id: userId },
      orderBy: { created_at: "desc" },
    });

    return NextResponse.json({ success: true, targets });
  } catch (err: any) {
    console.error("GET /api/targets Error:", err);
    if (err.message?.includes("AWS Connection not found") || err.message?.includes("AssumeRole") || err.message?.includes("Secrets Manager") || err.name === "CredentialsProviderError") {
      return NextResponse.json({ error: "AWS connection unavailable or revoked", code: "TENANT_CONNECTION_FAILED" }, { status: 503 });
    }
    return NextResponse.json({ error: err.message || "Failed to retrieve targets." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { customerDb: prisma, awsClients, connection } = await getTenantContext(request);

    const userId = request.headers.get("x-user-id");
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, instance_id, volume_id, region } = await request.json();

    if (!name || !instance_id || !volume_id || !region) {
      return NextResponse.json({ error: "Missing required fields: name, instance_id, volume_id, and region." }, { status: 400 });
    }

    // Call EC2 DescribeInstance / DescribeVolume validations
    const validation = await validateEC2Target(awsClients, region, instance_id, volume_id);
    if (!validation.success) {
      return NextResponse.json({ error: validation.error || "AWS EC2 validation failed." }, { status: 400 });
    }

    const target = await prisma.backupTarget.create({
      data: {
        user_id: userId,
        name,
        instance_id,
        volume_id,
        region,
      },
    });

    // Write audit log
    await prisma.auditLog.create({ data: { 
      actor: userId,
      action: "CREATE_TARGET",
      entity_type: "BackupTarget",
      entity_id: target.id,
      details: { name, instance_id, volume_id, region },
     } });

    return NextResponse.json({ success: true, target });
  } catch (err: any) {
    console.error("POST /api/targets Error:", err);
    if (err.message?.includes("AWS Connection not found") || err.message?.includes("AssumeRole") || err.message?.includes("Secrets Manager") || err.name === "CredentialsProviderError") {
      return NextResponse.json({ error: "AWS connection unavailable or revoked", code: "TENANT_CONNECTION_FAILED" }, { status: 503 });
    }
    return NextResponse.json({ error: err.message || "Failed to create target." }, { status: 500 });
  }
}
