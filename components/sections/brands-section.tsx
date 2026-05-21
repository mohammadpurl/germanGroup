/**
 * تخصص ما — برندهای آلمانی + آمار
 */
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/container";

const BRAND_CARDS = [
  {
    name: "Porsche",
    image: "/Images/porsche.png",
    href: "#services",
  },
  {
    name: "BMW",
    image: "/Images/BMW.png",
    href: "#services",
  },
  {
    name: "Mercedes-Benz",
    image: "/Images/benz.png",
    href: "#services",
  },
] as const;

const STATS: {
  value: string;
  label?: string;
  highlight?: boolean;
}[] = [
  { value: "تجهیزات پیشرفته", highlight: true },
  { value: "۹۸٪", label: "رضایت مشتریان", highlight: true  },
  { value: "+۳۲۰۰", label: "خودروی سرویس‌شده", highlight: true  },
  { value: "+۱۲", label: "سال تجربه", highlight: true  },
];

export function BrandsSection() {
  return (
    <section id="brands" className="relative scroll-mt-24 overflow-hidden py-20 lg:py-28">
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
        }}
        aria-hidden
      />

      <Container>
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-8 xl:gap-14">
          {/* RTL: راست — متن و آمار */}
          <div className="min-w-0 text-right lg:max-w-[26rem] xl:max-w-[28rem]">
            <p className="section-subtitle mb-4">تخصص ما</p>
            <h2 className="section-title mb-5 text-balance">
              مهندسی شده برای برترین برندهای آلمانی
            </h2>
            <p className="section-text mb-8 max-w-none text-[0.9375rem] leading-8">
              ما به‌صورت تخصصی روی سیستم‌های پیچیده و پیشرفته خودروهای آلمانی کار
              می‌کنیم.
            </p>

            <div className="expertise-stats-bar">
              {STATS.map((stat, index) => (
                <div key={stat.value} className="flex min-w-0 flex-1 items-stretch">
                  {index > 0 && (
                    <span
                      className="mx-3 w-px shrink-0 self-stretch bg-white/10 lg:mx-4"
                      aria-hidden
                    />
                  )}
                  <div className="flex min-w-0 flex-1 flex-col items-center justify-center gap-1 text-center">
                    <span
                      className={
                        stat.highlight
                          ? "text-xs font-semibold leading-snug text-gold sm:text-sm"
                          : "text-xl font-bold tracking-tight text-primary sm:text-2xl"
                      }
                    >
                      {stat.value}
                    </span>
                    {stat.label && (
                      <span className="text-[0.65rem] leading-tight text-muted sm:text-xs">
                        {stat.label}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* چپ — کارت‌های برند */}
          <div
            className="flex w-full flex-col gap-4 px-3 sm:gap-5 sm:px-4 lg:w-auto lg:shrink-0 lg:flex-row lg:items-stretch lg:justify-center lg:gap-3 lg:px-0 xl:gap-4"
            dir="ltr"
          >
            {BRAND_CARDS.map((brand) => (
              <Link
                key={brand.name}
                href={brand.href}
                className="expertise-brand-card group"
                aria-label={`مشاهده خدمات ${brand.name}`}
              >
                <div className="expertise-brand-card__media">
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 1023px) 100vw, 248px"
                  />
                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-1.5 bg-gradient-to-t from-black/90 via-black/55 to-transparent px-3 pb-3.5 pt-10">
                    <span className="text-xs font-medium text-primary/95">
                      مشاهده خدمات
                    </span>
                    <ArrowLeft
                      className="h-3.5 w-3.5 text-gold transition-transform duration-300 group-hover:-translate-x-0.5"
                      aria-hidden
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Container>

      <div
        className="absolute bottom-0 inset-x-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
        }}
        aria-hidden
      />
    </section>
  );
}
