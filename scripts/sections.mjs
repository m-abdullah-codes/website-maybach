// Section-by-section design QA: node scripts/sections.mjs <url> <width> <height> <outDir> <prefix>
// Walks every top-level <section>, scrolls it into frame and captures the viewport, so each
// section can be judged against its sketch in docs/02 without reading a 20 000 px full-page shot.
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright-core";

const [, , url, w, h, outDir, prefix] = process.argv;
if (!url || !w || !h || !outDir) {
  console.error("usage: node scripts/sections.mjs <url> <width> <height> <outDir> <prefix>");
  process.exit(1);
}
const width = Number(w);
const height = Number(h);
await mkdir(outDir, { recursive: true });

const browser = await chromium.launch({ channel: "chrome" });
const ctx = await browser.newContext({
  viewport: { width, height },
  deviceScaleFactor: 1,
  isMobile: width < 768,
  hasTouch: width < 768,
});
await ctx.addInitScript(() => {
  try {
    sessionStorage.setItem("mb-preloaded", "1");
  } catch {}
});
const page = await ctx.newPage();
const problems = [];
page.on("console", (m) => {
  if (m.type() === "error" || m.type() === "warning") problems.push(`${m.type()}: ${m.text()}`);
});
page.on("pageerror", (e) => problems.push(`pageerror: ${e.message}`));
page.on("response", (r) => {
  if (r.status() >= 400) problems.push(`${r.status()} ${r.url()}`);
});

await page.goto(url, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.waitForSelector(".preloader", { state: "detached", timeout: 6000 }).catch(() => {});

// Warm every lazy image, then come back to the top so entrance animations have run.
await page.evaluate(async () => {
  const h = document.documentElement.scrollHeight;
  for (let y = 0; y < h; y += 400) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 30));
  }
  window.scrollTo(0, 0);
});
await page.waitForLoadState("networkidle");
await page.waitForTimeout(500);

const stops = await page.evaluate((vh) => {
  const out = [];
  const sections = Array.from(document.querySelectorAll("main > section, main > div > section, [data-row], main > footer, body > footer"));
  sections.forEach((el, i) => {
    const r = el.getBoundingClientRect();
    const top = Math.round(r.top + window.scrollY);
    const hgt = Math.round(r.height);
    const id = el.id || el.getAttribute("data-sec") || `s${i + 1}`;
    const n = String(i + 1).padStart(2, "0");
    // A section taller than the viewport (the collection's row list, a detail page's gallery) is walked
    // one viewport at a time so nothing between the top and the bottom goes unseen.
    const steps = Math.max(1, Math.ceil(hgt / vh));
    for (let s = 0; s < steps; s++) {
      const y = Math.min(top + s * vh, top + hgt - vh);
      out.push({ id: steps === 1 ? `${n}-${id}` : `${n}-${id}-${String(s + 1).padStart(2, "0")}`, y: Math.max(0, y), h: hgt });
    }
  });
  return out.sort((a, b) => a.y - b.y);
}, height);

for (const stop of stops) {
  await page.evaluate((y) => window.scrollTo(0, y), stop.y);
  await page.waitForTimeout(1300);
  const name = `${prefix ? prefix + "-" : ""}${stop.id}.png`;
  await page.screenshot({ path: path.join(outDir, name), fullPage: false });
  console.log(`${name}  y=${stop.y} h=${stop.h}`);
}
if (problems.length) console.log("CONSOLE: " + [...new Set(problems)].join(" | "));
await browser.close();
