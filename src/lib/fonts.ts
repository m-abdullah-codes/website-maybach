import type { Locale } from "./i18n";

// docs/02 §2.2 · docs/03 §3. The faces are declared in src/app/globals.css and served from
// /fonts as static WOFF2, cut by scripts/subset-fonts.py from the untouched Google builds in
// src/fonts/masters: Bodoni keeps its opsz axis for `font-optical-sizing: auto` but is pinned to
// the one weight the scale uses, Manrope keeps 400–500, the Arabic faces are Modern Standard
// Arabic with their full shaping closure, and all of them are cut to the character set the copy
// needs. Half the bytes of the Google builds, the same rendering (see qa/LOG.md).
//
// next/font is not used: it emits no <link rel="preload"> for a route behind the dynamic [locale]
// segment, and §2.2 asks for the display faces to be preloaded. Bump the ?v token here and in
// globals.css when a face is rebuilt (the files are served immutable for a year).

const V = "?v=1";

/** The two faces the first screen needs in each language; everything else swaps in behind them. */
export const FONT_PRELOADS: Record<Locale, readonly string[]> = {
  en: [`/fonts/bodoni-moda-latin.woff2${V}`, `/fonts/manrope-latin.woff2${V}`],
  ar: [`/fonts/amiri-arabic.woff2${V}`, `/fonts/plex-sans-arabic-400.woff2${V}`],
};
