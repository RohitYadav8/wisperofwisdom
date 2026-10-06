import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { prisma } from "../../../../lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const email = body.email?.trim().toLowerCase();
    const password = body.password;
    const rememberMe = Boolean(body.rememberMe);

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and password are required.",
        },
        { status: 400 }
      );
    }

    // Admin login should use AdminUser model
    const admin = await prisma.adminUser.findUnique({
      where: {
        email,
      },
    });

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password.",
        },
        { status: 401 }
      );
    }

    if (!admin.isActive) {
      return NextResponse.json(
        {
          success: false,
          message: "Your account is currently inactive.",
        },
        { status: 403 }
      );
    }

    const passwordMatched = await bcrypt.compare(
      password,
      admin.password
    );

    if (!passwordMatched) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password.",
        },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      success: true,
      message: "Login successful.",
      user: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
      },
    });

    // Store logged-in admin information in a secure HTTP-only cookie.
    const cookieMaxAge = rememberMe
      ? 60 * 60 * 24 * 30
      : 60 * 60 * 24;

    response.cookies.set({
      name: "admin_session",
      value: JSON.stringify({
        id: admin.id,
        name: admin.name,
        email: admin.email,
      }),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: cookieMaxAge,
    });

    return response;
  } catch (error) {
    console.error("LOGIN_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while logging in.",
      },
      { status: 500 }
    );
  }
}