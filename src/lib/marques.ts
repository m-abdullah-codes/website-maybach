import { getImageProps } from "next/image";
import mono from "../../public/logos/mono/index.json";
import type { MarqueTile } from "@/components/ui/Marquee";

/**
 * The marque strip's logos. The official SVGs live in /public/logos; scripts/brand-logos.mjs turns
 * each one into a white-on-transparent, optically normalised 512×512 derivative in /public/logos/mono
 * (see that script for why a CSS filter over the raw SVGs is not enough). This resolves a name from
 * site.home.marques.list to its derivative; a marque with no file falls back to its name in the UI
 * face, as docs/02 §3.7 specifies.
 *
 * The derivatives go through the image optimiser like every other picture on the site. They were being
 * served raw: eight 512×512 PNGs, 51 kB, into a tile that is 96 px on a phone and 120 px on a desktop,
 * which made the marque strip the heaviest thing on the home page after the photographs.
 */
const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const bySlug = new Map(mono.logos.map((l) => [l.slug, l]));

/** The tile is 96 px, 120 px above 768 px, and 1.15× that while it is the centre one. */
const SIZES = "(min-width: 768px) 138px, 111px";

export function marqueTiles(names: string[]): MarqueTile[] {
  return names.map((name) => {
    const entry = bySlug.get(slugify(name));
    if (!entry) return { name, logo: null, srcSet: undefined, size: mono.canvas };
    const { props } = getImageProps({
      src: `/logos/mono/${entry.slug}.png`,
      alt: "",
      width: mono.canvas,
      height: mono.canvas,
      sizes: SIZES,
    });
    return { name, logo: props.src, srcSet: props.srcSet, size: mono.canvas };
  });
}
