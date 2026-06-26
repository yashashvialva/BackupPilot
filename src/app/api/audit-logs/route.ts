import { NextResponse } from "next/server";
import { getTenantContext } from "@/lib/tenant";

export async function GET(request: Request) {
  try {
    const { customerDb: prisma, awsClients, connection } = await getTenantContext(request);

    const userId = request.headers.get("x-user-id");
    const userRole = request.headers.get("x-user-role");

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (userRole !== "Admin") {
      return NextResponse.json({ error: "Forbidden. Admin access required." }, { status: 403 });
    }

    const auditLogs = await prisma.auditLog.findMany({
      orderBy: { created_at: "desc" },
      take: 100, // Return latest 100 entries
    });

    return NextResponse.json({ success: true, auditLogs });
  } catch (err: any) {
    console.error("GET /api/audit-logs Error:", err);
    if (err.message?.includes("AWS Connection not found") || err.message?.includes("AssumeRole") || err.message?.includes("Secrets Manager") || err.name === "CredentialsProviderError") {
      return NextResponse.json({ error: "AWS connection unavailable or revoked", code: "TENANT_CONNECTION_FAILED" }, { status: 503 });
    }
    return NextResponse.json({ error: err.message || "Failed to retrieve audit logs." }, { status: 500 });
  }
}
