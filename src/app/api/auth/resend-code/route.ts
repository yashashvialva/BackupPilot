import { NextResponse } from "next/server";
import { resendCode } from "@/lib/cognito";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    await resendCode(email);

    return NextResponse.json({ success: true, message: "A new verification code has been sent." });
  } catch (err: any) {
    console.error("Resend Code API Error:", err);
    return NextResponse.json({ error: err.message || "Failed to resend code." }, { status: 500 });
  }
}
