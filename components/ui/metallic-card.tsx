"use client";

/**
 * MetallicCard — mouse/touch tracking metallic reflection
 * مثل HUD خودرو — نور روی کارت حرکت می‌کند
 * Pure CSS + React, no framer-motion
 */

import { useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface MetallicCardProps {
  children: ReactNode;
  className?: string;
}

export function MetallicCard({ children, className }: MetallicCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = ((e.clientX - left) / width)  * 100;
    const y = ((e.clientY - top)  / height) * 100;
    el.style.setProperty("--mx", `${x}%`);
    el.style.setProperty("--my", `${y}%`);
    el.style.setProperty("--opacity", "1");
  }, []);

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--opacity", "0");
  }, []);

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn("metallic-card", className)}
      style={
        {
          "--mx": "50%",
          "--my": "50%",
          "--opacity": "0",
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
