import Image from "next/image";
import type { Site } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { img } from "@/lib/images";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { Section } from "@/components/ui/Section";
import { MediaBg } from "@/components/ui/MediaBg";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Emblem } from "@/components/brand/Emblem";

/**
 * docs/02 M2: HM-MAP behind; the map tile start-side with one platinum pin shaped like the emblem; a glass
 * panel end-side with the details. Mobile: the panel, then the map at 60vw. The tile links to directions;
 * a live dark-styled embed can replace it once the address and a map key exist.
 */
export function Details({ site, locale }: { site: Site; locale: Locale }) {
  const d = site.visit.details;
  const map = img("hm-map-d");
  const phoneHref = `tel:${site.settings.phone.replace(/[^\d+]/g, "")}`;
  const mailHref = `mailto:${site.settings.email}`;
  return (
    <Section id="details" className="vdetails">
      <MediaBg desktop="hm-map-d" mobile="hm-map-m" overlay="y" />
      <div className="wrap vdetails__inner">
        <Reveal delay={120} className="vmap-wrap">
          <a href={site.settings.mapsUrl} target="_blank" rel="noopener noreferrer" className="vmap" aria-label={site.common.getDirections}>
            <Image src={map.src} alt="" role="presentation" fill sizes="(min-width: 1024px) 50vw, 100vw" placeholder="blur" blurDataURL={map.blurDataURL} className="vmap__img" />
            <span className="vmap__pin" aria-hidden="true">
              <Emblem className="vmap__emblem" />
              <span className="vmap__dot" />
            </span>
          </a>
        </Reveal>
        <Reveal className="vdetails__panel glass">
          <dl className="vdetails__list">
            <div>
              <dt className="t-spec-label">{d.addressLabel}</dt>
              <dd className="t-body-m mt-1">{site.footer.address}</dd>
            </div>
            <div>
              <dt className="t-spec-label">{d.hoursLabel}</dt>
              <dd className="t-body-m mt-1">{site.footer.hours}</dd>
            </div>
            <div>
              <dt className="t-spec-label">{d.phoneLabel}</dt>
              <dd className="t-body-m mt-1">
                <a href={phoneHref} dir="ltr" className="vdetails__link">
                  {site.footer.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="t-spec-label">{d.emailLabel}</dt>
              <dd className="t-body-m mt-1">
                <a href={mailHref} dir="ltr" className="vdetails__link">
                  {d.email}
                </a>
              </dd>
            </div>
          </dl>
          <p className="t-small mt-6 text-pewter">{d.parking}</p>
          <div className="vdetails__actions">
            <Button variant="text" href={site.settings.mapsUrl}>
              {site.common.getDirections}
            </Button>
            <Button variant="whatsapp" href={buildWhatsAppUrl(locale)}>
              {site.common.messageConcierge}
            </Button>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
