import { NextResponse } from "next/server";
import { getTenantContext } from "@/lib/tenant";

export const dynamic = "force-dynamic";

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const { customerDb: prisma, awsClients, connection } = await getTenantContext(request);

    const userId = request.headers.get("x-user-id");
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const notification = await prisma.notification.findUnique({
      where: { id: params.id },
    });

    if (!notification || notification.user_id !== userId) {
      return NextResponse.json({ error: "Notification not found or unauthorized." }, { status: 404 });
    }

    const updated = await prisma.notification.update({
      where: { id: params.id },
      data: {
        status: "Read",
      },
    });

    return NextResponse.json({ success: true, notification: updated });
  } catch (err: any) {
    console.error(`POST /api/notifications/${params.id}/read Error:`, err);
    if (err.message?.includes("AWS Connection not found") || err.message?.includes("AssumeRole") || err.message?.includes("Secrets Manager") || err.name === "CredentialsProviderError") {
      return NextResponse.json({ error: "AWS connection unavailable or revoked", code: "TENANT_CONNECTION_FAILED" }, { status: 503 });
    }
    return NextResponse.json({ error: err.message || "Failed to mark notification as read." }, { status: 500 });
  }
}
