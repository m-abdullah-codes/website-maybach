import { getSite, fill, type Car } from "./content";
import type { Locale } from "./i18n";

/** docs/02 §4.3: wa.me deep link with the pre-filled text in the page language. */
export function buildWhatsAppUrl(locale: Locale, opts: { car?: Car; service?: string } = {}): string {
  const site = getSite(locale);
  const number = process.env.NEXT_PUBLIC_WHATSAPP || site.settings.whatsappNumber;
  let text = site.whatsapp.viewing;
  if (opts.car) text = fill(site.whatsapp.aboutCar, { car: opts.car.whatsappName });
  else if (opts.service) text = fill(site.whatsapp.service, { service: opts.service });
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
