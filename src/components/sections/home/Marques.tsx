import type { Site } from "@/lib/content";
import { marqueTiles } from "@/lib/marques";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Marquee } from "@/components/ui/Marquee";
import { Reveal } from "@/components/ui/Reveal";
import { Emblem } from "@/components/brand/Emblem";
import { SplitText } from "@/components/ui/SplitText";

/** docs/02 H5 and S6: carbon ground with the diamond watermark at 3%, eyebrow and one line, the marquee. */
export function Marques({ site, id = "marques" }: { site: Site; id?: string }) {
  const m = site.home.marques;
  return (
    <section id={id} className="marques">
      <Emblem className="marques__watermark" />
      <div className="wrap marques__head">
        <Reveal>
          <Eyebrow>{m.eyebrow}</Eyebrow>
        </Reveal>
        <SplitText tag="h2" className="t-display-l mt-6" text={m.line} />
      </div>
      <Marquee tiles={marqueTiles(m.list)} />
    </section>
  );
}
