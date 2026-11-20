import { NextResponse } from "next/server";

import { prisma } from "../../../../lib/prisma";
import { sendAdminPasswordResetEmail } from "../../../../lib/mail";
import { createAdminResetToken } from "../../../../lib/admin-password-reset";

/* Same reply whether or not the email exists, so accounts can't be discovered. */
const GENERIC_MESSAGE =
  "If an admin account exists for this email, a password reset link has been sent.";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const admin = await prisma.adminUser.findUnique({ where: { email } });

    if (admin && admin.isActive) {
      const token = await createAdminResetToken(admin.id, admin.password);
      const baseUrl = process.env.APP_URL ?? "http://localhost:3000";
      const link = `${baseUrl}/admin/reset-password?token=${encodeURIComponent(token)}`;

      try {
        await sendAdminPasswordResetEmail(admin.email, link);
      } catch (mailError) {
        console.error("ADMIN_RESET_EMAIL_ERROR:", mailError);
        return NextResponse.json(
          { success: false, message: "Could not send the reset email. Please try again later." },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ success: true, message: GENERIC_MESSAGE });
  } catch (error) {
    console.error("ADMIN_FORGOT_PASSWORD_ERROR:", error);
    return NextResponse.json({ success: false, message: "Something went wrong." }, { status: 500 });
  }
}
