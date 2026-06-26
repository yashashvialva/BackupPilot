import { NextResponse } from "next/server";
import { signUpUser } from "@/lib/cognito";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();
    
    if (!email || !password || !name) {
      return NextResponse.json({ error: "Email, password, and name are required." }, { status: 400 });
    }

    let sub, userConfirmed;
    try {
      // Sign up user in Cognito
      const result = await signUpUser(email, password, name);
      sub = result.sub;
      userConfirmed = result.userConfirmed;
    } catch (cognitoErr: any) {
      if (cognitoErr.name === "UsernameExistsException") {
        return NextResponse.json({ error: "An account with this email already exists. Please log in." }, { status: 400 });
      }
      throw cognitoErr;
    }

    // Write user to database
    // Upsert by email instead of ID to prevent unique constraint errors 
    // if the user was previously created in Mock mode.
    const user = await prisma.user.upsert({
      where: { email },
      update: {
        id: sub, // Update the DB ID to match the real Cognito sub
        name,
      },
      create: {
        id: sub,
        email,
        name,
        role: "User",
      },
    });

    // Log the signup
    

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      userConfirmed,
    });
  } catch (err: any) {
    console.error("Signup API Error:", err);
    return NextResponse.json({ error: err.message || "Failed to sign up." }, { status: 500 });
  }
}
