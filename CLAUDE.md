# AGENTS.md — May Bach (ماي باخ) · maybach.sa

You are building the website of **May Bach**, a luxury multi-marque car showroom in Riyadh. The design is finished; the copy is finished; every photograph is generated and sitting in `public/images`. Your job is to build it **exactly** as specified, to a standard that justifies a five-figure invoice. Read this file fully before touching anything.

## 1. Read these first, in this order

1. `docs/02-site-blueprint-design-system.md` — the concept, design tokens, components, every page and section with sketches, and the motion system. **This is the spec.** When in doubt, this document wins.
2. `docs/03-build-brief.md` — the build plan: stack, folder structure, phases, component contracts, image pipeline, acceptance criteria.
3. `content/cars.json`, `content/site.en.json`, `content/site.ar.json` — **all copy, verbatim**. Never write copy of your own. Never edit these files except to fix a typo you can prove against `docs/02`.
4. `content/image-manifest.json` — every image with real pixel sizes and its use.
5. `docs/01-imagery-prompts.md` — only if you need to understand what an image is meant to be (each image has an ID; the file is `/images/mb-<id-lowercase>.png`).

## 2. The theme, in one breath

A private gallery that happens to be open at night. Black, monochrome interface; the photographs carry all the colour, one temperature per room, alternating warm / cool / neutral / pale down the page. A high-contrast serif that whispers, a grotesque that works, Arabic that is never letter-spaced. Frosted glass floating on macro photography. A giant word behind a car — in five places only. One car per row, never a product grid. Motion that is slow and physical. Copy that says one true thing and stops. Mobile first.

## 3. Non-negotiables

- **No colour in the interface.** Tokens are obsidian → graphite → silver → platinum. There is no gold, no champagne, no brand blue, no accent token. The only exception is `--scene-accent`, a per-car muted tone used in exactly two places inside that car's own sections (the caption dot and the View-link underline). Primary buttons are platinum with obsidian text.
- **A photograph in every section.** Use the `-m` image under 768 px and the `-d` image above; never crop a desktop image for mobile. Legibility comes from the specified gradient overlays, never from darkening the whole photo.
- **The Scene** (background → giant word → transparent car cut-out, built in code) appears in **exactly five places**: Home hero, Home featured, and the Collection rows for Cullinan, Flying Spur and Continental GT. Everywhere else cars are **Photograph rows** or **Car cards** (pairs on desktop, single on mobile). Page-hero words (COLLECTION, RIYADH, BEYOND, MAJLIS) sit over a photo at reduced opacity, not behind a cut-out.
- **The Flying Spur row is the one light room** (`scene: "light"`): pale `--salon` background, ink type, black serif word. Everything else is dark.
- **Glass** uses the exact recipes in `docs/02 → §2.4` (frosted card and liquid badge). Glass only ever sits on photography; the fallback without `backdrop-filter` is specified.
- **Type:** Bodoni Moda (display) + Manrope (UI) for English; Amiri (display) + IBM Plex Sans Arabic (UI) for Arabic, via `next/font`. Scale in `docs/02 → §2.2`. Arabic: `letter-spacing: 0`, no uppercase, line-height 1.8 body.
- **Motion:** Lenis smooth scroll + GSAP/ScrollTrigger. Durations 320 / 800 / 1200 ms, easing `cubic-bezier(.16,1,.3,1)`. Nothing bounces. Everything respects `prefers-reduced-motion` (parallax and marquee off, reveals become 200 ms opacity).
- **Copy is verbatim** from `content/`. No lorem ipsum, no placeholder text you invented, no exclamation marks, no emojis. Bracketed placeholders like `[Street]` render as-is until the client supplies them.
- **Mobile first.** Design and verify at 390 px before 1440 px. Sticky bottom bar (Enquire + Concierge) on every page after the hero. Touch targets ≥ 44 px.
- **RTL is real.** `/ar` mirrors layout with `dir="rtl"` and CSS logical properties. Photographs are never mirrored; arrows and layout are.
- **Do not touch** `public/images/*.png` (masters), `docs/*`, or `content/*` except as allowed above. Add optimised derivatives in a separate folder if you generate any.
- **No placeholder assets:** no stock photos, no AI-drawn logos for marques (official SVGs only, white at 70%), no icon sets other than Lucide (thin, 1.25 px stroke).

## 4. Stack (decided — do not relitigate)

Next.js 15 App Router with **`output: "export"`** · TypeScript strict · Tailwind v4 with the tokens as
CSS variables · `next-intl` for the locale segment (`en` default without prefix, `/ar`) · `next/image`
with a **custom loader over build-time derivatives** · GSAP + ScrollTrigger · Lenis · Lucide icons ·
WhatsApp deep links (`NEXT_PUBLIC_WHATSAPP`). Content is read from `/content/*.json` through one module
(`src/lib/content.ts`) so a CMS can replace it later without touching components.

**The site is static.** Every page is a file in `out/`, served by Cloudflare's asset store; no server
renders anything per request. Three consequences that are easy to trip over:

- **No middleware, no server actions, no route handlers.** English is at the root because
  `scripts/flatten-export.mjs` lifts the built `/en` tree there and `public/_redirects` catches
  `/en/...`. Anything that needs a request lives in `src/worker/index.ts`.
- **Photographs are encoded at build time.** `scripts/derive-images.mjs` writes
  `public/img/<stem>-<width>.webp` and `.avif` from the masters; `src/lib/image-loader.ts` picks a
  rung; the hand-built `<picture>` elements offer the AVIF first. The PNG masters are never deployed.
  A new photograph means `npm run images` before the build (`npm run build` does it for you).
- **One endpoint.** The enquiry form POSTs to `/api/enquiry`, handled by `src/worker/index.ts` →
  Resend REST. Secrets are Cloudflare secrets (`RESEND_API_KEY`, `CONCIERGE_EMAIL`), not `.env`.

Deploy with `npm run deploy` (derive → build → flatten → `wrangler deploy`).

## 5. How to work

- Work in the phases of `docs/03-build-brief.md`, in order. Finish a phase — build passes, no console errors, screenshots taken — before starting the next.
- After every phase, save screenshots at **390×844** and **1440×900** for each page you touched into `qa/<phase>/`, and write two lines in `qa/LOG.md`: what was built, what is left.
- Compare every section to its sketch and copy table in `docs/02` before calling it done. If the spec and your instinct disagree, follow the spec and note the disagreement in `qa/LOG.md`.
- Never ship something that "works but looks generic". If a section could belong to any car dealer template, it is wrong. Re-read `docs/02 → §0` and §1.5.
- Ask (in `qa/QUESTIONS.md`) only when the spec is silent and the choice is irreversible. Otherwise decide, follow the spec's spirit, and move on.
- Commit after each phase with a message starting with the phase name.

## 6. Definition of done

`npm run build` clean · Lighthouse mobile ≥ 90 / 100 / 100 on Home and Collection · LCP ≤ 2.5 s on throttled 4G · CLS 0 · every page at 390 and 1440 matches its sketch · `/ar` passes an RTL review · forms deliver · WhatsApp links open with the right pre-filled text in both languages · Sold/Reserved states render · reduced-motion path works · no console errors or warnings.
