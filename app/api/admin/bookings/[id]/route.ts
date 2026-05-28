import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/server/auth/session";
import type { BookingStatus } from "@/lib/server/domain";
import { getBookingById, updateBookingStatus } from "@/lib/server/repositories/bookings";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const session = await getAdminSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const booking = getBookingById(id);

  if (!booking) {
    return NextResponse.json({ ok: false, message: "رزرو یافت نشد." }, { status: 404 });
  }

  return NextResponse.json({ ok: true, booking });
}

export async function PATCH(request: Request, context: RouteContext) {
  const session = await getAdminSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const body = (await request.json()) as { status?: BookingStatus };

  if (!body.status) {
    return NextResponse.json(
      { ok: false, message: "وضعیت جدید الزامی است." },
      { status: 400 }
    );
  }

  const booking = updateBookingStatus(id, body.status);

  if (!booking) {
    return NextResponse.json({ ok: false, message: "رزرو یافت نشد." }, { status: 404 });
  }

  return NextResponse.json({ ok: true, booking });
}
