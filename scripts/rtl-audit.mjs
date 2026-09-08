// Arabic / RTL audit (docs/03 Phase 6): node scripts/rtl-audit.mjs <baseUrl> <route> [route...]
// Checks per route at 390 and 1440: dir=rtl, no letter-spacing, no uppercase, display faces in Amiri,
// UI in Plex Arabic, no mirrored photographs, mirrored arrows, WhatsApp links carry Arabic text,
// the sticky bar keeps Concierge on the end (left) side.
import { chromium } from "playwright-core";

const [, , base, ...routes] = process.argv;
const browser = await chromium.launch({ channel: "chrome" });
let failures = 0;
for (const route of routes) {
  for (const width of [390, 1440]) {
    const ctx = await browser.newContext({ viewport: { width, height: width < 768 ? 844 : 900 }, deviceScaleFactor: 1, isMobile: width < 768 });
    await ctx.addInitScript(() => {
      try {
        sessionStorage.setItem("mb-preloaded", "1");
      } catch {}
    });
    const page = await ctx.newPage();
    await page.goto(base + route, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(async () => {
      const h = document.documentElement.scrollHeight;
      for (let y = 0; y < h; y += 700) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 30));
      }
      window.scrollTo(0, Math.min(h, 1200));
    });
    await page.waitForTimeout(900);
    const r = await page.evaluate(() => {
      const out = { dir: document.documentElement.dir, lang: document.documentElement.lang, problems: [] };
      const all = Array.from(document.querySelectorAll("body *"));
      const visible = (el) => {
        const cs = getComputedStyle(el);
        return cs.display !== "none" && cs.visibility !== "hidden";
      };
      for (const el of all) {
        if (!visible(el) || !(el.textContent || "").trim()) continue;
        const cs = getComputedStyle(el);
        if (cs.letterSpacing !== "normal" && parseFloat(cs.letterSpacing) !== 0) out.problems.push(`letter-spacing ${cs.letterSpacing} on ${el.tagName}.${el.className}`);
        if (cs.textTransform === "uppercase") out.problems.push(`uppercase on ${el.tagName}.${el.className}`);
      }
      for (const img of document.querySelectorAll("img")) {
        const t = getComputedStyle(img).transform;
        if (t && t !== "none" && /matrix\(-1/.test(t)) out.problems.push(`mirrored image ${img.getAttribute("src")}`);
      }
      const heading = document.querySelector("h1, h2");
      out.headingFont = heading ? getComputedStyle(heading).fontFamily.slice(0, 40) : null;
      out.bodyFont = getComputedStyle(document.body).fontFamily.slice(0, 40);
      const giant = document.querySelector(".giant");
      out.giantFont = giant ? getComputedStyle(giant).fontFamily.slice(0, 30) : null;
      const wa = Array.from(document.querySelectorAll('a[href*="wa.me"]')).map((a) => decodeURIComponent(a.getAttribute("href").split("text=")[1] || ""));
      out.whatsapp = wa.slice(0, 2);
      if (wa.some((t) => !/[؀-ۿ]/.test(t))) out.problems.push("WhatsApp text without Arabic");
      const arrows = Array.from(document.querySelectorAll(".btn__icon")).filter((a) => a.getClientRects().length > 0);
      const unmirrored = arrows.filter((a) => !/matrix\(-1/.test(getComputedStyle(a).transform));
      if (arrows.length && unmirrored.length) out.problems.push(`${unmirrored.length}/${arrows.length} arrows not mirrored`);
      const bar = document.querySelector(".sticky-bar");
      if (bar && getComputedStyle(bar).display !== "none") {
        const e = bar.querySelector(".sticky-bar__enquire")?.getBoundingClientRect();
        const c = bar.querySelector(".sticky-bar__concierge")?.getBoundingClientRect();
        out.stickyOrder = e && c ? (c.left < e.left ? "concierge on the left (end)" : "concierge on the right") : "n/a";
        if (e && c && c.left > e.left) out.problems.push("sticky bar concierge not on the end side");
      }
      out.docWidth = document.documentElement.scrollWidth;
      if (out.docWidth > window.innerWidth) out.problems.push(`horizontal overflow ${out.docWidth} > ${window.innerWidth}`);
      return out;
    });
    const uniq = Array.from(new Set(r.problems));
    if (uniq.length) failures++;
    console.log(`\n${route} @${width}: dir=${r.dir} lang=${r.lang} heading=${r.headingFont} body=${r.bodyFont} giant=${r.giantFont} sticky=${r.stickyOrder ?? "-"}`);
    console.log(`  whatsapp: ${r.whatsapp.join(" | ")}`);
    console.log(uniq.length ? `  PROBLEMS: ${uniq.slice(0, 12).join("\n            ")}` : "  ok");
    await ctx.close();
  }
}
await browser.close();
process.exit(failures ? 2 : 0);
