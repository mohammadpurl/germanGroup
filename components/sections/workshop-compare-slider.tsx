"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ChevronsLeftRight } from "lucide-react";

interface WorkshopCompareSliderProps {
  beforeSrc: string;
  afterSrc: string;
  alt: string;
}

export function WorkshopCompareSlider({
  beforeSrc,
  afterSrc,
  alt,
}: WorkshopCompareSliderProps) {
  const [pos, setPos] = useState(52);
  const trackRef = useRef<HTMLDivElement>(null);

  const move = useCallback((clientX: number) => {
    const el = trackRef.current;
    if (!el) return;
    const { left, width } = el.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, ((clientX - left) / width) * 100)));
  }, []);

  return (
    <div className="workshop-panel flex h-full flex-col">
      <div className="mb-4 flex items-center gap-3">
        <span className="h-px w-6 bg-gold/70" aria-hidden />
        <h3 className="text-base font-bold text-primary sm:text-lg">
          قبل و بعد از تعمیر
        </h3>
      </div>

      <div
        ref={trackRef}
        dir="ltr"
        className="workshop-compare-track relative min-h-[220px] flex-1 cursor-col-resize select-none overflow-hidden rounded-xl border border-white/10 sm:min-h-[280px] lg:min-h-[320px]"
        onMouseMove={(e) => move(e.clientX)}
        onTouchMove={(e) => move(e.touches[0].clientX)}
        role="slider"
        aria-label="مقایسه قبل و بعد"
        aria-valuenow={Math.round(pos)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <Image
          src={afterSrc}
          alt={`${alt} — بعد از تعمیر`}
          fill
          className="object-cover object-center"
          sizes="(max-width: 1024px) 100vw, 50vw"
          draggable={false}
        />

        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${pos}%` }}
        >
          <Image
            src={beforeSrc}
            alt={`${alt} — قبل از تعمیر`}
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
            draggable={false}
          />
        </div>

        <div
          className="absolute top-0 bottom-0 z-10 w-0.5 bg-white/80"
          style={{ left: `${pos}%` }}
        >
          <div className="absolute top-1/2 left-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/95 shadow-lg">
            <ChevronsLeftRight className="h-4 w-4 text-black" aria-hidden />
          </div>
        </div>

        <span className="absolute bottom-3 left-3 z-20 rounded-md bg-black/65 px-2 py-1 text-[0.65rem] text-primary">
          قبل
        </span>
        <span className="absolute bottom-3 right-3 z-20 rounded-md bg-black/65 px-2 py-1 text-[0.65rem] text-primary">
          بعد
        </span>
      </div>

      <Link
        href="#workshop"
        className="mt-4 inline-flex items-center gap-2 self-center text-xs text-secondary transition-colors hover:text-gold-light sm:text-sm"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
        مشاهده گالری بیشتر
        <ArrowLeft className="h-3.5 w-3.5 rotate-180" aria-hidden />
      </Link>
    </div>
  );
}
