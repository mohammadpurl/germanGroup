"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  MAIN_NAV_LINKS,
  PAGE_SECTION_IDS,
  type PageSectionId,
} from "@/lib/site-nav";

type NavId = PageSectionId;

export function GermanNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<NavId>("home");
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const navCenterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 16);

      if (window.scrollY < 80) {
        setActiveId("home");
        return;
      }

      let found: NavId = "home";
      for (const sectionId of PAGE_SECTION_IDS) {
        const el = document.getElementById(sectionId);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.52) {
          found = sectionId;
        }
      }
      setActiveId(found);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const el = linkRefs.current[activeId];
    const nav = navCenterRef.current;
    if (!el || !nav) return;
    const navRect = nav.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    setIndicator({
      left: elRect.left - navRect.left,
      width: elRect.width,
    });
  }, [activeId]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-white/8 bg-background/90 shadow-[0_4px_28px_rgba(0,0,0,0.5)] backdrop-blur-xl"
          : "bg-gradient-to-b from-[#0a0f14]/85 to-transparent"
      )}
    >
      <nav className="container-custom relative flex h-16 items-center justify-between lg:h-[4.75rem]">
        <Link href="/fa" className="flex shrink-0 items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-lg text-lg font-bold text-[#0a0f14]"
            style={{
              background:
                "linear-gradient(135deg, #e0c48a 0%, #c6a96b 50%, #8f6f3e 100%)",
              boxShadow: "0 0 20px rgba(198,169,107,0.25)",
            }}
            aria-hidden
          >
            G
          </div>
          <div className="hidden flex-col sm:flex">
            <span className="text-sm font-semibold tracking-[0.14em] text-primary uppercase">
              German Group
            </span>
            <span className="text-[0.65rem] text-muted leading-tight">
              مهندسی دقیق، استاندارد آلمانی
            </span>
          </div>
        </Link>

        <div
          ref={navCenterRef}
          className="absolute left-1/2 hidden max-w-[min(70vw,48rem)] -translate-x-1/2 items-center gap-0.5 overflow-x-auto pb-1 scrollbar-none [-webkit-overflow-scrolling:touch] md:flex lg:max-w-[min(58rem,72vw)]"
        >
          {MAIN_NAV_LINKS.map(({ label, href, sectionId }) => {
            const isActive = activeId === sectionId;
            return (
              <a
                key={sectionId}
                ref={(el) => {
                  linkRefs.current[sectionId] = el;
                }}
                href={href}
                className={cn(
                  "relative px-2.5 py-2 text-xs font-medium transition-colors duration-300 xl:px-3.5 xl:text-sm",
                  isActive ? "text-gold" : "text-secondary hover:text-primary"
                )}
              >
                {label}
              </a>
            );
          })}

          <span
            className="absolute bottom-0 h-0.5 rounded-full transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]"
            style={{
              left: indicator.left,
              width: indicator.width,
              background:
                "linear-gradient(90deg, transparent, #c6a96b, transparent)",
              boxShadow: "0 0 10px rgba(198,169,107,0.45)",
              opacity: indicator.width > 0 ? 1 : 0,
            }}
            aria-hidden
          />
        </div>

        <div className="flex shrink-0 items-center gap-2.5">
          <Link href="#booking" className="btn-gold hidden !px-5 !py-2.5 text-xs sm:inline-flex">
            رزرو نوبت
          </Link>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/12 bg-white/[0.03] text-secondary transition-colors hover:border-white/20 hover:text-primary"
            aria-label="پروفایل کاربر"
          >
            <User className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.5} aria-hidden />
          </button>
        </div>
      </nav>
    </header>
  );
}
