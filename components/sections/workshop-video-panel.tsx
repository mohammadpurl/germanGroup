"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

const WORKSHOP_STATS = [
  { value: "100%", label: "قطعات اورجینال" },
  { value: "8", label: "دستگاه دیاگ اصلی" },
  { value: "16", label: "تکنسین متخصص" },
  { value: "2,600+", label: "متر فضای کاری" },
] as const;

interface WorkshopVideoPanelProps {
  posterSrc: string;
  videoSrc?: string;
}

export function WorkshopVideoPanel({ posterSrc, videoSrc }: WorkshopVideoPanelProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="workshop-panel flex h-full flex-col">
      <div className="mb-4 flex items-center gap-3">
        <span className="h-px w-6 bg-gold/70" aria-hidden />
        <h3 className="text-base font-bold text-primary sm:text-lg">فضای تعمیرگاه</h3>
      </div>

      <div className="workshop-video-wrap flex flex-1 flex-col overflow-hidden rounded-xl border border-white/10">
        <div className="relative min-h-[220px] flex-1 sm:min-h-[280px] lg:min-h-[320px]">
          {playing && videoSrc ? (
            <video
              src={videoSrc}
              controls
              autoPlay
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <>
              <Image
                src={posterSrc}
                alt="فضای تعمیرگاه German Group"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-black/35" aria-hidden />
              <button
                type="button"
                onClick={() => videoSrc && setPlaying(true)}
                className="absolute top-1/2 left-1/2 z-10 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/15 backdrop-blur-md transition-all hover:scale-105 hover:border-gold/50 hover:bg-white/25"
                aria-label="پخش ویدیو تعمیرگاه"
              >
                <Play className="h-6 w-6 fill-primary text-primary" aria-hidden />
              </button>
            </>
          )}
        </div>

        <div className="workshop-stats-bar">
          {WORKSHOP_STATS.map((stat, index) => (
            <div key={stat.label} className="flex min-w-0 flex-1 items-stretch">
              {index > 0 && (
                <span
                  className="mx-2 w-px shrink-0 self-stretch bg-white/10 sm:mx-3"
                  aria-hidden
                />
              )}
              <div className="flex min-w-0 flex-1 flex-col items-center justify-center gap-0.5 text-center">
                <span className="text-lg font-bold text-gold sm:text-xl">{stat.value}</span>
                <span className="text-[0.625rem] leading-tight text-muted sm:text-xs">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
