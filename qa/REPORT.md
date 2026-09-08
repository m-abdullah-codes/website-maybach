# May Bach — build report

Phase 7 hand-off, 8 September 2026. Every figure below was measured on the production build served with `next start` on this machine; Lighthouse 13 in its default mobile profile (Moto G Power emulation, simulated slow 4G, 4× CPU slowdown). Reports are in `qa/lighthouse/phase-7-k-*.json`; the pre-optimisation baseline is in `phase-7-baseline-*.json`.

## Definition of done (AGENTS.md §6)

| Item | Status |
|---|---|
| `npm run build` clean | Yes. 39 static routes (6 pages × 2 locales, 10 cars × 2 locales, styleguide, sitemap, robots, icons), no warnings, ESLint and `tsc` pass inside the build. |
| Lighthouse mobile ≥ 90 / 100 / 100 on Home and Collection | Partly. Accessibility, best practices and SEO are 100 on every page. Performance: Home 84–86, Collection 87–89 (Car detail 93, Showroom 95, Visit 86, Arabic Home 81). See "Performance" below. |
| LCP ≤ 2.5 s on throttled 4G | Not in the simulated profile: Home 3.7–4.2 s, Collection 3.6 s, detail 3.0 s, Showroom 2.7 s. Observed (unthrottled) LCP is 0.4–0.5 s. |
| CLS 0 | Home 0.003 (a 1 px reflow of the hero word when Bodoni replaces its metric-matched fallback), Collection 0, detail 0, Showroom 0, Visit 0.012 (native date field control). |
| Every page at 390 and 1440 matches its sketch | Reviewed per phase against docs/02; `qa/phase-7/*.png` is the final set. Deviations are listed in `qa/LOG.md`. |
| `/ar` passes an RTL review | Yes: `scripts/rtl-audit.mjs` passes on every route (dir, fonts, no letter-spacing, no uppercase, mirrored arrows, unmirrored photographs, Arabic WhatsApp text, Concierge on the end side, no overflow). |
| Forms deliver | The server action validates with zod and sends through Resend when `RESEND_API_KEY` and `CONCIERGE_EMAIL` are set; without them it logs the enquiry and still shows the success state. Tested in both locales on the detail page and on Visit. |
| WhatsApp links open with the right text in both languages | Yes, checked by the RTL audit and in the state captures: viewing, per car ("2024 رولز رويس كولينان"), per service. |
| Sold / Reserved states render | Verified by flipping two cars in a local copy of `cars.json` (`qa/phase-4/state-*.png`), then restored. |
| Reduced-motion path | `scripts/motion-check.mjs`: with `prefers-reduced-motion: reduce` only 200 ms opacity fades run, the marquee is a static row, Lenis and ScrollTrigger pins are off, no parallax. |
| No console errors or warnings | All 28 final captures are console-clean (the 404 route reports its own 404 status only). |

## Performance

| Page (mobile) | Perf | FCP | LCP | TBT | CLS | SI |
|---|---|---|---|---|---|---|
| Home `/` | 84–86 | 1.8 s | 3.7–4.2 s | 80–130 ms | 0.003 | 3.3 s |
| Collection | 87–89 | 1.5 s | 3.6 s | 80–150 ms | 0 | 2.9–3.0 s |
| Car detail (Cullinan) | 93 | 1.5 s | 3.0 s | 80 ms | 0 | 3.1 s |
| Showroom | 95 | 1.5 s | 2.7 s | 90 ms | 0 | 3.0 s |
| Visit | 86 | 1.5 s | 3.8 s | 130 ms | 0.012 | 2.9 s |
| Arabic Home `/ar` | 81 | 2.9 s | 4.1 s | 60 ms | 0.003 | 3.4 s |

Baseline before Phase 7 was Home 72 (LCP 5.1 s, CLS 0.075, TBT 260 ms) and Collection 86.

**What was done:** one `<picture>` per photograph with media-scoped high-priority preloads for the hero so only the matching file loads; the car cut-out as one `<picture>` with CSS aspect ratios per breakpoint; the hero entrance moved to CSS keyframes so it starts at first paint (mid-motion when the curtain lifts, as H0 describes) with the car painted at 55% opacity from the first frame; GSAP and ScrollTrigger load at idle; the image manifest and blur data no longer ship to the client; next-intl's client runtime replaced by a 1 KB locale-aware link; plain reveals server-rendered and driven by one observer instead of forty client components; headline line measurement batched into one reflow at idle; below-fold photographs deferred behind a 600 px observer with `<noscript>` copies; Manrope and Bodoni Italic no longer preloaded; duplicate srcset candidates removed; the Home HTML halved (423 → 217 KB raw, 63 KB gzipped); CLS causes fixed (flex-shrunk cut-out before load, two-line giant word, idle curtain).

**Why the simulated LCP stays above 2.5 s:** the observed trace loads the hero background (14 KB) and car (31 KB) as the first two requests and paints them by 0.5 s; Lighthouse's slow-4G model multiplies the ~260 ms initial render (parse of a 217 KB document, style and layout of ten full-bleed sections) by its 4× CPU factor and adds the download of everything requested before that paint. Three things would move it further, none of them mine to decide alone: (1) the preloader curtain inflates Speed Index and hides the hero for 1.65 s on every first visit; a shorter curtain (≤ 1 s) or none on slow connections would help; (2) pre-generated WebP derivatives for the two hero files decode faster than AVIF on low-end CPUs; (3) the Next 15 client runtime is 103 KB gzipped before any app code, which sets the floor for total JS.

**JS budget (docs/02 §13.2, ≤ 180 KB gzipped on Home):** 199 KB, of which 103 KB is the Next runtime, 38 KB GSAP + ScrollTrigger (loaded at idle), 4 KB Lenis, the rest app code. Without GSAP the page is 161 KB.

**Total transfer on Home (mobile):** 517 KB across 51 requests, images deferred until 600 px from the viewport.

## SEO

Titles per docs/02 §4.5, descriptions, canonical and `hreflang` (en, ar, x-default) on every route, `sitemap.xml` with language alternates, `robots.txt` (styleguide excluded), Open Graph image `public/og.png` (1200 × 630 from BR-04) and per-car OG images from HERO-D, `icon.svg` and `apple-icon.png` from the emblem, JSON-LD `AutoDealer` on every page and `Car` on each detail page (prices omitted).

## What the client must supply before launch

Everything below renders exactly as it is in the content files; nothing was invented.

**`content/site.en.json` / `site.ar.json` → `settings._verify`:** `whatsappNumber` (966XXXXXXXXX), `phone` (+966XXXXXXXXX), `email` (hello@maybach.sa), `mapsUrl`, the four `social` handles ([handle]), `footer.address` ([Street], [District], Riyadh [Postal code]), `footer.hours` (confirm), `home.visitStrip.line` ([District]), `showroom.story[1]` ([Street]), `visit.details.email` ([hello@maybach.sa]).

**`content/cars.json` → `verify` per car:**

| Car | Fields to confirm |
|---|---|
| Rolls-Royce Cullinan | interior, mileage, warranty, story options |
| Bentley Continental GT Azure | year, interior, V8 or W12 specs, mileage, warranty |
| Bentley Flying Spur Mulliner | year, interior, W12 or V8 specs, mileage, warranty |
| Mercedes-Benz S-Class | variant (S 500 or S 580), interior, mileage, warranty, story mileage |
| Range Rover Autobiography | variant (P530 or P400), exterior, interior, mileage, warranty |
| GMC Yukon Denali | year, exterior, interior, mileage, warranty |
| Chevrolet Corvette C8 Stingray | year, exterior name, interior, mileage, warranty, story mileage |
| Lamborghini Urus | year, variant (Urus / S / Performante), exterior, interior, mileage, warranty, accent (#8E9298 if not the gold car) |
| Porsche 911 Carrera | year, variant (Carrera / S / 4S), exterior, interior, mileage, warranty, story mileage |
| Mercedes-AMG G 63 | year, exterior, interior, mileage, warranty, story mileage |

**Assets and copy:** official marque SVGs in `public/logos/` (rolls-royce, bentley, mercedes-benz, range-rover, chevrolet, gmc, lamborghini, porsche; the marquee shows names until then), a map key and the address for the Visit map embed, the interior material and notable feature per car for the D5 caption, Privacy and Terms pages if they are wanted, real photographs (RT-CAR) for the galleries.

**Environment on Vercel:** `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_WHATSAPP`, `RESEND_API_KEY`, `CONCIERGE_EMAIL`, optional `ENQUIRY_FROM` and `NEXT_PUBLIC_GA_ID` (analytics not wired; docs/02 §13.4 is a phase-2 item).

Open questions for the client are in `qa/QUESTIONS.md`; decisions taken where the spec was silent are in `qa/LOG.md`.
