"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const SERVICES = [
  {
    id: "diag",
    title: "دیاگ و عیب‌یابی",
    description: "عیب‌یابی دقیق با پیشرفته‌ترین دستگاه‌های دیاگ اصلی",
    image: "/Images/service1.png",
    href: "#diagnostic",
  },
  {
    id: "engine",
    title: "تعمیر موتور",
    description: "تعمیر تخصصی انواع موتورهای توربو، بنزینی و دیزلی",
    image: "/Images/service2.png",
    href: "#services",
  },
  {
    id: "gearbox",
    title: "تعمیر گیربکس",
    description: "تعمیر تخصصی گیربکس‌های اتوماتیک و دوکلاچه با ضمانت",
    image: "/Images/service3.png",
    href: "#services",
  },
  {
    id: "suspension",
    title: "تعلیق و ترمز",
    description: "تعمیر و سرویس سیستم تعلیق و ترمز با قطعات اورجینال",
    image: "/Images/service4.png",
    href: "#services",
  },
  {
    id: "software",
    title: "به‌روزرسانی نرم‌افزار خودرو",
    description: "آپدیت ECU، ماژول‌ها و سیستم‌های الکترونیکی با نرم‌افزار رسمی برند",
    image: "/Images/updatesoftware.png",
    href: "#diagnostic",
  },
  {
    id: "keys",
    title: "ساخت سوئیچ کلیه خودروهای وارداتی",
    description: "برنامه‌ریزی و ساخت کلید و ریموت انواع خودروهای وارداتی با تجهیزات تخصصی",
    image: "/Images/key.png",
    href: "#services",
  },
] as const;

export function ServicesCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const max = scrollWidth - clientWidth - 2;
    setCanPrev(scrollLeft > 2);
    setCanNext(scrollLeft < max);
  }, []);

  useEffect(() => {
    updateArrows();
    window.addEventListener("resize", updateArrows);
    return () => window.removeEventListener("resize", updateArrows);
  }, [updateArrows]);

  const scroll = useCallback((direction: "prev" | "next") => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-service-card]");
    const step = card ? card.offsetWidth + 16 : el.clientWidth * 0.85;
    el.scrollBy({
      left: direction === "next" ? step : -step,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="relative" dir="ltr">
      <button
        type="button"
        onClick={() => scroll("prev")}
        disabled={!canPrev}
        className={cn(
          "service-carousel-nav service-carousel-nav--prev",
          !canPrev && "opacity-30 pointer-events-none"
        )}
        aria-label="اسلاید قبلی"
      >
        <ChevronLeft className="h-5 w-5" aria-hidden />
      </button>

      <button
        type="button"
        onClick={() => scroll("next")}
        disabled={!canNext}
        className={cn(
          "service-carousel-nav service-carousel-nav--next",
          !canNext && "opacity-30 pointer-events-none"
        )}
        aria-label="اسلاید بعدی"
      >
        <ChevronRight className="h-5 w-5" aria-hidden />
      </button>

      <div
        ref={trackRef}
        onScroll={updateArrows}
        className="service-carousel-track flex gap-4 overflow-x-auto px-10 sm:px-12 lg:px-12"
      >
        {SERVICES.map((service) => (
          <article
            key={service.id}
            data-service-card
            className="service-carousel-card group shrink-0 snap-start"
          >
            <div className="service-carousel-card__media relative overflow-hidden">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.04]"
                sizes="(max-width: 640px) 85vw, (max-width: 1024px) 48vw, 280px"
              />
            </div>

            <div className="flex flex-col gap-2 p-4 text-right" dir="rtl">
              <h3 className="text-base font-bold text-primary sm:text-lg">
                {service.title}
              </h3>
              <p className="text-xs leading-6 text-secondary sm:text-sm">
                {service.description}
              </p>
              <Link
                href={service.href}
                className="mt-1 inline-flex items-center gap-1.5 text-xs font-medium text-gold transition-colors hover:text-gold-light sm:text-sm"
              >
                بیشتر بدانید
                <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
