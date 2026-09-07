# QA log

## Phase 0 — Foundations

**Built:** Next 15.5 App Router scaffold (TypeScript strict, Tailwind v4, next-intl v4 with `/` and `/ar`, GSAP and Lenis installed), the full token set from docs/03 §3 in `src/app/globals.css` with the Tailwind palette removed so no other colour can exist, the type scale as `.t-*` classes with `clamp()` between 390 and 1440, the glass and liquid recipes verbatim, self-hosted Bodoni Moda / Manrope / Amiri / IBM Plex Sans Arabic through `next/font/local`, `src/lib/content.ts` (single content module, localises cars, rows, preview, categories), `src/lib/images.ts` (manifest lookup, blur placeholders, cut-out alpha bounds), `scripts/blur-placeholders.mjs` (151 placeholders + 22 alpha bounds), the emblem redrawn as three strokes and the wordmark traced from the masters (`public/brand`, `src/components/brand`), the base UI (`Section`, `MediaBg`, `Eyebrow`, `Button` ×5, `GlassCard`, `LiquidBadge`, `EnvCaption`, `SpecChip`, `GiantWord`, `Icon`), the static `Scene` with both compositions and the RTL mirror, the dev-only `/styleguide` and `/ar/styleguide`, favicon from the emblem, QA scripts (`scripts/shoot.mjs`, `peek.mjs`, `measure.mjs`, `overflow.mjs`).

**Left:** everything from Phase 1 on (shell, pages, motion). Home currently renders only the wordmark and tagline. Media-scoped preload for the desktop hero image (Phase 7). Apple touch icon and OG image (Phase 7).

**Decisions and disagreements with the spec (docs/02 wins where it is explicit; these are where it is silent or self-contradictory):**
- Bodoni Moda has no 300 weight (the variable face is 400–900), so the Statement style is 400 italic.
- Fonts are self-hosted subsets via `next/font/local`, as §2.2 asks ("serve self-hosted WOFF2"); the build-time Google Fonts fetch in `next/font/google` hit connection resets on this network. Arabic faces are the `arabic` subsets only and the Arabic stacks fall through to Bodoni / Manrope, so Western numerals and Latin names inside Arabic copy set in the Latin faces (§1.3, §2.9).
- Giant word on mobile: Bodoni capitals are ~0.62 em wide, so an 8-letter word at 22vw is 429 px on a 390 px screen. `GiantWord` scales Latin words longer than seven characters to the viewport minus gutters (CULLINAN → 69 px at 390). Multi-word texts (MAY BACH) wrap to two lines at the spec size.
- Scene word position on desktop: §3.9's rule ("baseline at 58% of the car's height") puts the whole word behind the car body; the sketch and the sentence beside it ("top of word above the roofline, bottom hidden behind the car") are followed instead. The word box sits 30% of its height below the measured roofline (from the cut-out's alpha bounds) and ends inside the viewport with a 2vw gutter rather than bleeding off with the car.
- Spec values are wrapped in an LTR isolate so "563 hp" keeps its order in Arabic layout (§12 of docs/03 for Latin names, applied to numerals too).
- next-intl ships no message bundle to the client; all copy flows through `content.ts` on the server.
- `MediaBg` gives `priority` to the mobile image and `fetchPriority="high"` to the desktop one; a media-scoped preload for the desktop hero is deferred to Phase 7 so mobile never downloads both.
- The eyebrow hairline is `currentColor` at 40% (silver) rather than the 10% white hairline, which is invisible at 24 px next to 12 px type.

**Screenshots:** `qa/phase-0/styleguide-{390,1440}.png`, `ar-styleguide-{390,1440}.png`, `home-*.png`, `ar-*.png`, plus `detail-*.png` viewport crops of the Scene, glass, type and brand blocks at both widths.
