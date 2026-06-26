import { NextResponse } from "next/server";
import { getTenantContext } from "@/lib/tenant";
import { triggerBackupLambda } from "@/lib/aws";

export async function POST(request: Request, { params }: { params: { id: string } }) {
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
      include: { target: true },
    });

    if (!policy) {
      return NextResponse.json({ error: "Policy not found or unauthorized." }, { status: 404 });
    }

    const result = await triggerBackupLambda(awsClients, prisma, connection, {
      policyId: policy.id,
      userId,
      volumeId: policy.target.volume_id,
      targetName: policy.target.name,
      policyName: policy.name,
      region: policy.target.region,
    });
    
    if (!result.success) {
      return NextResponse.json({ error: result.error || "Failed to trigger backup" }, { status: 500 });
    }
    
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error(`POST /api/policies/${params.id}/execute Error:`, err);
    return NextResponse.json({ error: err.message || "Failed to trigger backup" }, { status: 500 });
  }
}
