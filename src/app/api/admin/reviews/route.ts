import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { requireAdmin } from "../../../../lib/admin-auth";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const reviews = await prisma.review.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        name: true,
        email: true,
        rating: true,
        review: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        book: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        reviews,
        count: reviews.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("ADMIN_GET_REVIEWS_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load reviews.",
      },
      { status: 500 }
    );
  }
}