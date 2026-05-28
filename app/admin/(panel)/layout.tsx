import type { ReactNode } from "react";
import { requireAdminSession } from "@/lib/server/auth/admin-guard";

export default async function AdminPanelLayout({ children }: { children: ReactNode }) {
  await requireAdminSession();
  return children;
}
