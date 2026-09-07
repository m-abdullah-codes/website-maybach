# MAY BACH — Build Brief for the Development Agent

**Document:** 03 of 03 · The build plan. `docs/02` is the design spec and wins on every visual question; this document says how to build it, in what order, and what "done" means.
**Inputs you already have:** `docs/02-site-blueprint-design-system.md` (spec) · `content/cars.json` · `content/site.en.json` · `content/site.ar.json` · `content/image-manifest.json` · 151 photographs in `public/images/`.

---

## 0. Scope

Six pages in two languages, static-first, deployable to Vercel:

```
/                      Home                (10 sections)
/collection            The Collection      (hero + 8 rows + not-here)
/collection/[slug]     Car detail          (8 sections, 10 cars)
/showroom              The Showroom        (7 sections)
/services              Services            (hero + 6 + CTA)
/visit                 Visit / the Majlis  (4 sections)
/not-found             404
/ar/…                  Arabic mirror of everything, RTL
```

No CMS in this phase. Content is JSON in `/content`, read through one module. Forms send email via Resend and fall back to a WhatsApp deep link. No prices anywhere. No user accounts.

---

## 1. Setup

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
npm i next-intl gsap lenis lucide-react resend zod sharp
npm i -D @types/node
```

- Node ≥ 20. Windows paths: the repo lives at `G:\works\websites\Contour Systems\maybach\` — the space in the path is fine for Next, but always quote paths in scripts.
- `next.config.ts`: `images.formats = ['image/avif','image/webp']`, `images.deviceSizes = [390, 640, 768, 1024, 1280, 1440, 1680]`, `images.minimumCacheTTL = 31536000`. Keep `reactStrictMode` on.
- Tailwind v4: tokens live in `src/app/globals.css` under `@theme` (see §3). No arbitrary colour values in class names anywhere in the codebase — if you need a colour, it is a token or it does not exist.
- ESLint + `tsc --noEmit` must pass before every commit.

---

## 2. Folder structure

```
content/                       ← copy + data (read-only for you)
  cars.json  site.en.json  site.ar.json  image-manifest.json
public/images/                 ← 151 PNG masters (read-only)
public/logos/                  ← official marque SVGs you add (white, 70% opacity applied in CSS)
public/brand/                  ← wordmark.svg, emblem.svg traced from mb-br-01 / mb-br-02; favicon set
qa/                            ← your screenshots + LOG.md + QUESTIONS.md
scripts/
  blur-placeholders.mjs        ← generates src/lib/blur.json (tiny base64 per image)
src/
  app/
    [locale]/
      layout.tsx               ← html lang/dir, fonts, Lenis provider, Preloader, Nav, Footer, StickyBar, Grain
      page.tsx                 ← Home
      collection/page.tsx
      collection/[slug]/page.tsx
      showroom/page.tsx
      services/page.tsx
      visit/page.tsx
      not-found.tsx
    globals.css
    sitemap.ts  robots.ts  opengraph-image.tsx (or static /public/og.png from mb-br-04)
  components/
    layout/    Nav.tsx MobileMenu.tsx Footer.tsx StickyBar.tsx Preloader.tsx PageTransition.tsx Grain.tsx SmoothScroll.tsx
    ui/        Button.tsx Eyebrow.tsx GlassCard.tsx LiquidBadge.tsx SpecChip.tsx FilterChips.tsx MediaBg.tsx GiantWord.tsx Section.tsx Reveal.tsx
    cars/      Scene.tsx PhotographRow.tsx CarCard.tsx CardPair.tsx CollectionRows.tsx SpecStrip.tsx Gallery.tsx Lightbox.tsx
    sections/  home/*.tsx showroom/*.tsx services/*.tsx visit/*.tsx car/*.tsx
    forms/     EnquiryForm.tsx (client) + actions.ts (server action)
  lib/
    content.ts   ← getSite(locale), getCars(), getCar(slug), getRows(), getHomePreview()
    images.ts    ← img(id) → { src, width, height, blurDataURL } from the manifest + blur.json
    motion.ts    ← gsap registration, easings, durations, reducedMotion()
    i18n.ts      ← next-intl config, locales ['en','ar'], localePrefix 'as-needed'
    whatsapp.ts  ← buildWhatsAppUrl(locale, { car?, service? })
    seo.ts       ← metadata helpers + JSON-LD builders (AutoDealer, Car)
  middleware.ts  ← next-intl
```

---

## 3. Tokens → code

Put this in `globals.css` (Tailwind v4). Values come from `docs/02 → §2`; do not change them.

```css
@import "tailwindcss";

@theme {
  --color-obsidian: #070708;
  --color-carbon:   #0E0E10;
  --color-graphite: #16161A;
  --color-smoke:    #222226;
  --color-ash:      #3A3A40;
  --color-platinum: #ECEAE4;
  --color-silver:   #B9B6AE;
  --color-pewter:   #7E7B73;
  --color-ok:       #8FA895;
  --color-muted:    #A77E7E;
  --color-salon:    #D8D5CF;
  --color-salon-2:  #C9C6BF;
  --color-ink:      #0E0E10;
  --color-ink-2:    #55545A;

  --font-display: var(--font-bodoni), "Bodoni Moda", Georgia, serif;
  --font-sans:    var(--font-manrope), "Manrope", system-ui, sans-serif;
  --font-display-ar: var(--font-amiri), "Amiri", serif;
  --font-sans-ar:    var(--font-plex-ar), "IBM Plex Sans Arabic", system-ui, sans-serif;

  --ease-out:   cubic-bezier(.16, 1, .3, 1);
  --ease-inout: cubic-bezier(.65, 0, .35, 1);
  --d-fast: 320ms;  --d-base: 800ms;  --d-slow: 1200ms;

  --radius-chip: 8px; --radius-card: 20px; --radius-panel: 28px; --radius-img: 12px;
  --container: 1440px;
}

:root { --scene-accent: var(--color-platinum); color-scheme: dark; }
html { background: var(--color-obsidian); color: var(--color-platinum); }
[dir="rtl"] { --font-display: var(--font-display-ar); --font-sans: var(--font-sans-ar); }
[dir="rtl"] * { letter-spacing: 0 !important; text-transform: none !important; }

.scene--light { background: var(--color-salon); color: var(--color-ink); --scene-accent: var(--color-ink); }

/* glass — verbatim from docs/02 §2.4 */
.glass { background: linear-gradient(135deg, rgba(255,255,255,.085), rgba(255,255,255,.03));
  -webkit-backdrop-filter: blur(24px) saturate(140%); backdrop-filter: blur(24px) saturate(140%);
  border: 1px solid rgba(255,255,255,.14); border-radius: var(--radius-card); position: relative;
  box-shadow: inset 0 1px 0 rgba(255,255,255,.18), inset 0 -1px 0 rgba(0,0,0,.25), 0 30px 60px -20px rgba(0,0,0,.6); }
.glass::before { content:""; position:absolute; inset:0; border-radius:inherit; pointer-events:none;
  background: radial-gradient(120% 80% at 0% 0%, rgba(255,255,255,.08), transparent 60%); }
.scene--light .glass { background: rgba(255,255,255,.42); border-color: rgba(0,0,0,.08);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.7), 0 30px 60px -24px rgba(0,0,0,.25); }
@supports not (backdrop-filter: blur(1px)) { .glass { background: rgba(14,14,16,.82); } }

.liquid { background: rgba(255,255,255,.10);
  -webkit-backdrop-filter: blur(18px) saturate(160%) brightness(1.1); backdrop-filter: blur(18px) saturate(160%) brightness(1.1);
  border: 1px solid rgba(255,255,255,.22); border-radius: 999px; padding: 8px 14px 8px 10px;
  box-shadow: inset 0 1px 1px rgba(255,255,255,.35), inset 0 -2px 6px rgba(0,0,0,.15), 0 8px 24px -8px rgba(0,0,0,.5);
  font: 500 12px/1 var(--font-sans); letter-spacing: .06em; color: var(--color-platinum); }

/* giant word */
.giant { font-family: var(--font-display); font-weight: 400; line-height: .85; letter-spacing: -.02em; text-transform: uppercase;
  font-size: clamp(72px, 22vw, 112px); pointer-events: none; user-select: none;
  background: linear-gradient(180deg, rgba(236,234,228,.92) 0%, rgba(236,234,228,.55) 55%, rgba(236,234,228,0) 100%);
  -webkit-background-clip: text; background-clip: text; color: transparent; }
@media (min-width: 768px) { .giant { font-size: clamp(120px, 15vw, 300px); } }
.scene--light .giant { background: linear-gradient(180deg, rgba(14,14,16,.88) 0%, rgba(14,14,16,.60) 55%, rgba(14,14,16,0) 100%); -webkit-background-clip: text; background-clip: text; }

/* legibility overlays + section fade */
.overlay-x { background: linear-gradient(90deg, rgba(7,7,8,.85) 0%, rgba(7,7,8,.35) 40%, rgba(7,7,8,0) 70%); }
[dir="rtl"] .overlay-x { background: linear-gradient(270deg, rgba(7,7,8,.85) 0%, rgba(7,7,8,.35) 40%, rgba(7,7,8,0) 70%); }
.overlay-y { background: linear-gradient(180deg, rgba(7,7,8,0) 30%, rgba(7,7,8,.85) 100%); }
.fade-bottom::after { content:""; position:absolute; inset:auto 0 0 0; height:120px; pointer-events:none;
  background: linear-gradient(180deg, transparent, var(--color-obsidian)); }
.scene--light.fade-bottom::after { background: linear-gradient(180deg, transparent, var(--color-salon)); }

/* car cut-out shadow (never baked into the image) */
.car-cut { filter: drop-shadow(0 20px 25px rgba(0,0,0,.65)) drop-shadow(0 2px 6px rgba(0,0,0,.4)); }
@media (min-width: 768px) { .car-cut { filter: drop-shadow(0 40px 50px rgba(0,0,0,.65)) drop-shadow(0 4px 12px rgba(0,0,0,.4)); } }
.scene--light .car-cut { filter: drop-shadow(0 30px 40px rgba(0,0,0,.28)) drop-shadow(0 4px 10px rgba(0,0,0,.18)); }

:focus-visible { outline: 2px solid var(--color-platinum); outline-offset: 4px; }
.scene--light :focus-visible { outline-color: var(--color-ink); }
```

Fonts (`src/app/[locale]/layout.tsx`): `Bodoni_Moda` (weights 400, 300 italic for the statement), `Manrope` (400, 500), `Amiri` (400), `IBM_Plex_Sans_Arabic` (400, 500) from `next/font/google`, each with a CSS variable matching the names above, `display: 'swap'`. Load Arabic faces only when `locale === 'ar'`.

Type scale: implement the table in `docs/02 → §2.2` as utility classes (`.t-display-xl`, `.t-display-l`, `.t-display-m`, `.t-statement`, `.t-eyebrow`, `.t-body-l`, `.t-body-m`, `.t-small`, `.t-spec`, `.t-card-title`, `.t-button`) with `clamp()` between the mobile and desktop values. Eyebrow: 12 px, Manrope 500, `letter-spacing .24em`, uppercase, `--color-silver`, preceded by the emblem (10 px) and a 24 px hairline.

---

## 4. Images

### 4.1 The manifest is the source of truth
`content/image-manifest.json` lists every file with real width/height. Build `src/lib/images.ts`:

```ts
import manifest from '../../content/image-manifest.json';
import blur from './blur.json';           // generated by scripts/blur-placeholders.mjs
export function img(id: string) {        // id like 'CUL-BG-D' or 'mb-cul-bg-d'
  const key = id.toLowerCase().replace(/^mb-/, '');
  const e = manifest.images.find(i => i.file === `/images/mb-${key}.png`);
  if (!e) throw new Error(`Unknown image ${id}`);
  return { src: e.file, width: e.width, height: e.height, alpha: e.alpha, blurDataURL: (blur as any)[e.file] };
}
```

`scripts/blur-placeholders.mjs`: for every PNG, use sharp to produce a 16-px-wide WebP, base64 it, write `src/lib/blur.json`. For RGBA cut-outs, produce the placeholder on a transparent background. Run once; commit the JSON.

### 4.2 Responsive rule
Two masters per photographic section: `-d` (1672×941, landscape) and `-m` (941×1672, portrait). Component `MediaBg` renders:

```tsx
<picture>
  <source media="(max-width: 767px)" srcSet={…m…} />
  <Image src={d.src} … fill sizes="100vw" priority={priority} placeholder="blur" blurDataURL={d.blurDataURL} alt="" role="presentation" />
</picture>
```

Simplest robust implementation: render **two** `next/image` elements, one with `md:hidden` and one with `hidden md:block`, both `fill` + `object-cover`, with `sizes="100vw"`. Only the visible one loads (the hidden one has `display:none` and `loading="lazy"`; mark only the visible hero as `priority`). Never let a `-d` image show under 768 px.

Desktop masters are 1672 px wide. Set `sizes` honestly (`100vw` for full-bleed, `(min-width:1024px) 50vw, 100vw` for half-width tiles, `(min-width:1024px) 45vw, 100vw` for cards) so Next never requests a width above the source.

### 4.3 Cut-outs
`-cut-a` / `-cut-b` are RGBA with alpha 253–254 on the car (effectively opaque). Render with `next/image` (`width`/`height` from the manifest, `sizes` per composition, WebP/AVIF keep alpha), class `.car-cut` for the shadow. Never add a background. Optional floor reflection on desktop: a second copy, `scaleY(-1)`, `opacity .18`, masked with a vertical gradient over 40% of its height, `blur(2px)`.

### 4.4 Which image where
`docs/02 → §15` and `content/image-manifest.json` (`use` field) map every image to its section. Car images come from `cars.json → images`. Cards use `images.card` where present, else `heroM` cropped to 4:5 with `object-position: 50% 60%`.

### 4.5 Brand assets
Trace `mb-br-01.png` and `mb-br-02.png` to clean SVGs (`public/brand/wordmark.svg`, `emblem.svg`) — the emblem is two interlocked rhombus outlines, the right one containing a smaller rhombus, single stroke. Use the SVG emblem for the preloader stroke animation (`stroke-dasharray` / `dashoffset`), favicons (`/icon.svg`, `apple-icon.png`), bullets and the 3% watermark. Until traced, use the PNGs; do not ship without SVGs.

---

## 5. Component contracts

All components are server components unless they need scroll, pointer or state. Keep animation in small client wrappers (`Reveal`, `Scene`, `Marquee`, `Preloader`, `PageTransition`, `SmoothScroll`).

| Component | Props (essentials) | Behaviour |
|---|---|---|
| `Section` | `id, className, fade?, light?` | `position:relative; overflow:hidden`; adds `.fade-bottom`; applies `.scene--light` when `light` |
| `MediaBg` | `desktopId, mobileId, priority?, overlay?: 'x' \| 'y' \| 'none'` | §4.2; overlay element on top of the photo; `aria-hidden` |
| `GiantWord` | `text, align, light?` | `.giant`, `aria-hidden`, reserves its box with `min-height` to keep CLS 0; max 9 characters per line on mobile — break `MAY BACH` to two lines under 768 px |
| `Scene` | `bg: {d,m}, cut: {a,b}, word: {en,ar}, side: 'start'\|'end'\|'center', light?, children (copy), card? (ReactNode)` | The five-place signature. Layers per `docs/02 → §3.9`. Word baseline at 58% of car height (position the word absolutely relative to the car box). Entrance: bg `scale 1.06→1` 1600 ms; word mask-reveal 1200 ms; car `opacity 0→1, y 40→0` 1200 ms delay 200; card last. Scroll: bg `0.85×`, word `0.92×` + `±40px` x-drift, car `1×`, word opacity 1→.35 as the section leaves. Pointer parallax desktop only (`±10px` car, `±6px` word, lerp .05). Fallback to `hero` image when the cut-out errors |
| `PhotographRow` | `car, side: 'start'\|'end', height?: '92vh'\|'60vh'` | `docs/02 → §3.10`. `MediaBg(heroD, heroM)`, overlay `x` desktop / `y` mobile, liquid badge top-start, env caption top-end with a 4 px `--scene-accent` dot, marque eyebrow, model (Display M), whisper (Body L silver), three `SpecChip`s (engine · power · 0–100), actions View (text link) + Enquire (glass button). Whole row is a link; buttons `stopPropagation`. Photo pans 40 px on scroll |
| `CarCard` | `car` | `docs/02 → §3.11`. 4:5, radius 24, hairline border, `images.card`, liquid badge top-start, bottom `.glass` strip: eyebrow (marque · year), card title, whisper, `↗`. Hover: image `scale 1.03` 1200 ms, strip lifts 4 px. Whole card is the link |
| `CardPair` | `cars: [a, b]` | Inside the container; two columns on ≥ 1024, stacked below; a single leftover card is full width |
| `CollectionRows` | `rows` from `cars.json → collectionRows`, `filter` | Renders each row by treatment; on filter change animates rows out (`opacity, scale .98`) and FLIPs the rest; enforces the rhythm rule only when unfiltered |
| `GlassCard` | `icon?, title, body, tilt?` | `.glass`, padding 32/24, width 420 desktop, full-width mobile; optional pointer tilt ≤ 4° (desktop) |
| `LiquidBadge` | `state: 'available'\|'reserved'\|'sold'` or `label` | `.liquid` + 6 px dot (`ok` / `pewter` / `muted`) |
| `SpecChip` | `label, value` | Small pewter label tracked .12em; Spec value platinum tabular; hairline bottom |
| `SpecStrip` | `car` | Eight chips in one `.glass` strip overlapping the hero by 48 px; horizontal scroll-snap under 768 px |
| `Eyebrow` | `children` | emblem 10 px + 24 px hairline + label |
| `Button` | `variant: 'primary'\|'secondary'\|'glass'\|'text'\|'whatsapp', href?, icon?` | Per `docs/02 → §3.2`. Primary = platinum fill / obsidian text (ink fill / platinum text in `.scene--light`); pill 999, 52/48 px tall; `↗` translates 4 px on hover; pressed `scale(.98)` |
| `FilterChips` | `options, value, onChange` | Pills 40 px, glass at rest, platinum fill when active; horizontal scroll with end fade on mobile; sticky under the nav after the Collection hero |
| `Nav` | — | Transparent over the hero → floating glass pill after 80 px (`.glass`, 999, 56 px, max 1120, `--carbon` 82% behind blur). Links, language toggle, primary pill. Mobile: wordmark + two-hairline `☰` → full-screen obsidian overlay with `mb-br-03-m` texture, Display L links with 80 ms stagger, toggle + WhatsApp at the bottom |
| `StickyBar` | `car?` | After the hero on every page; 64 px, glass on `--carbon` 90%, hairline top, safe-area padding; Enquire (primary, 60%) + Concierge (WhatsApp, 40%); pre-fills the car on detail pages; hidden while the menu is open |
| `Footer` | — | `docs/02 → §3.15`; texture `mb-br-03-d` at 40% bottom-aligned; platinum hairline at 20% on top |
| `Preloader` | — | Obsidian; `mb-ut-glow-01` faint centre; emblem SVG draws (700 ms); wordmark fades (400 ms); curtain lifts (800 ms); ≤ 1.6 s; `sessionStorage` so it shows once per session |
| `PageTransition` | — | Obsidian curtain wipes up (800 ms `--ease-inout`), emblem draws (600 ms), curtain lifts; ≤ 1.4 s total; skipped under reduced motion |
| `Grain` | — | Fixed full-screen SVG `feTurbulence` at 5% opacity, `mix-blend-mode: overlay`, `pointer-events:none` |
| `Marquee` | `items` | Eight marque tiles 120/96 px, continuous 40 s loop, pauses on hover, centre tile scale 1.15; reduced motion → static row |
| `Reveal` | `children, delay?, stagger?, lines?` | Intersection-based: `opacity 0→1, y 24→0` 800 ms `--ease-out`; `lines` mode masks headline lines (`clip-path: inset(0 0 100% 0) → inset(0)`) 1200 ms |
| `Gallery` / `Lightbox` | `images` | Desktop 3-col masonry with one 2-col tile; mobile horizontal scroll-snap 86vw tiles with hairline progress; tap → obsidian full-screen swipe lightbox |
| `EnquiryForm` | `car?, compact?` | Fields per `site.form`; `+966` prefilled; native datetime; zod validation; server action → Resend; success replaces form with `mb-ct-door-01` + success line; errors inline in `--color-muted` |

---

## 6. Motion implementation

- `SmoothScroll` (client, in layout): Lenis `{ lerp: .08, smoothWheel: true }`, synced with `gsap.ticker`; disabled when `prefers-reduced-motion`.
- `lib/motion.ts`: `gsap.registerPlugin(ScrollTrigger)`, exports `EASE_OUT`, `EASE_INOUT`, `D`, `reducedMotion()`. Every animation lives in a `useGSAP`/`gsap.context` scoped to the component and is killed on unmount.
- Recipes:
  - **Scene** — as in the table above; ScrollTrigger `scrub: true` for the parallax layers; entrance runs once on mount / first intersection.
  - **Home H4 promise cards (desktop)** — pin the section for 1.5 viewports; the three cards slide up one after another into a stack while the photo pans 60 px. Mobile: simple staggered `Reveal`.
  - **Showroom S3 numbers** — count up over 1200 ms on intersection; 4447 does not animate.
  - **Home H6** — background `scale 1.08→1` scrubbed over the section's scroll.
  - **Statement** — words reveal with 120 ms stagger; background `0.9×`.
  - **Collection filter** — FLIP with `gsap.utils`/`Flip` plugin (or manual measure → invert → play).
- Reduced motion: parallax, marquee, pin, pointer-tilt and page transition are off; `Reveal` becomes 200 ms opacity; Preloader shows the static lock-up for 400 ms.
- Only animate `transform` and `opacity`. `backdrop-filter` elements outside the viewport get `content-visibility: auto`.

---

## 7. i18n and RTL

- `next-intl` with `locales: ['en','ar']`, `defaultLocale: 'en'`, `localePrefix: 'as-needed'` → `/` and `/ar`.
- `content.ts` picks `site.<locale>.json`; car strings are `{en, ar}` objects — select by locale in `content.ts`, never in components.
- `<html lang dir>` set in the locale layout. Use logical CSS properties everywhere (`ps-`, `pe-`, `ms-`, `start-`, `end-`, `text-start`). Never `left/right` classes.
- RTL: photographs not mirrored; arrows mirrored (`rtl:-scale-x-100` on the `↗` glyph); `Scene` swaps sides automatically (the car box uses `inset-inline-end`); `.overlay-x` flips; sticky bar keeps WhatsApp on the end side.
- Numbers stay Western digits in Arabic (`font-variant-numeric: tabular-nums`; do not use Arabic-Indic numerals).
- Arabic headline line-height 1.15, body 1.8; never letter-spaced, never uppercase (enforced in CSS above).
- The language toggle links to the same route in the other locale.

---

## 8. Pages → sections → components

Follow `docs/02` sections exactly (sketch, copy table, image IDs). Mapping:

**Home `/`** — H1 `Scene(hm-hero-bg, cul-cut, "MAY BACH", side end, card: now-showing)` · H2 `Statement(hm-statement-bg)` · H3 header + `PhotographRow(RRA, start)` + `CardPair(SCL, YUK)` + `PhotographRow(C8, end)` + link · H4 `Promise(hm-why-bg, 3 GlassCards, pinned stack on desktop)` · H5 `Marquee` on `--carbon` with 3% emblem watermark · H6 `AfterDark(sh-05)` · H7 `Scene(cgt-bg, cgt-cut-b, "AZURE", side center)` · H8 `Viewing(hm-view)` centred copy, two buttons · H9 `VisitStrip(hm-map)` glass panel with details + "Get directions" · Footer.

**Collection `/collection`** — C1 hero `MediaBg(co-hero-bg)` + `GiantWord("COLLECTION")` over the top half + title/sub + `FilterChips` (sticky) · C2 `CollectionRows(cars.json → collectionRows)` · C3 `NotHere(sv-01)` centred glass panel · Footer.

**Car detail `/collection/[slug]`** — D1 `MediaBg(heroD, heroM)` 100vh, badge, env caption, eyebrow `MARQUE · YEAR`, H1 model + variant, colour line, whisper, Enquire + WhatsApp · D2 `SpecStrip` · D3 In brief: `det-01` (4:3) + story · D4 `Gallery(heroD, det-03, heroM, …)` · D5 Inside: `det-02` full-bleed 80vh + caption · D6 Provenance: `cd-prov-01` + glass chips from `specs` + link · D7 Enquire: `cd-key-01` + `EnquiryForm(car)`; title by availability · D8 Also in residence: `CardPair` of same-category cars · Footer. `generateStaticParams` for all ten slugs × two locales; JSON-LD `Car`.

**Showroom `/showroom`** — S1 `MediaBg(sh-01)` + `GiantWord("RIYADH")` at 60% opacity in the sky + copy · S2 `sh-04` + three paragraphs · S3 `sh-08` + four counters · S4 editorial trio `sh-03-d` / `sh-07` / `sh-05-d` with captions · S5 `sh-09` + majlis copy · S6 `Marquee` · S7 CTA over `sh-06` with "Come after dark." · Footer.

**Services `/services`** — V1 `MediaBg(sv-hero)` + `GiantWord("BEYOND")` + copy · V2–V7 six full-bleed 80vh rows, each `MediaBg(sv-0n)` + one `GlassCard` (number, name, title, line, "Ask the concierge" → WhatsApp with service), alternating start/end · V8 CTA (as H8) · Footer.

**Visit `/visit`** — M1 `MediaBg(sh-06)` + `GiantWord("MAJLIS")` + copy · M2 `hm-map` behind; static map tile (or dark-styled embed later) start-side; glass details panel end-side with address, hours, phone, WhatsApp, email, directions, parking · M3 `sh-09` + `EnquiryForm` · M4 one line over `hm-view` · Footer.

**404** — `MediaBg(ut-404)` + `GiantWord("404")` + title + button.

Global: Preloader (once per session), Nav, StickyBar, Grain, PageTransition, Footer, `hreflang` pairs, JSON-LD `AutoDealer` on every page, OG image from `mb-br-04.png` (resize to 1200×630 at build or ship a static `/public/og.png`).

---

## 9. Phases and acceptance criteria

Work strictly in order. Each phase ends with screenshots (`qa/<phase>/*.png` at 390×844 and 1440×900), a `qa/LOG.md` entry, a clean build, and a commit.

**Phase 0 — Foundations.** Scaffold; tokens; fonts; `content.ts`, `images.ts`, `blur.json`; `Section`, `MediaBg`, `Eyebrow`, `Button`, `GlassCard`, `LiquidBadge`, `SpecChip`, `GiantWord`; a `/styleguide` route (dev-only) that renders every token, type style, button, glass card on `mb-hm-why-bg-d`, and one static Scene with `cul-cut-a` on `cul-bg-d`. *Accept:* the styleguide at 390 and 1440 looks like `docs/02`; Arabic styleguide at `/ar/styleguide` renders in Amiri/Plex with no letter-spacing.

**Phase 1 — Global shell.** Nav (both states, mobile menu), Footer, StickyBar, Grain, SmoothScroll, Preloader, PageTransition, i18n routing, `not-found`. *Accept:* navigate between empty pages in both locales with the transition; Lighthouse a11y 100 on the shell.

**Phase 2 — Home.** All ten sections, desktop and mobile, motion included. *Accept:* every section matches its sketch; Scene parallax and entrance work; H4 stacking pin on desktop only; reduced-motion path checked; LCP ≤ 2.5 s on throttled 4G (hero `-m` image `priority`).

**Phase 3 — Collection.** Hero, filters, all eight rows with the three treatments, the light Salon row, Not-here. *Accept:* rows alternate treatment and temperature as specified; filter FLIP works; light row has ink type, ink focus ring, salon fade; one leftover card renders full width.

**Phase 4 — Car detail.** Template + ten static pages × two locales, spec strip, gallery + lightbox, provenance chips, enquiry form with server action, availability states (test by temporarily flipping one car to `reserved` and one to `sold` in a local copy — do not commit the change). *Accept:* all 20 routes build; JSON-LD validates; sticky bar pre-fills the car.

**Phase 5 — Showroom, Services, Visit.** *Accept:* counters animate; services cards alternate sides; visit form delivers (log to console if `RESEND_API_KEY` is absent, and still show the success state).

**Phase 6 — Arabic pass.** Walk every page at `/ar` at 390 and 1440. *Accept:* layout mirrored, photos not mirrored, arrows mirrored, giant words in Amiri, no letter-spacing, sticky bar WhatsApp on the end side, form labels and errors in Arabic, WhatsApp text in Arabic.

**Phase 7 — Performance, SEO, QA.** Lighthouse (mobile) ≥ 90 / 100 / 100 on Home and Collection; CLS 0; total JS on Home ≤ 180 KB gz; `sitemap.xml`, `robots.txt`, `hreflang`, OG; favicons from the emblem; 404 styled; console clean. Write `qa/REPORT.md` with the numbers and the remaining client placeholders (`content/site.*.json → settings._verify`, `cars.json → verify`).

---

## 10. QA method

- Use Playwright (or the browser tooling you have) to capture the screenshots; name them `home-390.png`, `home-1440.png`, etc.
- For every section, open `docs/02` beside the screenshot and check: image ID, copy (character-exact), layout side, type styles, spacing rhythm, badge/caption positions, button variants, motion.
- Run `npx @unlighthouse/cli` or Lighthouse CI in mobile mode with 4G throttling.
- Test at 390 × 844 (iPhone 14/15), 430 × 932, 768 × 1024, 1280 × 800, 1440 × 900, 1920 × 1080.

---

## 11. Environment and deployment

```
NEXT_PUBLIC_SITE_URL=https://maybach.sa
NEXT_PUBLIC_WHATSAPP=966XXXXXXXXX
RESEND_API_KEY=
CONCIERGE_EMAIL=
NEXT_PUBLIC_GA_ID=            # optional, phase 7
```
Deploy to Vercel. Image optimisation is on by default (masters are PNG; Vercel serves AVIF/WebP). Set `images.minimumCacheTTL` as in §1.

---

## 12. Gotchas you will hit

- **Giant word length on mobile.** `MAY BACH` → two lines under 768 px; `COLLECTION` (10 chars) fits at 22vw only because of the tight tracking — check at 360 px and drop to `20vw` if it wraps; Arabic words are shorter, no issue.
- **Cut-out safe zone.** The cars fill 95% of the cut-out width; the drop shadow will extend beyond — give the car box `overflow: visible` and the section `overflow: hidden`.
- **Backdrop-filter cost.** Never stack more than three glass elements in the viewport on mobile; the H4 cards stack sequentially for this reason. Test scroll FPS on a mid-range Android.
- **`priority` on both hero images** would double the LCP payload — mark only the one that is visible at the current breakpoint (render them conditionally on the server using a `sizes`/media strategy, or accept one `priority` on the mobile image and `loading="eager"` on desktop).
- **Bodoni Moda optical size.** Use `font-optical-sizing: auto`; at giant sizes the hairlines are thin — never render the giant word below `opacity .35`.
- **Arabic + Bodoni fallback.** If a Latin model name (e.g. "S-Class", "911") appears inside Arabic text, wrap it in `<span dir="ltr" class="font-sans">`.
- **Sold state.** The row's car image drops to `opacity .6`, the Enquire button label becomes `common.askAboutSimilar`; the card shows the muted dot.
- **Windows.** Use `cross-env` if you add env-dependent scripts; keep file names lowercase; `git config core.autocrlf true`.
- **Do not "improve" the copy.** If a line feels too short, that is the design.
