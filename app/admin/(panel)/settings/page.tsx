import { AdminShell } from "@/components/admin/admin-shell";
import { runtimeConfig } from "@/lib/server/runtime-config";

export default function AdminSettingsPage() {
  return (
    <AdminShell title="تنظیمات" subtitle="پیکربندی پنل مدیریت">
      <div className="admin-card max-w-xl space-y-4 p-6 text-sm text-secondary">
        <p>
          <span className="text-muted">نام کاربری پیش‌فرض:</span>{" "}
          <span className="text-primary">{runtimeConfig.adminUsername}</span>
        </p>
        <p>
          رمز عبور از متغیر محیطی <code className="text-gold">ADMIN_SEED_PASSWORD</code>{" "}
          خوانده می‌شود.
        </p>
        <p className="text-xs leading-relaxed">
          برای محیط واقعی، اتصال Prisma به PostgreSQL و احراز هویت امن‌تر توصیه می‌شود.
          در حال حاضر داده‌ها در حافظه (mock) نگهداری می‌شوند.
        </p>
      </div>
    </AdminShell>
  );
}
