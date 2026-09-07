// QA screenshots (docs/03 §10): node scripts/shoot.mjs <baseUrl> <outDir> <route> [route...]
// Captures every route at 390×844 and 1440×900, full page, and reports console errors/warnings.
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright-core";

const [, , base, outDir, ...routes] = process.argv;
if (!base || !outDir || routes.length === 0) {
  console.error("usage: node scripts/shoot.mjs <baseUrl> <outDir> <route> [route...]");
  process.exit(1);
}
await mkdir(outDir, { recursive: true });

const SIZES = [
  { w: 390, h: 844, tag: "390" },
  { w: 1440, h: 900, tag: "1440" },
];

const browser = await chromium.launch({ channel: "chrome" });
let failures = 0;
for (const route of routes) {
  for (const s of SIZES) {
    const ctx = await browser.newContext({
      viewport: { width: s.w, height: s.h },
      deviceScaleFactor: 1,
      isMobile: s.w < 768,
      hasTouch: s.w < 768,
    });
    const page = await ctx.newPage();
    const problems = [];
    page.on("console", (m) => {
      if (m.type() === "error" || m.type() === "warning") {
        const loc = m.location();
        problems.push(`${m.type()}: ${m.text()}${loc?.url ? ` @ ${loc.url}` : ""}`);
      }
    });
    page.on("pageerror", (e) => problems.push(`pageerror: ${e.message}`));
    page.on("response", (r) => {
      if (r.status() >= 400) problems.push(`${r.status()} ${r.url()}`);
    });
    await page.goto(base + route, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    // Walk the page so lazy images load, then return to the top.
    await page.evaluate(async () => {
      const h = document.documentElement.scrollHeight;
      for (let y = 0; y < h; y += 500) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 40));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(300);
    const name = `${route === "/" ? "home" : route.replace(/^\//, "").replace(/\//g, "-")}-${s.tag}.png`;
    await page.screenshot({ path: path.join(outDir, name), fullPage: true });
    if (problems.length) failures++;
    console.log(`${name}  ${problems.length ? "CONSOLE: " + problems.join(" | ") : "console clean"}`);
    await ctx.close();
  }
}
await browser.close();
process.exit(failures ? 2 : 0);
