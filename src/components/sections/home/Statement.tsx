import type { Site } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { MediaBg } from "@/components/ui/MediaBg";
import { ScrollFx } from "@/components/ui/ScrollFx";
import { Reveal, RevealWords } from "@/components/ui/Reveal";

/** docs/02 H2: one line, Statement style, centred, 100vh / 70svh; the support line arrives 400 ms later. */
export function Statement({ site }: { site: Site }) {
  const s = site.home.statement;
  return (
    <Section id="statement" className="statement">
      <ScrollFx parallax={60} className="absolute -inset-y-8 inset-x-0 will-change-transform">
        <MediaBg desktop="hm-statement-bg-d" mobile="hm-statement-bg-m" />
      </ScrollFx>
      <div className="wrap statement__inner">
        <RevealWords as="h2" className="t-statement" text={s.line} />
        <Reveal as="p" delay={400} className="t-small statement__support text-pewter">
          {s.support}
        </Reveal>
      </div>
    </Section>
  );
}
