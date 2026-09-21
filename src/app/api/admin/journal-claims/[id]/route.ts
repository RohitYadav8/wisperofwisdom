import { NextRequest, NextResponse } from "next/server";

import { prisma } from "../../../../../lib/prisma";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id } = await params;
    const claimId = Number(id);

    if (!Number.isInteger(claimId) || claimId <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid journal claim ID.",
        },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { status } = body;

    const allowedStatuses = ["NEW", "READ"];

    if (!allowedStatuses.includes(status)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid status.",
        },
        { status: 400 }
      );
    }

    const existingClaim = await prisma.journalClaim.findUnique({
      where: {
        id: claimId,
      },
    });

    if (!existingClaim) {
      return NextResponse.json(
        {
          success: false,
          message: "Journal claim not found.",
        },
        { status: 404 }
      );
    }

    const updatedClaim = await prisma.journalClaim.update({
      where: {
        id: claimId,
      },
      data: {
        status,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Journal claim updated successfully.",
        journalClaim: updatedClaim,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("ADMIN_JOURNAL_CLAIM_PATCH_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to update journal claim.",
      },
      { status: 500 }
    );
  }
}