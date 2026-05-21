/**
 * German Group — Design Tokens
 * Source of truth: docs/design-system.md
 * Persian (fa) · RTL-first
 */

export const colors = {
  bg: "#060606",
  bgSecondary: "#0f0f10",
  bgElevated: "rgba(255,255,255,0.04)",
  glass: "rgba(255,255,255,0.06)",
  glassBorder: "rgba(255,255,255,0.08)",
  foreground: "#ffffff",
  muted: "#9ca3af",
  mutedDark: "#6b7280",
  accent: "#7dd3fc",
  metallic: "#d1d5db",
  gold: "#c9a227",
  goldGlow: "rgba(201, 162, 39, 0.35)",
} as const;

export const typography = {
  hero: {
    desktop: "4.5rem", // 72px
    mobile: "2.625rem", // 42px
    weight: 700,
    lineHeight: 0.95,
    letterSpacing: "-0.04em",
  },
  sectionTitle: {
    desktop: "3rem",
    mobile: "2rem",
    weight: 600,
  },
  cardTitle: { size: "1.25rem", weight: 600 },
  body: { size: "1rem", lineHeight: 1.7 },
  small: { size: "0.875rem", opacity: 0.7 },
} as const;

export const layout = {
  maxWidth: 1440,
  sectionPaddingDesktop: 140,
  sectionPaddingMobile: 80,
  gridColumns: 12,
} as const;

export const motion = {
  duration: 0.7,
  ease: [0.22, 1, 0.36, 1] as const,
  stagger: 0.08,
} as const;

export const glass = {
  blur: "20px",
  background: colors.glass,
  border: `1px solid ${colors.glassBorder}`,
  radius: "24px",
} as const;

export const dock = {
  background: "rgba(15,15,16,0.72)",
  blur: "20px",
  border: colors.glassBorder,
  radius: "9999px",
} as const;
