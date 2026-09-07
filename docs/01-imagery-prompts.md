# MAY BACH — Imagery Bible & GPT Image Prompt Library

**Project:** May Bach (ماي باخ) · Luxury multi-marque showroom · Riyadh, Saudi Arabia
**Document:** 01 of 02 — Imagery definition + every image-generation prompt
**Companion:** `02-site-blueprint-design-system.md` (sections, copy, design system). Every image ID referenced there is defined here.
**Version:** 1.0 · September 2026

---

## 0. Read this first

### 0.1 What this document is

Every photograph on the site — backgrounds, cars, showroom, macro details, utility assets — is defined here with a stable **Image ID**, its purpose, its exact aspect ratio / pixel size, which reference photo to attach, and a copy-paste prompt for GPT image generation.

Cars are shown in **three different ways** across the site (see 02 → §3.9–3.11), and each way needs different assets:

| Treatment | Where | Assets it needs |
|---|---|---|
| **Scene** — the giant word sandwiched between a background and a transparent car cut-out, built in code | Home hero · Home featured · three rows of the Collection (Cullinan, Continental GT, Flying Spur) | `-BG-D/-M` + `-CUT-A/-B` (+ `-HERO-` as fallback) |
| **Photograph** — one composed photograph of the car in its environment, copy over the dark side | Most Collection rows · every Car detail hero · Home collection preview | `-HERO-D/-M` |
| **Card** — a large portrait photograph inside a glass-edged card, shown in pairs on desktop, one per row on mobile | Some Collection rows · Home collection preview · "Also in residence" | `-CARD` (4:5) |

So: **every car** gets a `-BG-`, a `-HERO-` and details; **only the three Scene cars** need transparent cut-outs (the others are listed as optional, in case a car is promoted to a Scene later); **the four Card cars** get a `-CARD` portrait.

### 0.2 Image ID grammar

```
[PAGE/SUBJECT]-[ROLE]-[VARIANT]

Subjects   BR brand · SH showroom · HM home · CO collection · SV services · CT contact/visit · UT utility
Car codes  CUL Cullinan · CGT Continental GT Azure · FSM Flying Spur Mulliner · SCL S-Class
           RRA Range Rover Autobiography · YUK Yukon Denali · C8 Corvette C8
           URU Urus · 911 Porsche 911 · G63 Mercedes-AMG G 63
Roles      BG background (no car) · CUT transparent cut-out · HERO composed car-in-scene
           DET exterior/interior detail · INT interior · WIDE establishing · MACRO close-up
Variants   -D desktop (landscape) · -M mobile (portrait) · -A / -B alternate angles · -01 -02 sequence
```

File naming for export: `mb-[id-lowercase].[avif|webp|png]` → e.g. `mb-cul-bg-d.avif`, `mb-cul-cut-a.png`.

### 0.3 Sizes — exactly what to type

GPT Image (gpt-image-2) accepts custom dimensions: both edges divisible by 16, aspect between 1:3 and 3:1, up to 3840×2160. Older models / some UIs only offer 1024×1024, 1536×1024 (landscape) and 1024×1536 (portrait). Each prompt lists both.

| Use | Ratio | Type this size (gpt-image-2) | Fallback (fixed-size UI) | Then |
|---|---|---|---|---|
| Desktop background / hero | 16:9 | **2560×1440** | 1536×1024 landscape | crop to 16:9, centred |
| Desktop ultra-wide hero (optional) | 21:9 | **2688×1152** | 1536×1024 landscape | crop to 21:9 |
| Mobile background / hero | 9:16 | **1152×2048** | 1024×1536 portrait | crop to 9:16, keep centre 56% width |
| Car cut-out (transparent) | 3:2 | **2304×1536** | 1536×1024 landscape | remove background if needed |
| Tall cut-out (front-on, mobile) | 4:5 | **1600×2000** | 1024×1536 portrait | remove background if needed |
| Gallery / detail | 4:3 | **2048×1536** | 1536×1024 landscape | crop to 4:3 |
| Gallery portrait | 3:4 | **1536×2048** | 1024×1536 portrait | — |
| Square (cards, thumbnails, logo) | 1:1 | **2048×2048** | 1024×1024 | — |
| Open Graph / social | 1.91:1 | **2400×1264** | 1536×1024 landscape | resize to 1200×630 |

Export rule: master PNG → AVIF (quality 55–65) + WebP fallback. Desktop backgrounds ≤ 350 KB, mobile ≤ 180 KB, cut-outs ≤ 250 KB (WebP lossless-ish or PNG-8 with dithering if alpha allows).

### 0.4 Transparent cut-outs — how to get them reliably

1. Ask for a transparent background first (`background: transparent`, PNG/WebP). Some interfaces honour it, some do not.
2. If you get a flat background instead, the prompts already specify a **seamless mid-grey (#7A7A7A) studio background with no floor line and no cast shadow** — that cuts cleanly in Photoshop (Select Subject → Refine Edge) or remove.bg / Pixelcut.
3. Never generate the shadow inside the cut-out. The shadow is added in code (`filter: drop-shadow(...)`) so it adapts to every background.
4. Glass, chrome and wheel spokes will have grey fringing after extraction — run **Defringe / Decontaminate colours** and export PNG-24 with alpha, then convert to WebP with alpha.

### 0.5 Attaching references — the rules

- **Real car photos:** attach 2–4 photographs of the actual car in stock (front ¾, side, rear ¾, interior). The prompt always says "the attached car". Never let the model pick a colour: it must match the attached photo.
- **Showroom architecture:** for anything "in the showroom", also attach the retouched interior `SH-03-D` once it exists, so the ceiling grid, columns, marble and glass wall stay consistent across the whole site.
- **Sign / logo:** attach the sign photograph for anything showing the wordmark.
- Attach **only** what the prompt lists. Extra references pull the result off-brand.
- If the model mis-draws a badge or grille (common on Rolls-Royce and Bentley fronts), regenerate with "keep the badge small and subtle" or move to a rear ¾ / side angle, then fix the badge in Photoshop from the real photo. Do not ship a wrong badge.

### 0.6 Reusable prompt blocks

Paste these verbatim where a prompt says `[STYLE DNA]`, `[EXACT CAR]`, `[MOBILE SAFE ZONE]` or `[DESKTOP SAFE ZONE]`.

**[STYLE DNA]**

> Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin, cool silver rim light tracing the body line (or, only where the prompt says so, a rim light in the environment's own light colour), a soft neutral fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: neutral and slightly desaturated, clean blacks, highlights never tinted. The only colour in the frame comes from the environment's own light sources and from the car itself. No global warm, gold, or blue cast over the whole image. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated.

**[EXACT CAR]**

> Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections.

**[MOBILE SAFE ZONE]**

> Portrait composition. Keep the car and every important detail inside the central 60% of the width, and clear of the top 18% and bottom 22% of the frame — those bands are reserved for typography and interface. Extend the environment naturally above and below.

**[DESKTOP SAFE ZONE]**

> Landscape composition. Keep the whole car inside the frame with breathing room; place it as directed and leave the opposite area calm, dark and free of detail for typography.

### 0.7 Negative list (what must never appear)

People, hands, faces, text of any kind, number plates with readable characters (plates should be blank, blurred or a plain dark plate), dealership branding other than May Bach's own sign where stated, price tags, stickers, cones, cables, reflections of a photographer, competing bright colours in the environment, daylight blue sky (blue-hour sky is fine), lens flare, rain streaks on lens, fish-eye distortion.

### 0.8 Grade consistency check

Every final image should sit in the same tonal world: blacks around `#070708–#0E0E10`, highlights neutral (never pure white except specular hits), no global tint. Each environment carries its own **temperature** (§0.9) — that is where the colour lives — and the interface around it stays monochrome. If an output is too colourful or has a gold/orange cast, ask for "neutral white balance, less saturation, darker environment, keep the car colour accurate".

### 0.9 Temperature — where the colour actually lives

The interface has no colour. The photographs do — but each environment has **one** temperature, stated in its prompt, and the page alternates them so the eye is never in the same light twice in a row. This is the colour composition of the site: not an accent applied everywhere, but a rhythm of warm rooms, cool rooms, one pale room, and neutral studios, with the car as the only saturated thing in each.

| Environment | Car | Temperature | The colour in the frame comes from |
|---|---|---|---|
| The Courtyard | Cullinan | Warm | Amber lanterns, sand-coloured limestone |
| The Coast Road | Continental GT | Cool | Indigo sea and sky, one thin warm horizon line |
| The Salon | Flying Spur | Pale (light scene) | A pale warm-grey studio — the only light room on the site |
| The District | S-Class | Neutral-cool | White and warm-white tower windows on wet granite |
| The Sandstone | Range Rover | Cool | Violet pre-dawn, a thin apricot horizon |
| The Villa | Yukon Denali | Warm | Tungsten wall-washers on travertine |
| The Light Lines | Corvette | Neutral | Pure white lines on black; the blue car is the colour |
| The Bunker | Urus | Cold | Concrete and one white shaft; the car is the colour |
| The Pass | 911 | Warm | Sodium-amber tunnel light against black |
| The Wadi | G 63 | Cool | Blue moonlight, one faint warm horizon |
| Showroom (all) | — | Neutral-warm | Ivory ceiling light on cream marble — the real building |

Rule of thumb when reviewing outputs: if two adjacent environments on the Collection page look the same temperature, one of them is wrong.

---
## 1. Brand assets

The wordmark and the interlocked-diamond mark already exist on the building. We are not redesigning them; we are producing clean digital versions from the sign photo, and one abstract brand texture.

> **Note on the name.** The sign reads "MAY BACH" (two words) with the Arabic "ماي باخ". Use that spacing in the wordmark. Mercedes-Maybach is a registered marque; the showroom's own diamond mark and two-word wordmark are what give it a separate identity — never borrow Mercedes-Maybach's typographic style, double-M emblem or colours.

### BR-01 — Wordmark, clean, white on transparent
- **Use:** Header, footer, preloader, favicon source. (Ideally re-drawn as SVG by the developer using this as the tracing reference.)
- **Ratio / size:** 1:1 · 2048×2048 (fallback 1024×1024)
- **Attach:** `their brand looks like this….png` (the sign photo)
- **Prompt:**

> Recreate the logo lock-up from the attached signage photo as a clean, flat, perfectly vector-like graphic on a fully transparent background (if transparency is unavailable, use a flat pure black #000000 background). Three elements stacked and centre-aligned exactly as on the sign: the Arabic wordmark "ماي باخ" on top in the same clean geometric Arabic letterforms; the emblem in the middle — two interlocked diamond (rhombus) outlines side by side, the left diamond a plain outline, the right diamond containing a smaller diamond, joined where they overlap, drawn with a single uniform stroke weight; below it the Latin wordmark "MAY BACH" in the same wide geometric sans-serif capitals with the same letter-spacing. Omit the licence line. Everything in pure white #FFFFFF, crisp edges, no gradients, no shadows, no glow, no 3D, no photo texture, no background elements. Perfectly symmetrical, sharp, centred with even margins.

### BR-02 — Diamond emblem only, white on transparent
- **Use:** Favicon, preloader animation, section dividers, bullet marks, watermark at 4% opacity.
- **Ratio / size:** 1:1 · 2048×2048
- **Attach:** the sign photo
- **Prompt:**

> Isolate only the emblem from the attached signage: two interlocked diamond (rhombus) outlines side by side — left diamond a plain outline, right diamond containing a smaller diamond inside, joined at their overlap — drawn as one continuous uniform white stroke on a fully transparent background (or flat pure black if transparency is unavailable). No text, no glow, no shadow, no 3D. Geometrically perfect, symmetrical, centred, generous even margins, crisp vector-like edges.

### BR-03-D / BR-03-M — Brand texture: silver light on black
- **Use:** Preloader background, form backgrounds, footer top edge, statement sections with no photograph. Generate desktop and mobile.
- **Ratio / size:** D 16:9 · 2560×1440 · M 9:16 · 1152×2048
- **Attach:** none
- **Prompt (desktop):**

> Abstract luxury background photograph: a single, long, soft streak of cool silver-white light sweeping diagonally across a near-black velvet-dark surface, like the reflection of a distant light on polished black lacquer. Extremely subtle, low contrast, most of the frame remains deep black #070708 with a faint film grain. The streak fades gently at both ends. Slight cool blue-grey tint in the darkest shadows. No objects, no text, no sparkles, no bokeh circles, no lens flare, no visible light source. Calm, expensive, minimal.

- **Prompt (mobile):** same prompt, then add: *"Portrait format; the streak runs from upper-left to lower-right through the centre of the frame."*

### BR-04 — Open Graph / social share image
- **Use:** Default `og:image` and WhatsApp link preview.
- **Ratio / size:** 1.91:1 · 2400×1264 → resize to 1200×630
- **Attach:** `CGT-HERO-D` (once generated) — or skip and build in Figma from `CGT-HERO-D` + `BR-01`. Recommended: build in Figma; if generating:
- **Prompt:**

> Using the attached photograph as the base, produce a cinematic social-share crop: the car remains on the right two-thirds, the left third is darkened to near-black with a smooth gradient so that a white logo can be overlaid there later. Do not add text. Keep the grade identical. [STYLE DNA]

---

## 2. The showroom — retouching the raw photographs

These are the client's real building and floor. GPT is used as a retoucher, not an inventor: **same building, same layout, same cars if present — only cleaned, relit and upgraded.** Retouches are always generated in both desktop and mobile.

### SH-01-D / SH-01-M — Façade at blue hour (from `raw exterior of showroom, will be retouched using gpt.png`)
- **Use:** Showroom page hero; Home "Come after dark" alt; Visit page hero.
- **Ratio / size:** D 16:9 · 2560×1440 · M 9:16 · 1152×2048
- **Attach:** the raw façade photo + the sign photo (for logo accuracy)
- **Prompt (desktop):**

> Retouch and upgrade the attached photograph of this exact showroom façade into a flawless architectural photograph at blue hour. Keep the real building exactly as it is: the two-storey glass façade with its white-framed grid on the upper floor, the large illuminated dark-navy sign panel with the Arabic "ماي باخ", the twin-diamond emblem and "MAY BACH" beneath it in white (reproduce the sign accurately from the second attachment), the four exterior floodlights, the ground-floor floor-to-ceiling glass with warm interior lighting, the coffered white ceiling, the mezzanine windows, and the luxury cars visible inside on the marble floor. Improvements: shoot from a slightly lower, perfectly straight-on position with corrected verticals (no keystoning); a deep, clean blue-hour sky; crisp, evenly exposed glass with no harsh reflections; remove the Google Maps interface, the arrows, any watermark, cables, cones, dust or people; clean pavement in the foreground with a subtle wet-look reflection of the lit interior. Interior lighting warm ivory, sign glowing clean white, sky deep midnight blue. Photoreal, medium-format sharpness, 35 mm, f/8. No added text, no added logos, no lens flare.

- **Prompt (mobile):** same prompt, then add: *"Portrait 9:16 framing, straight-on, the sign panel sits in the upper third and the lit ground floor with cars fills the lower half; extend the sky above and pavement below naturally."*

### SH-02-D / SH-02-M — Street-side façade at night (from `raw exterior 2.png`)
- **Use:** Showroom page "The house" section; Services "Delivery" background; Visit page.
- **Ratio / size:** D 16:9 · 2560×1440 · M 9:16 · 1152×2048
- **Attach:** `raw exterior 2.png`
- **Prompt (desktop):**

> Retouch the attached night photograph of this showroom's street-side glass façade into a flawless, cinematic architectural photograph while keeping the real building and its layout: the long run of floor-to-ceiling glass panels with slim frames, the tall white columns, the warm recessed ceiling lights inside, the glass entrance doors with the dark canopy, the pavement with its pale paving pattern, the boulevard and street lamps receding to the left, and the luxury SUVs parked inside behind the glass. Remove all interface overlays, the map inset, the photographer credit, navigation arrows, watermarks, the red object on the floor, cables and bins; remove all people and remove the cars parked on the street. Perfectly level horizon, corrected verticals, deep night sky, glass cleaned and evenly lit with a soft warm glow spilling onto a subtly wet pavement, interior cars gleaming with polished highlights. Colour grade: warm ivory interior against a cool midnight-blue exterior. Photoreal, 35 mm, f/8, medium-format sharpness. No added text or logos.

- **Prompt (mobile):** same prompt, then add: *"Portrait 9:16; compose from the same position looking along the façade so the glass wall runs diagonally from the lower right into the distance at the upper left; keep the entrance doors in the middle third."*

### SH-03-D / SH-03-M — Interior, the marble floor and the line-up (from `raw interior of showroom.png`)
- **Use:** The master architecture reference for every "in showroom" image; Showroom page "The floor"; Home statement section background.
- **Ratio / size:** D 16:9 · 2560×1440 · M 9:16 · 1152×2048
- **Attach:** `raw interior of showroom.png`
- **Prompt (desktop):**

> Retouch the attached interior photograph of this showroom into a flawless, cinematic wide interior photograph, keeping the real space exactly as it is: the polished cream-and-beige marble floor with its subtle veining, the white coffered ceiling with rows of recessed downlights, the tall white square columns, the double-height dark glass wall on the right reflecting the interior, and the diagonal line-up of luxury cars along the left-centre — a bright blue mid-engine sports car nearest the camera, a black sports car behind it, a blue one behind that, and dark SUVs receding into the distance. Improvements: widen the framing slightly to a landscape view, straighten verticals, remove all people, remove the Google Maps interface and every overlay, remove the red box and any clutter on the floor, restore the marble to a mirror-like polish with clean reflections of the cars and ceiling lights, dim the ambient light so the room feels evening-calm while the cars remain gleaming with crisp highlights; keep the grade neutral — the marble's natural cream, the cars' true colours, clean blacks in the glass. Every car must stay true to its real colour and shape. Photoreal, 28–35 mm, f/8, medium-format sharpness. No added text, no added signage.

- **Prompt (mobile):** same prompt, then add: *"Portrait 9:16 framing from the same viewpoint; the nearest car's tail sits low-right, the line-up recedes upward to the left, the ceiling grid fills the top third."*

### SH-04 — The sign, glowing (macro)
- **Use:** Showroom page story block; footer background; About cards.
- **Ratio / size:** 4:3 · 2048×1536
- **Attach:** the sign photo + `SH-01-D`
- **Prompt:**

> Night-time close-up photograph of the illuminated showroom sign from the attached references, shot from below at a slight angle with a 85 mm lens: the dark navy sign panel with the crisp white illuminated Arabic wordmark "ماي باخ", the twin-diamond emblem and "MAY BACH" beneath, reproduced accurately from the reference. Shallow depth of field so the white letters are tack sharp and the glass grid of the building above falls softly out of focus against a deep blue-hour sky. Clean, even white glow from the letters with a gentle halo on the panel, no hotspots, no dust, no visible fixings. Omit the licence line. No other text. Deep, calm, expensive.

### SH-05-D / SH-05-M — Interior at night, one car under a spotlight (generated)
- **Use:** Home "Come after dark" section; Collection page header; Services background.
- **Ratio / size:** D 16:9 · 2560×1440 · M 9:16 · 1152×2048
- **Attach:** `SH-03-D` (architecture) + 2 photos of the Rolls-Royce Cullinan in stock
- **Prompt (desktop):**

> Wide interior photograph of the exact showroom in the first attached image — same cream marble floor, white coffered ceiling with recessed downlights, white square columns and the double-height dark glass wall — at night, after closing. The room is dim: most ceiling lights are off, only a small group of downlights is on, creating a single pool of light on the marble in the centre-right of the frame. In that pool stands the Rolls-Royce Cullinan from the second set of attachments, front three-quarter view angled toward the lower-left, the only car in the room. [EXACT CAR] Its reflection lies in the polished marble. The far glass wall shows faint reflections of the city lights outside. Left third of the frame is dark and calm for typography. [STYLE DNA]

- **Prompt (mobile):** same prompt, then add: *"Portrait 9:16; the pool of light and the car sit in the lower-middle of the frame, the dark coffered ceiling recedes above. [MOBILE SAFE ZONE]"*

### SH-06-D / SH-06-M — Façade from across the boulevard, wide (generated)
- **Use:** Visit page hero, Home "Visit" strip, map section background.
- **Ratio / size:** D 21:9 · 2688×1152 (fallback 16:9 · 2560×1440) · M 9:16 · 1152×2048
- **Attach:** `SH-01-D` + `SH-02-D`
- **Prompt (desktop):**

> Cinematic wide night photograph of the showroom building in the attached references, seen from across a quiet Riyadh boulevard: the full two-storey glass façade glowing warm ivory from inside, the illuminated navy sign with the white wordmark and twin-diamond emblem centred on the upper floor, palm trees and modern street lamps softly lit in the foreground, a subtly wet dark road reflecting the light, a deep midnight-blue sky. Keep the real architecture from the references. No people, no traffic, no street signage, plates or other shop signs. [STYLE DNA]

- **Prompt (mobile):** same, add: *"Portrait 9:16; the building fills the middle band, foreground road and reflection below, sky above."*

### SH-07 — The floor: wheel and marble reflection (macro)
- **Use:** Showroom "The floor" caption image; Home "Why" alternate; Collection dividers.
- **Ratio / size:** 3:4 · 1536×2048
- **Attach:** `SH-03-D` + one photo of the Bentley Continental GT (wheel visible)
- **Prompt:**

> Low-angle macro photograph on the polished cream marble floor of the attached showroom: the front wheel and lower body of the Cambrian Grey Bentley Continental GT from the second attachment, its multi-spoke wheel and brake caliper razor sharp, the marble reflecting the wheel and a row of ceiling downlights in a smooth mirror image, background falling into soft darkness. A thin cool rim light along the wheel arch. [EXACT CAR] [STYLE DNA]

### SH-08-D / SH-08-M — From the mezzanine, looking down (generated)
- **Use:** Showroom page "The mezzanine"; About numbers section background.
- **Ratio / size:** D 16:9 · 2560×1440 · M 9:16 · 1152×2048
- **Attach:** `SH-03-D` + `SH-01-D`
- **Prompt (desktop):**

> Elevated interior photograph taken from the mezzanine of the attached showroom, looking down at the ground floor at a 30-degree angle: the cream marble floor laid out below with five luxury cars parked in a calm diagonal row (dark SUVs and a grey grand tourer, colours subdued), the white coffered ceiling with its downlight grid partially visible at the top, the tall glass façade on one side with the night outside. Lighting dimmed to evening level; cars gleaming; marble reflecting. Generous empty marble in the lower-left of the frame for typography. No people. [STYLE DNA]

- **Prompt (mobile):** same, add: *"Portrait 9:16; the row of cars runs diagonally from lower-left to upper-right. [MOBILE SAFE ZONE]"*

### SH-09 — The majlis: coffee first
- **Use:** Showroom "Hospitality" block; Visit page; Contact form side image.
- **Ratio / size:** 4:5 · 1600×2000
- **Attach:** `SH-03-D` (for material continuity)
- **Prompt:**

> Intimate still-life photograph inside a luxury car showroom's private lounge (majlis) at night: a low black marble table in the foreground holding a polished brass Saudi dallah coffee pot and two small white finjan cups, a small dish of dates beside them; behind, out of focus, a deep charcoal velvet sofa and, further back, the soft gleam of a dark luxury car on cream marble under a single warm downlight. Shallow depth of field, 85 mm, f/2.8. Soft warm highlights on the brass — the brass is the only warm note — deep neutral blacks everywhere else. No people, no text. [STYLE DNA]

### SH-10 — The emblem in the space
- **Use:** Showroom story; 404; loading screen alternative.
- **Ratio / size:** 1:1 · 2048×2048
- **Attach:** `BR-02` + `SH-03-D`
- **Prompt:**

> Close-up photograph of the twin-diamond emblem from the first attachment rendered as a brushed stainless-steel inlay set flush into a dark marble reception wall inside the showroom from the second attachment, lit by a single soft raking light from the upper left so the metal catches a thin highlight and the marble veining is faintly visible. Emblem centred, occupying about 40% of the frame. No text, no other objects. [STYLE DNA]

---
## 3. Home page imagery

Section numbers refer to `02 → §5 Home`. Where a section reuses a car set, the car set is defined in §4 of this document.

### HM-HERO-BG-D / HM-HERO-BG-M — Home hero environment (no car)
- **Use:** Home §H1 hero, layer 1. The car is `CUL-CUT-A` (desktop) / `CUL-CUT-B` (mobile, front-on) placed by code, with the giant "MAY BACH" / "ماي باخ" wordmark between. Optional hero slides 2 and 3 reuse `CGT-CUT-B` and `SCL-CUT-A` on this same background (the S-Class cut-out is otherwise optional — generate it only if the slides are built).
- **Ratio / size:** D 16:9 · 2560×1440 (optionally also 21:9 · 2688×1152) · M 9:16 · 1152×2048
- **Attach:** none
- **Prompt (desktop):**

> Empty luxury automotive studio at night, photographed for a website hero, with no car in it. A vast, dark space: a seamless black floor polished to a mirror finish, a distant back wall that dissolves into black, and a faint, wide horizontal band of soft, cool white light glowing low across the background — as if from a hidden light slot behind where a car will stand — its reflection stretching forward across the floor toward the camera. A very faint cool blue-grey haze in the upper corners. The brightest area sits slightly right of centre and low; the upper half of the frame is calm, near-black and free of detail for a large headline. Extremely subtle film grain. No objects, no text, no people. [STYLE DNA]

- **Prompt (mobile):** same prompt, then add: *"Portrait 9:16. The light band sits at about 62% of the frame height with its floor reflection below; the top 40% is near-black. [MOBILE SAFE ZONE]"*

### HM-HERO-STILL-D / HM-HERO-STILL-M — Composed hero fallback (car in scene)
- **Use:** `<noscript>`/low-power fallback, email header, social. Not used when the three-layer scene runs.
- **Ratio / size:** D 16:9 · 2560×1440 · M 9:16 · 1152×2048
- **Attach:** `HM-HERO-BG-D` + real photos of the Rolls-Royce Cullinan
- **Prompt (desktop):**

> Place the Rolls-Royce Cullinan from the attached photographs into the attached empty studio, standing exactly where the light band glows, front three-quarter view angled toward the lower-left, occupying the right 60% of the frame, its full reflection on the black mirror floor, a cool rim light along the roofline and shoulder, soft neutral fill on the shadow side. Left third and top of frame stay near-black for typography. [EXACT CAR] [STYLE DNA]

- **Prompt (mobile):** same, then add: *"Portrait 9:16; the car is seen almost front-on, slightly from the left, centred in the lower-middle of the frame. [MOBILE SAFE ZONE]"*

### HM-WHY-BG-D / HM-WHY-BG-M — "More than a showroom" — the headlight macro
- **Use:** Home §H4 (the frosted-glass promise cards). This is the section the client wants "exactly like" the inspiration: a monochrome macro of a car's front, headlight sharp, body dissolving into black, with glass cards floating on the right.
- **Ratio / size:** D 16:9 · 2560×1440 · M 9:16 · 1152×2048
- **Attach:** front photo of the Cambrian Grey Bentley Continental GT Azure
- **Prompt (desktop):**

> Extreme close-up, near-monochrome photograph of the front of the attached Cambrian Grey Bentley Continental GT, filling the frame from the left edge: the crystal-cut LED headlamp in tack-sharp detail at the left-centre, the sculpted bonnet and front wing sweeping to the right and dissolving into deep black, a single soft key light from the upper left carving a long silver highlight along the wing — no warmth anywhere, pure silver and black. The right 45% of the frame is very dark, smooth and out of focus — this is where frosted-glass cards will be placed. Silvery, desaturated, luxurious, cinematic. Badge subtle. [EXACT CAR] [STYLE DNA]

- **Prompt (mobile):** same, then add: *"Portrait 9:16; the headlamp sits in the upper third, the bonnet sweeps downward and dissolves into black in the lower two-thirds where cards will stack. [MOBILE SAFE ZONE]"*

### HM-WHY-ALT-D / HM-WHY-ALT-M — Alternate macro (Rolls-Royce grille & Spirit of Ecstasy)
- **Use:** A/B alternative for §H4, and Services hero. Generate both; keep the better.
- **Ratio / size:** D 16:9 · 2560×1440 · M 9:16 · 1152×2048
- **Attach:** front photo of the Rolls-Royce Cullinan
- **Prompt (desktop):**

> Extreme close-up, near-monochrome photograph of the upper grille and bonnet of the attached Rolls-Royce Cullinan from a low three-quarter angle: the vertical polished grille vanes catching a thin silver highlight, the hood ornament in sharp silhouette against deep black, the bonnet dissolving into darkness toward the right of the frame where the image becomes smooth, dark and empty. Silvery, desaturated, cinematic, restrained. Keep the emblem accurate but small. [EXACT CAR] [STYLE DNA]

- **Prompt (mobile):** same, add: *"Portrait 9:16; grille and ornament in the upper third, dissolving into black below. [MOBILE SAFE ZONE]"*

### HM-VIEW-D / HM-VIEW-M — "The doors open for you"
- **Use:** Home §H8 private viewing CTA; Visit page secondary.
- **Ratio / size:** D 16:9 · 2560×1440 · M 9:16 · 1152×2048
- **Attach:** `SH-02-D`
- **Prompt (desktop):**

> Night photograph at the glass entrance of the attached showroom: the tall frameless glass doors stand open, warm ivory light from inside spilling across the pale paving of the pavement in a long soft rectangle toward the camera, the dark canopy above, and inside, slightly out of focus, the gleam of a dark luxury car on cream marble. The exterior is deep midnight blue and calm. Camera low and centred on the doorway, 35 mm. Left half of the frame darker for typography. No people, no text. [STYLE DNA]

- **Prompt (mobile):** same, add: *"Portrait 9:16; the open doorway sits in the middle band with the light spilling down toward the bottom. [MOBILE SAFE ZONE]"*

### HM-MAP-D / HM-MAP-M — Riyadh at night, from above
- **Use:** Home §H9 visit strip background; Visit page map section background (a live map sits on top or beside it).
- **Ratio / size:** D 16:9 · 2560×1440 · M 9:16 · 1152×2048
- **Attach:** none
- **Prompt (desktop):**

> Aerial night photograph of Riyadh, Saudi Arabia, from high altitude, heavily darkened and desaturated for use as a website background: the city's orderly grid of streets traced in faint warm amber street light, the King Abdullah Financial District towers and Kingdom Centre faintly visible as small clusters of light, the vast surrounding darkness of the desert at the frame edges. Everything muted to near-black with the light grid at low intensity; a gentle vignette. No text, no map labels, no pins, no roads highlighted in colour. Cinematic, calm, expensive.

- **Prompt (mobile):** same, add: *"Portrait 9:16; the city grid runs up the centre of the frame, darkest at the top and bottom."*

### HM-STATEMENT-BG-D / HM-STATEMENT-BG-M — "Chosen, not stocked" background
- **Use:** Home §H2 statement (giant single line, nothing else). Very dark so the words carry the section.
- **Ratio / size:** D 16:9 · 2560×1440 · M 9:16 · 1152×2048
- **Attach:** `SH-03-D`
- **Prompt (desktop):**

> Very dark, out-of-focus photograph of the attached showroom interior after closing, photographed at f/1.4 so the row of cars and the ceiling downlights become soft, elongated bokeh shapes on cream marble; overall exposure pulled down so the image reads as 85% black with faint warm glints. No sharp detail anywhere, no text, no people. [STYLE DNA]

- **Prompt (mobile):** same, add: *"Portrait 9:16."*

---
## 4. The Collection — one world per car

Every car gets its own environment, lit with the same key/rim/fill language so the collection reads as one exhibition while every room is different. Nine rooms are night or blue hour; one — the Salon — is a pale studio, the deliberate light beat in a dark page. Environment names are used in the blueprint and shown as a small caption on the car row.

| Code | Car | Environment | Temp. | Treatment on the Collection page | Giant word (EN / AR) |
|---|---|---|---|---|---|
| CUL | Rolls-Royce Cullinan | The Courtyard — Najdi palace courtyard | Warm | **Scene** (word behind car) | CULLINAN / كولينان |
| CGT | Bentley Continental GT Azure, Cambrian Grey | The Coast Road — Red Sea cliff road at blue hour | Cool | **Scene** | AZURE / أزور |
| FSM | Bentley Flying Spur Mulliner | The Salon — pale warm-grey studio, the light room | Pale | **Scene, light** | MULLINER / مولينر |
| SCL | Mercedes-Benz S-Class 2022 | The District — KAFD glass towers | Neutral-cool | Card | — |
| RRA | Range Rover Autobiography 2024 (74) | The Sandstone — AlUla monoliths before dawn | Cool | Photograph | — |
| YUK | GMC Yukon Denali | The Villa — modern Riyadh villa driveway | Warm | Card | — |
| C8 | Chevrolet Corvette C8 Stingray | The Light Lines — black studio, horizontal light | Neutral | Photograph | — |
| URU | Lamborghini Urus (seen in the showroom) | The Bunker — brutalist concrete, one shaft of light | Cold | Card | — |
| 911 | Porsche 911 (seen in the showroom) | The Pass — wet mountain road, tunnel glow | Warm | Photograph | — |
| G63 | Mercedes-AMG G 63 (seen in the showroom) | The Wadi — rocky desert under moonlight | Cool | Card | — |

**Which assets are required per car**

| Asset | Scene cars (CUL, CGT, FSM) | Photograph cars (RRA, C8, 911) | Card cars (SCL, YUK, URU, G63) |
|---|---|---|---|
| `-BG-D / -BG-M` background, no car | required | required (detail-page hero base) | required (detail-page hero base) |
| `-CUT-A / -CUT-B` transparent cut-out | **required** | optional | optional |
| `-HERO-D / -HERO-M` composed photograph | fallback | **required** — this is the row | required — detail-page hero |
| `-CARD` 4:5 composed portrait | — | — | **required** — this is the card |
| `-DET-01 / 02 / 03` details | required | required | required |

Reference specs in the blueprint are typical for the model and **must be verified against the actual chassis** before publishing.

### 4.0 Collection page header

#### CO-HERO-BG-D / CO-HERO-BG-M — "Collection" hero: silhouettes in the dark
- **Use:** Collection page hero, layer 1; the giant word "COLLECTION" sits over it; no cut-out on this one (the cars are in the image).
- **Ratio / size:** D 16:9 · 2560×1440 · M 9:16 · 1152×2048
- **Attach:** `SH-03-D`
- **Prompt (desktop):**

> Wide, very dark photograph inside the attached showroom after hours: a row of six luxury cars parked nose-out in a shallow arc across the marble floor, almost entirely in shadow — only their rims of chrome, headlamp glass and roof edges catching a thin cool rim light from behind, their silhouettes reflected in the polished floor. The cars are distinguishable only as shapes: a tall SUV, a long saloon, a low grand tourer, a mid-engine sports car. Ceiling downlights off; a faint cool blue glow from the far glass wall. Upper half of the frame near-black for a giant headline. No text, no people. [STYLE DNA]

- **Prompt (mobile):** same, add: *"Portrait 9:16; the arc of silhouettes sits in the lower half, dark ceiling above. [MOBILE SAFE ZONE]"*

---

### 4.1 Rolls-Royce Cullinan — `CUL` — The Courtyard

**Environment concept.** A private Najdi courtyard at night: pale limestone walls with the stepped triangular crenellations of Najdi architecture, a shaded arcade of pointed arches, brass lanterns, a dark polished basalt floor that mirrors the car. The most regal room in the collection for the most regal car. Warm, quiet, unmistakably Saudi.

**Attach for every CUL prompt:** 2–4 photos of the actual Cullinan in stock (front ¾, side, rear ¾, interior).

#### CUL-BG-D — Background, desktop
- **Use:** Collection row · Car detail hero · Home hero slide (with `CUL-CUT-A` on top)
- **Ratio / size:** 16:9 · 2560×1440
- **Attach:** none
- **Prompt:**

> Night photograph of an empty private courtyard of a Najdi-style palace in Riyadh, built for a luxury car to be placed in later — no car in the frame. Pale sand-coloured limestone walls with rows of small stepped triangular crenellations along the top, a shaded arcade of tall pointed arches running across the background, a few brass lanterns glowing warm amber inside the arches, a dark polished basalt stone floor reflecting the lantern light like still water. A single wide, soft key light from the upper left illuminates the floor's centre-right where the car will stand; the left third of the frame is darker and calm for typography. Deep midnight-blue sky above the wall. [STYLE DNA]

#### CUL-BG-M — Background, mobile
- **Ratio / size:** 9:16 · 1152×2048
- **Prompt:** same as `CUL-BG-D`, then add: *"Portrait 9:16; the arcade fills the middle band, the lit floor area sits in the lower-middle where the car will stand, wall and sky above. [MOBILE SAFE ZONE]"*

#### CUL-CUT-A — Cut-out, front three-quarter (desktop) — required
- **Ratio / size:** 3:2 · 2304×1536 · transparent
- **Prompt:**

> Studio photograph of the attached Rolls-Royce Cullinan, front three-quarter view from slightly below eye level, the nose angled toward the lower-left, wheels turned slightly toward the camera, on a fully transparent background (if unavailable: a seamless flat mid-grey #7A7A7A background with no floor line, no horizon and no cast shadow). The whole car is inside the frame with even margins. Lit with a large soft key from the upper left, a thin cool silver rim light along the roof and shoulder line, soft neutral fill on the shadow side; crisp studio reflections in the paint; the Pantheon grille vanes and hood ornament accurate but understated, daytime running lights on at low intensity. [EXACT CAR] Photoreal, 70 mm, f/8, medium-format sharpness. Nothing else in the frame.

#### CUL-CUT-B — Cut-out, front-on (mobile) — required
- **Ratio / size:** 4:5 · 1600×2000 · transparent
- **Prompt:** same as `CUL-CUT-A`, replacing the angle with: *"seen almost straight-on from the front, camera at grille height and very slightly to the left, so the car's full width and upright presence dominate the frame."*

#### CUL-HERO-D / CUL-HERO-M — Composed fallback
- **Ratio / size:** D 16:9 · 2560×1440 · M 9:16 · 1152×2048
- **Attach:** `CUL-BG-D` (or `-M`) + real Cullinan photos
- **Prompt (desktop):** *"Place the attached Rolls-Royce Cullinan into the attached courtyard, standing on the lit basalt floor in the centre-right, front three-quarter view angled to the lower-left, full reflection on the floor, the amber lantern light warming the flank and a cool rim on the roofline. Left third of the frame stays dark for typography. [EXACT CAR] [STYLE DNA]"*
- **Prompt (mobile):** same, then: *"Portrait 9:16; the car is seen nearly front-on, centred in the lower-middle band. [MOBILE SAFE ZONE]"*

#### CUL-DET-01 — Exterior macro: the ornament
- **Ratio / size:** 4:3 · 2048×1536
- **Prompt:**

> Macro photograph of the hood ornament and the top edge of the polished grille of the attached Rolls-Royce Cullinan, shot from a low angle with an 100 mm macro lens at f/2.8, the figure sharp against the deep out-of-focus midnight background of a Najdi courtyard with two soft amber lantern glows; a warm lantern highlight runs along the bonnet edge. Restrained, silvery, expensive. [EXACT CAR] [STYLE DNA]

#### CUL-DET-02 — Interior
- **Ratio / size:** 4:3 · 2048×1536
- **Attach:** the real interior photo of this car
- **Prompt:**

> Interior photograph of the attached Rolls-Royce Cullinan from the open rear door, showing the rear seats, the lambswool carpet, the polished wood veneer picnic-table backs and the starlight headliner glowing faintly, in the exact leather colour of the attached interior photo. Low, warm ambient light with a soft cool fill from the window; shallow depth of field, 35 mm, f/2.8. No people, no visible screens with text. [EXACT CAR] [STYLE DNA]

#### CUL-DET-03 — Rear three-quarter in the courtyard
- **Ratio / size:** 4:3 · 2048×1536
- **Attach:** `CUL-BG-D` + real photos
- **Prompt:** *"The attached Cullinan seen from the rear three-quarter, parked under the arcade of the attached courtyard, its tail lights on, the arches reflected in the tailgate, the basalt floor mirroring the car. Camera low, 50 mm. [EXACT CAR] [STYLE DNA]"*

---

### 4.2 Bentley Continental GT Azure, Cambrian Grey — `CGT` — The Coast Road

**Environment concept.** A cliff road above the Red Sea at blue hour — dark wet asphalt, a low stone wall, the sea a sheet of deep indigo far below, the last band of warm light on the horizon. Azure is Bentley's touring specification; the picture says "the long way home". The grey car against blue-black is the most cinematic pairing in the collection, which is why this car is the Home featured section.

**Attach for every CGT prompt:** 2–4 photos of the actual Continental GT Azure in stock.

#### CGT-BG-D — Background, desktop
- **Ratio / size:** 16:9 · 2560×1440
- **Attach:** none
- **Prompt:**

> Blue-hour photograph of an empty coastal cliff road, built for a car to be placed in later — no car in the frame. A wide, smooth, rain-wet asphalt road curves gently from the lower right toward the upper left, a low stone parapet on the seaward side, the sea far below a sheet of deep indigo, a very thin band of fading warm light on the horizon under a deep midnight-blue sky, faint cool haze. The wet road reflects the sky. The right-centre of the road is the lit area where the car will stand; the left third and the top are dark and calm for typography. [STYLE DNA]

#### CGT-BG-M — Background, mobile
- **Ratio / size:** 9:16 · 1152×2048
- **Prompt:** same as `CGT-BG-D`, then: *"Portrait 9:16; the road runs up the frame from the bottom edge toward the horizon at 70% height, the lit standing area in the lower-middle. [MOBILE SAFE ZONE]"*

#### CGT-CUT-A — Cut-out, front three-quarter (desktop) — required
- **Ratio / size:** 3:2 · 2304×1536 · transparent
- **Prompt:**

> Studio photograph of the attached Cambrian Grey Bentley Continental GT Azure, front three-quarter view from slightly below eye level, the nose toward the lower-right, on a fully transparent background (if unavailable: seamless flat mid-grey #7A7A7A, no floor line, no cast shadow). Whole car in frame with even margins. Large soft key from the upper left, a thin cool silver rim light along the roofline and the sharp rear haunch, soft neutral fill opposite; crisp studio reflections in the satin-grey paint; the crystal-cut headlamps lit softly, the matrix grille and winged badge accurate but subtle. [EXACT CAR] 70 mm, f/8. Nothing else in the frame.

#### CGT-CUT-B — Cut-out, pure side profile (mobile / featured section) — required
- **Ratio / size:** 3:2 · 2304×1536 · transparent
- **Prompt:** same as `CGT-CUT-A`, replacing the angle with: *"a pure side profile at wheel-hub height, nose to the right, so the fastback roofline and long bonnet read as one unbroken line."*

#### CGT-HERO-D / CGT-HERO-M — Composed fallback (also the OG image base)
- **Ratio / size:** D 16:9 · 2560×1440 · M 9:16 · 1152×2048
- **Attach:** `CGT-BG-D` (or `-M`) + real photos
- **Prompt (desktop):** *"Place the attached Bentley Continental GT Azure on the attached wet coast road, standing at the centre-right, front three-quarter view toward the lower-right, headlamps on low, its reflection in the wet asphalt, the horizon's thin warm band behind its roofline, a cool rim light on the haunch. Left third dark for typography. [EXACT CAR] [STYLE DNA]"*
- **Prompt (mobile):** same, then: *"Portrait 9:16; the car sits centred in the lower-middle band, seen from the front three-quarter. [MOBILE SAFE ZONE]"*

#### CGT-DET-01 — Exterior macro: the headlamp
- **Ratio / size:** 4:3 · 2048×1536
- **Prompt:**

> Macro photograph of the crystal-cut LED headlamp of the attached Cambrian Grey Bentley Continental GT, 100 mm macro, f/4: the faceted inner glass razor sharp, a soft silver highlight sliding across the grey bonnet above, background falling into deep indigo blue-hour darkness with one faint warm horizon glow. [EXACT CAR] [STYLE DNA]

#### CGT-DET-02 — Interior
- **Ratio / size:** 4:3 · 2048×1536
- **Attach:** the real interior photo of this car
- **Prompt:**

> Interior photograph of the attached Bentley Continental GT from the driver's door, the diamond-quilted leather seats in the exact colour of the attached interior, the rotating display and knurled metal controls, the dark veneer dashboard, dusk light from the windscreen and a soft warm glow from the ambient lighting. Shallow depth of field, 35 mm, f/2.8. No people, no readable screen text. [EXACT CAR] [STYLE DNA]

#### CGT-DET-03 — Rear three-quarter on the coast road
- **Ratio / size:** 4:3 · 2048×1536
- **Attach:** `CGT-BG-D` + real photos
- **Prompt:** *"The attached Continental GT from the rear three-quarter on the attached coast road, its oval tail lamps glowing, the sea's indigo and the horizon's warm band reflected in the rear glass, wet asphalt mirroring the car. Camera low, 50 mm. [EXACT CAR] [STYLE DNA]"*

---

### 4.3 Bentley Flying Spur Mulliner — `FSM` — The Salon (the light room)

**Environment concept.** The one pale room on the site, taken directly from the Rolls-Royce Phantom inspiration the client flagged: a seamless warm-grey studio (walls around `#D8D5CF`, floor a shade darker), soft overhead light, a faint floor reflection, and a black car with a black serif word behind it. After a run of dark rows, this row is the breath — the tonal contrast that makes the dark rooms feel darker. The Flying Spur, being the most formal car in the collection, wears it best.

**Attach for every FSM prompt:** 2–4 photos of the actual Flying Spur Mulliner.

#### FSM-BG-D — Background, desktop (light)
- **Use:** Collection row (light Scene) · Car detail hero (light variant)
- **Ratio / size:** 16:9 · 2560×1440
- **Attach:** none
- **Prompt:**

> Empty photographic studio, built for a dark luxury saloon to be placed in later — no car in the frame. A seamless, softly lit warm-grey cyclorama: the back wall a smooth pale warm grey (around #D8D5CF) fading very gently darker toward the corners, the floor a slightly deeper grey (around #C9C6BF) with a faint, soft mirror-like reflection where the car will stand at the centre-right. Light comes from a large soft source overhead and slightly in front, even and shadowless, with the merest cool gradient at the top edge. No horizon line, no props, no texture, no text. Calm, high-key, restrained, expensive; the mood of an haute-couture studio. Photoreal, 50 mm, f/8.

#### FSM-BG-M — Background, mobile (light)
- **Ratio / size:** 9:16 · 1152×2048
- **Prompt:** same as `FSM-BG-D`, then: *"Portrait 9:16; the floor reflection area sits in the lower-middle where the car will stand, the wall fills the upper half. [MOBILE SAFE ZONE]"*

#### FSM-CUT-A — Cut-out, front three-quarter (desktop) — required
- **Ratio / size:** 3:2 · 2304×1536 · transparent
- **Prompt:**

> Studio photograph of the attached Bentley Flying Spur Mulliner, front three-quarter view at eye level, nose toward the lower-left, on a fully transparent background (if unavailable: seamless flat mid-grey #7A7A7A, no floor line, no cast shadow). Whole car in frame with even margins. Lit for a pale, high-key studio: a large soft light overhead and slightly in front, so the roof and bonnet carry broad soft highlights and the flanks show clean, bright studio reflections; a subtle darker reflection under the sills; no coloured rim light. Paint in the exact colour of the attached photos; the Mulliner double-diamond grille and the flying B accurate but subtle; headlamps softly lit. [EXACT CAR] 70 mm, f/8. Nothing else in the frame.

#### FSM-CUT-B — Cut-out, pure side profile (mobile) — required
- **Ratio / size:** 3:2 · 2304×1536 · transparent
- **Prompt:** same as `FSM-CUT-A`, replacing the angle with: *"a pure side profile at wheel-hub height, nose to the right, so the long bonnet and the length of the rear door read as one line."*

#### FSM-HERO-D / FSM-HERO-M — Composed fallback (light)
- **Ratio / size:** D 16:9 · 2560×1440 · M 9:16 · 1152×2048
- **Attach:** `FSM-BG-D` (or `-M`) + real photos
- **Prompt (desktop):** *"Place the attached Flying Spur Mulliner into the attached pale studio at the centre-right, front three-quarter view toward the lower-left, its soft reflection in the pale floor, lit evenly from above and in front with broad soft highlights on the bonnet and roof, no coloured rim light. Left third of the wall stays empty for typography. [EXACT CAR] Photoreal, 50 mm, f/8, medium-format sharpness. No people, no text."*
- **Prompt (mobile):** same, then: *"Portrait 9:16; car centred in the lower-middle band, seen from the front three-quarter. [MOBILE SAFE ZONE]"*

#### FSM-DET-01 — Exterior macro: the flying B (light)
- **Ratio / size:** 4:3 · 2048×1536
- **Prompt:**

> Macro photograph of the retractable flying B mascot on the bonnet of the attached Flying Spur Mulliner against the pale warm-grey studio, 100 mm macro, f/2.8: the crystal wings and polished base razor sharp, the dark bonnet beneath it carrying a broad soft highlight, the double-diamond grille dissolving out of focus below, the background a smooth pale grey. Clean, bright, restrained. [EXACT CAR]

#### FSM-DET-02 — Interior, rear cabin
- **Ratio / size:** 4:3 · 2048×1536
- **Attach:** real interior photo
- **Prompt:**

> Interior photograph of the attached Flying Spur Mulliner rear cabin from the open rear door, in soft daylight: diamond-quilted seats in the exact colour of the attached interior, the veneered centre console, the touchscreen remote in its dock, deep-pile carpet, ambient lighting off, the pale studio visible softly through the far window. 35 mm, f/2.8. No people, no readable screen text. [EXACT CAR]

#### FSM-DET-03 — Side profile in the Salon
- **Ratio / size:** 4:3 · 2048×1536
- **Attach:** `FSM-BG-D` + real photos
- **Prompt:** *"The attached Flying Spur in pure side profile in the attached pale studio, the length of the car filling the frame, its soft reflection in the pale floor, lit evenly from above. 50 mm, camera at hub height. [EXACT CAR] Photoreal, no people, no text."*

> **Light-room note.** `[STYLE DNA]` is deliberately not used on the FSM set — it describes the dark world. Everything else (exact car, no text, no people, medium-format sharpness) still applies.

---

### 4.4 Mercedes-Benz S-Class 2022 — `SCL` — The District

**Environment concept.** King Abdullah Financial District at night: faceted glass towers, a wet granite plaza, cool white and warm-white window light. The executive car in its habitat. Cool, precise, modern.

**Attach for every SCL prompt:** 2–4 photos of the actual S-Class.

#### SCL-BG-D — Background, desktop
- **Ratio / size:** 16:9 · 2560×1440
- **Attach:** none
- **Prompt:**

> Night photograph of an empty granite plaza between modern faceted glass office towers in Riyadh's financial district, built for a car to be placed in later — no car, no people. Rain-wet dark granite paving reflecting the tower lights, the towers rising out of frame with cool white and warm-white window light, a row of slim architectural bollard lights, deep midnight sky. The centre-right of the plaza is the lit standing area; the left third of the frame is dark and quiet for typography. [STYLE DNA]

#### SCL-BG-M — Background, mobile
- **Ratio / size:** 9:16 · 1152×2048
- **Prompt:** same, then: *"Portrait 9:16; towers rise through the top half, the wet plaza fills the lower half. [MOBILE SAFE ZONE]"*

#### SCL-CUT-A — Cut-out, front three-quarter (desktop) — optional
- **Ratio / size:** 3:2 · 2304×1536 · transparent
- **Prompt:**

> Studio photograph of the attached 2022 Mercedes-Benz S-Class saloon, front three-quarter view at eye level, nose toward the lower-right, on a fully transparent background (if unavailable: seamless flat mid-grey #7A7A7A, no floor line, no cast shadow). Whole car in frame with even margins. Large soft key from the upper left, thin cool silver rim light along the roof and shoulder, soft neutral fill opposite; crisp reflections in the paint; the three-pointed star in the grille and the flush door handles accurate and subtle; headlamps softly lit. [EXACT CAR] 70 mm, f/8. Nothing else in the frame.

#### SCL-CUT-B — Cut-out, front-on (mobile) — optional
- **Ratio / size:** 4:5 · 1600×2000 · transparent
- **Prompt:** same, angle: *"seen straight-on from the front at headlamp height, very slightly from the right."*

#### SCL-HERO-D / SCL-HERO-M — Composed photograph (car detail hero) — required
- **Ratio / size:** D 16:9 · 2560×1440 · M 9:16 · 1152×2048
- **Attach:** `SCL-BG-D` (or `-M`) + real photos
- **Prompt (desktop):** *"Place the attached S-Class on the attached wet plaza at the centre-right, front three-quarter toward the lower-right, headlamps on, the tower lights reflected along its flank and in the wet granite beneath it. Left third dark for typography. [EXACT CAR] [STYLE DNA]"*
- **Prompt (mobile):** same, then: *"Portrait 9:16; car centred in the lower-middle band. [MOBILE SAFE ZONE]"*

#### SCL-CARD — Card portrait — required
- **Use:** The car's glass-edged card on the Collection page and in "Also in residence" (02 → §3.11). One image serves desktop and mobile.
- **Ratio / size:** 4:5 · 1600×2000
- **Attach:** `SCL-BG-D` + real photos
- **Prompt:**

> Portrait 4:5 photograph of the attached car standing in the attached wet plaza between the towers: front three-quarter view, the car large and centred in the lower 60% of the frame, the tower lights reflected along its flank and in the wet granite. The top 30% of the frame is calm and dark, free of detail, for a badge and the car's name; the bottom edge below the wheels fades gently darker for a glass strip. [EXACT CAR] [STYLE DNA]

#### SCL-DET-01 — Exterior macro: the star
- **Ratio / size:** 4:3 · 2048×1536
- **Prompt:**

> Macro photograph of the chrome three-pointed star in the grille of the attached S-Class, 100 mm macro, f/2.8, the star razor sharp with a cool highlight on its upper edge, the grille slats and bonnet falling out of focus, the background dissolving into cool tower-light bokeh against midnight black. [EXACT CAR] [STYLE DNA]

#### SCL-DET-02 — Interior
- **Ratio / size:** 4:3 · 2048×1536
- **Attach:** real interior photo
- **Prompt:**

> Interior photograph of the attached S-Class from the driver's door: the wide leather dashboard in the exact colour of the attached interior, the tall central display and the digital instrument cluster switched on but showing only a soft abstract glow (no readable text), the ambient light strip glowing a soft warm-white, the open-pore wood trim, night city lights soft beyond the windscreen. 35 mm, f/2.8. No people. [EXACT CAR] [STYLE DNA]

#### SCL-DET-03 — Rear three-quarter in the district
- **Ratio / size:** 4:3 · 2048×1536
- **Attach:** `SCL-BG-D` + real photos
- **Prompt:** *"The attached S-Class from the rear three-quarter on the attached plaza, tail lamps lit, the towers reflected in the rear glass and the wet granite. Camera low, 50 mm. [EXACT CAR] [STYLE DNA]"*

---
### 4.5 Range Rover Autobiography 2024 (74) — `RRA` — The Sandstone

**Environment concept.** The sandstone monoliths of AlUla in the last dark minutes before dawn: enormous rock forms, a floor of soft pale sand, a cool violet-grey pre-dawn sky with one faint warm edge. The only environment in the collection that is not man-made — because this is the car that leaves the city. Composed, cool, immense.

**Attach for every RRA prompt:** 2–4 photos of the actual Range Rover Autobiography.

#### RRA-BG-D — Background, desktop
- **Ratio / size:** 16:9 · 2560×1440
- **Attach:** none
- **Prompt:**

> Pre-dawn photograph of an empty desert floor among towering sandstone monoliths like those of AlUla, Saudi Arabia, built for a car to be placed in later — no car, no people, no tracks. A wide expanse of smooth pale sand in the foreground, two enormous rounded sandstone rock forms rising on the left and the far right, their surfaces catching the faintest cool light, a violet-grey pre-dawn sky with a single thin band of warm apricot light on the horizon. Very low key: the scene is dark, calm and vast. The centre-right sand is the lit standing area; the left third is darker for typography. [STYLE DNA]

#### RRA-BG-M — Background, mobile
- **Ratio / size:** 9:16 · 1152×2048
- **Prompt:** same, then: *"Portrait 9:16; a single monolith rises through the upper half, the sand floor fills the lower half. [MOBILE SAFE ZONE]"*

#### RRA-CUT-A — Cut-out, front three-quarter (desktop) — optional
- **Ratio / size:** 3:2 · 2304×1536 · transparent
- **Prompt:**

> Studio photograph of the attached 2024 Range Rover Autobiography, front three-quarter view from slightly below eye level, nose toward the lower-left, on a fully transparent background (if unavailable: seamless flat mid-grey #7A7A7A, no floor line, no cast shadow). Whole car in frame with even margins. Large soft key from the upper left, thin cool silver rim light along the flat roofline and the clean shoulder, soft neutral fill opposite; crisp reflections in the paint; the slim headlamps softly lit, the flush door handles, the wheels exactly as in the attached photo. [EXACT CAR] 70 mm, f/8. Nothing else in the frame.

#### RRA-CUT-B — Cut-out, front-on (mobile) — optional
- **Ratio / size:** 4:5 · 1600×2000 · transparent
- **Prompt:** same, angle: *"seen straight-on from the front at headlamp height, showing the full width and the upright grille."*

#### RRA-HERO-D / RRA-HERO-M — Composed photograph (Collection row + car detail hero) — required
- **Ratio / size:** D 16:9 · 2560×1440 · M 9:16 · 1152×2048
- **Attach:** `RRA-BG-D` (or `-M`) + real photos
- **Prompt (desktop):** *"Place the attached Range Rover Autobiography on the sand at the centre-right of the attached pre-dawn scene, front three-quarter view toward the lower-left, its headlamps on low, the faint warm horizon behind its roofline, cool light on the flank. No tracks in the sand. Left third dark for typography. [EXACT CAR] [STYLE DNA]"*
- **Prompt (mobile):** same, then: *"Portrait 9:16; car centred in the lower-middle band, monolith rising behind. [MOBILE SAFE ZONE]"*

#### RRA-DET-01 — Exterior macro: the lettering and headlamp edge
- **Ratio / size:** 4:3 · 2048×1536
- **Prompt:**

> Macro photograph of the front corner of the attached Range Rover Autobiography: the slim headlamp's edge and the bonnet lettering razor sharp, a cool pre-dawn highlight on the paint, the sandstone monolith a soft violet blur behind. 100 mm macro, f/2.8. [EXACT CAR] [STYLE DNA]

#### RRA-DET-02 — Interior
- **Ratio / size:** 4:3 · 2048×1536
- **Attach:** real interior photo
- **Prompt:**

> Interior photograph of the attached Range Rover Autobiography from the driver's door: the wide minimalist dashboard, the curved floating touchscreen showing only a soft dark glow (no readable text), the leather in the exact colour of the attached interior, the tall centre console, cool pre-dawn light through the panoramic roof, faint warm ambient light. 35 mm, f/2.8. No people. [EXACT CAR] [STYLE DNA]

#### RRA-DET-03 — Rear three-quarter among the rocks
- **Ratio / size:** 4:3 · 2048×1536
- **Attach:** `RRA-BG-D` + real photos
- **Prompt:** *"The attached Range Rover from the rear three-quarter on the sand, the hidden-until-lit tail lamps glowing, the monolith looming behind, a faint apricot horizon. Camera low, 50 mm. [EXACT CAR] [STYLE DNA]"*

---

### 4.6 GMC Yukon Denali — `YUK` — The Villa

**Environment concept.** The driveway of a modern Riyadh villa at night: travertine walls, warm linear light grazing the stone, a black basalt driveway, tall palms lit from below. The family flagship, at home.

**Attach for every YUK prompt:** 2–4 photos of the actual Yukon Denali.

#### YUK-BG-D — Background, desktop
- **Ratio / size:** 16:9 · 2560×1440
- **Attach:** none
- **Prompt:**

> Night photograph of an empty driveway of a modern minimalist villa in Riyadh, built for a car to be placed in later — no car, no people. A long wall of pale travertine grazed by warm linear light from concealed fixtures, a wide black basalt driveway reflecting the light, two tall date palms lit softly from below on the right, a slim horizontal band of warm interior light from a window at the far left, a deep midnight sky. The centre-right of the driveway is the lit standing area; the left third is dark for typography. [STYLE DNA]

#### YUK-BG-M — Background, mobile
- **Ratio / size:** 9:16 · 1152×2048
- **Prompt:** same, then: *"Portrait 9:16; the travertine wall and palms fill the upper half, the basalt driveway the lower half. [MOBILE SAFE ZONE]"*

#### YUK-CUT-A — Cut-out, front three-quarter (desktop) — optional
- **Ratio / size:** 3:2 · 2304×1536 · transparent
- **Prompt:**

> Studio photograph of the attached GMC Yukon Denali, front three-quarter view from slightly below eye level, nose toward the lower-right, on a fully transparent background (if unavailable: seamless flat mid-grey #7A7A7A, no floor line, no cast shadow). Whole vehicle in frame with even margins. Large soft key from the upper left, thin cool silver rim light along the tall roofline and shoulder, soft neutral fill opposite; crisp reflections in the paint; the large chrome Denali grille and C-shaped headlamps accurate and subtle, headlamps softly lit; wheels exactly as attached. [EXACT CAR] 70 mm, f/8. Nothing else in the frame.

#### YUK-CUT-B — Cut-out, front-on (mobile) — optional
- **Ratio / size:** 4:5 · 1600×2000 · transparent
- **Prompt:** same, angle: *"seen straight-on from the front, camera at grille height, showing the full imposing width."*

#### YUK-HERO-D / YUK-HERO-M — Composed photograph (car detail hero) — required
- **Ratio / size:** D 16:9 · 2560×1440 · M 9:16 · 1152×2048
- **Attach:** `YUK-BG-D` (or `-M`) + real photos
- **Prompt (desktop):** *"Place the attached Yukon Denali on the attached villa driveway at the centre-right, front three-quarter toward the lower-right, its reflection in the basalt, the warm wall light along its flank, palms behind. Left third dark for typography. [EXACT CAR] [STYLE DNA]"*
- **Prompt (mobile):** same, then: *"Portrait 9:16; vehicle centred in the lower-middle band. [MOBILE SAFE ZONE]"*

#### YUK-CARD — Card portrait — required
- **Use:** The car's glass-edged card on the Collection page and in "Also in residence" (02 → §3.11). One image serves desktop and mobile.
- **Ratio / size:** 4:5 · 1600×2000
- **Attach:** `YUK-BG-D` + real photos
- **Prompt:**

> Portrait 4:5 photograph of the attached car standing in the attached villa driveway: front three-quarter view, the car large and centred in the lower 60% of the frame, the warm travertine wall light along its flank, the basalt reflecting it. The top 30% of the frame is calm and dark, free of detail, for a badge and the car's name; the bottom edge below the wheels fades gently darker for a glass strip. [EXACT CAR] [STYLE DNA]

#### YUK-DET-01 — Exterior macro: the grille
- **Ratio / size:** 4:3 · 2048×1536
- **Prompt:**

> Macro photograph of the chrome grille mesh and the corner of the headlamp of the attached Yukon Denali, 100 mm macro, f/4, chrome catching a warm tungsten highlight from the wall lights, the travertine wall a soft warm blur behind. [EXACT CAR] [STYLE DNA]

#### YUK-DET-02 — Interior, second row
- **Ratio / size:** 4:3 · 2048×1536
- **Attach:** real interior photo
- **Prompt:**

> Interior photograph of the attached Yukon Denali from the open rear door showing the second-row captain's chairs in the exact leather colour of the attached interior, the wide centre console ahead, the rear entertainment screens dark, the panoramic roof faintly reflecting warm exterior light, a soft cool fill from the far window. 28 mm, f/2.8. No people, no readable text. [EXACT CAR] [STYLE DNA]

#### YUK-DET-03 — Rear three-quarter, tailgate to the house
- **Ratio / size:** 4:3 · 2048×1536
- **Attach:** `YUK-BG-D` + real photos
- **Prompt:** *"The attached Yukon Denali from the rear three-quarter on the villa driveway, tail lamps lit, the travertine wall and palms reflected in the rear glass, basalt mirroring the vehicle. 50 mm, low. [EXACT CAR] [STYLE DNA]"*

---

### 4.7 Chevrolet Corvette C8 Stingray — `C8` — The Light Lines

**Environment concept.** A pure black studio with parallel horizontal light lines receding into the dark and a mirror floor — the same graphic energy as the inspiration the client flagged, but with every line in the same cool white. The only environment that is purely graphic — for the only mid-engine American car.

**Attach for every C8 prompt:** 2–4 photos of the actual C8 in stock (the bright blue one seen in the showroom photo).

#### C8-BG-D — Background, desktop
- **Ratio / size:** 16:9 · 2560×1440
- **Attach:** none
- **Prompt:**

> Empty black photographic studio built for a sports car to be placed in later — no car in the frame. A vast black space with a mirror-polished black floor. On the back wall and along both side walls, thin horizontal lines of cool white light run parallel toward a vanishing point at the centre, evenly spaced, growing dimmer with distance, all the same cool white. The lines reflect in the floor as a second set. The centre of the floor is softly lit where the car will stand; the upper 35% of the frame is pure black for a giant headline. Crisp, graphic, precise. [STYLE DNA]

#### C8-BG-M — Background, mobile
- **Ratio / size:** 9:16 · 1152×2048
- **Prompt:** same, then: *"Portrait 9:16; the vanishing point sits at 58% of the frame height, lines converging from both sides, the lit floor area in the lower third. [MOBILE SAFE ZONE]"*

#### C8-CUT-A — Cut-out, front three-quarter, low (desktop) — optional
- **Ratio / size:** 3:2 · 2304×1536 · transparent
- **Prompt:**

> Studio photograph of the attached bright blue Chevrolet Corvette C8 Stingray, front three-quarter view from a low camera at headlamp height, nose toward the lower-left, on a fully transparent background (if unavailable: seamless flat mid-grey #7A7A7A, no floor line, no cast shadow). Whole car in frame with even margins. Large soft key from the upper left, thin cool silver rim light along the roof and the sharp side intake edge, soft neutral fill opposite; crisp reflections in the blue paint; the slim headlamps and the mid-engine cabin-forward proportions exact; wheels exactly as attached. [EXACT CAR] 70 mm, f/8. Nothing else in the frame.

#### C8-CUT-B — Cut-out, rear three-quarter (mobile alt) — optional
- **Ratio / size:** 3:2 · 2304×1536 · transparent
- **Prompt:** same, angle: *"rear three-quarter view, low, the tail toward the lower-right, showing the quad exhausts, the rear spoiler and the engine cover."*

#### C8-HERO-D / C8-HERO-M — Composed photograph (Collection row + car detail hero) — required
- **Ratio / size:** D 16:9 · 2560×1440 · M 9:16 · 1152×2048
- **Attach:** `C8-BG-D` (or `-M`) + real photos
- **Prompt (desktop):** *"Place the attached blue Corvette C8 at the centre of the attached light-line studio, front three-quarter toward the lower-left, low camera, the white lines reflected along its flank and mirrored in the floor beneath it. Upper third black for typography. [EXACT CAR] [STYLE DNA]"*
- **Prompt (mobile):** same, then: *"Portrait 9:16; car centred in the lower-middle band. [MOBILE SAFE ZONE]"*

#### C8-DET-01 — Exterior macro: the side intake
- **Ratio / size:** 4:3 · 2048×1536
- **Prompt:**

> Macro photograph of the sharp side air intake and rear wheel arch of the attached blue Corvette C8, 100 mm macro, f/4, the white light lines of the studio reflected as thin streaks along the blue paint, the background pure black. [EXACT CAR] [STYLE DNA]

#### C8-DET-02 — Interior, the cockpit
- **Ratio / size:** 4:3 · 2048×1536
- **Attach:** real interior photo
- **Prompt:**

> Interior photograph of the attached Corvette C8 from the driver's door: the driver-focused cockpit with the tall wall of switches on the centre spine, the square-topped steering wheel, the seats in the exact colour of the attached interior, the digital cluster showing only a soft glow (no readable text), cool white studio light lines reflected in the glass. 28 mm, f/2.8. No people. [EXACT CAR] [STYLE DNA]

#### C8-DET-03 — Rear, low, with the lines
- **Ratio / size:** 4:3 · 2048×1536
- **Attach:** `C8-BG-D` + real photos
- **Prompt:** *"The attached Corvette C8 straight from behind, camera at bumper height, the tail lamps glowing, the quad exhausts and wide hips filling the lower frame, the light lines converging above and reflected below. [EXACT CAR] [STYLE DNA]"*

---
### 4.8 Lamborghini Urus — `URU` — The Bunker

**Environment concept.** A brutalist underground space: raw board-formed concrete, one square skylight far above throwing a single shaft of light onto a wet concrete floor, everything else in darkness. Hard architecture for the hardest-edged car on the floor. (The showroom photos show a metallic gold/yellow Urus; match whatever is in stock.)

**Attach for every URU prompt:** 2–4 photos of the actual Urus.

#### URU-BG-D — Background, desktop
- **Ratio / size:** 16:9 · 2560×1440
- **Attach:** none
- **Prompt:**

> Night photograph of an empty brutalist underground concrete hall, built for a car to be placed in later — no car, no people. Raw board-formed concrete walls and massive square columns, a wet dark concrete floor, and one square opening high above through which a single vertical shaft of cool white light falls onto the floor at the centre-right, forming a bright rectangle with soft edges; a much fainter secondary glow low along the far wall. Everything outside the shaft is near-black with just enough detail to read the architecture. Left third of the frame dark for typography. [STYLE DNA]

#### URU-BG-M — Background, mobile
- **Ratio / size:** 9:16 · 1152×2048
- **Prompt:** same, then: *"Portrait 9:16; the shaft of light falls from the top of the frame to a lit rectangle in the lower-middle. [MOBILE SAFE ZONE]"*

#### URU-CUT-A — Cut-out, front three-quarter, low (desktop) — optional
- **Ratio / size:** 3:2 · 2304×1536 · transparent
- **Prompt:**

> Studio photograph of the attached Lamborghini Urus, front three-quarter view from a low camera, nose toward the lower-right, on a fully transparent background (if unavailable: seamless flat mid-grey #7A7A7A, no floor line, no cast shadow). Whole car in frame with even margins. Large soft key from the upper left, thin cool silver rim light along the roof and the sharp shoulder crease, soft neutral fill opposite; crisp reflections in the paint in the exact colour of the attached photos; the Y-shaped daytime running lights softly lit, the hexagonal intakes and the badge accurate and subtle; wheels exactly as attached. [EXACT CAR] 70 mm, f/8. Nothing else in the frame.

#### URU-CUT-B — Cut-out, front-on (mobile) — optional
- **Ratio / size:** 4:5 · 1600×2000 · transparent
- **Prompt:** same, angle: *"seen straight-on from the front at bumper height, the full width and the Y-shaped lights dominating."*

#### URU-HERO-D / URU-HERO-M — Composed photograph (car detail hero) — required
- **Ratio / size:** D 16:9 · 2560×1440 · M 9:16 · 1152×2048
- **Attach:** `URU-BG-D` (or `-M`) + real photos
- **Prompt (desktop):** *"Place the attached Urus inside the shaft of light in the attached concrete hall at the centre-right, front three-quarter toward the lower-right, low camera, the top of the car brightly lit from above, the flanks falling into shadow, its reflection in the wet floor. Left third dark for typography. [EXACT CAR] [STYLE DNA]"*
- **Prompt (mobile):** same, then: *"Portrait 9:16; car centred in the lower-middle band beneath the shaft. [MOBILE SAFE ZONE]"*

#### URU-CARD — Card portrait — required
- **Use:** The car's glass-edged card on the Collection page and in "Also in residence" (02 → §3.11). One image serves desktop and mobile.
- **Ratio / size:** 4:5 · 1600×2000
- **Attach:** `URU-BG-D` + real photos
- **Prompt:**

> Portrait 4:5 photograph of the attached car standing in the attached concrete hall, inside the shaft of light: front three-quarter view, the car large and centred in the lower 60% of the frame, the top of the car lit hard from above, the flanks in shadow, the wet floor reflecting it. The top 30% of the frame is calm and dark, free of detail, for a badge and the car's name; the bottom edge below the wheels fades gently darker for a glass strip. [EXACT CAR] [STYLE DNA]

#### URU-DET-01 — Exterior macro: the Y light
- **Ratio / size:** 4:3 · 2048×1536
- **Prompt:**

> Macro photograph of the Y-shaped daytime running light and the sharp hexagonal intake of the attached Urus, 100 mm macro, f/4, the light element crisp, the paint catching a hard cool highlight from above and a faint softer one from the side, raw concrete a dark blur behind. [EXACT CAR] [STYLE DNA]

#### URU-DET-02 — Interior
- **Ratio / size:** 4:3 · 2048×1536
- **Attach:** real interior photo
- **Prompt:**

> Interior photograph of the attached Urus from the driver's door: the hexagonal design language of the dashboard, the red start-button cover under its flap, the twin centre touchscreens dark with a faint glow (no readable text), the seats in the exact colour and stitching of the attached interior, a shaft of cool light from above and a warm ambient glow. 28 mm, f/2.8. No people. [EXACT CAR] [STYLE DNA]

#### URU-DET-03 — Rear three-quarter in the bunker
- **Ratio / size:** 4:3 · 2048×1536
- **Attach:** `URU-BG-D` + real photos
- **Prompt:** *"The attached Urus from the rear three-quarter at the edge of the shaft of light, Y-shaped tail lamps lit, the concrete column beside it, the wet floor mirroring the car. Low camera, 50 mm. [EXACT CAR] [STYLE DNA]"*

---

### 4.9 Porsche 911 — `911` — The Pass

**Environment concept.** A rain-wet mountain pass at night: the mouth of a tunnel glowing warm sodium-amber behind, wet asphalt, a steel barrier, the mountain a black mass, fine mist. The driver's car, on a driver's road. (Match the black 911 seen in the showroom photo; confirm generation and variant from the real photos.)

**Attach for every 911 prompt:** 2–4 photos of the actual 911.

#### 911-BG-D — Background, desktop
- **Ratio / size:** 16:9 · 2560×1440
- **Attach:** none
- **Prompt:**

> Night photograph of an empty rain-wet mountain road just outside a tunnel, built for a car to be placed in later — no car, no people. The tunnel mouth glows warm amber at the upper left of the frame, the wet asphalt curves from the tunnel toward the lower right reflecting the amber light, a steel guard rail on the right edge, the mountain a black mass above, fine mist hanging in the air, a deep midnight-blue sky. The centre-right of the road is the lit standing area; the upper-right is dark and calm for typography. [STYLE DNA]

#### 911-BG-M — Background, mobile
- **Ratio / size:** 9:16 · 1152×2048
- **Prompt:** same, then: *"Portrait 9:16; the tunnel mouth glows in the upper-middle, the wet road runs down to the bottom edge. [MOBILE SAFE ZONE]"*

#### 911-CUT-A — Cut-out, rear three-quarter, low (desktop) — optional
- **Ratio / size:** 3:2 · 2304×1536 · transparent
- **Prompt:**

> Studio photograph of the attached Porsche 911, rear three-quarter view from a low camera, the tail toward the lower-left, on a fully transparent background (if unavailable: seamless flat mid-grey #7A7A7A, no floor line, no cast shadow). Whole car in frame with even margins. Large soft key from the upper left, a thin cool silver rim light tracing the famous roofline from the windscreen down to the tail, cool fill opposite; crisp reflections in the paint in the exact colour of the attached photos; the full-width light bar softly lit, the wide rear hips and the exact wheels from the attached photos. [EXACT CAR] 70 mm, f/8. Nothing else in the frame.

#### 911-CUT-B — Cut-out, front three-quarter (mobile alt) — optional
- **Ratio / size:** 3:2 · 2304×1536 · transparent
- **Prompt:** same, angle: *"front three-quarter view, low, nose toward the lower-right, the round headlamps softly lit."*

#### 911-HERO-D / 911-HERO-M — Composed photograph (Collection row + car detail hero) — required
- **Ratio / size:** D 16:9 · 2560×1440 · M 9:16 · 1152×2048
- **Attach:** `911-BG-D` (or `-M`) + real photos
- **Prompt (desktop):** *"Place the attached 911 on the wet road of the attached mountain pass at the centre-right, rear three-quarter view with the tail toward the lower-left, the light bar glowing, the amber tunnel light reflected along the roofline and in the wet asphalt, mist behind. Upper-right dark for typography. [EXACT CAR] [STYLE DNA]"*
- **Prompt (mobile):** same, then: *"Portrait 9:16; car centred in the lower-middle band, tunnel glow above it. [MOBILE SAFE ZONE]"*

#### 911-DET-01 — Exterior macro: the light bar
- **Ratio / size:** 4:3 · 2048×1536
- **Prompt:**

> Macro photograph of the glowing full-width rear light bar and the engine-lid grille of the attached 911, 100 mm macro, f/4, the red light element crisp, rain droplets beaded on the paint, the amber tunnel mouth a soft blur behind. [EXACT CAR] [STYLE DNA]

#### 911-DET-02 — Interior
- **Ratio / size:** 4:3 · 2048×1536
- **Attach:** real interior photo
- **Prompt:**

> Interior photograph of the attached 911 from the driver's door: the small three-spoke steering wheel, the instrument cluster with its central dial showing only a soft glow (no readable text), the seats in the exact colour of the attached interior, the short centre console, amber tunnel light glowing softly through the rear glass and cool fill from the side. 28 mm, f/2.8. No people. [EXACT CAR] [STYLE DNA]

#### 911-DET-03 — Motion: leaving the tunnel (the one moving image)
- **Ratio / size:** 4:3 · 2048×1536
- **Attach:** `911-BG-D` + real photos
- **Prompt:** *"The attached 911 driving out of the amber tunnel toward the camera on the wet road, panned so the car is sharp and the tunnel walls and road streak into gentle motion blur, headlamps on, spray faint behind the rear wheels. 85 mm, 1/60 s pan. [EXACT CAR] [STYLE DNA] (motion blur permitted in this image only)"*

---

### 4.10 Mercedes-AMG G 63 — `G63` — The Wadi

**Environment concept.** A rocky desert wadi under a full moon: cool blue light, dark boulders, a pale sandy floor, a faint dust haze. The square car in the roughest room. Unmoved by anything.

**Attach for every G63 prompt:** 2–4 photos of the actual G 63.

#### G63-BG-D — Background, desktop
- **Ratio / size:** 16:9 · 2560×1440
- **Attach:** none
- **Prompt:**

> Night photograph of an empty rocky desert wadi under a full moon, built for a car to be placed in later — no car, no people, no tracks. Dark boulders and a low rocky ridge on the left, a flat pale sandy floor in the centre-right, a faint dust haze glowing cool blue in the moonlight, the moon itself out of frame, a very faint warm glow low on the horizon at the far right. Very low key, deep blue-black, calm. The centre-right sand is the lit standing area; the left third is darker for typography. [STYLE DNA]

#### G63-BG-M — Background, mobile
- **Ratio / size:** 9:16 · 1152×2048
- **Prompt:** same, then: *"Portrait 9:16; the ridge rises through the upper half, the sandy floor fills the lower half. [MOBILE SAFE ZONE]"*

#### G63-CUT-A — Cut-out, front three-quarter (desktop) — optional
- **Ratio / size:** 3:2 · 2304×1536 · transparent
- **Prompt:**

> Studio photograph of the attached Mercedes-AMG G 63, front three-quarter view from slightly below eye level, nose toward the lower-left, on a fully transparent background (if unavailable: seamless flat mid-grey #7A7A7A, no floor line, no cast shadow). Whole vehicle in frame with even margins. Large soft key from the upper left, a thin cool silver rim light along the flat roof edge and the exposed door hinges, soft neutral fill opposite; crisp reflections in the paint in the exact colour of the attached photos; round headlamps softly lit, the AMG grille and the spare-wheel cover accurate; wheels exactly as attached. [EXACT CAR] 70 mm, f/8. Nothing else in the frame.

#### G63-CUT-B — Cut-out, front-on (mobile) — optional
- **Ratio / size:** 4:5 · 1600×2000 · transparent
- **Prompt:** same, angle: *"seen straight-on from the front at grille height, the boxy silhouette and round headlamps dominating."*

#### G63-HERO-D / G63-HERO-M — Composed photograph (car detail hero) — required
- **Ratio / size:** D 16:9 · 2560×1440 · M 9:16 · 1152×2048
- **Attach:** `G63-BG-D` (or `-M`) + real photos
- **Prompt (desktop):** *"Place the attached G 63 on the sandy floor of the attached moonlit wadi at the centre-right, front three-quarter toward the lower-left, headlamps on, cool moonlight on the roof and a faint warm rim on the flank from the horizon, dust haze behind. No tracks. Left third dark for typography. [EXACT CAR] [STYLE DNA]"*
- **Prompt (mobile):** same, then: *"Portrait 9:16; vehicle centred in the lower-middle band. [MOBILE SAFE ZONE]"*

#### G63-CARD — Card portrait — required
- **Use:** The car's glass-edged card on the Collection page and in "Also in residence" (02 → §3.11). One image serves desktop and mobile.
- **Ratio / size:** 4:5 · 1600×2000
- **Attach:** `G63-BG-D` + real photos
- **Prompt:**

> Portrait 4:5 photograph of the attached car standing in the attached moonlit wadi: front three-quarter view, the car large and centred in the lower 60% of the frame, cool moonlight on the roof, the ridge behind under blue moonlight. The top 30% of the frame is calm and dark, free of detail, for a badge and the car's name; the bottom edge below the wheels fades gently darker for a glass strip. [EXACT CAR] [STYLE DNA]

#### G63-DET-01 — Exterior macro: the hinge and indicator
- **Ratio / size:** 4:3 · 2048×1536
- **Prompt:**

> Macro photograph of the exposed door hinge and the top-mounted indicator lamp of the attached G 63, 100 mm macro, f/4, cool moonlight highlight on the flat panel, the rocky ridge a deep blue blur behind. [EXACT CAR] [STYLE DNA]

#### G63-DET-02 — Interior
- **Ratio / size:** 4:3 · 2048×1536
- **Attach:** real interior photo
- **Prompt:**

> Interior photograph of the attached G 63 from the driver's door: the upright dashboard with the wide screen showing only a soft glow (no readable text), the grab handle on the passenger side, the three differential-lock switches, the seats in the exact colour and stitching of the attached interior, cool moonlight through the flat windscreen and a warm ambient glow. 28 mm, f/2.8. No people. [EXACT CAR] [STYLE DNA]

#### G63-DET-03 — Rear three-quarter in the wadi
- **Ratio / size:** 4:3 · 2048×1536
- **Attach:** `G63-BG-D` + real photos
- **Prompt:** *"The attached G 63 from the rear three-quarter on the sand, the spare-wheel cover and tail lamps sharp, boulders behind under blue moonlight, a faint warm horizon at the right. Low camera, 50 mm. [EXACT CAR] [STYLE DNA]"*

---

### 4.11 Adding more cars later

For any new car, first decide its **treatment** — Scene (needs cut-outs and a giant word; keep these to three or four on the whole site), Photograph, or Card — then copy the matching car's prompts and change three things: the **environment** (pick from the list below or invent one that says something true about the car — and check its temperature alternates with its neighbours on the page), the **angle** (front ¾ for SUVs and saloons, low front ¾ or rear ¾ for sports cars, pure side for grand tourers), and the **giant word** if it is a Scene.

Spare environments, already in the same tonal world: *The Atrium* (black marble lobby, single skylight) · *The Hangar* (private jet hangar, aircraft nose out of focus) · *The Marina* (superyacht stern lights on black water) · *The Library* (dark wood and brass, one lamp) · *The Salt Flat* (moonlit white flat, endless) · *The Terrace* (rooftop over Riyadh skyline). Suggested additions if stock allows, because they photograph superbly in this system and sell strongly in the Kingdom: Cadillac Escalade (The Terrace), Lexus LX 600 (The Atrium), Mercedes-Maybach GLS 600 (The Hangar), Rolls-Royce Ghost (The Library), Land Cruiser 300 GR Sport (The Salt Flat).

---
## 5. Car detail page — shared assets

Every car detail page uses its own set (§4). These are the shared ones.

### CD-KEY-01 — The key on marble
- **Use:** Car detail "Enquire" block background; Services "Finance" card.
- **Ratio / size:** 4:3 · 2048×1536
- **Attach:** none
- **Prompt:**

> Still-life photograph of a single luxury car key fob — an unbranded, elegant black-and-polished-metal fob with no visible logo — resting on a slab of dark, softly veined black marble, beside it a folded sheet of thick cream paper and a black fountain pen, all lit by one soft warm light from the upper left so the metal edge catches a clean highlight; everything else dissolves into deep black. 85 mm, f/2.8, shallow depth of field. No text, no logos, no hands. [STYLE DNA]

### CD-PROV-01 — Provenance: the inspection bay
- **Use:** Car detail "Papers in order" block; Home "Certainty" alt; Services "Trade-in" card.
- **Ratio / size:** 4:3 · 2048×1536
- **Attach:** photo of the Range Rover Autobiography (or any dark SUV in stock)
- **Prompt:**

> Photograph of the attached vehicle raised on a clean four-post lift in a spotless dark workshop bay, lit dramatically from below and from a single soft overhead light so the underbody and wheels are clearly visible, the polished dark epoxy floor reflecting the car, walls black, no tools or clutter visible, no people. Clinical, calm, trustworthy. [EXACT CAR] [STYLE DNA]

### CD-GALLERY-STRIP — Reuse
Gallery uses `[CODE]-HERO-D`, `[CODE]-DET-01`, `[CODE]-DET-02`, `[CODE]-DET-03`, `[CODE]-HERO-M` (portrait tile), plus real photographs of the car cleaned with the retouch recipe in §8.

---

## 6. Services page imagery

Every service is a **glass card on a macro photograph** (the §H4 treatment), alternating sides. One photograph per service, desktop and mobile.

### SV-HERO-D / SV-HERO-M — "Beyond the sale" hero
- **Use:** Services page hero (giant word "BEYOND" between background and… nothing — no cut-out here; the covered car is the image).
- **Ratio / size:** D 16:9 · 2560×1440 · M 9:16 · 1152×2048
- **Attach:** `SH-05-D`
- **Prompt (desktop):**

> Photograph inside the attached showroom at night of a single large luxury car completely covered by a fitted, matte, pale stone-grey indoor car cover, standing alone in a pool of soft light on the cream marble, its silhouette unmistakably a long grand tourer, the cover's folds catching a thin warm highlight, the floor reflecting it. Room otherwise dark. Left third of the frame calm for typography. No people, no text, no logos. [STYLE DNA]

- **Prompt (mobile):** same, then: *"Portrait 9:16; the covered car centred in the lower-middle band. [MOBILE SAFE ZONE]"*

### SV-01-D / SV-01-M — Sourcing: "Name it. We'll find it."
- **Ratio / size:** D 16:9 · 2560×1440 · M 9:16 · 1152×2048
- **Attach:** none
- **Prompt (desktop):**

> Night photograph on the tarmac of a private aviation terminal: the open ramp of a cargo aircraft glowing warm from inside at the upper left, and in the foreground, out of focus, the corner of a luxury car under a fitted dark cover being unloaded on a low trolley, its cover edge catching a clean white highlight. Deep midnight-blue night, wet tarmac reflections, faint runway lights in the distance. Right half of the frame dark and smooth for a glass card. No people, no aircraft livery, no text. [STYLE DNA]

- **Prompt (mobile):** same, then: *"Portrait 9:16; the aircraft ramp glows in the upper third, the covered car in the lower third. [MOBILE SAFE ZONE]"*

### SV-02-D / SV-02-M — Finance: "Terms as tailored as the car."
- **Ratio / size:** D 16:9 · 2560×1440 · M 9:16 · 1152×2048
- **Attach:** `CD-KEY-01`
- **Prompt (desktop):** *"Re-frame the attached still life as a wide landscape: the key, the folded cream paper and the pen occupy the left third on the dark marble, the right two-thirds is smooth, empty, near-black marble for a glass card. Same lighting, same grade. No text. [STYLE DNA]"*
- **Prompt (mobile):** *"Portrait 9:16 of the same still life; the objects in the upper third, empty dark marble below. [MOBILE SAFE ZONE]"*

### SV-03-D / SV-03-M — Trade-in: "Your current car, valued fairly."
- **Ratio / size:** D 16:9 · 2560×1440 · M 9:16 · 1152×2048
- **Attach:** `CD-PROV-01`
- **Prompt (desktop):** *"Re-frame the attached inspection-bay photograph as a wide landscape with the raised vehicle on the left half and the right half a smooth, dark, empty workshop wall for a glass card. Same lighting and grade. No people, no text. [STYLE DNA]"*
- **Prompt (mobile):** *"Portrait 9:16; the raised vehicle fills the upper half, dark floor below. [MOBILE SAFE ZONE]"*

### SV-04-D / SV-04-M — Registration & export: "Papers, plates and borders — handled."
- **Ratio / size:** D 16:9 · 2560×1440 · M 9:16 · 1152×2048
- **Attach:** `SH-02-D`
- **Prompt (desktop):**

> Night photograph outside the attached showroom: a sleek black enclosed car transporter parked at the kerb with its rear ramp lowered and its interior lit warm, the glass façade of the showroom glowing behind, a dark luxury SUV under a fitted cover halfway up the ramp, wet pavement reflections. The left half of the frame is the darker street for a glass card. No people, no readable text, no company livery on the truck. [STYLE DNA]

- **Prompt (mobile):** same, then: *"Portrait 9:16; the transporter's lit interior in the middle band. [MOBILE SAFE ZONE]"*

### SV-05-D / SV-05-M — Aftercare: "Kept as it arrived."
- **Ratio / size:** D 16:9 · 2560×1440 · M 9:16 · 1152×2048
- **Attach:** photo of the Cambrian Grey Continental GT
- **Prompt (desktop):**

> Extreme macro photograph of water beading on the freshly detailed satin-grey paint of the attached Bentley Continental GT, hundreds of perfect droplets on the curved bonnet catching a white highlight from the upper left and cool blue reflections from the right, the surface curving away into deep black. 100 mm macro, f/5.6. The right half of the frame becomes smooth dark paint for a glass card. [EXACT CAR] [STYLE DNA]

- **Prompt (mobile):** same, then: *"Portrait 9:16; the droplets in the upper half, smooth dark paint below. [MOBILE SAFE ZONE]"*

### SV-06-D / SV-06-M — Delivery: "To your door, under cover."
- **Ratio / size:** D 16:9 · 2560×1440 · M 9:16 · 1152×2048
- **Attach:** `YUK-BG-D` (the villa) + photo of the Rolls-Royce Cullinan
- **Prompt (desktop):**

> Night photograph on the attached villa driveway: the attached Rolls-Royce Cullinan standing at the centre-right with a fitted pale stone-grey car cover drawn halfway back from the front, revealing the grille and headlamps which are softly lit, the rest of the car still covered, the travertine wall warm behind, the basalt floor reflecting it. Left third dark for a glass card. No people, no text. [EXACT CAR] [STYLE DNA]

- **Prompt (mobile):** same, then: *"Portrait 9:16; the half-unveiled car centred in the lower-middle band. [MOBILE SAFE ZONE]"*

---

## 7. Visit / Contact page imagery

### CT-HERO-D / CT-HERO-M — "You are expected." — Reuse `SH-06-D/-M` (the façade from across the boulevard). Giant word "MAJLIS" / "المجلس" over it.

### CT-MAJLIS-01 — Reuse `SH-09` (the coffee still life) beside the form.

### CT-MAP-D / CT-MAP-M — Reuse `HM-MAP-D/-M` behind the live map.

### CT-DOOR-01 — The door handle
- **Use:** Contact form success state; small detail tile on the Visit page.
- **Ratio / size:** 1:1 · 2048×2048
- **Attach:** `SH-02-D`
- **Prompt:**

> Macro photograph of the long brushed-steel pull handle of the attached showroom's frameless glass entrance door at night, the handle razor sharp with a clean highlight along its edge, the warm interior and the gleam of a car's flank a soft blur through the glass behind, the pavement lights reflected faintly. 85 mm, f/2. No people, no text. [STYLE DNA]

---

## 8. Retouch recipe for the client's real car photographs

The site will also show real photographs of each car (gallery, provenance). Run every real photo through this prompt before use so it matches the generated world.

### RT-CAR — Real photo clean-up
- **Ratio / size:** keep the original ratio; request 2048 px on the long edge
- **Attach:** the real photograph
- **Prompt:**

> Retouch the attached real photograph of this car for a luxury showroom website without changing the car in any way: keep the exact colour, wheels, trim, badges, angle and proportions. Remove people, reflections of the photographer, price tags, stickers, cones, cables, clutter, and blur or blank the number plate. Clean the floor, remove dust and fingerprints from the paint, correct verticals, and balance the exposure. Re-grade to a low-key, slightly desaturated look with deep clean blacks, neutral highlights and clean, very slightly cool shadows; darken and simplify the background so the car is the only bright subject. No added text, no lens flare, no HDR halo. Photoreal.

---

## 9. Utility assets

### UT-GLOW-01 — Soft light, square
- **Use:** Behind forms, behind the preloader mark, 404, empty states. Generate once; also reuse `BR-03`.
- **Ratio / size:** 1:1 · 2048×2048
- **Attach:** none
- **Prompt:**

> Abstract background photograph: a single, very soft, large white glow at the centre of a pure black frame, like a distant light seen through frosted glass, fading smoothly to black at the edges, with a faint fine film grain. Nothing else. No shapes, no rays, no bokeh circles, no text.

### UT-404-D / UT-404-M — "Nothing here. Yet."
- **Ratio / size:** D 16:9 · 2560×1440 · M 9:16 · 1152×2048
- **Attach:** `SH-05-D`
- **Prompt (desktop):** *"The attached showroom interior at night with the single pool of light on the marble — but with no car in it, just the empty lit floor and the faint reflection of the ceiling grid. Calm, expectant, dark. No text, no people. [STYLE DNA]"*
- **Prompt (mobile):** same, then: *"Portrait 9:16; the empty pool of light in the lower-middle. [MOBILE SAFE ZONE]"*

### Do NOT generate these — build them in code / vector
- **Marque logos** for the brand slider (Rolls-Royce, Bentley, Mercedes-Benz, Range Rover, Chevrolet, GMC, Lamborghini, Porsche): use official monochrome SVGs, white at 70% opacity. AI-drawn logos are never accurate enough and are a trademark risk.
- **Film grain overlay:** SVG `feTurbulence` or a 256×256 tiling noise PNG at 4–6% opacity.
- **Diamond pattern watermark:** tile `BR-02` as SVG at 3–4% opacity, 240 px spacing.
- **Map:** Mapbox / Google Maps with a custom dark style, placed over `HM-MAP`.
- **Icons:** thin-stroke line icons (Lucide / Phosphor Thin), never AI-generated.

---

## 10. Master checklist

Tick when generated, cut, graded and exported. `D` = desktop 16:9, `M` = mobile 9:16.

| # | Image ID | Page / section | Ratio | Attach | Done |
|---|---|---|---|---|---|
| 1 | BR-01 | Global — wordmark | 1:1 | sign photo | ☐ |
| 2 | BR-02 | Global — emblem | 1:1 | sign photo | ☐ |
| 3 | BR-03-D / -M | Global — texture | 16:9 / 9:16 | — | ☐ |
| 4 | BR-04 | Global — OG image | 1.91:1 | CGT-HERO-D | ☐ |
| 5 | SH-01-D / -M | Showroom hero, Visit | 16:9 / 9:16 | raw façade + sign | ☐ |
| 6 | SH-02-D / -M | Showroom, Services, Visit | 16:9 / 9:16 | raw exterior 2 | ☐ |
| 7 | SH-03-D / -M | Architecture master, Home statement | 16:9 / 9:16 | raw interior | ☐ |
| 8 | SH-04 | Showroom story, footer | 4:3 | sign + SH-01-D | ☐ |
| 9 | SH-05-D / -M | Home "Come after dark", Collection, Services | 16:9 / 9:16 | SH-03-D + Cullinan | ☐ |
| 10 | SH-06-D / -M | Visit hero, Home visit strip | 21:9 / 9:16 | SH-01-D + SH-02-D | ☐ |
| 11 | SH-07 | Showroom "The floor" | 3:4 | SH-03-D + CGT | ☐ |
| 12 | SH-08-D / -M | Showroom "The mezzanine" | 16:9 / 9:16 | SH-03-D + SH-01-D | ☐ |
| 13 | SH-09 | Showroom hospitality, Visit | 4:5 | SH-03-D | ☐ |
| 14 | SH-10 | Showroom story, 404 | 1:1 | BR-02 + SH-03-D | ☐ |
| 15 | HM-HERO-BG-D / -M | Home hero layer 1 | 16:9 / 9:16 | — | ☐ |
| 16 | HM-HERO-STILL-D / -M | Home hero fallback | 16:9 / 9:16 | HM-HERO-BG + CUL | ☐ |
| 17 | HM-WHY-BG-D / -M | Home "More than a showroom" | 16:9 / 9:16 | CGT front | ☐ |
| 18 | HM-WHY-ALT-D / -M | A/B for above, Services | 16:9 / 9:16 | CUL front | ☐ |
| 19 | HM-VIEW-D / -M | Home "The doors open for you" | 16:9 / 9:16 | SH-02-D | ☐ |
| 20 | HM-MAP-D / -M | Home visit strip, Contact map | 16:9 / 9:16 | — | ☐ |
| 21 | HM-STATEMENT-BG-D / -M | Home "Chosen, not stocked" | 16:9 / 9:16 | SH-03-D | ☐ |
| 22 | CO-HERO-BG-D / -M | Collection hero | 16:9 / 9:16 | SH-03-D | ☐ |
| 23–29 | CUL-BG-D/M · **CUT-A/B** · HERO-D/M · DET-01/02/03 | Cullinan — Scene | see §4.1 | real Cullinan | ☐ |
| 30–36 | CGT-BG-D/M · **CUT-A/B** · HERO-D/M · DET-01/02/03 | Continental GT — Scene | see §4.2 | real CGT | ☐ |
| 37–43 | FSM-BG-D/M · **CUT-A/B** · HERO-D/M · DET-01/02/03 (light) | Flying Spur — Scene, light | see §4.3 | real FSM | ☐ |
| 44–50 | SCL-BG-D/M · **HERO-D/M** · **CARD** · DET-01/02/03 (CUT optional) | S-Class — Card | see §4.4 | real S-Class | ☐ |
| 51–57 | RRA-BG-D/M · **HERO-D/M** · DET-01/02/03 (CUT optional) | Range Rover — Photograph | see §4.5 | real RR | ☐ |
| 58–64 | YUK-BG-D/M · **HERO-D/M** · **CARD** · DET-01/02/03 (CUT optional) | Yukon Denali — Card | see §4.6 | real Yukon | ☐ |
| 65–71 | C8-BG-D/M · **HERO-D/M** · DET-01/02/03 (CUT optional) | Corvette C8 — Photograph | see §4.7 | real C8 | ☐ |
| 72–78 | URU-BG-D/M · **HERO-D/M** · **CARD** · DET-01/02/03 (CUT optional) | Urus — Card | see §4.8 | real Urus | ☐ |
| 79–85 | 911-BG-D/M · **HERO-D/M** · DET-01/02/03 (CUT optional) | 911 — Photograph | see §4.9 | real 911 | ☐ |
| 86–92 | G63-BG-D/M · **HERO-D/M** · **CARD** · DET-01/02/03 (CUT optional) | G 63 — Card | see §4.10 | real G 63 | ☐ |
| 93 | CD-KEY-01 | Car detail enquire, Services finance | 4:3 | — | ☐ |
| 94 | CD-PROV-01 | Car detail provenance, Services trade-in | 4:3 | real RR | ☐ |
| 95 | SV-HERO-D / -M | Services hero | 16:9 / 9:16 | SH-05-D | ☐ |
| 96 | SV-01-D / -M | Services — Sourcing | 16:9 / 9:16 | — | ☐ |
| 97 | SV-02-D / -M | Services — Finance | 16:9 / 9:16 | CD-KEY-01 | ☐ |
| 98 | SV-03-D / -M | Services — Trade-in | 16:9 / 9:16 | CD-PROV-01 | ☐ |
| 99 | SV-04-D / -M | Services — Registration & export | 16:9 / 9:16 | SH-02-D | ☐ |
| 100 | SV-05-D / -M | Services — Aftercare | 16:9 / 9:16 | CGT photo | ☐ |
| 101 | SV-06-D / -M | Services — Delivery | 16:9 / 9:16 | YUK-BG-D + CUL | ☐ |
| 102 | CT-DOOR-01 | Visit — success / detail | 1:1 | SH-02-D | ☐ |
| 103 | RT-CAR (×n) | Real photo clean-up, every car | original | each real photo | ☐ |
| 104 | UT-GLOW-01 | Forms, preloader, empty states | 1:1 | — | ☐ |
| 105 | UT-404-D / -M | 404 | 16:9 / 9:16 | SH-05-D | ☐ |

**Generation order that avoids rework:** BR-01, BR-02 → SH-01, SH-02, SH-03 (the masters everything else references) → SH-05 → HM-HERO-BG → the ten car sets (BG first; then HERO for every car; CUT only for CUL, CGT, FSM; CARD for SCL, YUK, URU, G63; DET last) → HM-WHY → Services → the rest. Skipping the optional cut-outs saves fourteen generations and nothing on the site is missing without them.
