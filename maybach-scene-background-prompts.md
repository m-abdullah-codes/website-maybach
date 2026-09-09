# MAY BACH — Scene backgrounds: audit and replacement prompts

**Companion to** `docs/01-imagery-prompts.md` (house prompt style, reusable blocks) and
`docs/02-site-blueprint-design-system.md → §3.9` (the Scene).
**Written:** September 2026
**Status: DONE.** All six images (four required + the two optional) were generated from the prompts below
and are in `public/images` as `mb-cul-bg-d/-m`, `mb-cgt-bg-d/-m` and `mb-hm-feat-bg-d/-m`. The two new
`HM-FEAT-BG` entries are in `content/image-manifest.json`, the Home featured section points at them, and
`npm run blur` has been re-run. The originals are recoverable from git (`git show 74405fb:public/images/mb-cul-bg-d.png > out.png`).
The prompts are kept below so a room can be regenerated without reconstructing the brief.
**Still open:** the environment-caption decision in §6.

---

## 1. What was audited

The "text sandwiched between the car and a background" construction is **the Scene** (`docs/02 §3.9`):

```
copy block + glass card          ← layer 3
car cut-out (transparent PNG)    ← layer 2
GIANT WORD                       ← layer 1
background photograph            ← layer 0
```

It exists in exactly five places on the site, and nowhere else. Everywhere else a car is a single
composed photograph (`§3.10`) or a card (`§3.11`), where the background *is* the picture and there is
no sandwich to fix.

| # | Section | Route | Background | What it actually is | Verdict |
|---|---|---|---|---|---|
| 1 | Home hero | `/` | `HM-HERO-BG-D/-M` | Empty dark studio, one wide cool light slot low, mirror floor | **Already abstract — keep** |
| 2 | Home featured | `/` | `CGT-BG-D/-M` | Photographic coast road: cliff, parapet, sea, sunset, headlands | **Replace** |
| 3 | Collection row 1 — Cullinan | `/collection` | `CUL-BG-D/-M` | Photographic Najdi courtyard: walls, crenellations, arcade, lanterns, trees | **Replace** |
| 4 | Collection row 4 — Flying Spur | `/collection` | `FSM-BG-D/-M` | Pale seamless cyclorama (the one light room) | **Already studio — keep** |
| 5 | Collection row 7 — Continental GT | `/collection` | `CGT-BG-D/-M` | Same file as #2 | **Replace (same file)** |

Two of the four backgrounds are real places, and both carry detail exactly where type has to go: the
Home featured copy sits over the sea and the sunset band; the Cullinan row's giant word runs across a
lit stone arcade. The other two were already built as studios and are the ones that read cleanly — the
brief was right the first time, and these two drifted.

### So: **4 images required.** Two rooms × desktop + mobile.

| Image ID | Replaces | Size | Serves |
|---|---|---|---|
| `CUL-BG-D` | courtyard, landscape | 16:9 · 2560×1440 | Collection row 1, desktop |
| `CUL-BG-M` | courtyard, portrait | 9:16 · 1152×2048 | Collection row 1, mobile |
| `CGT-BG-D` | coast road, landscape | 16:9 · 2560×1440 | Home featured **and** Collection row 7, desktop |
| `CGT-BG-M` | coast road, portrait | 9:16 · 1152×2048 | Home featured **and** Collection row 7, mobile |

Two more are **optional** — see §5.

### What does *not* change

The two environments do not disappear from the site. `CUL-HERO-D/-M` and `CGT-HERO-D/-M` — the
composed photographs of each car standing in its courtyard / on its coast road — still carry the car
detail pages (`/collection/rolls-royce-cullinan`, `/collection/bentley-continental-gt-azure`), the
gallery details and the OG images. Nothing there is touched.

That is the argument for making this change rather than just darkening the photographs: **the Collection
becomes the gallery, where each car is an object under studio light; the car's own page is where you
see it in the world.** The site is "a private gallery that happens to be open at night" (`docs/02 §0`),
and a gallery lights its exhibits, it does not stage them.

One thing to decide (§6): the environment captions.

---

## 2. Style direction — four rooms, one language, no repetition

The risk in replacing two photographs with two studios is that four of the five Scenes become the same
grey cove and the page loses its rhythm. It must not. `docs/02 §0.9` says each room has **one
temperature** and the page alternates them; that survives intact if the studios differ in the *shape and
colour of their light* rather than in their props.

| Scene | Room | Temperature | Light architecture | Status |
|---|---|---|---|---|
| Home hero | — | Neutral-cool | One **wide horizontal slot** of cool white glowing low across the back wall, mirrored forward | exists |
| Home featured · Collection row 7 | The Coast Road | **Cool** | A **vertical gradient wash** — near-black above falling to a luminous indigo at the base, one ember of last light low on one side. No band, no line | **new** |
| Collection row 1 | The Courtyard | **Warm** | A single **tall arched pool** of amber light on the back wall, heavily defocused — the arcade reduced to one shape | **new** |
| Collection row 4 | The Salon | **Pale** | Flat, high-key, shadowless — the one light room | exists |

Three shapes of light — slot, wash, arch — and four temperatures. Scrolling the Collection you go warm
arch → (photograph rows) → pale room → (photograph rows) → cool wash. The alternation `docs/02` asks for
is preserved, and no two Scenes look like the same studio.

### Rules every one of these four images must obey

1. **No object, no architecture, no horizon line, no texture that reads as a place.** Light, haze,
   gradient and a reflective floor only. If a viewer can name what building or road they are looking at,
   it is wrong.
2. **The lower half is smooth and detail-free.** The copy block sits there on mobile in every Scene, and
   in the centre on the Home featured section. Nothing may cross it.
3. **The upper third is near-black** (except the light room). The giant word sits there.
4. **The light lives low and centre-to-end.** The car cut-out stands over it; its drop-shadow is added in
   code, so the floor must read as reflective but must not contain a shadow.
5. **Colour comes only from the light.** No global cast, no gold or blue grade over the whole frame —
   `docs/01 §0.8`. Blacks around `#070708`–`#0E0E10`.
6. **Grain, not noise.** Very subtle; the site adds its own 5% grain over the top.

---

## 3. The prompts — Room A: The Courtyard (warm) → `CUL-BG-D` / `CUL-BG-M`

Paste `[STYLE DNA]` and `[MOBILE SAFE ZONE]` verbatim from `docs/01-imagery-prompts.md § 0.6`.
**Attach:** nothing. No car, no reference photo.

### `CUL-BG-D` — desktop · 16:9 · 2560×1440

> An empty, dark photographic studio built for a large luxury car to be placed in later — no car, no
> furniture, no architecture in the frame. A seamless black cyclorama: the floor a polished dark stone
> mirror with a fine, almost invisible grain, the back wall dissolving into pure black at the top of the
> frame. The only light in the room is a single tall pointed-arch shape of soft warm amber light glowing
> on the back wall, right of centre — an abstract shape of light, heavily out of focus, its edges soft
> and undefined, as if a lantern-lit doorway were remembered rather than photographed. The arch's glow
> spills onto the floor in front of it and stretches toward the camera as a long, soft, warm vertical
> reflection. A faint warm sandstone-coloured haze hangs low around the arch and fades to nothing by
> mid-frame. The entire left third of the frame and the whole upper third are near-black, smooth and
> completely free of detail — typography goes there. The lower half of the frame is an even, gradual
> gradient with no horizon line and no visible edge between wall and floor. Warm temperature, but the
> warmth is only in the light itself: the blacks stay neutral and true. Very subtle film grain. No
> objects, no people, no text, no lanterns or lamps visible as objects — only their light. [STYLE DNA]

### `CUL-BG-M` — mobile · 9:16 · 1152×2048

> Same as `CUL-BG-D`, then add: *"Portrait 9:16. The arch of warm light sits centred, its top at about
> 45% of the frame height, with its floor reflection running down the lower-middle where the car will
> stand. The top 30% of the frame is near-black for the giant word, and the bottom 30% is a smooth,
> even, unbroken dark gradient for the headline and buttons — nothing may cross it."* [MOBILE SAFE ZONE]

---

## 4. The prompts — Room B: The Coast Road (cool) → `CGT-BG-D` / `CGT-BG-M`

**Attach:** nothing.
**Note:** this one image serves two sections — the Home featured exhibit, where the car is centred and
the copy sits centred *beneath* it, and Collection row 7, where the car is on the end side and the copy
on the start side. So it must stay calm across the whole lower band **and** down the start third.

### `CGT-BG-D` — desktop · 16:9 · 2560×1440

> An empty, dark photographic studio built for a car to be placed in later — no car, no road, no sea, no
> landscape, no objects of any kind. A seamless cyclorama with no visible corner or horizon: the frame is
> one continuous vertical wash of light, near-black and cool at the very top, deepening into a luminous,
> saturated indigo blue across the middle, and resolving into a dark, wet-looking mirror floor in the
> lower third. The blue glow is broadest and brightest low and slightly right of centre, where the car
> will stand, and falls away gently toward both edges. Low on the left, a single small, soft ember of
> warm amber light bleeds into the blue — the last of a sunset, abstracted to a glow, with no shape and
> no source visible. A faint cool haze drifts through the middle of the frame. The floor is a smooth,
> softly reflective black that mirrors the blue as a long, blurred vertical smear; it carries no texture,
> no tiles, no wet asphalt detail and no cast shadow. The left third and the top third are dark, smooth
> and free of detail for typography, and the whole lower band is even enough for a centred headline to
> sit anywhere across it. Cool temperature; blacks stay neutral, the blue is in the light only. Very
> subtle film grain. No horizon line, no band or bar of light, no lens flare, no stars, no text.
> [STYLE DNA]

### `CGT-BG-M` — mobile · 9:16 · 1152×2048

> Same as `CGT-BG-D`, then add: *"Portrait 9:16. The indigo glow is brightest at about 55% of the frame
> height and fills the middle band; the top 30% is near-black for the giant word and the bottom 32% is a
> smooth, even, unbroken dark gradient for the headline and buttons. The warm ember sits low on the left
> edge, small and soft."* [MOBILE SAFE ZONE]

---

## 5. Optional — a second cool room (2 more images) — TAKEN

The Continental GT appears twice on the site as a Scene: the Home featured exhibit and Collection row 7.
Today they share one background, so a visitor who scrolls the Home page and then the Collection sees the
same room twice with the same car in it. If you want them distinct, generate a second cool room and point
the Home featured section at it.

| Image ID | Size | Used by |
|---|---|---|
| `HM-FEAT-BG-D` | 16:9 · 2560×1440 | Home featured, desktop |
| `HM-FEAT-BG-M` | 9:16 · 1152×2048 | Home featured, mobile |

### `HM-FEAT-BG-D`

> An empty, dark photographic studio built for a car to be placed in later — no car, no objects, no
> architecture. A seamless black cyclorama lit from directly behind the centre of the frame, so a single
> broad column of cool silver-blue light rises from the floor up the back wall and fades out before the
> top of the frame, its edges soft and symmetrical. The polished black floor mirrors the column as one
> long, straight, blurred reflection running toward the camera. Everything outside the column — both
> sides and the whole upper third — falls to near-black with no detail. A faint cool haze softens the
> base of the column. Cool temperature; the blacks stay neutral. Very subtle film grain. No horizon, no
> band of light, no objects, no text. [STYLE DNA] [DESKTOP SAFE ZONE]

### `HM-FEAT-BG-M`

> Same as `HM-FEAT-BG-D`, then add: *"Portrait 9:16. The column of light is centred, brightest between
> 40% and 65% of the frame height, with its floor reflection below. The top 28% and the bottom 30% are
> near-black and free of detail."* [MOBILE SAFE ZONE]

Done: `src/components/sections/home/Featured.tsx` now reads `bg={{ d: "hm-feat-bg-d", m: "hm-feat-bg-m" }}`
and both entries are in `content/image-manifest.json`.

---

## 6. One decision for you: the environment captions

Each Collection Scene row shows a small caption with the room's name — **"The Courtyard"**, **"The Coast
Road"** — next to the availability badge, and the names are also in `content/cars.json` and on the car
detail pages.

Once the row's background is a studio, the caption names a place the row no longer shows. Three ways to
go:

1. **Keep the names.** They still describe the car's own environment, which is exactly what the car's
   detail page shows. The caption reads as a promise of what's inside. Nothing to change, no copy edits.
   *This is my recommendation.*
2. **Rename the two rooms** to what the new backgrounds actually are — "The Arch" and "The Blue Hour",
   say. Honest, and it keeps the poetic room language. Costs two edits in `content/cars.json` (`en` and
   `ar`) and a check of `docs/02`.
3. **Drop the caption on Scene rows only** and keep it on photograph rows. Loses a nice detail; I would
   not.

Nothing in the code needs to change for option 1.

---

## 7. Dropping the images in

The masters currently in `public/images` are **1672×941** (desktop) and **941×1672** (mobile), and
`content/image-manifest.json` records those exact pixel sizes. So:

1. Generate at the full sizes above (2560×1440 / 1152×2048).
2. Resize down to **1672×941** and **941×1672** and save as PNG over the same filenames:
   `public/images/mb-cul-bg-d.png`, `mb-cul-bg-m.png`, `mb-cgt-bg-d.png`, `mb-cgt-bg-m.png`.
   Keep the originals somewhere outside `public/` if you want to compare.
3. Run `npm run blur` — it regenerates the blur-up placeholders in `src/lib/blur.json` from whatever is
   in `public/images`. Skip this and the pages will flash the *old* photograph's colours before the new
   one paints.
4. `npm run build`, then look at `/` and `/collection` at 390 and 1440 in both languages.

If you generate at different pixel sizes instead, update `width`/`height` for those four entries in
`content/image-manifest.json` to match, or `next/image` will lay them out wrong.
