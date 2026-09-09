import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { getSite, getFeaturedCar, getHomePreview } from "@/lib/content";
import { Hero } from "@/components/sections/home/Hero";
import { Statement } from "@/components/sections/home/Statement";
import { CollectionPreview } from "@/components/sections/home/CollectionPreview";
import { Promise as PromiseSection } from "@/components/sections/home/Promise";
import { Marques } from "@/components/sections/home/Marques";
import { AfterDark } from "@/components/sections/home/AfterDark";
import { Featured } from "@/components/sections/home/Featured";
import { Viewing } from "@/components/sections/home/Viewing";
import { VisitStrip } from "@/components/sections/home/VisitStrip";

/** docs/02 §5: ten sections, every one with a photograph. H10 is the shell footer. */
export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  const site = getSite(locale);
  const featured = getFeaturedCar(locale);
  const preview = getHomePreview(locale);

  return (
    <>
      <Hero site={site} />
      <Statement site={site} />
      <CollectionPreview site={site} rows={preview} />
      <PromiseSection site={site} />
      <Marques site={site} />
      <AfterDark site={site} />
      <Featured site={site} car={featured} />
      {/* fadeTop: the Featured exhibit above is the light room now, so this night photograph comes up
          out of salon instead of meeting it at a drawn edge (globals.css .fade-top-salon). */}
      <Viewing site={site} locale={locale} fadeTop />
      <VisitStrip site={site} />
    </>
  );
}
