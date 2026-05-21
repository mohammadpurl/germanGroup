import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import type { ReactNode } from "react";

/**
 * Standard section wrapper — DS spacing rhythm
 * Desktop: py-[140px] · Mobile: py-20
 */

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  containerClassName?: string;
  narrow?: boolean;
  ariaLabel?: string;
}

export function Section({
  children,
  id,
  className,
  containerClassName,
  narrow,
  ariaLabel,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn(
        "py-20 lg:py-[8.75rem]",
        className
      )}
    >
      <Container narrow={narrow} className={containerClassName}>
        {children}
      </Container>
    </section>
  );
}
