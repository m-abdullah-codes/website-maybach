import Image from "next/image";
import type { Car, Site } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { img } from "@/lib/images";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { MediaBg } from "@/components/ui/MediaBg";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { EnquiryForm } from "@/components/forms/EnquiryForm";

/** docs/02 M3: SH-09 start-side at 4:5 on desktop (a small tile above on mobile); the form end-side on BR-03. */
export function VisitForm({ site, locale, cars }: { site: Site; locale: Locale; cars: Car[] }) {
  const f = site.visit.form;
  const coffee = img("sh-09");
  const door = img("ct-door-01");
  const options = cars.map((c) => ({ value: `${c.year} ${c.marque} ${c.title}`, label: `${c.marque} ${c.title}` }));
  return (
    <section id="form" className="vform">
      <MediaBg desktop="br-03-d" mobile="br-03-m" overlay="none" className="vform__texture" />
      <div className="wrap vform__inner">
        <Reveal className="vform__image">
          <Image
            src={coffee.src}
            alt=""
            role="presentation"
            width={coffee.width}
            height={coffee.height}
            sizes="(min-width: 1024px) 40vw, 160px"
            placeholder="blur"
            blurDataURL={coffee.blurDataURL}
            className="vform__img"
          />
        </Reveal>
        <div className="vform__panel">
          <Reveal as="h2" lines className="t-display-l">
            {f.title}
          </Reveal>
          <Reveal delay={160} className="mt-10">
            <EnquiryForm
              labels={site.form}
              locale={locale}
              cars={options}
              page="/visit"
              successImage={{ src: door.src, width: door.width, height: door.height, blurDataURL: door.blurDataURL }}
            />
          </Reveal>
          <Reveal delay={240} className="vform__aside">
            <p className="t-small text-silver">{f.aside}</p>
            <Button variant="text" href={buildWhatsAppUrl(locale)} className="mt-3">
              {site.common.messageConcierge}
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
