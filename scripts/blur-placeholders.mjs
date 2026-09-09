// Generates src/lib/blur.json: a tiny base64 WebP (16 px wide) for every PNG in public/images;
// src/lib/bounds.json: for RGBA images, the transparent margins (top/right/bottom/left as
// fractions of the image) so the Scene can place the giant word and the floor exactly;
// and src/lib/luma.json: for the images a Car card can use, how bright the photograph is behind
// the card's glass name strip, so the strip can set its type in platinum or in ink.
// RGBA cut-outs keep their transparency so the placeholder sits on a transparent background.
// Run once (npm run blur) and commit the JSON. Masters in public/images are never modified.
import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = path.join(root, "public", "images");
const blurFile = path.join(root, "src", "lib", "blur.json");
const boundsFile = path.join(root, "src", "lib", "bounds.json");
const lumaFile = path.join(root, "src", "lib", "luma.json");

const files = (await readdir(srcDir)).filter((f) => f.toLowerCase().endsWith(".png")).sort();
const blur = {};
const bounds = {};
const luma = {};

// Where CarCard's glass name strip lands on the photograph, as fractions of the *visible* card.
// The strip is inset 16 px and 24 px-padded at the bottom of a 4:5 card, which is about the band
// from 78% to 95% of the card's height.
const STRIP_TOP = 0.78;
const STRIP_BOTTOM = 0.95;
// CarCard shows a -CARD master whole, and crops a -HERO-M portrait to 4:5 at object-position 50% 60%,
// which is the band from 17.8% to 88.2% of the portrait. Those are the only two shapes it can use.
function visibleBand(name, w, h) {
  if (name.endsWith("-card")) return { top: 0, height: h };
  const height = Math.round(w * 5 / 4);
  return { top: Math.round((h - height) * 0.6), height };
}
for (const file of files) {
  const buf = await readFile(path.join(srcDir, file));
  const meta = await sharp(buf).metadata();
  const width = 16;
  const height = Math.max(1, Math.round((meta.height / meta.width) * width));
  const webp = await sharp(buf)
    .resize(width, height, { fit: "fill" })
    .webp({ quality: 55, alphaQuality: 60 })
    .toBuffer();
  blur[`/images/${file}`] = `data:image/webp;base64,${webp.toString("base64")}`;

  // Mean luminance behind the card strip. Only -card masters and -hero-m portraits can be a card.
  const name = file.replace(/\.png$/i, "");
  if (!meta.hasAlpha && (name.endsWith("-card") || name.endsWith("-hero-m"))) {
    const band = visibleBand(name, meta.width, meta.height);
    const top = band.top + Math.round(band.height * STRIP_TOP);
    const height = Math.round(band.height * (STRIP_BOTTOM - STRIP_TOP));
    if (top + height <= meta.height) {
      const stats = await sharp(buf).extract({ left: 0, top, width: meta.width, height }).greyscale().stats();
      luma[`/images/${file}`] = Math.round(stats.channels[0].mean);
    }
  }

  if (meta.hasAlpha) {
    const { data, info } = await sharp(buf).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    const { width: w, height: h, channels } = info;
    let top = h, bottom = -1, left = w, right = -1;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        if (data[(y * w + x) * channels + 3] > 40) {
          if (y < top) top = y;
          if (y > bottom) bottom = y;
          if (x < left) left = x;
          if (x > right) right = x;
        }
      }
    }
    if (bottom >= 0) {
      bounds[`/images/${file}`] = {
        top: +(top / h).toFixed(4),
        right: +((w - 1 - right) / w).toFixed(4),
        bottom: +((h - 1 - bottom) / h).toFixed(4),
        left: +(left / w).toFixed(4),
      };
    }
  }
}
await mkdir(path.dirname(blurFile), { recursive: true });
await writeFile(blurFile, JSON.stringify(blur));
await writeFile(boundsFile, JSON.stringify(bounds, null, 2));
await writeFile(lumaFile, JSON.stringify(luma, null, 2));
console.log(
  `blur.json: ${files.length} placeholders · bounds.json: ${Object.keys(bounds).length} alpha images` +
    ` · luma.json: ${Object.keys(luma).length} card strip readings`,
);
