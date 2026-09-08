"use client";

import NextLink from "next/link";
import { usePathname as useNextPathname } from "next/navigation";
import { createContext, useContext, type ComponentProps, type ReactNode } from "react";
import type { Locale } from "./i18n";

// Locale-aware links without shipping next-intl's client runtime (docs/03 §13.2 JS budget).
// Routing, redirects and <html lang dir> stay with next-intl on the server and in the middleware.

const LocaleContext = createContext<Locale>("en");

export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

export function useLocale(): Locale {
  return useContext(LocaleContext);
}

const EXTERNAL = /^(https?:|mailto:|tel:|#)/;

/** Prefixes an internal href for the Arabic locale; the default locale has no prefix (localePrefix "as-needed"). */
export function localizeHref(href: string, locale: Locale): string {
  if (EXTERNAL.test(href)) return href;
  if (locale === "ar") return href === "/" ? "/ar" : `/ar${href}`;
  return href;
}

type LinkProps = Omit<ComponentProps<typeof NextLink>, "href" | "locale"> & { href: string; locale?: Locale };

export function Link({ href, locale, ...rest }: LinkProps) {
  const current = useLocale();
  return <NextLink href={localizeHref(href, locale ?? current)} {...rest} />;
}

/** The pathname without the locale prefix, so the same route can be linked in the other locale. */
export function usePathname(): string {
  const p = useNextPathname() || "/";
  return p.replace(/^\/ar(?=\/|$)/, "") || "/";
}
