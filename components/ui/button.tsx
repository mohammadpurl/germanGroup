"use client";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";

type Variant = "primary" | "secondary" | "ghost" | "accent";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-white text-bg font-semibold hover:bg-white/90 active:opacity-90",
  secondary:
    "border border-white/20 bg-transparent text-white font-semibold hover:bg-white/5",
  ghost: "text-muted hover:text-white hover:bg-white/5 font-medium",
  accent: "btn-gold",
};

const sizeStyles: Record<Size, string> = {
  sm: "h-11 px-5 text-sm rounded-full gap-1.5",
  md: "h-12 px-7 text-base rounded-full gap-2",
  lg: "h-14 px-9 text-base rounded-full gap-2.5",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center transition-all duration-300 ease-premium",
        "disabled:opacity-50 disabled:pointer-events-none",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
);

Button.displayName = "Button";
