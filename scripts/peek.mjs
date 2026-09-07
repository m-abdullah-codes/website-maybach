// Targeted QA view: node scripts/peek.mjs <url> <width> <height> <out.png> [selector] [scrollY]
// Captures the viewport (not the full page) after scrolling to a selector or a Y offset.
import { chromium } from "playwright-core";

const [, , url, w, h, out, selector, scrollY] = process.argv;
if (!url || !w || !h || !out) {
  console.error("usage: node scripts/peek.mjs <url> <width> <height> <out.png> [selector] [scrollY]");
  process.exit(1);
}
const width = Number(w);
const browser = await chromium.launch({ channel: "chrome" });
const ctx = await browser.newContext({
  viewport: { width, height: Number(h) },
  deviceScaleFactor: 1,
  isMobile: width < 768,
  hasTouch: width < 768,
});
const page = await ctx.newPage();
await page.goto(url, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
if (selector) {
  await page.locator(selector).first().scrollIntoViewIfNeeded();
  await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY);
  }, selector);
} else if (scrollY) {
  await page.evaluate((y) => window.scrollTo(0, Number(y)), scrollY);
}
await page.waitForLoadState("networkidle");
await page.waitForTimeout(400);
await page.screenshot({ path: out, fullPage: false });
console.log(out);
await browser.close();
