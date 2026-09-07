// The single content module (AGENTS.md §4): every string on the site is read from /content/*.json
// here, localised here, and handed to components as plain props. A CMS can replace this file later.
import siteEn from "../../content/site.en.json";
import siteAr from "../../content/site.ar.json";
import carsJson from "../../content/cars.json";
import type { Locale } from "./i18n";

export type Site = typeof siteEn;
export type L10n = { en: string; ar: string };
export type Availability = "available" | "reserved" | "sold";
export type Treatment = "scene" | "photograph" | "card";
export type RowTreatment = "scene" | "photograph" | "cards";
export type Category = "SUV" | "Grand Tourer" | "Saloon" | "Sports";
export type Temperature = "warm" | "cool" | "neutral" | "cold" | "pale";
export type Specification = "GCC" | "UK" | "US" | "EU" | "Other";
export type Side = "start" | "end";

export interface CarSpecs {
  engine: string;
  power: string;
  acceleration: string;
  drivetrain: string;
  mileageKm: number;
  specification: Specification;
  serviceHistory: boolean;
  accidentFree: boolean;
  keys: number;
  warrantyUntil?: string;
}

export interface CarImages {
  bgD: string;
  bgM: string;
  cutA: string;
  cutB: string;
  heroD: string;
  heroM: string;
  details: string[];
  interior: string;
  macro: string;
  rear: string;
  card?: string;
}

export interface CarRaw {
  slug: string;
  code: string;
  marque: string;
  model: string;
  variant: string | null;
  year: number;
  registration: string | null;
  category: Category;
  availability: Availability;
  featured: boolean;
  order: number;
  treatment: Treatment;
  scene: "dark" | "light";
  heroTreatment: "photograph" | "scene";
  temperature: Temperature;
  accent: string;
  giantWord: L10n | null;
  environment: L10n;
  whisper: L10n;
  story: L10n;
  exterior: L10n;
  interior: L10n;
  specs: CarSpecs;
  images: CarImages;
  seo: { title: L10n; description: L10n };
  verify: string[];
}

export interface Car
  extends Omit<CarRaw, "giantWord" | "environment" | "whisper" | "story" | "exterior" | "interior" | "seo"> {
  locale: Locale;
  giantWord: string | null;
  environment: string;
  whisper: string;
  story: string;
  exterior: string;
  interior: string;
  seo: { title: string; description: string };
  /** "[Model] [Variant]": the detail-page H1 (docs/02 D1). */
  title: string;
  /** Localised marque and model as written in the SEO title, without the year. */
  displayName: string;
  /** "[Year Marque Model]" for the WhatsApp text (docs/02 §4.3). */
  whatsappName: string;
}

export interface CollectionRow {
  row: number;
  treatment: RowTreatment;
  cars: Car[];
  temperature: string;
  copySide?: Side;
  scene?: "light";
}

export interface HomePreviewRow {
  treatment: RowTreatment;
  cars: Car[];
  copySide?: Side;
}

export interface CategoryOption {
  key: string;
  label: string;
}

interface RawRow {
  row?: number;
  treatment: RowTreatment;
  cars: string[];
  temperature?: string;
  copySide?: Side;
  scene?: "light";
}

const rawCars = carsJson.cars as unknown as CarRaw[];
const rawRows = carsJson.collectionRows as unknown as RawRow[];
const rawPreview = carsJson.homePreview as unknown as RawRow[];
const rawCategories = carsJson.categories as Array<{ key: string; en: string; ar: string }>;

export function getSite(locale: Locale): Site {
  return (locale === "ar" ? siteAr : siteEn) as unknown as Site;
}

function stripYear(name: string, year: number): string {
  return name.replace(new RegExp(`\\s*${year}$`), "").trim();
}

function localize(raw: CarRaw, locale: Locale): Car {
  const pick = (v: L10n) => v[locale];
  const seoTitle = pick(raw.seo.title);
  const displayName = stripYear(seoTitle.split(" — ")[0], raw.year);
  return {
    ...raw,
    locale,
    giantWord: raw.giantWord ? pick(raw.giantWord) : null,
    environment: pick(raw.environment),
    whisper: pick(raw.whisper),
    story: pick(raw.story),
    exterior: pick(raw.exterior),
    interior: pick(raw.interior),
    seo: { title: seoTitle, description: pick(raw.seo.description) },
    title: raw.variant ? `${raw.model} ${raw.variant}` : raw.model,
    displayName,
    whatsappName: `${raw.year} ${displayName}`,
  };
}

export function getCars(locale: Locale): Car[] {
  return rawCars.map((c) => localize(c, locale));
}

export function getCar(slug: string, locale: Locale): Car | undefined {
  const raw = rawCars.find((c) => c.slug === slug);
  return raw ? localize(raw, locale) : undefined;
}

export function getCarSlugs(): string[] {
  return rawCars.map((c) => c.slug);
}

function resolve(slugs: string[], locale: Locale): Car[] {
  return slugs.map((slug) => {
    const car = getCar(slug, locale);
    if (!car) throw new Error(`Unknown car slug in content: ${slug}`);
    return car;
  });
}

export function getRows(locale: Locale): CollectionRow[] {
  return rawRows.map((r) => ({
    row: r.row ?? 0,
    treatment: r.treatment,
    cars: resolve(r.cars, locale),
    temperature: r.temperature ?? "",
    copySide: r.copySide,
    scene: r.scene,
  }));
}

export function getHomePreview(locale: Locale): HomePreviewRow[] {
  return rawPreview.map((r) => ({ treatment: r.treatment, cars: resolve(r.cars, locale), copySide: r.copySide }));
}

export function getCategories(locale: Locale): CategoryOption[] {
  return rawCategories.map((c) => ({ key: c.key, label: c[locale] }));
}

export function getFeaturedCar(locale: Locale): Car {
  const site = getSite(locale);
  const car = getCar(site.home.featured.carSlug, locale) ?? getCars(locale).find((c) => c.featured);
  if (!car) throw new Error("No featured car in content");
  return car;
}

/** Fills {placeholders} in a copy string. The copy itself is never altered. */
export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (m, k: string) => (k in values ? String(values[k]) : m));
}

/** Availability label from site.common. */
export function availabilityLabel(site: Site, state: Availability): string {
  return site.common[state];
}
