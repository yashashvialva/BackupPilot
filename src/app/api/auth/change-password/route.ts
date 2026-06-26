import { NextRequest, NextResponse } from "next/server";
import { changeUserPassword } from "@/lib/cognito";

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");
    const accessToken = request.cookies.get("bp_access_token")?.value;

    if (!userId || !accessToken) {
      return NextResponse.json({ error: "Unauthorized. Active session not found." }, { status: 401 });
    }

    const { oldPassword, newPassword } = await request.json();

    if (!oldPassword || !newPassword) {
      return NextResponse.json({ error: "Old password and new password are required." }, { status: 400 });
    }

    await changeUserPassword(accessToken, oldPassword, newPassword);

    // Audit Log
    

    return NextResponse.json({ success: true, message: "Password updated successfully." });
  } catch (err: any) {
    console.error("Change Password API Error:", err);
    return NextResponse.json({ error: err.message || "Failed to change password." }, { status: 500 });
  }
}
