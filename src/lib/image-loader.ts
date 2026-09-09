import rungs from "./img-rungs.json";

/**
 * next/image's loader for the static build (next.config.ts → images.loader).
 *
 * There is no image server here: scripts/derive-images.mjs encodes every size a photograph can be
 * asked for ahead of time, and this maps a request onto one of them — the first rung at or above the
 * width next/image wants, or the largest rung when it wants more than the master holds, which is the
 * same cap the optimiser used to apply. So a URL in a srcset always names a file that exists.
 *
 * WebP is what the <img> gets: universal since 2020, where AVIF still is not. The photographs that
 * carry the page are inside hand-built <picture> elements which offer the .avif of the same rung
 * first (src/lib/images.ts → avifSet); browsers without it fall back here.
 *
 * `quality` is ignored — the encode happened at build time (WebP q78 / AVIF q58). An unknown source
 * is returned untouched rather than pointed at a file that was never written.
 */
const RUNGS = rungs as Record<string, number[]>;

/** '/images/mb-cul-bg-d.png' → 'mb-cul-bg-d'; '/logos/mono/bentley.png' → 'mono/bentley'. */
function stemOf(src: string): string | null {
  if (!src.startsWith("/")) return null;
  const cut = src.indexOf("/", 1);
  if (cut < 0) return null;
  return src.slice(cut + 1).replace(/\.[a-z0-9]+$/i, "");
}

export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }): string {
  const stem = stemOf(src);
  const ladder = stem ? RUNGS[stem] : undefined;
  if (!stem || !ladder) return src;
  const rung = ladder.find((w) => w >= width) ?? ladder[ladder.length - 1];
  return `/img/${stem}-${rung}.webp`;
}
