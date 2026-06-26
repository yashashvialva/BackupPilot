import { NextResponse } from "next/server";
import { loginUser } from "@/lib/cognito";
import { prisma } from "@/lib/db";
import * as jose from "jose";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    // Query DB for user to check role (especially for mock mode role simulation)
    let user = await prisma.user.findUnique({
      where: { email },
    });

    const requestedRole = user?.role || "User";

    // Authenticate with Cognito (or Mock Cognito)
    const tokens = await loginUser(email, password, requestedRole);

    // If user does not exist in DB (e.g. signed up directly via AWS Console), sync them
    if (!user) {
      // Decode JWT to get sub
      const decoded = jose.decodeJwt(tokens.IdToken);
      const sub = decoded.sub;
      if (!sub) {
        throw new Error("Invalid token payload: missing subject claim.");
      }

      user = await prisma.user.upsert({
        where: { id: sub },
        update: {
          email,
          name: email.split("@")[0],
          role: "User",
        },
        create: {
          id: sub,
          email,
          name: email.split("@")[0],
          role: "User",
        },
      });
    }

    // Write audit log
    

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });

    // Set secure HTTP-only cookies
    const secureFlag = process.env.NODE_ENV === "production";
    const oneHour = 3600;
    const thirtyDays = 30 * 24 * 3600;

    response.cookies.set("bp_id_token", tokens.IdToken, {
      httpOnly: true,
      secure: secureFlag,
      sameSite: "strict",
      maxAge: tokens.ExpiresIn || oneHour,
    });

    response.cookies.set("bp_access_token", tokens.AccessToken, {
      httpOnly: true,
      secure: secureFlag,
      sameSite: "strict",
      maxAge: tokens.ExpiresIn || oneHour,
    });

    if (tokens.RefreshToken) {
      response.cookies.set("bp_refresh_token", tokens.RefreshToken, {
        httpOnly: true,
        secure: secureFlag,
        sameSite: "strict",
        maxAge: thirtyDays,
      });
    }

    // Set helper cookies to aid middleware in token refreshing
    response.cookies.set("bp_user_email", user.email, {
      httpOnly: true,
      secure: secureFlag,
      sameSite: "strict",
      maxAge: thirtyDays,
    });

    response.cookies.set("bp_user_role", user.role, {
      httpOnly: true,
      secure: secureFlag,
      sameSite: "strict",
      maxAge: thirtyDays,
    });

    return response;
  } catch (err: any) {
    console.error("Login API Error:", err);
    return NextResponse.json({ error: err.message || "Failed to log in." }, { status: 401 });
  }
}
