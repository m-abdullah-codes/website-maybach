import type { Site } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { MediaBg } from "@/components/ui/MediaBg";
import { ScrollFx } from "@/components/ui/ScrollFx";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";

/**
 * docs/02 H2: one line, Statement style, centred, 100vh / 70svh; the support line arrives 400 ms later.
 *
 * No `fadeTop`. It was here while the hero above was the light room — the salon otherwise met this
 * night photograph at a hard horizontal edge. The hero is a dark showroom again (Hero.tsx, September
 * 2026), so both sections fade to obsidian and the join needs nothing of its own. Bring the prop back
 * if the hero ever goes pale again.
 */
export function Statement({ site }: { site: Site }) {
  const s = site.home.statement;
  return (
    <Section id="statement" className="statement">
      <ScrollFx parallax={60} className="absolute -inset-y-8 inset-x-0 will-change-transform">
        <MediaBg desktop="hm-statement-bg-d" mobile="hm-statement-bg-m" />
      </ScrollFx>
      <div className="wrap statement__inner scrim scrim--center">
        <SplitText tag="h2" className="t-statement" text={s.line} />
        <Reveal as="p" delay={400} className="t-small statement__support text-pewter">
          {s.support}
        </Reveal>
      </div>
    </Section>
  );
}
