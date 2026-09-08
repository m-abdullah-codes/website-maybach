import type { Site } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { MediaBg } from "@/components/ui/MediaBg";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { PromiseStack } from "./PromiseStack";

/**
 * docs/02 H4: the Bentley headlamp macro; headline start-side staggered over its lines; three frosted
 * cards end-side. Desktop pins for 1.5 viewports while the cards slide up into a stack (PromiseStack).
 */
export function Promise({ site }: { site: Site }) {
  const w = site.home.why;
  return (
    <Section id="promise" className="promise" data-promise="">
      <div className="absolute inset-0" data-promise-bg="">
        <MediaBg desktop="hm-why-bg-d" mobile="hm-why-bg-m" overlay="x" />
      </div>
      <PromiseStack>
        <div className="wrap promise__inner">
          <div className="promise__head scrim">
            <Reveal>
              <Eyebrow>{w.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal as="h2" lines className="t-display-l promise__title mt-6">
              {w.title}
            </Reveal>
            <Reveal as="p" delay={240} className="t-body-l measure mt-6 text-silver">
              {w.sub}
            </Reveal>
          </div>
          <ul className="promise__cards">
            {w.cards.map((c) => (
              <GlassCard key={c.title} as="li" icon={c.icon} title={c.title} body={c.body} className="promise__card" />
            ))}
          </ul>
        </div>
      </PromiseStack>
    </Section>
  );
}
