// Build-time image derivatives (the static build has no image server).
//
// Every PNG the site asks next/image for is encoded here instead, once, at the sizes it can be asked
// for: public/img/<stem>-<w>.webp and the same in .avif. The stem is the source path with its first
// segment replaced — /images/mb-cul-bg-d.png becomes /img/mb-cul-bg-d-<w>.*, /logos/mono/bentley.png
// becomes /img/mono/bentley-<w>.*.
//
// The rungs are written to src/lib/img-rungs.json, which is the only thing src/lib/image-loader.ts
// needs at runtime: it picks the first rung at or above the width next/image asked for, so a request
// can never name a file that was not encoded. WebP is what the <img> gets (universal since 2020);
// the hand-built <picture> elements offer the .avif first (src/lib/images.ts → avifSet).
//
// Incremental: an output at least as new as its master is left alone, so a second run costs nothing
// and only new or re-exported photographs are encoded. `--force` re-encodes everything.
// Masters in public/images and public/logos are never modified.
import { readdir, readFile, writeFile, mkdir, stat } from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outRoot = path.join(root, "public", "img");
const rungsFile = path.join(root, "src", "lib", "img-rungs.json");

/**
 * The photographs are laid out full-bleed or in halves, so they are only ever asked for at a device
 * size (next.config.ts → images.deviceSizes); the marque logos sit in a 138 px tile and are only ever
 * asked for below 512. Each ladder stops at the master's own width — nothing is upscaled.
 */
const SETS = [
  { dir: ["public", "images"], prefix: "", ladder: [390, 640, 768, 1024, 1280, 1440, 1680] },
  { dir: ["public", "logos", "mono"], prefix: "mono/", ladder: [128, 256, 512] },
];

const force = process.argv.includes("--force");

await mkdir(outRoot, { recursive: true });

const jobs = [];
const rungs = {};

for (const set of SETS) {
  const dir = path.join(root, ...set.dir);
  const files = (await readdir(dir)).filter((f) => f.toLowerCase().endsWith(".png")).sort();
  for (const file of files) {
    const master = path.join(dir, file);
    const stem = set.prefix + file.replace(/\.png$/i, "");
    const meta = await sharp(master).metadata();
    const ladder = [...set.ladder.filter((w) => w < meta.width), meta.width];
    rungs[stem] = ladder;
    const masterMtime = (await stat(master)).mtimeMs;
    await mkdir(path.dirname(path.join(outRoot, stem)), { recursive: true });
    for (const w of ladder) jobs.push({ master, masterMtime, stem, w, alpha: Boolean(meta.hasAlpha) });
  }
}

async function current(file, masterMtime) {
  if (force) return false;
  try {
    return (await stat(file)).mtimeMs >= masterMtime;
  } catch {
    return false;
  }
}

let written = 0;
let skipped = 0;
let failed = 0;

async function encode({ master, masterMtime, stem, w, alpha }) {
  const webp = path.join(outRoot, `${stem}-${w}.webp`);
  const avif = path.join(outRoot, `${stem}-${w}.avif`);
  const needWebp = !(await current(webp, masterMtime));
  const needAvif = !(await current(avif, masterMtime));
  if (!needWebp && !needAvif) {
    skipped += 2;
    return;
  }
  // One decode and one resize feed both encoders.
  const resized = await sharp(await readFile(master))
    .resize(w, null, { withoutEnlargement: true, fit: "inside" })
    .toBuffer();
  if (needWebp) {
    await sharp(resized).webp({ quality: 78, alphaQuality: 90, effort: 4 }).toFile(webp);
    written++;
  } else skipped++;
  if (needAvif) {
    // 4:4:4 on the cut-outs and the logos: their edges are the subject, and chroma subsampling frays them.
    await sharp(resized)
      .avif({ quality: 58, effort: 4, chromaSubsampling: alpha ? "4:4:4" : "4:2:0" })
      .toFile(avif);
    written++;
  } else skipped++;
}

// One encode per core; sharp releases the event loop while libvips works.
const concurrency = Math.max(2, Math.min(os.cpus().length, 8));
let next = 0;
const started = Date.now();

await Promise.all(
  Array.from({ length: concurrency }, async () => {
    while (next < jobs.length) {
      const job = jobs[next++];
      try {
        await encode(job);
      } catch (err) {
        failed++;
        console.error(`  ${job.stem}-${job.w}: ${err.message}`);
      }
    }
  }),
);

await writeFile(rungsFile, `${JSON.stringify(rungs)}\n`);

const secs = ((Date.now() - started) / 1000).toFixed(1);
console.log(`derive-images: ${Object.keys(rungs).length} masters · ${jobs.length} sizes · ${written} written, ${skipped} current · ${secs}s`);
if (failed) {
  console.error(`derive-images: ${failed} failed`);
  process.exit(1);
}
