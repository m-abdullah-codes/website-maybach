# Kick-off prompt for the development agent

Paste the block below as the first message to your coding agent (Claude Code, Codex, Cursor agent — any of them) with the project folder open. `AGENTS.md` / `CLAUDE.md` at the root will be picked up automatically on every turn; this message just points the agent at the plan and sets the pace.

---

```
You are building the website for May Bach (ماي باخ), a luxury multi-marque car showroom in Riyadh. The design, copy and photography are finished and are in this repository. Your job is implementation at a standard that justifies a five-figure invoice: this must feel like a private gallery open at night — black, monochrome, breathable, frosted glass on photography, a serif that whispers, motion that is slow and physical — not like a car-dealer template.

Start by reading, in this order, without skipping:
1. AGENTS.md (rules — non-negotiable)
2. docs/02-site-blueprint-design-system.md (the spec: tokens, components, every page and section with sketches and copy)
3. docs/03-build-brief.md (the build plan: stack, folder structure, component contracts, phases, acceptance criteria)
4. content/cars.json, content/site.en.json, content/site.ar.json (all copy — render verbatim, never invent text)
5. content/image-manifest.json (every photograph in public/images with its real size and use)

Then confirm back to me, in ten lines or fewer: the five places the Scene component is allowed, the three car treatments, which car gets the light room, the interface colour rule, and the fonts for each language. Do not begin coding until you have done that.

After I say go: execute Phase 0 from docs/03-build-brief.md — scaffold Next.js 15 (App Router, TypeScript, Tailwind v4, next-intl, GSAP, Lenis), the tokens in globals.css exactly as given, next/font setup, src/lib/content.ts and src/lib/images.ts, the blur-placeholder script, the base UI components, and the dev-only /styleguide route showing every token, type style, button, a glass card on mb-hm-why-bg-d, and one static Scene with mb-cul-cut-a on mb-cul-bg-d. Take screenshots at 390×844 and 1440×900 into qa/phase-0/, write qa/LOG.md, run the build, commit as "phase-0: foundations", and stop for review.

Rules that override anything else you might be inclined to do:
- No colour in the UI. No gold, no champagne, no blue, no accent token. Platinum on black. The only colour is in the photographs, plus --scene-accent on a caption dot and a link underline inside each car's own sections.
- A photograph in every section; -m images under 768 px, -d above; never crop desktop images for mobile.
- The Scene (giant word between background and cut-out) appears in exactly five places. Everything else is a Photograph row or a Car card. The Flying Spur row is the one pale room.
- Glass recipes verbatim from docs/02 §2.4. Motion tokens and easings verbatim from §2.6; respect prefers-reduced-motion everywhere.
- Copy verbatim from content/*.json; no exclamation marks, no emojis, no lorem ipsum. Arabic is never letter-spaced or uppercased; layout mirrors in /ar, photographs do not.
- Mobile first: design and check at 390 px before 1440 px. Sticky Enquire + Concierge bar on every page after the hero.
- Do not modify public/images, docs/ or content/.
- Work one phase at a time; screenshots + qa/LOG.md + clean build + commit at the end of each; stop and wait for review between phases.

If the spec is silent on something irreversible, write the question in qa/QUESTIONS.md and pick the option closest to the spirit of docs/02 §0 and §1.5. Otherwise decide and move on.
```

---

## After Phase 0

Review the styleguide at both widths. If it looks like `docs/02`, reply with:

```
Go: Phase 1 (global shell), then stop for review.
```

and continue phase by phase (`Phase 2 — Home`, `Phase 3 — Collection`, `Phase 4 — Car detail`, `Phase 5 — Showroom, Services, Visit`, `Phase 6 — Arabic pass`, `Phase 7 — Performance, SEO, QA`). Between phases, the most useful review is: open `qa/<phase>/` screenshots beside the sketches in `docs/02`, and look for anything that could belong to any other car website — that is what to send back.

## Things only you can supply before launch

`content/site.en.json` and `site.ar.json` → `settings` (WhatsApp number, phone, email, maps URL, social handles), the address and hours in `footer`, the street in `showroom.story[1]`, the district in `home.visitStrip.line`; and in `content/cars.json` every field named in each car's `verify` array (colours, variants, mileage, warranty). Official marque SVG logos for `public/logos/`. The agent will list what is still bracketed in `qa/REPORT.md` at the end of Phase 7.
