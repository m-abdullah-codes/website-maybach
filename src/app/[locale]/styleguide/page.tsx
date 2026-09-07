import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { isLocale, Link } from "@/lib/i18n";
import { getSite, getCar, getCars } from "@/lib/content";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { Section } from "@/components/ui/Section";
import { MediaBg } from "@/components/ui/MediaBg";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { LiquidBadge, EnvCaption } from "@/components/ui/LiquidBadge";
import { SpecChip } from "@/components/ui/SpecChip";
import { GiantWord } from "@/components/ui/GiantWord";
import { Scene } from "@/components/cars/Scene";
import { Emblem } from "@/components/brand/Emblem";
import { Wordmark } from "@/components/brand/Wordmark";

export const metadata: Metadata = { title: "Styleguide", robots: { index: false, follow: false } };

// Dev-only route (docs/03 §9 Phase 0). Production builds 404 unless STYLEGUIDE=1 (used for QA shots).
const ENABLED = process.env.NODE_ENV !== "production" || process.env.STYLEGUIDE === "1";

const TOKENS: Array<[name: string, hex: string, use: string]> = [
  ["obsidian", "#070708", "Page background, hero base, footer"],
  ["carbon", "#0E0E10", "Section alternation, sticky bars, nav on scroll"],
  ["graphite", "#16161A", "Inputs, chips at rest, dividers on black"],
  ["smoke", "#222226", "Hover surfaces, skeleton loaders"],
  ["ash", "#3A3A40", "Hairline borders on dark, disabled"],
  ["platinum", "#ECEAE4", "Primary text, headlines, giant word, primary button"],
  ["silver", "#B9B6AE", "Secondary text, body on dark, eyebrows"],
  ["pewter", "#7E7B73", "Tertiary text, captions, placeholders"],
  ["ok", "#8FA895", "Available badge dot only"],
  ["muted", "#A77E7E", "Sold badge dot and form errors"],
];
const LIGHT_TOKENS: Array<[name: string, hex: string, use: string]> = [
  ["salon", "#D8D5CF", "Light room background"],
  ["salon-2", "#C9C6BF", "Floor / lower gradient"],
  ["ink", "#0E0E10", "Text and giant word on the light room"],
  ["ink-2", "#55545A", "Secondary text on the light room"],
];
const RADII: Array<[string, string]> = [
  ["chip / input", "8px"],
  ["glass card", "20px"],
  ["large panel", "28px"],
  ["pill / button", "999px"],
  ["image in card", "12px"],
];
const MOTION: Array<[string, string, string]> = [
  ["--ease-out", "cubic-bezier(.16, 1, .3, 1)", "Reveals, entrances"],
  ["--ease-inout", "cubic-bezier(.65, 0, .35, 1)", "Page transitions, slides"],
  ["--d-fast", "320ms", "Hover, chips, toggles"],
  ["--d-base", "800ms", "Fade-ups, glass appear"],
  ["--d-slow", "1200ms", "Hero, giant word, car settle"],
];
const SPACING = [4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160, 200, 240];

// Dev annotations are English and read left to right on both locales.
function Note({ children }: { children: ReactNode }) {
  return (
    <p dir="ltr" className="t-small font-mono text-pewter">
      {children}
    </p>
  );
}

function Block({ title, note, children }: { title: string; note?: string; children: ReactNode }) {
  return (
    <section className="wrap section-pad hairline-top">
      <div className="mb-10 flex flex-wrap items-baseline justify-between gap-4">
        <h2 className="t-display-l">{title}</h2>
        {note && <Note>{note}</Note>}
      </div>
      {children}
    </section>
  );
}

export default async function Styleguide({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale) || !ENABLED) notFound();
  setRequestLocale(locale);

  const site = getSite(locale);
  const cars = getCars(locale);
  const cul = getCar("rolls-royce-cullinan", locale)!;
  const scl = getCar("mercedes-benz-s-class", locale)!;
  const other = locale === "ar" ? "en" : "ar";
  const whyCards = site.home.why.cards;

  const typeSamples: Array<{ cls: string; label: string; spec: string; sample: string }> = [
    { cls: "t-display-xl", label: "Display XL / h1", spec: "Bodoni Moda 400 · 72/44 · 1.02 · -0.01em", sample: site.home.hero.title },
    { cls: "t-display-l", label: "Display L / h2", spec: "Bodoni Moda 400 · 52/34 · 1.08 · -0.005em", sample: site.home.collection.title },
    { cls: "t-display-m", label: "Display M / h3", spec: "Bodoni Moda 400 · 34/26 · 1.15 · 0", sample: whyCards[0].title },
    { cls: "t-statement", label: "Statement", spec: "Bodoni Moda 400 italic · 96/40 · 1.0 · -0.01em", sample: site.home.statement.line },
    { cls: "t-body-l text-silver measure", label: "Body L", spec: "Manrope 400 · 19/17 · 1.6 (AR 1.8) · 52ch", sample: site.home.hero.sub },
    { cls: "t-body-m text-silver measure", label: "Body M", spec: "Manrope 400 · 16/15 · 1.6 (AR 1.8)", sample: whyCards[1].body },
    { cls: "t-small text-pewter", label: "Small", spec: "Manrope 400 · 13 · 1.5 (AR 1.7) · 0.01em", sample: site.footer.hours },
    { cls: "t-card-title", label: "Card title", spec: "Bodoni Moda 400 · 30/26 · 1.1", sample: scl.model },
    { cls: "t-button", label: "Button", spec: "Manrope 500 · 14 · 1 · 0.08em uppercase", sample: site.home.hero.primary },
  ];

  return (
    <main className="pb-24">
      {/* Header */}
      <header className="wrap flex items-center justify-between py-6">
        <div className="flex items-center gap-4">
          <Wordmark variant={locale === "ar" ? "arabic" : "latin"} className="h-[22px] w-auto" title={site.brand.wordmark} />
          <Note>styleguide · phase 0</Note>
        </div>
        <Link href="/styleguide" locale={other} className="t-button">
          {site.nav.languageToggle}
        </Link>
      </header>

      {/* Colour */}
      <Block title="Colour" note="docs/02 §2.1 — no colour in the interface">
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {TOKENS.map(([name, hex, use]) => (
            <li key={name} className="rounded-card border border-line p-4">
              <div className="h-16 rounded-img border border-line" style={{ background: `var(--color-${name})` }} />
              <div dir="ltr" className="t-small mt-3">
                --{name} <span className="text-pewter">{hex}</span>
              </div>
              <div className="t-small mt-1 text-pewter">{use}</div>
            </li>
          ))}
        </ul>
        <div className="scene--light mt-6 rounded-card p-4">
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {LIGHT_TOKENS.map(([name, hex, use]) => (
              <li key={name} className="rounded-card border border-line p-4">
                <div className="h-16 rounded-img border border-line" style={{ background: `var(--color-${name})` }} />
                <div dir="ltr" className="t-small mt-3">
                  --{name} <span className="text-pewter">{hex}</span>
                </div>
                <div className="t-small mt-1 text-pewter">{use}</div>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-10">
          <Note>--scene-accent per car · caption dot and View-link underline only, inside that car&apos;s own sections</Note>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3 lg:grid-cols-5">
            {cars.map((c) => (
              <li key={c.slug} className="flex items-center gap-3" style={{ "--scene-accent": c.accent } as React.CSSProperties}>
                <EnvCaption>{c.environment}</EnvCaption>
                <span className="t-small font-mono text-pewter">{c.accent}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          <div>
            <Note>hairline · rgba(255,255,255,.10)</Note>
            <div className="hairline-top mt-3" />
          </div>
          <div>
            <Note>border strong · rgba(255,255,255,.28)</Note>
            <div className="mt-3 border-t border-line-strong" />
          </div>
          <div>
            <Note>platinum hairline 20% (footer top)</Note>
            <div className="mt-3 border-t border-platinum opacity-20" />
          </div>
        </div>
      </Block>

      {/* Type */}
      <Block title="Type" note={locale === "ar" ? "Amiri + IBM Plex Sans Arabic · letter-spacing 0" : "Bodoni Moda + Manrope"}>
        <div className="mb-12">
          <Note>Giant · Bodoni Moda 400 · clamp(120px, 15vw, 300px) / clamp(72px, 22vw, 112px) · .85 · -0.02em</Note>
          <GiantWord text={cul.giantWord ?? cul.model} className="mt-2" />
        </div>
        <div className="mb-12">
          <Note>Eyebrow · Manrope 500 · 12/11 · 0.24em uppercase · emblem + 24px hairline</Note>
          <Eyebrow className="mt-3">{site.home.hero.eyebrow}</Eyebrow>
        </div>
        <ul className="space-y-12">
          {typeSamples.map((t) => (
            <li key={t.label}>
              <Note>
                {t.label} · {t.spec}
              </Note>
              <div className={`${t.cls} mt-2`}>{t.sample}</div>
            </li>
          ))}
          <li>
            <Note>Spec value · Manrope 500 · 22/18 · 1.1 · tabular-nums · label Small pewter 0.12em</Note>
            <div className="mt-3 grid max-w-md grid-cols-3 gap-6">
              <SpecChip label={site.common.specs.engine} value={cul.specs.engine} />
              <SpecChip label={site.common.specs.power} value={cul.specs.power} />
              <SpecChip label={site.common.specs.acceleration} value={cul.specs.acceleration} />
            </div>
          </li>
        </ul>
      </Block>

      {/* Spacing, radius, motion */}
      <Block title="Spacing, radius, motion" note="docs/02 §2.3, §2.6">
        <div className="grid gap-12 lg:grid-cols-3">
          <div>
            <Note>scale · base 4px</Note>
            <ul className="mt-4 space-y-2">
              {SPACING.map((s) => (
                <li key={s} className="flex items-center gap-3">
                  <span className="t-small w-8 text-pewter">{s}</span>
                  <span className="block h-2 bg-ash" style={{ width: s }} />
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Note>radii</Note>
            <ul className="mt-4 flex flex-wrap gap-4">
              {RADII.map(([name, r]) => (
                <li key={name} className="flex flex-col items-center gap-2">
                  <span className="block h-16 w-24 border border-line-strong bg-graphite" style={{ borderRadius: r }} />
                  <span className="t-small text-pewter">
                    {name} · {r}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Note>motion · Lenis lerp .08 · reveals 24px/800ms · headline mask 1200ms</Note>
            <table className="t-small mt-4 w-full">
              <tbody>
                {MOTION.map(([k, v, u]) => (
                  <tr key={k} className="hairline-top">
                    <td className="py-2 pe-3 font-mono">{k}</td>
                    <td className="py-2 pe-3 font-mono text-silver">{v}</td>
                    <td className="py-2 text-pewter">{u}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Block>

      {/* Buttons on photography */}
      <Block title="Buttons" note="docs/02 §3.2 — one primary per section">
        <Section className="min-h-[60svh] rounded-panel" fade={false}>
          <MediaBg desktop="sh-05-d" mobile="sh-05-m" overlay="y" />
          <div className="relative z-10 flex min-h-[60svh] flex-col justify-end gap-4 p-6 md:flex-row md:flex-wrap md:items-center md:p-12">
            <Button href="/collection">{site.home.hero.primary}</Button>
            <Button variant="secondary" href="/visit">
              {site.home.hero.secondary}
            </Button>
            <Button variant="glass" href="/visit" icon>
              {site.home.afterDark.button}
            </Button>
            <Button variant="whatsapp" href={buildWhatsAppUrl(locale)}>
              {site.nav.concierge}
            </Button>
            <Button variant="text" href="/collection">
              {site.common.seeEveryCar}
            </Button>
          </div>
        </Section>
        <Section light className="mt-6 min-h-[40svh] rounded-panel" fade={false}>
          <MediaBg desktop="fsm-bg-d" mobile="fsm-bg-m" overlay="y" />
          <div className="relative z-10 flex min-h-[40svh] flex-col justify-end gap-4 p-6 md:flex-row md:flex-wrap md:items-center md:p-12">
            <Button href="/collection">{site.common.enquire}</Button>
            <Button variant="secondary" href="/visit">
              {site.common.messageConcierge}
            </Button>
            <Button variant="glass" href="/visit" icon>
              {site.common.view}
            </Button>
            <Button variant="text" href="/collection">
              {site.common.view}
            </Button>
            <LiquidBadge state="available" label={site.common.available} />
          </div>
        </Section>
      </Block>

      {/* Glass on photography */}
      <Block title="Glass" note="docs/02 §2.4, §3.4, §3.5, §3.6 — frosted card, liquid badge, spec chip">
        <Section className="rounded-panel" fade={false}>
          <MediaBg desktop="hm-why-bg-d" mobile="hm-why-bg-m" overlay="none" />
          <div className="relative z-10 flex flex-col gap-10 p-6 md:min-h-[90vh] md:flex-row md:items-center md:justify-between md:p-16">
            <div className="max-w-md pt-[38svh] md:pt-0">
              <Eyebrow>{site.home.why.eyebrow}</Eyebrow>
              <h2 className="t-display-l mt-6">{site.home.why.title}</h2>
              <p className="t-body-l mt-4 text-silver">{site.home.why.sub}</p>
            </div>
            <ul className="flex flex-col gap-4">
              {whyCards.map((c) => (
                <GlassCard key={c.title} as="li" icon={c.icon} title={c.title} body={c.body} />
              ))}
            </ul>
          </div>
          <div className="relative z-10 flex flex-wrap items-center gap-4 px-6 pb-8 md:px-16 md:pb-16">
            <LiquidBadge state="available" label={site.common.available} />
            <LiquidBadge state="reserved" label={site.common.reserved} />
            <LiquidBadge state="sold" label={site.common.sold} />
            <LiquidBadge label={String(cul.year)} />
            <span style={{ "--scene-accent": cul.accent } as React.CSSProperties}>
              <EnvCaption>{cul.environment}</EnvCaption>
            </span>
          </div>
        </Section>
      </Block>

      {/* The Scene */}
      <Block title="The Scene" note="docs/02 §3.9 — static composition; motion arrives in Phase 2">
        <Note>{`${cul.code} · cut-a on bg-d (desktop) · cut-b on bg-m (mobile) · word ${cul.giantWord}`}</Note>
      </Block>
      <Scene
        bg={{ d: cul.images.bgD, m: cul.images.bgM }}
        cut={{ a: cul.images.cutA, b: cul.images.cutB }}
        word={cul.giantWord ?? cul.model}
        carAlt={`${cul.year} ${cul.marque} ${cul.model}`}
        side="end"
        height="hero"
        accent={cul.accent}
        eyebrow={<Eyebrow>{`${cul.marque} · ${cul.year}`}</Eyebrow>}
        card={
          <div className="glass p-6 md:w-[420px]">
            <div className="grid grid-cols-[1.5fr_1fr_1fr] gap-4">
              <SpecChip label={site.common.specs.engine} value={cul.specs.engine} />
              <SpecChip label={site.common.specs.power} value={cul.specs.power} />
              <SpecChip label={site.common.specs.acceleration} value={cul.specs.acceleration} />
            </div>
          </div>
        }
      >
        <h2 className="t-display-xl mt-6">{cul.model}</h2>
        <p className="t-body-l measure mt-4 text-silver">{cul.whisper}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
          <Button variant="glass" href={`/collection/${cul.slug}`} icon>
            {site.common.enquire}
          </Button>
          <Button variant="text" href={`/collection/${cul.slug}`}>
            {site.common.view}
          </Button>
        </div>
      </Scene>

      {/* Brand */}
      <Block title="Brand" note="emblem redrawn as strokes from mb-br-02 · wordmark traced from mb-br-01">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <Note>emblem · single stroke · currentColor</Note>
            <Emblem className="mt-4 w-40" />
            <div className="mt-6 flex items-center gap-6">
              <Emblem className="h-[10px] w-auto" />
              <Emblem className="h-4 w-auto" />
              <Emblem className="h-6 w-auto" />
              <Emblem className="h-8 w-auto" />
            </div>
          </div>
          <div>
            <Note>wordmark · 22px nav · 40px footer</Note>
            <Wordmark className="mt-4 h-[22px] w-auto" />
            <Wordmark className="mt-4 h-10 w-auto" />
            <Wordmark variant="arabic" className="mt-6 h-10 w-auto" />
            <Wordmark variant="lockup" className="mt-6 h-32 w-auto" />
          </div>
        </div>
      </Block>
    </main>
  );
}
