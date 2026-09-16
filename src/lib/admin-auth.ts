import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

export const ADMIN_SESSION_COOKIE = "admin_session";

export type AdminSessionPayload = {
  adminId: number;
  email: string;
  name: string;
};

function getJwtSecret() {
  const secret = process.env.ADMIN_JWT_SECRET;

  if (!secret) {
    throw new Error(
      "ADMIN_JWT_SECRET is not configured in environment variables."
    );
  }

  return new TextEncoder().encode(secret);
}

/* =========================================================
   CREATE ADMIN TOKEN
========================================================= */

export async function createAdminToken(
  admin: AdminSessionPayload,
  rememberMe = false
) {
  const secret = getJwtSecret();

  return new SignJWT({
    adminId: admin.adminId,
    email: admin.email,
    name: admin.name,
  })
    .setProtectedHeader({
      alg: "HS256",
    })
    .setIssuedAt()
    .setExpirationTime(rememberMe ? "30d" : "1d")
    .sign(secret);
}

/* =========================================================
   VERIFY ADMIN TOKEN
========================================================= */

export async function verifyAdminToken(
  token: string
): Promise<AdminSessionPayload | null> {
  try {
    const secret = getJwtSecret();

    const { payload } = await jwtVerify(
      token,
      secret,
      {
        algorithms: ["HS256"],
      }
    );

    if (
      typeof payload.adminId !== "number" ||
      typeof payload.email !== "string" ||
      typeof payload.name !== "string"
    ) {
      return null;
    }

    return {
      adminId: payload.adminId,
      email: payload.email,
      name: payload.name,
    };
  } catch {
    return null;
  }
}

/* =========================================================
   GET CURRENT ADMIN SESSION
========================================================= */

export async function getAdminSession():
  Promise<AdminSessionPayload | null> {
  const cookieStore = await cookies();

  const token =
    cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (!token) {
    return null;
  }

  return verifyAdminToken(token);
}