import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "@/lib/i18n";

// next-intl handles routing, <html lang/dir> and the locale only. All copy is read through
// src/lib/content.ts on the server, so no message bundle is shipped to the client.
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;
  return { locale, messages: {} };
});
