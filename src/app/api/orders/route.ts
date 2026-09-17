import { NextRequest, NextResponse } from "next/server";

import { prisma } from "../../../lib/prisma";

type CheckoutItem = {
  bookId: number;
  quantity: number;
};

function generateOrderNumber() {
  const timestamp = Date.now().toString().slice(-8);

  const random = Math.floor(
    1000 + Math.random() * 9000
  );

  return `WOW-${timestamp}-${random}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      customerName,
      email,
      phone,
      address,
      city,
      state,
      postalCode,
      country,
      paymentMethod,
      items,
    } = body;

    // =========================================
    // CUSTOMER VALIDATION
    // =========================================

    if (
      !customerName?.trim() ||
      !email?.trim() ||
      !address?.trim() ||
      !city?.trim() ||
      !postalCode?.trim() ||
      !country?.trim()
    ) {
      return NextResponse.json(
        {
          error:
            "Name, email and shipping address are required.",
        },
        {
          status: 400,
        }
      );
    }

    // =========================================
    // ITEMS VALIDATION
    // =========================================

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        {
          error: "Your order does not contain any items.",
        },
        {
          status: 400,
        }
      );
    }

    const checkoutItems: CheckoutItem[] = [];

    for (const item of items) {
      const bookId = Number(item.bookId);
      const quantity = Number(item.quantity);

      if (
        !Number.isInteger(bookId) ||
        bookId <= 0 ||
        !Number.isInteger(quantity) ||
        quantity <= 0
      ) {
        return NextResponse.json(
          {
            error: "Invalid order item.",
          },
          {
            status: 400,
          }
        );
      }

      checkoutItems.push({
        bookId,
        quantity,
      });
    }

    // =========================================
    // GET REAL BOOK DATA FROM DATABASE
    // =========================================

    const uniqueBookIds = [
      ...new Set(
        checkoutItems.map((item) => item.bookId)
      ),
    ];

    const books = await prisma.book.findMany({
      where: {
        id: {
          in: uniqueBookIds,
        },

        isActive: true,
      },

      select: {
        id: true,
        title: true,
        price: true,
        coverImage: true,
        stock: true,
      },
    });

    if (books.length !== uniqueBookIds.length) {
      return NextResponse.json(
        {
          error:
            "One or more books are unavailable.",
        },
        {
          status: 400,
        }
      );
    }

    // =========================================
    // PREPARE ORDER ITEMS
    // =========================================

    const orderItems = [];

    let subtotal = 0;

    for (const checkoutItem of checkoutItems) {
      const book = books.find(
        (book) => book.id === checkoutItem.bookId
      );

      if (!book) {
        return NextResponse.json(
          {
            error: "Book not found.",
          },
          {
            status: 404,
          }
        );
      }

      if (book.stock < checkoutItem.quantity) {
        return NextResponse.json(
          {
            error: `${book.title} does not have enough stock.`,
          },
          {
            status: 400,
          }
        );
      }

      const price = Number(book.price);

      subtotal += price * checkoutItem.quantity;

      orderItems.push({
        bookId: book.id,
        title: book.title,
        image: book.coverImage,
        price,
        quantity: checkoutItem.quantity,
      });
    }

    // =========================================
    // SHIPPING
    // =========================================

    const shipping = 0;

    const total = subtotal + shipping;

    // =========================================
    // CREATE ORDER
    // =========================================

    const order = await prisma.$transaction(
      async (tx) => {
        // Reduce stock

        for (const item of orderItems) {
          const updated = await tx.book.updateMany({
            where: {
              id: item.bookId,
              stock: {
                gte: item.quantity,
              },
            },

            data: {
              stock: {
                decrement: item.quantity,
              },
            },
          });

          if (updated.count !== 1) {
            throw new Error(
              `Insufficient stock for ${item.title}.`
            );
          }
        }

        // Create order

        return tx.order.create({
          data: {
            orderNumber: generateOrderNumber(),

            customerName:
              customerName.trim(),

            email:
              email.trim().toLowerCase(),

            phone:
              phone?.trim() || null,

            address:
              address.trim(),

            city:
              city.trim(),

            state:
              state?.trim() || null,

            postalCode:
              postalCode.trim(),

            country:
              country.trim(),

            subtotal,
            shipping,
            total,

            status: "PENDING",

            paymentStatus: "PENDING",

            paymentMethod:
              paymentMethod?.trim() || null,

            items: {
              create: orderItems,
            },
          },

          include: {
            items: true,
          },
        });
      }
    );

    // =========================================
    // RESPONSE
    // =========================================

    return NextResponse.json(
      {
        success: true,

        message:
          "Order placed successfully.",

        order: {
          id: order.id,

          orderNumber:
            order.orderNumber,

          customerName:
            order.customerName,

          email:
            order.email,

          status:
            order.status,

          paymentStatus:
            order.paymentStatus,

          subtotal:
            Number(order.subtotal),

          shipping:
            Number(order.shipping),

          total:
            Number(order.total),

          createdAt:
            order.createdAt,

          items:
            order.items.map((item) => ({
              ...item,

              price:
                Number(item.price),
            })),
        },
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "CREATE ORDER ERROR:",
      error
    );

    const message =
      error instanceof Error &&
      error.message.startsWith(
        "Insufficient stock"
      )
        ? error.message
        : "Failed to place order.";

    return NextResponse.json(
      {
        error: message,
      },
      {
        status: 500,
      }
    );
  }
}