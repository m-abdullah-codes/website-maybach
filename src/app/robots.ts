import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

// Written once at build time: an export has no server to run a route handler on.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/styleguide", "/ar/styleguide", "/api/"] }],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
