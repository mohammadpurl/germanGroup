import { NextResponse } from "next/server";
import { verifyOtp } from "@/lib/server/auth/otp";
import { createCustomerSession } from "@/lib/server/auth/session";
import { getCustomerByPhone } from "@/lib/server/repositories/customers";

export async function POST(request: Request) {
  const body = (await request.json()) as { phone?: string; code?: string };
  const phone = body.phone?.trim();
  const code = body.code?.trim();

  if (!phone || !code) {
    return NextResponse.json(
      { ok: false, message: "شماره موبایل و کد تایید الزامی است." },
      { status: 400 }
    );
  }

  if (!verifyOtp(phone, code)) {
    return NextResponse.json(
      { ok: false, message: "کد تایید نامعتبر یا منقضی شده است." },
      { status: 401 }
    );
  }

  const customer = getCustomerByPhone(phone);
  if (!customer) {
    return NextResponse.json(
      { ok: false, message: "برای این شماره مشتری ثبت نشده است." },
      { status: 404 }
    );
  }

  await createCustomerSession(customer.id, customer.phone);

  return NextResponse.json({
    ok: true,
    redirectTo: "/portal",
  });
}
