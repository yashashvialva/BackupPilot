import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { pushCustomerSchema } from "@/lib/migration";

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const userId = request.headers.get("x-user-id");
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { roleArn, secretArn, auroraEndpoint, region, accountId, stackName } = await request.json();

    if (!roleArn || !secretArn || !auroraEndpoint || !region || !accountId) {
      return NextResponse.json(
        { error: "Missing required CloudFormation outputs." },
        { status: 400 }
      );
    }

    const connection = await prisma.awsConnection.upsert({
      where: { user_id: userId },
      update: {
        role_arn: roleArn,
        secret_arn: secretArn,
        aurora_endpoint: auroraEndpoint,
        region,
        account_id: accountId,
        stack_name: stackName || "",
      },
      create: {
        user_id: userId,
        role_arn: roleArn,
        secret_arn: secretArn,
        aurora_endpoint: auroraEndpoint,
        region,
        account_id: accountId,
        stack_name: stackName || "",
      },
    });

    // We can't log to the customer's DB yet since we haven't verified it,
    // and BackupPilot shouldn't store customer audit logs.
    // If BackupPilot *did* store audit logs in the control plane, we would do it here.

    // Trigger automated zero-touch schema deployment to customer's RDS
    await pushCustomerSchema(userId);

    return NextResponse.json({ success: true, connection });
  } catch (err: any) {
    console.error("AWS Connect API Error:", err);
    return NextResponse.json({ error: err.message || "Failed to save connection." }, { status: 500 });
  }
}
