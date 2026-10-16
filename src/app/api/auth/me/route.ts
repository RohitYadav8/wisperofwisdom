import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "../../../../lib/prisma";
import { verifyUserSession } from "../../../../lib/session";

export async function GET() {
  const token = (await cookies()).get("user_session")?.value;
  if (!token) return NextResponse.json({ loggedIn: false });

  const session = await verifyUserSession(token);
  if (!session) return NextResponse.json({ loggedIn: false });

  const user = await prisma.user.findUnique({
    where: { id: session.id },
    select: { id: true, name: true, email: true, isActive: true },
  });

  if (!user || !user.isActive) return NextResponse.json({ loggedIn: false });

  return NextResponse.json({
    loggedIn: true,
    user: { id: user.id, name: user.name, email: user.email },
  });
}