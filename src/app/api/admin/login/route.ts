import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { prisma } from "../../../../lib/prisma";
import {
  ADMIN_SESSION_COOKIE,
  createAdminToken,
} from "../../../../lib/admin-auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const email =
      typeof body.email === "string"
        ? body.email.trim().toLowerCase()
        : "";

    const password =
      typeof body.password === "string"
        ? body.password
        : "";

    const rememberMe = body.rememberMe === true;

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and password are required.",
        },
        {
          status: 400,
        }
      );
    }

    const admin = await prisma.adminUser.findUnique({
      where: {
        email,
      },
    });

    // Same response for unknown email / wrong password.
    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password.",
        },
        {
          status: 401,
        }
      );
    }

    if (!admin.isActive) {
      return NextResponse.json(
        {
          success: false,
          message: "This admin account is inactive.",
        },
        {
          status: 403,
        }
      );
    }

    const passwordMatches = await bcrypt.compare(
      password,
      admin.password
    );

    if (!passwordMatches) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password.",
        },
        {
          status: 401,
        }
      );
    }

    const token = await createAdminToken(
      {
        adminId: admin.id,
        email: admin.email,
        name: admin.name,
      },
      rememberMe
    );

    const response = NextResponse.json(
      {
        success: true,
        message: "Login successful.",
        admin: {
          id: admin.id,
          name: admin.name,
          email: admin.email,
        },
      },
      {
        status: 200,
      }
    );

    response.cookies.set({
      name: ADMIN_SESSION_COOKIE,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: rememberMe
        ? 60 * 60 * 24 * 30
        : 60 * 60 * 24,
    });

    return response;
  } catch (error) {
    console.error("Admin login error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}