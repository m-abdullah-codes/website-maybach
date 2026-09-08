// Evaluate JS in a page: node scripts/eval.mjs <url> <width> "<expression>"
import { chromium } from "playwright-core";

const [, , url, w, expr] = process.argv;
const width = Number(w || 1440);
const browser = await chromium.launch({ channel: "chrome" });
const ctx = await browser.newContext({ viewport: { width, height: width < 768 ? 844 : 900 }, deviceScaleFactor: 1, isMobile: width < 768 });
await ctx.addInitScript(() => {
  try {
    sessionStorage.setItem("mb-preloaded", "1");
  } catch {}
});
const page = await ctx.newPage();
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(800);
const result = await page.evaluate(expr);
console.log(JSON.stringify(result, null, 1));
await browser.close();
