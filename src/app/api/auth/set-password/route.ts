import { NextResponse } from "next/server";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { prisma } from "../../../../lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const token = String(body.token ?? "");
    const password = String(body.password ?? "");

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired link." },
        { status: 400 }
      );
    }

    if (password.length < 8 || password.length > 72) {
      return NextResponse.json(
        { success: false, message: "Password must be 8 to 72 characters." },
        { status: 400 }
      );
    }

    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
    const record = await prisma.passwordToken.findUnique({
      where: { tokenHash },
    });

    if (!record || record.expiresAt < new Date()) {
      return NextResponse.json(
        { success: false, message: "This link is invalid or has expired." },
        { status: 400 }
      );
    }

    const hashed = await bcrypt.hash(password, 12);

    await prisma.$transaction([
      prisma.user.update({
        where: { id: record.userId },
        data: { password: hashed },
      }),
      prisma.passwordToken.deleteMany({ where: { userId: record.userId } }),
    ]);

    return NextResponse.json({
      success: true,
      message: "Password set successfully. You can now log in.",
    });
  } catch (error) {
    console.error("SET_PASSWORD_ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong." },
      { status: 500 }
    );
  }
}