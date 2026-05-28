import "server-only";
import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "node:crypto";
import { runtimeConfig } from "@/lib/server/runtime-config";

export const CUSTOMER_SESSION_COOKIE = "gg_customer_session";
export const ADMIN_SESSION_COOKIE = "gg_admin_session";

type SessionPayload = {
  sub: string;
  role: "customer" | "admin";
  phone?: string;
  username?: string;
  exp: number;
};

function sign(value: string) {
  return createHmac("sha256", runtimeConfig.authSecret).update(value).digest("hex");
}

function encode(payload: SessionPayload) {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = sign(body);
  return `${body}.${signature}`;
}

function decode(token: string): SessionPayload | null {
  const [body, signature] = token.split(".");
  if (!body || !signature) {
    return null;
  }

  const expected = sign(body);
  const expectedBuffer = Buffer.from(expected);
  const signatureBuffer = Buffer.from(signature);

  if (
    expectedBuffer.length !== signatureBuffer.length ||
    !timingSafeEqual(expectedBuffer, signatureBuffer)
  ) {
    return null;
  }

  const payload = JSON.parse(Buffer.from(body, "base64url").toString()) as SessionPayload;

  if (Date.now() > payload.exp) {
    return null;
  }

  return payload;
}

async function writeSessionCookie(name: string, payload: SessionPayload) {
  const cookieStore = await cookies();
  cookieStore.set(name, encode(payload), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(payload.exp),
  });
}

export async function createCustomerSession(customerId: string, phone: string) {
  await writeSessionCookie(CUSTOMER_SESSION_COOKIE, {
    sub: customerId,
    role: "customer",
    phone,
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000,
  });
}

export async function createAdminSession(username: string) {
  await writeSessionCookie(ADMIN_SESSION_COOKIE, {
    sub: username,
    role: "admin",
    username,
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000,
  });
}

export async function clearSession(name: string) {
  const cookieStore = await cookies();
  cookieStore.set(name, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(0),
  });
}

export async function getCustomerSession() {
  const cookieStore = await cookies();
  const value = cookieStore.get(CUSTOMER_SESSION_COOKIE)?.value;
  return value ? decode(value) : null;
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  const value = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  return value ? decode(value) : null;
}
