import type { MetadataRoute } from "next";
import { articles } from "@/lib/articles";
import { locales } from "@/lib/i18n";
import { absoluteUrl, localizedPath } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/about", "/articles", "/contact"];
  const now = new Date();

  const pages = locales.flatMap((locale) =>
    staticPaths.map((path) => ({
      url: absoluteUrl(localizedPath(locale, path)),
      lastModified: now,
      changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "" ? 1 : 0.7,
    }))
  );

  const articlePages = locales.flatMap((locale) =>
    articles.map((article) => ({
      url: absoluteUrl(localizedPath(locale, `/articles/${article.slug}`)),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.65,
    }))
  );

  return [...pages, ...articlePages];
}
