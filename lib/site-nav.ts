import type { Locale } from "@/lib/i18n";

export const PAGE_SECTION_IDS = [
  "home",
  "brands",
  "services",
  "workshop",
  "diagnostic",
  "booking",
] as const;

export type PageSectionId = (typeof PAGE_SECTION_IDS)[number];

const NAV_ITEMS = [
  { label: "خانه", sectionId: "home" },
  { label: "تخصص ما", sectionId: "brands" },
  { label: "خدمات", sectionId: "services" },
  { label: "فضای تعمیرگاه", sectionId: "workshop" },
  { label: "دیاگ", sectionId: "diagnostic" },
  { label: "رزرو", sectionId: "booking" },
] as const satisfies ReadonlyArray<{
  label: string;
  sectionId: PageSectionId;
}>;

export function getSectionHref(locale: Locale, sectionId: PageSectionId) {
  return sectionId === "home" ? `/${locale}#home` : `/${locale}#${sectionId}`;
}

export function getMainNavLinks(locale: Locale) {
  return NAV_ITEMS.map((item) => ({
    ...item,
    href: getSectionHref(locale, item.sectionId),
  }));
}
