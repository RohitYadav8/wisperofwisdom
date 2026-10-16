import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "../../../../lib/prisma";
import { createUserSession } from "../../../../lib/session";

const INVALID = { success: false, message: "Invalid email or password." };

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body.email ?? "").trim().toLowerCase();
    const password = String(body.password ?? "");
    const rememberMe = Boolean(body.rememberMe);

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required." },
        { status: 400 }
      );
    }

    const maxAge = rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24;
    const cookieBase = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" as const,
      path: "/",
      maxAge,
    };

    // 1) Normal user
    const user = await prisma.user.findUnique({ where: { email } });

    if (user?.password) {
      if (!user.isActive) {
        return NextResponse.json(
          { success: false, message: "Your account is currently inactive." },
          { status: 403 }
        );
      }
      if (!(await bcrypt.compare(password, user.password))) {
        return NextResponse.json(INVALID, { status: 401 });
      }

      const token = await createUserSession(
        { id: user.id, email: user.email },
        maxAge
      );
      const response = NextResponse.json({
        success: true,
        message: "Login successful.",
        user: { id: user.id, name: user.name, email: user.email },
      });
      response.cookies.set({ name: "user_session", value: token, ...cookieBase });
      return response;
    }

    // 2) Admin fallback (old behaviour, unchanged)
    const admin = await prisma.adminUser.findUnique({ where: { email } });

    if (!admin) {
      return NextResponse.json(INVALID, { status: 401 });
    }
    if (!admin.isActive) {
      return NextResponse.json(
        { success: false, message: "Your account is currently inactive." },
        { status: 403 }
      );
    }
    if (!(await bcrypt.compare(password, admin.password))) {
      return NextResponse.json(INVALID, { status: 401 });
    }

    const response = NextResponse.json({
      success: true,
      message: "Login successful.",
      user: { id: admin.id, name: admin.name, email: admin.email },
    });
    response.cookies.set({
      name: "admin_session",
      value: JSON.stringify({ id: admin.id, name: admin.name, email: admin.email }),
      ...cookieBase,
    });
    return response;
  } catch (error) {
    console.error("LOGIN_ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong while logging in." },
      { status: 500 }
    );
  }
}