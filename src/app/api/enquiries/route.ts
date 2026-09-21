import { NextRequest, NextResponse } from "next/server";

import { prisma } from "../../../lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      firstName,
      lastName,
      email,
      mobile,
      organisation,
      question,
      termsAccepted,
      receiveUpdates,
    } = body;

    // Required fields
    if (
      !firstName?.trim() ||
      !lastName?.trim() ||
      !email?.trim() ||
      !mobile?.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill in all required fields.",
        },
        { status: 400 }
      );
    }

    // Terms are required
    if (termsAccepted !== true) {
      return NextResponse.json(
        {
          success: false,
          message: "Please accept the Terms & Conditions.",
        },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid email address.",
        },
        { status: 400 }
      );
    }

    const enquiry = await prisma.enquiry.create({
      data: {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim().toLowerCase(),
        mobile: mobile.trim(),

        organisation:
          typeof organisation === "string" && organisation.trim()
            ? organisation.trim()
            : null,

        question:
          typeof question === "string" && question.trim()
            ? question.trim()
            : null,

        termsAccepted: true,
        receiveUpdates: receiveUpdates === true,

        status: "NEW",
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Enquiry submitted successfully.",
        enquiry: {
          id: enquiry.id,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("ENQUIRY_POST_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again.",
      },
      { status: 500 }
    );
  }
}