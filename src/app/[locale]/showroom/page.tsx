import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { isLocale } from "@/lib/i18n";
import { getSite } from "@/lib/content";
import { PageHero } from "@/components/ui/PageHero";
import { Story } from "@/components/sections/showroom/Story";
import { Numbers } from "@/components/sections/showroom/Numbers";
import { Space } from "@/components/sections/showroom/Space";
import { Majlis } from "@/components/sections/showroom/Majlis";
import { Marques } from "@/components/sections/home/Marques";
import { Viewing } from "@/components/sections/home/Viewing";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const site = getSite(locale);
  return { title: site.nav.showroom };
}

/** docs/02 §8: the building is the brand. S1 hero, story, numbers, the space, coffee, marques, visit CTA. */
export default async function ShowroomPage({ params }: Params) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  const site = getSite(locale);
  const h = site.showroom.hero;

  return (
    <>
      <PageHero desktop="sh-01-d" mobile="sh-01-m" eyebrow={h.eyebrow} word={h.giantWord} title={h.title} sub={h.sub} wordPlacement="sky" />
      <Story site={site} />
      <Numbers site={site} locale={locale} />
      <Space site={site} />
      <Majlis site={site} />
      <Marques site={site} id="marques-showroom" />
      <Viewing site={site} locale={locale} title={site.showroom.cta.title} desktop="sh-06-d" mobile="sh-06-m" id="visit-cta" />
    </>
  );
}
