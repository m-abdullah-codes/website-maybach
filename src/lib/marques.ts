import mono from "../../public/logos/mono/index.json";
import type { MarqueTile } from "@/components/ui/Marquee";

/**
 * The marque strip's logos. The official SVGs live in /public/logos; scripts/brand-logos.mjs turns
 * each one into a white-on-transparent, optically normalised 512×512 derivative in /public/logos/mono
 * (see that script for why a CSS filter over the raw SVGs is not enough). This resolves a name from
 * site.home.marques.list to its derivative; a marque with no file falls back to its name in the UI
 * face, as docs/02 §3.7 specifies.
 */
const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const bySlug = new Map(mono.logos.map((l) => [l.slug, l]));

export function marqueTiles(names: string[]): MarqueTile[] {
  return names.map((name) => {
    const entry = bySlug.get(slugify(name));
    return { name, logo: entry ? `/logos/mono/${entry.slug}.png` : null, size: mono.canvas };
  });
}
