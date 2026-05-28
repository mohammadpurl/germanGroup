import Link from "next/link";
import { Container } from "@/components/ui/container";
import { JsonLd } from "@/components/seo/json-ld";
import { getArticlesByLang } from "@/lib/articles";
import type { Locale } from "@/lib/i18n";
import {
  buildBreadcrumbSchema,
  buildMetadata,
} from "@/lib/seo";
import type { Metadata } from "next";

type Props = { params: Promise<{ lang: string }> };

const PAGE_COPY = {
  fa: {
    title: "مقالات German Group",
    description:
      "راهنماهای تخصصی German Group درباره تعمیر موتور، گیربکس، دیاگ، سرویس و نگهداری خودروهای آلمانی.",
    eyebrow: "مقالات تخصصی",
    heading: "راهنمای تعمیر و نگهداری خودروهای آلمانی",
    intro:
      "این بخش برای پاسخ به سوال‌های واقعی مالکان BMW، Mercedes-Benz، Audi و Porsche ساخته شده است؛ از علائم خرابی تا منطق تشخیص و تصمیم درست برای تعمیر.",
    home: "خانه",
    current: "مقالات",
    readMore: "مطالعه مقاله",
    readTime: "دقیقه مطالعه",
  },
  en: {
    title: "German Group Articles",
    description:
      "German Group technical guides covering diagnostics, engine repair, gearbox service, maintenance strategy, and ownership advice for German vehicles.",
    eyebrow: "Technical Articles",
    heading: "Guides for German vehicle maintenance and repair",
    intro:
      "This section answers real ownership questions for BMW, Mercedes-Benz, Audi, and Porsche drivers, from early warning signs to smart diagnostic and repair decisions.",
    home: "Home",
    current: "Articles",
    readMore: "Read article",
    readTime: "min read",
  },
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as Locale;
  const copy = PAGE_COPY[locale];

  return buildMetadata({
    locale,
    path: "/articles",
    title: copy.title,
    description: copy.description,
    keywords:
      locale === "fa"
        ? ["مقالات خودرو آلمانی", "راهنمای تعمیر BMW", "مقاله گیربکس DSG"]
        : ["German car articles", "BMW repair guide", "DSG gearbox article"],
  });
}

export default async function ArticlesPage({ params }: Props) {
  const { lang } = await params;
  const locale = lang as Locale;
  const copy = PAGE_COPY[locale];
  const localizedArticles = getArticlesByLang(locale);

  return (
    <main className="min-h-screen bg-bg pt-24 pb-dock-safe">
      <Container>
        <JsonLd
          data={buildBreadcrumbSchema(locale, [
            { name: copy.home, path: "" },
            { name: copy.current, path: "/articles" },
          ])}
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

        <section className="mb-12 flex max-w-3xl flex-col gap-4">
          <p className="section-subtitle">{copy.eyebrow}</p>
          <h1 className="section-title">{copy.heading}</h1>
          <p className="section-text">{copy.intro}</p>
        </section>

        <section className="grid gap-5 md:grid-cols-2">
          {localizedArticles.map((article) => (
            <article
              key={article.slug}
              className="rounded-[28px] border border-white/8 bg-white/[0.03] p-6"
            >
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-gold">
                {article.readingMinutes} {copy.readTime}
              </p>
              <h2 className="mb-3 text-2xl font-semibold text-primary">
                <Link
                  href={`/${locale}/articles/${article.slug}`}
                  className="transition-colors hover:text-gold-light"
                >
                  {article.localized.title}
                </Link>
              </h2>
              <p className="mb-5 text-base leading-8 text-secondary">
                {article.localized.excerpt}
              </p>
              <Link
                href={`/${locale}/articles/${article.slug}`}
                className="inline-flex items-center text-sm font-medium text-gold transition-colors hover:text-gold-light"
              >
                {copy.readMore}
              </Link>
            </article>
          ))}
        </section>
      </Container>
    </main>
  );
}
