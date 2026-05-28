import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { defaultLang, locales } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";

type MetadataInput = {
  locale: Locale;
  path?: string;
  title?: string;
  description?: string;
  keywords?: string[];
  noindex?: boolean;
  images?: string[];
};

export function getLocaleDirection(locale: Locale) {
  return locale === "fa" ? "rtl" : "ltr";
}

export function getOpenGraphLocale(locale: Locale) {
  return locale === "fa" ? "fa_IR" : "en_US";
}

export function absoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalizedPath, siteConfig.siteUrl).toString();
}

export function localizedPath(locale: Locale, path = "") {
  if (!path || path === "/") {
    return `/${locale}`;
  }

  return `/${locale}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildAlternates(locale: Locale, path = "") {
  const localized = localizedPath(locale, path);

  return {
    canonical: localized,
    languages: {
      ...Object.fromEntries(
        locales.map((currentLocale) => [
          currentLocale,
          localizedPath(currentLocale, path),
        ])
      ),
      "x-default": localizedPath(defaultLang, path),
    },
  };
}

export function buildMetadata({
  locale,
  path = "",
  title,
  description,
  keywords = [],
  noindex = false,
  images,
}: MetadataInput): Metadata {
  const localized = localizedPath(locale, path);
  const finalTitle = title || siteConfig.defaultTitle[locale];
  const finalDescription = description || siteConfig.defaultDescription[locale];
  const finalImages = (images?.length ? images : [siteConfig.socialImagePath]).map(
    (image) => absoluteUrl(image)
  );

  return {
    title: finalTitle,
    description: finalDescription,
    alternates: buildAlternates(locale, path),
    robots: {
      index: !noindex,
      follow: !noindex,
    },
    keywords,
    openGraph: {
      type: "website",
      url: absoluteUrl(localized),
      title: finalTitle,
      description: finalDescription,
      locale: getOpenGraphLocale(locale),
      siteName: siteConfig.name,
      images: finalImages.map((url) => ({
        url,
        width: 1200,
        height: 630,
        alt: finalTitle,
      })),
    },
    twitter: {
      card: "summary_large_image",
      title: finalTitle,
      description: finalDescription,
      images: finalImages,
    },
  };
}

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.legalName,
    url: siteConfig.siteUrl,
    logo: absoluteUrl("/icon.svg"),
    sameAs: [siteConfig.instagramUrl],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: siteConfig.phone,
        contactType: "customer service",
        availableLanguage: ["fa", "en"],
      },
    ],
  };
}

export function buildLocalBusinessSchema(locale: Locale) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "@id": absoluteUrl(localizedPath(locale)),
    name: siteConfig.legalName,
    image: absoluteUrl(siteConfig.socialImagePath),
    url: absoluteUrl(localizedPath(locale)),
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.locality,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Saturday",
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
        ],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    areaServed: siteConfig.address.locality,
    priceRange: "$$",
    knowsAbout: siteConfig.serviceAreas[locale],
  };

  if (siteConfig.geo.latitude && siteConfig.geo.longitude) {
    schema.geo = {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    };
  }

  return schema;
}

export function buildBreadcrumbSchema(
  locale: Locale,
  items: Array<{ name: string; path: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(localizedPath(locale, item.path)),
    })),
  };
}

export function buildArticleSchema({
  locale,
  slug,
  title,
  description,
  datePublished,
  dateModified,
}: {
  locale: Locale;
  slug: string;
  title: string;
  description: string;
  datePublished: string;
  dateModified: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    inLanguage: locale,
    mainEntityOfPage: absoluteUrl(localizedPath(locale, `/articles/${slug}`)),
    datePublished,
    dateModified,
    author: {
      "@type": "Organization",
      name: siteConfig.legalName,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.legalName,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/icon.svg"),
      },
    },
    image: absoluteUrl(siteConfig.socialImagePath),
  };
}

export function buildServiceCatalogSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name:
      locale === "fa"
        ? "خدمات تخصصی German Group"
        : "German Group Service Catalog",
    itemListElement: siteConfig.serviceAreas[locale].map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service,
      },
    })),
  };
}
