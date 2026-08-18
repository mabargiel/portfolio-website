import type { MetadataRoute } from "next";
import { SITE_URL } from "@/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/cv/en/", "/cv/pl/", "/og/", "/not-found/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
