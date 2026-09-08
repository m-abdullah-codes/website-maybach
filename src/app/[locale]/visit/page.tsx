import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { isLocale } from "@/lib/i18n";
import { getSite, getCars } from "@/lib/content";
import { PageHero } from "@/components/ui/PageHero";
import { Details } from "@/components/sections/visit/Details";
import { VisitForm } from "@/components/sections/visit/VisitForm";
import { Hospitality } from "@/components/sections/visit/Hospitality";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const site = getSite(locale);
  return { title: site.nav.visit };
}

/** docs/02 §10: the majlis. M1 hero, details and map, the form, the hospitality line. */
export default async function VisitPage({ params }: Params) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  const site = getSite(locale);
  const h = site.visit.hero;

  return (
    <>
      <PageHero desktop="sh-06-d" mobile="sh-06-m" eyebrow={h.eyebrow} word={h.giantWord} title={h.title} sub={h.sub} wordPlacement="sky" />
      <Details site={site} locale={locale} />
      <VisitForm site={site} locale={locale} cars={getCars(locale)} />
      <Hospitality site={site} />
    </>
  );
}
