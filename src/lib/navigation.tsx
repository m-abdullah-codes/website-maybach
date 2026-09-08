"use client";

import NextLink from "next/link";
import { usePathname as useNextPathname, useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useRef, type ComponentProps, type MouseEvent, type ReactNode, type TouchEvent } from "react";
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

export function Link({ href, locale, prefetch, onMouseEnter, onTouchStart, ...rest }: LinkProps) {
  const current = useLocale();
  const router = useRouter();
  const target = localizeHref(href, locale ?? current);
  const warmed = useRef(false);

  // Viewport prefetching pulled six route payloads (~96 KB) on every first visit, competing with the
  // hero photograph for bandwidth. Nothing is fetched until the pointer or the thumb says the visit
  // is real; by then the page-transition curtain covers the fetch.
  const warm = useCallback(() => {
    if (warmed.current || EXTERNAL.test(target)) return;
    warmed.current = true;
    router.prefetch(target);
  }, [router, target]);

  return (
    <NextLink
      href={target}
      prefetch={prefetch ?? false}
      onMouseEnter={(e: MouseEvent<HTMLAnchorElement>) => {
        warm();
        onMouseEnter?.(e);
      }}
      onTouchStart={(e: TouchEvent<HTMLAnchorElement>) => {
        warm();
        onTouchStart?.(e);
      }}
      {...rest}
    />
  );
}

/** The pathname without the locale prefix, so the same route can be linked in the other locale. */
export function usePathname(): string {
  const p = useNextPathname() || "/";
  return p.replace(/^\/ar(?=\/|$)/, "") || "/";
}
