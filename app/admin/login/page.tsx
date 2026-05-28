import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin/login-form";
import { getOptionalAdminSession } from "@/lib/server/auth/admin-guard";

export default async function AdminLoginPage() {
  const session = await getOptionalAdminSession();
  if (session?.role === "admin") {
    redirect("/admin");
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <AdminLoginForm />
    </div>
  );
}
