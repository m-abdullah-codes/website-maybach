import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { isLocale } from "@/lib/i18n";
import { alternatesFor } from "@/lib/seo";
import { getSite } from "@/lib/content";
import { PageHero } from "@/components/ui/PageHero";
import { ServiceRows } from "@/components/sections/services/ServiceRows";
import { Viewing } from "@/components/sections/home/Viewing";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const site = getSite(locale);
  return { title: site.nav.services, alternates: alternatesFor(locale, "/services") };
}

/** docs/02 §9: the sale is the middle of the relationship. V1 hero, six services, the viewing CTA. */
export default async function ServicesPage({ params }: Params) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  const site = getSite(locale);
  const h = site.services.hero;

  return (
    <>
      <PageHero desktop="sv-hero-d" mobile="sv-hero-m" eyebrow={h.eyebrow} word={h.giantWord} title={h.title} sub={h.sub} wordPlacement="sky" />
      <ServiceRows site={site} locale={locale} />
      <Viewing site={site} locale={locale} id="viewing-cta" />
    </>
  );
}
