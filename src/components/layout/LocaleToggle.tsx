"use client";

import { Link, usePathname, type Locale } from "@/lib/i18n";

/** docs/02 §2.9: the language toggle is a text link (عربي / EN) to the same route in the other locale. */
export function LocaleToggle({ locale, label, className }: { locale: Locale; label: string; className?: string }) {
  const pathname = usePathname();
  const other: Locale = locale === "ar" ? "en" : "ar";
  return (
    <Link href={pathname} locale={other} className={className} lang={other}>
      {label}
    </Link>
  );
}
