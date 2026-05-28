import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/admin-shell";
import { BookingStatusForm } from "@/components/admin/booking-status-form";
import { StatusBadge } from "@/components/admin/status-badge";
import {
  formatDateTime,
  formatPersianDate,
  formatPersianTime,
  formatPrice,
} from "@/lib/admin/format";
import { getBookingById } from "@/lib/server/repositories/bookings";
import { services } from "@/lib/server/mock-data";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminBookingDetailPage({ params }: PageProps) {
  const { id } = await params;
  const booking = getBookingById(id);

  if (!booking) {
    notFound();
  }

  const serviceItems = booking.items.map((item) => ({
    ...item,
    service: services.find((s) => s.id === item.serviceId) || null,
  }));

  return (
    <AdminShell
      title={`رزرو ${booking.customer?.fullName || ""}`}
      subtitle={`${booking.vehicle?.brand} ${booking.vehicle?.model}`}
    >
      <div className="mb-4">
        <Link href="/admin/bookings" className="admin-link text-sm">
          ← بازگشت به لیست
        </Link>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <section className="admin-card p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-semibold text-primary">اطلاعات رزرو</h2>
              <StatusBadge status={booking.status} />
            </div>

            <dl className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-xs text-muted">مشتری</dt>
                <dd className="mt-1 text-primary">{booking.customer?.fullName}</dd>
                <dd className="text-sm text-secondary">{booking.customer?.phone}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted">خودرو</dt>
                <dd className="mt-1 text-primary">
                  {booking.vehicle?.brand} {booking.vehicle?.model} ({booking.vehicle?.year})
                </dd>
                <dd className="text-sm text-secondary">{booking.vehicle?.plateNumber}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted">تاریخ مراجعه</dt>
                <dd className="mt-1 text-primary">
                  {formatPersianDate(booking.requestedDate)} ·{" "}
                  {formatPersianTime(booking.requestedTime)}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted">ثبت شده</dt>
                <dd className="mt-1 text-primary">{formatDateTime(booking.createdAt)}</dd>
              </div>
            </dl>

            {booking.notes ? (
              <p className="mt-4 rounded-xl bg-white/4 p-4 text-sm text-secondary">
                {booking.notes}
              </p>
            ) : null}
          </section>

          <section className="admin-card p-5">
            <h2 className="font-semibold text-primary">خدمات درخواستی</h2>
            <ul className="mt-4 space-y-3">
              {serviceItems.map((item) => (
                <li
                  key={item.serviceId}
                  className="flex items-center justify-between rounded-xl border border-white/6 px-4 py-3"
                >
                  <span>{item.service?.title.fa || item.serviceId}</span>
                  <span className="text-sm text-gold-light">
                    {formatPrice(item.unitPrice || item.service?.basePrice || 0)}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {booking.timeline.length > 0 ? (
            <section className="admin-card p-5">
              <h2 className="font-semibold text-primary">تایم‌لاین تعمیرگاه</h2>
              <ol className="mt-5 space-y-4 border-r border-gold/30 pr-5">
                {booking.timeline.map((event) => (
                  <li key={event.id} className="relative">
                    <span
                      className={`absolute -right-[1.35rem] top-1 h-3 w-3 rounded-full ${
                        event.completed ? "bg-gold" : "bg-white/20"
                      }`}
                    />
                    <p className="font-medium text-primary">{event.title}</p>
                    {event.description ? (
                      <p className="mt-1 text-sm text-secondary">{event.description}</p>
                    ) : null}
                    <p className="mt-1 text-xs text-muted">
                      {formatDateTime(event.happenedAt)}
                    </p>
                  </li>
                ))}
              </ol>
            </section>
          ) : null}
        </div>

        <BookingStatusForm bookingId={booking.id} currentStatus={booking.status} />
      </div>
    </AdminShell>
  );
}
