import crypto from "crypto";
import { SignJWT, jwtVerify } from "jose";

/*
  Stateless admin password-reset tokens (no new DB table needed).
  - Signed with ADMIN_JWT_SECRET, valid for 1 hour.
  - Contains a fingerprint of the admin's current password hash, so the
    link stops working as soon as the password is changed (single use).
*/

const PURPOSE = "admin-password-reset";
export const RESET_TOKEN_TTL = "1h";

function getSecret() {
  const secret = process.env.ADMIN_JWT_SECRET;
  if (!secret) throw new Error("ADMIN_JWT_SECRET is not configured in environment variables.");
  return new TextEncoder().encode(secret);
}

export function passwordFingerprint(passwordHash: string) {
  return crypto.createHash("sha256").update(passwordHash).digest("hex").slice(0, 32);
}

export async function createAdminResetToken(adminId: number, passwordHash: string) {
  return new SignJWT({ adminId, purpose: PURPOSE, pwf: passwordFingerprint(passwordHash) })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(RESET_TOKEN_TTL)
    .sign(getSecret());
}

export async function verifyAdminResetToken(token: string): Promise<{ adminId: number; pwf: string } | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret(), { algorithms: ["HS256"] });
    if (payload.purpose !== PURPOSE || typeof payload.adminId !== "number" || typeof payload.pwf !== "string") {
      return null;
    }
    return { adminId: payload.adminId, pwf: payload.pwf };
  } catch {
    return null;
  }
}
