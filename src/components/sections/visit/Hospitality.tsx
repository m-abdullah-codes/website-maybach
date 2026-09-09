import type { Site } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { MediaBg } from "@/components/ui/MediaBg";
import { SplitText } from "@/components/ui/SplitText";

/** docs/02 M4: one centred line over HM-VIEW. */
export function Hospitality({ site }: { site: Site }) {
  return (
    <Section id="hospitality" className="hosp" fade={false}>
      <MediaBg desktop="hm-view-d" mobile="hm-view-m" overlay="y" />
      <div className="wrap hosp__inner scrim scrim--center">
        <SplitText tag="p" className="t-display-l" text={site.visit.hospitality} />
      </div>
    </Section>
  );
}
