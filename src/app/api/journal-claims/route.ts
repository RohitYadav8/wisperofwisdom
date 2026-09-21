import { NextRequest, NextResponse } from "next/server";

import { prisma } from "../../../lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      firstName,
      lastName,
      email,
      phone,
      challenge,
      goals,
      termsAccepted,
      marketingConsent,
    } = body;

    // Required fields
    if (
      !firstName?.trim() ||
      !lastName?.trim() ||
      !email?.trim() ||
      !challenge?.trim() ||
      !goals?.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill in all required fields.",
        },
        { status: 400 }
      );
    }

    // Email validation
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

    // Terms required
    if (termsAccepted !== true) {
      return NextResponse.json(
        {
          success: false,
          message: "Please accept the Terms and Conditions.",
        },
        { status: 400 }
      );
    }

    const journalClaim = await prisma.journalClaim.create({
      data: {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim().toLowerCase(),

        phone:
          typeof phone === "string" && phone.trim()
            ? phone.trim()
            : null,

        challenge: challenge.trim(),
        goals: goals.trim(),

        termsAccepted: true,
        marketingConsent: marketingConsent === true,

        status: "NEW",
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Journal claim submitted successfully.",
        claim: {
          id: journalClaim.id,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("JOURNAL_CLAIM_POST_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again.",
      },
      { status: 500 }
    );
  }
}