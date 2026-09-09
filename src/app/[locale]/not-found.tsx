import { getLocale } from "next-intl/server";
import type { Locale } from "@/lib/i18n";
import { NotFound } from "@/components/sections/NotFound";

/** What a notFound() inside the app resolves to. The page itself is in components/sections/NotFound. */
export default async function NotFoundRoute() {
  const locale = (await getLocale()) as Locale;
  return <NotFound locale={locale} />;
}
