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
  return { title: site.nav.showroom };
}

// Phase 1: hero only (S1). S2–S7 arrive in Phase 5.
export default async function ShowroomPage({ params }: Params) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  const site = getSite(locale);
  const h = site.showroom.hero;

  return (
    <PageHero
      desktop="sh-01-d"
      mobile="sh-01-m"
      eyebrow={h.eyebrow}
      word={h.giantWord}
      title={h.title}
      sub={h.sub}
      wordPlacement="sky"
    />
  );
}
