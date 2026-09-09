import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { isLocale, routing } from "@/lib/i18n";
import { NotFound } from "@/components/sections/NotFound";

type Params = { params: Promise<{ locale: string; rest: string[] }> };

/**
 * The localised "nothing here" page, built at /404 in each locale.
 *
 * A static build has no server to run a catch-all against, so the page is prerendered at one known
 * path instead and the asset store serves it for anything that does not exist: Cloudflare answers a
 * miss with the nearest 404.html, which is /ar/404.html under /ar and /404.html everywhere else
 * (wrangler.jsonc → assets.not_found_handling).
 */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale, rest: ["404"] }));
}

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function CatchAll({ params }: Params) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  return <NotFound locale={locale} />;
}
