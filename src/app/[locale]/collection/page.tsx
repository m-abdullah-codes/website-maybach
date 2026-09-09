import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { isLocale } from "@/lib/i18n";
import { alternatesFor } from "@/lib/seo";
import { getSite, getRows, getCategories, getCars } from "@/lib/content";
import { PageHero } from "@/components/ui/PageHero";
import { CollectionFilter } from "@/components/cars/CollectionFilter";
import { SceneRow } from "@/components/cars/SceneRow";
import { PhotographRow } from "@/components/cars/PhotographRow";
import { CardPair } from "@/components/cars/CardPair";
import { NotHere } from "@/components/sections/collection/NotHere";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const site = getSite(locale);
  return { title: site.nav.collection, alternates: alternatesFor(locale, "/collection") };
}

// Scene rows alternate the car side so the page zig-zags with the photograph rows (docs/02 §3.10, C2).
const SCENE_SIDE: Record<number, "start" | "end"> = { 1: "end", 4: "start", 7: "end" };

/** docs/02 §6: C1 hero with the filters on its bottom edge, C2 eight rows in three treatments, C3 Not here. */
export default async function CollectionPage({ params }: Params) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  const site = getSite(locale);
  const h = site.collection.hero;
  const rows = getRows(locale);
  const total = getCars(locale).length;

  return (
    <>
      <PageHero desktop="co-hero-bg-d" mobile="co-hero-bg-m" eyebrow={h.eyebrow} word={h.giantWord} title={h.title} sub={h.sub} className="collection__hero" />
      <CollectionFilter options={getCategories(locale)} countTemplate={site.common.carCount} total={total}>
        {rows.map((row) => (
          <div key={row.row} data-row="" data-cats={row.cars.map((c) => c.category).join(",")} className="collection__row">
            {row.treatment === "scene" ? (
              <SceneRow car={row.cars[0]} site={site} side={SCENE_SIDE[row.row] ?? "end"} />
            ) : row.treatment === "cards" ? (
              <CardPair cars={row.cars} site={site} className="collection__cards" />
            ) : (
              <PhotographRow car={row.cars[0]} site={site} side={row.copySide ?? "start"} />
            )}
          </div>
        ))}
      </CollectionFilter>
      <NotHere site={site} locale={locale} />
    </>
  );
}
