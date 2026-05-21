import { cn } from "@/lib/utils";
import type { ReactNode, CSSProperties } from "react";

/**
 * CSS-only entrance — no framer-motion (avoids webpack/SSR chunk errors).
 */

interface AnimateInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: CSSProperties;
}

export function AnimateIn({
  children,
  delay = 0,
  className,
  style,
}: AnimateInProps) {
  return (
    <div
      className={cn("animate-hero-in", className)}
      style={{ animationDelay: `${delay}s`, ...style }}
    >
      {children}
    </div>
  );
}
