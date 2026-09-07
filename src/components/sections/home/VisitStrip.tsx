import type { Site } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { MediaBg } from "@/components/ui/MediaBg";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

/** docs/02 H9: HM-MAP behind; a glass panel end-side (full width on mobile) with the details and directions. */
export function VisitStrip({ site }: { site: Site }) {
  const v = site.home.visitStrip;
  const phoneHref = `tel:${site.settings.phone.replace(/[^\d+]/g, "")}`;
  return (
    <Section id="visit-strip" className="vstrip" fade={false}>
      <MediaBg desktop="hm-map-d" mobile="hm-map-m" overlay="y" />
      <div className="wrap vstrip__inner">
        <Reveal className="vstrip__panel glass">
          <Eyebrow>{v.eyebrow}</Eyebrow>
          <h2 className="t-display-m mt-5">{v.line}</h2>
          <ul className="vstrip__details t-small mt-5 text-silver">
            <li>{site.footer.address}</li>
            <li>{site.footer.hours}</li>
            <li>
              <a href={phoneHref} dir="ltr" className="vstrip__phone">
                {site.footer.phone}
              </a>
            </li>
          </ul>
          <div className="mt-6">
            <Button variant="text" href={site.settings.mapsUrl}>
              {site.common.getDirections}
            </Button>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
