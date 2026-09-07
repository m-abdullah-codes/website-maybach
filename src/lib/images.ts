import manifest from "../../content/image-manifest.json";
import blur from "./blur.json";
import boundsJson from "./bounds.json";

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
