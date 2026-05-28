import type { Locale } from "@/lib/i18n";

function normalizeSiteUrl(value: string | undefined) {
  if (!value) {
    return "https://example.com";
  }

  return value.replace(/\/+$/, "");
}

export const siteConfig = {
  name: "German Group",
  legalName: process.env.NEXT_PUBLIC_BUSINESS_NAME || "German Group",
  siteUrl: normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
  defaultLocale: "fa" as Locale,
  localeLabels: {
    fa: "فارسی",
    en: "English",
  } as const,
  defaultTitle: {
    fa: "German Group | تعمیرگاه تخصصی خودروهای آلمانی",
    en: "German Group | German Car Repair & Diagnostics",
  } as const,
  defaultDescription: {
    fa: "German Group مرکز تخصصی تعمیر موتور، گیربکس، دیاگ، سرویس و دیتیلینگ خودروهای آلمانی در تهران است.",
    en: "German Group provides specialist German car diagnostics, engine repair, gearbox service, detailing, and workshop support in Tehran.",
  } as const,
  socialImagePath: "/opengraph-image",
  phone: process.env.NEXT_PUBLIC_BUSINESS_PHONE || "+989122262329",
  phoneDisplayFa: process.env.NEXT_PUBLIC_BUSINESS_PHONE_FA || "۰۹۱۲۲۲۶۲۳۲۹",
  phoneDisplayEn: process.env.NEXT_PUBLIC_BUSINESS_PHONE_EN || "+98 912 226 2329",
  email: process.env.NEXT_PUBLIC_BUSINESS_EMAIL || "info@germangroup.example",
  instagramUrl:
    process.env.NEXT_PUBLIC_BUSINESS_INSTAGRAM ||
    "https://www.instagram.com/german.group/",
  address: {
    street:
      process.env.NEXT_PUBLIC_BUSINESS_STREET ||
      "خیابان دارآباد، نرسیده به بیمارستان مسیح دانشوری",
    locality: process.env.NEXT_PUBLIC_BUSINESS_LOCALITY || "تهران",
    region: process.env.NEXT_PUBLIC_BUSINESS_REGION || "تهران",
    postalCode: process.env.NEXT_PUBLIC_BUSINESS_POSTAL_CODE || "",
    country: process.env.NEXT_PUBLIC_BUSINESS_COUNTRY || "IR",
  },
  geo: {
    latitude: process.env.NEXT_PUBLIC_BUSINESS_LATITUDE || "",
    longitude: process.env.NEXT_PUBLIC_BUSINESS_LONGITUDE || "",
  },
  openingHours: {
    fa: "شنبه تا چهارشنبه، ۹ صبح تا ۶ عصر",
    en: "Saturday to Wednesday, 9:00 to 18:00",
  } as const,
  serviceAreas: {
    fa: ["تعمیر موتور", "تعمیر گیربکس", "دیاگ خودرو", "سرویس دوره‌ای", "دیتیلینگ", "PDR"],
    en: ["Engine repair", "Gearbox repair", "Vehicle diagnostics", "Scheduled service", "Detailing", "PDR"],
  } as const,
} as const;

export type SiteConfig = typeof siteConfig;
