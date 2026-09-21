import { NextResponse } from "next/server";

import { prisma } from "../../../../lib/prisma";

export async function GET() {
  try {
    const journalClaims = await prisma.journalClaim.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        challenge: true,
        goals: true,
        termsAccepted: true,
        marketingConsent: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        journalClaims,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("ADMIN_JOURNAL_CLAIMS_GET_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to fetch journal claims.",
      },
      { status: 500 }
    );
  }
}