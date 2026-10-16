import { SignJWT, jwtVerify } from "jose";

const secret = () => {
  const value = process.env.SESSION_SECRET;
  if (!value) throw new Error("SESSION_SECRET is not configured.");
  return new TextEncoder().encode(value);
};

export async function createUserSession(
  payload: { id: number; email: string },
  maxAgeSeconds: number
) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${maxAgeSeconds}s`)
    .sign(secret());
}

export async function verifyUserSession(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret());
    return payload as { id: number; email: string };
  } catch {
    return null;
  }
}