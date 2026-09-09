import manifest from "../../content/image-manifest.json";
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
