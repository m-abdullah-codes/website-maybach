import { defineRouting } from "next-intl/routing";

export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "as-needed",
  // The canonical and the hreflang set are declared once, in the document head (docs/02 §13.3,
  // src/lib/seo.ts). next-intl otherwise repeats them as a `Link:` response header built from the
  // request host, which on any host that is not the canonical one — a preview deployment, an
  // apex/www mismatch, localhost — advertises that host as the alternate and leaves the canonical
  // pointing outside its own hreflang set.
  alternateLinks: false,
});

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function dirOf(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}

// Client-side links and pathname live in ./navigation (no next-intl runtime on the client).
export { Link, usePathname, useLocale, localizeHref, LocaleProvider } from "./navigation";
