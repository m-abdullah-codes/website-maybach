import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { isLocale, routing } from "@/lib/i18n";
import { getSite, getCar, getCars, getCarSlugs } from "@/lib/content";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { carJsonLd, absoluteUrl, alternatesFor } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import { CarHero } from "@/components/sections/car/CarHero";
import { SpecStrip } from "@/components/sections/car/SpecStrip";
import { InBrief } from "@/components/sections/car/InBrief";
import { Gallery } from "@/components/sections/car/Gallery";
import { Inside } from "@/components/sections/car/Inside";
import { Provenance } from "@/components/sections/car/Provenance";
import { Enquire } from "@/components/sections/car/Enquire";
import { AlsoInResidence } from "@/components/sections/car/AlsoInResidence";
import { StickyBarConfig } from "@/components/layout/StickyBarConfig";

type Params = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => getCarSlugs().map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const car = getCar(slug, locale);
  if (!car) return {};
  return {
    title: { absolute: car.seo.title },
    description: car.seo.description,
    alternates: alternatesFor(locale, `/collection/${slug}`),
    openGraph: { images: [{ url: absoluteUrl(car.images.heroD), width: 1672, height: 941 }] },
  };
}

/** docs/02 §7: make one car feel like the only car. D1 to D8; the enquiry is one thumb away via the sticky bar. */
export default async function CarPage({ params }: Params) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  const car = getCar(slug, locale);
  if (!car) notFound();
  const site = getSite(locale);
  const cars = getCars(locale);
  const sold = car.availability === "sold";
  const whatsapp = buildWhatsAppUrl(locale, { car });

  return (
    <>
      <JsonLd data={carJsonLd(car, site, locale)} />
      <StickyBarConfig
        enquireHref={sold ? whatsapp : "#enquire"}
        enquireLabel={sold ? site.common.askAboutSimilar : site.common.enquire}
        whatsappHref={whatsapp}
      />
      <CarHero car={car} site={site} />
      <SpecStrip car={car} site={site} />
      <InBrief car={car} site={site} />
      <Gallery car={car} site={site} />
      <Inside car={car} site={site} />
      <Provenance car={car} site={site} />
      <Enquire car={car} site={site} locale={locale} />
      <AlsoInResidence car={car} cars={cars} site={site} />
    </>
  );
}
