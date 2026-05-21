/** ترتیب بخش‌ها در صفحه اصلی — برای scroll spy */
export const PAGE_SECTION_IDS = [
  "home",
  "brands",
  "services",
  "workshop",
  "diagnostic",
  "booking",
] as const;

export type PageSectionId = (typeof PAGE_SECTION_IDS)[number];

/** لینک‌های منوی اصلی (خانه → تماس/رزرو) */
export const MAIN_NAV_LINKS = [
  { label: "خانه",           href: "#home",       sectionId: "home"       },
  { label: "تخصص ما",        href: "#brands",     sectionId: "brands"     },
  { label: "خدمات",          href: "#services",   sectionId: "services"   },
  { label: "فضای تعمیرگاه",  href: "#workshop",   sectionId: "workshop"   },
  { label: "دیاگونستیک",     href: "#diagnostic", sectionId: "diagnostic" },
  { label: "تماس با ما",     href: "#booking",    sectionId: "booking"    },
] as const;
