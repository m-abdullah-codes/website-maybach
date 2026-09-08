// Observed LCP entries: node scripts/lcp-probe.mjs <url> [width] [skipPreloader=0|1]
import { chromium } from "playwright-core";

const [, , url, w = "412", skip = "0"] = process.argv;
const width = Number(w);
const browser = await chromium.launch({ channel: "chrome" });
const ctx = await browser.newContext({ viewport: { width, height: width < 768 ? 823 : 900 }, deviceScaleFactor: 1, isMobile: width < 768 });
if (skip === "1") {
  await ctx.addInitScript(() => {
    try {
      sessionStorage.setItem("mb-preloaded", "1");
    } catch {}
  });
}
if (process.env.BLOCK) {
  const pattern = new RegExp(process.env.BLOCK);
  await ctx.route((u) => pattern.test(u.href), (route) => route.abort());
}
const page = await ctx.newPage();
await page.addInitScript(() => {
  window.__lcp = [];
  new PerformanceObserver((list) => {
    for (const e of list.getEntries()) {
      const el = e.element;
      window.__lcp.push({ t: Math.round(e.startTime), size: e.size, load: Math.round(e.loadTime), render: Math.round(e.renderTime), el: el ? `${el.tagName.toLowerCase()}.${String(el.className).slice(0, 40)}` : "?", url: (e.url || "").split("url=")[1]?.slice(0, 40) });
    }
  }).observe({ type: "largest-contentful-paint", buffered: true });
  window.__paint = [];
  new PerformanceObserver((list) => {
    for (const e of list.getEntries()) window.__paint.push({ name: e.name, t: Math.round(e.startTime) });
  }).observe({ type: "paint", buffered: true });
});
await page.goto(url, { waitUntil: "load" });
await page.waitForTimeout(3500);
const r = await page.evaluate(() => ({ paint: window.__paint, lcp: window.__lcp }));
console.log(`skipPreloader=${skip}`, JSON.stringify(r));
await browser.close();
