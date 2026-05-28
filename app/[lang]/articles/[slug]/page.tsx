import Link from "next/link";
import { Container } from "@/components/ui/container";
import { JsonLd } from "@/components/seo/json-ld";
import { articles, getArticleBySlug } from "@/lib/articles";
import type { Locale } from "@/lib/i18n";
import {
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildMetadata,
} from "@/lib/seo";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Props = { params: Promise<{ lang: string; slug: string }> };

const PAGE_COPY = {
  fa: {
    home: "خانه",
    articles: "مقالات",
  },
  en: {
    home: "Home",
    articles: "Articles",
  },
} as const;

export function generateStaticParams() {
  return articles.flatMap((article) => [
    { slug: article.slug, lang: "fa" },
    { slug: article.slug, lang: "en" },
  ]);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale = lang as Locale;
  const article = getArticleBySlug(locale, slug);

  if (!article) {
    return buildMetadata({
      locale,
      path: `/articles/${slug}`,
      title: locale === "fa" ? "مقاله یافت نشد" : "Article not found",
      description:
        locale === "fa"
          ? "مقاله موردنظر در دسترس نیست."
          : "The requested article is not available.",
      noindex: true,
    });
  }

  return buildMetadata({
    locale,
    path: `/articles/${slug}`,
    title: article.localized.title,
    description: article.localized.excerpt,
    keywords:
      locale === "fa"
        ? ["مقاله خودرو آلمانی", article.localized.title, "German Group"]
        : ["German car article", article.localized.title, "German Group"],
  });
}

export default async function ArticlePage({ params }: Props) {
  const { lang, slug } = await params;
  const locale = lang as Locale;
  const article = getArticleBySlug(locale, slug);

  if (!article) {
    notFound();
  }

  const copy = PAGE_COPY[locale];

  return (
    <main className="min-h-screen bg-bg pt-24 pb-dock-safe">
      <Container narrow>
        <JsonLd
          data={[
            buildBreadcrumbSchema(locale, [
              { name: copy.home, path: "" },
              { name: copy.articles, path: "/articles" },
              { name: article.localized.title, path: `/articles/${slug}` },
            ]),
            buildArticleSchema({
              locale,
              slug,
              title: article.localized.title,
              description: article.localized.excerpt,
              datePublished: article.publishedAt,
              dateModified: article.updatedAt,
            }),
          ]}
        />

        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href={`/${locale}`} className="transition-colors hover:text-primary">
                {copy.home}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link
                href={`/${locale}/articles`}
                className="transition-colors hover:text-primary"
              >
                {copy.articles}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-primary">{article.localized.title}</li>
          </ol>
        </nav>

        <article className="flex flex-col gap-6">
          <header className="flex flex-col gap-4">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-gold">
              {article.readingMinutes} {locale === "fa" ? "دقیقه مطالعه" : "min read"}
            </p>
            <h1 className="section-title">{article.localized.title}</h1>
            <p className="section-text">{article.localized.excerpt}</p>
          </header>

          <div className="grid gap-5">
            {article.localized.content.map((paragraph, index) => (
              <p key={index} className="text-base leading-8 text-secondary">
                {paragraph}
              </p>
            ))}
          </div>
        </article>
      </Container>
    </main>
  );
}
