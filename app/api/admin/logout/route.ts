import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, clearSession } from "@/lib/server/auth/session";

export async function POST() {
  await clearSession(ADMIN_SESSION_COOKIE);
  return NextResponse.json({ ok: true });
}
