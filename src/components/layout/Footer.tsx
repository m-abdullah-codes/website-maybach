import type { Locale } from "@/lib/i18n";
import { Link } from "@/lib/navigation";
import { getSite } from "@/lib/content";
import { Wordmark } from "@/components/brand/Wordmark";
import { MediaBg } from "@/components/ui/MediaBg";
import { InstagramGlyph, SnapchatGlyph, TikTokGlyph, XGlyph } from "@/components/ui/SocialIcons";
import { LocaleToggle } from "./LocaleToggle";

/**
 * docs/02 §3.15: obsidian; platinum hairline at 20% on top; wordmark (40 px) start, tagline end; four
 * link columns + address/hours/phone; social, language toggle, licence, copyright, studio credit.
 * BR-03 texture at 40%.
 */
export function Footer({ locale }: { locale: Locale }) {
  const site = getSite(locale);
  const columns = [
    { href: "/collection", label: site.footer.columns.collection },
    { href: "/showroom", label: site.footer.columns.showroom },
    { href: "/services", label: site.footer.columns.services },
    { href: "/visit", label: site.footer.columns.visit },
  ];
  const social = [
    { href: site.settings.social.instagram, label: "Instagram", Icon: InstagramGlyph },
    { href: site.settings.social.snapchat, label: "Snapchat", Icon: SnapchatGlyph },
    { href: site.settings.social.tiktok, label: "TikTok", Icon: TikTokGlyph },
    { href: site.settings.social.x, label: "X", Icon: XGlyph },
  ];
  const phoneHref = `tel:${site.settings.phone.replace(/[^\d+]/g, "")}`;

  return (
    <footer className="footer">
      <MediaBg desktop="br-03-d" mobile="br-03-m" overlay="none" className="footer__texture" position="50% 100%" />
      <div className="wrap footer__inner">
        <div className="footer__row1">
          <Link href="/" aria-label={site.brand.name} className="footer__brand">
            <Wordmark variant={locale === "ar" ? "arabic" : "latin"} className="h-10 w-auto" />
          </Link>
          <p className="t-body-l text-silver">{site.brand.tagline}</p>
        </div>

        <div className="footer__row2">
          {columns.map((c) => (
            <div key={c.href}>
              <Link href={c.href} className="footer__link">
                {c.label}
              </Link>
            </div>
          ))}
          <address className="footer__details t-small">
            <p>{site.footer.address}</p>
            <p>{site.footer.hours}</p>
            <p>
              <a href={phoneHref} className="footer__link" dir="ltr">
                {site.footer.phone}
              </a>
            </p>
          </address>
        </div>

        <div className="footer__row3 t-small">
          <ul className="footer__social">
            {social.map(({ href, label, Icon }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="footer__icon">
                  <Icon />
                </a>
              </li>
            ))}
          </ul>
          <LocaleToggle locale={locale} label={site.nav.languageToggle} className="footer__link" />
          <span className="text-pewter">{site.brand.licence}</span>
          <span className="text-pewter">{site.footer.copyright}</span>
          {/* Studio credit, at the client's request. The domain keeps its own direction so it does not
              reorder inside Arabic, the same way the phone number does above. */}
          <span className="text-pewter">
            {site.footer.credit}{" "}
            <a href="https://contoursystems.co" target="_blank" rel="noopener noreferrer" className="footer__link" dir="ltr">
              contoursystems.co
            </a>
          </span>
          <span className="footer__legal text-pewter">
            <span>{site.footer.privacy}</span>
            <span aria-hidden="true"> · </span>
            <span>{site.footer.terms}</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
