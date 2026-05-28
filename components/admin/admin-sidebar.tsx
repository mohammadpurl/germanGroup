"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminNavItems } from "@/lib/admin/nav";
import { cn } from "@/lib/utils";

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="admin-sidebar hidden w-64 shrink-0 flex-col border-l border-white/8 bg-[#0c1219] lg:flex">
      <div className="border-b border-white/8 px-6 py-6">
        <p className="text-xs uppercase tracking-[0.24em] text-gold">German Group</p>
        <h2 className="mt-1 text-lg font-bold text-primary">پنل مدیریت</h2>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-4">
        {adminNavItems.map((item) => {
          const active =
            pathname === item.href ||
            (item.href !== "/admin" && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-colors",
                active
                  ? "bg-gold/15 text-gold-light"
                  : "text-secondary hover:bg-white/5 hover:text-primary"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" aria-hidden />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
