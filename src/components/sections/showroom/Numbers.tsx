import type { Site } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { Section } from "@/components/ui/Section";
import { MediaBg } from "@/components/ui/MediaBg";
import { ScrollFx } from "@/components/ui/ScrollFx";
import { Reveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";

interface Figure {
  value: number;
  label: string;
  animate: boolean;
  arWhole?: string;
  prefixLabel?: boolean;
}

/** docs/02 S3: SH-08 (from the mezzanine) full-bleed; four figures in Display L over the empty marble, lower-start. */
export function Numbers({ site, locale }: { site: Site; locale: Locale }) {
  const figures = site.showroom.numbers as Figure[];
  return (
    <Section id="numbers" className="numbers">
      <ScrollFx parallax={40} className="absolute -inset-y-6 inset-x-0 will-change-transform">
        <MediaBg desktop="sh-08-d" mobile="sh-08-m" overlay="y" />
      </ScrollFx>
      <div className="wrap numbers__inner scrim">
        <Reveal stagger as="ul" className="numbers__grid">
          {figures.map((f) => {
            const whole = locale === "ar" && f.arWhole ? f.arWhole : null;
            return (
              <li key={f.label} className="numbers__item t-display-l">
                {whole ? (
                  <span>{whole}</span>
                ) : f.prefixLabel ? (
                  <>
                    <span className="numbers__label">{f.label}</span> <CountUp value={f.value} animate={f.animate} />
                  </>
                ) : (
                  <>
                    <CountUp value={f.value} animate={f.animate} /> <span className="numbers__label">{f.label}</span>
                  </>
                )}
              </li>
            );
          })}
        </Reveal>
      </div>
    </Section>
  );
}
