import { NextResponse } from "next/server";

import { prisma } from "../../../../lib/prisma";
import { requireAdmin } from "../../../../lib/admin-auth";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const enquiries = await prisma.enquiry.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(
      {
        success: true,
        enquiries,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("ADMIN_ENQUIRIES_GET_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load enquiries.",
      },
      { status: 500 }
    );
  }
}