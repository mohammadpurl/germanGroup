import Link from "next/link";
import { Container } from "@/components/ui/container";
import { JsonLd } from "@/components/seo/json-ld";
import type { Locale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";
import {
  buildBreadcrumbSchema,
  buildLocalBusinessSchema,
  buildMetadata,
} from "@/lib/seo";
import type { Metadata } from "next";

type Props = { params: Promise<{ lang: string }> };

const CONTACT_COPY = {
  fa: {
    title: "تماس با German Group",
    description:
      "اطلاعات تماس، ساعات کاری و مسیر ارتباط با German Group برای رزرو نوبت، مشاوره فنی و پیگیری خدمات خودروهای آلمانی.",
    eyebrow: "ارتباط مستقیم",
    heading: "برای رزرو، مشاوره فنی و هماهنگی تعمیر با ما در تماس باشید.",
    body: "اگر برای موتور، گیربکس، دیاگ یا سرویس دوره‌ای خودروهای آلمانی نیاز به هماهنگی دارید، سریع‌ترین مسیر تماس، تماس تلفنی یا ثبت درخواست رزرو است.",
    addressLabel: "آدرس مجموعه",
    hoursLabel: "ساعات کاری",
    phoneLabel: "شماره تماس",
    emailLabel: "ایمیل",
    cta: "رزرو نوبت سرویس",
    home: "خانه",
    current: "تماس با ما",
  },
  en: {
    title: "Contact German Group",
    description:
      "Contact details, opening hours, and booking access for German Group German car repair and diagnostics services in Tehran.",
    eyebrow: "Direct Contact",
    heading:
      "Contact German Group for bookings, diagnostics, and specialist German car support.",
    body: "For engine repair, gearbox service, diagnostics, or scheduled maintenance, the fastest route is calling the workshop or starting a booking request.",
    addressLabel: "Workshop address",
    hoursLabel: "Opening hours",
    phoneLabel: "Phone",
    emailLabel: "Email",
    cta: "Book a service visit",
    home: "Home",
    current: "Contact",
  },
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as Locale;
  const copy = CONTACT_COPY[locale];

  return buildMetadata({
    locale,
    path: "/contact",
    title: copy.title,
    description: copy.description,
    keywords:
      locale === "fa"
        ? ["تماس تعمیرگاه آلمانی", "رزرو تعمیرگاه", "شماره تماس German Group"]
        : ["contact German Group", "German workshop phone number", "book auto repair Tehran"],
  });
}

export default async function ContactPage({ params }: Props) {
  const { lang } = await params;
  const locale = lang as Locale;
  const copy = CONTACT_COPY[locale];

  return (
    <main className="min-h-screen bg-background pt-28 pb-dock-safe md:pb-16">
      <Container>
        <JsonLd
          data={[
            buildLocalBusinessSchema(locale),
            buildBreadcrumbSchema(locale, [
              { name: copy.home, path: "" },
              { name: copy.current, path: "/contact" },
            ]),
          ]}
        />

        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted">
          <ol className="flex items-center gap-2">
            <li>
              <Link href={`/${locale}`} className="hover:text-primary transition-colors">
                {copy.home}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-primary">{copy.current}</li>
          </ol>
        </nav>

        <section className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start">
          <div className="flex flex-col gap-5">
            <p className="section-subtitle">{copy.eyebrow}</p>
            <h1 className="section-title max-w-2xl">{copy.heading}</h1>
            <p className="section-text">{copy.body}</p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link href={`/${locale}#booking`} className="btn-gold">
                {copy.cta}
              </Link>
              <a href={`tel:${siteConfig.phone}`} className="btn-primary">
                {locale === "fa" ? siteConfig.phoneDisplayFa : siteConfig.phoneDisplayEn}
              </a>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <article className="rounded-[24px] border border-white/8 bg-white/[0.03] p-6">
              <h2 className="mb-2 text-lg font-semibold text-primary">{copy.phoneLabel}</h2>
              <a
                href={`tel:${siteConfig.phone}`}
                dir="ltr"
                className="text-base text-secondary transition-colors hover:text-primary"
              >
                {locale === "fa" ? siteConfig.phoneDisplayFa : siteConfig.phoneDisplayEn}
              </a>
            </article>

            <article className="rounded-[24px] border border-white/8 bg-white/[0.03] p-6">
              <h2 className="mb-2 text-lg font-semibold text-primary">{copy.emailLabel}</h2>
              <a
                href={`mailto:${siteConfig.email}`}
                dir="ltr"
                className="text-base text-secondary transition-colors hover:text-primary"
              >
                {siteConfig.email}
              </a>
            </article>

            <article className="rounded-[24px] border border-white/8 bg-white/[0.03] p-6 sm:col-span-2">
              <h2 className="mb-2 text-lg font-semibold text-primary">{copy.addressLabel}</h2>
              <p className="text-base leading-8 text-secondary">
                {siteConfig.address.locality}، {siteConfig.address.street}
              </p>
            </article>

            <article className="rounded-[24px] border border-white/8 bg-white/[0.03] p-6 sm:col-span-2">
              <h2 className="mb-2 text-lg font-semibold text-primary">{copy.hoursLabel}</h2>
              <p className="text-base leading-8 text-secondary">
                {siteConfig.openingHours[locale]}
              </p>
            </article>
          </div>
        </section>
      </Container>
    </main>
  );
}
