"use client";
/**
 * Before / After — cinematic drag reveal
 */
import { useRef, useState, useCallback } from "react";
import { Container } from "@/components/ui/container";
import { MoveHorizontal } from "lucide-react";

const cases = [
  {
    id:     "engine",
    title:  "بازسازی موتور",
    before: "سایش سیلندر، فشار کاهش‌یافته، صدای ضربه",
    after:  "فشار کمپرس استاندارد، صدای صفر، گارانتی ۱۲ ماهه",
    brand:  "BMW 320i",
  },
  {
    id:     "gearbox",
    title:  "تعمیر گیربکس DSG",
    before: "لرزش هنگام تعویض دنده، تأخیر ۲+ ثانیه",
    after:  "تعویض فوری، بدون لرزش، نرم‌افزار آپدیت‌شده",
    brand:  "Audi A4",
  },
];

function CompareSlider({
  title,
  before,
  after,
  brand,
}: {
  title: string;
  before: string;
  after: string;
  brand: string;
}) {
  const [pos, setPos] = useState(50);
  const trackRef = useRef<HTMLDivElement>(null);

  const move = useCallback((clientX: number) => {
    const el = trackRef.current;
    if (!el) return;
    const { left, width } = el.getBoundingClientRect();
    const pct = Math.min(100, Math.max(0, ((clientX - left) / width) * 100));
    setPos(pct);
  }, []);

  return (
    <div className="before-after-card">
      {/* brand badge */}
      <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-black/60 border border-white/10 text-xs font-mono text-gold">
        {brand}
      </div>

      {/* visual comparison bar */}
      <div
        ref={trackRef}
        className="relative h-48 rounded-2xl overflow-hidden cursor-col-resize select-none mb-6 border border-white/6"
        onMouseMove={(e) => move(e.clientX)}
        onTouchMove={(e) => move(e.touches[0].clientX)}
      >
        {/* AFTER (full) */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] to-[#060d1a] flex items-center justify-center">
          <span className="text-green-400 text-xs font-mono uppercase tracking-widest opacity-60">
            AFTER — REPAIRED
          </span>
        </div>
        {/* BEFORE (clipped by drag handle) */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#1a0a0a] to-[#0d0606] flex items-center justify-center overflow-hidden"
          style={{ width: `${pos}%` }}
        >
          <span className="text-red-400 text-xs font-mono uppercase tracking-widest opacity-60 absolute left-1/2 -translate-x-1/2 whitespace-nowrap">
            BEFORE — FAULT
          </span>
        </div>
        {/* drag line */}
        <div
          className="absolute top-0 bottom-0 w-px bg-white/40 z-10 flex items-center justify-center"
          style={{ left: `${pos}%` }}
        >
          <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
            <MoveHorizontal className="w-4 h-4 text-black" strokeWidth={2} aria-hidden />
          </div>
        </div>
        {/* labels */}
        <span className="absolute bottom-3 right-3 z-20 text-[0.6rem] font-mono text-white/40 uppercase tracking-wider">
          بعد
        </span>
        <span className="absolute bottom-3 left-3 z-20 text-[0.6rem] font-mono text-white/40 uppercase tracking-wider">
          قبل
        </span>
      </div>

      {/* text content */}
      <h3 className="text-xl font-bold text-primary mb-4">{title}</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-mono text-red-400 uppercase tracking-wider">قبل</span>
          <p className="text-sm text-secondary leading-relaxed">{before}</p>
        </div>
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-mono text-green-400 uppercase tracking-wider">بعد</span>
          <p className="text-sm text-secondary leading-relaxed">{after}</p>
        </div>
      </div>
    </div>
  );
}

export function BeforeAfterSection() {
  return (
    <section id="workshop" className="relative scroll-mt-24 py-24 lg:py-32 overflow-hidden">
      <Container>
        <div className="flex flex-col gap-4 mb-14 max-w-xl">
          <p className="section-subtitle flex items-center gap-3">
            <MoveHorizontal className="w-4 h-4 text-gold shrink-0" aria-hidden />
            نتایج واقعی
          </p>
          <h2 className="section-title">
            قبل و بعد از
            <br />
            German Group.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {cases.map((c) => (
            <CompareSlider key={c.id} {...c} />
          ))}
        </div>
      </Container>
    </section>
  );
}
