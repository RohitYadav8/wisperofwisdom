import { NextRequest, NextResponse } from "next/server";

import { prisma } from "../../../../lib/prisma";

// GET ALL USERS
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        name: true,
        email: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      users,
    });
  } catch (error) {
    console.error("Get users error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch users.",
      },
      { status: 500 }
    );
  }
}

// CREATE USER
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const name =
      typeof body.name === "string"
        ? body.name.trim()
        : "";

    const email =
      typeof body.email === "string"
        ? body.email.trim().toLowerCase()
        : "";

    if (!name || !email) {
      return NextResponse.json(
        {
          success: false,
          message: "Name and email are required.",
        },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "A user with this email already exists.",
        },
        { status: 409 }
      );
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        email: true,
        isActive: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "User created successfully.",
        user,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create user error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create user.",
      },
      { status: 500 }
    );
  }
}