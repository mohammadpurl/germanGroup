import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
  variant?: "default" | "hero";
}

export function GlassCard({
  children,
  className,
  glow,
  variant = "default",
}: GlassCardProps) {
  return (
    <div
      className={cn(
        variant === "hero" ? "glass-card-hero rounded-2xl" : "glass-surface rounded-2xl",
        glow && "glow-gold",
        className
      )}
    >
      {children}
    </div>
  );
}
