import type { MetadataRoute } from "next";
import { getCarSlugs } from "@/lib/content";
import { absoluteUrl, localePath } from "@/lib/seo";

// Written once at build time: an export has no server to run a route handler on.
export const dynamic = "force-static";

const PATHS = ["/", "/collection", "/showroom", "/services", "/visit"];

/** docs/03 Phase 7: every route in both locales with hreflang alternates. */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...PATHS, ...getCarSlugs().map((s) => `/collection/${s}`)];
  const now = new Date();
  return paths.map((p) => ({
    url: absoluteUrl(localePath("en", p)),
    lastModified: now,
    changeFrequency: p === "/" || p === "/collection" ? "weekly" : "monthly",
    priority: p === "/" ? 1 : p === "/collection" ? 0.9 : p.startsWith("/collection/") ? 0.8 : 0.6,
    alternates: {
      languages: {
        en: absoluteUrl(localePath("en", p)),
        ar: absoluteUrl(localePath("ar", p)),
      },
    },
  }));
}
