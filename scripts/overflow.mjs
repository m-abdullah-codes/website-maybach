// Finds elements that extend past the viewport width: node scripts/overflow.mjs <url> <width> <height>
import { chromium } from "playwright-core";
const [, , url, w, h] = process.argv;
const width = Number(w);
const browser = await chromium.launch({ channel: "chrome" });
const ctx = await browser.newContext({ viewport: { width, height: Number(h) }, deviceScaleFactor: 1, isMobile: width < 768 });
const page = await ctx.newPage();
await page.goto(url, { waitUntil: "networkidle" });
const rows = await page.evaluate(() => {
  const out = [];
  const vw = Number(new URLSearchParams(location.hash.slice(1)).get("vw")) || window.innerWidth;
  document.querySelectorAll("body *").forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.right > vw + 1 || r.left < -1) {
      const cls = (el.className && typeof el.className === "string") ? el.className.slice(0, 60) : "";
      out.push(`${el.tagName.toLowerCase()}.${cls} left=${Math.round(r.left)} right=${Math.round(r.right)} w=${Math.round(r.width)}`);
    }
  });
  return { scrollWidth: document.documentElement.scrollWidth, vw, rows: out.slice(0, 40) };
});
console.log(JSON.stringify(rows, null, 1));
await browser.close();
