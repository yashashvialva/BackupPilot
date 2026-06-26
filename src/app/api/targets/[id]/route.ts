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

    const target = await prisma.backupTarget.findFirst({
      where: {
        id: params.id,
        user_id: userId,
      },
    });

    if (!target) {
      return NextResponse.json({ error: "Backup target not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, target });
  } catch (err: any) {
    console.error(`GET /api/targets/${params.id} Error:`, err);
    if (err.message?.includes("AWS Connection not found") || err.message?.includes("AssumeRole") || err.message?.includes("Secrets Manager") || err.name === "CredentialsProviderError") {
      return NextResponse.json({ error: "AWS connection unavailable or revoked", code: "TENANT_CONNECTION_FAILED" }, { status: 503 });
    }
    return NextResponse.json({ error: err.message || "Failed to fetch target." }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { customerDb: prisma, awsClients, connection } = await getTenantContext(request);

    const userId = request.headers.get("x-user-id");
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const target = await prisma.backupTarget.findFirst({
      where: {
        id: params.id,
        user_id: userId,
      },
    });

    if (!target) {
      return NextResponse.json({ error: "Backup target not found." }, { status: 404 });
    }

    const activePoliciesCount = await prisma.backupPolicy.count({
      where: {
        target_id: params.id,
        status: { in: ["Active", "Paused"] },
      },
    });

    if (activePoliciesCount > 0) {
      return NextResponse.json(
        { error: "Cannot delete target. Active or paused backup policies are currently linked to this target." },
        { status: 400 }
      );
    }

    await prisma.backupTarget.delete({
      where: { id: params.id },
    });

    await prisma.auditLog.create({ data: { 
      actor: userId,
      action: "DELETE_TARGET",
      entity_type: "BackupTarget",
      entity_id: params.id,
      details: { name: target.name, instance_id: target.instance_id, volume_id: target.volume_id },
     } });

    return NextResponse.json({ success: true, message: "Backup target deleted successfully." });
  } catch (err: any) {
    console.error(`DELETE /api/targets/${params.id} Error:`, err);
    if (err.message?.includes("AWS Connection not found") || err.message?.includes("AssumeRole") || err.message?.includes("Secrets Manager") || err.name === "CredentialsProviderError") {
      return NextResponse.json({ error: "AWS connection unavailable or revoked", code: "TENANT_CONNECTION_FAILED" }, { status: 503 });
    }
    return NextResponse.json({ error: err.message || "Failed to delete target." }, { status: 500 });
  }
}
