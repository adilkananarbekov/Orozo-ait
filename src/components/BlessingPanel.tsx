type BlessingPanelProps = {
  index: number
  title: string
  preview: string
  imageSrc: string
  onOpen: (index: number) => void
}

export function BlessingPanel({ index, title, preview, imageSrc, onOpen }: BlessingPanelProps) {
  return (
    <div className="group relative" data-blessing-card>
      <div
        className="absolute -inset-px rounded-2xl bg-gradient-to-br from-gold/50 via-mauve/25 to-amber/30 opacity-60 blur-[1px] transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100"
        aria-hidden
      />
      <button
        type="button"
        onClick={() => onOpen(index)}
        className="relative flex w-full max-w-full overflow-hidden rounded-2xl border border-gold/20 bg-[#12081c]/95 text-left shadow-[0_12px_40px_rgba(0,0,0,0.45)] outline-none ring-0 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/45 hover:shadow-[0_20px_56px_rgba(230,192,104,0.18)] focus-visible:border-gold/60 focus-visible:ring-2 focus-visible:ring-gold/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f0618] active:translate-y-0 md:min-h-[112px]"
      >
        <div
          className="w-1 shrink-0 self-stretch bg-gradient-to-b from-gold via-amber to-mauve/90 sm:hidden"
          aria-hidden
        />
        <div className="relative hidden w-[min(32%,140px)] shrink-0 sm:block">
          <img
            src={imageSrc}
            alt=""
            className="h-full min-h-[112px] w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-[#12081c]/40 to-[#12081c]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gold/15"
            aria-hidden
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-center gap-1 px-4 py-4 sm:pl-5 sm:pr-3 md:flex-row md:items-center md:gap-6 md:py-4 md:pl-6">
          <div className="min-w-0 flex-1">
            <p className="font-body text-[10px] font-semibold uppercase tracking-[0.35em] text-gold/75">
              Бата
            </p>
            <h3 className="mt-1 font-display text-lg font-bold leading-tight text-parchment md:text-xl">
              {title}
            </h3>
            <p className="mt-1.5 line-clamp-2 font-body text-sm leading-snug text-cream/65 md:text-[0.9375rem]">
              {preview}
            </p>
          </div>

          <div className="mt-3 flex shrink-0 items-center justify-between gap-3 md:mt-0 md:flex-col md:items-end">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/35 bg-gradient-to-r from-gold/15 to-amber/10 px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-gold transition group-hover:border-gold/55 group-hover:from-gold/25 group-hover:to-amber/20 md:px-5 md:py-3 md:text-sm">
              <span>Окуу</span>
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden
              >
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        </div>

      </button>
    </div>
  )
}
