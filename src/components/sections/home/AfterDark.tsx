import type { Site } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { MediaBg } from "@/components/ui/MediaBg";
import { ScrollFx } from "@/components/ui/ScrollFx";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";

/**
 * docs/02 H6: full-bleed photograph, copy bottom-start over the dark third, one glass button.
 * Ken Burns by scroll.
 *
 * The plate is HM-FACADE, not the SH-05 the spec names. SH-05 is the interior after hours, and
 * that composition is now the hero two screens up — leaving it here showed the same room, the same
 * car and the same light twice in one scroll. The blue-hour façade is also the better match for
 * "Come after dark": the sign lit, the cars visible through the glass. SH-05 keeps its other home,
 * the Showroom page’s "After hours" tile.
 */
export function AfterDark({ site }: { site: Site }) {
  const a = site.home.afterDark;
  return (
    <Section id="after-dark" className="afterdark">
      <ScrollFx scaleFrom={1.08} className="absolute inset-0 will-change-transform">
        <MediaBg desktop="sh-05-d" mobile="sh-05-m" overlay="y" />
      </ScrollFx>
      <div className="wrap afterdark__inner">
        <Reveal>
          <Eyebrow>{a.eyebrow}</Eyebrow>
        </Reveal>
        <SplitText tag="h2" className="t-display-l mt-6" text={a.title} />
        <Reveal as="p" delay={200} className="t-body-l measure mt-4 text-silver">
          {a.sub}
        </Reveal>
        <Reveal delay={320} className="mt-8">
          <Button variant="glass" href="/visit" icon>
            {a.button}
          </Button>
        </Reveal>
      </div>
    </Section>
  );
}
