import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

const ALLOWED_STATUSES = ["PENDING", "APPROVED", "REJECTED"] as const;

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(
  request: Request,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    const reviewId = Number(id);

    if (!Number.isInteger(reviewId) || reviewId <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid review ID.",
        },
        { status: 400 }
      );
    }

    const body = await request.json();

    const status =
      typeof body.status === "string"
        ? body.status.trim().toUpperCase()
        : "";

    if (
      !ALLOWED_STATUSES.includes(
        status as (typeof ALLOWED_STATUSES)[number]
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid status. Use PENDING, APPROVED, or REJECTED.",
        },
        { status: 400 }
      );
    }

    const existingReview = await prisma.review.findUnique({
      where: {
        id: reviewId,
      },
      select: {
        id: true,
      },
    });

    if (!existingReview) {
      return NextResponse.json(
        {
          success: false,
          message: "Review not found.",
        },
        { status: 404 }
      );
    }

    const updatedReview = await prisma.review.update({
      where: {
        id: reviewId,
      },
      data: {
        status,
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
        message: `Review ${status.toLowerCase()} successfully.`,
        review: updatedReview,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("ADMIN_UPDATE_REVIEW_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to update review.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    const reviewId = Number(id);

    if (!Number.isInteger(reviewId) || reviewId <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid review ID.",
        },
        { status: 400 }
      );
    }

    const existingReview = await prisma.review.findUnique({
      where: {
        id: reviewId,
      },
      select: {
        id: true,
      },
    });

    if (!existingReview) {
      return NextResponse.json(
        {
          success: false,
          message: "Review not found.",
        },
        { status: 404 }
      );
    }

    await prisma.review.delete({
      where: {
        id: reviewId,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Review deleted successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("ADMIN_DELETE_REVIEW_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to delete review.",
      },
      { status: 500 }
    );
  }
}