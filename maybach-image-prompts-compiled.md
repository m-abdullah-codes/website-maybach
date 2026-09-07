# MAY BACH — Ready-to-Paste Image Prompts

Every prompt below is fully self-contained and written out in full (the reusable `[STYLE DNA]`, `[EXACT CAR]`, `[MOBILE SAFE ZONE]` and `[DESKTOP SAFE ZONE]` blocks from the source document are already merged in, every "same as X, then add…" variant has been expanded into one complete paragraph, and the exact pixel size + aspect ratio is now the first sentence of every prompt itself). Copy the text inside each code block straight into the image tool — nothing else needs to be added.

**What to attach is listed separately above each prompt and is never part of the prompt text itself.** Attach exactly what's listed, nothing more. A "Size" reference line is also kept above each prompt for quick scanning, even though the same size is now repeated inside the prompt text.

---

## 0. Before You Generate — Key Rules From the Bible

These aren't prompts — they're the operating rules the source document sets around all of them. Keep them in mind while generating and cutting out images.

**Transparent cut-outs.** Ask for a transparent background first. If the tool returns a flat background instead, that's expected — every `CUT-A`/`CUT-B` prompt already specifies a seamless mid-grey `#7A7A7A` studio background with no floor line and no cast shadow, which cuts cleanly in Photoshop (Select Subject → Refine Edge) or remove.bg/Pixelcut. Never generate the drop shadow inside the cut-out — that's added later in code so it adapts to whichever background it sits on. Glass, chrome and wheel spokes usually get grey fringing after extraction — run Defringe/Decontaminate Colours and export PNG-24 with alpha, then convert to WebP with alpha.

**Attaching references.** Attach 2–4 real photographs of the actual car in stock (front ¾, side, rear ¾, interior) wherever a prompt says "the attached car" — never let the model invent or pick its own colour. For anything set inside the showroom, also attach the retouched `SH-03-D` once it exists, so the ceiling grid, columns, marble and glass wall stay consistent across the whole site. Attach the sign photo for anything showing the wordmark. Attach *only* what's listed — extra references pull the result off-brand. If a badge or grille comes out wrong (common on Rolls-Royce and Bentley fronts), regenerate with "keep the badge small and subtle" or switch to a rear ¾/side angle, then fix the badge in Photoshop from the real photo — never ship a wrong badge.

**Never include (the negative list).** People, hands, faces, text of any kind, number plates with readable characters, dealership branding other than May Bach's own sign where stated, price tags, stickers, cones, cables, reflections of a photographer, competing bright colours in the environment, daylight blue sky (blue-hour is fine), lens flare, rain streaks on the lens, fisheye distortion.

**Grade consistency check.** Every finished image should sit in the same tonal world: blacks around `#070708`–`#0E0E10`, highlights never pure white except specular hits, warm accent light around `#CDB47E` (champagne), cool fill around `#0B1522` (midnight). If an output looks too colourful, regenerate asking for "less saturation, darker environment, keep the car colour accurate."

**Export/file naming.** Master export as PNG → AVIF (quality 55–65) + WebP fallback. Desktop backgrounds ≤ 350 KB, mobile ≤ 180 KB, cut-outs ≤ 250 KB. Name files `mb-[id-lowercase].[avif|webp|png]`, e.g. `mb-cul-bg-d.avif`, `mb-cul-cut-a.png`.

**Trademark caution.** The showroom's brand is "MAY BACH" (two words) with its own interlocked-diamond emblem — a separate identity from Mercedes-Maybach. Never let a prompt borrow Mercedes-Maybach's double-M emblem, typography, or colours; the brand prompts (`BR-01`, `BR-02`) already describe only May Bach's own sign.

**Generation order that avoids rework:** `BR-01`, `BR-02` → `SH-01`, `SH-02`, `SH-03` (the architecture masters everything else references) → `SH-05` → `HM-HERO-BG` → the ten car sets (BG first, then CUT, then DET, HERO last) → `HM-WHY` → Services → the rest.

---

## 1. Brand Assets

### BR-01 — Wordmark, clean, white on transparent
**Size:** 1:1 · 2048×2048 (fallback 1024×1024)
**Attach:** the sign photo (`their brand looks like this….png`)
```
Image size: 2048×2048 px (1:1 aspect ratio). If your tool only offers fixed sizes, use 1024×1024 instead. Recreate the logo lock-up from the attached signage photo as a clean, flat, perfectly vector-like graphic on a fully transparent background (if transparency is unavailable, use a flat pure black #000000 background). Three elements stacked and centre-aligned exactly as on the sign: the Arabic wordmark "ماي باخ" on top in the same clean geometric Arabic letterforms; the emblem in the middle — two interlocked diamond (rhombus) outlines side by side, the left diamond a plain outline, the right diamond containing a smaller diamond, joined where they overlap, drawn with a single uniform stroke weight; below it the Latin wordmark "MAY BACH" in the same wide geometric sans-serif capitals with the same letter-spacing. Omit the licence line. Everything in pure white #FFFFFF, crisp edges, no gradients, no shadows, no glow, no 3D, no photo texture, no background elements. Perfectly symmetrical, sharp, centred with even margins.
```

### BR-02 — Diamond emblem only, white on transparent
**Size:** 1:1 · 2048×2048
**Attach:** the sign photo
```
Image size: 2048×2048 px (1:1 aspect ratio). Isolate only the emblem from the attached signage: two interlocked diamond (rhombus) outlines side by side — left diamond a plain outline, right diamond containing a smaller diamond inside, joined at their overlap — drawn as one continuous uniform white stroke on a fully transparent background (or flat pure black if transparency is unavailable). No text, no glow, no shadow, no 3D. Geometrically perfect, symmetrical, centred, generous even margins, crisp vector-like edges.
```

### BR-03-D — Brand texture: champagne light on black (desktop)
**Size:** 16:9 · 2560×1440
**Attach:** none
```
Image size: 2560×1440 px (16:9 aspect ratio). Abstract luxury background photograph: a single, long, soft streak of warm champagne-gold light sweeping diagonally across a near-black velvet-dark surface, like the reflection of a distant light on polished black lacquer. Extremely subtle, low contrast, most of the frame remains deep black #070708 with a faint film grain. The streak fades gently at both ends. Slight cool blue-grey tint in the darkest shadows. No objects, no text, no sparkles, no bokeh circles, no lens flare, no visible light source. Calm, expensive, minimal.
```

### BR-03-M — Brand texture: champagne light on black (mobile)
**Size:** 9:16 · 1152×2048
**Attach:** none
```
Image size: 1152×2048 px (9:16 aspect ratio). Abstract luxury background photograph: a single, long, soft streak of warm champagne-gold light sweeping diagonally across a near-black velvet-dark surface, like the reflection of a distant light on polished black lacquer. Extremely subtle, low contrast, most of the frame remains deep black #070708 with a faint film grain. The streak fades gently at both ends. Slight cool blue-grey tint in the darkest shadows. No objects, no text, no sparkles, no bokeh circles, no lens flare, no visible light source. Calm, expensive, minimal. Portrait format; the streak runs from upper-left to lower-right through the centre of the frame.
```

### BR-04 — Open Graph / social share image
**Size:** 1.91:1 · 2400×1264 (then resize to 1200×630 for og:image)
**Attach:** `CGT-HERO-D` (once generated)
```
Image size: 2400×1264 px (1.91:1 aspect ratio). Resize to 1200×630 for og:image. Using the attached photograph as the base, produce a cinematic social-share crop: the car remains on the right two-thirds, the left third is darkened to near-black with a smooth gradient so that a white logo can be overlaid there later. Do not add text. Keep the grade identical. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated.
```

---

## 2. The Showroom — retouching the raw photographs

### SH-01-D — Façade at blue hour (desktop)
**Size:** 16:9 · 2560×1440
**Attach:** the raw façade photo (`raw exterior of showroom, will be retouched using gpt.png`) + the sign photo
```
Image size: 2560×1440 px (16:9 aspect ratio). Retouch and upgrade the attached photograph of this exact showroom façade into a flawless architectural photograph at blue hour. Keep the real building exactly as it is: the two-storey glass façade with its white-framed grid on the upper floor, the large illuminated dark-navy sign panel with the Arabic "ماي باخ", the twin-diamond emblem and "MAY BACH" beneath it in white (reproduce the sign accurately from the second attachment), the four exterior floodlights, the ground-floor floor-to-ceiling glass with warm interior lighting, the coffered white ceiling, the mezzanine windows, and the luxury cars visible inside on the marble floor. Improvements: shoot from a slightly lower, perfectly straight-on position with corrected verticals (no keystoning); a deep, clean blue-hour sky; crisp, evenly exposed glass with no harsh reflections; remove the Google Maps interface, the arrows, any watermark, cables, cones, dust or people; clean pavement in the foreground with a subtle wet-look reflection of the lit interior. Interior lighting warm ivory, sign glowing clean white, sky deep midnight blue. Photoreal, medium-format sharpness, 35 mm, f/8. No added text, no added logos, no lens flare.
```

### SH-01-M — Façade at blue hour (mobile)
**Size:** 9:16 · 1152×2048
**Attach:** the raw façade photo + the sign photo
```
Image size: 1152×2048 px (9:16 aspect ratio). Retouch and upgrade the attached photograph of this exact showroom façade into a flawless architectural photograph at blue hour. Keep the real building exactly as it is: the two-storey glass façade with its white-framed grid on the upper floor, the large illuminated dark-navy sign panel with the Arabic "ماي باخ", the twin-diamond emblem and "MAY BACH" beneath it in white (reproduce the sign accurately from the second attachment), the four exterior floodlights, the ground-floor floor-to-ceiling glass with warm interior lighting, the coffered white ceiling, the mezzanine windows, and the luxury cars visible inside on the marble floor. Improvements: shoot from a slightly lower, perfectly straight-on position with corrected verticals (no keystoning); a deep, clean blue-hour sky; crisp, evenly exposed glass with no harsh reflections; remove the Google Maps interface, the arrows, any watermark, cables, cones, dust or people; clean pavement in the foreground with a subtle wet-look reflection of the lit interior. Interior lighting warm ivory, sign glowing clean white, sky deep midnight blue. Photoreal, medium-format sharpness, 35 mm, f/8. No added text, no added logos, no lens flare. Portrait 9:16 framing, straight-on, the sign panel sits in the upper third and the lit ground floor with cars fills the lower half; extend the sky above and pavement below naturally.
```

### SH-02-D — Street-side façade at night (desktop)
**Size:** 16:9 · 2560×1440
**Attach:** `raw exterior 2.png`
```
Image size: 2560×1440 px (16:9 aspect ratio). Retouch the attached night photograph of this showroom's street-side glass façade into a flawless, cinematic architectural photograph while keeping the real building and its layout: the long run of floor-to-ceiling glass panels with slim frames, the tall white columns, the warm recessed ceiling lights inside, the glass entrance doors with the dark canopy, the pavement with its pale paving pattern, the boulevard and street lamps receding to the left, and the luxury SUVs parked inside behind the glass. Remove all interface overlays, the map inset, the photographer credit, navigation arrows, watermarks, the red object on the floor, cables and bins; remove all people and remove the cars parked on the street. Perfectly level horizon, corrected verticals, deep night sky, glass cleaned and evenly lit with a soft warm glow spilling onto a subtly wet pavement, interior cars gleaming with polished highlights. Colour grade: warm ivory interior against a cool midnight-blue exterior. Photoreal, 35 mm, f/8, medium-format sharpness. No added text or logos.
```

### SH-02-M — Street-side façade at night (mobile)
**Size:** 9:16 · 1152×2048
**Attach:** `raw exterior 2.png`
```
Image size: 1152×2048 px (9:16 aspect ratio). Retouch the attached night photograph of this showroom's street-side glass façade into a flawless, cinematic architectural photograph while keeping the real building and its layout: the long run of floor-to-ceiling glass panels with slim frames, the tall white columns, the warm recessed ceiling lights inside, the glass entrance doors with the dark canopy, the pavement with its pale paving pattern, the boulevard and street lamps receding to the left, and the luxury SUVs parked inside behind the glass. Remove all interface overlays, the map inset, the photographer credit, navigation arrows, watermarks, the red object on the floor, cables and bins; remove all people and remove the cars parked on the street. Perfectly level horizon, corrected verticals, deep night sky, glass cleaned and evenly lit with a soft warm glow spilling onto a subtly wet pavement, interior cars gleaming with polished highlights. Colour grade: warm ivory interior against a cool midnight-blue exterior. Photoreal, 35 mm, f/8, medium-format sharpness. No added text or logos. Portrait 9:16; compose from the same position looking along the façade so the glass wall runs diagonally from the lower right into the distance at the upper left; keep the entrance doors in the middle third.
```

### SH-03-D — Interior, the marble floor and the line-up (desktop)
**Size:** 16:9 · 2560×1440
**Attach:** `raw interior of showroom.png`
```
Image size: 2560×1440 px (16:9 aspect ratio). Retouch the attached interior photograph of this showroom into a flawless, cinematic wide interior photograph, keeping the real space exactly as it is: the polished cream-and-beige marble floor with its subtle veining, the white coffered ceiling with rows of recessed downlights, the tall white square columns, the double-height dark glass wall on the right reflecting the interior, and the diagonal line-up of luxury cars along the left-centre — a bright blue mid-engine sports car nearest the camera, a black sports car behind it, a blue one behind that, and dark SUVs receding into the distance. Improvements: widen the framing slightly to a landscape view, straighten verticals, remove all people, remove the Google Maps interface and every overlay, remove the red box and any clutter on the floor, restore the marble to a mirror-like polish with clean reflections of the cars and ceiling lights, dim the ambient light so the room feels evening-calm while the cars remain gleaming with crisp highlights; add a faint warm champagne tint to the highlights and a cool blue-grey tint to the shadows. Every car must stay true to its real colour and shape. Photoreal, 28–35 mm, f/8, medium-format sharpness. No added text, no added signage.
```

### SH-03-M — Interior, the marble floor and the line-up (mobile)
**Size:** 9:16 · 1152×2048
**Attach:** `raw interior of showroom.png`
```
Image size: 1152×2048 px (9:16 aspect ratio). Retouch the attached interior photograph of this showroom into a flawless, cinematic wide interior photograph, keeping the real space exactly as it is: the polished cream-and-beige marble floor with its subtle veining, the white coffered ceiling with rows of recessed downlights, the tall white square columns, the double-height dark glass wall on the right reflecting the interior, and the diagonal line-up of luxury cars along the left-centre — a bright blue mid-engine sports car nearest the camera, a black sports car behind it, a blue one behind that, and dark SUVs receding into the distance. Improvements: widen the framing slightly to a landscape view, straighten verticals, remove all people, remove the Google Maps interface and every overlay, remove the red box and any clutter on the floor, restore the marble to a mirror-like polish with clean reflections of the cars and ceiling lights, dim the ambient light so the room feels evening-calm while the cars remain gleaming with crisp highlights; add a faint warm champagne tint to the highlights and a cool blue-grey tint to the shadows. Every car must stay true to its real colour and shape. Photoreal, 28–35 mm, f/8, medium-format sharpness. No added text, no added signage. Portrait 9:16 framing from the same viewpoint; the nearest car's tail sits low-right, the line-up recedes upward to the left, the ceiling grid fills the top third.
```

### SH-04 — The sign, glowing (macro)
**Size:** 4:3 · 2048×1536
**Attach:** the sign photo + `SH-01-D`
```
Image size: 2048×1536 px (4:3 aspect ratio). Night-time close-up photograph of the illuminated showroom sign from the attached references, shot from below at a slight angle with a 85 mm lens: the dark navy sign panel with the crisp white illuminated Arabic wordmark "ماي باخ", the twin-diamond emblem and "MAY BACH" beneath, reproduced accurately from the reference. Shallow depth of field so the white letters are tack sharp and the glass grid of the building above falls softly out of focus against a deep blue-hour sky. Clean, even white glow from the letters with a gentle halo on the panel, no hotspots, no dust, no visible fixings. Omit the licence line. No other text. Deep, calm, expensive.
```

### SH-05-D — Interior at night, one car under a spotlight (desktop)
**Size:** 16:9 · 2560×1440
**Attach:** `SH-03-D` + 2 photos of the Rolls-Royce Cullinan in stock
```
Image size: 2560×1440 px (16:9 aspect ratio). Wide interior photograph of the exact showroom in the first attached image — same cream marble floor, white coffered ceiling with recessed downlights, white square columns and the double-height dark glass wall — at night, after closing. The room is dim: most ceiling lights are off, only a small group of downlights is on, creating a single pool of light on the marble in the centre-right of the frame. In that pool stands the Rolls-Royce Cullinan from the second set of attachments, front three-quarter view angled toward the lower-left, the only car in the room. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. Its reflection lies in the polished marble. The far glass wall shows faint reflections of the city lights outside. Left third of the frame is dark and calm for typography. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated.
```

### SH-05-M — Interior at night, one car under a spotlight (mobile)
**Size:** 9:16 · 1152×2048
**Attach:** `SH-03-D` + 2 photos of the Rolls-Royce Cullinan in stock
```
Image size: 1152×2048 px (9:16 aspect ratio). Wide interior photograph of the exact showroom in the first attached image — same cream marble floor, white coffered ceiling with recessed downlights, white square columns and the double-height dark glass wall — at night, after closing. The room is dim: most ceiling lights are off, only a small group of downlights is on, creating a single pool of light on the marble in the centre-right of the frame. In that pool stands the Rolls-Royce Cullinan from the second set of attachments, front three-quarter view angled toward the lower-left, the only car in the room. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. Its reflection lies in the polished marble. The far glass wall shows faint reflections of the city lights outside. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated. Portrait 9:16; the pool of light and the car sit in the lower-middle of the frame, the dark coffered ceiling recedes above. Portrait composition. Keep the car and every important detail inside the central 60% of the width, and clear of the top 18% and bottom 22% of the frame — those bands are reserved for typography and interface. Extend the environment naturally above and below.
```

### SH-06-D — Façade from across the boulevard, wide (desktop)
**Size:** 21:9 · 2688×1152 (fallback 16:9 · 2560×1440)
**Attach:** `SH-01-D` + `SH-02-D`
```
Image size: 2688×1152 px (21:9 aspect ratio). If your tool only offers fixed sizes, use 16:9 · 2560×1440 instead. Cinematic wide night photograph of the showroom building in the attached references, seen from across a quiet Riyadh boulevard: the full two-storey glass façade glowing warm ivory from inside, the illuminated navy sign with the white wordmark and twin-diamond emblem centred on the upper floor, palm trees and modern street lamps softly lit in the foreground, a subtly wet dark road reflecting the light, a deep midnight-blue sky. Keep the real architecture from the references. No people, no traffic, no street signage, plates or other shop signs. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated.
```

### SH-06-M — Façade from across the boulevard, wide (mobile)
**Size:** 9:16 · 1152×2048
**Attach:** `SH-01-D` + `SH-02-D`
```
Image size: 1152×2048 px (9:16 aspect ratio). Cinematic wide night photograph of the showroom building in the attached references, seen from across a quiet Riyadh boulevard: the full two-storey glass façade glowing warm ivory from inside, the illuminated navy sign with the white wordmark and twin-diamond emblem centred on the upper floor, palm trees and modern street lamps softly lit in the foreground, a subtly wet dark road reflecting the light, a deep midnight-blue sky. Keep the real architecture from the references. No people, no traffic, no street signage, plates or other shop signs. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated. Portrait 9:16; the building fills the middle band, foreground road and reflection below, sky above.
```

### SH-07 — The floor: wheel and marble reflection (macro)
**Size:** 3:4 · 1536×2048
**Attach:** `SH-03-D` + one photo of the Bentley Continental GT (wheel visible)
```
Image size: 1536×2048 px (3:4 aspect ratio). Low-angle macro photograph on the polished cream marble floor of the attached showroom: the front wheel and lower body of the Cambrian Grey Bentley Continental GT from the second attachment, its multi-spoke wheel and brake caliper razor sharp, the marble reflecting the wheel and a row of ceiling downlights in a smooth mirror image, background falling into soft darkness. Champagne rim light along the wheel arch. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated.
```

### SH-08-D — From the mezzanine, looking down (desktop)
**Size:** 16:9 · 2560×1440
**Attach:** `SH-03-D` + `SH-01-D`
```
Image size: 2560×1440 px (16:9 aspect ratio). Elevated interior photograph taken from the mezzanine of the attached showroom, looking down at the ground floor at a 30-degree angle: the cream marble floor laid out below with five luxury cars parked in a calm diagonal row (dark SUVs and a grey grand tourer, colours subdued), the white coffered ceiling with its downlight grid partially visible at the top, the tall glass façade on one side with the night outside. Lighting dimmed to evening level; cars gleaming; marble reflecting. Generous empty marble in the lower-left of the frame for typography. No people. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated.
```

### SH-08-M — From the mezzanine, looking down (mobile)
**Size:** 9:16 · 1152×2048
**Attach:** `SH-03-D` + `SH-01-D`
```
Image size: 1152×2048 px (9:16 aspect ratio). Elevated interior photograph taken from the mezzanine of the attached showroom, looking down at the ground floor at a 30-degree angle: the cream marble floor laid out below with five luxury cars parked in a calm diagonal row (dark SUVs and a grey grand tourer, colours subdued), the white coffered ceiling with its downlight grid partially visible at the top, the tall glass façade on one side with the night outside. Lighting dimmed to evening level; cars gleaming; marble reflecting. No people. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated. Portrait 9:16; the row of cars runs diagonally from lower-left to upper-right. Portrait composition. Keep the car and every important detail inside the central 60% of the width, and clear of the top 18% and bottom 22% of the frame — those bands are reserved for typography and interface. Extend the environment naturally above and below.
```

### SH-09 — The majlis: coffee first
**Size:** 4:5 · 1600×2000
**Attach:** `SH-03-D` (for material continuity)
```
Image size: 1600×2000 px (4:5 aspect ratio). Intimate still-life photograph inside a luxury car showroom's private lounge (majlis) at night: a low black marble table in the foreground holding a polished brass Saudi dallah coffee pot and two small white finjan cups, a small dish of dates beside them; behind, out of focus, a deep charcoal velvet sofa and, further back, the soft gleam of a dark luxury car on cream marble under a single warm downlight. Shallow depth of field, 85 mm, f/2.8. Warm champagne highlights on the brass, deep blacks everywhere else. No people, no text. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated.
```

### SH-10 — The emblem in the space
**Size:** 1:1 · 2048×2048
**Attach:** `BR-02` + `SH-03-D`
```
Image size: 2048×2048 px (1:1 aspect ratio). Close-up photograph of the twin-diamond emblem from the first attachment rendered as a brushed-champagne-gold metal inlay set flush into a dark marble reception wall inside the showroom from the second attachment, lit by a single soft raking light from the upper left so the metal catches a thin highlight and the marble veining is faintly visible. Emblem centred, occupying about 40% of the frame. No text, no other objects. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated.
```

---

## 3. Home Page

### HM-HERO-BG-D — Home hero environment, no car (desktop)
**Size:** 16:9 · 2560×1440 (optionally also 21:9 · 2688×1152)
**Attach:** none
```
Image size: 2560×1440 px (16:9 aspect ratio). An optional 21:9 · 2688×1152 version also works for this placement. Empty luxury automotive studio at night, photographed for a website hero, with no car in it. A vast, dark space: a seamless black floor polished to a mirror finish, a distant back wall that dissolves into black, and a faint, wide horizontal band of soft champagne-gold light glowing low across the background — as if from a hidden light slot behind where a car will stand — its reflection stretching forward across the floor toward the camera. A very faint cool blue-grey haze in the upper corners. The brightest area sits slightly right of centre and low; the upper half of the frame is calm, near-black and free of detail for a large headline. Extremely subtle film grain. No objects, no text, no people. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated.
```

### HM-HERO-BG-M — Home hero environment, no car (mobile)
**Size:** 9:16 · 1152×2048
**Attach:** none
```
Image size: 1152×2048 px (9:16 aspect ratio). Empty luxury automotive studio at night, photographed for a website hero, with no car in it. A vast, dark space: a seamless black floor polished to a mirror finish, a distant back wall that dissolves into black, and a faint, wide horizontal band of soft champagne-gold light glowing low across the background — as if from a hidden light slot behind where a car will stand — its reflection stretching forward across the floor toward the camera. A very faint cool blue-grey haze in the upper corners. Extremely subtle film grain. No objects, no text, no people. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated. Portrait 9:16. The champagne light band sits at about 62% of the frame height with its floor reflection below; the top 40% is near-black. Portrait composition. Keep the car and every important detail inside the central 60% of the width, and clear of the top 18% and bottom 22% of the frame — those bands are reserved for typography and interface. Extend the environment naturally above and below.
```

### HM-HERO-STILL-D — Composed hero fallback, car in scene (desktop)
**Size:** 16:9 · 2560×1440
**Attach:** `HM-HERO-BG-D` + real photos of the Rolls-Royce Cullinan
```
Image size: 2560×1440 px (16:9 aspect ratio). Place the Rolls-Royce Cullinan from the attached photographs into the attached empty studio, standing exactly where the champagne light band glows, front three-quarter view angled toward the lower-left, occupying the right 60% of the frame, its full reflection on the black mirror floor, champagne rim light along the roofline and shoulder, cool fill on the shadow side. Left third and top of frame stay near-black for typography. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated.
```

### HM-HERO-STILL-M — Composed hero fallback, car in scene (mobile)
**Size:** 9:16 · 1152×2048
**Attach:** `HM-HERO-BG-M` + real photos of the Rolls-Royce Cullinan
```
Image size: 1152×2048 px (9:16 aspect ratio). Place the Rolls-Royce Cullinan from the attached photographs into the attached empty studio, standing exactly where the champagne light band glows, seen almost front-on, slightly from the left, centred in the lower-middle of the frame, its full reflection on the black mirror floor, champagne rim light along the roofline and shoulder, cool fill on the shadow side. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated. Portrait 9:16; the car is seen almost front-on, slightly from the left, centred in the lower-middle of the frame. Portrait composition. Keep the car and every important detail inside the central 60% of the width, and clear of the top 18% and bottom 22% of the frame — those bands are reserved for typography and interface. Extend the environment naturally above and below.
```

### HM-WHY-BG-D — "More than a showroom" headlight macro (desktop)
**Size:** 16:9 · 2560×1440
**Attach:** front photo of the Cambrian Grey Bentley Continental GT Azure
```
Image size: 2560×1440 px (16:9 aspect ratio). Extreme close-up, near-monochrome photograph of the front of the attached Cambrian Grey Bentley Continental GT, filling the frame from the left edge: the crystal-cut LED headlamp in tack-sharp detail at the left-centre, the sculpted bonnet and front wing sweeping to the right and dissolving into deep black, a single soft key light from the upper left carving a long silver highlight along the wing, faint champagne warmth only in that highlight. The right 45% of the frame is very dark, smooth and out of focus — this is where frosted-glass cards will be placed. Silvery, desaturated, luxurious, cinematic. Badge subtle. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated.
```

### HM-WHY-BG-M — "More than a showroom" headlight macro (mobile)
**Size:** 9:16 · 1152×2048
**Attach:** front photo of the Cambrian Grey Bentley Continental GT Azure
```
Image size: 1152×2048 px (9:16 aspect ratio). Extreme close-up, near-monochrome photograph of the front of the attached Cambrian Grey Bentley Continental GT: the crystal-cut LED headlamp in tack-sharp detail, a single soft key light from the upper left carving a long silver highlight along the wing, faint champagne warmth only in that highlight. Silvery, desaturated, luxurious, cinematic. Badge subtle. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated. Portrait 9:16; the headlamp sits in the upper third, the bonnet sweeps downward and dissolves into black in the lower two-thirds where cards will stack. Portrait composition. Keep the car and every important detail inside the central 60% of the width, and clear of the top 18% and bottom 22% of the frame — those bands are reserved for typography and interface. Extend the environment naturally above and below.
```

### HM-WHY-ALT-D — Alternate macro: Rolls-Royce grille & Spirit of Ecstasy (desktop)
**Size:** 16:9 · 2560×1440
**Attach:** front photo of the Rolls-Royce Cullinan
```
Image size: 2560×1440 px (16:9 aspect ratio). Extreme close-up, near-monochrome photograph of the upper grille and bonnet of the attached Rolls-Royce Cullinan from a low three-quarter angle: the vertical polished grille vanes catching a thin champagne highlight, the hood ornament in sharp silhouette against deep black, the bonnet dissolving into darkness toward the right of the frame where the image becomes smooth, dark and empty. Silvery, desaturated, cinematic, restrained. Keep the emblem accurate but small. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated.
```

### HM-WHY-ALT-M — Alternate macro: Rolls-Royce grille & Spirit of Ecstasy (mobile)
**Size:** 9:16 · 1152×2048
**Attach:** front photo of the Rolls-Royce Cullinan
```
Image size: 1152×2048 px (9:16 aspect ratio). Extreme close-up, near-monochrome photograph of the upper grille and bonnet of the attached Rolls-Royce Cullinan from a low three-quarter angle: the vertical polished grille vanes catching a thin champagne highlight, the hood ornament in sharp silhouette against deep black. Silvery, desaturated, cinematic, restrained. Keep the emblem accurate but small. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated. Portrait 9:16; grille and ornament in the upper third, dissolving into black below. Portrait composition. Keep the car and every important detail inside the central 60% of the width, and clear of the top 18% and bottom 22% of the frame — those bands are reserved for typography and interface. Extend the environment naturally above and below.
```

### HM-VIEW-D — "The doors open for you" (desktop)
**Size:** 16:9 · 2560×1440
**Attach:** `SH-02-D`
```
Image size: 2560×1440 px (16:9 aspect ratio). Night photograph at the glass entrance of the attached showroom: the tall frameless glass doors stand open, warm ivory light from inside spilling across the pale paving of the pavement in a long soft rectangle toward the camera, the dark canopy above, and inside, slightly out of focus, the gleam of a dark luxury car on cream marble. The exterior is deep midnight blue and calm. Camera low and centred on the doorway, 35 mm. Left half of the frame darker for typography. No people, no text. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated.
```

### HM-VIEW-M — "The doors open for you" (mobile)
**Size:** 9:16 · 1152×2048
**Attach:** `SH-02-D`
```
Image size: 1152×2048 px (9:16 aspect ratio). Night photograph at the glass entrance of the attached showroom: the tall frameless glass doors stand open, warm ivory light from inside spilling across the pale paving of the pavement in a long soft rectangle toward the camera, the dark canopy above, and inside, slightly out of focus, the gleam of a dark luxury car on cream marble. The exterior is deep midnight blue and calm. Camera low and centred on the doorway, 35 mm. No people, no text. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated. Portrait 9:16; the open doorway sits in the middle band with the light spilling down toward the bottom. Portrait composition. Keep the car and every important detail inside the central 60% of the width, and clear of the top 18% and bottom 22% of the frame — those bands are reserved for typography and interface. Extend the environment naturally above and below.
```

### HM-MAP-D — Riyadh at night, from above (desktop)
**Size:** 16:9 · 2560×1440
**Attach:** none
```
Image size: 2560×1440 px (16:9 aspect ratio). Aerial night photograph of Riyadh, Saudi Arabia, from high altitude, heavily darkened and desaturated for use as a website background: the city's orderly grid of streets traced in faint warm amber street light, the King Abdullah Financial District towers and Kingdom Centre faintly visible as small clusters of light, the vast surrounding darkness of the desert at the frame edges. Everything muted to near-black with the light grid at low intensity; a gentle vignette. No text, no map labels, no pins, no roads highlighted in colour. Cinematic, calm, expensive.
```

### HM-MAP-M — Riyadh at night, from above (mobile)
**Size:** 9:16 · 1152×2048
**Attach:** none
```
Image size: 1152×2048 px (9:16 aspect ratio). Aerial night photograph of Riyadh, Saudi Arabia, from high altitude, heavily darkened and desaturated for use as a website background: the city's orderly grid of streets traced in faint warm amber street light, the King Abdullah Financial District towers and Kingdom Centre faintly visible as small clusters of light, the vast surrounding darkness of the desert at the frame edges. Everything muted to near-black with the light grid at low intensity; a gentle vignette. No text, no map labels, no pins, no roads highlighted in colour. Cinematic, calm, expensive. Portrait 9:16; the city grid runs up the centre of the frame, darkest at the top and bottom.
```

### HM-STATEMENT-BG-D — "Chosen, not stocked" background (desktop)
**Size:** 16:9 · 2560×1440
**Attach:** `SH-03-D`
```
Image size: 2560×1440 px (16:9 aspect ratio). Very dark, out-of-focus photograph of the attached showroom interior after closing, photographed at f/1.4 so the row of cars and the ceiling downlights become soft, elongated bokeh shapes on cream marble; overall exposure pulled down so the image reads as 85% black with faint warm glints. No sharp detail anywhere, no text, no people. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated.
```

### HM-STATEMENT-BG-M — "Chosen, not stocked" background (mobile)
**Size:** 9:16 · 1152×2048
**Attach:** `SH-03-D`
```
Image size: 1152×2048 px (9:16 aspect ratio). Very dark, out-of-focus photograph of the attached showroom interior after closing, photographed at f/1.4 so the row of cars and the ceiling downlights become soft, elongated bokeh shapes on cream marble; overall exposure pulled down so the image reads as 85% black with faint warm glints. No sharp detail anywhere, no text, no people. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated. Portrait 9:16.
```

---

## 4. The Collection

### CO-HERO-BG-D — Collection hero: silhouettes in the dark (desktop)
**Size:** 16:9 · 2560×1440
**Attach:** `SH-03-D`
```
Image size: 2560×1440 px (16:9 aspect ratio). Wide, very dark photograph inside the attached showroom after hours: a row of six luxury cars parked nose-out in a shallow arc across the marble floor, almost entirely in shadow — only their rims of chrome, headlamp glass and roof edges catching a thin champagne rim light from behind, their silhouettes reflected in the polished floor. The cars are distinguishable only as shapes: a tall SUV, a long saloon, a low grand tourer, a mid-engine sports car. Ceiling downlights off; a faint cool blue glow from the far glass wall. Upper half of the frame near-black for a giant headline. No text, no people. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated.
```

### CO-HERO-BG-M — Collection hero: silhouettes in the dark (mobile)
**Size:** 9:16 · 1152×2048
**Attach:** `SH-03-D`
```
Image size: 1152×2048 px (9:16 aspect ratio). Wide, very dark photograph inside the attached showroom after hours: a row of six luxury cars parked nose-out in a shallow arc across the marble floor, almost entirely in shadow — only their rims of chrome, headlamp glass and roof edges catching a thin champagne rim light from behind, their silhouettes reflected in the polished floor. The cars are distinguishable only as shapes: a tall SUV, a long saloon, a low grand tourer, a mid-engine sports car. Ceiling downlights off; a faint cool blue glow from the far glass wall. No text, no people. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated. Portrait 9:16; the arc of silhouettes sits in the lower half, dark ceiling above. Portrait composition. Keep the car and every important detail inside the central 60% of the width, and clear of the top 18% and bottom 22% of the frame — those bands are reserved for typography and interface. Extend the environment naturally above and below.
```

> Note: for every car set below, attach 2–4 real photographs of that exact car in stock (front ¾, side, rear ¾, interior) wherever the prompt says "the attached [car]" — listed per prompt below.

### 4.1 Rolls-Royce Cullinan — `CUL` — The Courtyard

#### CUL-BG-D
**Size:** 16:9 · 2560×1440
**Attach:** none
```
Image size: 2560×1440 px (16:9 aspect ratio). Night photograph of an empty private courtyard of a Najdi-style palace in Riyadh, built for a luxury car to be placed in later — no car in the frame. Pale sand-coloured limestone walls with rows of small stepped triangular crenellations along the top, a shaded arcade of tall pointed arches running across the background, a few brass lanterns glowing warm amber inside the arches, a dark polished basalt stone floor reflecting the lantern light like still water. A single wide, soft key light from the upper left illuminates the floor's centre-right where the car will stand; the left third of the frame is darker and calm for typography. Deep midnight-blue sky above the wall. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated.
```

#### CUL-BG-M
**Size:** 9:16 · 1152×2048
**Attach:** none
```
Image size: 1152×2048 px (9:16 aspect ratio). Night photograph of an empty private courtyard of a Najdi-style palace in Riyadh, built for a luxury car to be placed in later — no car in the frame. Pale sand-coloured limestone walls with rows of small stepped triangular crenellations along the top, a shaded arcade of tall pointed arches running across the background, a few brass lanterns glowing warm amber inside the arches, a dark polished basalt stone floor reflecting the lantern light like still water. Deep midnight-blue sky above the wall. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated. Portrait 9:16; the arcade fills the middle band, the lit floor area sits in the lower-middle where the car will stand, wall and sky above. Portrait composition. Keep the car and every important detail inside the central 60% of the width, and clear of the top 18% and bottom 22% of the frame — those bands are reserved for typography and interface. Extend the environment naturally above and below.
```

#### CUL-CUT-A — front three-quarter (desktop)
**Size:** 3:2 · 2304×1536 · transparent
**Attach:** 2–4 real photos of the Cullinan in stock
```
Image size: 2304×1536 px (3:2 aspect ratio, transparent background). Studio photograph of the attached Rolls-Royce Cullinan, front three-quarter view from slightly below eye level, the nose angled toward the lower-left, wheels turned slightly toward the camera, on a fully transparent background (if unavailable: a seamless flat mid-grey #7A7A7A background with no floor line, no horizon and no cast shadow). The whole car is inside the frame with even margins. Lit with a large soft key from the upper left, a thin champagne rim light along the roof and shoulder line, cool blue-grey fill on the shadow side; crisp studio reflections in the paint; the Pantheon grille vanes and hood ornament accurate but understated, daytime running lights on at low intensity. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. Photoreal, 70 mm, f/8, medium-format sharpness. Nothing else in the frame.
```

#### CUL-CUT-B — front-on (mobile)
**Size:** 4:5 · 1600×2000 · transparent
**Attach:** 2–4 real photos of the Cullinan in stock
```
Image size: 1600×2000 px (4:5 aspect ratio, transparent background). Studio photograph of the attached Rolls-Royce Cullinan, seen almost straight-on from the front, camera at grille height and very slightly to the left, so the car's full width and upright presence dominate the frame, on a fully transparent background (if unavailable: a seamless flat mid-grey #7A7A7A background with no floor line, no horizon and no cast shadow). The whole car is inside the frame with even margins. Lit with a large soft key from the upper left, a thin champagne rim light along the roof and shoulder line, cool blue-grey fill on the shadow side; crisp studio reflections in the paint; the Pantheon grille vanes and hood ornament accurate but understated, daytime running lights on at low intensity. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. Photoreal, 70 mm, f/8, medium-format sharpness. Nothing else in the frame.
```

#### CUL-HERO-D — composed fallback (desktop)
**Size:** 16:9 · 2560×1440
**Attach:** `CUL-BG-D` + 2–4 real photos of the Cullinan
```
Image size: 2560×1440 px (16:9 aspect ratio). Place the attached Rolls-Royce Cullinan into the attached courtyard, standing on the lit basalt floor in the centre-right, front three-quarter view angled to the lower-left, full reflection on the floor, champagne rim light on the roofline, lantern light warming the flank. Left third of the frame stays dark for typography. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated.
```

#### CUL-HERO-M — composed fallback (mobile)
**Size:** 9:16 · 1152×2048
**Attach:** `CUL-BG-M` + 2–4 real photos of the Cullinan
```
Image size: 1152×2048 px (9:16 aspect ratio). Place the attached Rolls-Royce Cullinan into the attached courtyard, standing on the lit basalt floor, seen nearly front-on, centred in the lower-middle band, full reflection on the floor, champagne rim light on the roofline, lantern light warming the flank. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated. Portrait 9:16; the car is seen nearly front-on, centred in the lower-middle band. Portrait composition. Keep the car and every important detail inside the central 60% of the width, and clear of the top 18% and bottom 22% of the frame — those bands are reserved for typography and interface. Extend the environment naturally above and below.
```

#### CUL-DET-01 — exterior macro: the ornament
**Size:** 4:3 · 2048×1536
**Attach:** real Cullinan photos
```
Image size: 2048×1536 px (4:3 aspect ratio). Macro photograph of the hood ornament and the top edge of the polished grille of the attached Rolls-Royce Cullinan, shot from a low angle with an 100 mm macro lens at f/2.8, the figure sharp against the deep out-of-focus midnight background of a Najdi courtyard with two soft amber lantern glows; a champagne highlight runs along the bonnet edge. Restrained, silvery, expensive. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated.
```

#### CUL-DET-02 — interior
**Size:** 4:3 · 2048×1536
**Attach:** the real interior photo of this car
```
Image size: 2048×1536 px (4:3 aspect ratio). Interior photograph of the attached Rolls-Royce Cullinan from the open rear door, showing the rear seats, the lambswool carpet, the polished wood veneer picnic-table backs and the starlight headliner glowing faintly, in the exact leather colour of the attached interior photo. Low, warm ambient light with a soft cool fill from the window; shallow depth of field, 35 mm, f/2.8. No people, no visible screens with text. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated.
```

#### CUL-DET-03 — rear three-quarter in the courtyard
**Size:** 4:3 · 2048×1536
**Attach:** `CUL-BG-D` + real photos
```
Image size: 2048×1536 px (4:3 aspect ratio). The attached Cullinan seen from the rear three-quarter, parked under the arcade of the attached courtyard, its tail lights on, the arches reflected in the tailgate, the basalt floor mirroring the car. Camera low, 50 mm. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated.
```

---

### 4.2 Bentley Continental GT Azure, Cambrian Grey — `CGT` — The Coast Road

#### CGT-BG-D
**Size:** 16:9 · 2560×1440
**Attach:** none
```
Image size: 2560×1440 px (16:9 aspect ratio). Blue-hour photograph of an empty coastal cliff road, built for a car to be placed in later — no car in the frame. A wide, smooth, rain-wet asphalt road curves gently from the lower right toward the upper left, a low stone parapet on the seaward side, the sea far below a sheet of deep indigo, a very thin band of fading warm light on the horizon under a deep midnight-blue sky, faint cool haze. The wet road reflects the sky. The right-centre of the road is the lit area where the car will stand; the left third and the top are dark and calm for typography. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated.
```

#### CGT-BG-M
**Size:** 9:16 · 1152×2048
**Attach:** none
```
Image size: 1152×2048 px (9:16 aspect ratio). Blue-hour photograph of an empty coastal cliff road, built for a car to be placed in later — no car in the frame. A wide, smooth, rain-wet asphalt road curves gently from the lower right toward the upper left, a low stone parapet on the seaward side, the sea far below a sheet of deep indigo, a very thin band of fading warm light on the horizon under a deep midnight-blue sky, faint cool haze. The wet road reflects the sky. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated. Portrait 9:16; the road runs up the frame from the bottom edge toward the horizon at 70% height, the lit standing area in the lower-middle. Portrait composition. Keep the car and every important detail inside the central 60% of the width, and clear of the top 18% and bottom 22% of the frame — those bands are reserved for typography and interface. Extend the environment naturally above and below.
```

#### CGT-CUT-A — front three-quarter (desktop)
**Size:** 3:2 · 2304×1536 · transparent
**Attach:** 2–4 real photos of the Continental GT Azure in stock
```
Image size: 2304×1536 px (3:2 aspect ratio, transparent background). Studio photograph of the attached Cambrian Grey Bentley Continental GT Azure, front three-quarter view from slightly below eye level, the nose toward the lower-right, on a fully transparent background (if unavailable: seamless flat mid-grey #7A7A7A, no floor line, no cast shadow). Whole car in frame with even margins. Large soft key from the upper left, a thin champagne rim light along the roofline and the sharp rear haunch, cool fill opposite; crisp studio reflections in the satin-grey paint; the crystal-cut headlamps lit softly, the matrix grille and winged badge accurate but subtle. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. 70 mm, f/8. Nothing else in the frame.
```

#### CGT-CUT-B — pure side profile (mobile / featured section)
**Size:** 3:2 · 2304×1536 · transparent
**Attach:** 2–4 real photos of the Continental GT Azure in stock
```
Image size: 2304×1536 px (3:2 aspect ratio, transparent background). Studio photograph of the attached Cambrian Grey Bentley Continental GT Azure, a pure side profile at wheel-hub height, nose to the right, so the fastback roofline and long bonnet read as one unbroken line, on a fully transparent background (if unavailable: seamless flat mid-grey #7A7A7A, no floor line, no cast shadow). Whole car in frame with even margins. Large soft key from the upper left, a thin champagne rim light along the roofline and the sharp rear haunch, cool fill opposite; crisp studio reflections in the satin-grey paint; the crystal-cut headlamps lit softly, the matrix grille and winged badge accurate but subtle. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. 70 mm, f/8. Nothing else in the frame.
```

#### CGT-HERO-D — composed fallback / OG base (desktop)
**Size:** 16:9 · 2560×1440
**Attach:** `CGT-BG-D` + real photos
```
Image size: 2560×1440 px (16:9 aspect ratio). Place the attached Bentley Continental GT Azure on the attached wet coast road, standing at the centre-right, front three-quarter view toward the lower-right, headlamps on low, its reflection in the wet asphalt, the horizon's warm band behind its roofline, champagne rim light on the haunch. Left third dark for typography. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated.
```

#### CGT-HERO-M — composed fallback (mobile)
**Size:** 9:16 · 1152×2048
**Attach:** `CGT-BG-M` + real photos
```
Image size: 1152×2048 px (9:16 aspect ratio). Place the attached Bentley Continental GT Azure on the attached wet coast road, seen from the front three-quarter, centred in the lower-middle band, headlamps on low, its reflection in the wet asphalt, the horizon's warm band behind its roofline, champagne rim light on the haunch. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated. Portrait 9:16; the car sits centred in the lower-middle band, seen from the front three-quarter. Portrait composition. Keep the car and every important detail inside the central 60% of the width, and clear of the top 18% and bottom 22% of the frame — those bands are reserved for typography and interface. Extend the environment naturally above and below.
```

#### CGT-DET-01 — exterior macro: the headlamp
**Size:** 4:3 · 2048×1536
**Attach:** real Continental GT photos
```
Image size: 2048×1536 px (4:3 aspect ratio). Macro photograph of the crystal-cut LED headlamp of the attached Cambrian Grey Bentley Continental GT, 100 mm macro, f/4: the faceted inner glass razor sharp, a soft champagne highlight sliding across the grey bonnet above, background falling into deep indigo blue-hour darkness with one faint warm horizon glow. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated.
```

#### CGT-DET-02 — interior
**Size:** 4:3 · 2048×1536
**Attach:** the real interior photo of this car
```
Image size: 2048×1536 px (4:3 aspect ratio). Interior photograph of the attached Bentley Continental GT from the driver's door, the diamond-quilted leather seats in the exact colour of the attached interior, the rotating display and knurled metal controls, the dark veneer dashboard, dusk light from the windscreen and a soft warm glow from the ambient lighting. Shallow depth of field, 35 mm, f/2.8. No people, no readable screen text. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated.
```

#### CGT-DET-03 — rear three-quarter on the coast road
**Size:** 4:3 · 2048×1536
**Attach:** `CGT-BG-D` + real photos
```
Image size: 2048×1536 px (4:3 aspect ratio). The attached Continental GT from the rear three-quarter on the attached coast road, its oval tail lamps glowing, the sea's indigo and the horizon's warm band reflected in the rear glass, wet asphalt mirroring the car. Camera low, 50 mm. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated.
```

---

### 4.3 Bentley Flying Spur Mulliner — `FSM` — The Porte-Cochère

#### FSM-BG-D
**Size:** 16:9 · 2560×1440
**Attach:** none
```
Image size: 2560×1440 px (16:9 aspect ratio). Night photograph of an empty porte-cochère of a grand luxury hotel, built for a car to be placed in later — no car, no people. A polished black marble driveway reflecting warm light, tall pale stone columns supporting a coffered canopy with recessed downlights, bronze-framed frosted glass doors glowing warm from a chandelier inside, a low planter of dark clipped foliage, the night beyond the columns deep midnight blue. The centre-right of the driveway is the lit standing area for the car; the left third stays darker for typography. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated.
```

#### FSM-BG-M
**Size:** 9:16 · 1152×2048
**Attach:** none
```
Image size: 1152×2048 px (9:16 aspect ratio). Night photograph of an empty porte-cochère of a grand luxury hotel, built for a car to be placed in later — no car, no people. A polished black marble driveway reflecting warm light, tall pale stone columns supporting a coffered canopy with recessed downlights, bronze-framed frosted glass doors glowing warm from a chandelier inside, a low planter of dark clipped foliage, the night beyond the columns deep midnight blue. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated. Portrait 9:16; the glowing doors sit in the upper-middle, the black marble driveway fills the lower half. Portrait composition. Keep the car and every important detail inside the central 60% of the width, and clear of the top 18% and bottom 22% of the frame — those bands are reserved for typography and interface. Extend the environment naturally above and below.
```

#### FSM-CUT-A — front three-quarter (desktop)
**Size:** 3:2 · 2304×1536 · transparent
**Attach:** 2–4 real photos of the Flying Spur Mulliner
```
Image size: 2304×1536 px (3:2 aspect ratio, transparent background). Studio photograph of the attached Bentley Flying Spur Mulliner, front three-quarter view at eye level, nose toward the lower-left, on a fully transparent background (if unavailable: seamless flat mid-grey #7A7A7A, no floor line, no cast shadow). Whole car in frame with even margins. Large soft key from the upper left, thin champagne rim light along the long roofline and rear quarter, cool fill opposite; crisp reflections in the paint; the Mulliner "Double Diamond" grille and the flying B mascot accurate but subtle; headlamps softly lit. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. 70 mm, f/8. Nothing else in the frame.
```

#### FSM-CUT-B — rear three-quarter (mobile alt)
**Size:** 3:2 · 2304×1536 · transparent
**Attach:** 2–4 real photos of the Flying Spur Mulliner
```
Image size: 2304×1536 px (3:2 aspect ratio, transparent background). Studio photograph of the attached Bentley Flying Spur Mulliner, rear three-quarter view, the tail toward the lower-right, the long rear door and haunch catching the rim light, on a fully transparent background (if unavailable: seamless flat mid-grey #7A7A7A, no floor line, no cast shadow). Whole car in frame with even margins. Large soft key from the upper left, thin champagne rim light along the long roofline and rear quarter, cool fill opposite; crisp reflections in the paint; the Mulliner "Double Diamond" grille and the flying B mascot accurate but subtle; headlamps softly lit. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. 70 mm, f/8. Nothing else in the frame.
```

#### FSM-HERO-D — composed fallback (desktop)
**Size:** 16:9 · 2560×1440
**Attach:** `FSM-BG-D` + real photos
```
Image size: 2560×1440 px (16:9 aspect ratio). Place the attached Flying Spur Mulliner beneath the attached porte-cochère, stopped at the centre-right as if just arrived, front three-quarter view toward the lower-left, its full reflection on the black marble, the warm door glow on its flank, champagne rim light along the roof. Left third dark for typography. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated.
```

#### FSM-HERO-M — composed fallback (mobile)
**Size:** 9:16 · 1152×2048
**Attach:** `FSM-BG-M` + real photos
```
Image size: 1152×2048 px (9:16 aspect ratio). Place the attached Flying Spur Mulliner beneath the attached porte-cochère, stopped as if just arrived, centred in the lower-middle band, front three-quarter view, its full reflection on the black marble, the warm door glow on its flank, champagne rim light along the roof. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated. Portrait 9:16; car centred in the lower-middle band. Portrait composition. Keep the car and every important detail inside the central 60% of the width, and clear of the top 18% and bottom 22% of the frame — those bands are reserved for typography and interface. Extend the environment naturally above and below.
```

#### FSM-DET-01 — exterior macro: the flying B
**Size:** 4:3 · 2048×1536
**Attach:** real Flying Spur Mulliner photos
```
Image size: 2048×1536 px (4:3 aspect ratio). Macro photograph of the illuminated retractable flying B mascot on the bonnet of the attached Flying Spur Mulliner, 100 mm macro, f/2.8, the crystal wings glowing faintly, the polished bonnet and the double-diamond grille beneath it falling softly out of focus into the deep warm-dark of the porte-cochère with two soft brass light glows. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated.
```

#### FSM-DET-02 — interior, rear cabin
**Size:** 4:3 · 2048×1536
**Attach:** real interior photo
```
Image size: 2048×1536 px (4:3 aspect ratio). Interior photograph of the attached Flying Spur Mulliner rear cabin from the open rear door: diamond-quilted seats in the exact colour of the attached interior, the veneered centre console, the touchscreen remote in its dock, deep-pile carpet, ambient lighting glowing softly, a warm exterior light from the door side and cool fill from the far window. 35 mm, f/2.8. No people, no readable screen text. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated.
```

#### FSM-DET-03 — side profile at the doors
**Size:** 4:3 · 2048×1536
**Attach:** `FSM-BG-D` + real photos
```
Image size: 2048×1536 px (4:3 aspect ratio). The attached Flying Spur in pure side profile in front of the attached glowing hotel doors, the length of the car filling the frame, its reflection perfect in the black marble. 50 mm, camera at hub height. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated.
```

---

### 4.4 Mercedes-Benz S-Class 2022 — `SCL` — The District

#### SCL-BG-D
**Size:** 16:9 · 2560×1440
**Attach:** none
```
Image size: 2560×1440 px (16:9 aspect ratio). Night photograph of an empty granite plaza between modern faceted glass office towers in Riyadh's financial district, built for a car to be placed in later — no car, no people. Rain-wet dark granite paving reflecting the tower lights, the towers rising out of frame with cool white and pale-gold window light, a row of slim architectural bollard lights, deep midnight sky. The centre-right of the plaza is the lit standing area; the left third of the frame is dark and quiet for typography. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated.
```

#### SCL-BG-M
**Size:** 9:16 · 1152×2048
**Attach:** none
```
Image size: 1152×2048 px (9:16 aspect ratio). Night photograph of an empty granite plaza between modern faceted glass office towers in Riyadh's financial district, built for a car to be placed in later — no car, no people. Rain-wet dark granite paving reflecting the tower lights, the towers rising out of frame with cool white and pale-gold window light, a row of slim architectural bollard lights, deep midnight sky. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated. Portrait 9:16; towers rise through the top half, the wet plaza fills the lower half. Portrait composition. Keep the car and every important detail inside the central 60% of the width, and clear of the top 18% and bottom 22% of the frame — those bands are reserved for typography and interface. Extend the environment naturally above and below.
```

#### SCL-CUT-A — front three-quarter (desktop)
**Size:** 3:2 · 2304×1536 · transparent
**Attach:** 2–4 real photos of the S-Class
```
Image size: 2304×1536 px (3:2 aspect ratio, transparent background). Studio photograph of the attached 2022 Mercedes-Benz S-Class saloon, front three-quarter view at eye level, nose toward the lower-right, on a fully transparent background (if unavailable: seamless flat mid-grey #7A7A7A, no floor line, no cast shadow). Whole car in frame with even margins. Large soft key from the upper left, thin champagne rim light along the roof and shoulder, cool fill opposite; crisp reflections in the paint; the three-pointed star in the grille and the flush door handles accurate and subtle; headlamps softly lit. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. 70 mm, f/8. Nothing else in the frame.
```

#### SCL-CUT-B — front-on (mobile)
**Size:** 4:5 · 1600×2000 · transparent
**Attach:** 2–4 real photos of the S-Class
```
Image size: 1600×2000 px (4:5 aspect ratio, transparent background). Studio photograph of the attached 2022 Mercedes-Benz S-Class saloon, seen straight-on from the front at headlamp height, very slightly from the right, on a fully transparent background (if unavailable: seamless flat mid-grey #7A7A7A, no floor line, no cast shadow). Whole car in frame with even margins. Large soft key from the upper left, thin champagne rim light along the roof and shoulder, cool fill opposite; crisp reflections in the paint; the three-pointed star in the grille and the flush door handles accurate and subtle; headlamps softly lit. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. 70 mm, f/8. Nothing else in the frame.
```

#### SCL-HERO-D — composed fallback (desktop)
**Size:** 16:9 · 2560×1440
**Attach:** `SCL-BG-D` + real photos
```
Image size: 2560×1440 px (16:9 aspect ratio). Place the attached S-Class on the attached wet plaza at the centre-right, front three-quarter toward the lower-right, headlamps on, the tower lights reflected along its flank and in the wet granite beneath it. Left third dark for typography. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated.
```

#### SCL-HERO-M — composed fallback (mobile)
**Size:** 9:16 · 1152×2048
**Attach:** `SCL-BG-M` + real photos
```
Image size: 1152×2048 px (9:16 aspect ratio). Place the attached S-Class on the attached wet plaza, centred in the lower-middle band, headlamps on, the tower lights reflected along its flank and in the wet granite beneath it. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated. Portrait 9:16; car centred in the lower-middle band. Portrait composition. Keep the car and every important detail inside the central 60% of the width, and clear of the top 18% and bottom 22% of the frame — those bands are reserved for typography and interface. Extend the environment naturally above and below.
```

#### SCL-DET-01 — exterior macro: the star
**Size:** 4:3 · 2048×1536
**Attach:** real S-Class photos
```
Image size: 2048×1536 px (4:3 aspect ratio). Macro photograph of the chrome three-pointed star in the grille of the attached S-Class, 100 mm macro, f/2.8, the star razor sharp with a champagne highlight on its upper edge, the grille slats and bonnet falling out of focus, the background dissolving into cool tower-light bokeh against midnight black. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated.
```

#### SCL-DET-02 — interior
**Size:** 4:3 · 2048×1536
**Attach:** real interior photo
```
Image size: 2048×1536 px (4:3 aspect ratio). Interior photograph of the attached S-Class from the driver's door: the wide leather dashboard in the exact colour of the attached interior, the tall central display and the digital instrument cluster switched on but showing only a soft abstract glow (no readable text), the ambient light strip glowing a warm champagne tone, the open-pore wood trim, night city lights soft beyond the windscreen. 35 mm, f/2.8. No people. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated.
```

#### SCL-DET-03 — rear three-quarter in the district
**Size:** 4:3 · 2048×1536
**Attach:** `SCL-BG-D` + real photos
```
Image size: 2048×1536 px (4:3 aspect ratio). The attached S-Class from the rear three-quarter on the attached plaza, tail lamps lit, the towers reflected in the rear glass and the wet granite. Camera low, 50 mm. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated.
```

---

### 4.5 Range Rover Autobiography 2024 (74) — `RRA` — The Sandstone

#### RRA-BG-D
**Size:** 16:9 · 2560×1440
**Attach:** none
```
Image size: 2560×1440 px (16:9 aspect ratio). Pre-dawn photograph of an empty desert floor among towering sandstone monoliths like those of AlUla, Saudi Arabia, built for a car to be placed in later — no car, no people, no tracks. A wide expanse of smooth pale sand in the foreground, two enormous rounded sandstone rock forms rising on the left and the far right, their surfaces catching the faintest cool light, a violet-grey pre-dawn sky with a single thin band of warm apricot light on the horizon. Very low key: the scene is dark, calm and vast. The centre-right sand is the lit standing area; the left third is darker for typography. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated.
```

#### RRA-BG-M
**Size:** 9:16 · 1152×2048
**Attach:** none
```
Image size: 1152×2048 px (9:16 aspect ratio). Pre-dawn photograph of an empty desert floor among towering sandstone monoliths like those of AlUla, Saudi Arabia, built for a car to be placed in later — no car, no people, no tracks. A wide expanse of smooth pale sand in the foreground, two enormous rounded sandstone rock forms rising on the left and the far right, their surfaces catching the faintest cool light, a violet-grey pre-dawn sky with a single thin band of warm apricot light on the horizon. Very low key: the scene is dark, calm and vast. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated. Portrait 9:16; a single monolith rises through the upper half, the sand floor fills the lower half. Portrait composition. Keep the car and every important detail inside the central 60% of the width, and clear of the top 18% and bottom 22% of the frame — those bands are reserved for typography and interface. Extend the environment naturally above and below.
```

#### RRA-CUT-A — front three-quarter (desktop)
**Size:** 3:2 · 2304×1536 · transparent
**Attach:** 2–4 real photos of the Range Rover Autobiography
```
Image size: 2304×1536 px (3:2 aspect ratio, transparent background). Studio photograph of the attached 2024 Range Rover Autobiography, front three-quarter view from slightly below eye level, nose toward the lower-left, on a fully transparent background (if unavailable: seamless flat mid-grey #7A7A7A, no floor line, no cast shadow). Whole car in frame with even margins. Large soft key from the upper left, thin champagne rim light along the flat roofline and the clean shoulder, cool fill opposite; crisp reflections in the paint; the slim headlamps softly lit, the flush door handles, the wheels exactly as in the attached photo. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. 70 mm, f/8. Nothing else in the frame.
```

#### RRA-CUT-B — front-on (mobile)
**Size:** 4:5 · 1600×2000 · transparent
**Attach:** 2–4 real photos of the Range Rover Autobiography
```
Image size: 1600×2000 px (4:5 aspect ratio, transparent background). Studio photograph of the attached 2024 Range Rover Autobiography, seen straight-on from the front at headlamp height, showing the full width and the upright grille, on a fully transparent background (if unavailable: seamless flat mid-grey #7A7A7A, no floor line, no cast shadow). Whole car in frame with even margins. Large soft key from the upper left, thin champagne rim light along the flat roofline and the clean shoulder, cool fill opposite; crisp reflections in the paint; the slim headlamps softly lit, the flush door handles, the wheels exactly as in the attached photo. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. 70 mm, f/8. Nothing else in the frame.
```

#### RRA-HERO-D — composed fallback (desktop)
**Size:** 16:9 · 2560×1440
**Attach:** `RRA-BG-D` + real photos
```
Image size: 2560×1440 px (16:9 aspect ratio). Place the attached Range Rover Autobiography on the sand at the centre-right of the attached pre-dawn scene, front three-quarter view toward the lower-left, its headlamps on low, the faint warm horizon behind its roofline, cool light on the flank. No tracks in the sand. Left third dark for typography. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated.
```

#### RRA-HERO-M — composed fallback (mobile)
**Size:** 9:16 · 1152×2048
**Attach:** `RRA-BG-M` + real photos
```
Image size: 1152×2048 px (9:16 aspect ratio). Place the attached Range Rover Autobiography on the sand, centred in the lower-middle band, monolith rising behind, its headlamps on low, the faint warm horizon behind its roofline, cool light on the flank. No tracks in the sand. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated. Portrait 9:16; car centred in the lower-middle band, monolith rising behind. Portrait composition. Keep the car and every important detail inside the central 60% of the width, and clear of the top 18% and bottom 22% of the frame — those bands are reserved for typography and interface. Extend the environment naturally above and below.
```

#### RRA-DET-01 — exterior macro: the lettering and headlamp edge
**Size:** 4:3 · 2048×1536
**Attach:** real Range Rover photos
```
Image size: 2048×1536 px (4:3 aspect ratio). Macro photograph of the front corner of the attached Range Rover Autobiography: the slim headlamp's edge and the bonnet lettering razor sharp, a cool pre-dawn highlight on the paint, the sandstone monolith a soft violet blur behind. 100 mm macro, f/2.8. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated.
```

#### RRA-DET-02 — interior
**Size:** 4:3 · 2048×1536
**Attach:** real interior photo
```
Image size: 2048×1536 px (4:3 aspect ratio). Interior photograph of the attached Range Rover Autobiography from the driver's door: the wide minimalist dashboard, the curved floating touchscreen showing only a soft dark glow (no readable text), the leather in the exact colour of the attached interior, the tall centre console, cool pre-dawn light through the panoramic roof, faint warm ambient light. 35 mm, f/2.8. No people. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated.
```

#### RRA-DET-03 — rear three-quarter among the rocks
**Size:** 4:3 · 2048×1536
**Attach:** `RRA-BG-D` + real photos
```
Image size: 2048×1536 px (4:3 aspect ratio). The attached Range Rover from the rear three-quarter on the sand, the hidden-until-lit tail lamps glowing, the monolith looming behind, a faint apricot horizon. Camera low, 50 mm. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated.
```

---

### 4.6 GMC Yukon Denali — `YUK` — The Villa

#### YUK-BG-D
**Size:** 16:9 · 2560×1440
**Attach:** none
```
Image size: 2560×1440 px (16:9 aspect ratio). Night photograph of an empty driveway of a modern minimalist villa in Riyadh, built for a car to be placed in later — no car, no people. A long wall of pale travertine grazed by warm linear light from concealed fixtures, a wide black basalt driveway reflecting the light, two tall date palms lit softly from below on the right, a slim horizontal band of warm interior light from a window at the far left, a deep midnight sky. The centre-right of the driveway is the lit standing area; the left third is dark for typography. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated.
```

#### YUK-BG-M
**Size:** 9:16 · 1152×2048
**Attach:** none
```
Image size: 1152×2048 px (9:16 aspect ratio). Night photograph of an empty driveway of a modern minimalist villa in Riyadh, built for a car to be placed in later — no car, no people. A long wall of pale travertine grazed by warm linear light from concealed fixtures, a wide black basalt driveway reflecting the light, two tall date palms lit softly from below on the right, a slim horizontal band of warm interior light from a window at the far left, a deep midnight sky. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated. Portrait 9:16; the travertine wall and palms fill the upper half, the basalt driveway the lower half. Portrait composition. Keep the car and every important detail inside the central 60% of the width, and clear of the top 18% and bottom 22% of the frame — those bands are reserved for typography and interface. Extend the environment naturally above and below.
```

#### YUK-CUT-A — front three-quarter (desktop)
**Size:** 3:2 · 2304×1536 · transparent
**Attach:** 2–4 real photos of the Yukon Denali
```
Image size: 2304×1536 px (3:2 aspect ratio, transparent background). Studio photograph of the attached GMC Yukon Denali, front three-quarter view from slightly below eye level, nose toward the lower-right, on a fully transparent background (if unavailable: seamless flat mid-grey #7A7A7A, no floor line, no cast shadow). Whole vehicle in frame with even margins. Large soft key from the upper left, thin champagne rim light along the tall roofline and shoulder, cool fill opposite; crisp reflections in the paint; the large chrome Denali grille and C-shaped headlamps accurate and subtle, headlamps softly lit; wheels exactly as attached. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. 70 mm, f/8. Nothing else in the frame.
```

#### YUK-CUT-B — front-on (mobile)
**Size:** 4:5 · 1600×2000 · transparent
**Attach:** 2–4 real photos of the Yukon Denali
```
Image size: 1600×2000 px (4:5 aspect ratio, transparent background). Studio photograph of the attached GMC Yukon Denali, seen straight-on from the front, camera at grille height, showing the full imposing width, on a fully transparent background (if unavailable: seamless flat mid-grey #7A7A7A, no floor line, no cast shadow). Whole vehicle in frame with even margins. Large soft key from the upper left, thin champagne rim light along the tall roofline and shoulder, cool fill opposite; crisp reflections in the paint; the large chrome Denali grille and C-shaped headlamps accurate and subtle, headlamps softly lit; wheels exactly as attached. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. 70 mm, f/8. Nothing else in the frame.
```

#### YUK-HERO-D — composed fallback (desktop)
**Size:** 16:9 · 2560×1440
**Attach:** `YUK-BG-D` + real photos
```
Image size: 2560×1440 px (16:9 aspect ratio). Place the attached Yukon Denali on the attached villa driveway at the centre-right, front three-quarter toward the lower-right, its reflection in the basalt, the warm wall light along its flank, palms behind. Left third dark for typography. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated.
```

#### YUK-HERO-M — composed fallback (mobile)
**Size:** 9:16 · 1152×2048
**Attach:** `YUK-BG-M` + real photos
```
Image size: 1152×2048 px (9:16 aspect ratio). Place the attached Yukon Denali on the attached villa driveway, vehicle centred in the lower-middle band, its reflection in the basalt, the warm wall light along its flank, palms behind. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated. Portrait 9:16; vehicle centred in the lower-middle band. Portrait composition. Keep the car and every important detail inside the central 60% of the width, and clear of the top 18% and bottom 22% of the frame — those bands are reserved for typography and interface. Extend the environment naturally above and below.
```

#### YUK-DET-01 — exterior macro: the grille
**Size:** 4:3 · 2048×1536
**Attach:** real Yukon Denali photos
```
Image size: 2048×1536 px (4:3 aspect ratio). Macro photograph of the chrome grille mesh and the corner of the headlamp of the attached Yukon Denali, 100 mm macro, f/4, chrome catching a champagne highlight, the travertine wall a soft warm blur behind. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated.
```

#### YUK-DET-02 — interior, second row
**Size:** 4:3 · 2048×1536
**Attach:** real interior photo
```
Image size: 2048×1536 px (4:3 aspect ratio). Interior photograph of the attached Yukon Denali from the open rear door showing the second-row captain's chairs in the exact leather colour of the attached interior, the wide centre console ahead, the rear entertainment screens dark, the panoramic roof faintly reflecting warm exterior light, a soft cool fill from the far window. 28 mm, f/2.8. No people, no readable text. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated.
```

#### YUK-DET-03 — rear three-quarter, tailgate to the house
**Size:** 4:3 · 2048×1536
**Attach:** `YUK-BG-D` + real photos
```
Image size: 2048×1536 px (4:3 aspect ratio). The attached Yukon Denali from the rear three-quarter on the villa driveway, tail lamps lit, the travertine wall and palms reflected in the rear glass, basalt mirroring the vehicle. 50 mm, low. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated.
```

---

### 4.7 Chevrolet Corvette C8 Stingray — `C8` — The Light Lines

#### C8-BG-D
**Size:** 16:9 · 2560×1440
**Attach:** none
```
Image size: 2560×1440 px (16:9 aspect ratio). Empty black photographic studio built for a sports car to be placed in later — no car in the frame. A vast black space with a mirror-polished black floor. On the back wall and along both side walls, thin horizontal lines of cool white light run parallel toward a vanishing point at the centre, evenly spaced, growing dimmer with distance; one line, third from the floor, is warm champagne-gold instead of white. The lines reflect in the floor as a second set. The centre of the floor is softly lit where the car will stand; the upper 35% of the frame is pure black for a giant headline. Crisp, graphic, precise. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated.
```

#### C8-BG-M
**Size:** 9:16 · 1152×2048
**Attach:** none
```
Image size: 1152×2048 px (9:16 aspect ratio). Empty black photographic studio built for a sports car to be placed in later — no car in the frame. A vast black space with a mirror-polished black floor. On the back wall and along both side walls, thin horizontal lines of cool white light run parallel toward a vanishing point at the centre, evenly spaced, growing dimmer with distance; one line, third from the floor, is warm champagne-gold instead of white. The lines reflect in the floor as a second set. Crisp, graphic, precise. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated. Portrait 9:16; the vanishing point sits at 58% of the frame height, lines converging from both sides, the lit floor area in the lower third. Portrait composition. Keep the car and every important detail inside the central 60% of the width, and clear of the top 18% and bottom 22% of the frame — those bands are reserved for typography and interface. Extend the environment naturally above and below.
```

#### C8-CUT-A — front three-quarter, low (desktop)
**Size:** 3:2 · 2304×1536 · transparent
**Attach:** 2–4 real photos of the C8 in stock (bright blue)
```
Image size: 2304×1536 px (3:2 aspect ratio, transparent background). Studio photograph of the attached bright blue Chevrolet Corvette C8 Stingray, front three-quarter view from a low camera at headlamp height, nose toward the lower-left, on a fully transparent background (if unavailable: seamless flat mid-grey #7A7A7A, no floor line, no cast shadow). Whole car in frame with even margins. Large soft key from the upper left, thin champagne rim light along the roof and the sharp side intake edge, cool fill opposite; crisp reflections in the blue paint; the slim headlamps and the mid-engine cabin-forward proportions exact; wheels exactly as attached. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. 70 mm, f/8. Nothing else in the frame.
```

#### C8-CUT-B — rear three-quarter (mobile alt)
**Size:** 3:2 · 2304×1536 · transparent
**Attach:** 2–4 real photos of the C8 in stock
```
Image size: 2304×1536 px (3:2 aspect ratio, transparent background). Studio photograph of the attached bright blue Chevrolet Corvette C8 Stingray, rear three-quarter view, low, the tail toward the lower-right, showing the quad exhausts, the rear spoiler and the engine cover, on a fully transparent background (if unavailable: seamless flat mid-grey #7A7A7A, no floor line, no cast shadow). Whole car in frame with even margins. Large soft key from the upper left, thin champagne rim light along the roof and the sharp side intake edge, cool fill opposite; crisp reflections in the blue paint; wheels exactly as attached. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. 70 mm, f/8. Nothing else in the frame.
```

#### C8-HERO-D — composed fallback (desktop)
**Size:** 16:9 · 2560×1440
**Attach:** `C8-BG-D` + real photos
```
Image size: 2560×1440 px (16:9 aspect ratio). Place the attached blue Corvette C8 at the centre of the attached light-line studio, front three-quarter toward the lower-left, low camera, the white and champagne lines reflected along its flank and mirrored in the floor beneath it. Upper third black for typography. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated.
```

#### C8-HERO-M — composed fallback (mobile)
**Size:** 9:16 · 1152×2048
**Attach:** `C8-BG-M` + real photos
```
Image size: 1152×2048 px (9:16 aspect ratio). Place the attached blue Corvette C8 in the attached light-line studio, car centred in the lower-middle band, the white and champagne lines reflected along its flank and mirrored in the floor beneath it. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated. Portrait 9:16; car centred in the lower-middle band. Portrait composition. Keep the car and every important detail inside the central 60% of the width, and clear of the top 18% and bottom 22% of the frame — those bands are reserved for typography and interface. Extend the environment naturally above and below.
```

#### C8-DET-01 — exterior macro: the side intake
**Size:** 4:3 · 2048×1536
**Attach:** real C8 photos
```
Image size: 2048×1536 px (4:3 aspect ratio). Macro photograph of the sharp side air intake and rear wheel arch of the attached blue Corvette C8, 100 mm macro, f/4, the white light lines of the studio reflected as thin streaks along the blue paint, the background pure black. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated.
```

#### C8-DET-02 — interior, the cockpit
**Size:** 4:3 · 2048×1536
**Attach:** real interior photo
```
Image size: 2048×1536 px (4:3 aspect ratio). Interior photograph of the attached Corvette C8 from the driver's door: the driver-focused cockpit with the tall wall of switches on the centre spine, the square-topped steering wheel, the seats in the exact colour of the attached interior, the digital cluster showing only a soft glow (no readable text), cool white studio light lines reflected in the glass. 28 mm, f/2.8. No people. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated.
```

#### C8-DET-03 — rear, low, with the lines
**Size:** 4:3 · 2048×1536
**Attach:** `C8-BG-D` + real photos
```
Image size: 2048×1536 px (4:3 aspect ratio). The attached Corvette C8 straight from behind, camera at bumper height, the tail lamps glowing, the quad exhausts and wide hips filling the lower frame, the light lines converging above and reflected below. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated.
```

---

### 4.8 Lamborghini Urus — `URU` — The Bunker

#### URU-BG-D
**Size:** 16:9 · 2560×1440
**Attach:** none
```
Image size: 2560×1440 px (16:9 aspect ratio). Night photograph of an empty brutalist underground concrete hall, built for a car to be placed in later — no car, no people. Raw board-formed concrete walls and massive square columns, a wet dark concrete floor, and one square opening high above through which a single vertical shaft of cool white light falls onto the floor at the centre-right, forming a bright rectangle with soft edges; a faint champagne glow low along the far wall. Everything outside the shaft is near-black with just enough detail to read the architecture. Left third of the frame dark for typography. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated.
```

#### URU-BG-M
**Size:** 9:16 · 1152×2048
**Attach:** none
```
Image size: 1152×2048 px (9:16 aspect ratio). Night photograph of an empty brutalist underground concrete hall, built for a car to be placed in later — no car, no people. Raw board-formed concrete walls and massive square columns, a wet dark concrete floor, and one square opening high above through which a single vertical shaft of cool white light falls onto the floor at the centre-right, forming a bright rectangle with soft edges; a faint champagne glow low along the far wall. Everything outside the shaft is near-black with just enough detail to read the architecture. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated. Portrait 9:16; the shaft of light falls from the top of the frame to a lit rectangle in the lower-middle. Portrait composition. Keep the car and every important detail inside the central 60% of the width, and clear of the top 18% and bottom 22% of the frame — those bands are reserved for typography and interface. Extend the environment naturally above and below.
```

#### URU-CUT-A — front three-quarter, low (desktop)
**Size:** 3:2 · 2304×1536 · transparent
**Attach:** 2–4 real photos of the Urus
```
Image size: 2304×1536 px (3:2 aspect ratio, transparent background). Studio photograph of the attached Lamborghini Urus, front three-quarter view from a low camera, nose toward the lower-right, on a fully transparent background (if unavailable: seamless flat mid-grey #7A7A7A, no floor line, no cast shadow). Whole car in frame with even margins. Large soft key from the upper left, thin champagne rim light along the roof and the sharp shoulder crease, cool fill opposite; crisp reflections in the paint in the exact colour of the attached photos; the Y-shaped daytime running lights softly lit, the hexagonal intakes and the badge accurate and subtle; wheels exactly as attached. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. 70 mm, f/8. Nothing else in the frame.
```

#### URU-CUT-B — front-on (mobile)
**Size:** 4:5 · 1600×2000 · transparent
**Attach:** 2–4 real photos of the Urus
```
Image size: 1600×2000 px (4:5 aspect ratio, transparent background). Studio photograph of the attached Lamborghini Urus, seen straight-on from the front at bumper height, the full width and the Y-shaped lights dominating, on a fully transparent background (if unavailable: seamless flat mid-grey #7A7A7A, no floor line, no cast shadow). Whole car in frame with even margins. Large soft key from the upper left, thin champagne rim light along the roof and the sharp shoulder crease, cool fill opposite; crisp reflections in the paint in the exact colour of the attached photos; wheels exactly as attached. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. 70 mm, f/8. Nothing else in the frame.
```

#### URU-HERO-D — composed fallback (desktop)
**Size:** 16:9 · 2560×1440
**Attach:** `URU-BG-D` + real photos
```
Image size: 2560×1440 px (16:9 aspect ratio). Place the attached Urus inside the shaft of light in the attached concrete hall at the centre-right, front three-quarter toward the lower-right, low camera, the top of the car brightly lit from above, the flanks falling into shadow, its reflection in the wet floor. Left third dark for typography. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated.
```

#### URU-HERO-M — composed fallback (mobile)
**Size:** 9:16 · 1152×2048
**Attach:** `URU-BG-M` + real photos
```
Image size: 1152×2048 px (9:16 aspect ratio). Place the attached Urus inside the shaft of light in the attached concrete hall, car centred in the lower-middle band beneath the shaft, the top of the car brightly lit from above, the flanks falling into shadow, its reflection in the wet floor. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated. Portrait 9:16; car centred in the lower-middle band beneath the shaft. Portrait composition. Keep the car and every important detail inside the central 60% of the width, and clear of the top 18% and bottom 22% of the frame — those bands are reserved for typography and interface. Extend the environment naturally above and below.
```

#### URU-DET-01 — exterior macro: the Y light
**Size:** 4:3 · 2048×1536
**Attach:** real Urus photos
```
Image size: 2048×1536 px (4:3 aspect ratio). Macro photograph of the Y-shaped daytime running light and the sharp hexagonal intake of the attached Urus, 100 mm macro, f/4, the light element crisp, the paint catching a hard cool highlight from above and a champagne one from the side, raw concrete a dark blur behind. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated.
```

#### URU-DET-02 — interior
**Size:** 4:3 · 2048×1536
**Attach:** real interior photo
```
Image size: 2048×1536 px (4:3 aspect ratio). Interior photograph of the attached Urus from the driver's door: the hexagonal design language of the dashboard, the red start-button cover under its flap, the twin centre touchscreens dark with a faint glow (no readable text), the seats in the exact colour and stitching of the attached interior, a shaft of cool light from above and a warm ambient glow. 28 mm, f/2.8. No people. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated.
```

#### URU-DET-03 — rear three-quarter in the bunker
**Size:** 4:3 · 2048×1536
**Attach:** `URU-BG-D` + real photos
```
Image size: 2048×1536 px (4:3 aspect ratio). The attached Urus from the rear three-quarter at the edge of the shaft of light, Y-shaped tail lamps lit, the concrete column beside it, the wet floor mirroring the car. Low camera, 50 mm. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated.
```

---

### 4.9 Porsche 911 — `911` — The Pass

#### 911-BG-D
**Size:** 16:9 · 2560×1440
**Attach:** none
```
Image size: 2560×1440 px (16:9 aspect ratio). Night photograph of an empty rain-wet mountain road just outside a tunnel, built for a car to be placed in later — no car, no people. The tunnel mouth glows warm amber at the upper left of the frame, the wet asphalt curves from the tunnel toward the lower right reflecting the amber light, a steel guard rail on the right edge, the mountain a black mass above, fine mist hanging in the air, a deep midnight-blue sky. The centre-right of the road is the lit standing area; the upper-right is dark and calm for typography. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated.
```

#### 911-BG-M
**Size:** 9:16 · 1152×2048
**Attach:** none
```
Image size: 1152×2048 px (9:16 aspect ratio). Night photograph of an empty rain-wet mountain road just outside a tunnel, built for a car to be placed in later — no car, no people. The tunnel mouth glows warm amber at the upper left of the frame, the wet asphalt curves from the tunnel toward the lower right reflecting the amber light, a steel guard rail on the right edge, the mountain a black mass above, fine mist hanging in the air, a deep midnight-blue sky. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated. Portrait 9:16; the tunnel mouth glows in the upper-middle, the wet road runs down to the bottom edge. Portrait composition. Keep the car and every important detail inside the central 60% of the width, and clear of the top 18% and bottom 22% of the frame — those bands are reserved for typography and interface. Extend the environment naturally above and below.
```

#### 911-CUT-A — rear three-quarter, low (desktop)
**Size:** 3:2 · 2304×1536 · transparent
**Attach:** 2–4 real photos of the 911
```
Image size: 2304×1536 px (3:2 aspect ratio, transparent background). Studio photograph of the attached Porsche 911, rear three-quarter view from a low camera, the tail toward the lower-left, on a fully transparent background (if unavailable: seamless flat mid-grey #7A7A7A, no floor line, no cast shadow). Whole car in frame with even margins. Large soft key from the upper left, a thin champagne rim light tracing the famous roofline from the windscreen down to the tail, cool fill opposite; crisp reflections in the paint in the exact colour of the attached photos; the full-width light bar softly lit, the wide rear hips and the exact wheels from the attached photos. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. 70 mm, f/8. Nothing else in the frame.
```

#### 911-CUT-B — front three-quarter (mobile alt)
**Size:** 3:2 · 2304×1536 · transparent
**Attach:** 2–4 real photos of the 911
```
Image size: 2304×1536 px (3:2 aspect ratio, transparent background). Studio photograph of the attached Porsche 911, front three-quarter view, low, nose toward the lower-right, the round headlamps softly lit, on a fully transparent background (if unavailable: seamless flat mid-grey #7A7A7A, no floor line, no cast shadow). Whole car in frame with even margins. Large soft key from the upper left, a thin champagne rim light tracing the famous roofline, cool fill opposite; crisp reflections in the paint in the exact colour of the attached photos; the exact wheels from the attached photos. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. 70 mm, f/8. Nothing else in the frame.
```

#### 911-HERO-D — composed fallback (desktop)
**Size:** 16:9 · 2560×1440
**Attach:** `911-BG-D` + real photos
```
Image size: 2560×1440 px (16:9 aspect ratio). Place the attached 911 on the wet road of the attached mountain pass at the centre-right, rear three-quarter view with the tail toward the lower-left, the light bar glowing, the amber tunnel light reflected along the roofline and in the wet asphalt, mist behind. Upper-right dark for typography. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated.
```

#### 911-HERO-M — composed fallback (mobile)
**Size:** 9:16 · 1152×2048
**Attach:** `911-BG-M` + real photos
```
Image size: 1152×2048 px (9:16 aspect ratio). Place the attached 911 on the wet road of the attached mountain pass, car centred in the lower-middle band, tunnel glow above it, the light bar glowing, the amber tunnel light reflected along the roofline and in the wet asphalt, mist behind. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated. Portrait 9:16; car centred in the lower-middle band, tunnel glow above it. Portrait composition. Keep the car and every important detail inside the central 60% of the width, and clear of the top 18% and bottom 22% of the frame — those bands are reserved for typography and interface. Extend the environment naturally above and below.
```

#### 911-DET-01 — exterior macro: the light bar
**Size:** 4:3 · 2048×1536
**Attach:** real 911 photos
```
Image size: 2048×1536 px (4:3 aspect ratio). Macro photograph of the glowing full-width rear light bar and the engine-lid grille of the attached 911, 100 mm macro, f/4, the red light element crisp, rain droplets beaded on the paint, the amber tunnel mouth a soft blur behind. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated.
```

#### 911-DET-02 — interior
**Size:** 4:3 · 2048×1536
**Attach:** real interior photo
```
Image size: 2048×1536 px (4:3 aspect ratio). Interior photograph of the attached 911 from the driver's door: the small three-spoke steering wheel, the instrument cluster with its central dial showing only a soft glow (no readable text), the seats in the exact colour of the attached interior, the short centre console, amber tunnel light glowing softly through the rear glass and cool fill from the side. 28 mm, f/2.8. No people. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated.
```

#### 911-DET-03 — motion: leaving the tunnel (the one moving image)
**Size:** 4:3 · 2048×1536
**Attach:** `911-BG-D` + real photos
```
Image size: 2048×1536 px (4:3 aspect ratio). The attached 911 driving out of the amber tunnel toward the camera on the wet road, panned so the car is sharp and the tunnel walls and road streak into gentle motion blur, headlamps on, spray faint behind the rear wheels. 85 mm, 1/60 s pan. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation. (Motion blur permitted in this image only.)
```

---

### 4.10 Mercedes-AMG G 63 — `G63` — The Wadi

#### G63-BG-D
**Size:** 16:9 · 2560×1440
**Attach:** none
```
Image size: 2560×1440 px (16:9 aspect ratio). Night photograph of an empty rocky desert wadi under a full moon, built for a car to be placed in later — no car, no people, no tracks. Dark boulders and a low rocky ridge on the left, a flat pale sandy floor in the centre-right, a faint dust haze glowing cool blue in the moonlight, the moon itself out of frame, a very faint warm glow low on the horizon at the far right. Very low key, deep blue-black, calm. The centre-right sand is the lit standing area; the left third is darker for typography. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated.
```

#### G63-BG-M
**Size:** 9:16 · 1152×2048
**Attach:** none
```
Image size: 1152×2048 px (9:16 aspect ratio). Night photograph of an empty rocky desert wadi under a full moon, built for a car to be placed in later — no car, no people, no tracks. Dark boulders and a low rocky ridge on the left, a flat pale sandy floor in the centre-right, a faint dust haze glowing cool blue in the moonlight, the moon itself out of frame, a very faint warm glow low on the horizon at the far right. Very low key, deep blue-black, calm. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated. Portrait 9:16; the ridge rises through the upper half, the sandy floor fills the lower half. Portrait composition. Keep the car and every important detail inside the central 60% of the width, and clear of the top 18% and bottom 22% of the frame — those bands are reserved for typography and interface. Extend the environment naturally above and below.
```

#### G63-CUT-A — front three-quarter (desktop)
**Size:** 3:2 · 2304×1536 · transparent
**Attach:** 2–4 real photos of the G 63
```
Image size: 2304×1536 px (3:2 aspect ratio, transparent background). Studio photograph of the attached Mercedes-AMG G 63, front three-quarter view from slightly below eye level, nose toward the lower-left, on a fully transparent background (if unavailable: seamless flat mid-grey #7A7A7A, no floor line, no cast shadow). Whole vehicle in frame with even margins. Large soft key from the upper left, a thin champagne rim light along the flat roof edge and the exposed door hinges, cool fill opposite; crisp reflections in the paint in the exact colour of the attached photos; round headlamps softly lit, the AMG grille and the spare-wheel cover accurate; wheels exactly as attached. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. 70 mm, f/8. Nothing else in the frame.
```

#### G63-CUT-B — front-on (mobile)
**Size:** 4:5 · 1600×2000 · transparent
**Attach:** 2–4 real photos of the G 63
```
Image size: 1600×2000 px (4:5 aspect ratio, transparent background). Studio photograph of the attached Mercedes-AMG G 63, seen straight-on from the front at grille height, the boxy silhouette and round headlamps dominating, on a fully transparent background (if unavailable: seamless flat mid-grey #7A7A7A, no floor line, no cast shadow). Whole vehicle in frame with even margins. Large soft key from the upper left, a thin champagne rim light along the flat roof edge and the exposed door hinges, cool fill opposite; crisp reflections in the paint in the exact colour of the attached photos; wheels exactly as attached. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. 70 mm, f/8. Nothing else in the frame.
```

#### G63-HERO-D — composed fallback (desktop)
**Size:** 16:9 · 2560×1440
**Attach:** `G63-BG-D` + real photos
```
Image size: 2560×1440 px (16:9 aspect ratio). Place the attached G 63 on the sandy floor of the attached moonlit wadi at the centre-right, front three-quarter toward the lower-left, headlamps on, cool moonlight on the roof and a faint champagne rim on the flank, dust haze behind. No tracks. Left third dark for typography. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated.
```

#### G63-HERO-M — composed fallback (mobile)
**Size:** 9:16 · 1152×2048
**Attach:** `G63-BG-M` + real photos
```
Image size: 1152×2048 px (9:16 aspect ratio). Place the attached G 63 on the sandy floor of the attached moonlit wadi, vehicle centred in the lower-middle band, headlamps on, cool moonlight on the roof and a faint champagne rim on the flank, dust haze behind. No tracks. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated. Portrait 9:16; vehicle centred in the lower-middle band. Portrait composition. Keep the car and every important detail inside the central 60% of the width, and clear of the top 18% and bottom 22% of the frame — those bands are reserved for typography and interface. Extend the environment naturally above and below.
```

#### G63-DET-01 — exterior macro: the hinge and indicator
**Size:** 4:3 · 2048×1536
**Attach:** real G 63 photos
```
Image size: 2048×1536 px (4:3 aspect ratio). Macro photograph of the exposed door hinge and the top-mounted indicator lamp of the attached G 63, 100 mm macro, f/4, cool moonlight highlight on the flat panel, the rocky ridge a deep blue blur behind. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated.
```

#### G63-DET-02 — interior
**Size:** 4:3 · 2048×1536
**Attach:** real interior photo
```
Image size: 2048×1536 px (4:3 aspect ratio). Interior photograph of the attached G 63 from the driver's door: the upright dashboard with the wide screen showing only a soft glow (no readable text), the grab handle on the passenger side, the three differential-lock switches, the seats in the exact colour and stitching of the attached interior, cool moonlight through the flat windscreen and a warm ambient glow. 28 mm, f/2.8. No people. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated.
```

#### G63-DET-03 — rear three-quarter in the wadi
**Size:** 4:3 · 2048×1536
**Attach:** `G63-BG-D` + real photos
```
Image size: 2048×1536 px (4:3 aspect ratio). The attached G 63 from the rear three-quarter on the sand, the spare-wheel cover and tail lamps sharp, boulders behind under blue moonlight, a faint warm horizon at the right. Low camera, 50 mm. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated.
```

> **Adding more cars later:** copy one car's set of prompts and change three things — the environment, the angle (front ¾ for SUVs/saloons, low front ¾ or rear ¾ for sports cars, pure side for grand tourers), and the giant word. Spare environments in the same tonal world: *The Atrium* (black marble lobby, single skylight), *The Hangar* (private jet hangar), *The Marina* (superyacht stern lights on black water), *The Library* (dark wood and brass, one lamp), *The Salt Flat* (moonlit white flat, endless), *The Terrace* (rooftop over Riyadh skyline).

---

## 5. Car Detail Page — Shared Assets

### CD-KEY-01 — The key on marble
**Size:** 4:3 · 2048×1536
**Attach:** none
```
Image size: 2048×1536 px (4:3 aspect ratio). Still-life photograph of a single luxury car key fob — an unbranded, elegant black-and-polished-metal fob with no visible logo — resting on a slab of dark, softly veined black marble, beside it a folded sheet of thick cream paper and a black fountain pen, all lit by one soft warm light from the upper left so the metal edge catches a champagne highlight; everything else dissolves into deep black. 85 mm, f/2.8, shallow depth of field. No text, no logos, no hands. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated.
```

### CD-PROV-01 — Provenance: the inspection bay
**Size:** 4:3 · 2048×1536
**Attach:** photo of the Range Rover Autobiography (or any dark SUV in stock)
```
Image size: 2048×1536 px (4:3 aspect ratio). Photograph of the attached vehicle raised on a clean four-post lift in a spotless dark workshop bay, lit dramatically from below and from a single soft overhead light so the underbody and wheels are clearly visible, the polished dark epoxy floor reflecting the car, walls black, no tools or clutter visible, no people. Clinical, calm, trustworthy. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated.
```

> **Gallery strip note:** each car's detail page gallery reuses `[CODE]-HERO-D`, `[CODE]-DET-01`, `[CODE]-DET-02`, `[CODE]-DET-03`, and `[CODE]-HERO-M`, plus real photographs run through the `RT-CAR` retouch recipe in §8 below — no new prompts needed.

---

## 6. Services Page Imagery

### SV-HERO-D — "Beyond the sale" hero (desktop)
**Size:** 16:9 · 2560×1440
**Attach:** `SH-05-D`
```
Image size: 2560×1440 px (16:9 aspect ratio). Photograph inside the attached showroom at night of a single large luxury car completely covered by a fitted, matte, champagne-beige indoor car cover, standing alone in a pool of soft light on the cream marble, its silhouette unmistakably a long grand tourer, the cover's folds catching a thin warm highlight, the floor reflecting it. Room otherwise dark. Left third of the frame calm for typography. No people, no text, no logos. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated.
```

### SV-HERO-M — "Beyond the sale" hero (mobile)
**Size:** 9:16 · 1152×2048
**Attach:** `SH-05-D`
```
Image size: 1152×2048 px (9:16 aspect ratio). Photograph inside the attached showroom at night of a single large luxury car completely covered by a fitted, matte, champagne-beige indoor car cover, standing alone in a pool of soft light on the cream marble, its silhouette unmistakably a long grand tourer, the cover's folds catching a thin warm highlight, the floor reflecting it. Room otherwise dark. No people, no text, no logos. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated. Portrait 9:16; the covered car centred in the lower-middle band. Portrait composition. Keep the car and every important detail inside the central 60% of the width, and clear of the top 18% and bottom 22% of the frame — those bands are reserved for typography and interface. Extend the environment naturally above and below.
```

### SV-01-D — Sourcing: "Name it. We'll find it." (desktop)
**Size:** 16:9 · 2560×1440
**Attach:** none
```
Image size: 2560×1440 px (16:9 aspect ratio). Night photograph on the tarmac of a private aviation terminal: the open ramp of a cargo aircraft glowing warm from inside at the upper left, and in the foreground, out of focus, the corner of a luxury car under a fitted dark cover being unloaded on a low trolley, its cover edge catching a champagne highlight. Deep midnight-blue night, wet tarmac reflections, faint runway lights in the distance. Right half of the frame dark and smooth for a glass card. No people, no aircraft livery, no text. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated.
```

### SV-01-M — Sourcing: "Name it. We'll find it." (mobile)
**Size:** 9:16 · 1152×2048
**Attach:** none
```
Image size: 1152×2048 px (9:16 aspect ratio). Night photograph on the tarmac of a private aviation terminal: the open ramp of a cargo aircraft glowing warm from inside, and in the foreground, out of focus, the corner of a luxury car under a fitted dark cover being unloaded on a low trolley, its cover edge catching a champagne highlight. Deep midnight-blue night, wet tarmac reflections, faint runway lights in the distance. No people, no aircraft livery, no text. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated. Portrait 9:16; the aircraft ramp glows in the upper third, the covered car in the lower third. Portrait composition. Keep the car and every important detail inside the central 60% of the width, and clear of the top 18% and bottom 22% of the frame — those bands are reserved for typography and interface. Extend the environment naturally above and below.
```

### SV-02-D — Finance: "Terms as tailored as the car." (desktop)
**Size:** 16:9 · 2560×1440
**Attach:** `CD-KEY-01`
```
Image size: 2560×1440 px (16:9 aspect ratio). Re-frame the attached still life as a wide landscape: the key, the folded cream paper and the pen occupy the left third on the dark marble, the right two-thirds is smooth, empty, near-black marble for a glass card. Same lighting, same grade. No text. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated.
```

### SV-02-M — Finance: "Terms as tailored as the car." (mobile)
**Size:** 9:16 · 1152×2048
**Attach:** `CD-KEY-01`
```
Image size: 1152×2048 px (9:16 aspect ratio). Portrait 9:16 re-frame of the attached still life: the key, the folded cream paper and the pen occupy the upper third on the dark marble, empty dark marble below. Same lighting, same grade. No text. Portrait composition. Keep the car and every important detail inside the central 60% of the width, and clear of the top 18% and bottom 22% of the frame — those bands are reserved for typography and interface. Extend the environment naturally above and below.
```

### SV-03-D — Trade-in: "Your current car, valued fairly." (desktop)
**Size:** 16:9 · 2560×1440
**Attach:** `CD-PROV-01`
```
Image size: 2560×1440 px (16:9 aspect ratio). Re-frame the attached inspection-bay photograph as a wide landscape with the raised vehicle on the left half and the right half a smooth, dark, empty workshop wall for a glass card. Same lighting and grade. No people, no text. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated.
```

### SV-03-M — Trade-in: "Your current car, valued fairly." (mobile)
**Size:** 9:16 · 1152×2048
**Attach:** `CD-PROV-01`
```
Image size: 1152×2048 px (9:16 aspect ratio). Portrait 9:16 re-frame of the attached inspection-bay photograph: the raised vehicle fills the upper half, dark floor below. Same lighting and grade. No people, no text. Portrait composition. Keep the car and every important detail inside the central 60% of the width, and clear of the top 18% and bottom 22% of the frame — those bands are reserved for typography and interface. Extend the environment naturally above and below.
```

### SV-04-D — Registration & export (desktop)
**Size:** 16:9 · 2560×1440
**Attach:** `SH-02-D`
```
Image size: 2560×1440 px (16:9 aspect ratio). Night photograph outside the attached showroom: a sleek black enclosed car transporter parked at the kerb with its rear ramp lowered and its interior lit warm, the glass façade of the showroom glowing behind, a dark luxury SUV under a fitted cover halfway up the ramp, wet pavement reflections. The left half of the frame is the darker street for a glass card. No people, no readable text, no company livery on the truck. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated.
```

### SV-04-M — Registration & export (mobile)
**Size:** 9:16 · 1152×2048
**Attach:** `SH-02-D`
```
Image size: 1152×2048 px (9:16 aspect ratio). Night photograph outside the attached showroom: a sleek black enclosed car transporter parked at the kerb with its rear ramp lowered and its interior lit warm, the glass façade of the showroom glowing behind, a dark luxury SUV under a fitted cover halfway up the ramp, wet pavement reflections. No people, no readable text, no company livery on the truck. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated. Portrait 9:16; the transporter's lit interior in the middle band. Portrait composition. Keep the car and every important detail inside the central 60% of the width, and clear of the top 18% and bottom 22% of the frame — those bands are reserved for typography and interface. Extend the environment naturally above and below.
```

### SV-05-D — Aftercare: "Kept as it arrived." (desktop)
**Size:** 16:9 · 2560×1440
**Attach:** photo of the Cambrian Grey Continental GT
```
Image size: 2560×1440 px (16:9 aspect ratio). Extreme macro photograph of water beading on the freshly detailed satin-grey paint of the attached Bentley Continental GT, hundreds of perfect droplets on the curved bonnet catching a champagne highlight from the upper left and cool blue reflections from the right, the surface curving away into deep black. 100 mm macro, f/5.6. The right half of the frame becomes smooth dark paint for a glass card. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated.
```

### SV-05-M — Aftercare: "Kept as it arrived." (mobile)
**Size:** 9:16 · 1152×2048
**Attach:** photo of the Cambrian Grey Continental GT
```
Image size: 1152×2048 px (9:16 aspect ratio). Extreme macro photograph of water beading on the freshly detailed satin-grey paint of the attached Bentley Continental GT, hundreds of perfect droplets on the curved bonnet catching a champagne highlight from the upper left and cool blue reflections from the right, the surface curving away into deep black. 100 mm macro, f/5.6. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated. Portrait 9:16; the droplets in the upper half, smooth dark paint below. Portrait composition. Keep the car and every important detail inside the central 60% of the width, and clear of the top 18% and bottom 22% of the frame — those bands are reserved for typography and interface. Extend the environment naturally above and below.
```

### SV-06-D — Delivery: "To your door, under cover." (desktop)
**Size:** 16:9 · 2560×1440
**Attach:** `YUK-BG-D` (the villa) + photo of the Rolls-Royce Cullinan
```
Image size: 2560×1440 px (16:9 aspect ratio). Night photograph on the attached villa driveway: the attached Rolls-Royce Cullinan standing at the centre-right with a fitted champagne-beige car cover drawn halfway back from the front, revealing the grille and headlamps which are softly lit, the rest of the car still covered, the travertine wall warm behind, the basalt floor reflecting it. Left third dark for a glass card. No people, no text. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated.
```

### SV-06-M — Delivery: "To your door, under cover." (mobile)
**Size:** 9:16 · 1152×2048
**Attach:** `YUK-BG-D` (the villa) + photo of the Rolls-Royce Cullinan
```
Image size: 1152×2048 px (9:16 aspect ratio). Night photograph on the attached villa driveway: the attached Rolls-Royce Cullinan standing with a fitted champagne-beige car cover drawn halfway back from the front, revealing the grille and headlamps which are softly lit, the rest of the car still covered, the travertine wall warm behind, the basalt floor reflecting it. No people, no text. Reproduce the exact car in the attached photographs: the same model and model year, body colour and finish, wheel design, trim, badges, ride height and proportions. Do not restyle, modernise, or invent details. Keep badges small, accurate and subtle. Windows are dark tinted with faint interior visible. Paint shows crisp, realistic studio reflections. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated. Portrait 9:16; the half-unveiled car centred in the lower-middle band. Portrait composition. Keep the car and every important detail inside the central 60% of the width, and clear of the top 18% and bottom 22% of the frame — those bands are reserved for typography and interface. Extend the environment naturally above and below.
```

---

## 7. Visit / Contact Page Imagery

### CT-HERO — "You are expected."
Reuse `SH-06-D` / `SH-06-M` (the façade from across the boulevard) — see §2. Giant word "MAJLIS" / "المجلس" is placed over it in code, not in the image.

### CT-MAJLIS-01
Reuse `SH-09` (the coffee still life) — see §2.

### CT-MAP
Reuse `HM-MAP-D` / `HM-MAP-M` — see §3.

### CT-DOOR-01 — The door handle
**Size:** 1:1 · 2048×2048
**Attach:** `SH-02-D`
```
Image size: 2048×2048 px (1:1 aspect ratio). Macro photograph of the long brushed-steel pull handle of the attached showroom's frameless glass entrance door at night, the handle razor sharp with a champagne highlight along its edge, the warm interior and the gleam of a car's flank a soft blur through the glass behind, the pavement lights reflected faintly. 85 mm, f/2. No people, no text. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated.
```

---

## 8. Retouch Recipe for Real Car Photographs

### RT-CAR — Real photo clean-up (run once per real photo, every car)
**Size:** keep the original photo's aspect ratio; request 2048 px on the long edge
**Attach:** the real photograph to be cleaned up
```
Image size: 2048 px on the long edge, keeping the original photo's aspect ratio. Retouch the attached real photograph of this car for a luxury showroom website without changing the car in any way: keep the exact colour, wheels, trim, badges, angle and proportions. Remove people, reflections of the photographer, price tags, stickers, cones, cables, clutter, and blur or blank the number plate. Clean the floor, remove dust and fingerprints from the paint, correct verticals, and balance the exposure. Re-grade to a low-key, slightly desaturated look with deep clean blacks, a warm champagne tint in the highlights and a cool blue-grey tint in the shadows; darken and simplify the background so the car is the only bright subject. No added text, no lens flare, no HDR halo. Photoreal.
```

---

## 9. Utility Assets

### UT-GLOW-01 — Champagne glow, square
**Size:** 1:1 · 2048×2048
**Attach:** none
```
Image size: 2048×2048 px (1:1 aspect ratio). Abstract background photograph: a single, very soft, large champagne-gold glow at the centre of a pure black frame, like a distant light seen through frosted glass, fading smoothly to black at the edges, with a faint fine film grain. Nothing else. No shapes, no rays, no bokeh circles, no text.
```

### UT-404-D — "Nothing here. Yet." (desktop)
**Size:** 16:9 · 2560×1440
**Attach:** `SH-05-D`
```
Image size: 2560×1440 px (16:9 aspect ratio). The attached showroom interior at night with the single pool of light on the marble — but with no car in it, just the empty lit floor and the faint reflection of the ceiling grid. Calm, expectant, dark. No text, no people. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated.
```

### UT-404-M — "Nothing here. Yet." (mobile)
**Size:** 9:16 · 1152×2048
**Attach:** `SH-05-D`
```
Image size: 1152×2048 px (9:16 aspect ratio). The attached showroom interior at night with the single pool of light on the marble — but with no car in it, just the empty lit floor and the faint reflection of the ceiling grid. Calm, expectant, dark. No text, no people. Ultra-premium commercial automotive photography for a luxury showroom website. Night or blue hour. Low-key lighting: one large soft key light from the upper left, a thin champagne-gold rim light tracing the body line, a cool blue-grey fill from the opposite side. Deep, true blacks with shadow detail preserved. Polished, softly reflective floor. Calm, breathable composition with generous negative space. Colour grade: slightly desaturated, warm champagne tint in the highlights, cool midnight tint in the shadows. Photoreal, medium-format sharpness, 50–85 mm lens, f/8, ISO 100. No people, no readable text, no signage, no logos other than the car's own badges, no watermark, no lens flare, no HDR halo, no oversaturation, no motion blur unless stated. Portrait 9:16; the empty pool of light in the lower-middle. Portrait composition. Keep the car and every important detail inside the central 60% of the width, and clear of the top 18% and bottom 22% of the frame — those bands are reserved for typography and interface. Extend the environment naturally above and below.
```

---

## Not prompts — build these in code / vector instead
Per the source document, do **not** generate these with an image model:
- Marque logos for the brand slider (Rolls-Royce, Bentley, Mercedes-Benz, Range Rover, Chevrolet, GMC, Lamborghini, Porsche) — use official monochrome SVGs, white at 70% opacity.
- Film grain overlay — SVG `feTurbulence` or a tiling noise PNG.
- Diamond pattern watermark — tile `BR-02` as SVG.
- Map — Mapbox / Google Maps with a custom dark style.
- Icons — thin-stroke line icons (Lucide / Phosphor Thin), never AI-generated.

