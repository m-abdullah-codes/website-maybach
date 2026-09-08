# Questions for the client

Only questions where the spec is silent and the choice is irreversible (AGENTS.md §5). Everything else is decided and noted in `qa/LOG.md`.

1. **Privacy and Terms.** The footer copy lists "Privacy · Terms" but the site map (docs/02 §4) has no such pages and no copy exists for them. They render as plain text until pages are supplied. Are they required at launch, and who provides the text?
2. **Interior caption (D5).** The template is "{interior}, {material}, {feature}." but `cars.json` carries only the interior colour. The caption renders "Arctic White, [material], [feature]." until a material and a notable feature are supplied per car.
3. **Marque logos.** `public/logos/<slug>.svg` is empty; the marquee shows the marque names until the official SVGs arrive (rolls-royce, bentley, mercedes-benz, range-rover, chevrolet, gmc, lamborghini, porsche).
4. **Preloader versus first-visit speed.** The 1.65 s curtain (docs/02 §3.16) hides the hero on every first visit, which is what keeps Lighthouse's simulated Speed Index and LCP above the targets in `qa/REPORT.md`. Options: keep it as designed; shorten it to about 1 s; or skip it when the connection is slow (`navigator.connection.effectiveType`). This changes the arrival moment, so it is the client's call.
5. **Map.** The Visit page shows the HM-MAP photograph as the map tile with the emblem pin, linking to directions. A dark-styled live map needs the confirmed address and a Mapbox or Google key.
