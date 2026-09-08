// Samples the hero stage geometry over time: node scripts/stage-probe.mjs <url> [width]
import { chromium } from "playwright-core";

const [, , url, w = "412"] = process.argv;
const width = Number(w);
const browser = await chromium.launch({ channel: "chrome" });
const ctx = await browser.newContext({ viewport: { width, height: width < 768 ? 823 : 900 }, deviceScaleFactor: 1, isMobile: width < 768 });
const page = await ctx.newPage();
await page.addInitScript(() => {
  window.__samples = [];
  const t0 = performance.now();
  const tick = () => {
    const q = (s) => document.querySelector(s);
    const h = (el) => (el ? Math.round(el.getBoundingClientRect().height) : null);
    const stage = q(".scene__stage");
    const word = q(".scene__word");
    const car = q(".scene__car--m");
    const wrap = q(".scene__car-wrap");
    window.__samples.push({
      t: Math.round(performance.now() - t0),
      stage: h(stage),
      word: h(word),
      wrap: h(wrap),
      car: h(car),
      carW: car ? Math.round(car.getBoundingClientRect().width) : null,
      loaded: car ? car.complete : null,
      nat: car ? `${car.naturalWidth}x${car.naturalHeight}` : null,
      wordFont: word ? getComputedStyle(word.firstElementChild || word).fontFamily.slice(0, 14) : null,
      entered: !!q("[data-scene][data-entered]"),
      pre: !!q(".preloader"),
    });
    if (performance.now() - t0 < 4000) setTimeout(tick, 150);
  };
  document.addEventListener("DOMContentLoaded", tick);
});
await page.goto(url, { waitUntil: "load" });
await page.waitForTimeout(4200);
const samples = await page.evaluate(() => window.__samples);
let last = "";
for (const s of samples) {
  const key = `${s.stage}|${s.word}|${s.wrap}|${s.car}|${s.loaded}|${s.entered}|${s.pre}|${s.wordFont}`;
  if (key !== last) console.log(JSON.stringify(s));
  last = key;
}
await browser.close();
