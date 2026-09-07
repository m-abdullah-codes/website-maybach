import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { isLocale } from "@/lib/i18n";
import { getSite } from "@/lib/content";
import { PageHero } from "@/components/ui/PageHero";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const site = getSite(locale);
  return { title: site.nav.collection };
}

// Phase 1: hero only (C1). Filters, the eight rows and Not-here arrive in Phase 3.
export default async function CollectionPage({ params }: Params) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  const site = getSite(locale);
  const h = site.collection.hero;

  return <PageHero desktop="co-hero-bg-d" mobile="co-hero-bg-m" eyebrow={h.eyebrow} word={h.giantWord} title={h.title} sub={h.sub} />;
}
