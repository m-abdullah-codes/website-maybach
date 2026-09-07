import localFont from "next/font/local";
import type { Locale } from "./i18n";

// docs/02 §2.2 · docs/03 §3. Self-hosted WOFF2 subsets (Google Fonts builds, downloaded once into
// src/fonts) so the build never depends on the network. Bodoni Moda is the variable face (opsz + wght
// 400–900); the Statement style therefore uses 400 italic, as the face has no 300 (see qa/LOG.md).
// The Arabic faces are the "arabic" subsets only: Western numerals and any Latin inside Arabic copy
// fall through to Bodoni / Manrope by design (font stacks in globals.css).

export const bodoni = localFont({
  src: [
    { path: "../fonts/bodoni-moda-latin.woff2", weight: "400 900", style: "normal" },
    { path: "../fonts/bodoni-moda-latin-italic.woff2", weight: "400 900", style: "italic" },
  ],
  variable: "--font-bodoni",
  display: "swap",
  preload: true,
  fallback: ["Georgia", "serif"],
});

export const manrope = localFont({
  src: [{ path: "../fonts/manrope-latin.woff2", weight: "200 800", style: "normal" }],
  variable: "--font-manrope",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
});

export const amiri = localFont({
  src: [{ path: "../fonts/amiri-arabic.woff2", weight: "400", style: "normal" }],
  variable: "--font-amiri",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
});

export const plexArabic = localFont({
  src: [
    { path: "../fonts/plex-sans-arabic-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/plex-sans-arabic-500.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-plex-ar",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
});

/** Font CSS-variable classes for <html>; the Arabic faces are attached only on /ar. */
export function fontClass(locale: Locale): string {
  const base = `${bodoni.variable} ${manrope.variable}`;
  return locale === "ar" ? `${base} ${amiri.variable} ${plexArabic.variable}` : base;
}
