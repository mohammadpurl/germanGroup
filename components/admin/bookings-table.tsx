import Link from "next/link";
import { StatusBadge } from "@/components/admin/status-badge";
import { formatPersianDate, formatPersianTime } from "@/lib/admin/format";
import type { BookingStatus } from "@/lib/server/domain";

export type BookingRow = {
  id: string;
  status: BookingStatus;
  requestedDate: string;
  requestedTime: string;
  notes?: string;
  customer: { fullName: string; phone: string } | null;
  vehicle: { brand: string; model: string; plateNumber?: string } | null;
  serviceItems: Array<{
    service: { title: { fa: string } } | null;
  }>;
};

export function BookingsTable({ bookings }: { bookings: BookingRow[] }) {
  if (bookings.length === 0) {
    return (
      <div className="admin-card p-8 text-center text-secondary">
        هنوز رزروی ثبت نشده است.
      </div>
    );
  }

  return (
    <div className="admin-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="admin-table w-full min-w-[720px]">
          <thead>
            <tr>
              <th>مشتری</th>
              <th>خودرو</th>
              <th>خدمات</th>
              <th>زمان</th>
              <th>وضعیت</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>
                  <p className="font-medium text-primary">
                    {booking.customer?.fullName || "—"}
                  </p>
                  <p className="text-xs text-muted">{booking.customer?.phone}</p>
                </td>
                <td>
                  {booking.vehicle
                    ? `${booking.vehicle.brand} ${booking.vehicle.model}`
                    : "—"}
                </td>
                <td className="max-w-[200px]">
                  <p className="truncate text-sm text-secondary">
                    {booking.serviceItems
                      .map((item) => item.service?.title.fa)
                      .filter(Boolean)
                      .join("، ") || "—"}
                  </p>
                </td>
                <td>
                  <p>{formatPersianDate(booking.requestedDate)}</p>
                  <p className="text-xs text-muted">
                    {formatPersianTime(booking.requestedTime)}
                  </p>
                </td>
                <td>
                  <StatusBadge status={booking.status} />
                </td>
                <td>
                  <Link href={`/admin/bookings/${booking.id}`} className="admin-link">
                    جزئیات
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
