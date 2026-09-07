// Layout probe: node scripts/measure.mjs <url> <width> <height> <selector>
// Prints bounding rect, font-size and text for each match, plus the document scroll width.
import { chromium } from "playwright-core";

const [, , url, w, h, selector] = process.argv;
const width = Number(w);
const browser = await chromium.launch({ channel: "chrome" });
const ctx = await browser.newContext({ viewport: { width, height: Number(h) }, deviceScaleFactor: 1, isMobile: width < 768 });
const page = await ctx.newPage();
await page.goto(url, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
const rows = await page.evaluate((sel) => {
  const out = [];
  document.querySelectorAll(sel).forEach((el) => {
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    out.push({
      text: (el.textContent || "").trim().slice(0, 40),
      x: Math.round(r.x + window.scrollX),
      y: Math.round(r.y + window.scrollY),
      w: Math.round(r.width),
      h: Math.round(r.height),
      scrollW: el.scrollWidth,
      fontSize: cs.fontSize,
      fontFamily: cs.fontFamily.slice(0, 60),
      letterSpacing: cs.letterSpacing,
    });
  });
  return { scrollWidth: document.documentElement.scrollWidth, innerWidth: window.innerWidth, rows: out };
}, selector);
console.log(JSON.stringify(rows, null, 1));
await browser.close();
