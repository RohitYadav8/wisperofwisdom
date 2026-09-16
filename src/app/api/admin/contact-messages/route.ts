import { NextRequest, NextResponse } from "next/server";

import { getAdminSession } from "../../../../lib/admin-auth";
import { prisma } from "../../../../lib/prisma";

const ALLOWED_SOURCES = [
  "COMMUNITY",
  "CONTACT",
  "TEN_DAY_CHALLENGE",
];

const ALLOWED_STATUSES = [
  "NEW",
  "READ",
  "RESOLVED",
];

export async function GET(request: NextRequest) {
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

    const { searchParams } = new URL(request.url);

    const source = searchParams.get("source");
    const status = searchParams.get("status");
    const search = searchParams.get("search")?.trim();

    const where: {
      source?: string;
      status?: string;
      OR?: Array<{
        name?: {
          contains: string;
        };
        email?: {
          contains: string;
        };
        message?: {
          contains: string;
        };
      }>;
    } = {};

    if (source && ALLOWED_SOURCES.includes(source)) {
      where.source = source;
    }

    if (status && ALLOWED_STATUSES.includes(status)) {
      where.status = status;
    }

    if (search) {
      where.OR = [
        {
          name: {
            contains: search,
          },
        },
        {
          email: {
            contains: search,
          },
        },
        {
          message: {
            contains: search,
          },
        },
      ];
    }

    const submissions =
      await prisma.contactSubmission.findMany({
        where,
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          name: true,
          email: true,
          message: true,
          source: true,
          status: true,
          createdAt: true,
          updatedAt: true,
        },
      });

    return NextResponse.json({
      success: true,
      submissions,
    });
  } catch (error) {
    console.error(
      "ADMIN_CONTACT_MESSAGES_GET_ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch submissions.",
      },
      {
        status: 500,
      }
    );
  }
}