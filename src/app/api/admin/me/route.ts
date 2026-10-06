import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("admin_session");

    if (!sessionCookie?.value) {
      return NextResponse.json(
        {
          success: false,
          message: "Not authenticated.",
        },
        { status: 401 }
      );
    }

    let admin;

    try {
      admin = JSON.parse(sessionCookie.value);
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid session.",
        },
        { status: 401 }
      );
    }

    if (!admin?.id || !admin?.name || !admin?.email) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid admin session.",
        },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: "Administrator",
      },
    });
  } catch (error) {
    console.error("ADMIN_ME_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to get admin information.",
      },
      { status: 500 }
    );
  }
}