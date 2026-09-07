"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { useStickyConfig } from "@/lib/shell-store";

interface StickyBarProps {
  enquire: string;
  concierge: string;
  enquireHref: string;
  whatsappHref: string;
}

/**
 * docs/02 §3.14: after the hero on every page, 64 px, glass on carbon 90%, hairline top, safe-area
 * padding. Enquire (primary, 60%) + Concierge (WhatsApp, 40%, on the thumb side). Hidden while the menu is open.
 */
export function StickyBar({ enquire, concierge, enquireHref, whatsappHref }: StickyBarProps) {
  const [visible, setVisible] = useState(false);
  const config = useStickyConfig();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className={cn("sticky-bar", visible && "is-visible")} aria-hidden={!visible}>
      <Button href={config.enquireHref ?? enquireHref} icon={false} className="sticky-bar__enquire">
        {config.enquireLabel ?? enquire}
      </Button>
      <Button variant="whatsapp" href={config.whatsappHref ?? whatsappHref} className="sticky-bar__concierge">
        {concierge}
      </Button>
    </div>
  );
}
