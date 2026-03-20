import { Marquee } from '../components/Marquee'

export function WonderMarquee() {
  return (
    <section
      aria-label="Жүгүртүлгөн майрамдык сап"
      className="relative z-20 overflow-hidden border-y border-gold/10 bg-[#100718]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,224,145,0.08),transparent_52%),linear-gradient(180deg,rgba(26,13,40,0.96)_0%,rgba(16,7,24,0.98)_100%)]" />
      <div className="relative mx-auto max-w-6xl px-5 py-8 md:px-10 md:py-10">
        <div className="mb-4 flex flex-col gap-3 md:mb-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.45em] text-gold/75 md:text-[11px]">
              Майрамдын деми
            </p>
            <p className="mt-2 max-w-2xl text-sm text-cream/68 md:text-[0.95rem]">
              Hero сахнасындагы жарык маанайды кийинки блокторго улап турган майрамдык сап.
            </p>
          </div>
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-gold/15 bg-[#1a0d28]/70 px-4 py-2 text-[10px] uppercase tracking-[0.34em] text-[#f4deb0]/75">
            <span className="h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_10px_rgba(230,192,104,0.85)]" />
            Жандуу өтмөк
          </div>
        </div>
        <Marquee />
      </div>
    </section>
  )
}
