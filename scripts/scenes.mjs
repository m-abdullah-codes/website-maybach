// The four Scenes, shot at both widths, for tuning src/lib/scene-config.ts.
// (The Home hero was the fifth until September 2026; it is a page-hero photograph now, with no
// cut-out and no #hero Scene to shoot — see src/lib/scene-config.ts and qa/LOG.md.)
//
//   node scripts/scenes.mjs                      → all four, 390 and 1440, into qa/scenes/
//   node scripts/scenes.mjs cul                  → just that one
//   node scripts/scenes.mjs cul cgt --w 390      → two of them, one width
//   node scripts/scenes.mjs --base http://localhost:3002 --out qa/try-2
//
// Change a number in scene-config.ts, save, rerun, look. That is the loop.
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright-core";

const SCENES = [
  { key: "featured", route: "/", sel: "#featured", label: "Home featured · Continental GT · AZURE" },
  { key: "cul", route: "/collection", sel: "#row-rolls-royce-cullinan", label: "Collection row 1 · Cullinan" },
  { key: "fsm", route: "/collection", sel: "#row-bentley-flying-spur-mulliner", label: "Collection row 4 · Flying Spur (light room)" },
  { key: "cgt", route: "/collection", sel: "#row-bentley-continental-gt-azure", label: "Collection row 7 · Continental GT" },
];

const argv = process.argv.slice(2);
const flag = (name, fallback) => {
  const i = argv.indexOf(`--${name}`);
  return i === -1 ? fallback : argv[i + 1];
};
const base = flag("base", "http://localhost:3000");
const outDir = flag("out", "qa/scenes");
const locale = flag("locale", "");
const only = argv.filter((a, i) => !a.startsWith("--") && !argv[i - 1]?.startsWith("--"));
const widths = flag("w") ? [Number(flag("w"))] : [390, 1440];
const wanted = only.length ? SCENES.filter((s) => only.includes(s.key)) : SCENES;
if (!wanted.length) {
  console.error(`unknown scene. one of: ${SCENES.map((s) => s.key).join(", ")}`);
  process.exit(1);
}

await mkdir(outDir, { recursive: true });
const browser = await chromium.launch({ channel: "chrome" });
const problems = [];

for (const width of widths) {
  const height = width < 768 ? 844 : 900;
  const ctx = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1, isMobile: width < 768, hasTouch: width < 768 });
  await ctx.addInitScript(() => {
    try {
      sessionStorage.setItem("mb-preloaded", "1");
    } catch {}
  });
  const page = await ctx.newPage();
  page.on("console", (m) => {
    if (m.type() === "error") problems.push(`${width}: ${m.text().slice(0, 120)}`);
  });

  let loaded = "";
  for (const scene of wanted) {
    const url = `${base}${locale ? `/${locale}` : ""}${scene.route}`;
    if (url !== loaded) {
      await page.goto(url, { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts.ready);
      loaded = url;
    }
    // Collection rows are mounted by the filter component, and every cut-out is lazy.
    await page.waitForSelector(scene.sel, { timeout: 20000 });
    await page.evaluate((s) => {
      const el = document.querySelector(s);
      window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY);
    }, scene.sel);
    await page.waitForTimeout(Number(process.env.SCENE_WAIT || 2200));
    const file = path.join(outDir, `${scene.key}-${width}.png`);
    await page.screenshot({ path: file });
    console.log(`${file.padEnd(34)} ${scene.label}`);
  }
  await ctx.close();
}

await browser.close();
if (problems.length) console.log("console errors:", [...new Set(problems)].slice(0, 6).join(" | "));
