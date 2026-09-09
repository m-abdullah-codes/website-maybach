import type { Car, Site } from "@/lib/content";
import { fill } from "@/lib/content";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { Section } from "@/components/ui/Section";
import { MediaBg } from "@/components/ui/MediaBg";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";

/** docs/02 D6: CD-PROV-01 behind; glass chips over the dark half for the papers that apply; one link. */
export function Provenance({ car, site }: { car: Car; site: Site }) {
  const p = site.car.provenance;
  const chips: string[] = [];
  if (car.specs.serviceHistory) chips.push(p.chips.serviceHistory);
  if (car.specs.accidentFree) chips.push(p.chips.accidentFree);
  chips.push(fill(p.chips.specification, { spec: p.chips.specNames[car.specs.specification] }));
  if (car.specs.warrantyUntil) chips.push(fill(p.chips.warranty, { date: car.specs.warrantyUntil }));
  if (car.specs.keys === 2) chips.push(p.chips.keys);
  chips.push(p.chips.report);

  return (
    <Section id="provenance" className="prov">
      <MediaBg desktop="cd-prov-01" overlay="x" position="70% 50%" positionMobile="60% 50%" />
      <div className="wrap prov__inner">
        <Reveal>
          <Eyebrow>{p.eyebrow}</Eyebrow>
        </Reveal>
        <SplitText tag="h2" className="t-display-l mt-6" text={p.title} />
        <Reveal stagger as="ul" className="prov__chips">
          {chips.map((c) => (
            <li key={c} className="prov__chip glass">
              {c}
            </li>
          ))}
        </Reveal>
        <Reveal delay={240} className="mt-8">
          <Button variant="text" href={buildWhatsAppUrl(car.locale, { car })}>
            {p.link}
          </Button>
        </Reveal>
      </div>
    </Section>
  );
}
