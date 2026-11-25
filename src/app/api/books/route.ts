import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

/* The Book table has no Amazon link column yet, so every book uses the
   book's Amazon page (same link as the Purchase buttons on the home page). */
const AMAZON_URL = "https://www.amazon.co.uk/dp/B0F5GXGHF8";

export async function GET() {
  try {
    const books = await prisma.book.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const formatted = books.map((book) => ({
      id: book.id,
      title: book.title,
      slug: book.slug,
      author: book.author,
      price: Number(book.price),
      image: book.coverImage,
      category: book.category,
      amazonUrl: AMAZON_URL,
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("GET /api/books failed:", error);

    return NextResponse.json(
      { error: "Failed to fetch books" },
      { status: 500 }
    );
  }
}