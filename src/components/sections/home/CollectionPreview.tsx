import type { HomePreviewRow, Site } from "@/lib/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { PhotographRow } from "@/components/cars/PhotographRow";
import { CardPair } from "@/components/cars/CardPair";
import { SplitText } from "@/components/ui/SplitText";

/**
 * docs/02 H3: eyebrow and headline, then Photograph → Cards → Photograph so the visitor has seen all
 * three treatments and the temperature rhythm (cool, neutral + warm, neutral) before the Collection page.
 */
export function CollectionPreview({ site, rows }: { site: Site; rows: HomePreviewRow[] }) {
  const c = site.home.collection;
  return (
    <section id="collection-preview" className="preview">
      <div className="wrap preview__head">
        <div>
          <Reveal>
            <Eyebrow>{c.eyebrow}</Eyebrow>
          </Reveal>
          <SplitText tag="h2" className="t-display-l mt-6" text={c.title} />
        </div>
        <Reveal delay={160} className="preview__link">
          <Button variant="text" href="/collection">
            {site.common.seeEveryCar}
          </Button>
        </Reveal>
      </div>
      <div className="preview__rows">
        {rows.map((row, i) =>
          row.treatment === "cards" ? (
            <CardPair key={i} cars={row.cars} site={site} className="preview__cards" />
          ) : (
            <PhotographRow key={row.cars[0].slug} car={row.cars[0]} site={site} side={row.copySide ?? "start"} />
          ),
        )}
      </div>
      <div className="wrap preview__foot md:hidden">
        <Button variant="text" href="/collection">
          {site.common.seeEveryCar}
        </Button>
      </div>
    </section>
  );
}
