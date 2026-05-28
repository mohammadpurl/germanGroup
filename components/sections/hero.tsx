import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Play } from "lucide-react";
import { Container } from "@/components/ui/container";
import { HeroDiagPanel } from "@/components/sections/hero-diag-panel";
import { type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const HERO_COPY: Record<
  Locale,
  {
    line1: string;
    line2: string;
    subLine1: string;
    subLine2: string;
    cta: string;
    video: string;
    imageAlt: string;
  }
> = {
  fa: {
    line1: "مهندسی دقیق.",
    line2: "استاندارد آلمانی.",
    subLine1: "مرکز تخصصی عیب‌یابی، تعمیر و سرویس",
    subLine2: "خودروهای BMW، Porsche و Mercedes-Benz",
    cta: "شروع دیاگ خودرو",
    video: "مشاهده ویدیو معرفی",
    imageAlt: "BMW — گاراژ German Group",
  },
  en: {
    line1: "Precision engineering.",
    line2: "German standard.",
    subLine1: "Specialist diagnostics, repair and service for",
    subLine2: "BMW, Porsche and Mercedes-Benz",
    cta: "Start vehicle diagnostics",
    video: "Watch introduction video",
    imageAlt: "BMW — German Group garage",
  },
};

interface HeroProps {
  lang: Locale;
}

export function Hero({ lang }: HeroProps) {
  const copy = HERO_COPY[lang];

  return (
    <section
      id="home"
      className="relative flex min-h-dvh scroll-mt-24 flex-col overflow-hidden bg-[#0a0f14]"
      aria-label="بخش اصلی"
    >
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden>
        <Image
          src="/Images/hero-garage.svg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="hero-bg-media"
          quality={85}
        />
        <div className="absolute inset-0 hero-vignette-mockup" />
      </div>

      {/* محتوا — موبایل زیر تصویر / دسکتاپ روی تصویر */}
      <div className="relative z-20 flex flex-1 flex-col justify-center pb-28 pt-[34vh] lg:pb-36 lg:pt-28">
        <Container>
          <div className="flex w-full flex-col gap-5 max-[429px]:gap-5 min-[430px]:flex-row min-[430px]:items-start min-[430px]:justify-between min-[430px]:gap-3 sm:gap-5 lg:items-center lg:gap-6">
            {/* RTL: راست — متن */}
            <div className="w-full min-w-0 text-right min-[430px]:flex-1 lg:max-w-[38rem] xl:max-w-[42rem]">
              <h1 className="hero-mockup-headline hero-mockup-headline--row">
                <span className="block text-primary lg:whitespace-nowrap">{copy.line1}</span>
                <span className="hero-mockup-headline-gold block lg:whitespace-nowrap">
                  {copy.line2}
                </span>
              </h1>

              <p className="hero-subtext mt-3 text-xs sm:mt-4 sm:text-sm md:text-[0.9375rem]">
                <span className="hero-subtext-line">{copy.subLine1}</span>
                <span className="hero-subtext-line hero-subtext-brands mt-1">
                  {copy.subLine2}
                </span>
              </p>

              <div className="mt-4 flex flex-col items-start gap-3 sm:mt-6 sm:gap-4 lg:mt-8 lg:gap-5">
                <Link
                  href="#diagnostic"
                  className={cn(
                    "btn-gold gap-2 whitespace-nowrap !px-4 !py-2.5 text-xs sm:!px-5 sm:text-sm lg:!px-7 lg:!py-3.5"
                  )}
                >
                  <span>{copy.cta}</span>
                  <ArrowLeft className="h-4 w-4 opacity-90" aria-hidden />
                </Link>

                <Link
                  href="#services"
                  className="inline-flex max-w-full items-center gap-2 text-xs text-secondary transition-colors hover:text-gold-light sm:gap-3 sm:text-sm"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-md sm:h-11 sm:w-11">
                    <Play
                      className="h-3.5 w-3.5 fill-primary/80 text-primary sm:h-4 sm:w-4"
                      aria-hidden
                    />
                  </span>
                  <span className="min-[430px]:truncate">{copy.video}</span>
                </Link>
              </div>
            </div>

            {/* RTL: چپ — پنل دیاگ (زیر 430px سطر جدا) */}
            <div className="flex w-full justify-center min-[430px]:w-auto min-[430px]:shrink-0 lg:justify-end">
              <HeroDiagPanel className="w-full max-w-[19rem] min-[430px]:w-[10.25rem] min-[430px]:max-w-none sm:min-[430px]:w-[11.5rem] lg:w-full lg:max-w-[17.5rem]" />
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
