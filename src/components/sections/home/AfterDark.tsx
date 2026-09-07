import type { Site } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { MediaBg } from "@/components/ui/MediaBg";
import { ScrollFx } from "@/components/ui/ScrollFx";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

/** docs/02 H6: SH-05 full-bleed, copy bottom-start over the dark third, one glass button. Ken Burns by scroll. */
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
        <Reveal as="h2" lines className="t-display-l mt-6">
          {a.title}
        </Reveal>
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
