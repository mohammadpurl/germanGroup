import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  const canIndex = siteConfig.siteUrl !== "https://example.com";

  return {
    rules: canIndex
      ? [
          {
            userAgent: "*",
            allow: "/",
            disallow: ["/api/", "/_next/"],
          },
        ]
      : [
          {
            userAgent: "*",
            disallow: "/",
          },
        ],
    sitemap: `${siteConfig.siteUrl}/sitemap.xml`,
    host: siteConfig.siteUrl,
  };
}
