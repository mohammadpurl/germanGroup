"use client";

import NextImage from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  HERO_CTA,
  HERO_FRAME_DESKTOP,
  HERO_FRAME_MOBILE,
  HERO_FRAME_PATHS,
  HERO_MAX_FRAME_PROBE,
  HERO_MOBILE_BREAKPOINT,
  HERO_SCROLL_HEIGHT_VH,
  HERO_STORYBOARD,
  getChapterOpacity,
  getFrameUrl,
  type HeroChapter,
} from "@/lib/hero-cinematic-config";
import { type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type HeroCinematicProps = {
  lang: Locale;
};

type FrameSet = "desktop" | "mobile";

function drawFrame(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  frameSet: FrameSet,
  usesMobileFrames: boolean,
  viewportW: number,
  viewportH: number
) {
  const frameW =
    usesMobileFrames && frameSet === "mobile"
      ? HERO_FRAME_MOBILE.width
      : HERO_FRAME_DESKTOP.width;
  const frameH =
    usesMobileFrames && frameSet === "mobile"
      ? HERO_FRAME_MOBILE.height
      : HERO_FRAME_DESKTOP.height;

  let scale: number;
  let dx: number;
  let dy: number;

  if (usesMobileFrames && frameSet === "mobile") {
    scale = Math.max(viewportW / frameW, viewportH / frameH);
    dx = (viewportW - frameW * scale) / 2;
    dy = (viewportH - frameH * scale) / 2;
  } else if (frameSet === "mobile") {
    scale = viewportW / frameW;
    dx = (viewportW - frameW * scale) / 2;
    dy = viewportH * 0.32 - (frameH * scale) / 2;
  } else {
    scale = Math.max(viewportW / frameW, viewportH / frameH);
    dx = (viewportW - frameW * scale) / 2;
    dy = (viewportH - frameH * scale) / 2;
  }

  ctx.clearRect(0, 0, viewportW, viewportH);
  ctx.drawImage(img, dx, dy, frameW * scale, frameH * scale);
}

function HeroChapterOverlay({
  chapter,
  progress,
  lang,
}: {
  chapter: HeroChapter;
  progress: number;
  lang: Locale;
}) {
  const opacity = getChapterOpacity(chapter, progress);
  const translateY = (1 - opacity) * 24;

  if (opacity <= 0.01) {
    return null;
  }

  return (
    <div
      className="hero-chapter pointer-events-none absolute inset-x-0 bottom-0 z-10 text-right"
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}
    >
      <div className="hero-chapter__scrim mx-auto max-w-3xl lg:ms-auto lg:me-0">
        <p className={cn("hero-chapter__kicker", lang === "en" && "hero-chapter__kicker--en")}>
          {chapter.kicker}
        </p>
        <p className="hero-chapter__title">{chapter.title}</p>
      </div>
    </div>
  );
}

function loadFrame(base: string, index: number) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = document.createElement("img");
    img.decoding = "async";
    img.src = getFrameUrl(base, index);
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`frame ${index + 1}`));
  });
}

/** Parallel preload — PDF: all frames in memory before scrub (no early break on one 404) */
async function preloadFrameSet(
  base: string,
  maxProbe: number,
  onProgress: (pct: number) => void
) {
  const slots: (HTMLImageElement | null)[] = new Array(maxProbe).fill(null);
  let loaded = 0;
  const batchSize = 32;

  for (let start = 0; start < maxProbe; start += batchSize) {
    const end = Math.min(start + batchSize, maxProbe);
    await Promise.all(
      Array.from({ length: end - start }, async (_, offset) => {
        const index = start + offset;
        try {
          slots[index] = await loadFrame(base, index);
        } catch {
          slots[index] = null;
        } finally {
          loaded += 1;
          onProgress(Math.round((loaded / maxProbe) * 100));
        }
      })
    );
  }

  let lastIndex = -1;
  for (let i = maxProbe - 1; i >= 0; i -= 1) {
    if (slots[i]) {
      lastIndex = i;
      break;
    }
  }

  if (lastIndex < 0) {
    throw new Error("no frames loaded");
  }

  const images: HTMLImageElement[] = [];
  let lastGood: HTMLImageElement | null = null;
  for (let i = 0; i <= lastIndex; i += 1) {
    if (slots[i]) {
      lastGood = slots[i];
      images[i] = slots[i]!;
    } else if (lastGood) {
      images[i] = lastGood;
    }
  }

  return { images, frameCount: lastIndex + 1 };
}

function getFrameConfig(width: number) {
  const isMobile = width < HERO_MOBILE_BREAKPOINT;
  return {
    frameSet: isMobile ? ("mobile" as const) : ("desktop" as const),
    base: isMobile ? HERO_FRAME_PATHS.mobile : HERO_FRAME_PATHS.desktop,
    usesMobileFrames: isMobile,
    poster: isMobile
      ? getFrameUrl(HERO_FRAME_PATHS.mobile, 0)
      : getFrameUrl(HERO_FRAME_PATHS.desktop, 0),
  };
}

function updatePinPosition(section: HTMLElement, pin: HTMLElement) {
  const vh = window.innerHeight;
  const rect = section.getBoundingClientRect();

  pin.classList.remove("hero-cinematic__pin--fixed", "hero-cinematic__pin--end");

  if (rect.top > 0) {
    return;
  }

  if (rect.bottom > vh + 1) {
    pin.classList.add("hero-cinematic__pin--fixed");
    return;
  }

  pin.classList.add("hero-cinematic__pin--end");
}

function getScrollProgress(section: HTMLElement) {
  const rect = section.getBoundingClientRect();
  const scrollable = section.offsetHeight - window.innerHeight;

  if (scrollable <= 0) {
    return 0;
  }

  const scrolled = Math.min(Math.max(-rect.top, 0), scrollable);
  return scrolled / scrollable;
}

export function HeroCinematic({ lang }: HeroCinematicProps) {
  const storyboard = HERO_STORYBOARD[lang];
  const scrollHint = HERO_CTA[lang].scrollHint;
  const chapters = storyboard.chapters;

  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const frameCountRef = useRef(1);
  const frameSetRef = useRef<FrameSet>("desktop");
  const usesMobileFramesRef = useRef(false);
  const frameConfigRef = useRef(
    getFrameConfig(typeof window !== "undefined" ? window.innerWidth : 1280)
  );
  const readyRef = useRef(false);
  const currentFrameRef = useRef(-1);
  const rafRef = useRef<number | null>(null);
  const pendingProgressRef = useRef(0);

  const [loadProgress, setLoadProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [posterSrc, setPosterSrc] = useState<string>(HERO_FRAME_PATHS.poster);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [useReducedMotion, setUseReducedMotion] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [frameSourceKey, setFrameSourceKey] = useState(0);

  const activeChapter =
    chapters.find(
      (chapter) => scrollProgress >= chapter.scrollStart && scrollProgress <= chapter.scrollEnd
    ) ?? chapters[0];

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(window.innerWidth * dpr);
    canvas.height = Math.floor(window.innerHeight * dpr);
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const ctx = canvas.getContext("2d");
    ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
  }, []);

  const drawCurrentFrame = useCallback((progress: number) => {
    const canvas = canvasRef.current;
    const frames = framesRef.current;
    const count = frameCountRef.current;

    if (!canvas || !readyRef.current || frames.length === 0 || count < 1) {
      return;
    }

    const maxIndex = count - 1;
    const index = Math.min(maxIndex, Math.max(0, Math.round(progress * maxIndex)));

    if (index === currentFrameRef.current) {
      return;
    }

    const img = frames[index];
    const ctx = canvas.getContext("2d");

    if (!ctx || !img?.complete) {
      return;
    }

    drawFrame(
      ctx,
      img,
      frameSetRef.current,
      usesMobileFramesRef.current,
      window.innerWidth,
      window.innerHeight
    );
    currentFrameRef.current = index;
  }, []);

  const scheduleDraw = useCallback(
    (progress: number) => {
      pendingProgressRef.current = progress;

      if (rafRef.current !== null) {
        return;
      }

      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        drawCurrentFrame(pendingProgressRef.current);
      });
    },
    [drawCurrentFrame]
  );

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setUseReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (useReducedMotion) {
      return;
    }

    let cancelled = false;

    async function initFrames() {
      const config = getFrameConfig(window.innerWidth);
      frameConfigRef.current = config;
      frameSetRef.current = config.frameSet;
      usesMobileFramesRef.current = config.usesMobileFrames;
      setPosterSrc(config.poster);
      setLoadProgress(0);
      setIsReady(false);
      setLoadError(false);
      readyRef.current = false;
      currentFrameRef.current = -1;

      try {
        const { images, frameCount } = await preloadFrameSet(
          config.base,
          HERO_MAX_FRAME_PROBE,
          (pct) => {
            if (!cancelled) setLoadProgress(pct);
          }
        );

        if (cancelled) {
          return;
        }

        framesRef.current = images;
        frameCountRef.current = frameCount;
        readyRef.current = true;
        setIsReady(true);
        resizeCanvas();
        scheduleDraw(pendingProgressRef.current);
      } catch {
        if (!cancelled) {
          setLoadError(true);
        }
      }
    }

    initFrames();

    return () => {
      cancelled = true;
    };
  }, [useReducedMotion, frameSourceKey, resizeCanvas, scheduleDraw]);

  useEffect(() => {
    if (useReducedMotion) {
      return;
    }

    const onScroll = () => {
      const section = sectionRef.current;
      const pin = pinRef.current;
      if (!section || !pin) {
        return;
      }

      updatePinPosition(section, pin);

      const progress = getScrollProgress(section);
      setScrollProgress(progress);

      if (readyRef.current) {
        scheduleDraw(progress);
      }
    };

    const onResize = () => {
      const nextConfig = getFrameConfig(window.innerWidth);
      if (nextConfig.base !== frameConfigRef.current.base) {
        setFrameSourceKey((key) => key + 1);
        return;
      }

      resizeCanvas();
      currentFrameRef.current = -1;
      if (sectionRef.current && pinRef.current) {
        updatePinPosition(sectionRef.current, pinRef.current);
      }
      if (readyRef.current) {
        scheduleDraw(getScrollProgress(sectionRef.current!));
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [useReducedMotion, frameSourceKey, resizeCanvas, scheduleDraw]);

  if (useReducedMotion || loadError) {
    return (
      <section
        id="home"
        className="relative flex min-h-dvh scroll-mt-24 flex-col overflow-hidden bg-[#0a0f14]"
        aria-label={lang === "fa" ? "بخش اصلی" : "Hero"}
      >
        <div className="absolute inset-0">
          <NextImage
            src={getFrameUrl(HERO_FRAME_PATHS.desktop, 0)}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 hero-cinematic__vignette" aria-hidden />
        <div className="relative z-20 flex flex-1 flex-col justify-center px-4 pb-28 pt-32 lg:px-8">
          <h1 className="hero-mockup-headline text-right">
            <span className="block text-primary">{chapters[0].title}</span>
            <span className="hero-mockup-headline-gold block">{chapters[3].title}</span>
          </h1>
        </div>
      </section>
    );
  }

  const scrubPercent = Math.round(scrollProgress * 100);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="hero-cinematic relative scroll-mt-24 bg-[#0a0f14]"
      style={{ height: `${HERO_SCROLL_HEIGHT_VH}vh` }}
      aria-label={lang === "fa" ? "بخش اصلی" : "Hero"}
    >
      <div ref={pinRef} className="hero-cinematic__pin">
        <div className="absolute inset-0 z-0">
          <NextImage
            src={posterSrc}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>

        <canvas ref={canvasRef} className="absolute inset-0 z-[1] h-full w-full" aria-hidden />
        <div className="absolute inset-0 z-[2] hero-cinematic__vignette pointer-events-none" aria-hidden />

        {!isReady ? (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-4 bg-[#0a0f14]/70 px-6">
            <p className="text-sm text-secondary">
              {lang === "fa" ? "در حال بارگذاری فریم‌ها…" : "Loading frames…"}
            </p>
            <div className="h-1 w-full max-w-xs overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full bg-gold transition-all duration-300"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
            <p className="text-xs text-muted">{loadProgress}%</p>
          </div>
        ) : null}

        <div className="hero-cinematic__scrub-bar">
          <div className="hero-cinematic__chapter-stack" aria-live="polite">
            {chapters.map((chapter) => (
              <HeroChapterOverlay
                key={chapter.id}
                chapter={chapter}
                progress={scrollProgress}
                lang={lang}
              />
            ))}
          </div>
          <div
            className="hero-cinematic__scrub-track"
            role="progressbar"
            aria-valuenow={scrubPercent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={lang === "fa" ? "پیشرفت ویدیو" : "Video progress"}
          >
            <div
              className="hero-cinematic__scrub-fill"
              style={{ width: `${scrubPercent}%` }}
            />
          </div>
          <div className="mx-auto mt-4 max-w-3xl text-right">
            <h1 className="sr-only">{activeChapter.title} — German Group</h1>
            <p className="text-xs text-muted">{scrollHint}</p>
            <p className="mt-1 text-[0.65rem] tabular-nums text-muted/80">
              {scrubPercent}% · {lang === "fa" ? "اسکرول برای ادامه" : "scroll to continue"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
