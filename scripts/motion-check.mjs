// Reduced-motion check (docs/02 §2.6): node scripts/motion-check.mjs <baseUrl> <route> [width]
// Emulates prefers-reduced-motion: reduce, then reports animations, transitions and transforms in use.
import { chromium } from "playwright-core";

const [, , base, route = "/", w = "390"] = process.argv;
const width = Number(w);
const browser = await chromium.launch({ channel: "chrome" });
const ctx = await browser.newContext({ viewport: { width, height: width < 768 ? 844 : 900 }, deviceScaleFactor: 1, isMobile: width < 768, reducedMotion: "reduce" });
await ctx.addInitScript(() => {
  try {
    sessionStorage.setItem("mb-preloaded", "1");
  } catch {}
});
const page = await ctx.newPage();
await page.goto(base + route, { waitUntil: "networkidle" });
await page.evaluate(async () => {
  const h = document.documentElement.scrollHeight;
  for (let y = 0; y < h; y += 600) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 40));
  }
  window.scrollTo(0, 0);
});
await page.waitForTimeout(1200);
const r = await page.evaluate(() => {
  const out = { reduced: matchMedia("(prefers-reduced-motion: reduce)").matches, animations: {}, longTransitions: 0, lenis: !!document.documentElement.classList.contains("lenis"), marqueeStatic: false, hidden: 0 };
  for (const el of document.querySelectorAll("body *")) {
    const cs = getComputedStyle(el);
    if (cs.animationName !== "none") out.animations[cs.animationName] = (out.animations[cs.animationName] || 0) + 1;
    const dur = cs.transitionDuration.split(",").map((s) => parseFloat(s) * (s.includes("ms") ? 1 : 1000));
    if (dur.some((d) => d > 320) && cs.transitionProperty !== "none") out.longTransitions++;
    if (cs.opacity === "0" && el.getClientRects().length && el.closest("[data-reveal], .reveal")) out.hidden++;
  }
  const track = document.querySelector(".marquee__track");
  out.marqueeStatic = !!track && getComputedStyle(track).animationName === "none";
  out.scrollTriggerPins = document.querySelectorAll(".pin-spacer").length;
  return out;
});
console.log(JSON.stringify(r, null, 1));
await page.screenshot({ path: `qa/phase-7/reduced-motion-${route === "/" ? "home" : route.replace(/\//g, "-")}-${w}.png` });
await browser.close();
