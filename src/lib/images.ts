import manifest from "../../content/image-manifest.json";
import rungs from "./img-rungs.json";
import blur from "./blur.json";
import boundsJson from "./bounds.json";
import lumaJson from "./luma.json";

export interface Img {
  id: string;
  src: string;
  width: number;
  height: number;
  alpha: boolean;
  blurDataURL?: string;
}

/** Transparent margins of an RGBA image as fractions of its size (from scripts/blur-placeholders.mjs). */
export interface Bounds {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

type ManifestEntry = (typeof manifest)["images"][number];

const byFile = new Map<string, ManifestEntry>(manifest.images.map((e) => [e.file, e]));
const blurMap = blur as Record<string, string>;
const boundsMap = boundsJson as Record<string, Bounds>;
const lumaMap = lumaJson as Record<string, number>;

/**
 * How bright the photograph is behind a Car card's glass name strip, 0–255, measured from the
 * master by scripts/blur-placeholders.mjs. The strip is glass, so it takes the colour of whatever
 * is under it, and the showroom set runs from a near-black studio floor (the Corvette, 20) to a
 * near-white cyclorama (the Flying Spur, 170) — no single type colour reads on both. Above the
 * threshold the strip sets its type in ink; below it, in platinum. Returns 0 when unmeasured, which
 * keeps the platinum default.
 */
export const CARD_STRIP_INK_ABOVE = 65;
export function cardStripLuma(ref: string): number {
  return lumaMap[imageFile(ref)] ?? 0;
}

/** Accepts 'CUL-BG-D', 'cul-bg-d', 'mb-cul-bg-d', 'mb-cul-bg-d.png' or '/images/mb-cul-bg-d.png'. */
export function imageFile(ref: string): string {
  if (ref.startsWith("/images/")) return ref;
  const key = ref
    .toLowerCase()
    .replace(/^\/?images\//, "")
    .replace(/^mb-/, "")
    .replace(/\.png$/, "");
  return `/images/mb-${key}.png`;
}

export function img(ref: string): Img {
  const file = imageFile(ref);
  const e = byFile.get(file);
  if (!e) throw new Error(`Unknown image: ${ref}`);
  return {
    id: e.id,
    src: e.file,
    width: e.width,
    height: e.height,
    alpha: e.alpha,
    blurDataURL: blurMap[e.file],
  };
}

export function hasImg(ref: string): boolean {
  return byFile.has(imageFile(ref));
}

const NO_BOUNDS: Bounds = { top: 0, right: 0, bottom: 0, left: 0 };

export function bounds(ref: string): Bounds {
  return boundsMap[imageFile(ref)] ?? NO_BOUNDS;
}

/**
 * The AVIF twin of a srcset built by next/image.
 *
 * scripts/derive-images.mjs writes both formats of every rung, and src/lib/image-loader.ts names the
 * .webp — the one every browser since 2020 can read, and the only thing a bare <img srcset> can be
 * given, since a srcset has no way to say "or this format instead". A <picture> does: the components
 * that carry the full-bleed photographs offer this set first as type="image/avif" and leave the webp
 * on the <img> underneath, so a browser without AVIF simply takes the fallback. Anything that is not
 * a derivative URL passes through untouched.
 */
export function avifSet(srcSet: string | undefined): string | undefined {
  return srcSet?.replaceAll(".webp ", ".avif ").replace(/\.webp$/, ".avif");
}

/**
 * The largest pre-encoded copy of a photograph, as a plain path.
 *
 * The PNG masters are not deployed (scripts/flatten-export.mjs drops them — 269 MB nothing links to),
 * so the few places that need a real URL rather than a srcset — the Car structured data, an og image —
 * name a derivative instead. Falls back to the master's path for anything unencoded, which would be a
 * bug in the manifest rather than something to hide.
 */
export function largestSrc(ref: string): string {
  const file = imageFile(ref);
  const stem = file.replace(/^\/images\//, "").replace(/\.png$/, "");
  const ladder = (rungs as Record<string, number[]>)[stem];
  return ladder ? `/img/${stem}-${ladder[ladder.length - 1]}.webp` : file;
}
