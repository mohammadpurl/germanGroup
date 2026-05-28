import type { Metadata } from "next";
import { headers } from "next/headers";
import { Inter, Vazirmatn } from "next/font/google";
import "./globals.css";
import { isRTL, type Locale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  display: "swap",
  variable: "--font-vazirmatn",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    template: `%s | ${siteConfig.name}`,
    default: siteConfig.name,
  },
  description: siteConfig.defaultDescription.fa,
  applicationName: siteConfig.name,
  keywords: [
    "German Group",
    "تعمیر خودرو آلمانی",
    "تعمیرگاه بی ام و",
    "تعمیرگاه بنز",
    "تعمیر موتور",
    "تعمیر گیربکس",
    "دیاگ خودرو",
  ],
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.defaultDescription.fa,
    images: [siteConfig.socialImagePath],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.defaultDescription.fa,
    images: [siteConfig.socialImagePath],
  },
  icons: {
    icon: "/icon.svg",
    apple: "/apple-icon",
  },
  manifest: "/manifest.webmanifest",
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const headerStore = await headers();
  const locale = (headerStore.get("x-current-locale") as Locale | null) || "fa";
  const dir = isRTL(locale) ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <body className={`${vazirmatn.variable} ${inter.variable}`}>{children}</body>
    </html>
  );
}
