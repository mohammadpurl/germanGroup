import type { Metadata } from "next";
import "./globals.css";

const SITE_TITLE = "خدمات تعمیرات فنی تخصصی";

export const metadata: Metadata = {
  title: {
    template: `%s | ${SITE_TITLE}`,
    default: SITE_TITLE,
  },
  description: SITE_TITLE,
  keywords: [
    "خدمات تعمیرات فنی تخصصی",
    "تعمیر خودرو آلمانی",
    "تعمیر موتور",
    "تعمیر گیربکس",
    "German Group",
  ],
  openGraph: {
    title: SITE_TITLE,
    description: SITE_TITLE,
    type: "website",
    siteName: "German Group",
    locale: "fa_IR",
  },
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }],
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
