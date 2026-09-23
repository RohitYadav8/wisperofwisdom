import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

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
      amazonUrl: "#",
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