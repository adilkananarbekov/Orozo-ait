const SEGMENT =
  'МУБАРАК • ОРОЗО АЙТ • МАЙРАМЫҢЫЗ КУТ БОЛСУН • НУР • ЫРАЙЫМ • ҮЙ-БҮЛӨ • ТЫНЧТЫК • '

export function Marquee() {
  const text = SEGMENT.repeat(4)
  return (
    <div className="relative overflow-hidden border-y border-gold/15 bg-[#1a0d28]/60 py-4 backdrop-blur-sm">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-void to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-void to-transparent"
        aria-hidden
      />
      <div className="flex w-max animate-marquee font-display text-sm font-semibold uppercase tracking-[0.38em] text-gold/95 md:text-base [text-shadow:0_0_20px_rgba(230,192,104,0.35)]">
        <span className="whitespace-nowrap px-4">{text}</span>
        <span className="whitespace-nowrap px-4" aria-hidden>
          {text}
        </span>
      </div>
    </div>
  )
}
