import { NextRequest, NextResponse } from "next/server";

import { getAdminSession } from "../../../../../lib/admin-auth";
import { prisma } from "../../../../../lib/prisma";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

const ALLOWED_STATUSES = [
  "NEW",
  "READ",
  "RESOLVED",
];

function getValidId(value: string) {
  const id = Number(value);

  if (!Number.isInteger(id) || id <= 0) {
    return null;
  }

  return id;
}

/* =========================================================
   GET SINGLE SUBMISSION
========================================================= */

export async function GET(
  _request: NextRequest,
  { params }: RouteContext
) {
  try {
    const session = await getAdminSession();

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const { id: rawId } = await params;
    const id = getValidId(rawId);

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid submission ID.",
        },
        {
          status: 400,
        }
      );
    }

    const submission =
      await prisma.contactSubmission.findUnique({
        where: {
          id,
        },
      });

    if (!submission) {
      return NextResponse.json(
        {
          success: false,
          error: "Submission not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      submission,
    });
  } catch (error) {
    console.error(
      "ADMIN_CONTACT_MESSAGE_GET_ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch submission.",
      },
      {
        status: 500,
      }
    );
  }
}

/* =========================================================
   UPDATE STATUS
========================================================= */

export async function PUT(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const session = await getAdminSession();

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const { id: rawId } = await params;
    const id = getValidId(rawId);

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid submission ID.",
        },
        {
          status: 400,
        }
      );
    }

    const body = await request.json();

    const status =
      typeof body.status === "string"
        ? body.status.trim().toUpperCase()
        : "";

    if (!ALLOWED_STATUSES.includes(status)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid status.",
        },
        {
          status: 400,
        }
      );
    }

    const existing =
      await prisma.contactSubmission.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
        },
      });

    if (!existing) {
      return NextResponse.json(
        {
          success: false,
          error: "Submission not found.",
        },
        {
          status: 404,
        }
      );
    }

    const submission =
      await prisma.contactSubmission.update({
        where: {
          id,
        },
        data: {
          status,
        },
      });

    return NextResponse.json({
      success: true,
      message: "Status updated successfully.",
      submission,
    });
  } catch (error) {
    console.error(
      "ADMIN_CONTACT_MESSAGE_UPDATE_ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error: "Failed to update submission.",
      },
      {
        status: 500,
      }
    );
  }
}

/* =========================================================
   DELETE
========================================================= */

export async function DELETE(
  _request: NextRequest,
  { params }: RouteContext
) {
  try {
    const session = await getAdminSession();

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const { id: rawId } = await params;
    const id = getValidId(rawId);

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid submission ID.",
        },
        {
          status: 400,
        }
      );
    }

    const existing =
      await prisma.contactSubmission.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
        },
      });

    if (!existing) {
      return NextResponse.json(
        {
          success: false,
          error: "Submission not found.",
        },
        {
          status: 404,
        }
      );
    }

    await prisma.contactSubmission.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Submission deleted successfully.",
    });
  } catch (error) {
    console.error(
      "ADMIN_CONTACT_MESSAGE_DELETE_ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete submission.",
      },
      {
        status: 500,
      }
    );
  }
}