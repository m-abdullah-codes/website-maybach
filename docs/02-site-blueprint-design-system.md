# MAY BACH — Site Blueprint, Copy & Design System

**Project:** May Bach (ماي باخ) · Luxury multi-marque showroom · Riyadh
**Document:** 02 of 02 — Concept, design system, components, every page and section, copy in English and Arabic, layout sketches, content model, build notes
**Companion:** `01-imagery-prompts.md` — every `IMAGE ID` referenced below is defined there
**Version:** 1.0 · September 2026

---

## 0. The idea in one paragraph

May Bach is not a car dealership website. It is a **private gallery that happens to be open at night**. Each car is hung like a painting: its own room, its own light, its own single line of text. The visitor never scrolls past a grid of product cards; they walk past one car at a time. The whole site is dark because the showroom is at its best after dark — the client's own photographs prove it: a glass jewel box glowing on a Riyadh boulevard. Everything in this document follows from that: black surfaces, photography in every section, a serif that whispers, an interface with no colour of its own, and copy that says one true thing and stops.

**Working name for the concept:** *After Dark.*

**Where the colour lives.** The interface is monochrome — obsidian, graphite, silver, platinum. All colour comes from the photographs, and each photograph has exactly one temperature: a warm room, a cool room, a neutral studio, or the one pale room. The page is composed the way a designer composes a spread — warm against cool, dark against pale, a saturated car against a desaturated world — so the contrast is between *photographs*, never between UI elements. Gold appears nowhere in the interface. Where a warm tone exists it is because a lantern, a brass pot or a tunnel lamp is in the picture.

**Signature devices, used sparingly:** (1) the giant word behind the car — in five places on the whole site, not on every car; (2) frosted-glass cards floating on macro photography; (3) three ways of showing a car — scene, photograph, card — mixed so no two consecutive rows look alike; (4) one pale room on a dark site; (5) the interlocked-diamond emblem as the only ornament.

---

## 1. Brand foundations

### 1.1 Name and marks
- Wordmark: **MAY BACH** (two words, wide geometric capitals, as on the building). Arabic: **ماي باخ**. In prose: *May Bach*.
- Emblem: two interlocked diamonds (`BR-02`). It is the favicon, the preloader, the bullet, the section divider, the 3% watermark. Nothing else decorates the site.
- Licence line: "Licence No. 4447" appears once, in the footer, as a mark of legitimacy — `رخصة رقم 4447`.
- The showroom's identity must never borrow Mercedes-Maybach's typography, double-M emblem or colours. May Bach's identity is its own diamonds and its own night.

### 1.2 Positioning
*Where Riyadh keeps its finest.* A curated, multi-marque collection — Rolls-Royce, Bentley, Mercedes-Benz, Range Rover, Chevrolet Corvette, GMC, Lamborghini, Porsche — sold by enquiry, with a concierge who stays with the client from first message to keys. No prices on the site. No urgency. No exclamation marks.

### 1.3 Voice
- **Quiet confidence.** Short declaratives. One idea per line. The reader is intelligent and busy.
- **Gallery language, not dealer language.** Cars are *in residence*, *admitted*, *entrusted*, *kept* — never *in stock*, *units*, *deals*, *offers*, *best price*.
- **Second person, sparingly.** "You are expected." lands harder than "We welcome all our valued customers."
- **Banned words:** unmatched, unparalleled, luxury (as an adjective in copy — the design says it), experience (noun), premium, best, cheap, deal, discount, hurry, now (as urgency), dream car, passion.
- **Punctuation:** full stops, the occasional em dash. Never an exclamation mark. Never an ellipsis.
- **Numbers:** Western numerals (0–9) in both languages, matching the sign's "4447".

### 1.4 Arabic voice
Modern Standard Arabic with a Gulf ear: formal but warm, no dialect, no literal translation of English idioms. Lines are re-written to carry the same weight, not the same words. Arabic display type is never letter-spaced, never faux-italic, never all-caps (there is no such thing). Where English uses a single giant word, Arabic uses the equivalent single word or the transliterated model name.

### 1.5 Design principles
1. **A photograph in every section.** Background or foreground; no section is a flat colour block except the statement line and the footer.
2. **One car, one room.** Every car has its own environment. No two consecutive rows share a temperature or a treatment.
3. **Luxury is restraint, not gold.** The interface has no accent colour. Platinum on black is the whole palette; the photograph brings the colour, one temperature at a time.
4. **Breathe.** Section padding is generous to the point of discomfort for a normal site. Whitespace here is blackspace, and it is the luxury.
5. **Type is the ornament.** The giant serif word is the only decoration, and it is rationed. Icons are hairline. No gradients on buttons, no drop shadows on text.
6. **Mobile is the primary canvas.** Every layout is designed at 390 px first, then expanded. The desktop is a widening of the phone, not the reverse.
7. **Motion is slow and physical.** Nothing bounces. Things settle. 800–1200 ms reveals, expo-out easing, parallax that feels like weight.
8. **Glass, not boxes.** Information floats on frosted glass over the photograph; it never sits in an opaque panel.

---
## 2. Design system

### 2.1 Colour

The interface has **no colour**. It is a monochrome instrument — black surfaces, silver and platinum type, hairlines of white at low opacity. Every photograph on the site carries one temperature (01 → §0.9), and that is the only colour the visitor sees. Nothing in the UI is gold, champagne, blue or anything else.

**Interface tokens (dark, the default everywhere)**

| Token | Hex | Use |
|---|---|---|
| `--obsidian` | `#070708` | Page background, hero base, footer |
| `--carbon` | `#0E0E10` | Section alternation, sticky bars, nav on scroll |
| `--graphite` | `#16161A` | Inputs, chips at rest, dividers on black |
| `--smoke` | `#222226` | Hover surfaces, skeleton loaders |
| `--ash` | `#3A3A40` | Hairline borders on dark, disabled |
| `--platinum` | `#ECEAE4` | Primary text, headlines, giant word, primary button fill, focus ring |
| `--silver` | `#B9B6AE` | Secondary text, body on dark, eyebrows |
| `--pewter` | `#7E7B73` | Tertiary text, captions, placeholders |
| `--ok` | `#8FA895` | "Available" badge dot only — a muted sage, not a green |
| `--muted` | `#A77E7E` | "Sold" badge dot and form errors — a muted brick, not a red |

**The light room (used only by Scene rows flagged `scene: light`, e.g. the Flying Spur in the Salon)**

| Token | Hex | Use |
|---|---|---|
| `--salon` | `#D8D5CF` | Section background (matches `FSM-BG`) |
| `--salon-2` | `#C9C6BF` | Floor / lower gradient |
| `--ink` | `#0E0E10` | Text and the giant word on the light room |
| `--ink-2` | `#55545A` | Secondary text on the light room |
| glass on light | `rgba(255,255,255,.42)` fill · `rgba(0,0,0,.08)` border | Glass card / badge variants |

**Scene accent — the only "colour" rule, and it comes from the photograph**

Each car has one `--scene-accent`, a desaturated tone sampled from its own environment or its own paint. It is used in exactly two places inside that car's row and detail page: the 4 px dot beside the environment caption, and the hairline under the *View* link on hover. Nowhere else. It is never used for buttons, never for headlines, never outside that car's own sections. This is how a blue Corvette row and a warm courtyard row feel composed rather than templated, without the interface ever owning a colour.

| Car | Environment | `--scene-accent` | Sampled from |
|---|---|---|---|
| CUL | The Courtyard | `#A89C88` | the sandstone |
| CGT | The Coast Road | `#7D8EA3` | the indigo sea |
| FSM | The Salon | `#0E0E10` | ink — the light room uses black |
| SCL | The District | `#9BA4AE` | tower-window light |
| RRA | The Sandstone | `#9E93A6` | violet pre-dawn |
| YUK | The Villa | `#AD9E8B` | travertine |
| C8 | The Light Lines | `#5F7FB5` | the car's blue, desaturated |
| URU | The Bunker | `#9A8C6A` | the car's paint if it is the gold one; `#8E9298` concrete if not |
| 911 | The Pass | `#B07A4E` | sodium tunnel light |
| G63 | The Wadi | `#8E9DAF` | moonlight |

**Gradients (the only ones allowed)**
- Giant word (dark rooms): `linear-gradient(180deg, rgba(236,234,228,.92) 0%, rgba(236,234,228,.55) 55%, rgba(236,234,228,0) 100%)` clipped to text — bright at the top, dissolving behind the car. Light room: the same with `14,14,16` and the word at `.88 → .60 → 0`.
- Photo overlay (legibility): `linear-gradient(90deg, rgba(7,7,8,.85) 0%, rgba(7,7,8,.35) 40%, rgba(7,7,8,0) 70%)` on desktop, rotated to vertical (`180deg`, bottom-heavy) on mobile. Light room: `rgba(216,213,207,.85)`.
- Section fade: every photographic section ends with a `120px` fade to `--obsidian` (or to `--salon` for the light room) so sections melt into each other rather than cut.

**Contrast:** platinum on obsidian 17.6:1 · silver on obsidian 9.8:1 · pewter on obsidian 4.7:1 (captions only, ≥ 13 px) · ink on salon 14.9:1 · ink-2 on salon 5.6:1 · obsidian on platinum 17.6:1.

### 2.2 Typography

Three families. One does the whispering, one does the work, one carries Arabic.

| Role | Family | Fallback / paid upgrade |
|---|---|---|
| Display (EN) — headlines, giant word | **Bodoni Moda** (Google Fonts, variable, optical sizes) | Paid upgrade: *Canela* or *GT Sectra Display* |
| UI & body (EN) | **Manrope** (Google Fonts, variable) | Paid upgrade: *Neue Haas Grotesk Display* |
| Display (AR) — headlines, giant word | **Amiri** (Google Fonts) | Paid upgrade: *29LT Zarid Display* or *Greta Arabic* |
| UI & body (AR) | **IBM Plex Sans Arabic** (Google Fonts) | Paid upgrade: *29LT Bukra* |

Load with `font-display: swap`, subset Latin + Arabic, preload the two display faces. Serve self-hosted WOFF2.

**Type scale** — `desktop / mobile` in px, line-height, tracking. All sizes use `clamp()` in code; these are the two ends.

| Style | Family · weight | Desktop | Mobile | Line | Tracking | Notes |
|---|---|---|---|---|---|---|
| Giant | Bodoni Moda 400 / Amiri 400 | `clamp(120px, 15vw, 300px)` | `clamp(72px, 22vw, 112px)` | 0.85 | `-0.02em` (EN) · `0` (AR) | Behind the car. Uppercase EN. Max 9 characters on mobile; longer words break to two lines or use the short form (e.g. RANGE ROVER not AUTOBIOGRAPHY) |
| Display XL / h1 | Bodoni Moda 400 / Amiri 400 | 72 | 44 | 1.02 | `-0.01em` · `0` | Page headlines. Sentence case. |
| Display L / h2 | Bodoni Moda 400 / Amiri 400 | 52 | 34 | 1.08 | `-0.005em` · `0` | Section headlines |
| Display M / h3 | Bodoni Moda 400 / Amiri 400 | 34 | 26 | 1.15 | 0 | Card titles, car names on rows |
| Statement | Bodoni Moda 300 italic (EN) / Amiri 400 (AR) | 96 | 40 | 1.0 | `-0.01em` · 0 | The single-line statement section only |
| Eyebrow | Manrope 500 / IBM Plex Sans Arabic 500 | 12 | 11 | 1.2 | `0.24em` uppercase (EN) · `0` (AR, +1 px size) | Silver. Always paired with a 24 px hairline or the diamond mark. |
| Body L | Manrope 400 / Plex Arabic 400 | 19 | 17 | 1.6 (EN) · 1.8 (AR) | 0 | Sub-headlines, intros. Max 52 characters per line. |
| Body M | Manrope 400 / Plex Arabic 400 | 16 | 15 | 1.6 · 1.8 | 0 | Cards, forms |
| Small | Manrope 400 / Plex Arabic 400 | 13 | 13 | 1.5 · 1.7 | `0.01em` · 0 | Captions, chips, footer |
| Spec value | Manrope 500 | 22 | 18 | 1.1 | `-0.01em` | Numbers in spec chips, tabular figures `font-variant-numeric: tabular-nums` |
| Card title | Bodoni Moda 400 / Amiri 400 | 30 | 26 | 1.1 | 0 | Car name on a car card (§3.11) |
| Button | Manrope 500 / Plex Arabic 500 | 14 | 14 | 1 | `0.08em` uppercase (EN) · 0 (AR) | |

Rules: headlines never exceed two lines on desktop, three on mobile. Body never exceeds 52 characters per line. No bold in body copy — emphasis is done by colour (platinum vs silver), never weight. Arabic text is never letter-spaced and never justified.

### 2.3 Spacing, grid, radius

- **Base unit:** 4 px. Scale: `4 8 12 16 24 32 48 64 96 128 160 200 240`.
- **Section rhythm:** vertical padding `clamp(96px, 12vw, 200px)` desktop; `96px` mobile. Hero sections are `100svh` (mobile) / `100vh` min `760px` (desktop). Collection rows are `88svh` mobile / `92vh` desktop.
- **Container:** max `1440px`; gutters `24px` (≤ 640), `48px` (641–1024), `80px` (≥ 1025). Full-bleed photography ignores the container; text always respects it.
- **Grid:** 12 columns desktop, 6 tablet, 4 mobile. Column gap `24px` / `16px`.
- **Radii:** chips & inputs `8px` · glass cards `20px` · large glass panels `28px` · pills & buttons `999px` · images inside cards `12px`. Never radius a full-bleed photograph.
- **Hairlines:** `1px solid rgba(255,255,255,.10)`; on platinum surfaces and the light room `rgba(7,7,8,.12)`.

### 2.4 Glass — the two recipes

**Frosted glass card (the §H4 treatment, services, spec panels)**
```css
.glass {
  background: linear-gradient(135deg, rgba(255,255,255,.085) 0%, rgba(255,255,255,.03) 100%);
  -webkit-backdrop-filter: blur(24px) saturate(140%);
  backdrop-filter: blur(24px) saturate(140%);
  border: 1px solid rgba(255,255,255,.14);
  border-radius: 20px;
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.18),      /* top specular */
    inset 0 -1px 0 rgba(0,0,0,.25),
    0 30px 60px -20px rgba(0,0,0,.6);
}
.glass::before {                                /* faint white sheen, top-left */
  content:""; position:absolute; inset:0; border-radius:inherit; pointer-events:none;
  background: radial-gradient(120% 80% at 0% 0%, rgba(255,255,255,.08), transparent 60%);
}
.scene--light .glass {                          /* the light room */
  background: rgba(255,255,255,.42); border-color: rgba(0,0,0,.08);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.7), 0 30px 60px -24px rgba(0,0,0,.25);
}
```

**Liquid glass badge (the pill at the top-left of an image — "Available", environment name, year)**
```css
.liquid {
  background: rgba(255,255,255,.10);
  -webkit-backdrop-filter: blur(18px) saturate(160%) brightness(1.1);
  backdrop-filter: blur(18px) saturate(160%) brightness(1.1);
  border: 1px solid rgba(255,255,255,.22);
  border-radius: 999px;
  padding: 8px 14px 8px 10px;
  box-shadow: inset 0 1px 1px rgba(255,255,255,.35), inset 0 -2px 6px rgba(0,0,0,.15), 0 8px 24px -8px rgba(0,0,0,.5);
  font: 500 12px/1 Manrope; letter-spacing:.06em; color: var(--platinum);
}
```
Glass never sits on a flat colour — only on photography. If `backdrop-filter` is unsupported, fall back to `background: rgba(14,14,16,.82)`.

### 2.5 Shadows and light
- **Car cut-out shadow (code, not image):** `filter: drop-shadow(0 40px 50px rgba(0,0,0,.65)) drop-shadow(0 4px 12px rgba(0,0,0,.4))` desktop; halve on mobile.
- **Floor reflection (optional, desktop only):** a flipped copy of the cut-out at `opacity:.18`, `transform: scaleY(-1)`, masked with a vertical gradient to transparent over 40% of its height, `filter: blur(2px)`.
- **Rim glow behind the car (Scene rows only):** a neutral radial gradient `radial-gradient(60% 40% at 50% 70%, rgba(255,255,255,.07), transparent 70%)` between background and word — it lifts the car off the background without adding colour. On the light room it is `rgba(0,0,0,.06)`.
- **Elevation:** there is only one elevation for floating elements (`0 30px 60px -20px rgba(0,0,0,.6)`). Nothing else casts a shadow.

### 2.6 Motion

| Token | Value | Use |
|---|---|---|
| `--ease-out` | `cubic-bezier(.16, 1, .3, 1)` | Reveals, entrances |
| `--ease-inout` | `cubic-bezier(.65, 0, .35, 1)` | Page transitions, slides |
| `--d-fast` | `320ms` | Hover, chips, toggles |
| `--d-base` | `800ms` | Fade-ups, glass appear |
| `--d-slow` | `1200ms` | Hero, giant word, car settle |

- **Smooth scroll:** Lenis, `lerp 0.08`. Disabled under `prefers-reduced-motion`.
- **Reveal:** elements enter with `opacity 0→1`, `translateY 24px→0`, `--d-base --ease-out`, staggered `80ms`. Headlines reveal per line with a mask (`clip-path: inset(0 0 100% 0)` → `inset(0)`), `--d-slow`.
- **Three-layer scene parallax (scroll):** background moves at `0.85×`, giant word at `0.92×` with a `±40px` horizontal drift, car at `1.0×`. Word opacity fades from 1 to 0.35 as the section leaves.
- **Three-layer scene entrance:** background scales `1.06→1` over `1600ms`; word rises with the mask over `--d-slow`; car fades in and rises `40px` over `--d-slow` with a `200ms` delay; glass card slides in last.
- **Pointer parallax (desktop only):** the car drifts `±10px`, the word `±6px` opposite the cursor, `lerp 0.05`.
- **Glass card hover:** `translateY(-4px)`, border to `rgba(255,255,255,.22)`, sheen intensifies, `--d-fast`. Optional 3D tilt max `4deg` on desktop (the "tilted floating cards" the client liked) — keep it under 4° or it reads as a gimmick.
- **Car card hover (§3.11):** the photograph scales `1.03` over `--d-slow`, the bottom glass strip lifts `4px`, the liquid badge brightens. Nothing else moves.
- **Buttons:** primary (platinum) dims to `#DEDCD5` with the arrow translating `4px`; secondary border to platinum and fill `rgba(255,255,255,.06)`. Pressed: `scale(.98)`.
- **Page transition:** obsidian curtain wipes up over `--d-base --ease-inout`, the diamond emblem draws itself (SVG stroke, `600ms`) in the centre, curtain lifts. Total under 1.4 s.
- **Marque marquee:** continuous, `40s` per loop, pauses on hover, tiles lift `4px` on hover.
- **Reduced motion:** all parallax and marquee off; reveals become `opacity` only, `200ms`.

### 2.7 Iconography
Lucide or Phosphor Thin, `1.25px` stroke, `20px` frame, colour `--silver`, `--platinum` on hover/active. Arrow-up-right `↗` is the only arrow used on links. The diamond emblem replaces bullets. No filled icons, no emoji, no illustrations.

### 2.8 Photography rules (the design-system view)
- Every image is low-key and neutral-graded with one stated temperature (01 → §0.9); nine rooms are night or blue hour, one is the pale Salon. No global colour cast, ever. If an image has a gold or orange wash over it, it doesn't ship.
- **Temperature rhythm:** no two consecutive photographic sections share a temperature. The Collection page alternates warm / neutral / cool / pale by design (§6.2).
- Every section has a photograph, background or foreground. The only exceptions: the statement line (uses the near-black `HM-STATEMENT-BG`), forms (use `BR-03`/`UT-GLOW-01`), the footer.
- Photographs are never radiused when full-bleed; inside cards they take `12px`.
- Legibility is solved by the gradient overlays in §2.1, never by darkening the whole photo.
- Mobile and desktop are separate images (`-M`, `-D`), served with `<picture>` and `media` queries at `768px`. Never crop a desktop image for mobile.
- Film grain overlay at 5% on every photographic section for cohesion (SVG turbulence, fixed position, `mix-blend-mode: overlay`).

### 2.9 RTL / Arabic
- `<html lang="ar" dir="rtl">` flips the layout. Use CSS logical properties (`margin-inline-start`, `inset-inline-end`) everywhere; never `left/right`.
- **Photographs are not mirrored.** Cars stay facing the way they were shot. Only text, layout, arrows and the scroll-cue flip. Where a desktop layout places the car "right, text left", RTL places text right, car left — so each three-layer scene needs the alternate composition handled by CSS (`flex-direction` flips automatically; the car image gets `inset-inline-end: -6%` instead of `inset-inline-start`).
- Giant word in Amiri; eyebrows in Plex Arabic 500 at 12 px, no tracking, no uppercase.
- Arabic line-height 1.8 for body, 1.15 for display. Never justify.
- Language toggle in the nav: `عربي` on the English site, `EN` on the Arabic site, as a text link — not a flag.
- Numbers stay Western (0–9). Phone numbers use `+966`.
- Form fields, chips and badges are mirrored; the WhatsApp/concierge sticky bar keeps the WhatsApp button on the thumb side (end side) in both directions.

### 2.10 Accessibility
- Contrast as in §2.1. Never place silver text on photography without the overlay.
- Focus ring: `2px solid var(--platinum)` with `4px` offset (`--ink` on the light room), on every interactive element.
- Giant word is `aria-hidden`; the real heading is the h1/h2 in the copy.
- All car cut-outs have `alt` = "[Year] [Marque] [Model] in [Environment]"; backgrounds are `role="presentation"`.
- Motion respects `prefers-reduced-motion`. Autoplaying video (if added later) is muted, has no audio, and pauses under reduced-motion.
- Touch targets ≥ 44 px. Sticky bar buttons 52 px tall.

---
## 3. Components

Sketch legend used throughout: `█` photograph · `▒` glass · `≡` giant word · `◆` diamond emblem · `[ ]` button · `( )` pill/badge · `—` hairline.

### 3.1 Header / navigation
- Transparent over the hero; after `80px` of scroll it becomes a **floating glass pill** (`.glass`, `999px` radius, `56px` tall, centred, max `1120px`), with `--carbon` at 82% behind the blur.
- Desktop: wordmark left (`BR-01`, 22 px tall, white) · centre links: *The Collection · The Showroom · Services · Visit* · right: language toggle (`عربي`) + primary pill button *Reserve a viewing*.
- Mobile: wordmark left, `☰` right (two hairlines, 20 px wide). The menu is a full-screen obsidian overlay with `BR-03-M` as texture, links in Display L stacked, staggered reveal, language toggle and WhatsApp at the bottom.
- Active link: platinum dot (`4px`) beneath. Hover: platinum. No underlines.

```
Desktop (after scroll)
┌──────────────────────────────────────────────────────────────┐
│  ▒ MAY BACH     The Collection  The Showroom  Services  Visit     عربي  [ Reserve a viewing ] ▒ │
└──────────────────────────────────────────────────────────────┘
Mobile
┌────────────────────────────┐
│  MAY BACH               ☰  │
└────────────────────────────┘
```

### 3.2 Buttons
| Variant | Look | Use |
|---|---|---|
| Primary | Platinum fill (`--platinum`), obsidian text, `999px`, `52px` tall (`48px` mobile), padding `0 28px`, uppercase 14/0.08em, `↗` icon. On the light room: ink fill, platinum text | One per section maximum |
| Secondary | Transparent, `1px rgba(255,255,255,.28)` border, platinum text | Paired with primary |
| Glass | `.glass` background, platinum text | On photography when a primary would shout |
| Text link | Platinum, `↗` icon, hairline underline that draws from start on hover (in `--scene-accent` inside a car's row, platinum elsewhere) | Inline "See every car" links |
| WhatsApp | Secondary with the WhatsApp glyph (thin), label *Concierge* | Sticky bar, contact |

### 3.3 Eyebrow + headline block
```
◆  THE COLLECTION                 ← eyebrow: emblem 10px + 24px hairline + label, silver
Currently in residence.           ← Display L, platinum
Sub-line in Body L, silver, max 52 ch. Optional.
```
Alignment: start-aligned by default; centred only in the private-viewing CTA and 404.

### 3.4 Frosted glass card (promise / service / spec)
```
┌▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒┐
│ ◇ icon (20px, silver)     │
│                           │
│ Curation           ← h3   │
│ If it's here, it earned   │
│ its place.       ← Body M │
└▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒┘
```
Padding `32px` (`24px` mobile). Width `420px` desktop; full-width minus gutters on mobile. Stack gap `16px`. Optional tilt ≤ 4°.

### 3.5 Liquid glass badge
`.liquid`. Contents: a `6px` dot (`--ok` for Available, `--pewter` for Reserved, `--muted` for Sold) + label. Or: year. Sits `20px` from the top-start corner of a photograph. The environment caption is not a badge: it is Small pewter text at the top-end corner with a `4px` `--scene-accent` dot before it.

### 3.6 Spec chip
```
┌────────────┐
│ ENGINE     │  ← Small, pewter, tracking .12em
│ 6.75 V12   │  ← Spec value, platinum, tabular
└────────────┘
```
Transparent, hairline bottom only. In a row of three on car rows (Engine · Power · 0–100); a row of eight in the "At a glance" glass strip on the detail page. On mobile the strip scrolls horizontally with `scroll-snap`.

### 3.7 Marque tile & marquee
Tiles `120×120px` (`96px` mobile), `--carbon` fill, hairline border, radius `20px`, logo white at 70% opacity, centre tile scaled `1.15` and full opacity as the marquee passes. Eight tiles: Rolls-Royce, Bentley, Mercedes-Benz, Range Rover, Chevrolet, GMC, Lamborghini, Porsche. Official SVGs only.

### 3.8 Filter chips (Collection page)
Pills, `40px` tall, glass at rest, platinum fill + obsidian text when active. Horizontal scroll on mobile with a fade at the end edge. Single-select. Options: *All · SUV · Grand Tourer · Saloon · Sports*.

### 3.9 The Scene — the three-layer component, rationed

The giant word behind the car is the site's signature, and a signature is only worth something if it is not on every page. It appears in **five places** and nowhere else:

1. Home hero (Cullinan, `MAY BACH`)
2. Home featured (Continental GT, `AZURE`)
3. Collection row — Cullinan (`CULLINAN`, warm)
4. Collection row — Flying Spur (`MULLINER`, the light room)
5. Collection row — Continental GT (`AZURE`, cool)

Everything else shows cars as photographs or cards (§3.10, §3.11). The page-hero words on the Collection, Showroom, Services and Visit pages (`COLLECTION`, `RIYADH`, `BEYOND`, `MAJLIS`) sit *over* a photograph at reduced opacity, not behind a cut-out — a simpler two-layer treatment that shares the type style but not the mechanism, and never competes with a car.

```
Layer 0  ── film grain (fixed, 5%)
Layer 3  ── copy block + buttons + glass card          (HTML)
Layer 2  ── car cut-out  [CODE]-CUT-A / -B            (img, alpha, drop-shadow)
Layer 1b ── neutral rim glow (radial gradient)         (CSS)
Layer 1  ── giant word ≡  "CULLINAN" / "كولينان"        (HTML h-tag, aria-hidden twin)
Layer 0b ── legibility gradient overlay                (CSS)
Layer 0  ── background photograph  [CODE]-BG-D / -M    (picture, cover)
```

Desktop composition (car end-side, text start-side):
```
┌───────────────────────────────────────────────────────────────┐
│ ◆ EYEBROW                                                     │
│                        ≡≡≡≡ C U L L I N A N ≡≡≡≡              │  word: right-aligned to the
│ Headline in                    ████████████████               │  car, top of word above the
│ Display XL                   ██████████████████████           │  roofline, bottom hidden
│ Sub-line, silver.           ████████ car cut-out ████         │  behind the car
│ [ Primary ]  [ Secondary ]   ██████████████████████           │
│                                 (glass card, floating) ▒▒▒▒   │
└───────────────────────────────────────────────────────────────┘
```
Mobile composition (stacked; car centred; copy below the car so the thumb reaches the buttons):
```
┌──────────────────────┐
│ ◆ EYEBROW            │
│  ≡≡ CULLINAN ≡≡      │  word centred, 22vw, may break to 2 lines
│     ████████████     │  car cut-out -B (front-on), width 112% of viewport,
│   ████████████████   │  overflow hidden, bottom ~55% of the frame
│ ─────────────────    │
│ Headline             │
│ Sub-line             │
│ [ Primary ]          │
│ [ Secondary ]        │
└──────────────────────┘
```
Rules: the word's baseline sits at 58% of the car's height so the car hides the bottom third of the letters. Word is `pointer-events: none`. The car image is `loading="eager"` on the hero, `lazy` elsewhere, with `decoding="async"` and a `blur-up` placeholder. If the cut-out fails to load, the section falls back to `[CODE]-HERO-D/-M` as the background and hides the word. The **light variant** (`.scene--light`) swaps the tokens to `--salon` / `--ink`, drops the rim glow to a soft dark shadow, and is used once, for the Flying Spur.

### 3.10 The Photograph row

The workhorse of the Collection page and the hero of every Car detail page: **one composed photograph** of the car in its environment (`[CODE]-HERO-D/-M`), full-bleed, with copy on the dark side and a small glass spec card. No cut-out, no giant word. This is the treatment the client's "nice colour composition" and "feels good" inspirations use — the photograph does the talking.

```
D ┌───────────────────────────────────────────────────────────────┐
  │ (● Available)                                   ● The Pass    │  ← liquid badge · env caption with accent dot
  │ █████████ amber tunnel mouth ████████████████████████████████ │
  │ ██████████████████████████████████ ████ 911 ████ ████████████ │
  │ PORSCHE                                                       │
  │ 911 Carrera                              ┌▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒┐   │
  │ Six decades of getting it right.         │ 3.0 · 385 hp   │   │
  │ View ↗   [ Enquire ]                     │ 4.2 s · RWD    │   │
  │                                          └▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒┘   │
  └───────────────────────────────────────────────────────────────┘
M ┌──────────────────────┐
  │(● Available) ● The Pass│
  │ ████████████████████ │  ← HERO-M, 88svh, car in the lower-middle
  │ ██████ 911 █████████ │
  │ ████████████████████ │
  │ PORSCHE              │
  │ 911 Carrera          │
  │ Six decades of…      │
  │ 3.0 · 385 hp · 4.2 s │
  │ View ↗   [ Enquire ] │
  └──────────────────────┘
```
Height `92vh` desktop / `88svh` mobile. The copy alternates start / end side row by row so the page zig-zags. The photograph pans `40px` on scroll (`0.9×`); nothing else moves.

### 3.11 The Car card — large, in pairs

Not a product card. A **portrait photograph** (`[CODE]-CARD`, 4:5) that fills a glass-edged card; on desktop two cards sit side by side in one row, on mobile one card fills the width. The name and one line sit on a glass strip at the bottom; a liquid badge sits top-start. Nothing else — no price, no buttons, no icons. The whole card is the link.

```
D ┌───────────────────────────────┐  ┌───────────────────────────────┐
  │ (● Available)                 │  │ (● Available)                 │
  │ ██████ The District ████████  │  │ ██████ The Villa ███████████  │
  │ ████████████████████████████  │  │ ████████████████████████████  │
  │ ████████ S-CLASS ███████████  │  │ ████████ DENALI ████████████  │
  │ ████████████████████████████  │  │ ████████████████████████████  │
  │ ┌▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒┐ │  │ ┌▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒┐ │
  │ │ MERCEDES-BENZ · 2022      │ │  │ │ GMC                       │ │
  │ │ S-Class                 ↗ │ │  │ │ Yukon Denali            ↗ │ │
  │ │ Still the standard.       │ │  │ │ Room for everyone…        │ │
  │ └▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒┘ │  │ └▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒┘ │
  └───────────────────────────────┘  └───────────────────────────────┘
M ┌──────────────────────┐
  │ (● Available)        │
  │ ████████████████████ │  ← one card, full width, 4:5
  │ ██████ S-CLASS █████ │
  │ ████████████████████ │
  │ ┌▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒┐ │
  │ │ MERCEDES-BENZ·2022│ │
  │ │ S-Class         ↗ │ │
  │ │ Still the standard│ │
  │ └▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒┘ │
  └──────────────────────┘
```
Card: radius `24px`, `1px rgba(255,255,255,.10)` border, image `object-fit: cover`, desktop width `(container − 24px) / 2`, mobile full width; the pair sits inside the container with normal gutters (the only car treatment that is not full-bleed — the framing is the contrast). Bottom strip is `.glass` with `24px` padding, eyebrow (marque · year), card title, whisper line, `↗`. Hover per §2.6.

### 3.12 Row rhythm — how the three treatments are mixed

No two consecutive rows share a treatment, and no two consecutive rows share a temperature. The Collection order (§6.2) is built on that rule: Scene → Cards → Photograph → Scene (light) → Photograph → Cards → Scene → Photograph. Home's collection preview (§5 H3) shows one of each so the visitor has seen all three languages before reaching the Collection page.

### 3.13 Form
Fields on `--graphite` with hairline borders, `56px` tall, radius `8px`, label floats to a Small pewter caption on focus, platinum focus ring. Fields: Name · Phone (+966 prefix pre-filled) · Car of interest (select, optional, pre-filled from the detail page) · Preferred date & time (native picker) · Message. Submit is a primary button. Success replaces the form with `CT-DOOR-01` and a two-line confirmation. Errors are one sentence in `--muted` under the field, never a toast.

### 3.14 Sticky mobile bar
Appears after the hero on every page, `64px` tall, glass on `--carbon` 90%, hairline top, safe-area padding. Two buttons: *Enquire* (primary, 60% width) and *Concierge* (WhatsApp, secondary, 40%). On a car detail page, *Enquire* pre-fills that car. Hidden while the nav overlay is open.

### 3.15 Footer
Obsidian. Top: a `1px` platinum hairline at 20%. Row 1: wordmark (large, 40 px) start · tagline end. Row 2: four columns of Small links (The Collection · The Showroom · Services · Visit) + address/hours/phone column. Row 3: social (Instagram, Snapchat, TikTok, X — thin icons) · language toggle · "Licence No. 4447" · "© 2026 May Bach". Background texture `BR-03-D` at 40% opacity, bottom-aligned.

### 3.16 Preloader
Obsidian screen, `UT-GLOW-01` faint at the centre, the diamond emblem drawing itself (SVG stroke-dashoffset, `700ms`), the wordmark fading in beneath (`400ms`), then the curtain lifts (`--d-base`). Total ≤ 1.6 s, shown once per session; subsequent navigations use the page transition (§2.6).

### 3.17 Cursor (desktop only, optional)
A `10px` platinum dot with `mix-blend-mode: difference`. Over a collection row it grows to a `72px` glass circle with the word *View*. Over buttons it hides. Never on touch devices.

### 3.18 Availability badge states
- **Available** — `--ok` dot, label *Available* / *متاحة*
- **Reserved** — `--pewter` dot, *Reserved* / *محجوزة*
- **Sold** — `--muted` dot, *Sold* / *بيعت*; the row's car image drops to `opacity .6` and the Enquire button becomes *Ask about similar* / *اسأل عن مشابهة*

---
## 4. Site map and global copy

```
/                     Home
/collection           The Collection (all cars)
/collection/[slug]    Car detail (template)
/showroom             The Showroom (about, the house, hospitality)
/services             Services (sourcing, finance, trade-in, registration & export, aftercare, delivery)
/visit                Visit / Contact (the majlis, form, map)
/404
/ar/…                 Arabic mirror of every route
```

### 4.1 Navigation labels
| EN | AR |
|---|---|
| Home | الرئيسية |
| The Collection | المجموعة |
| The Showroom | المعرض |
| Services | الخدمات |
| Visit | زيارة |
| Reserve a viewing (nav button) | احجز معاينة |
| Concierge (WhatsApp) | الكونسيرج |
| عربي / EN (toggle) | — |

### 4.2 Footer copy
| Element | EN | AR |
|---|---|---|
| Tagline | Where Riyadh keeps its finest. | حيث تحتفظ الرياض بأرقى ما لديها. |
| Address | [Street], [District], Riyadh [Postal code] | [الشارع]، [الحي]، الرياض [الرمز البريدي] |
| Hours | Saturday–Thursday 10:00–22:00 · Friday 16:00–22:00 *(confirm with client)* | السبت–الخميس 10:00–22:00 · الجمعة 16:00–22:00 |
| Phone | +966 [XX XXX XXXX] | +966 [XX XXX XXXX] |
| Licence | Licence No. 4447 | رخصة رقم 4447 |
| Legal | © 2026 May Bach. All rights reserved. · Privacy · Terms | © 2026 ماي باخ. جميع الحقوق محفوظة. · الخصوصية · الشروط |

### 4.3 WhatsApp deep link
`https://wa.me/966XXXXXXXXX?text=` + URL-encoded:
- EN: "Hello May Bach, I'd like to ask about the [Year Marque Model]."
- AR: "مرحباً ماي باخ، أودّ الاستفسار عن [السنة العلامة الموديل]."
Without a car: "Hello May Bach, I'd like to arrange a viewing." / "مرحباً ماي باخ، أودّ ترتيب معاينة."

### 4.4 Preloader
Emblem draws · wordmark "MAY BACH" / "ماي باخ" · no other text.

### 4.5 Meta / SEO defaults
- Title pattern: `[Page] — May Bach, Riyadh` · Home: `May Bach — Where Riyadh keeps its finest`
- Description (EN): "A private collection of the world's most desired motor cars — Rolls-Royce, Bentley, Mercedes-Benz, Range Rover and more — at one address in Riyadh. Viewings by appointment."
- Description (AR): "مجموعة خاصة من أكثر سيارات العالم رغبةً — رولز رويس، بنتلي، مرسيدس بنز، رينج روفر وغيرها — في عنوان واحد بالرياض. المعاينة بموعد."
- OG image: `BR-04`.

---

## 5. Home — `/`

Purpose: make the visitor feel the showroom at night in ten seconds, show four cars, make one promise, and hand them to the concierge. Ten sections, every one with a photograph.

### H0 · Preloader → Hero handoff
The preloader's curtain lifts to reveal the hero already mid-motion (background settling from `1.06`, the word rising). No separate "loaded" state.

### H1 · Hero — the three-layer scene
- **Images:** `HM-HERO-BG-D` / `HM-HERO-BG-M` · car `CUL-CUT-A` (desktop) / `CUL-CUT-B` (mobile). Optional slides 2–3: `CGT-CUT-B`, `SCL-CUT-A` on the same background, auto-advance `7s`, no arrows — a thin progress hairline under the eyebrow.
- **Fallback:** `HM-HERO-STILL-D/-M`.
- **Giant word:** `MAY BACH` / `ماي باخ`
- **Layout (D):** copy start-side bottom third; car end-side, occupying 58% width, bleeding `6%` past the end edge; floating glass card bottom-end with the featured car mini. This is Scene 1 of 5 on the site (§3.9).
- **Layout (M):** word top, car centred at 112% width with bottom 55% of the frame, copy under it, two full-width buttons, scroll cue.

```
D ┌───────────────────────────────────────────────────────────────────┐
  │ MAY BACH        The Collection  The Showroom  Services  Visit  عربي  [Reserve] │
  │                                                                   │
  │ ◆ RIYADH · THE COLLECTION      ≡≡≡≡≡ M A Y   B A C H ≡≡≡≡≡        │
  │                                          ██████████████████       │
  │ Where Riyadh                          ████████████████████████    │
  │ keeps its finest.                   ████████ CULLINAN ████████    │
  │ The world's most desired motor cars.  ████████████████████████    │
  │ One address.                                                      │
  │ [ View the Collection ↗ ]  [ Reserve a private viewing ]          │
  │                                   ▒ Now showing · Rolls-Royce Cullinan ▒ │
  │ Scroll ↓                                                          │
  └───────────────────────────────────────────────────────────────────┘
M ┌──────────────────────┐
  │ MAY BACH          ☰  │
  │ ◆ RIYADH · THE COLLECTION │
  │   ≡≡ MAY ≡≡          │
  │   ≡≡ BACH ≡≡         │
  │      ██████████      │
  │    ██████████████    │
  │   ████ CULLINAN ███  │
  │ Where Riyadh         │
  │ keeps its finest.    │
  │ The world's most     │
  │ desired motor cars.  │
  │ One address.         │
  │ [ View the Collection ↗ ] │
  │ [ Reserve a private viewing ] │
  └──────────────────────┘
```

| Element | EN | AR |
|---|---|---|
| Eyebrow | RIYADH · THE COLLECTION | الرياض · المجموعة |
| Giant word | MAY BACH | ماي باخ |
| H1 | Where Riyadh keeps its finest. | حيث تحتفظ الرياض بأرقى ما لديها. |
| Sub | The world's most desired motor cars. One address. | أكثر سيارات العالم رغبةً. عنوان واحد. |
| Primary | View the Collection | استعرض المجموعة |
| Secondary | Reserve a private viewing | احجز معاينة خاصة |
| Glass card | Now showing · Rolls-Royce Cullinan · *View* | معروضة الآن · رولز رويس كولينان · *عرض* |
| Scroll cue | Scroll | مرّر |

Motion: as §2.6 three-layer entrance. Word drifts `-40px` horizontally on scroll. Glass card enters last.

### H2 · Statement — one line
- **Image:** `HM-STATEMENT-BG-D/-M` (near-black bokeh of the showroom).
- **Layout:** the single line in Statement style, centred, `100vh` on desktop / `70svh` on mobile; the support line appears in Small, pewter, `48px` beneath, after a `400ms` delay. The whole section is quiet on purpose.

```
D ┌───────────────────────────────────────────────┐
  │                                               │
  │          Chosen, not stocked.                 │  ← 96px italic serif
  │                                               │
  │   Every car here was sought out, inspected,   │  ← Small, pewter
  │   and admitted. Nothing arrives by accident.  │
  │                                               │
  └───────────────────────────────────────────────┘
```

| Element | EN | AR |
|---|---|---|
| Statement | Chosen, not stocked. | مُختارة، لا مُكدّسة. |
| Support | Every car here was sought out, inspected, and admitted. Nothing arrives by accident. | كل سيارة هنا بُحث عنها، وفُحصت، وقُبلت. لا شيء يصل إلى هنا صدفة. |

Motion: the line reveals word by word (`120ms` stagger). Background parallax `0.9×`.

### H3 · The Collection — four in residence, three ways
- **Images:** one Photograph row (`RRA-HERO-D/-M`, the pre-dawn sandstone — cool), one pair of Cards (`SCL-CARD` + `YUK-CARD` — neutral and warm), one Photograph row (`C8-HERO-D/-M`, the light lines — neutral, graphic). No giant word here: the hero above and the featured section below already carry it.
- **Layout:** eyebrow + headline block, then Photograph → Cards → Photograph, then a text link. This is the visitor's first sight of all three car treatments and of the temperature rhythm: cool, then neutral + warm, then neutral.

```
D ┌───────────────────────────────────────────────────────────────────┐
  │ ◆ THE COLLECTION                                                  │
  │ Currently in residence.                       See every car ↗    │
  ├───────────────────────────────────────────────────────────────────┤
  │ (● Available)                                   ● The Sandstone   │  ← Photograph row (RRA-HERO-D)
  │ ████ monolith ████████████████████████████████████████████████    │
  │ ██████████████████████████████ ████ RANGE ROVER ████ ██████████   │
  │ RANGE ROVER                              ┌▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒┐       │
  │ Autobiography · 2024                     │ 4.4 V8 · 523 hp│       │
  │ Above it all.                            │ 4.6 s · AWD    │       │
  │ View ↗   [ Enquire ]                     └▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒┘       │
  ├───────────────────────────────────────────────────────────────────┤
  │   ┌─────────────────────────┐   ┌─────────────────────────┐       │  ← Card pair (SCL-CARD, YUK-CARD)
  │   │ (● Available)           │   │ (● Available)           │       │
  │   │ ███ The District ██████ │   │ ███ The Villa █████████ │       │
  │   │ ██████ S-CLASS ████████ │   │ ██████ DENALI █████████ │       │
  │   │ ┌▒ MERCEDES-BENZ · 2022 │   │ ┌▒ GMC                  │       │
  │   │ │ S-Class             ↗ │   │ │ Yukon Denali        ↗ │       │
  │   │ │ Still the standard.   │   │ │ Room for everyone…    │       │
  │   └─────────────────────────┘   └─────────────────────────┘       │
  ├───────────────────────────────────────────────────────────────────┤
  │ ● The Light Lines                                 (● Available)   │  ← Photograph row (C8-HERO-D), copy end-side
  │ ═══════════════════════ light lines ══════════════════════════    │
  │ ██████████ ████ CORVETTE ████ ████████████         CHEVROLET      │
  │ ═══════════════════════════════════════════       Corvette C8 Stingray │
  │                                                   The heart, moved to the middle. │
  │                                                   View ↗  [ Enquire ] │
  └───────────────────────────────────────────────────────────────────┘
M ┌──────────────────────┐
  │ ◆ THE COLLECTION     │
  │ Currently in         │
  │ residence.           │
  ├──────────────────────┤
  │ ████ RRA-HERO-M ████ │  ← Photograph row, 88svh
  │ RANGE ROVER          │
  │ Autobiography        │
  │ Above it all.        │
  │ View ↗  [ Enquire ]  │
  ├──────────────────────┤
  │ ┌──────────────────┐ │  ← Card (SCL-CARD), full width
  │ │ ███ S-CLASS ████ │ │
  │ │ ▒ S-Class      ↗ │ │
  │ └──────────────────┘ │
  │ ┌──────────────────┐ │  ← Card (YUK-CARD)
  │ │ ███ DENALI █████ │ │
  │ │ ▒ Yukon Denali ↗ │ │
  │ └──────────────────┘ │
  ├──────────────────────┤
  │ ████ C8-HERO-M █████ │  ← Photograph row
  │ CHEVROLET            │
  │ Corvette C8 Stingray │
  │ View ↗  [ Enquire ]  │
  └──────────────────────┘
```

| Element | EN | AR |
|---|---|---|
| Eyebrow | THE COLLECTION | المجموعة |
| H2 | Currently in residence. | في المعرض الآن. |
| Link | See every car | شاهد كل السيارات |
| Row actions | View · Enquire | عرض · استفسر |

Whisper lines are in §6.3. Motion: Photograph rows pan `40px` on scroll; cards reveal with an `80ms` stagger and hover per §2.6. No pinning on this page — the beat here is the hero and the featured section.

### H4 · More than a showroom — the promise cards
- **Image:** `HM-WHY-BG-D/-M` (the Bentley headlamp macro). A/B: `HM-WHY-ALT`.
- **Layout (D):** headline start-side top, staggered over three lines like the inspiration; three frosted cards stacked end-side, each `420px` wide, overlapping the dark half of the photo; optional 3° tilt. **(M):** headline over the headlamp (top third), cards stacked full-width below, the photo's dark lower two-thirds behind them.

```
D ┌───────────────────────────────────────────────────────────────────┐
  │ ████████████                                                      │
  │ ██ headlamp ██   More than                    ┌▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒┐  │
  │ ████████████       a showroom.                │ ◇ Curation     │  │
  │ ████████ bonnet dissolving into black ─────►  │ If it's here,  │  │
  │ ████████                                      │ it earned its  │  │
  │ ████                                          │ place.         │  │
  │  Three promises we make on every car.         └▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒┘  │
  │                                               ┌▒▒ Certainty ▒▒┐  │
  │                                               └▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒┘  │
  │                                               ┌▒▒ Concierge ▒▒┐  │
  │                                               └▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒┘  │
  └───────────────────────────────────────────────────────────────────┘
```

| Element | EN | AR |
|---|---|---|
| Eyebrow | WHY MAY BACH | لماذا ماي باخ |
| H2 | More than a showroom. | أكثر من معرض. |
| Sub | Three promises we make on every car. | ثلاثة وعود نقطعها مع كل سيارة. |
| Card 1 title | Curation | الانتقاء |
| Card 1 | If it's here, it earned its place. | إن كانت هنا، فقد استحقّت مكانها. |
| Card 2 title | Certainty | اليقين |
| Card 2 | Inspected, documented, history-checked. Every car, every time. | مفحوصة، موثّقة، ومتحقَّق من تاريخها. كل سيارة، في كل مرة. |
| Card 3 title | Concierge | الكونسيرج |
| Card 3 | One person, from your first message to the keys. | شخص واحد يرافقك من أول رسالة حتى المفاتيح. |

Motion: on desktop the section pins for `1.5` viewports and the three cards slide up one after another into a stack (the "stacking cards" pattern), the photo pans `60px`; on mobile simple staggered reveals.

### H5 · The marques — marquee
- **Images:** none (SVG logos on tiles, §3.7). Background: `--carbon` with the diamond watermark at 3%.
- **Layout:** eyebrow + one line, then the marquee, full-bleed.

| Element | EN | AR |
|---|---|---|
| Eyebrow | THE MARQUES | العلامات |
| Line | Names that need no introduction. | أسماء لا تحتاج إلى تعريف. |

### H6 · Come after dark — the showroom
- **Image:** `SH-05-D/-M` (the Cullinan alone in a pool of light, after closing), full-bleed, `100vh` / `90svh`.
- **Layout:** copy bottom-start over the dark third; a single glass button.

```
D ┌───────────────────────────────────────────────────────────────────┐
  │ ████████████████████ dark showroom ████████████████████████████   │
  │ ████████████████████████████████  ██ pool of light ██  ████████   │
  │ ████████████████████████████████  ████ CULLINAN ████  █████████   │
  │ ◆ THE SHOWROOM                                                    │
  │ Come after dark.                                                  │
  │ The showroom is at its best at night. So are the cars.            │
  │ [ Plan your visit ↗ ]                                             │
  └───────────────────────────────────────────────────────────────────┘
```

| Element | EN | AR |
|---|---|---|
| Eyebrow | THE SHOWROOM | المعرض |
| H2 | Come after dark. | تعال بعد الغروب. |
| Sub | The showroom is at its best at night. So are the cars. | المعرض في أبهى صوره ليلاً. وكذلك السيارات. |
| Button | Plan your visit | خطّط لزيارتك |

Motion: background scale `1.08→1` over the section's scroll (Ken Burns by scroll, not by time).

### H7 · Featured — the one we'd take home
- **Images:** `CGT-BG-D/-M` + `CGT-CUT-B` (pure side profile — the fastback line deserves it). Giant word `AZURE` / `أزور`. This is the second and last Scene on the Home page.
- **Layout (D):** the car centred and large (70% width), the word centred above it, copy centred beneath — the one centred scene on the page, so it feels like an exhibit. **(M):** stacked as §3.9. Temperature: cool — it follows the warm showroom section and precedes the warm doorway, on purpose.

| Element | EN | AR |
|---|---|---|
| Eyebrow | FEATURED | الاختيار المميّز |
| Giant word | AZURE | أزور |
| Name | Bentley Continental GT Azure · Cambrian Grey | بنتلي كونتيننتال جي تي أزور · رمادي كامبريان |
| Line | Built for the long way home. | صُنعت للطريق الطويل إلى البيت. |
| Button | Explore this car | اكتشف هذه السيارة |

### H8 · The doors open for you — private viewing
- **Image:** `HM-VIEW-D/-M` (the open glass doors, light spilling onto the pavement).
- **Layout:** centred copy in the middle of the doorway light; two buttons side by side (stacked on mobile).

| Element | EN | AR |
|---|---|---|
| Eyebrow | PRIVATE VIEWING | معاينة خاصة |
| H2 | The doors open for you. | الأبواب تُفتح لك. |
| Sub | At your hour. In the showroom, or at your residence. | في الوقت الذي يناسبك. في المعرض، أو في مقرّ إقامتك. |
| Primary | Arrange a viewing | رتّب معاينة |
| Secondary (WhatsApp) | Message the concierge | راسل الكونسيرج |

### H9 · Visit strip
- **Image:** `HM-MAP-D/-M` behind; on desktop a glass panel end-side holds the details and a dark-styled live map thumbnail; on mobile the panel is full-width.

| Element | EN | AR |
|---|---|---|
| Eyebrow | VISIT | زيارة |
| Line | Riyadh. [District]. Open daily. | الرياض. [الحي]. يومياً. |
| Details | [Address] · [Hours] · [Phone] | [العنوان] · [الساعات] · [الهاتف] |
| Link | Get directions | الاتجاهات |

### H10 · Footer — §3.15

---
## 6. The Collection — `/collection`

Purpose: every car, one per row, each in its own world. This page is the reason the site exists; it must never feel like a catalogue.

### C1 · Hero
- **Image:** `CO-HERO-BG-D/-M` (six silhouettes in the dark). No cut-out. Giant word over the dark upper half.
- **Layout:** eyebrow, giant word, headline, sub; the filter chips sit on the bottom edge of the hero and become sticky under the nav on scroll.

```
D ┌───────────────────────────────────────────────────────────────────┐
  │ ◆ THE COLLECTION                                                  │
  │              ≡≡≡≡≡ C O L L E C T I O N ≡≡≡≡≡                      │
  │ Each one, given the room it deserves.                             │
  │ No two alike. None shown alike.                                   │
  │ ███ ▲silhouette ███ ▲ ███ ▲ ███ ▲ ███ ▲ ███ ▲ ███ (rims lit)      │
  │ (All) (SUV) (Grand Tourer) (Saloon) (Sports)         10 cars      │
  └───────────────────────────────────────────────────────────────────┘
M ┌──────────────────────┐
  │ ◆ THE COLLECTION     │
  │  ≡ COLLECTION ≡      │
  │ Each one, given the  │
  │ room it deserves.    │
  │ ███ silhouettes ███  │
  │ (All)(SUV)(GT)(Saloon)(Sports)→ │
  └──────────────────────┘
```

| Element | EN | AR |
|---|---|---|
| Eyebrow | THE COLLECTION | المجموعة |
| Giant word | COLLECTION | المجموعة |
| H1 | Each one, given the room it deserves. | لكلٍّ منها المساحة التي تستحق. |
| Sub | No two alike. None shown alike. | لا اثنتان متشابهتان. ولا تُعرض اثنتان بالطريقة نفسها. |
| Filters | All · SUV · Grand Tourer · Saloon · Sports | الكل · دفع رباعي · جراند تورر · سيدان · رياضية |
| Count | 10 cars | 10 سيارات |

### C2 · The rows — eight rows, ten cars, three treatments

The order is built on two rules (§3.12): no two consecutive rows share a treatment, and no two consecutive rows share a temperature. Silhouettes alternate too (SUV / saloon / sports / GT), so the page never shows two similar shapes in a row.

| # | Row | Cars | Treatment | Temperature | Image(s) |
|---|---|---|---|---|---|
| 1 | The Courtyard | Rolls-Royce Cullinan | **Scene** — `CULLINAN` behind the car | Warm | `CUL-BG-D/-M` + `CUL-CUT-A/-B` |
| 2 | The District · The Villa | S-Class · Yukon Denali | **Cards**, pair | Neutral-cool · Warm | `SCL-CARD` · `YUK-CARD` |
| 3 | The Light Lines | Corvette C8 Stingray | **Photograph** | Neutral (the car is the colour) | `C8-HERO-D/-M` |
| 4 | The Salon | Bentley Flying Spur Mulliner | **Scene, light** — `MULLINER` in ink on the pale room | Pale | `FSM-BG-D/-M` + `FSM-CUT-A/-B` |
| 5 | The Sandstone | Range Rover Autobiography | **Photograph** | Cool | `RRA-HERO-D/-M` |
| 6 | The Bunker · The Wadi | Urus · G 63 | **Cards**, pair | Cold · Cool | `URU-CARD` · `G63-CARD` |
| 7 | The Coast Road | Bentley Continental GT Azure | **Scene** — `AZURE` behind the car | Cool | `CGT-BG-D/-M` + `CGT-CUT-A/-B` |
| 8 | The Pass | Porsche 911 | **Photograph** | Warm | `911-HERO-D/-M` |

```
D  ┌─────────────────────────────────────────────┐
 1 │ ≡ CULLINAN ≡  ████ car ████        (warm)   │  Scene
   ├─────────────────────────────────────────────┤
 2 │ ┌ S-CLASS card ┐   ┌ DENALI card ┐          │  Cards, in the container
   ├─────────────────────────────────────────────┤
 3 │ ═══ light lines ═══ ██ CORVETTE ██ (neutral)│  Photograph, copy end-side
   ├─────────────────────────────────────────────┤
 4 │ ░░░ pale room ░░░ ≡ MULLINER ≡ ██ car ██    │  Scene, light — the beat
   ├─────────────────────────────────────────────┤
 5 │ ████ monolith ████ ██ RANGE ROVER ██ (cool) │  Photograph, copy start-side
   ├─────────────────────────────────────────────┤
 6 │ ┌ URUS card ┐      ┌ G 63 card ┐            │  Cards
   ├─────────────────────────────────────────────┤
 7 │ ≡ AZURE ≡  ████ car ████           (cool)   │  Scene
   ├─────────────────────────────────────────────┤
 8 │ ████ tunnel ████ ██ 911 ██         (warm)   │  Photograph, copy end-side
   └─────────────────────────────────────────────┘
M  every row full-width, one car under the other; card pairs stack into two single cards.
```

Photograph rows alternate the copy side (3 end, 5 start, 8 end). On filter, rows animate out (`opacity`, `scale .98`) and the remaining ones close the gap (`FLIP`); a filtered view that leaves one card of a pair shows it at full width. The rule "no two consecutive rows share a treatment" is relaxed under filters — content wins.

### C3 · Not here?
- **Image:** `SV-01-D/-M` (the aircraft ramp).
- **Layout:** centred glass panel.

| Element | EN | AR |
|---|---|---|
| H2 | Looking for something not here? | تبحث عن سيارة ليست هنا؟ |
| Sub | Name it. We'll find it. | سمِّها، ونجدها لك. |
| Button | Ask us to source it | اطلب توفيرها |

### 6.3 The car data — words, worlds, reference specs

Reference specs are typical for the model and variant; **verify every figure against the actual chassis** and replace bracketed fields before publishing.

| Code | Marque · model | Giant word (Scene cars only) | Environment · treatment | Whisper (EN) | Whisper (AR) | Reference specs (verify) |
|---|---|---|---|---|---|---|
| CUL | Rolls-Royce Cullinan | CULLINAN / كولينان | The Courtyard · Scene | Effortless, everywhere. | بلا جهد، في كل مكان. | 6.75 V12 twin-turbo · 563 hp · 0–100 5.2 s · AWD |
| CGT | Bentley Continental GT Azure, Cambrian Grey | AZURE / أزور | The Coast Road · Scene | Built for the long way home. | صُنعت للطريق الطويل إلى البيت. | 4.0 V8 twin-turbo · 542 hp · 4.0 s · AWD *(W12 Azure: 650 hp · 3.7 s)* |
| FSM | Bentley Flying Spur Mulliner | MULLINER / مولينر | The Salon · Scene, light | Arrive as you should. | لتصل كما يليق بك. | 6.0 W12 · 626 hp · 3.8 s *(V8: 542 hp · 4.1 s)* |
| SCL | Mercedes-Benz S-Class 2022 | — | The District · Card | Still the standard. | المعيار، حتى الآن. | S 500: 3.0 I6 + EQ Boost · 429 hp · 4.9 s *(S 580: 4.0 V8 · 496 hp · 4.4 s)* |
| RRA | Range Rover Autobiography 2024 (74) | — | The Sandstone · Photograph | Above it all. | فوق كل شيء. | P530: 4.4 V8 twin-turbo · 523 hp · 4.6 s *(P400: 3.0 I6 · 395 hp · 5.8 s)* |
| YUK | GMC Yukon Denali | — | The Villa · Card | Room for everyone who matters. | متّسع لكل من يهمّك. | 6.2 V8 · 420 hp · ~6.0 s · 10-speed |
| C8 | Chevrolet Corvette C8 Stingray | — | The Light Lines · Photograph | The heart, moved to the middle. | القلب، في المنتصف. | 6.2 LT2 V8 · 495 hp · 0–100 ~3.0 s · RWD · 8-DCT |
| URU | Lamborghini Urus | — | The Bunker · Card | The fastest way to make an entrance. | أسرع طريقة لتلفت الأنظار. | 4.0 V8 twin-turbo · 650 hp · 3.6 s *(S: 666 hp · 3.5 s)* |
| 911 | Porsche 911 (992) | — | The Pass · Photograph | Six decades of getting it right. | ستة عقود من الإتقان. | Carrera: 3.0 flat-6 twin-turbo · 385 hp · 4.2 s *(Carrera S: 450 hp · 3.7 s)* |
| G63 | Mercedes-AMG G 63 | — | The Wadi · Card | Unmoved by anything. | لا يهزّه شيء. | 4.0 V8 biturbo · 577 hp · 4.5 s *(2024+: 585 hp)* |

Category tags: CUL SUV · CGT Grand Tourer · FSM Saloon · SCL Saloon · RRA SUV · YUK SUV · C8 Sports · URU SUV · 911 Sports · G63 SUV.

---

## 7. Car detail — `/collection/[slug]`

Purpose: make one car feel like the only car. Eight sections; the enquiry is always one thumb away via the sticky bar.

### D1 · Hero — the Photograph, full-bleed
- **Images:** `[CODE]-HERO-D/-M` — the car in its environment, one composed photograph (§3.10). No giant word, no cut-out: the detail page opens on the photograph and lets the name do the work in Display XL. (For the three Scene cars the CMS flag `heroTreatment: "scene"` may switch this hero to the Scene, so the detail page continues the Collection row — optional, not default.)
- **Layout:** `100vh` / `100svh`; copy bottom-start over the dark side of the photograph; liquid badge top-start (availability); environment caption with its accent dot top-end. Light room (FSM): the same layout on `--salon` with ink type.

```
D ┌───────────────────────────────────────────────────────────────────┐
  │ (● Available)                                   ● The Coast Road  │
  │ ████ indigo sea ██████████████████████████████████████████████    │
  │ ██████████████████████████████████ ████ CONTINENTAL GT ████ ████  │
  │ ◆ BENTLEY · 2023                                                  │
  │ Continental GT Azure                                              │
  │ Cambrian Grey over Linen                                          │
  │ Built for the long way home.                                      │
  │ [ Enquire ↗ ]  [ Message the concierge ]                          │
  └───────────────────────────────────────────────────────────────────┘
M ┌──────────────────────┐
  │(● Available) ● The Coast Road│
  │ ████ CGT-HERO-M ████ │
  │ ██████ car ████████  │
  │ ◆ BENTLEY · 2023     │
  │ Continental GT Azure │
  │ Cambrian Grey over Linen │
  │ Built for the long   │
  │ way home.            │
  │ [ Enquire ↗ ]        │
  │ [ Message the concierge ] │
  └──────────────────────┘
```

| Element | EN | AR |
|---|---|---|
| Eyebrow | [MARQUE] · [YEAR] | [العلامة] · [السنة] |
| H1 | [Model] [Variant] | [الموديل] [الفئة] |
| Colour line | [Exterior] over [Interior] | [اللون الخارجي] مع مقصورة [الداخلية] |
| Whisper | per §6.3 | per §6.3 |
| Primary | Enquire | استفسر |
| Secondary | Message the concierge | راسل الكونسيرج |

### D2 · At a glance — glass strip
Eight spec chips in one `.glass` strip overlapping the hero's bottom edge by `48px`. Mobile: horizontal scroll-snap.

| Label EN | Label AR |
|---|---|
| Engine | المحرك |
| Power | القوة |
| 0–100 km/h | 0–100 كم/س |
| Drivetrain | نظام الدفع |
| Year | السنة |
| Mileage | المسافة المقطوعة |
| Exterior | اللون الخارجي |
| Interior | الداخلية |

### D3 · In brief — the story
- **Image:** `[CODE]-DET-01` (exterior macro), 4:3, end-side; copy start-side. Mobile: image first, then copy.

| Element | EN | AR |
|---|---|---|
| Eyebrow | IN BRIEF | باختصار |
| Story | per §7.9 | per §7.9 |

### D4 · Every angle — gallery
- **Images:** `[CODE]-HERO-D`, `[CODE]-DET-03`, `[CODE]-HERO-M` (portrait tile), and the retouched real photos (`RT-CAR`). Desktop: a 3-column masonry with one 2-column-wide tile. Mobile: horizontal scroll, `86vw` tiles, snap, a hairline progress bar beneath. Tap opens a full-screen obsidian lightbox with swipe.

| Element | EN | AR |
|---|---|---|
| Eyebrow | GALLERY | المعرض المصوّر |
| H2 | Every angle. | من كل زاوية. |

### D5 · Inside
- **Image:** `[CODE]-DET-02` full-bleed, `80vh`. One caption line, bottom-start.

| Element | EN | AR |
|---|---|---|
| H2 | Inside. | من الداخل. |
| Caption | [Interior colour], [material], [notable feature]. | [لون الداخلية]، [الخامة]، [ميزة بارزة]. |

### D6 · Papers in order — provenance
- **Image:** `CD-PROV-01` behind; glass chips over the dark half.

| Element | EN | AR |
|---|---|---|
| Eyebrow | PROVENANCE | الأصل والتوثيق |
| H2 | Papers in order. | الأوراق مكتملة. |
| Chips (show those that apply) | Full service history · Accident-free · [GCC / UK / US] specification · Manufacturer warranty to [date] · Two keys · Inspection report available | سجل صيانة كامل · خالية من الحوادث · مواصفات [خليجية / بريطانية / أمريكية] · ضمان الوكيل حتى [التاريخ] · مفتاحان · تقرير فحص متاح |
| Link | Request the inspection report | اطلب تقرير الفحص |

### D7 · Enquire
- **Image:** `CD-KEY-01` start-side (4:3) or, on mobile, as the blurred background behind the glass form.

| Element | EN | AR |
|---|---|---|
| H2 | This car is available. Ask us anything. | هذه السيارة متاحة. اسألنا ما شئت. |
| Sub | Or reserve a private viewing — in the showroom, or at your residence. | أو احجز معاينة خاصة — في المعرض، أو في مقرّ إقامتك. |
| Fields | Name · Phone · Preferred date & time · Message | الاسم · الهاتف · التاريخ والوقت المفضّل · الرسالة |
| Submit | Request a viewing | اطلب معاينة |
| Success | Received. The concierge will be in touch within the hour. | وصلتنا رسالتك. سيتواصل معك الكونسيرج خلال ساعة. |

If the car is **Reserved**: H2 becomes "This car is reserved. We may have another." / "هذه السيارة محجوزة. قد يكون لدينا مثلها." If **Sold**: "This car has found its home. Ask about the next one." / "وجدت هذه السيارة بيتها. اسأل عن التالية."

### D8 · Also in residence
Two or three Cards (§3.11) — a pair on desktop, stacked on mobile — of cars in the same category, then the next in the list. Every car has a `-CARD` for this purpose once it has been generated; until then the card uses `-HERO-M` cropped to 4:5.

| Element | EN | AR |
|---|---|---|
| Eyebrow | ALSO IN RESIDENCE | أيضاً في المعرض |
| Link | See the whole collection | شاهد المجموعة كاملة |

### 7.9 Stories — "In brief" copy per car

Three sentences each. Bracketed fields come from the CMS.

**CUL — Rolls-Royce Cullinan**
EN: The first SUV Rolls-Royce ever built, and still the only one that feels like a Rolls-Royce. A 6.75-litre V12 you never hear, a cabin you never want to leave, and a ride that makes Riyadh's roads feel freshly paved. This example is [colour] over [interior], with [notable options].
AR: أول سيارة دفع رباعي تصنعها رولز رويس، ولا تزال الوحيدة التي تشعر فيها بأنك في رولز رويس. محرك V12 سعة 6.75 لتر لا تسمعه، ومقصورة لا ترغب في مغادرتها، وقيادة تجعل طرق الرياض تبدو وكأنها رُصفت للتو. هذه النسخة بلون [اللون] مع مقصورة [الداخلية]، و[الخيارات البارزة].

**CGT — Bentley Continental GT Azure**
EN: Azure is Bentley's word for comfort — the Continental GT specified for long roads rather than lap times. Cambrian Grey over [interior], the fastback line uninterrupted, the V8 quiet until asked. It is the car in this collection we would take home.
AR: «أزور» هي كلمة بنتلي للراحة — كونتيننتال جي تي مُعدّة للطرق الطويلة لا لأزمنة اللفات. رمادي كامبريان مع مقصورة [الداخلية]، خط السقف الانسيابي بلا انقطاع، ومحرك V8 هادئ حتى يُطلب منه غير ذلك. هي السيارة التي نختار أن نعود بها إلى البيت من هذه المجموعة.

**FSM — Bentley Flying Spur Mulliner**
EN: Mulliner is Bentley's coachbuilder, and this is the Flying Spur at its most complete: the double-diamond grille, the quilting repeated on every surface, the rear cabin arranged for the person who is driven. [Colour] over [interior]. Arrive as you should.
AR: «مولينر» هي ورشة التفصيل الخاصة في بنتلي، وهذه فلاينغ سبير في أكمل صورها: الشبك الماسي المزدوج، والخياطة المعيّنة المتكررة على كل سطح، والمقصورة الخلفية المعدّة لمن يُقاد به. [اللون] مع مقصورة [الداخلية]. لتصل كما يليق بك.

**SCL — Mercedes-Benz S-Class 2022**
EN: For seventy years the S-Class has been the car every other saloon is measured against. The 2022 car is the quietest, the most intelligent, and — in the back — the most restful yet. [Variant], [colour] over [interior], [mileage] km.
AR: على مدى سبعين عاماً، ظلّت إس-كلاس السيارة التي تُقاس بها كل سيارة سيدان أخرى. نسخة 2022 هي الأهدأ والأذكى، وفي المقعد الخلفي، الأكثر راحة حتى اليوم. [الفئة]، [اللون] مع مقصورة [الداخلية]، [المسافة] كم.

**RRA — Range Rover Autobiography 2024 (74)**
EN: The fifth-generation Range Rover, in Autobiography specification — the one with everything. Registered in 2024 on a 74 plate, [colour] over [interior], [engine]. As composed on the Riyadh ring road as it is on sand.
AR: الجيل الخامس من رينج روفر، بمواصفات أوتوبايوغرافي — النسخة التي لا ينقصها شيء. مسجّلة عام 2024 على لوحة 74، [اللون] مع مقصورة [الداخلية]، [المحرك]. متّزنة على الطريق الدائري في الرياض كما هي على الرمال.

**YUK — GMC Yukon Denali**
EN: The Denali is the Yukon at its most generous: the 6.2-litre V8, the air suspension, the captain's chairs, and a quiet that belies its size. [Colour] over [interior]. Room for everyone who matters.
AR: دينالي هي يوكن في أكثر صورها سخاءً: محرك V8 سعة 6.2 لتر، وتعليق هوائي، ومقاعد كابتن، وهدوء لا يوحي بحجمها. [اللون] مع مقصورة [الداخلية]. متّسع لكل من يهمّك.

**C8 — Chevrolet Corvette C8 Stingray**
EN: The first mid-engine Corvette — the car Chevrolet spent sixty years working up to. A 6.2-litre V8 behind your shoulders, a cockpit that wraps around you, and a number on the stopwatch that embarrasses cars costing three times as much. [Colour], [mileage] km.
AR: أول كورفيت بمحرك أوسط — السيارة التي أمضت شيفروليه ستين عاماً لتصل إليها. محرك V8 سعة 6.2 لتر خلف كتفيك، ومقصورة تلتفّ حولك، ورقم على ساعة التوقيت يُحرج سيارات تكلّف ثلاثة أضعاف. [اللون]، [المسافة] كم.

**URU — Lamborghini Urus**
EN: The Urus made the super-SUV a category, and it is still the definition. 650 horsepower, a stance that changes the mood of a street, and a cabin that never lets you forget where it was built. [Colour] over [interior].
AR: أوروس جعلت من «السوبر إس يو في» فئة قائمة بذاتها، ولا تزال تعريفها. 650 حصاناً، ووقفة تغيّر مزاج الشارع، ومقصورة لا تدعك تنسى أين صُنعت. [اللون] مع مقصورة [الداخلية].

**911 — Porsche 911**
EN: Six decades, eight generations, one shape. The 911 remains the car every enthusiast eventually arrives at, and the [variant] is the one to arrive at first. [Colour] over [interior], [mileage] km.
AR: ستة عقود، ثمانية أجيال، شكل واحد. لا تزال 911 السيارة التي يصل إليها كل عاشق للسيارات في النهاية، و[الفئة] هي التي تصل إليها أولاً. [اللون] مع مقصورة [الداخلية]، [المسافة] كم.

**G63 — Mercedes-AMG G 63**
EN: A shape unchanged since 1979 and a V8 that makes sure everyone knows it. The G 63 is the rare car that is equally at home in a wadi and outside the Ritz. [Colour] over [interior], [mileage] km.
AR: شكل لم يتغيّر منذ 1979، ومحرك V8 يحرص على أن يعلم الجميع بذلك. جي 63 هي السيارة النادرة التي تبدو في مكانها في الوادي كما هي أمام الريتز. [اللون] مع مقصورة [الداخلية]، [المسافة] كم.

---
## 8. The Showroom — `/showroom`

Purpose: the building is the brand. Show it glowing, tell the story in three paragraphs, and end with coffee.

### S1 · Hero — the façade at blue hour
- **Image:** `SH-01-D/-M` full-bleed. Giant word `RIYADH` / `الرياض` low in the sky above the sign (word between sky and building via the gradient — no cut-out layer; the word sits at 60% opacity so the sign stays the hero).

```
D ┌───────────────────────────────────────────────────────────────────┐
  │ ◆ THE SHOWROOM                                                    │
  │                 ≡≡≡≡≡ R I Y A D H ≡≡≡≡≡  (60% opacity, in the sky) │
  │ ████████████████ glass façade, sign glowing ███████████████████   │
  │ ██████████████████ cars behind the glass ██████████████████████   │
  │ Two floors of glass. One idea.                                    │
  │ That a car this rare deserves a room this quiet.                  │
  └───────────────────────────────────────────────────────────────────┘
```

| Element | EN | AR |
|---|---|---|
| Eyebrow | THE SHOWROOM | المعرض |
| Giant word | RIYADH | الرياض |
| H1 | Two floors of glass. One idea. | طابقان من الزجاج. فكرة واحدة. |
| Sub | That a car this rare deserves a room this quiet. | أن سيارة بهذه الندرة تستحق مكاناً بهذا الهدوء. |

### S2 · The story — three paragraphs
- **Image:** `SH-04` (the sign, macro) start-side, 4:3; copy end-side. Mobile: image, then copy.

| EN | AR |
|---|---|
| May Bach began with a simple refusal: to treat extraordinary cars as inventory. Each one is sought out, inspected and admitted — then given the space to be seen properly. | بدأت ماي باخ برفضٍ بسيط: أن تُعامَل السيارات الاستثنائية كمخزون. كل سيارة يُبحث عنها، وتُفحص، وتُقبل — ثم تُمنح المساحة لتُرى كما ينبغي. |
| Behind the glass on [Street], the floor is marble, the light is low, and the collection changes quietly through the year. | خلف الزجاج في [الشارع]، الأرض رخام، والضوء خافت، والمجموعة تتبدّل بهدوء على مدار العام. |
| You are welcome to walk in. Or to have us close the doors for you. | يسعدنا أن تدخل متى شئت. أو أن نغلق الأبواب من أجلك. |

### S3 · The numbers — four, no more
- **Image:** `SH-08-D/-M` (from the mezzanine) full-bleed; the four figures in Display L over the empty marble at the lower-start.

| EN | AR |
|---|---|
| 8 marques | 8 علامات |
| 2 floors | طابقان |
| 1 address | عنوان واحد |
| Licence 4447 | رخصة 4447 |

Motion: figures count up from 0 over `1200ms` when in view (the licence number does not animate).

### S4 · The space — three frames
- **Images:** `SH-03-D` (wide), `SH-07` (portrait), `SH-05-D` (wide) in an editorial layout: wide / tall / wide, with one-word captions in Small pewter.

| Caption EN | Caption AR |
|---|---|
| The floor. | الأرض. |
| The light. | الضوء. |
| After hours. | بعد الإغلاق. |

Mobile: stacked, full-width, `4:5` crops via `object-position` (or the `-M` variants).

### S5 · Coffee first — hospitality
- **Image:** `SH-09` (dallah and cups) end-side, 4:5; copy start-side.

| Element | EN | AR |
|---|---|---|
| Eyebrow | THE MAJLIS | المجلس |
| H2 | Coffee first. | القهوة أولاً. |
| Sub | Every visit begins in the majlis. The cars can wait a few minutes. | كل زيارة تبدأ في المجلس. السيارات تستطيع الانتظار بضع دقائق. |

### S6 · The marques — marquee (as H5)

### S7 · Visit CTA — as H8, with `SH-06-D/-M` as the image and the line "Come after dark." / "تعال بعد الغروب."

---

## 9. Services — `/services`

Purpose: show that the sale is the middle of the relationship, not the end. Six services, each a frosted-glass card on a macro photograph, sides alternating.

### V1 · Hero
- **Image:** `SV-HERO-D/-M` (the covered car in the dark showroom). Giant word `BEYOND` / `ما بعد`.

| Element | EN | AR |
|---|---|---|
| Eyebrow | SERVICES | الخدمات |
| Giant word | BEYOND | ما بعد |
| H1 | Beyond the sale. | ما بعد البيع. |
| Sub | What we take care of, so you don't have to. | ما نتكفّل به، كي لا تنشغل به. |

### V2–V7 · The six services
Each is a full-bleed `80vh` (`auto` on mobile, min `70svh`) photograph with one glass card (§3.4, `480px` wide) on the dark side, alternating start/end. The card holds a hairline icon, the eyebrow number, the title, one line, and a text link.

```
D ┌───────────────────────────────────────────────────────────────────┐
  │ ████████ aircraft ramp glowing ████████   ┌▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒┐  │
  │ ████████████████████████████████████████  │ 01 · SOURCING       │  │
  │ ████████ covered car ██████████████████   │ Name it.            │  │
  │ ████████████████████████████████████████  │ We'll find it.      │  │
  │                                           │ Any marque, any spec…│  │
  │                                           │ Ask the concierge ↗ │  │
  │                                           └▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒┘  │
  └───────────────────────────────────────────────────────────────────┘
M ┌──────────────────────┐
  │ ████ photo (top 45%) │
  │ ┌▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒┐ │  ← card overlaps the photo's dark lower half
  │ │ 01 · SOURCING     │ │
  │ │ Name it.          │ │
  │ │ We'll find it.    │ │
  │ │ Any marque…       │ │
  │ │ Ask the concierge↗│ │
  │ └▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒┘ │
  └──────────────────────┘
```

| # | Image | Title EN | Title AR | Line EN | Line AR |
|---|---|---|---|---|---|
| 01 Sourcing · التوفير | `SV-01` | Name it. We'll find it. | سمِّها، ونجدها لك. | Any marque, any specification, anywhere in the world — delivered to Riyadh. | أي علامة، أي مواصفات، من أي مكان في العالم — تصلك إلى الرياض. |
| 02 Finance · التمويل | `SV-02` | Terms as tailored as the car. | شروط مفصّلة كما السيارة. | Sharia-compliant financing through our banking partners, arranged discreetly. | تمويل متوافق مع الشريعة عبر شركائنا المصرفيين، بترتيب خاص. |
| 03 Trade-in · الاستبدال | `SV-03` | Your current car, valued fairly. | سيارتك الحالية، بتقييم عادل. | Appraised in a day. Collected from your door. | تُقيَّم في يوم. وتُستلم من باب منزلك. |
| 04 Registration & export · التسجيل والتصدير | `SV-04` | Papers, plates and borders — handled. | الأوراق واللوحات والحدود — نتكفّل بها. | Registration in the Kingdom, and enclosed shipping across the GCC and beyond. | التسجيل داخل المملكة، والشحن المغلق إلى دول الخليج وما بعدها. |
| 05 Aftercare · العناية | `SV-05` | Kept as it arrived. | تبقى كما وصلت. | Detailing, paint protection and servicing by people who know the marque. | تلميع، وحماية طلاء، وصيانة على يد من يعرفون العلامة. |
| 06 Delivery · التسليم | `SV-06` | To your door, under cover. | إلى بابك، تحت الغطاء. | On your schedule. In an enclosed transporter. Unveiled where you choose. | وفق جدولك. في ناقلة مغلقة. وتُكشف حيث تختار. |

Card link on every service: *Ask the concierge* / *اسأل الكونسيرج* → WhatsApp with the service name pre-filled.

### V8 · CTA — as H8 ("The doors open for you.")

---

## 10. Visit — `/visit`

Purpose: get them through the door, or get their number. The page is called the Majlis.

### M1 · Hero
- **Image:** `SH-06-D/-M` (the façade from across the boulevard). Giant word `MAJLIS` / `المجلس`.

| Element | EN | AR |
|---|---|---|
| Eyebrow | VISIT | زيارة |
| Giant word | MAJLIS | المجلس |
| H1 | You are expected. | نحن في انتظارك. |
| Sub | Walk in during opening hours, or tell us when to expect you. | تفضّل بزيارتنا خلال ساعات العمل، أو أخبرنا متى ننتظرك. |

### M2 · Details + map
- **Image:** `HM-MAP-D/-M` behind; a dark-styled live map (Mapbox/Google, custom obsidian style, one platinum pin shaped like the emblem) start-side; a glass panel end-side with the details. Mobile: details panel, then the map at `60vw` height.

| Element | EN | AR |
|---|---|---|
| Address | [Street], [District], Riyadh | [الشارع]، [الحي]، الرياض |
| Hours | Saturday–Thursday 10:00–22:00 · Friday 16:00–22:00 *(confirm)* | السبت–الخميس 10:00–22:00 · الجمعة 16:00–22:00 |
| Phone | +966 [XX XXX XXXX] | +966 [XX XXX XXXX] |
| WhatsApp | Message the concierge | راسل الكونسيرج |
| Email | [hello@maybach.sa] | [hello@maybach.sa] |
| Link | Get directions | الاتجاهات |
| Note | Private parking at the rear entrance. | مواقف خاصة عند المدخل الخلفي. |

### M3 · The form
- **Image:** `SH-09` (coffee) start-side on desktop, 4:5; the form end-side on `BR-03`. Mobile: form only, `SH-09` as a small `4:5` tile above.

| Element | EN | AR |
|---|---|---|
| H2 | Tell us when to expect you. | أخبرنا متى ننتظرك. |
| Fields | Name · Phone · Car of interest (optional) · Preferred date & time · Message | الاسم · الهاتف · السيارة التي تهمّك (اختياري) · التاريخ والوقت المفضّل · الرسالة |
| Submit | Request a viewing | اطلب معاينة |
| Success | Received. We'll be in touch within the hour. | وصلتنا رسالتك. سنتواصل معك خلال ساعة. |
| Aside | Prefer to talk? The concierge answers WhatsApp 10:00–22:00. | تفضّل الحديث؟ الكونسيرج يجيب على واتساب من 10:00 إلى 22:00. |

### M4 · Hospitality line
One centred line over `HM-VIEW-D/-M`: "Coffee first. The cars can wait a few minutes." / "القهوة أولاً. السيارات تستطيع الانتظار بضع دقائق."

---

## 11. 404

- **Image:** `UT-404-D/-M` (the empty pool of light).

| Element | EN | AR |
|---|---|---|
| Giant word | 404 | 404 |
| H1 | Nothing here. Yet. | لا شيء هنا. بعد. |
| Button | Back to the collection | العودة إلى المجموعة |

---
## 12. Content model (CMS)

One `Car` document drives a collection row, a detail page, the featured section, and every "also in residence" reference. Fields marked `(en/ar)` are localised.

```ts
type Car = {
  slug: string;                       // "rolls-royce-cullinan"
  code: string;                       // "CUL" — ties to the image set
  marque: string;                     // "Rolls-Royce"
  model: string;                      // "Cullinan"
  variant?: string;                   // "Series II", "Mulliner", "Azure"
  year: number;                       // 2024
  registration?: string;              // "74 plate (UK, 2024)"
  category: "SUV" | "Grand Tourer" | "Saloon" | "Sports";
  availability: "available" | "reserved" | "sold";
  featured: boolean;
  order: number;                      // manual sort on the Collection page
  treatment: "scene" | "photograph" | "card";     // how the Collection row is built (02 → §3.9–3.11)
  scene: "dark" | "light";                        // "light" only for the Salon (FSM)
  heroTreatment: "photograph" | "scene";          // detail-page hero; "photograph" by default
  temperature: "warm" | "cool" | "neutral" | "cold" | "pale";   // 01 → §0.9 — used to validate row order
  accent: string;                                 // --scene-accent, e.g. "#7D8EA3" (02 → §2.1)
  giantWord?: { en: string; ar: string };         // "CULLINAN" / "كولينان" — Scene cars only
  environment: { en: string; ar: string };        // "The Courtyard" / "الفناء"
  whisper: { en: string; ar: string };            // one line
  story: { en: string; ar: string };              // three sentences
  exterior: { en: string; ar: string };           // "Cambrian Grey"
  interior: { en: string; ar: string };
  specs: {
    engine: string; power: string; acceleration: string; drivetrain: string;
    mileageKm: number; specification: "GCC" | "UK" | "US" | "EU" | "Other";
    warrantyUntil?: string; serviceHistory: boolean; accidentFree: boolean; keys: number;
  };
  images: {
    bgD: Image; bgM: Image;           // [CODE]-BG-D / -M
    cutA?: Image; cutB?: Image;       // transparent — Scene cars only
    heroD: Image; heroM: Image;       // composed photograph — Photograph rows and detail heroes
    card?: Image;                     // 4:5 portrait — Card cars (falls back to heroM cropped)
    details: Image[];                 // DET-01..03
    interior: Image;                  // DET-02
    gallery: Image[];                 // retouched real photos (RT-CAR)
  };
  seo: { title: { en; ar }; description: { en; ar } };
};
```

Also: `Service` (6 fixed), `Marque` (name, SVG logo, order), `SiteSettings` (address, hours, phone, WhatsApp number, email, social links, licence number), `Page` blocks for the Showroom story. Recommended CMS: **Sanity** (localised fields, image pipeline with hotspot/crop, live preview) or **Payload**. Arabic and English are two locales of one document, never two documents.

Environment names in Arabic (for the caption): The Courtyard الفناء · The Coast Road طريق الساحل · The Salon الصالون · The District الحيّ المالي · The Sandstone الصخور الرملية · The Villa الفيلا · The Light Lines خطوط الضوء · The Bunker الملجأ · The Pass الممرّ الجبلي · The Wadi الوادي.

A CMS validation rule worth writing: when the Collection order is saved, warn if two consecutive rows share a `treatment` or a `temperature`.

---

## 13. Build notes

### 13.1 Stack
- **Next.js 15** (App Router, React Server Components) + TypeScript. `next-intl` for `/` and `/ar` with `dir` set on `<html>`.
- **Tailwind v4** with the tokens in §2 as CSS variables; no arbitrary colours in markup.
- **GSAP + ScrollTrigger** for pins, parallax, stacking cards; **Lenis** for smooth scroll; **Framer Motion** for component-level reveals and the page transition.
- **next/image** with AVIF/WebP, `sizes` per breakpoint, blur placeholders generated at build; `<picture>` with `-M` under `768px`.
- **Sanity** (or Payload) as CMS; **Resend** for form email; WhatsApp deep links; **Vercel** hosting, edge-cached.
- **Fonts:** self-hosted WOFF2, `font-display: swap`, preloaded display faces, Arabic subset loaded only on `/ar`.

### 13.2 Performance budget (mobile, 4G, mid-range Android)
- LCP ≤ 2.5 s — the hero background `-M` is `priority`, ≤ 180 KB AVIF; the cut-out ≤ 200 KB WebP-alpha; the giant word is real text so it paints instantly.
- CLS = 0 — every image has intrinsic `width/height`; the giant word reserves its box with `min-height`.
- INP ≤ 200 ms — GSAP animations on `transform`/`opacity` only; `backdrop-filter` limited to elements currently in view (`content-visibility: auto` on rows).
- Total JS on the home page ≤ 180 KB gzipped; GSAP loaded once, ScrollTrigger lazily.
- Collection page: rows beyond the first three lazy-load images with `rootMargin: 100%`.
- Lighthouse targets: Performance ≥ 90 mobile, Accessibility 100, SEO 100.

### 13.3 SEO & structured data
- JSON-LD `AutoDealer` on every page (name, address, geo, opening hours, telephone, sameAs social).
- JSON-LD `Car` / `Vehicle` on each detail page (brand, model, vehicleModelDate, mileageFromOdometer, color, vehicleInteriorColor, offers with `availability` and `priceSpecification` omitted).
- `hreflang` pairs for `en` / `ar`; canonical per locale.
- Titles and descriptions per §4.5; image `alt` per §2.10.
- Instagram-first social: every car's `HERO-M` doubles as the story asset; `BR-04` as the default share image.

### 13.4 Analytics & conversion
- GA4 + Meta Pixel + Snap Pixel (Snapchat is a major channel in KSA). Events: `view_car`, `enquire_click`, `whatsapp_click`, `viewing_requested`, `filter_change`, `gallery_open`.
- Form → email to the concierge + WhatsApp notification via the Business API (phase 2).

### 13.5 Phase 2 ideas (not in this scope)
- A 6-second silent hero loop (the showroom lights coming on, or the Continental GT on the coast road) with the still as poster.
- 360° interior for each car (Sanity + a lightweight viewer).
- "Sold" archive page — the cars that have passed through, as proof of the collection's calibre.
- Client login for reserved-car documents.

---

## 14. Build checklist

**Foundations**
- [ ] Tokens (§2) in `globals.css`, including the light-room tokens and one `--scene-accent` per car; no colour token exists for the interface itself.
- [ ] Fonts self-hosted, subsets, preload; Arabic locale switches families.
- [ ] `Scene` component (§3.9) with `bg`, `word`, `car`, `copy` slots; desktop/mobile compositions; `light` variant; fallback to `HERO` image. Used in five places only.
- [ ] `PhotographRow` (§3.10) and `CarCard` + `CardPair` (§3.11); a `CollectionRows` composer that renders the treatment per car and enforces the rhythm rule (§3.12).
- [ ] `GlassCard`, `LiquidBadge`, `SpecChip`, `Eyebrow`, `Button` (5 variants), `FilterChips`, `MarqueMarquee`, `StickyBar`, `Nav` (transparent → glass pill; full-screen overlay), `Footer`, `Preloader`, `PageTransition`, `Cursor` (desktop only).
- [ ] Grain overlay, section fades, legibility gradients.
- [ ] Reduced-motion paths for every animation.

**Pages**
- [ ] Home H1–H10 · Collection C1–C3 · Car detail D1–D8 · Showroom S1–S7 · Services V1–V8 · Visit M1–M4 · 404.
- [ ] RTL pass on every page with real Arabic copy from this document; check the car stays un-mirrored and the glass card swaps sides.

**Content**
- [ ] Ten cars entered with verified specs, colours, mileage; whisper, story, giant word per §6.3 / §7.9.
- [ ] Every image ID from `01-imagery-prompts.md` generated, cut, graded, exported (AVIF + WebP + PNG-alpha for cut-outs), named per §0.2 of that document.
- [ ] Address, hours, phone, WhatsApp, email, social handles confirmed with the client.

**QA**
- [ ] Lighthouse mobile ≥ 90 / 100 / 100; LCP on a throttled 4G under 2.5 s on the Home and Collection pages.
- [ ] Contrast checks on every photographic section with the overlay in place.
- [ ] Forms deliver; WhatsApp links open with the right pre-filled text in both languages.
- [ ] Sold/Reserved states render on rows and detail pages.

---

## 15. Image index — where every image is used

| Image ID | Used in |
|---|---|
| BR-01 / BR-02 | Nav, footer, preloader, favicon, dividers, watermark |
| BR-03-D/-M | Nav overlay, forms, footer, statement fallbacks |
| BR-04 | OG / share |
| SH-01-D/-M | Showroom S1 |
| SH-02-D/-M | Services SV-04 base, Visit |
| SH-03-D/-M | Showroom S4 "The floor"; architecture reference |
| SH-04 | Showroom S2 |
| SH-05-D/-M | Home H6, Showroom S4 "After hours", Services hero base, 404 base |
| SH-06-D/-M | Visit M1, Showroom S7, Home H9 alt |
| SH-07 | Showroom S4 "The light" |
| SH-08-D/-M | Showroom S3 |
| SH-09 | Showroom S5, Visit M3 |
| SH-10 | Showroom S2 alt, 404 alt |
| HM-HERO-BG-D/-M + CUL-CUT-A/B | Home H1 |
| HM-HERO-STILL-D/-M | Home H1 fallback |
| HM-STATEMENT-BG-D/-M | Home H2 |
| RRA-HERO · SCL-CARD · YUK-CARD · C8-HERO | Home H3 (photograph, card pair, photograph) |
| HM-WHY-BG-D/-M (alt HM-WHY-ALT) | Home H4 |
| CGT-BG + CGT-CUT-B | Home H7 |
| HM-VIEW-D/-M | Home H8, Services V8, Visit M4 |
| HM-MAP-D/-M | Home H9, Visit M2 |
| CO-HERO-BG-D/-M | Collection C1 |
| CUL, CGT, FSM (BG + CUT) | Collection C2 Scene rows 1, 7, 4 |
| C8, RRA, 911 (HERO) | Collection C2 Photograph rows 3, 5, 8 |
| SCL, YUK, URU, G63 (CARD) | Collection C2 Card rows 2, 6; "Also in residence" |
| Every car's HERO-D/-M + DET-01/02/03 | Car detail D1, D3–D5 |
| SV-01-D/-M | Collection C3, Services 01 |
| CD-KEY-01 | Car detail D7, Services 02 base |
| CD-PROV-01 | Car detail D6, Services 03 base |
| SV-HERO, SV-02…SV-06 | Services V1–V7 |
| CT-DOOR-01 | Form success states |
| UT-GLOW-01 | Preloader, forms, empty states |
| UT-404-D/-M | 404 |

---

## 16. Open questions for the client

1. Exact street address, district, opening hours, phone, WhatsApp number, email, social handles.
2. Confirm the name is written "MAY BACH" (two words) everywhere, and whether a `.sa` domain is registered.
3. Verified specification, mileage, colour and interior for each of the ten cars; which Continental GT / Flying Spur / S-Class / Range Rover engine variants they are; whether the Urus, 911 and G 63 seen in the photographs are for sale.
4. Two to four clean photographs per car (front ¾, side, rear ¾, interior) for the image generation.
5. Which banks are finance partners (named or unnamed on the site).
6. Whether "Sold" cars stay visible as an archive.
7. Whether the site launches bilingual on day one or English first with Arabic two weeks after (the design is built for both either way).
