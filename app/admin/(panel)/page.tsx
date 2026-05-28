import Link from "next/link";
import { AdminShell } from "@/components/admin/admin-shell";
import { KpiGrid } from "@/components/admin/kpi-grid";
import { RecentBookings } from "@/components/admin/recent-bookings";
import {
  getAdminDashboardStats,
  getBookingsWithServices,
} from "@/lib/server/repositories/bookings";
import { getAllServices } from "@/lib/server/repositories/services";

export default async function AdminDashboardPage() {
  const stats = getAdminDashboardStats();
  const bookings = getBookingsWithServices();
  const services = getAllServices();

  return (
    <AdminShell
      title="داشبورد"
      subtitle="نمای کلی تعمیرگاه و رزروهای امروز"
    >
      <div className="space-y-6">
        <KpiGrid {...stats} />

        <div className="grid gap-6 xl:grid-cols-2">
          <RecentBookings bookings={bookings} />

          <section className="admin-card p-5">
            <h2 className="font-semibold text-primary">خلاصه خدمات</h2>
            <p className="mt-2 text-sm text-secondary">
              {services.filter((s) => s.isActive).length} خدمت فعال از{" "}
              {services.length} خدمت ثبت‌شده
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/admin/services" className="admin-link">
                مدیریت خدمات
              </Link>
              <Link href="/admin/bookings" className="admin-link">
                لیست مراجعات
              </Link>
            </div>
          </section>
        </div>
      </div>
    </AdminShell>
  );
}
