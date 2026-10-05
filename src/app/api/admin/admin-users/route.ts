import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { prisma } from "../../../../lib/prisma";
import { getAdminSession } from "../../../../lib/admin-auth";

// =========================================================
// GET ALL ADMIN USERS
// =========================================================
export async function GET() {
  try {
    const session = await getAdminSession();

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized.",
        },
        { status: 401 }
      );
    }

    const adminUsers = await prisma.adminUser.findMany({
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
      adminUsers,
    });
  } catch (error) {
    console.error("GET ADMIN USERS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load admin users.",
      },
      { status: 500 }
    );
  }
}

// =========================================================
// CREATE ADMIN USER
// =========================================================
export async function POST(request: Request) {
  try {
    const session = await getAdminSession();

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized.",
        },
        { status: 401 }
      );
    }

    const body = await request.json();

    const name = String(body.name ?? "").trim();

    const email = String(body.email ?? "")
      .trim()
      .toLowerCase();

    const password = String(body.password ?? "");

    // =====================================================
    // VALIDATION
    // =====================================================

    if (!name || !email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, email and password are required.",
        },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        {
          success: false,
          message: "Password must be at least 6 characters.",
        },
        { status: 400 }
      );
    }

    // =====================================================
    // CHECK EXISTING ADMIN
    // =====================================================

    const existingAdmin = await prisma.adminUser.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });

    if (existingAdmin) {
      return NextResponse.json(
        {
          success: false,
          message:
            "An admin account with this email already exists.",
        },
        { status: 409 }
      );
    }

    // =====================================================
    // CHECK EXISTING WEBSITE USER
    // =====================================================

    const existingPublicUser = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });

    if (existingPublicUser) {
      return NextResponse.json(
        {
          success: false,
          message:
            "This email is already registered as a website user.",
        },
        { status: 409 }
      );
    }

    // =====================================================
    // HASH PASSWORD
    // =====================================================

    const hashedPassword = await bcrypt.hash(password, 12);

    // =====================================================
    // CREATE ADMIN
    // =====================================================

    const adminUser = await prisma.adminUser.create({
      data: {
        name,
        email,
        password: hashedPassword,
        isActive: true,
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

    return NextResponse.json(
      {
        success: true,
        message: "Admin user created successfully.",
        adminUser,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("CREATE ADMIN USER ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create admin user.",
      },
      { status: 500 }
    );
  }
}