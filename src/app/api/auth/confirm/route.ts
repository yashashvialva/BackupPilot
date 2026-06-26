import { NextResponse } from "next/server";
import { confirmUser } from "@/lib/cognito";

export async function POST(request: Request) {
  try {
    const { email, code } = await request.json();

    if (!email || !code) {
      return NextResponse.json({ error: "Email and verification code are required." }, { status: 400 });
    }

    await confirmUser(email, code);

    // Audit log confirmation
    

    return NextResponse.json({ success: true, message: "Email address verified successfully. You can now log in." });
  } catch (err: any) {
    console.error("Confirm API Error:", err);
    return NextResponse.json({ error: err.message || "Failed to verify email code." }, { status: 500 });
  }
}
