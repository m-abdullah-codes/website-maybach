import type { Car, Site } from "@/lib/content";
import { fillOrBracket } from "@/lib/format";
import { Section } from "@/components/ui/Section";
import { MediaBg } from "@/components/ui/MediaBg";
import { ScrollFx } from "@/components/ui/ScrollFx";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";

/** docs/02 D5: DET-02 full-bleed, 80vh; "Inside." and one caption line, bottom-start. */
export function Inside({ car, site }: { car: Car; site: Site }) {
  // The caption template needs [material] and [feature] per car; they are not in cars.json yet, so they render bracketed.
  const caption = fillOrBracket(site.car.inside.caption, { interior: car.interior });
  return (
    <Section id="inside" className="inside">
      <ScrollFx parallax={40} className="absolute -inset-y-6 inset-x-0 will-change-transform">
        <MediaBg desktop={car.images.interior} overlay="y" position="50% 50%" />
      </ScrollFx>
      <div className="wrap inside__inner">
        <SplitText tag="h2" className="t-display-l" text={site.car.inside.title} />
        <Reveal as="p" delay={160} className="t-body-l measure mt-3 text-silver">
          {caption}
        </Reveal>
      </div>
    </Section>
  );
}
