import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/server/auth/session";
import { getBookingsWithServices } from "@/lib/server/repositories/bookings";

export async function GET() {
  const session = await getAdminSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ ok: true, bookings: getBookingsWithServices() });
}
