import { NextResponse } from "next/server";

import { prisma } from "../../../../lib/prisma";
import { getAdminSession } from "../../../../lib/admin-auth";

export async function GET() {
  try {
    // ============================================================
    // ADMIN AUTH CHECK
    // ============================================================

    const session = await getAdminSession();

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // ============================================================
    // DASHBOARD DATA
    // ============================================================

    const [
      totalBooks,
      activeBooks,
      totalUsers,
      totalMessages,
      newMessages,
      recentBooks,
      recentMessages,
    ] = await Promise.all([
      // Total books
      prisma.book.count(),

      // Active books
      prisma.book.count({
        where: {
          isActive: true,
        },
      }),

      // Total users
      prisma.user.count(),

      // Total contact submissions
      prisma.contactSubmission.count(),

      // New/unread messages
      prisma.contactSubmission.count({
        where: {
          status: "NEW",
        },
      }),

      // Latest books
      prisma.book.findMany({
        take: 5,
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          title: true,
          author: true,
          category: true,
          price: true,
          stock: true,
          isActive: true,
          createdAt: true,
        },
      }),

      // Latest contact/community/challenge submissions
      prisma.contactSubmission.findMany({
        take: 5,
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          name: true,
          email: true,
          source: true,
          status: true,
          createdAt: true,
        },
      }),
    ]);

    // ============================================================
    // RESPONSE
    // ============================================================

    return NextResponse.json({
      success: true,

      stats: {
        totalBooks,
        activeBooks,
        totalUsers,
        totalMessages,
        newMessages,
      },

      recentBooks: recentBooks.map((book) => ({
        ...book,
        price: Number(book.price),
      })),

      recentMessages,
    });
  } catch (error) {
    console.error("DASHBOARD API ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to load dashboard data.",
      },
      {
        status: 500,
      }
    );
  }
}