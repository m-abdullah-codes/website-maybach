// Layout-shift probe: node scripts/cls-probe.mjs <url> [width]
// Loads the page (with the preloader, like a first visit), waits 6 s, prints every layout shift with its sources.
import { chromium } from "playwright-core";

const [, , url, w = "412"] = process.argv;
const width = Number(w);
const browser = await chromium.launch({ channel: "chrome" });
const ctx = await browser.newContext({ viewport: { width, height: width < 768 ? 823 : 900 }, deviceScaleFactor: 1, isMobile: width < 768 });
const page = await ctx.newPage();
await page.addInitScript(() => {
  window.__shifts = [];
  new PerformanceObserver((list) => {
    for (const e of list.getEntries()) {
      window.__shifts.push({
        t: Math.round(e.startTime),
        value: +e.value.toFixed(4),
        sources: (e.sources || []).map((s) => {
          const n = s.node;
          const desc = n ? `${n.tagName?.toLowerCase()}${n.className ? "." + String(n.className).split(" ").slice(0, 3).join(".") : ""}` : "?";
          return `${desc} ${JSON.stringify(s.previousRect).slice(0, 60)} -> ${JSON.stringify(s.currentRect).slice(0, 60)}`;
        }),
      });
    }
  }).observe({ type: "layout-shift", buffered: true });
});
await page.goto(url, { waitUntil: "load" });
await page.waitForTimeout(6000);
const shifts = await page.evaluate(() => window.__shifts);
const total = shifts.reduce((a, s) => a + s.value, 0);
console.log(`CLS total ${total.toFixed(4)} over ${shifts.length} shifts`);
for (const s of shifts) console.log(`  @${s.t}ms ${s.value}\n    ${s.sources.join("\n    ")}`);
await browser.close();
