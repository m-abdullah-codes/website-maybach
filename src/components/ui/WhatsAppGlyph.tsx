/** The WhatsApp glyph, drawn thin to match Lucide (docs/02 §3.2). Kept apart from the icon map so client bundles stay small. */
export function WhatsAppGlyph({ className, size = 20 }: { className?: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {/* The bubble: a circle of r 8.5 centred on 12,12, with the tail hanging to the lower start side. */}
      <path d="M12 3.5a8.5 8.5 0 0 0-7.3 12.9L3.5 20.5l4.2-1.2A8.5 8.5 0 1 0 12 3.5Z" />
      {/* The handset was drawn low and to the right: its box measures 8.837-17.800 x 7.900-17.163,
          a centre of 13.32,12.53 against the bubble's 12,12. This puts it back on the middle. */}
      <g transform="translate(-1.32 -0.53)">
        <path d="M9.2 8.4c.2-.4.5-.5.8-.5h.5c.2 0 .4.2.5.4l.7 1.7c.1.2 0 .4-.1.6l-.5.6c-.1.2-.1.4 0 .5a6 6 0 0 0 2.9 2.9c.2.1.4.1.5 0l.6-.5c.2-.1.4-.2.6-.1l1.7.7c.2.1.4.3.4.5v.5c0 .3-.1.6-.4.8-.6.5-1.4.8-2.3.6a8.6 8.6 0 0 1-6.2-6.2c-.2-.9.1-1.7.6-2.3Z" />
      </g>
    </svg>
  );
}
