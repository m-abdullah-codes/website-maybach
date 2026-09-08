// Frames of a pinned, scrubbed section, so a scroll-driven composition can be reviewed as stills:
//   node scripts/pin-frames.mjs <url> <w> <h> <selector> <outPrefix> [fractions]
// e.g. node scripts/pin-frames.mjs http://localhost:3000/ 390 844 "#promise" qa/x/pin "0,0.3,0.6,0.95"
// Fractions are positions along the pin's scroll span; PIN_SPAN (default 1.7) is that span in
// viewports and must match the trigger's `end` (PromiseStack: 1.7 mobile, 1.5 desktop).
import { chromium } from "playwright-core";
const [, , url, W, H, selector, prefix, fracArg] = process.argv;
const w = Number(W), h = Number(H);
const fracs = (fracArg || "0,0.35,0.7,1").split(",").map(Number);
const browser = await chromium.launch({ channel: "chrome" });
const ctx = await browser.newContext({ viewport: { width: w, height: h }, isMobile: w < 768, hasTouch: w < 768, deviceScaleFactor: 1 });
await ctx.addInitScript(() => { try { sessionStorage.setItem("mb-preloaded", "1"); } catch {} });
const page = await ctx.newPage();
const problems = [];
page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") problems.push(m.text()); });
page.on("pageerror", (e) => problems.push(`pageerror: ${e.message}`));
await page.goto(url, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
// Walk the page so every ScrollTrigger initialises, then come back.
await page.evaluate(async () => {
  for (let y = 0; y < document.body.scrollHeight; y += 400) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 16)); }
  window.scrollTo(0, 0);
  await new Promise((r) => setTimeout(r, 300));
});
const top = await page.evaluate((s) => document.querySelector(s).getBoundingClientRect().top + window.scrollY, selector);
const span = Number(process.env.PIN_SPAN || 1.7) * h;
for (const f of fracs) {
  const y = Math.round(top + f * span);
  await page.evaluate(async (yy) => { window.scrollTo(0, yy); await new Promise((r) => setTimeout(r, 900)); }, y);
  const path = `${prefix}-${String(Math.round(f * 100)).padStart(3, "0")}.png`;
  await page.screenshot({ path });
  console.log(path);
}
if (problems.length) console.log("CONSOLE:", [...new Set(problems)].slice(0, 8).join(" | "));
await browser.close();
