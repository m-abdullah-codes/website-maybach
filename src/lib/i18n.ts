import { defineRouting } from "next-intl/routing";

export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const routing = defineRouting({
  locales,
  defaultLocale,
});

// Everything else next-intl's routing used to decide is now decided by the shape of the build. There
// is no middleware in a static export and nothing to negotiate at request time: `next build` writes
// /en and /ar, scripts/flatten-export.mjs lifts /en to the root so English has no prefix, and
// public/_redirects catches anyone still holding an /en/... link. No locale is detected and no cookie
// is written, which is what the language toggle needs — it is the only thing that chooses a language,
// and detection used to fight it (see qa/LOG.md). The canonical and hreflang set are declared once in
// the document head, in src/lib/seo.ts.

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function dirOf(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}

// Client-side links and pathname live in ./navigation (no next-intl runtime on the client).
export { Link, usePathname, useLocale, localizeHref, LocaleProvider } from "./navigation";
