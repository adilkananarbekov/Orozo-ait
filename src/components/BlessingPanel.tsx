type BlessingPanelProps = {
  index: number
  title: string
  preview: string
  imageSrc: string
  onOpen: (index: number) => void
}

export function BlessingPanel({ index, title, preview, imageSrc, onOpen }: BlessingPanelProps) {
  const tiltClass =
    index % 2 === 0
      ? 'hover:[transform:perspective(1200px)_rotateX(6deg)_rotateY(-8deg)_translateY(-10px)]'
      : 'hover:[transform:perspective(1200px)_rotateX(6deg)_rotateY(8deg)_translateY(-10px)]'

  const imageClass =
    index % 2 === 0
      ? 'group-hover:translate-x-3 group-hover:-rotate-[7deg]'
      : 'group-hover:translate-x-2 group-hover:rotate-[7deg]'

  const floatDelay = `${index * 0.33}s`

  return (
    <div className="group relative py-4 md:py-5" data-blessing-card>
      <div
        className="absolute inset-2 rounded-[2rem] bg-gradient-to-br from-gold/45 via-mauve/20 to-amber/25 opacity-60 blur-[1px] transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100"
        aria-hidden
      />

      <button
        type="button"
        onClick={() => onOpen(index)}
        className={`relative flex w-full overflow-visible rounded-[1.85rem] border border-gold/20 bg-[#12081c]/94 text-left shadow-[0_14px_42px_rgba(0,0,0,0.4)] outline-none ring-0 transition-all duration-500 hover:border-gold/45 hover:shadow-[0_28px_70px_rgba(230,192,104,0.18)] focus-visible:border-gold/60 focus-visible:ring-2 focus-visible:ring-gold/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f0618] active:translate-y-0 md:min-h-[168px] [transform:perspective(1200px)_rotateX(0deg)_rotateY(0deg)_translateY(0)] ${tiltClass}`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div
          className="pointer-events-none absolute inset-0 rounded-[1.85rem] bg-[radial-gradient(circle_at_100%_0%,rgba(255,223,150,0.08),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.03),transparent_38%,transparent_68%,rgba(255,216,151,0.04))]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 rounded-[1.85rem] ring-1 ring-inset ring-gold/10"
          aria-hidden
        />

        <div className="relative z-10 flex min-w-0 flex-1 flex-col gap-4 px-5 py-5 pr-[6.5rem] sm:pr-[8.25rem] md:px-6 md:py-6 md:pr-[13rem]">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gold/25 bg-[#241332] font-display text-sm font-semibold text-gold">
              {String(index + 1).padStart(2, '0')}
            </span>
            <p className="font-body text-[10px] font-semibold uppercase tracking-[0.35em] text-gold/75">
              Бата
            </p>
          </div>

          <div className="min-w-0">
            <h3 className="font-display text-xl font-bold leading-tight text-parchment md:text-[1.55rem]">
              {title}
            </h3>
            <p className="mt-3 max-w-xl font-body text-sm leading-7 text-cream/70 md:text-[1rem]">
              {preview}
            </p>
          </div>

          <div className="flex items-center justify-between gap-3">
            <span className="hidden text-[10px] uppercase tracking-[0.35em] text-cream/38 sm:inline">
              Басып ачыңыз
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/35 bg-gradient-to-r from-gold/15 to-amber/10 px-4 py-2.5 text-xs font-bold uppercase tracking-[0.24em] text-gold transition group-hover:border-gold/55 group-hover:from-gold/25 group-hover:to-amber/20 md:px-5 md:py-3 md:text-sm">
              <span>Толук окуу</span>
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

        <div
          className="pointer-events-none absolute right-[-0.35rem] top-1/2 z-20 w-[6.25rem] -translate-y-1/2 sm:w-[8rem] md:right-3 md:w-[12rem]"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div
            className="blessing-glow absolute inset-[10%] rounded-full bg-[radial-gradient(circle,rgba(255,218,136,0.38)_0%,rgba(255,218,136,0.16)_35%,transparent_72%)] blur-3xl"
            style={{ animationDelay: floatDelay }}
            aria-hidden
          />
          <div
            className={`relative transition duration-500 ease-out group-hover:-translate-y-3 group-hover:scale-[1.15] ${imageClass}`}
          >
            <img
              src={imageSrc}
              alt=""
              className="blessing-float relative h-auto w-full object-contain mix-blend-screen drop-shadow-[0_0_28px_rgba(255,223,147,0.45)]"
              style={{ animationDelay: floatDelay }}
              loading="lazy"
              decoding="async"
              draggable={false}
            />
          </div>
        </div>
      </button>
    </div>
  )
}
