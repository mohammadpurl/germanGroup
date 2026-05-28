import {
  CalendarDays,
  Car,
  LayoutDashboard,
  Settings,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export type AdminNavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export const adminNavItems: AdminNavItem[] = [
  { href: "/admin", label: "داشبورد", icon: LayoutDashboard },
  { href: "/admin/bookings", label: "مراجعات", icon: CalendarDays },
  { href: "/admin/services", label: "خدمات", icon: Wrench },
  { href: "/admin/cars", label: "خودروها", icon: Car },
  { href: "/admin/settings", label: "تنظیمات", icon: Settings },
];
