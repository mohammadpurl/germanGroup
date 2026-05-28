import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "پنل مدیریت",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: ReactNode }) {
  return (
    <div dir="rtl" className="admin-root min-h-screen bg-[#0a0f14] text-primary">
      {children}
    </div>
  );
}
