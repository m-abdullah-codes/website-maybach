// Motion QA: node scripts/moments.mjs <baseUrl> <outDir>
// Captures the moments a still full-page screenshot cannot show — the curtain, the hero entrance
// mid-flight, the pinned promise stack, the filter FLIP, the menu, the lightbox and the hover states —
// so the motion system in docs/02 §2.6 can be judged frame by frame.
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright-core";

const [, , base = "http://localhost:3100", outDir = "qa/design-pass/moments"] = process.argv;
await mkdir(outDir, { recursive: true });
const browser = await chromium.launch({ channel: "chrome" });

async function open({ width = 1440, height = 900, preloaded = true, reduced = false } = {}) {
  const ctx = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 1,
    isMobile: width < 768,
    hasTouch: width < 768,
    reducedMotion: reduced ? "reduce" : "no-preference",
  });
  if (preloaded) await ctx.addInitScript(() => { try { sessionStorage.setItem("mb-preloaded", "1"); } catch {} });
  const page = await ctx.newPage();
  return { ctx, page };
}
const shot = (page, name) => page.screenshot({ path: path.join(outDir, `${name}.png`) }).then(() => console.log(name));

// 1 — the curtain and the hero entrance it hands over to (docs/02 H0, §3.16).
{
  const { ctx, page } = await open({ preloaded: false });
  await page.goto(base + "/", { waitUntil: "commit" });
  for (const t of [420, 900, 1500, 2100, 3000]) {
    await page.waitForTimeout(t - (page.__t || 0));
    page.__t = t;
    await shot(page, `01-arrival-${t}ms`);
  }
  await ctx.close();
}

// 2 — the scroll parallax: the same scene at three depths (background 0.85×, word 0.92× with drift).
{
  const { ctx, page } = await open();
  await page.goto(base + "/", { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(2500);
  for (const y of [0, 260, 520]) {
    await page.evaluate((v) => window.scrollTo(0, v), y);
    await page.waitForTimeout(900);
    await shot(page, `02-hero-parallax-${y}`);
  }
  await ctx.close();
}

// 3 — the pinned promise stack (docs/02 H4: 1.5 viewports, cards sliding into a stack).
{
  const { ctx, page } = await open();
  await page.goto(base + "/", { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(2500);
  const top = await page.evaluate(() => {
    const el = document.querySelector("#promise");
    const sp = el?.closest(".pin-spacer") ?? el;
    return sp ? sp.getBoundingClientRect().top + window.scrollY : 0;
  });
  for (const [i, f] of [0.1, 0.4, 0.7, 0.95].entries()) {
    await page.evaluate((v) => window.scrollTo(0, v), Math.round(top + f * 900 * 1.5));
    await page.waitForTimeout(900);
    await shot(page, `03-promise-pin-${i + 1}`);
  }
  await ctx.close();
}

// 4 — the collection filter: single-select, leaving rows fade, the rest FLIP into place.
{
  const { ctx, page } = await open();
  await page.goto(base + "/collection", { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(2000);
  await page.evaluate(() => window.scrollTo(0, 900));
  await page.waitForTimeout(700);
  await shot(page, "04-filter-all");
  await page.getByRole("button", { name: "Sports", exact: true }).click();
  await page.waitForTimeout(200);
  await shot(page, "04-filter-mid");
  await page.waitForTimeout(1600);
  await shot(page, "04-filter-sports");
  await page.getByRole("button", { name: "SUV", exact: true }).click();
  await page.waitForTimeout(1600);
  await shot(page, "04-filter-suv");
  await ctx.close();
}

// 5 — the full-screen menu and the sticky bar (mobile).
{
  const { ctx, page } = await open({ width: 390, height: 844 });
  await page.goto(base + "/", { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1200);
  await page.locator(".burger").first().click();
  await page.waitForTimeout(300);
  await shot(page, "05-menu-opening");
  await page.waitForTimeout(900);
  await shot(page, "05-menu-open");
  await ctx.close();
}

// 6 — the gallery lightbox (docs/02 D4).
{
  const { ctx, page } = await open();
  await page.goto(base + "/collection/rolls-royce-cullinan", { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1500);
  await page.locator(".gallery__tile").first().scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await page.locator(".gallery__tile").first().click();
  await page.waitForTimeout(900);
  await shot(page, "06-lightbox");
  await ctx.close();
}

// 7 — hover states: primary button, car card, glass card, marque tile (docs/02 §2.6).
{
  const { ctx, page } = await open();
  await page.goto(base + "/", { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(2000);
  await page.locator(".btn--primary").first().hover();
  await page.waitForTimeout(500);
  await shot(page, "07-hover-primary");
  const card = page.locator(".ccard").first();
  await card.scrollIntoViewIfNeeded();
  await page.waitForTimeout(700);
  await card.hover();
  await page.waitForTimeout(900);
  await shot(page, "07-hover-card");
  await ctx.close();
}

// 8 — reduced motion: reveals become opacity, the marquee stops, nothing is left hidden.
{
  const { ctx, page } = await open({ reduced: true });
  await page.goto(base + "/", { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1200);
  await shot(page, "08-reduced-hero");
  await page.evaluate(() => window.scrollTo(0, 4800));
  await page.waitForTimeout(900);
  await shot(page, "08-reduced-promise");
  await ctx.close();
}


// 9 — the desktop cursor (docs/02 §3.17): the dot, and the glass View circle over a collection row.
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  await ctx.addInitScript(() => { try { sessionStorage.setItem("mb-preloaded", "1"); } catch {} });
  const page = await ctx.newPage();
  await page.goto(base + "/collection", { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => window.scrollTo(0, 1750));
  await page.waitForTimeout(1200);
  await page.mouse.move(400, 500);
  await page.mouse.move(500, 520);
  await page.waitForTimeout(700);
  await page.screenshot({ path: path.join(outDir, "09-cursor-view.png") });
  console.log("09-cursor-view");
  await ctx.close();
}

await browser.close();
