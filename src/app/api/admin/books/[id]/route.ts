import { NextRequest, NextResponse } from "next/server";

import { prisma } from "../../../../../lib/prisma";
import { getAdminSession } from "../../../../../lib/admin-auth";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

function getBookId(id: string) {
  const bookId = Number(id);

  if (
    !Number.isInteger(bookId) ||
    bookId <= 0
  ) {
    return null;
  }

  return bookId;
}

// ============================================================
// GET SINGLE BOOK
// ============================================================

export async function GET(
  _request: NextRequest,
  { params }: RouteContext
) {
  try {
    const session = await getAdminSession();

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;

    const bookId = getBookId(id);

    if (!bookId) {
      return NextResponse.json(
        { error: "Invalid book ID." },
        { status: 400 }
      );
    }

    const book = await prisma.book.findUnique({
      where: {
        id: bookId,
      },
    });

    if (!book) {
      return NextResponse.json(
        { error: "Book not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      book,
    });
  } catch (error) {
    console.error("GET BOOK ERROR:", error);

    return NextResponse.json(
      { error: "Failed to fetch book." },
      { status: 500 }
    );
  }
}

// ============================================================
// UPDATE BOOK
// ============================================================

export async function PUT(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const session = await getAdminSession();

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;

    const bookId = getBookId(id);

    if (!bookId) {
      return NextResponse.json(
        { error: "Invalid book ID." },
        { status: 400 }
      );
    }

    const existingBook =
      await prisma.book.findUnique({
        where: {
          id: bookId,
        },
      });

    if (!existingBook) {
      return NextResponse.json(
        { error: "Book not found." },
        { status: 404 }
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
    // REQUIRED FIELDS
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
    // DUPLICATE SLUG CHECK
    // --------------------------------------------------------

    const duplicateSlug =
      await prisma.book.findFirst({
        where: {
          slug: normalizedSlug,
          NOT: {
            id: bookId,
          },
        },
      });

    if (duplicateSlug) {
      return NextResponse.json(
        {
          error:
            "Another book already uses this slug.",
        },
        { status: 409 }
      );
    }

    // --------------------------------------------------------
    // UPDATE
    // --------------------------------------------------------

    const book = await prisma.book.update({
      where: {
        id: bookId,
      },

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
            : existingBook.isActive,

        isFeatured:
          typeof isFeatured === "boolean"
            ? isFeatured
            : existingBook.isFeatured,
      },
    });

    return NextResponse.json({
      message: "Book updated successfully.",
      book,
    });
  } catch (error) {
    console.error("UPDATE BOOK ERROR:", error);

    return NextResponse.json(
      { error: "Failed to update book." },
      { status: 500 }
    );
  }
}

// ============================================================
// DELETE BOOK
// ============================================================

export async function DELETE(
  _request: NextRequest,
  { params }: RouteContext
) {
  try {
    const session = await getAdminSession();

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;

    const bookId = getBookId(id);

    if (!bookId) {
      return NextResponse.json(
        { error: "Invalid book ID." },
        { status: 400 }
      );
    }

    const existingBook =
      await prisma.book.findUnique({
        where: {
          id: bookId,
        },
      });

    if (!existingBook) {
      return NextResponse.json(
        { error: "Book not found." },
        { status: 404 }
      );
    }

    await prisma.book.delete({
      where: {
        id: bookId,
      },
    });

    return NextResponse.json({
      message: "Book deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE BOOK ERROR:", error);

    return NextResponse.json(
      { error: "Failed to delete book." },
      { status: 500 }
    );
  }
}