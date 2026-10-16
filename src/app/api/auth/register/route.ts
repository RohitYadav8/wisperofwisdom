import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "../../../../lib/prisma";
import { sendPasswordSetupEmail } from "../../../../lib/mail";

const GENERIC_MESSAGE =
  "Please check your email for a secure link to set your password.";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body.email ?? "").trim().toLowerCase();
    const newsletter = body.newsletter !== false;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const existing = await prisma.user.findUnique({ where: { email } });

    // Already has a password: do nothing, same response (no email leak)
    if (existing?.password) {
      return NextResponse.json({ success: true, message: GENERIC_MESSAGE });
    }

    const user =
      existing ??
      (await prisma.user.create({ data: { email, newsletter } }));

    const token = crypto.randomBytes(32).toString("hex");
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

    await prisma.passwordToken.deleteMany({ where: { userId: user.id } });
    await prisma.passwordToken.create({
      data: {
        userId: user.id,
        tokenHash,
        expiresAt: new Date(Date.now() + 60 * 60 * 1000),
      },
    });

    const baseUrl = process.env.APP_URL ?? "http://localhost:3000";
    await sendPasswordSetupEmail(
      email,
      `${baseUrl}/account/set-password?token=${token}`
    );

    return NextResponse.json({ success: true, message: GENERIC_MESSAGE });
  } catch (error) {
    console.error("REGISTER_ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Could not send the email. Please try again." },
      { status: 500 }
    );
  }
}
