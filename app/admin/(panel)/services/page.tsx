import { AdminShell } from "@/components/admin/admin-shell";
import { ServicesManager } from "@/components/admin/services-manager";
import { getAllServices } from "@/lib/server/repositories/services";

export default async function AdminServicesPage() {
  const services = getAllServices();

  return (
    <AdminShell title="خدمات" subtitle="ثبت، ویرایش و فعال‌سازی خدمات تعمیرگاه">
      <ServicesManager initialServices={services} />
    </AdminShell>
  );
}
