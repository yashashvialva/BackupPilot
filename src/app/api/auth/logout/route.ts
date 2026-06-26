import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true, message: "Logged out successfully." });

  // Delete all auth cookies
  response.cookies.delete("bp_id_token");
  response.cookies.delete("bp_access_token");
  response.cookies.delete("bp_refresh_token");
  response.cookies.delete("bp_user_email");
  response.cookies.delete("bp_user_role");

  return response;
}
