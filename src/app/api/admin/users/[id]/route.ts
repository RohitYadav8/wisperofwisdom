import { NextRequest, NextResponse } from "next/server";

import { prisma } from "../../../../../lib/prisma";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

// GET SINGLE USER
export async function GET(
  _request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id } = await params;
    const userId = Number(id);

    if (!Number.isInteger(userId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid user ID.",
        },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Get user error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch user.",
      },
      { status: 500 }
    );
  }
}

// UPDATE USER
export async function PUT(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id } = await params;
    const userId = Number(id);

    if (!Number.isInteger(userId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid user ID.",
        },
        { status: 400 }
      );
    }

    const body = await request.json();

    const name =
      typeof body.name === "string"
        ? body.name.trim()
        : undefined;

    const email =
      typeof body.email === "string"
        ? body.email.trim().toLowerCase()
        : undefined;

    const isActive =
      typeof body.isActive === "boolean"
        ? body.isActive
        : undefined;

    const existingUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found.",
        },
        { status: 404 }
      );
    }

    if (email && email !== existingUser.email) {
      const emailExists = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (emailExists) {
        return NextResponse.json(
          {
            success: false,
            message: "A user with this email already exists.",
          },
          { status: 409 }
        );
      }
    }

    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...(name !== undefined && { name }),
        ...(email !== undefined && { email }),
        ...(isActive !== undefined && { isActive }),
      },
    });

    return NextResponse.json({
      success: true,
      message: "User updated successfully.",
      user,
    });
  } catch (error) {
    console.error("Update user error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update user.",
      },
      { status: 500 }
    );
  }
}

// DELETE USER
export async function DELETE(
  _request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id } = await params;
    const userId = Number(id);

    if (!Number.isInteger(userId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid user ID.",
        },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found.",
        },
        { status: 404 }
      );
    }

    await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    return NextResponse.json({
      success: true,
      message: "User deleted successfully.",
    });
  } catch (error) {
    console.error("Delete user error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete user.",
      },
      { status: 500 }
    );
  }
}