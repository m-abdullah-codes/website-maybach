// Exercises the enquiry form: node scripts/form-test.mjs <url> <outDir> [width]
// Captures the validation state after an empty submit and the success state after a valid submit.
import path from "node:path";
import { mkdir } from "node:fs/promises";
import { chromium } from "playwright-core";

const [, , url, outDir, w = "1440"] = process.argv;
const width = Number(w);
const height = width < 768 ? 844 : 900;
await mkdir(outDir, { recursive: true });
const browser = await chromium.launch({ channel: "chrome" });
const ctx = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1, isMobile: width < 768 });
await ctx.addInitScript(() => {
  try {
    sessionStorage.setItem("mb-preloaded", "1");
  } catch {}
});
const page = await ctx.newPage();
const problems = [];
page.on("console", (m) => {
  if (m.type() === "error") problems.push(m.text());
});
await page.goto(url, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
const form = page.locator("form.form").first();
await form.scrollIntoViewIfNeeded();
await page.waitForTimeout(1200);

// Empty submit → inline errors.
await form.locator('input[name="phone"]').fill("");
await form.locator('button[type="submit"]').click();
await page.waitForTimeout(1500);
await form.scrollIntoViewIfNeeded();
await page.screenshot({ path: path.join(outDir, `form-errors-${w}.png`), fullPage: false });
const errors = await form.locator(".field__error").allTextContents();
console.log("errors shown:", errors);

// Valid submit → success state.
await form.locator('input[name="name"]').fill("QA Test");
await form.locator('input[name="phone"]').fill("+966 50 000 0000");
await form.locator('textarea[name="message"]').fill("Automated QA submission.");
await form.locator('button[type="submit"]').click();
await page.waitForSelector(".form-success", { timeout: 10000 });
await page.waitForTimeout(800);
await page.locator(".form-success").scrollIntoViewIfNeeded();
await page.waitForTimeout(400);
await page.screenshot({ path: path.join(outDir, `form-success-${w}.png`), fullPage: false });
console.log("success text:", await page.locator(".form-success").innerText());
console.log(problems.length ? "console errors: " + problems.join(" | ") : "console clean");
await browser.close();
