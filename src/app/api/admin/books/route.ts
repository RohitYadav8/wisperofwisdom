import { NextRequest, NextResponse } from "next/server";

import { prisma } from "../../../../lib/prisma";
import { getAdminSession } from "../../../../lib/admin-auth";

// ============================================================
// GET ALL BOOKS
// ============================================================

export async function GET() {
  try {
    const session = await getAdminSession();

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const books = await prisma.book.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      books,
    });
  } catch (error) {
    console.error("GET BOOKS ERROR:", error);

    return NextResponse.json(
      { error: "Failed to fetch books." },
      { status: 500 }
    );
  }
}

// ============================================================
// CREATE BOOK
// ============================================================

export async function POST(request: NextRequest) {
  try {
    const session = await getAdminSession();

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();

    const {
      title,
      slug,
      author,
      price,
      coverImage,
      category,
      shortDescription,
      description,
      stock,
      isActive,
      isFeatured,
    } = body;

    // --------------------------------------------------------
    // VALIDATION
    // --------------------------------------------------------

    if (
      !title?.trim() ||
      !slug?.trim() ||
      !author?.trim() ||
      !category?.trim() ||
      !coverImage?.trim()
    ) {
      return NextResponse.json(
        {
          error:
            "Title, slug, author, category and cover image are required.",
        },
        { status: 400 }
      );
    }

    const parsedPrice = Number(price);
    const parsedStock = Number(stock ?? 0);

    if (
      !Number.isFinite(parsedPrice) ||
      parsedPrice < 0
    ) {
      return NextResponse.json(
        { error: "Please enter a valid price." },
        { status: 400 }
      );
    }

    if (
      !Number.isInteger(parsedStock) ||
      parsedStock < 0
    ) {
      return NextResponse.json(
        { error: "Please enter a valid stock quantity." },
        { status: 400 }
      );
    }

    // --------------------------------------------------------
    // NORMALIZE SLUG
    // --------------------------------------------------------

    const normalizedSlug = slug
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    if (!normalizedSlug) {
      return NextResponse.json(
        { error: "Please enter a valid slug." },
        { status: 400 }
      );
    }

    // --------------------------------------------------------
    // CHECK DUPLICATE SLUG
    // --------------------------------------------------------

    const existingBook = await prisma.book.findUnique({
      where: {
        slug: normalizedSlug,
      },
    });

    if (existingBook) {
      return NextResponse.json(
        {
          error:
            "A book with this slug already exists.",
        },
        { status: 409 }
      );
    }

    // --------------------------------------------------------
    // CREATE
    // --------------------------------------------------------

    const book = await prisma.book.create({
      data: {
        title: title.trim(),
        slug: normalizedSlug,
        author: author.trim(),
        price: parsedPrice,
        coverImage: coverImage.trim(),
        category: category.trim(),

        shortDescription:
          shortDescription?.trim() || null,

        description:
          description?.trim() || null,

        stock: parsedStock,

        isActive:
          typeof isActive === "boolean"
            ? isActive
            : true,

        isFeatured:
          typeof isFeatured === "boolean"
            ? isFeatured
            : false,
      },
    });

    return NextResponse.json(
      {
        message: "Book created successfully.",
        book,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("CREATE BOOK ERROR:", error);

    return NextResponse.json(
      { error: "Failed to create book." },
      { status: 500 }
    );
  }
}