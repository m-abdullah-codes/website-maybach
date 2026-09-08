// Marque logo derivatives: node scripts/brand-logos.mjs
//
// The files in /public/logos are the official marque SVGs as supplied — full-colour crests (a gold
// Lamborghini shield, a silver Rolls-Royce plate, a 3D Chevrolet bowtie) and flat black-on-white line
// art (Mercedes, Porsche, GMC, Range Rover), several of them carrying an opaque white background
// rectangle. Dropped into the strip as-is they are wrong twice over: colour in an interface that has
// none (CLAUDE.md §3), and, once forced monochrome with a CSS filter, solid white blobs — every
// counter and outline flattens away.
//
// This writes a white-on-transparent derivative per marque into /public/logos/mono, and it does two
// things a filter cannot:
//
//   1. INK. Where the mark is line art or a badge with detail, the ink is the *dark* part of the
//      artwork (`mode: "dark"`): white background and pale fills fall away, black outlines, counters
//      and stripes survive — the Porsche crest keeps its stripes, the Rolls-Royce plate keeps its
//      monogram. Where the mark reads as one solid shape (the Chevrolet bowtie), the ink is the
//      silhouette instead (`mode: "solid"`), because its darkness is only a thin bevel outline.
//   2. OPTICAL SIZE. Marks are trimmed to their ink and scaled so that sqrt(ink area) is constant,
//      then capped by width and height. A hairline wordmark grows until it hits the width cap; a
//      solid block shrinks. Bounding-box fitting alone would make the GMC block shout and the
//      Mercedes star whisper. Every derivative lands on the same 512x512 canvas, so the strip needs
//      no per-logo CSS.
//
// Rerun after adding or replacing a file in /public/logos; commit the output.

import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SRC = path.join(process.cwd(), "public", "logos");
const OUT = path.join(SRC, "mono");
const CANVAS = 512;
// Caps as fractions of the square tile, and the constant that sqrt(ink area) is normalised to.
const MAX_W = 0.76;
const MAX_H = 0.52;
const AREA_K = 0.3;

/**
 * One entry per file in /public/logos. `mode` says where the ink is; `gamma` > 1 thins the ink,
 * < 1 thickens it; `optical` is a last manual nudge for a mark that measures right and looks wrong.
 */
const LOGOS = [
  { slug: "rolls-royce", name: "Rolls-Royce", file: "rolls-royce.svg", mode: "dark", gamma: 0.85, optical: 1.0 },
  { slug: "bentley", name: "Bentley", file: "bentley.svg", mode: "dark", gamma: 0.8, optical: 1.0 },
  { slug: "mercedes-benz", name: "Mercedes-Benz", file: "mercedes-benz-1.svg", mode: "dark", gamma: 1, optical: 1.0 },
  { slug: "range-rover", name: "Range Rover", file: "range-rover-1.svg", mode: "dark", gamma: 1, optical: 1.0 },
  { slug: "chevrolet", name: "Chevrolet", file: "chevrolet-10.svg", mode: "solid", gamma: 1, optical: 0.94 },
  { slug: "gmc", name: "GMC", file: "gmc.svg", mode: "dark", gamma: 1, optical: 0.94 },
  { slug: "lamborghini", name: "Lamborghini", file: "lamborghini.svg", mode: "dark", gamma: 1, optical: 1.0 },
  { slug: "porsche", name: "Porsche", file: "porsche-3.svg", mode: "dark", gamma: 1, optical: 1.0 },
];

const RENDER = 1400; // rasterise long-edge before measuring, so thin strokes survive the trim

/** Ink coverage per pixel, 0..1: darkness under the alpha, or the silhouette itself. */
function inkMask(data, n, mode, gamma) {
  const ink = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const p = i * 4;
    const a = data[p + 3] / 255;
    if (mode === "solid") {
      ink[i] = a;
    } else {
      const l = (0.2126 * data[p] + 0.7152 * data[p + 1] + 0.0722 * data[p + 2]) / 255;
      ink[i] = a * (1 - l);
    }
  }
  if (gamma !== 1) for (let i = 0; i < n; i++) ink[i] = Math.pow(ink[i], gamma);
  return ink;
}

async function build(logo) {
  const src = path.join(SRC, logo.file);
  if (!fs.existsSync(src)) throw new Error(`missing ${logo.file}`);

  const svg = fs.readFileSync(src);
  // Rasterise at the density that lands the long edge on RENDER: the files declare sizes from 140 to
  // 2500 units, and a fixed density either blows the pixel limit or loses hairlines.
  const base = await sharp(svg).metadata();
  const density = Math.min(2400, Math.max(72, (72 * RENDER) / Math.max(base.width, base.height)));
  const { data, info } = await sharp(svg, { density })
    .resize({ width: RENDER, height: RENDER, fit: "inside" })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width: w, height: h } = info;
  const ink = inkMask(data, w * h, logo.mode, logo.gamma);

  // Trim to the ink. A low threshold keeps antialiased edges; anything under it is background.
  let x0 = w, y0 = h, x1 = -1, y1 = -1, area = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const v = ink[y * w + x];
      if (v < 0.06) continue;
      area += v;
      if (x < x0) x0 = x;
      if (x > x1) x1 = x;
      if (y < y0) y0 = y;
      if (y > y1) y1 = y;
    }
  }
  if (x1 < 0) throw new Error(`${logo.file}: no ink found in "${logo.mode}" mode`);

  const bw = x1 - x0 + 1;
  const bh = y1 - y0 + 1;

  // White pixels, alpha = ink, cropped to the bounding box.
  const rgba = Buffer.alloc(bw * bh * 4);
  for (let y = 0; y < bh; y++) {
    for (let x = 0; x < bw; x++) {
      const v = ink[(y + y0) * w + (x + x0)];
      const p = (y * bw + x) * 4;
      rgba[p] = 255;
      rgba[p + 1] = 255;
      rgba[p + 2] = 255;
      rgba[p + 3] = Math.round(Math.min(1, v) * 255);
    }
  }

  // Optical scale: equal ink area, then capped by the tile's width and height.
  const byArea = (AREA_K * CANVAS) / Math.sqrt(area);
  const scale = Math.min(byArea * logo.optical, (MAX_W * CANVAS) / bw, (MAX_H * CANVAS) / bh);
  const tw = Math.max(1, Math.round(bw * scale));
  const th = Math.max(1, Math.round(bh * scale));

  const mark = await sharp(rgba, { raw: { width: bw, height: bh, channels: 4 } })
    .resize(tw, th, { fit: "fill", kernel: "lanczos3" })
    .png()
    .toBuffer();

  const out = path.join(OUT, `${logo.slug}.png`);
  await sharp({ create: { width: CANVAS, height: CANVAS, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 0 } } })
    .composite([{ input: mark, left: Math.round((CANVAS - tw) / 2), top: Math.round((CANVAS - th) / 2) }])
    .png({ compressionLevel: 9, palette: true, colours: 64, effort: 10 })
    .toFile(out);

  return { slug: logo.slug, name: logo.name, source: logo.file, mode: logo.mode, box: [tw, th], bytes: fs.statSync(out).size };
}

fs.mkdirSync(OUT, { recursive: true });
const rows = [];
for (const logo of LOGOS) rows.push(await build(logo));

fs.writeFileSync(
  path.join(OUT, "index.json"),
  `${JSON.stringify({ _readme: "Generated by scripts/brand-logos.mjs from the official SVGs in ../ — do not edit.", canvas: CANVAS, logos: rows }, null, 2)}\n`,
);

for (const r of rows) console.log(`${r.slug.padEnd(16)} ${r.mode.padEnd(6)} ${String(r.box[0]).padStart(4)}x${String(r.box[1]).padEnd(4)} ${(r.bytes / 1024).toFixed(1)} KB`);
