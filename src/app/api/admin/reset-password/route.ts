import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { prisma } from "../../../../lib/prisma";
import { passwordFingerprint, verifyAdminResetToken } from "../../../../lib/admin-password-reset";

const INVALID_LINK = "This reset link is invalid or has expired. Please request a new one.";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const token = typeof body.token === "string" ? body.token : "";
    const password = typeof body.password === "string" ? body.password : "";

    if (!token) {
      return NextResponse.json({ success: false, message: INVALID_LINK }, { status: 400 });
    }

    if (password.length < 8 || password.length > 72) {
      return NextResponse.json(
        { success: false, message: "Password must be 8 to 72 characters." },
        { status: 400 }
      );
    }

    const payload = await verifyAdminResetToken(token);
    if (!payload) {
      return NextResponse.json({ success: false, message: INVALID_LINK }, { status: 400 });
    }

    const admin = await prisma.adminUser.findUnique({ where: { id: payload.adminId } });

    // Fingerprint check makes the link single-use: it stops matching once the password changes.
    if (!admin || !admin.isActive || passwordFingerprint(admin.password) !== payload.pwf) {
      return NextResponse.json({ success: false, message: INVALID_LINK }, { status: 400 });
    }

    await prisma.adminUser.update({
      where: { id: admin.id },
      data: { password: await bcrypt.hash(password, 12) },
    });

    return NextResponse.json({
      success: true,
      message: "Your password has been reset. You can now log in.",
    });
  } catch (error) {
    console.error("ADMIN_RESET_PASSWORD_ERROR:", error);
    return NextResponse.json({ success: false, message: "Something went wrong." }, { status: 500 });
  }
}
