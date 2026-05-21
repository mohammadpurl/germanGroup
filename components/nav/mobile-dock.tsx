"use client";

/**
 * German Group — Mobile bottom dock
 * Gold palette · CSS wrench slide · pointer lighting
 */

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import {
  Home,
  Cpu,
  Settings,
  Wrench,
  Star,
  Phone,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  MAIN_NAV_LINKS,
  PAGE_SECTION_IDS,
  type PageSectionId,
} from "@/lib/site-nav";

type DockId = PageSectionId;

const DOCK_ICONS: Record<DockId, LucideIcon> = {
  home: Home,
  brands: Star,
  services: Settings,
  workshop: Wrench,
  diagnostic: Cpu,
  booking: Phone,
};

/** همان لیست منوی دسکتاپ */
const ITEMS = MAIN_NAV_LINKS.map(({ label, href, sectionId }) => ({
  id: sectionId as DockId,
  label,
  href,
  icon: DOCK_ICONS[sectionId as DockId],
  sectionId,
}));

/** عرض نشانگر آچار روی ریل (پیکسل) */
const WRENCH_INDICATOR_WIDTH = 28;

export function MobileDock() {
  const [activeId, setActiveId] = useState<DockId>("home");
  const [wrenchX, setWrenchX] = useState(0);

  const panelRef = useRef<HTMLDivElement>(null);
  const navRowRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Partial<Record<DockId, HTMLElement>>>({});

  const moveWrench = useCallback((id: DockId) => {
    const row = navRowRef.current;
    if (!row) return;

    const item = itemRefs.current[id];
    if (!item) return;

    const rowBox = row.getBoundingClientRect();
    const itemBox = item.getBoundingClientRect();
    const center = itemBox.left + itemBox.width / 2 - rowBox.left;
    setWrenchX(center - WRENCH_INDICATOR_WIDTH / 2);
  }, []);

  useLayoutEffect(() => {
    const run = () => moveWrench(activeId);
    run();
    requestAnimationFrame(run);
  }, [activeId, moveWrench]);

  useEffect(() => {
    const onResize = () => moveWrench(activeId);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [activeId, moveWrench]);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY < 80) {
        setActiveId("home");
        return;
      }

      let next: DockId = "home";
      for (const sectionId of PAGE_SECTION_IDS) {
        const el = document.getElementById(sectionId);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= window.innerHeight * 0.52) {
          next = sectionId;
        }
      }
      setActiveId(next);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const panel = panelRef.current;
    if (!panel) return;
    const { left, top, width, height } = panel.getBoundingClientRect();
    panel.style.setProperty("--dock-x", `${((e.clientX - left) / width) * 100}%`);
    panel.style.setProperty("--dock-y", `${((e.clientY - top) / height) * 100}%`);
  }, []);

  return (
    <nav
      className="md:hidden fixed inset-x-0 bottom-0 z-50 px-2 pointer-events-none"
      style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
      aria-label="ناوبری موبایل"
    >
      <div
        ref={panelRef}
        onPointerMove={onPointerMove}
        className="mobile-dock-panel pointer-events-auto mx-auto w-full max-w-2xl rounded-[1.4rem] px-2 sm:px-3"
      >
        <div
          ref={navRowRef}
          className="relative z-[1] flex overflow-x-auto overscroll-x-contain scrollbar-none pt-2 pb-1 [-webkit-overflow-scrolling:touch]"
        >
          {ITEMS.map(({ id, label, href, icon: Icon }, index) => {
            const isActive = id === activeId;

            return (
              <div
                key={id}
                className="relative flex min-w-[4.75rem] flex-1 basis-0 items-stretch sm:min-w-0"
              >
                {index > 0 && (
                  <span
                    className="absolute inset-y-2 start-0 z-0 w-px bg-white/6"
                    aria-hidden
                  />
                )}
                <Link
                  href={href}
                  ref={(el) => {
                    if (el) itemRefs.current[id] = el;
                  }}
                  onClick={() => {
                    setActiveId(id);
                    moveWrench(id);
                  }}
                  aria-label={label}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative z-[1] flex w-full flex-col items-center justify-center gap-0.5 px-0.5 py-1.5 transition-all duration-[400ms] sm:gap-1 sm:py-2",
                    isActive
                      ? "dock-nav-item-active"
                      : "text-muted hover:text-secondary"
                  )}
                >
                  <Icon
                    className="h-4 w-4 shrink-0 transition-all duration-[400ms] sm:h-[1.15rem] sm:w-[1.15rem]"
                    strokeWidth={isActive ? 2 : 1.5}
                  />
                  <span className="w-full text-center text-[0.5rem] font-medium leading-tight sm:text-[0.5625rem]">
                    {label}
                  </span>
                </Link>
              </div>
            );
          })}
        </div>

        <div className="relative z-[1] h-10 pb-2">
          <div className="dock-rail-track absolute inset-x-0 top-1/2 -translate-y-1/2" aria-hidden />

          <div
            className="dock-wrench flex items-center justify-center"
            style={{ transform: `translate(${wrenchX}px, -50%)` }}
            aria-hidden
          >
            <Wrench
              className="h-5 w-5 rotate-[-28deg] text-gold drop-shadow-[0_2px_6px_rgba(0,0,0,0.55)]"
              strokeWidth={2.25}
              style={{
                filter: "drop-shadow(0 0 8px rgba(198,169,107,0.45))",
              }}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
