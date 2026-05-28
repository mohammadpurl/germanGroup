import { AdminShell } from "@/components/admin/admin-shell";
import { BookingsTable } from "@/components/admin/bookings-table";
import { getBookingsWithServices } from "@/lib/server/repositories/bookings";

export default async function AdminBookingsPage() {
  const bookings = getBookingsWithServices();

  return (
    <AdminShell title="مراجعات" subtitle="مشاهده و مدیریت رزروهای ثبت‌شده">
      <BookingsTable bookings={bookings} />
    </AdminShell>
  );
}
