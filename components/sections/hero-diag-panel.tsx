import Link from "next/link";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const STATUS_ITEMS = [
  { label: "موتور",   status: "سالم" },
  { label: "گیربکس", status: "سالم" },
  { label: "ECU",     status: "سالم" },
  { label: "تعلیق",   status: "سالم" },
  { label: "ترمز",    status: "سالم" },
] as const;

function DiagWaveform() {
  return (
    <svg
      viewBox="0 0 240 40"
      className="h-10 w-full"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="hero-wave" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(77,163,255,0.15)" />
          <stop offset="50%" stopColor="rgba(77,163,255,0.95)" />
          <stop offset="100%" stopColor="rgba(77,163,255,0.2)" />
        </linearGradient>
      </defs>
      <path
        d="M0 20 L12 20 L18 8 L24 32 L30 14 L36 26 L42 18 L48 22 L54 12 L60 28 L66 16 L72 24 L78 20 L84 10 L90 30 L96 18 L102 22 L108 14 L114 26 L120 20 L126 8 L132 32 L138 16 L144 24 L150 20 L156 12 L162 28 L168 18 L174 22 L180 14 L186 26 L192 20 L198 10 L204 30 L210 18 L216 22 L222 16 L228 24 L240 20"
        fill="none"
        stroke="url(#hero-wave)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="hero-wave-path"
      />
    </svg>
  );
}

export function HeroDiagPanel({ className }: { className?: string }) {
  return (
    <aside
      className={cn(
        "hero-diag-panel hero-diag-panel--adaptive shrink-0 pointer-events-auto",
        className
      )}
      aria-label="وضعیت خودرو"
    >
      <p className="hero-diag-panel__title mb-4 text-sm font-semibold text-primary">
        وضعیت خودرو
      </p>

      <ul className="hero-diag-panel__list mb-5 flex flex-col gap-2.5">
        {STATUS_ITEMS.map(({ label, status }) => (
          <li
            key={label}
            className="hero-diag-panel__item flex items-center justify-between gap-3 text-sm text-secondary"
          >
            <span>{label}</span>
            <span className="flex items-center gap-2 text-primary/90">
              <span className="hero-diag-panel__status text-xs text-secondary">
                {status}
              </span>
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15 ring-1 ring-emerald-400/40">
                <Check className="h-3 w-3 text-emerald-400" strokeWidth={2.5} aria-hidden />
              </span>
            </span>
          </li>
        ))}
      </ul>

      <Link href="#diagnostic" className="hero-diag-panel__report hero-diag-report-btn mb-5">
        گزارش کامل دیاگ
      </Link>

      <div className="hero-diag-panel__wave">
        <DiagWaveform />
      </div>
    </aside>
  );
}
