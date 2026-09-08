// Generates the share image and the Apple touch icon from the masters (docs/03 §4.5, Phase 7):
//   public/og.png            1200×630 from mb-br-04.png (cover crop)
//   src/app/apple-icon.png   180×180, emblem on obsidian, rasterised from the same geometry as icon.svg
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const og = await readFile(path.join(root, "public", "images", "mb-br-04.png"));
await sharp(og).resize(1200, 630, { fit: "cover", position: "centre" }).png({ compressionLevel: 9 }).toFile(path.join(root, "public", "og.png"));

const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180"><rect width="180" height="180" fill="#070708"/><g transform="translate(17 56) scale(0.1354)" fill="none" stroke="#ECEAE4" stroke-width="56" stroke-linejoin="round"><path d="M31 251 296 32 537 237 779 32 1042 249"/><path d="M103 279 293 442 492 270"/><path d="M584 270 782 442 945 295 778 152 664 250"/></g></svg>`;
await sharp(Buffer.from(icon)).png().toFile(path.join(root, "src", "app", "apple-icon.png"));
console.log("og.png 1200×630 and apple-icon.png 180×180 written");
