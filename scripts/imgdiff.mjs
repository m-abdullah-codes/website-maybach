// Pixel diff between two capture folders: node scripts/imgdiff.mjs <dirA> <dirB> [outDir]
// Reports the share of pixels that differ by more than 8/255 on any channel.
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const [, , dirA, dirB, outDir] = process.argv;
const files = fs.readdirSync(dirB).filter((f) => f.endsWith(".png") && fs.existsSync(path.join(dirA, f)));
if (outDir) fs.mkdirSync(outDir, { recursive: true });
let worst = 0;

for (const f of files.sort()) {
  const a = sharp(path.join(dirA, f)), b = sharp(path.join(dirB, f));
  const [ma, mb] = [await a.metadata(), await b.metadata()];
  if (ma.width !== mb.width || ma.height !== mb.height) {
    console.log(`${f.padEnd(46)} SIZE ${ma.width}x${ma.height} -> ${mb.width}x${mb.height}`);
    continue;
  }
  // ensureAlpha so both buffers have the same stride whatever the PNG carried.
  const [ra, rb] = [await a.ensureAlpha().raw().toBuffer(), await b.ensureAlpha().raw().toBuffer()];
  const ch = 4;
  let diff = 0;
  const mask = outDir ? Buffer.alloc(ma.width * ma.height * 3) : null;
  for (let p = 0; p < ma.width * ma.height; p++) {
    let d = 0;
    for (let c = 0; c < 3; c++) d = Math.max(d, Math.abs(ra[p * ch + c] - rb[p * ch + c]));
    if (d > 8) { diff++; if (mask) { mask[p * 3] = 255; mask[p * 3 + 1] = 0; mask[p * 3 + 2] = 90; } }
    else if (mask) { const g = ra[p * ch] >> 2; mask[p * 3] = mask[p * 3 + 1] = mask[p * 3 + 2] = g; }
  }
  const pct = (diff / (ma.width * ma.height)) * 100;
  worst = Math.max(worst, pct);
  if (mask && pct > 0.02) await sharp(mask, { raw: { width: ma.width, height: ma.height, channels: 3 } }).png().toFile(path.join(outDir, f));
  console.log(`${f.padEnd(46)} ${pct.toFixed(3)}% differing pixels${pct > 0.5 ? "   <-- look" : ""}`);
}
console.log(`worst ${worst.toFixed(3)}%`);
