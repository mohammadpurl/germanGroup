import type { Locale } from "@/lib/i18n";

/** Desktop: public/video_frames · Mobile: public/video/frames-mobile */
export const HERO_DESKTOP_FRAME_COUNT = 178;
export const HERO_MOBILE_FRAME_COUNT = 194;
export const HERO_FRAME_COUNT = Math.max(HERO_DESKTOP_FRAME_COUNT, HERO_MOBILE_FRAME_COUNT);

/** Scroll distance (PDF: 400vh) */
export const HERO_SCROLL_HEIGHT_VH = 400;

/** Max frames to probe when preloading (match exported sequences) */
export const HERO_MAX_FRAME_PROBE = Math.max(HERO_DESKTOP_FRAME_COUNT, HERO_MOBILE_FRAME_COUNT);

/** PDF step 02: key milestones f_001, f_036, f_072, f_108, f_144, f_178 (1-based) */
export const HERO_KEY_FRAME_MILESTONES_1_BASED = [1, 36, 72, 108, 144, 178] as const;

/** Parallel fetch batch size (lower = gentler on slow 4G) */
export const HERO_PRELOAD_BATCH_SIZE = 16;

export function getHeroKeyFrameIndices(frameCount: number): number[] {
  const maxIndex = Math.max(0, frameCount - 1);
  const indices = HERO_KEY_FRAME_MILESTONES_1_BASED.map((oneBased) => {
    const ratio = (oneBased - 1) / (HERO_DESKTOP_FRAME_COUNT - 1);
    return Math.min(maxIndex, Math.round(ratio * maxIndex));
  });
  return [...new Set([0, maxIndex, ...indices])].sort((a, b) => a - b);
}

export function getHeroFrameProbeCount(isMobile: boolean): number {
  return isMobile ? HERO_MOBILE_FRAME_COUNT : HERO_DESKTOP_FRAME_COUNT;
}

export const HERO_MOBILE_BREAKPOINT = 768;

export const HERO_FRAME_DESKTOP = { width: 1280, height: 720 };
export const HERO_FRAME_MOBILE = { width: 720, height: 1280 };

export const HERO_FRAME_PATHS = {
  desktop: "/video_frames",
  mobile: "/video/frames-mobile",
  poster: "/video_frames/f_001.webp",
  fallback: "/Images/hero-garage.svg",
} as const;

export type HeroChapter = {
  id: string;
  scrollStart: number;
  scrollEnd: number;
  kicker: string;
  title: string;
  subtitle: string;
  /** Storyboard scene reference for content team */
  scene: string;
};

export const HERO_STORYBOARD: Record<
  Locale,
  { sourceVideo: string; durationSec: number; chapters: HeroChapter[] }
> = {
  fa: {
    sourceVideo: "public/video_frames/ (f_001.webp …)",
    durationSec: 22,
    chapters: [
      {
        id: "presence",
        scrollStart: 0,
        scrollEnd: 0.22,
        kicker: "فصل ۰۱ · حضور",
        title: "مهندسی دقیق.",
        subtitle: "",
        scene: "نمای جلو — گاراژ German Group، خودرو BMW/Mercedes در نور تیره",
      },
      {
        id: "diagnosis",
        scrollStart: 0.25,
        scrollEnd: 0.47,
        kicker: "فصل ۰۲ · تشخیص",
        title: "تشخیص، نه حدس.",
        subtitle: "",
        scene: "نمای دیاگ — لپ‌تاپ، اسکنر، ECU و قطعات",
      },
      {
        id: "repair",
        scrollStart: 0.5,
        scrollEnd: 0.72,
        kicker: "فصل ۰۳ · تعمیر",
        title: "تعمیر با استاندارد OEM",
        subtitle: "",
        scene: "موتور / گیربکس — تکنسین، ابزار تخصصی",
      },
      {
        id: "delivery",
        scrollStart: 0.75,
        scrollEnd: 0.97,
        kicker: "فصل ۰۴ · تحویل",
        title: "استاندارد آلمانی.",
        subtitle: "",
        scene: "نمای عقب خودرو — آماده تحویل، نور طلایی",
      },
    ],
  },
  en: {
    sourceVideo: "public/video_frames/ (f_001.webp …)",
    durationSec: 22,
    chapters: [
      {
        id: "presence",
        scrollStart: 0,
        scrollEnd: 0.22,
        kicker: "chapter 01 · presence",
        title: "Precision engineering.",
        subtitle: "German Group workshop exterior and premium fleet",
        scene: "Front view — garage exterior, BMW/Mercedes in dark cinematic light",
      },
      {
        id: "diagnosis",
        scrollStart: 0.25,
        scrollEnd: 0.47,
        kicker: "chapter 02 · diagnosis",
        title: "Diagnosis, not guesswork.",
        subtitle: "OEM-grade ECU, TCU and body-module scanning",
        scene: "Diagnostics — laptop, scanner, ECU components",
      },
      {
        id: "repair",
        scrollStart: 0.5,
        scrollEnd: 0.72,
        kicker: "chapter 03 · repair",
        title: "OEM-standard repair.",
        subtitle: "Engine, gearbox and controlled workshop process",
        scene: "Engine / gearbox — technician, specialist tools",
      },
      {
        id: "delivery",
        scrollStart: 0.75,
        scrollEnd: 0.97,
        kicker: "chapter 04 · delivery",
        title: "The German standard.",
        subtitle: "German Group — ready for handover",
        scene: "Rear silhouette — vehicle ready for delivery",
      },
    ],
  },
};

export const HERO_CTA: Record<Locale, { label: string; href: string; scrollHint: string }> = {
  fa: {
    label: "شروع دیاگ خودرو",
    href: "#diagnostic",
    scrollHint: "برای ادامه اسکرول کنید",
  },
  en: {
    label: "Start vehicle diagnostics",
    href: "#diagnostic",
    scrollHint: "Scroll to continue",
  },
};

export function getFrameUrl(base: string, index: number) {
  const padded = String(index + 1).padStart(3, "0");
  return `${base}/f_${padded}.webp`;
}

export function getActiveChapter(chapters: HeroChapter[], progress: number) {
  return (
    chapters.find(
      (chapter) => progress >= chapter.scrollStart && progress <= chapter.scrollEnd
    ) ?? null
  );
}

export function getChapterOpacity(chapter: HeroChapter, progress: number) {
  const range = chapter.scrollEnd - chapter.scrollStart;
  const fade = Math.min(range * 0.35, 0.08);
  const enterStart = chapter.scrollStart;
  const enterEnd = chapter.scrollStart + fade;
  const exitStart = chapter.scrollEnd - fade;
  const exitEnd = chapter.scrollEnd;

  if (progress < enterStart || progress > exitEnd) {
    return 0;
  }

  if (progress < enterEnd) {
    return (progress - enterStart) / fade;
  }

  if (progress > exitStart) {
    return (exitEnd - progress) / fade;
  }

  return 1;
}
