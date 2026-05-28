import Link from "next/link";
import { StatusBadge } from "@/components/admin/status-badge";
import { formatPersianDate, formatPersianTime } from "@/lib/admin/format";
import type { BookingRow } from "@/components/admin/bookings-table";

export function RecentBookings({ bookings }: { bookings: BookingRow[] }) {
  return (
    <section className="admin-card overflow-hidden">
      <div className="flex items-center justify-between border-b border-white/8 px-5 py-4">
        <h2 className="font-semibold text-primary">آخرین مراجعات</h2>
        <Link href="/admin/bookings" className="admin-link text-sm">
          مشاهده همه
        </Link>
      </div>

      <ul className="divide-y divide-white/6">
        {bookings.slice(0, 5).map((booking) => (
          <li key={booking.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
            <div>
              <p className="font-medium text-primary">
                {booking.customer?.fullName} · {booking.vehicle?.brand}{" "}
                {booking.vehicle?.model}
              </p>
              <p className="mt-1 text-xs text-muted">
                {formatPersianDate(booking.requestedDate)} ·{" "}
                {formatPersianTime(booking.requestedTime)}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <StatusBadge status={booking.status} />
              <Link href={`/admin/bookings/${booking.id}`} className="admin-link text-sm">
                جزئیات
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
