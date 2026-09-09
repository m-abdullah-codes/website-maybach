import type { Site } from "@/lib/content";
import { PageHero } from "@/components/ui/PageHero";

/**
 * Home H1. The Showroom page's hero, exactly: one photograph of the showroom — the building itself at
 * deep blue hour, sign lit, the cars visible through the glass — the giant word over the sky at reduced
 * opacity, and four things of copy at the bottom. Nothing else in the frame.
 *
 * The client asked twice, and the second ask is the one this file answers: "make the hero of the home
 * page look like that of the showroom, the content on it should be very minimal." So the two buttons,
 * the scroll cue and the floating "Now showing" card are gone, and what is left is the same set the
 * Showroom, Services, Visit and Collection heroes carry — eyebrow, word, headline, support line. The
 * page has one idea on it again.
 *
 * The plate is SH-01 — literally the Showroom page hero's own photograph, at the client's request, so
 * the two pages open on the same building in the same light. It went through the interior plate and
 * then HM-FACADE on the way here; both stay on disk, and the interior one (SH-05's composition) is back
 * at H6 "Come after dark", where docs/02 put it, so no room appears twice on the page.
 *
 * A consequence worth knowing: SH-01 is the *old* façade — the white-framed glass building with the
 * navy sign and licence 4447 — not the sand-limestone one with licence 4924 that the client photographed
 * in September, which is retouched into HM-FACADE and now renders nowhere. Using SH-01 here makes the
 * site internally consistent (Home, Showroom and Visit all show one building) at the cost of showing the
 * older premises. qa/QUESTIONS.md asks which building is current; the answer decides whether HM-FACADE
 * comes back and eleven images get regenerated.
 *
 * One thing to keep an eye on: this plate's brightest band is the lit shopfront, and the headline sits
 * over its lower edge. The overlay-y scrim carries it — checked at both widths in both locales — but it
 * is the tightest legibility on the page.
 *
 * September 2026, the client again: drop the cycling wordmark (MAY BACH ⇄ THE FINEST) and the support
 * line "The world's most desired motor cars. One address." What is left — eyebrow and headline — is
 * centred horizontally and stays down in the photograph's bottom blend, where the gradient carries it.
 * The copy stays in content/site.*.json untouched; only this hero stops rendering it.
 *
 * Two consequences, both deliberate. docs/02 §5 H1 specifies two buttons and the glass card; the
 * landing page now carries no call to action of its own, and leans on the nav's standing "Reserve a
 * viewing" pill, the sticky Enquire / Concierge bar below the fold, and H3 "Currently in residence"
 * one scroll down. And docs/02 §3.9's five Scenes are four: this hero is a photograph with a word over
 * it, not a background-word-cut-out sandwich. Both are recorded in qa/LOG.md.
 */
export function Hero({ site }: { site: Site }) {
  const h = site.home.hero;
  return (
    <PageHero
      className="home__hero"
      wordPlacement="sky"
      desktop="sh-01-d"
      mobile="sh-01-m"
      eyebrow={h.eyebrow}
      title={h.title}
    />
  );
}
