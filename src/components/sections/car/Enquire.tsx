import Image from "next/image";
import type { Car, Site } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { img } from "@/lib/images";
import { MediaBg } from "@/components/ui/MediaBg";
import { Reveal } from "@/components/ui/Reveal";
import { EnquiryForm } from "@/components/forms/EnquiryForm";

/**
 * docs/02 D7: CD-KEY-01 start-side (4:3) with the form end-side; on mobile the photograph sits blurred
 * behind the glass form. The title follows availability.
 */
export function Enquire({ car, site, locale }: { car: Car; site: Site; locale: Locale }) {
  const e = site.car.enquire;
  const title = car.availability === "sold" ? e.titleSold : car.availability === "reserved" ? e.titleReserved : e.titleAvailable;
  const key = img("cd-key-01");
  const door = img("ct-door-01");
  const labels = { ...site.form, success: site.form.successCar };
  return (
    <section id="enquire" className="enquire">
      <MediaBg desktop="cd-key-01" overlay="y" className="enquire__bg md:hidden" imgClassName="enquire__blur" />
      <div className="wrap enquire__inner">
        <Reveal className="enquire__image">
          <Image
            src={key.src}
            alt=""
            role="presentation"
            width={key.width}
            height={key.height}
            sizes="(min-width: 1024px) 45vw, 100vw"
            placeholder="blur"
            blurDataURL={key.blurDataURL}
            className="enquire__img"
          />
        </Reveal>
        <div className="enquire__panel">
          <Reveal as="h2" lines className="t-display-l">
            {title}
          </Reveal>
          <Reveal as="p" delay={120} className="t-body-l measure mt-4 text-silver">
            {e.sub}
          </Reveal>
          <Reveal delay={200} className="mt-10">
            <EnquiryForm
              labels={labels}
              locale={locale}
              car={`${car.year} ${car.marque} ${car.title}`}
              page={`/collection/${car.slug}`}
              successImage={{ src: door.src, width: door.width, height: door.height, blurDataURL: door.blurDataURL }}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
