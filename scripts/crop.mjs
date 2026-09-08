// Crop a region out of a QA screenshot so details can be read: node scripts/crop.mjs <src> <x> <y> <w> <h> <out> [scale]
import sharp from "sharp";
const [, , src, x, y, w, h, out, scale] = process.argv;
let img = sharp(src).extract({ left: +x, top: +y, width: +w, height: +h });
if (scale && +scale !== 1) img = img.resize({ width: Math.round(+w * +scale) });
await img.toFile(out);
console.log(out);
