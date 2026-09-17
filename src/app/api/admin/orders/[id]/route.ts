import { NextRequest, NextResponse } from "next/server";

import { prisma } from "../../../../../lib/prisma";
import { getAdminSession } from "../../../../../lib/admin-auth";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

const allowedOrderStatuses = [
  "PENDING",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
];

const allowedPaymentStatuses = [
  "PENDING",
  "PAID",
  "FAILED",
  "REFUNDED",
];

/* =====================================================
   GET SINGLE ORDER
===================================================== */

export async function GET(
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

    const orderId = Number(id);

    if (!Number.isInteger(orderId) || orderId <= 0) {
      return NextResponse.json(
        {
          error: "Invalid order ID.",
        },
        {
          status: 400,
        }
      );
    }

    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },

      include: {
        items: true,
      },
    });

    if (!order) {
      return NextResponse.json(
        {
          error: "Order not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,

      order: {
        ...order,

        subtotal: Number(order.subtotal),
        shipping: Number(order.shipping),
        total: Number(order.total),

        items: order.items.map((item) => ({
          ...item,
          price: Number(item.price),
        })),
      },
    });
  } catch (error) {
    console.error("GET ORDER ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to load order.",
      },
      {
        status: 500,
      }
    );
  }
}

/* =====================================================
   UPDATE ORDER
===================================================== */

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

    const orderId = Number(id);

    if (!Number.isInteger(orderId) || orderId <= 0) {
      return NextResponse.json(
        {
          error: "Invalid order ID.",
        },
        {
          status: 400,
        }
      );
    }

    const existingOrder = await prisma.order.findUnique({
      where: {
        id: orderId,
      },

      select: {
        id: true,
      },
    });

    if (!existingOrder) {
      return NextResponse.json(
        {
          error: "Order not found.",
        },
        {
          status: 404,
        }
      );
    }

    const body = await request.json();

    const status =
      typeof body.status === "string"
        ? body.status.toUpperCase()
        : undefined;

    const paymentStatus =
      typeof body.paymentStatus === "string"
        ? body.paymentStatus.toUpperCase()
        : undefined;

    if (
      status &&
      !allowedOrderStatuses.includes(status)
    ) {
      return NextResponse.json(
        {
          error: "Invalid order status.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      paymentStatus &&
      !allowedPaymentStatuses.includes(paymentStatus)
    ) {
      return NextResponse.json(
        {
          error: "Invalid payment status.",
        },
        {
          status: 400,
        }
      );
    }

    if (!status && !paymentStatus) {
      return NextResponse.json(
        {
          error: "Nothing to update.",
        },
        {
          status: 400,
        }
      );
    }

    const updatedOrder = await prisma.order.update({
      where: {
        id: orderId,
      },

      data: {
        ...(status && {
          status,
        }),

        ...(paymentStatus && {
          paymentStatus,
        }),
      },

      include: {
        items: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Order updated successfully.",

      order: {
        ...updatedOrder,

        subtotal: Number(updatedOrder.subtotal),
        shipping: Number(updatedOrder.shipping),
        total: Number(updatedOrder.total),

        items: updatedOrder.items.map((item) => ({
          ...item,
          price: Number(item.price),
        })),
      },
    });
  } catch (error) {
    console.error("UPDATE ORDER ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to update order.",
      },
      {
        status: 500,
      }
    );
  }
}

/* =====================================================
   DELETE ORDER
===================================================== */

export async function DELETE(
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

    const orderId = Number(id);

    if (!Number.isInteger(orderId) || orderId <= 0) {
      return NextResponse.json(
        {
          error: "Invalid order ID.",
        },
        {
          status: 400,
        }
      );
    }

    const existingOrder = await prisma.order.findUnique({
      where: {
        id: orderId,
      },

      select: {
        id: true,
      },
    });

    if (!existingOrder) {
      return NextResponse.json(
        {
          error: "Order not found.",
        },
        {
          status: 404,
        }
      );
    }

    await prisma.order.delete({
      where: {
        id: orderId,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Order deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE ORDER ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to delete order.",
      },
      {
        status: 500,
      }
    );
  }
}