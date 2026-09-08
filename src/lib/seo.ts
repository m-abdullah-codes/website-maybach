import type { Car, Site } from "./content";
import type { Locale } from "./i18n";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://maybach.sa";

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function localePath(locale: Locale, path: string): string {
  return locale === "ar" ? `/ar${path === "/" ? "" : path}` : path;
}

/** docs/02 §13.3: AutoDealer on every page. Placeholders stay bracketed until the client confirms them. */
export function autoDealerJsonLd(site: Site, locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    name: site.brand.name,
    url: absoluteUrl(localePath(locale, "/")),
    telephone: site.settings.phone,
    email: site.settings.email,
    address: { "@type": "PostalAddress", streetAddress: site.footer.address, addressLocality: site.brand.city, addressCountry: "SA" },
    openingHours: site.footer.hours,
    sameAs: Object.values(site.settings.social),
    image: absoluteUrl("/og.png"),
  };
}

const AVAILABILITY = {
  available: "https://schema.org/InStock",
  reserved: "https://schema.org/LimitedAvailability",
  sold: "https://schema.org/SoldOut",
} as const;

/** docs/02 §13.3: Car on each detail page; no price. */
export function carJsonLd(car: Car, site: Site, locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Car",
    name: `${car.marque} ${car.title}`,
    brand: { "@type": "Brand", name: car.marque },
    model: car.title,
    vehicleModelDate: String(car.year),
    color: car.exterior,
    vehicleInteriorColor: car.interior,
    mileageFromOdometer: { "@type": "QuantitativeValue", value: car.specs.mileageKm, unitCode: "KMT" },
    vehicleEngine: { "@type": "EngineSpecification", name: car.specs.engine },
    driveWheelConfiguration: car.specs.drivetrain,
    bodyType: car.category,
    image: [absoluteUrl(car.images.heroD), absoluteUrl(car.images.heroM)],
    url: absoluteUrl(localePath(locale, `/collection/${car.slug}`)),
    offers: {
      "@type": "Offer",
      availability: AVAILABILITY[car.availability],
      seller: { "@type": "AutoDealer", name: site.brand.name },
    },
  };
}

