import { NextResponse } from "next/server";
import { resetPassword } from "@/lib/cognito";

export async function POST(request: Request) {
  try {
    const { email, code, newPassword } = await request.json();

    if (!email || !code || !newPassword) {
      return NextResponse.json({ error: "Email, code, and newPassword are required." }, { status: 400 });
    }

    await resetPassword(email, code, newPassword);

    // Audit log password reset
    

    return NextResponse.json({ success: true, message: "Your password has been successfully reset." });
  } catch (err: any) {
    console.error("Reset Password API Error:", err);
    return NextResponse.json({ error: err.message || "Failed to reset password." }, { status: 500 });
  }
}
