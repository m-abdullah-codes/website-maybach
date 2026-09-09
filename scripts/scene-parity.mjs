// Giant-word / car parity across a hand-over: node scripts/scene-parity.mjs [base] [locale]
//
//   node scripts/scene-parity.mjs                                 → en, 390 and 1440
//   node scripts/scene-parity.mjs http://localhost:3000 /ar       → the Arabic pages
//
// qa/LOG.md records that every Scene's giant-word box was matched to the pixel so the cut-out is
// byte-identical across a hand-over and CLS stays 0. This is what measures it. Two traps it avoids:
// the word only cycles while it is on screen (so it scrolls the *word* into view, not the section),
// and the section's own entrance animation moves the car for ~1.5 s after that (so it waits it out
// before sampling — otherwise the arrival easing is reported as movement).
import { chromium } from "playwright-core";
const base = process.argv[2] || "http://localhost:3000";
const locale = process.argv[3] || "";
const WINDOW = 15000;

const TARGETS = [
  { key: "home hero", route: "/", sel: ".home__hero", word: ".page-hero__word", car: null },
  { key: "featured", route: "/", sel: "#featured", word: ".scene__word", car: ".scene__car" },
  { key: "cul row", route: "/collection", sel: "#row-rolls-royce-cullinan", word: ".scene__word", car: ".scene__car" },
  { key: "fsm row", route: "/collection", sel: "#row-bentley-flying-spur-mulliner", word: ".scene__word", car: ".scene__car" },
  { key: "cgt row", route: "/collection", sel: "#row-bentley-continental-gt-azure", word: ".scene__word", car: ".scene__car" },
];

const browser = await chromium.launch({ channel: "chrome" });
for (const width of [390, 1440]) {
  const height = width < 768 ? 844 : 900;
  const ctx = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1, isMobile: width < 768, hasTouch: width < 768 });
  await ctx.addInitScript(() => { try { sessionStorage.setItem("mb-preloaded", "1"); } catch {} });
  const page = await ctx.newPage();
  let loaded = "";
  for (const t of TARGETS) {
    const url = `${base}${locale}${t.route}`;
    if (url !== loaded) { await page.goto(url, { waitUntil: "networkidle" }); await page.evaluate(() => document.fonts.ready); loaded = url; }
    await page.waitForSelector(t.sel);
    // The word only cycles while it is on screen, so scroll the word itself into view (qa/LOG.md).
    await page.evaluate((s) => { document.querySelector(`${s.sel} ${s.word}`)?.scrollIntoView({ block: "center" }); }, t);
    const res = await page.evaluate(async ({ sel, word, car, WINDOW }) => {
      const sec = document.querySelector(sel);
      const box = (s) => { const e = s && sec.querySelector(s); if (!e) return "none"; const r = e.getBoundingClientRect(); const sr = sec.getBoundingClientRect(); return `${Math.round(r.width)}x${Math.round(r.height)}@${Math.round(r.left - sr.left)},${Math.round(r.top - sr.top)}`; };
      // Let the section's own entrance finish first (scene-car runs 1200 ms from a 300 ms delay);
      // otherwise the probe records the arrival easing and calls it movement.
      await new Promise((r) => setTimeout(r, 2600));
      const words = new Set(), cars = new Set(), texts = new Set(), heights = new Set();
      const t0 = performance.now();
      while (performance.now() - t0 < WINDOW) {
        words.add(box(word)); if (car) cars.add(box(car));
        heights.add(Math.round(sec.getBoundingClientRect().height));
        const vis = [...sec.querySelectorAll(".giant-cycle__layer")].filter((l) => getComputedStyle(l).visibility !== "hidden").map((l) => l.textContent.trim());
        if (vis.length) texts.add(vis.join("+"));
        await new Promise((r) => setTimeout(r, 150));
      }
      return { words: [...words], cars: [...cars], texts: [...texts], heights: [...heights] };
    }, { sel: t.sel, word: t.word, car: t.car, WINDOW });
    const ok = res.words.length === 1 && (t.car === null || res.cars.length === 1) && res.heights.length === 1;
    console.log(`${String(width).padEnd(5)} ${t.key.padEnd(10)} word=${res.words.join(" | ")}  car=${res.cars.join(" | ") || "-"}  sectionH=${res.heights.join("/")}  words seen: ${res.texts.join(" \u2192 ") || "(none)"}  ${ok ? "STABLE" : "*** MOVED ***"}`);
  }
  await ctx.close();
}
await browser.close();
