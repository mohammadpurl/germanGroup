import Link from "next/link";
import { Container } from "@/components/ui/container";
import { JsonLd } from "@/components/seo/json-ld";
import type { Locale } from "@/lib/i18n";
import {
  buildBreadcrumbSchema,
  buildLocalBusinessSchema,
  buildMetadata,
} from "@/lib/seo";
import type { Metadata } from "next";

type Props = { params: Promise<{ lang: string }> };

const ABOUT_COPY = {
  fa: {
    title: "درباره German Group",
    description:
      "با فرایند کار، تخصص برندهای آلمانی، تجهیزات دیاگ و استانداردهای تعمیرگاه German Group آشنا شوید.",
    eyebrow: "درباره مجموعه",
    heading: "German Group روی یک چیز تمرکز کرده است: تعمیر درست خودروهای آلمانی.",
    intro:
      "ما تعمیرگاه عمومی نیستیم. تمرکز ما روی BMW، Mercedes-Benz، Audi، Porsche و دیگر خودروهای آلمانی است؛ یعنی روی سیستم‌هایی که بدون تخصص برندمحور، تشخیص و تعمیر آن‌ها معمولاً به آزمون‌وخطا تبدیل می‌شود.",
    home: "خانه",
    current: "درباره ما",
    pillars: [
      {
        title: "تشخیص قبل از تعویض",
        text: "هر تعمیر از دیاگ و تست داده‌های واقعی شروع می‌شود تا قطعه سالم بی‌دلیل تعویض نشود.",
      },
      {
        title: "تمرکز روی برندهای آلمانی",
        text: "به‌جای پراکندگی، دانش و ابزار ما روی خودروهایی متمرکز شده که ساختار پیچیده‌تر و حساس‌تری دارند.",
      },
      {
        title: "تحویل شفاف و قابل پیگیری",
        text: "مشتری باید بداند ایراد کجاست، چه کاری انجام می‌شود و نتیجه تعمیر چگونه ارزیابی شده است.",
      },
    ],
  },
  en: {
    title: "About German Group",
    description:
      "Learn how German Group approaches diagnostics, German-brand specialization, workshop standards, and repair transparency.",
    eyebrow: "About Us",
    heading:
      "German Group focuses on one thing: repairing German vehicles the right way.",
    intro:
      "We are not a generic workshop. Our focus is BMW, Mercedes-Benz, Audi, Porsche, and related German platforms, where correct diagnosis and brand-specific process matter far more than guesswork.",
    home: "Home",
    current: "About",
    pillars: [
      {
        title: "Diagnosis before replacement",
        text: "Every repair begins with live diagnostics and test-based reasoning so healthy parts are not replaced unnecessarily.",
      },
      {
        title: "German-brand specialization",
        text: "Instead of covering every brand broadly, we concentrate our tools and know-how on vehicles that require deeper brand-specific understanding.",
      },
      {
        title: "Transparent delivery",
        text: "Customers should know what failed, what is being repaired, and how the result is validated before handover.",
      },
    ],
  },
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as Locale;
  const copy = ABOUT_COPY[locale];

  return buildMetadata({
    locale,
    path: "/about",
    title: copy.title,
    description: copy.description,
    keywords:
      locale === "fa"
        ? ["درباره German Group", "تعمیرگاه خودرو آلمانی", "تخصص بی ام و و بنز"]
        : ["about German Group", "German car workshop", "BMW Mercedes specialist"],
  });
}

export default async function AboutPage({ params }: Props) {
  const { lang } = await params;
  const locale = lang as Locale;
  const copy = ABOUT_COPY[locale];

  return (
    <main className="min-h-screen bg-bg pt-24 pb-dock-safe">
      <Container narrow>
        <JsonLd
          data={[
            buildLocalBusinessSchema(locale),
            buildBreadcrumbSchema(locale, [
              { name: copy.home, path: "" },
              { name: copy.current, path: "/about" },
            ]),
          ]}
        />
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted">
          <ol className="flex items-center gap-2">
            <li>
              <Link href={`/${locale}`} className="transition-colors hover:text-primary">
                {copy.home}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-primary">{copy.current}</li>
          </ol>
        </nav>

        <section className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <p className="section-subtitle">{copy.eyebrow}</p>
            <h1 className="section-title">{copy.heading}</h1>
            <p className="section-text">{copy.intro}</p>
          </div>

          <div className="grid gap-4">
            {copy.pillars.map((pillar) => (
              <article
                key={pillar.title}
                className="rounded-[24px] border border-white/8 bg-white/[0.03] p-6"
              >
                <h2 className="mb-3 text-xl font-semibold text-primary">{pillar.title}</h2>
                <p className="text-base leading-8 text-secondary">{pillar.text}</p>
              </article>
            ))}
          </div>
        </section>
      </Container>
    </main>
  );
}
