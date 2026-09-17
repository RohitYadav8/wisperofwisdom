import { NextResponse } from "next/server";

import { prisma } from "../../../../lib/prisma";
import { getAdminSession } from "../../../../lib/admin-auth";

/* =====================================================
   GET ALL ORDERS
===================================================== */

export async function GET() {
  try {
    const session = await getAdminSession();

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const orders = await prisma.order.findMany({
      orderBy: {
        createdAt: "desc",
      },

      include: {
        items: true,
      },
    });

    const formattedOrders = orders.map((order) => ({
      ...order,

      subtotal: Number(order.subtotal),
      shipping: Number(order.shipping),
      total: Number(order.total),

      items: order.items.map((item) => ({
        ...item,
        price: Number(item.price),
      })),
    }));

    return NextResponse.json({
      success: true,
      orders: formattedOrders,
    });
  } catch (error) {
    console.error("GET ORDERS ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to load orders.",
      },
      {
        status: 500,
      }
    );
  }
}