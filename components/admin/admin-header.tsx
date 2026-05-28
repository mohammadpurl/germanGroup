"use client";

import { Bell, LogOut, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { formatPersianDate } from "@/lib/admin/format";

type AdminHeaderProps = {
  title: string;
  subtitle?: string;
};

export function AdminHeader({ title, subtitle }: AdminHeaderProps) {
  const router = useRouter();
  const today = formatPersianDate(new Date().toISOString());

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <header className="admin-header flex flex-col gap-4 border-b border-white/8 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h1 className="text-xl font-bold text-primary sm:text-2xl">{title}</h1>
        {subtitle ? <p className="mt-1 text-sm text-secondary">{subtitle}</p> : null}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="admin-search hidden min-w-[240px] items-center gap-2 sm:flex">
          <Search className="h-4 w-4 text-muted" aria-hidden />
          <input
            type="search"
            placeholder="جستجو: خودرو، مشتری، VIN..."
            className="w-full bg-transparent text-sm text-primary outline-none placeholder:text-muted"
          />
        </div>

        <span className="hidden text-xs text-muted md:inline">{today}</span>

        <button
          type="button"
          className="admin-icon-btn"
          aria-label="اعلان‌ها"
        >
          <Bell className="h-4 w-4" aria-hidden />
        </button>

        <button
          type="button"
          onClick={handleLogout}
          className="admin-icon-btn text-secondary hover:text-red-300"
          aria-label="خروج"
        >
          <LogOut className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </header>
  );
}
