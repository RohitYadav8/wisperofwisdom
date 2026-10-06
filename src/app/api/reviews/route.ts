import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

const BOOK_SLUG = "the-journey-of-whispers-of-wisdom";

// GET: Approved reviews fetch karna
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const requestedSlug =
      searchParams.get("productSlug")?.trim() || BOOK_SLUG;

    // Support both slugs:
    // whispers-of-wisdom
    // the-journey-of-whispers-of-wisdom
    const slug =
      requestedSlug === "whispers-of-wisdom"
        ? BOOK_SLUG
        : requestedSlug;

    const book = await prisma.book.findUnique({
      where: {
        slug,
      },
      select: {
        id: true,
      },
    });

    if (!book) {
      return NextResponse.json(
        {
          success: false,
          message: "Book not found.",
        },
        { status: 404 }
      );
    }

    const reviews = await prisma.review.findMany({
      where: {
        bookId: book.id,
        status: "APPROVED",
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        name: true,
        rating: true,
        review: true,
        createdAt: true,
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
    console.error("GET_REVIEWS_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load reviews.",
      },
      { status: 500 }
    );
  }
}

// POST: New review submit karna
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name =
      typeof body.name === "string"
        ? body.name.trim()
        : "";

    const email =
      typeof body.email === "string"
        ? body.email.trim().toLowerCase()
        : "";

    const review =
      typeof body.review === "string"
        ? body.review.trim()
        : "";

    const rating = Number(body.rating);

    const requestedSlug =
      typeof body.productSlug === "string" &&
      body.productSlug.trim()
        ? body.productSlug.trim()
        : BOOK_SLUG;

    // Support both slugs
    const slug =
      requestedSlug === "whispers-of-wisdom"
        ? BOOK_SLUG
        : requestedSlug;

    // Name validation
    if (!name) {
      return NextResponse.json(
        {
          success: false,
          message: "Name is required.",
        },
        { status: 400 }
      );
    }

    if (name.length < 2) {
      return NextResponse.json(
        {
          success: false,
          message: "Name must contain at least 2 characters.",
        },
        { status: 400 }
      );
    }

    // Email validation
    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is required.",
        },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid email address.",
        },
        { status: 400 }
      );
    }

    // Rating validation
    if (
      !Number.isInteger(rating) ||
      rating < 1 ||
      rating > 5
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please select a rating between 1 and 5.",
        },
        { status: 400 }
      );
    }

    // Review validation
    if (!review) {
      return NextResponse.json(
        {
          success: false,
          message: "Please write your review.",
        },
        { status: 400 }
      );
    }

    if (review.length < 5) {
      return NextResponse.json(
        {
          success: false,
          message: "Review must contain at least 5 characters.",
        },
        { status: 400 }
      );
    }

    if (review.length > 5000) {
      return NextResponse.json(
        {
          success: false,
          message: "Review cannot be longer than 5000 characters.",
        },
        { status: 400 }
      );
    }

    // Book find karo
    const book = await prisma.book.findUnique({
      where: {
        slug,
      },
      select: {
        id: true,
        title: true,
      },
    });

    if (!book) {
      return NextResponse.json(
        {
          success: false,
          message: "Book not found.",
        },
        { status: 404 }
      );
    }

    // Review create karo
    const createdReview = await prisma.review.create({
      data: {
        bookId: book.id,
        name,
        email,
        rating,
        review,
        status: "PENDING",
      },
      select: {
        id: true,
        name: true,
        rating: true,
        review: true,
        status: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you! Your review has been submitted and is waiting for approval.",
        review: createdReview,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST_REVIEW_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to submit review.",
      },
      { status: 500 }
    );
  }
}