// Post-processes `out/` (next build, output: "export") into the shape the site is actually served in.
//
// English has no prefix and Arabic sits under /ar (docs/03 §2). With a server that was the middleware's
// job: it rewrote /collection to /en/collection on the way in. An export has no middleware, so the
// English tree is moved up to the root here instead — out/en/collection.html becomes
// out/collection.html — and public/_redirects sends anyone holding an /en/... link to the same page
// without it. The .txt files beside the HTML are the payloads the client router fetches on a
// navigation, so they move with it or client-side routing breaks.
//
// Also drops the two directories that must never be deployed: the PNG masters, which nothing links to
// any more now that scripts/derive-images.mjs has encoded what the pages ask for (269 MB), and the
// image drop staging folder.
import { readdir, rename, rm, stat, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, process.env.MB_OUT_DIR || "out");

const DEFAULT_LOCALE = "en";
/** Copied into out/ from public/, but nothing on the site links to either. */
const DROP = ["images", "new-generations"];

async function exists(p) {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

if (!(await exists(out))) {
  console.error(`flatten-export: ${out} does not exist — run \`next build\` first`);
  process.exit(1);
}

/** Moves everything in `from` into `to`, merging directories that already exist. */
async function merge(from, to) {
  await mkdir(to, { recursive: true });
  for (const entry of await readdir(from, { withFileTypes: true })) {
    const src = path.join(from, entry.name);
    const dest = path.join(to, entry.name);
    if (entry.isDirectory() && (await exists(dest))) {
      await merge(src, dest);
      await rm(src, { recursive: true, force: true });
    } else {
      await rm(dest, { recursive: true, force: true });
      await rename(src, dest);
    }
  }
}

let moved = 0;

// The route files that sit beside the directory: out/en.html, out/en.txt, out/en.meta …
for (const entry of await readdir(out, { withFileTypes: true })) {
  if (!entry.isFile()) continue;
  const match = entry.name.match(new RegExp(`^${DEFAULT_LOCALE}\\.(.+)$`));
  if (!match) continue;
  await rename(path.join(out, entry.name), path.join(out, `index.${match[1]}`));
  moved++;
}

// …and the tree under it.
const localeDir = path.join(out, DEFAULT_LOCALE);
if (await exists(localeDir)) {
  const before = await readdir(localeDir);
  moved += before.length;
  await merge(localeDir, out);
  await rm(localeDir, { recursive: true, force: true });
}

if (moved === 0) {
  console.error(`flatten-export: found no /${DEFAULT_LOCALE} output in ${out} — did the export change shape?`);
  process.exit(1);
}

let dropped = 0;
for (const dir of DROP) {
  const p = path.join(out, dir);
  if (await exists(p)) {
    await rm(p, { recursive: true, force: true });
    dropped++;
  }
}

// The site is unusable without these, and a silent rename upstream would be hard to spot later.
for (const required of ["index.html", "ar.html", "collection.html", "404.html", "_headers", "_redirects"]) {
  if (!(await exists(path.join(out, required)))) {
    console.error(`flatten-export: expected ${required} in ${out}`);
    process.exit(1);
  }
}

console.log(`flatten-export: ${DEFAULT_LOCALE} → root (${moved} entries), ${dropped} directories dropped`);
