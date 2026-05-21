import { GermanNavbar }            from "@/components/nav/german-navbar";
import { MobileDock }              from "@/components/nav/mobile-dock";
import { Hero }                    from "@/components/sections/hero";
import { BrandsSection }           from "@/components/sections/brands-section";
import { ServicesSection }         from "@/components/sections/services-section";
import { DiagnosticSection }       from "@/components/sections/diagnostic-section";
import { WorkshopShowcaseSection } from "@/components/sections/workshop-showcase-section";
import { DashboardPreviewSection } from "@/components/sections/dashboard-preview-section";
import { ReservationSection }      from "@/components/sections/reservation-section";
import { FooterSection }           from "@/components/sections/footer-section";
import { type Locale, locales }    from "@/lib/i18n";
import type { Metadata }           from "next";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return {
    alternates: {
      canonical: `/${lang}`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}`])),
    },
  };
}

export default async function LandingPage({ params }: Props) {
  const { lang } = await params;
  const locale = lang as Locale;

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background pb-dock-safe md:pb-0">
      <GermanNavbar />

      {/* 1 — Hero Command Center */}
      <Hero lang={locale} />

      {/* 2 — تخصص ما: Porsche · BMW · Mercedes */}
      <BrandsSection />

      {/* 3 — خدمات تخصصی ما (carousel) */}
      <ServicesSection />

      {/* 4 — فضای تعمیرگاه + قبل و بعد */}
      <WorkshopShowcaseSection />

      {/* 5 — Diagnostic Experience: ECU / HUD terminal */}
      <DiagnosticSection />

      {/* 6 — Customer Dashboard Preview */}
      {/* <DashboardPreviewSection /> */}

      {/* 7 — Reservation System */}
      <ReservationSection />

      {/* Footer */}
      <FooterSection />

      <MobileDock />
    </main>
  );
}
