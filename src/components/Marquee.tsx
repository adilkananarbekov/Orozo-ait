const SEGMENT =
  'АЙТ МААРЕК БОЛСУН • ОРОЗО АЙТ • БЕРЕКЕ • НУР • ДУБА • ЫНТЫМАК • ТЫНЧТЫК • '

export function Marquee() {
  const text = SEGMENT.repeat(5)

  return (
    <div className="relative overflow-hidden rounded-[1.75rem] border border-gold/15 bg-[#1a0d28]/78 px-0 py-4 shadow-[0_18px_60px_rgba(0,0,0,0.3)] md:py-5 md:backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,230,162,0.09),transparent_42%),linear-gradient(90deg,rgba(232,152,60,0.08),transparent_24%,transparent_76%,rgba(200,155,191,0.08))]" />
      <div
        className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/80 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-0 right-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#12081f] via-[#12081f]/85 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#12081f] via-[#12081f]/85 to-transparent"
        aria-hidden
      />

      <div className="relative flex flex-col gap-2">
        <div className="flex w-max animate-marquee font-display text-sm font-semibold uppercase tracking-[0.38em] text-gold/95 md:text-base [text-shadow:0_0_20px_rgba(230,192,104,0.35)]">
          <span className="whitespace-nowrap px-4">{text}</span>
          <span className="whitespace-nowrap px-4" aria-hidden>
            {text}
          </span>
        </div>
        <div
          className="hidden w-max animate-marquee font-display text-[11px] font-semibold uppercase tracking-[0.42em] text-[#f4deb0]/40 md:flex md:text-xs"
          style={{ animationDirection: 'reverse', animationDuration: '36s' }}
          aria-hidden
        >
          <span className="whitespace-nowrap px-4">{text}</span>
          <span className="whitespace-nowrap px-4">{text}</span>
        </div>
      </div>
    </div>
  )
}
