import { JsonLd } from "@/components/seo/json-ld";
import { HeroCinematic } from "@/components/sections/hero-cinematic";
import { BrandsSection } from "@/components/sections/brands-section";
import { ServicesSection } from "@/components/sections/services-section";
import { DiagnosticSection } from "@/components/sections/diagnostic-section";
import { WorkshopShowcaseSection } from "@/components/sections/workshop-showcase-section";
import { DashboardPreviewSection } from "@/components/sections/dashboard-preview-section";
import { ReservationSection } from "@/components/sections/reservation-section";
import { type Locale } from "@/lib/i18n";
import {
  buildLocalBusinessSchema,
  buildMetadata,
  buildOrganizationSchema,
  buildServiceCatalogSchema,
} from "@/lib/seo";
import type { Metadata } from "next";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as Locale;

  return buildMetadata({
    locale,
    title:
      locale === "fa"
        ? "تعمیرگاه تخصصی خودروهای آلمانی در تهران"
        : "German Car Repair, Diagnostics & Workshop Services in Tehran",
    description:
      locale === "fa"
        ? "German Group خدمات تخصصی تعمیر موتور، گیربکس، دیاگ، سرویس دوره‌ای و دیتیلینگ خودروهای آلمانی را با تجهیزات اصلی و فرآیند مهندسی‌شده ارائه می‌کند."
        : "German Group delivers specialist German car engine repair, gearbox service, diagnostics, scheduled maintenance, and workshop support with OEM-grade tools.",
    keywords:
      locale === "fa"
        ? [
            "تعمیرگاه خودرو آلمانی",
            "تعمیر موتور بی ام و",
            "تعمیر گیربکس بنز",
            "دیاگ پورشه",
            "German Group",
          ]
        : [
            "German car repair Tehran",
            "BMW engine repair",
            "Mercedes gearbox specialist",
            "Porsche diagnostics",
            "German Group",
          ],
  });
}

export default async function LandingPage({ params }: Props) {
  const { lang } = await params;
  const locale = lang as Locale;

  return (
    <main className="relative min-h-screen bg-background pb-dock-safe md:pb-0">
      <link
        rel="preload"
        as="image"
        href="/video_frames/f_001.webp"
        media="(min-width: 768px)"
      />
      <link
        rel="preload"
        as="image"
        href="/video/frames-mobile/f_001.webp"
        media="(max-width: 767px)"
      />
      <JsonLd
        data={[
          buildOrganizationSchema(),
          buildLocalBusinessSchema(locale),
          buildServiceCatalogSchema(locale),
        ]}
      />

      {/* 1 — Hero Cinematic Scroll */}
      <HeroCinematic lang={locale} />

      {/* 2 — تخصص ما: Porsche · BMW · Mercedes */}
      <BrandsSection />

      {/* 3 — خدمات تخصصی ما (carousel) */}
      <ServicesSection />

      {/* 4 — فضای تعمیرگاه + قبل و بعد */}
      <WorkshopShowcaseSection />

      {/* 5 — Diagnostic Experience: ECU / HUD terminal */}
      <DiagnosticSection />

      {/* 6 — Customer Dashboard Preview */}
      <DashboardPreviewSection />

      {/* 7 — Reservation System */}
      <ReservationSection />
    </main>
  );
}
