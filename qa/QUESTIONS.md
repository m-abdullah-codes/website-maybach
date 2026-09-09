# Questions for the client

Only questions where the spec is silent and the choice is irreversible (AGENTS.md §5). Everything else is decided and noted in `qa/LOG.md`.

1. **Privacy and Terms.** The footer copy lists "Privacy · Terms" but the site map (docs/02 §4) has no such pages and no copy exists for them. They render as plain text until pages are supplied. Are they required at launch, and who provides the text?
2. **Interior caption (D5).** The template is "{interior}, {material}, {feature}." but `cars.json` carries only the interior colour. The caption renders "Arctic White, [material], [feature]." until a material and a notable feature are supplied per car.
3. **Marque logos.** `public/logos/<slug>.svg` is empty; the marquee shows the marque names until the official SVGs arrive (rolls-royce, bentley, mercedes-benz, range-rover, chevrolet, gmc, lamborghini, porsche).
4. **Preloader versus first-visit speed.** The 1.65 s curtain (docs/02 §3.16) hides the hero on every first visit, which is what keeps Lighthouse's simulated Speed Index and LCP above the targets in `qa/REPORT.md`. Options: keep it as designed; shorten it to about 1 s; or skip it when the connection is slow (`navigator.connection.effectiveType`). This changes the arrival moment, so it is the client's call.
5. **Map.** The Visit page shows the HM-MAP photograph as the map tile with the emblem pin, linking to directions. A dark-styled live map needs the confirmed address and a Mapbox or Google key.

6. **Which building is the showroom?** *(blocking a coherence pack; raised in the imagery brief §9.1, and now visible on the site)* The photograph supplied in September shows a sand-limestone building with a charcoal fascia, brushed-steel MAY BACH letters and licence **4924**. It is retouched into `HM-FACADE-D/-M` and renders on Home H6, "Come after dark." The Showroom and Visit pages still show a **different** building — a two-storey white-framed glass box with a navy illuminated sign and licence **4447** — retouched in the first round from the photographs supplied then. A visitor now scrolls past one address on Home and a different one on `/showroom`. Are they the same premises? If the new photograph is the current showroom, six rendered images show the wrong address and need regenerating from it: `SH-01-D/-M` (Showroom hero), `SH-02-D/-M`, `SH-06-D/-M` (Visit hero, Showroom CTA, Home visit strip), `SH-04` (the sign macro), `SV-04-D/-M` (the façade glowing behind the transporter) and `HM-VIEW-D/-M` (the lit glass entrance, which renders in three places) — eleven files, prompts in the imagery brief §7.1. **And the licence number in the copy**: `content/site.en.json` and `site.ar.json` carry **4447** in the footer and in the Showroom "numbers" strip; the new sign reads **4924**. That is the client's number to confirm, not ours to change.

7. **The G 63's story line mentions a wadi.** The car has moved from *The Wadi* to **The Upper Floor** — it now stands on the showroom's second floor against the clerestory — but its `story` still reads *"the rare car that is equally at home in a wadi and outside the Ritz"* (`"في الوادي كما هي أمام الريتز"`). The line is not wrong — it is about where the car belongs, not where the photograph was taken — so it has been left exactly as written. If you would rather the page did not name a place the picture no longer shows, a replacement that keeps the sentence's shape: *"the rare car that is equally at home on a dune road and outside the Ritz"* / *"على طريق الكثبان كما هي أمام الريتز"*. Client copy either way — say the word and it changes.

8. **The eight Arabic room names want a native check.** The captions render on every Collection row, every car page and in `alt` text, in both languages. They are his building's names for its own rooms, so they are worth thirty seconds of his time — and the Arabic worth a native reading rather than ours:

   | English | Arabic | Car |
   |---|---|---|
   | The Marble | الرخام | Rolls-Royce Cullinan |
   | The Glass Wall | الجدار الزجاجي | Bentley Continental GT |
   | The Mezzanine | الميزانين | Mercedes-Benz S-Class |
   | The Colonnade | رواق الأعمدة | Range Rover Autobiography |
   | The Entrance | المدخل | GMC Yukon Denali |
   | The Corner | الزاوية | Lamborghini Urus |
   | The Reflection | الانعكاس | Porsche 911 Carrera |
   | The Upper Floor | الطابق العلوي | Mercedes-AMG G 63 |

   *The Salon* (الصالون) and *The Light Lines* (خطوط الضوء) are unchanged — those two cars stay in their studios.

9. **Every Scene is now the light room, and that overrides the spec twice.** At the client's request the four sandwich sections (Home featured, and the Cullinan, Flying Spur and Continental GT rows) all stand on the Flying Spur's pale salon. `docs/02 §2.1` says there is exactly one light room; there are four. Two consequences he should see before signing off, both visible in `qa/showroom-set/collection-1440.png`: the Collection page's warm → neutral → pale → cool rhythm no longer runs through the Scenes — the pale beat now recurs three times instead of once — and rows 4 and 7 are two Bentley side profiles in the same pale room, two screens apart, which reads closer to a repeat than the page did before. It is one line per section to put any of them back into their own room; the showroom plates for the Cullinan and the Continental GT are installed, correct and simply unused.
