import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function GET() {
  try {
    const books = await prisma.book.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
      },
      orderBy: {
        id: "asc",
      },
    });

    return NextResponse.json({
      success: true,
      books,
    });
  } catch (error) {
    console.error("DEBUG_BOOKS_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to fetch books.",
      },
      { status: 500 }
    );
  }
}