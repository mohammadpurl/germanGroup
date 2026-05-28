import "server-only";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/server/auth/session";

export async function requireAdminSession() {
  const session = await getAdminSession();
  if (!session || session.role !== "admin") {
    redirect("/admin/login");
  }
  return session;
}

export async function getOptionalAdminSession() {
  return getAdminSession();
}
