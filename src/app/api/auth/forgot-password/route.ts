import { NextResponse } from "next/server";
import { forgotPassword } from "@/lib/cognito";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    await forgotPassword(email);

    return NextResponse.json({ success: true, message: "A password reset confirmation code has been sent." });
  } catch (err: any) {
    console.error("Forgot Password API Error:", err);
    return NextResponse.json({ error: err.message || "Failed to trigger password reset." }, { status: 500 });
  }
}
