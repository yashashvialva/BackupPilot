import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
// No audit log in control plane

export async function GET(request: Request) {
  try {
    const userId = request.headers.get("x-user-id");
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { awsConnection: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User profile not found in database." }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        created_at: user.created_at,
        hasAwsConnection: !!user.awsConnection,
      },
    });
  } catch (err: any) {
    console.error("GET /api/auth/me Error:", err);
    return NextResponse.json({ error: err.message || "Failed to fetch user context." }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const userId = request.headers.get("x-user-id");
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name } = await request.json();

    if (!name) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
      },
    });

    // No audit log in control plane

    return NextResponse.json({
      success: true,
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name,
        role: updatedUser.role,
        created_at: updatedUser.created_at,
      },
    });
  } catch (err: any) {
    console.error("PUT /api/auth/me Error:", err);
    return NextResponse.json({ error: err.message || "Failed to update profile name." }, { status: 500 });
  }
}

