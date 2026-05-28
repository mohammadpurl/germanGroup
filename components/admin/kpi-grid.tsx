import { AlertTriangle, CalendarDays, Car, Wallet } from "lucide-react";
import { formatPrice } from "@/lib/admin/format";

type KpiGridProps = {
  activeCars: number;
  pendingServices: number;
  todayAppointments: number;
  todayIncome: number;
};

const items = [
  { key: "activeCars", label: "خودروهای فعال", icon: Car, accent: "text-gold" },
  {
    key: "pendingServices",
    label: "خدمات در انتظار",
    icon: AlertTriangle,
    accent: "text-amber-300",
  },
  {
    key: "todayAppointments",
    label: "مراجعات امروز",
    icon: CalendarDays,
    accent: "text-blue-accent",
  },
  { key: "todayIncome", label: "درآمد امروز", icon: Wallet, accent: "text-emerald-300" },
] as const;

export function KpiGrid(props: KpiGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => {
        const Icon = item.icon;
        const value =
          item.key === "todayIncome"
            ? formatPrice(props.todayIncome)
            : String(props[item.key]);

        return (
          <article key={item.key} className="admin-card p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm text-secondary">{item.label}</p>
                <p className="mt-2 text-2xl font-bold text-primary">{value}</p>
              </div>
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 ${item.accent}`}
              >
                <Icon className="h-5 w-5" aria-hidden />
              </span>
            </div>
          </article>
        );
      })}
    </div>
  );
}
