// Generates src/lib/blur.json: a tiny base64 WebP (16 px wide) for every PNG in public/images,
// and src/lib/bounds.json: for RGBA images, the transparent margins (top/right/bottom/left as
// fractions of the image) so the Scene can place the giant word and the floor exactly.
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

const files = (await readdir(srcDir)).filter((f) => f.toLowerCase().endsWith(".png")).sort();
const blur = {};
const bounds = {};
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
console.log(`blur.json: ${files.length} placeholders · bounds.json: ${Object.keys(bounds).length} alpha images`);
