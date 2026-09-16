import { NextRequest, NextResponse } from "next/server";

import { prisma } from "../../../lib/prisma";

const ALLOWED_SOURCES = [
  "COMMUNITY",
  "CONTACT",
  "TEN_DAY_CHALLENGE",
] as const;

type SubmissionSource = (typeof ALLOWED_SOURCES)[number];

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isAllowedSource(source: string): source is SubmissionSource {
  return ALLOWED_SOURCES.includes(source as SubmissionSource);
}

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

    const message =
      typeof body.message === "string"
        ? body.message.trim()
        : "";

    const source =
      typeof body.source === "string"
        ? body.source.trim().toUpperCase()
        : "";

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          error: "Email is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        {
          success: false,
          error: "Please enter a valid email address.",
        },
        {
          status: 400,
        }
      );
    }

    if (!source || !isAllowedSource(source)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid submission source.",
        },
        {
          status: 400,
        }
      );
    }

    if (name.length > 150) {
      return NextResponse.json(
        {
          success: false,
          error: "Name is too long.",
        },
        {
          status: 400,
        }
      );
    }

    if (email.length > 255) {
      return NextResponse.json(
        {
          success: false,
          error: "Email is too long.",
        },
        {
          status: 400,
        }
      );
    }

    if (message.length > 5000) {
      return NextResponse.json(
        {
          success: false,
          error: "Message is too long.",
        },
        {
          status: 400,
        }
      );
    }

    if (source === "CONTACT") {
      if (!name) {
        return NextResponse.json(
          {
            success: false,
            error: "Name is required.",
          },
          {
            status: 400,
          }
        );
      }

      if (!message) {
        return NextResponse.json(
          {
            success: false,
            error: "Message is required.",
          },
          {
            status: 400,
          }
        );
      }
    }

    if (source === "TEN_DAY_CHALLENGE" && !name) {
      return NextResponse.json(
        {
          success: false,
          error: "Name is required.",
        },
        {
          status: 400,
        }
      );
    }

    const submission = await prisma.contactSubmission.create({
      data: {
        name: name || null,
        email,
        message: message || null,
        source,
        status: "NEW",
      },
      select: {
        id: true,
        source: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Thank you! Your submission has been received.",
        submission,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("CONTACT_SUBMISSION_POST_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong. Please try again.",
      },
      {
        status: 500,
      }
    );
  }
}