import { NextResponse } from "next/server";
import { issueOtp } from "@/lib/server/auth/otp";
import { logSmsNotification } from "@/lib/server/repositories/notifications";

export async function POST(request: Request) {
  const body = (await request.json()) as { phone?: string };
  const phone = body.phone?.trim();

  if (!phone) {
    return NextResponse.json(
      { ok: false, message: "شماره موبایل الزامی است." },
      { status: 400 }
    );
  }

  const challenge = issueOtp(phone);

  logSmsNotification(phone, "portal-otp", {
    code: challenge.code,
  });

  return NextResponse.json({
    ok: true,
    expiresAt: challenge.expiresAt,
    mockCode: challenge.code,
  });
}
