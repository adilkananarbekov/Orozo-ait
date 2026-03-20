import { useGSAP } from '@gsap/react'
import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { BlessingPanel } from '../components/BlessingPanel'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { gsap } from '../utils/gsapContext'
import { publicPath } from '../utils/publicPath'

const CARD_ART = [
  publicPath('assets/blessings/card-blessing-1.png'),
  publicPath('assets/blessings/card-blessing-2.png'),
] as const

const BLESSINGS = [
  {
    title: 'Жаңылануу',
    preview: 'Үйүңүздөргө жаңы дем жана жеңил маанай кирсин.',
    image: CARD_ART[0],
    verse:
      'Нооруз менен кошо босогоңуздардан жаңы дем аттап кирсин. Ар бир бөлмөдө жеңил сүйлөшүү, жарык маанай жана келечекке болгон ишеним көбөйсүн. Көктөмдөгү алгачкы жашылдык сыяктуу, ар бир күнүңүздөр жаңыланып, үй-бүлөңүздөргө узакка сакталчу тынч жылуулук алып келсин.',
  },
  {
    title: 'Береке',
    preview: 'Дасторконуңуздар дайым токчулукка толсун.',
    image: CARD_ART[1],
    verse:
      'Нооруз дасторконуңуздарга береке, колуңуздарга кеңдик жана үйүңүздөргө токчулук алып келсин. Ар бир бөлүшүлгөн даам, ар бир айтылган жылуу сөз жакшылыктын үрөнүн көбөйтүп турсун. Сүмөлөктөй жай бышкан сабыр жана ток нан сыяктуу бекем ырыс үйүңүздөрдөн кетпесин.',
  },
  {
    title: 'Ырыс',
    preview: 'Эмгегиңиз жемишин берип, жолуңуз ачык болсун.',
    image: CARD_ART[0],
    verse:
      'Жазгы талаага себилген үрөндөй, ар бир эмгегиңиз өз убагында жемишин берсин. Бүгүнкү аракет эртеңки берекеге айланып, жолуңуздарда жакшы адамдар жана туура мүмкүнчүлүктөр көбөйсүн. Нооруз жаңы жылдын башаты болуп, ишиңиздерге ырыс жана так багыт алып келсин.',
  },
  {
    title: 'Ден соолук',
    preview: 'Көктөмдөй сергек күч ар дайым жаныңызда болсун.',
    image: CARD_ART[1],
    verse:
      'Денеңиздерге жеңилдик, көңүлүңүздөргө сергек дем жана жан дүйнөңүздөргө күч берилсин. Көктөмдүн шамалындай таза аба, күндүн жылуусундай кубат күн сайын сиздер менен болсун. Ар бир жаңы таң кубаныч менен башталып, ден соолук сиздердин эң туруктуу байлыгыңыздарга айлансын.',
  },
  {
    title: 'Ынтымак',
    preview: 'Жакындарыңыз менен болгон байланыш дагы да бекем болсун.',
    image: CARD_ART[0],
    verse:
      'Нооруздун күнү үй-бүлөңүздөрдү бир дасторкондун айланасына дагы да жакын чогултсун. Ар бир сүйлөшүүдө урмат, ар бир жолугушууда мээрим жана ар бир чечимде биримдик болсун. Үйүңүздөрдөгү ынтымак көктөмдөй жайылып, ар бир мүчөгө күч жана ишеним берип турсун.',
  },
  {
    title: 'Кубаныч',
    preview: 'Ар бир жаңы күн үйүңүзгө күлкү жана жарык алып келсин.',
    image: CARD_ART[1],
    verse:
      'Бул Нооруз үйүңүздөргө шаң, балдарыңыздарга күлкү жана жүрөгүңүздөргө жарык маанай алып келсин. Ар бир майрамдык ирмем узакка эстеле турган жылуу эскерүүгө айланып калсын. Жаңы жылдын ар бир күнү кубанычты көбөйтүп, кайгыны жеңилдеткен жакшы кабарларга толо берсин.',
  },
] as const

const CHIPS = ['6 тилек', 'Толук ачылуучу текст', 'Жылуу кыргызча маанай']

export function BlessingsGrid() {
  const root = useRef<HTMLElement>(null)
  const reduced = usePrefersReducedMotion()
  const [open, setOpen] = useState<number | null>(null)
  const titleId = useId()
  const closeRef = useRef<HTMLButtonElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const section = root.current
      if (!section) return
      const cards = section.querySelectorAll<HTMLElement>('[data-blessing-card]')
      if (!cards.length || reduced) return
      gsap.from(cards, {
        y: 40,
        opacity: 0,
        filter: 'blur(8px)',
        duration: 0.85,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 78%',
          toggleActions: 'play none none none',
        },
      })
    },
    { scope: root, dependencies: [reduced] },
  )

  useGSAP(
    () => {
      if (open == null) return
      const ov = overlayRef.current
      const dlg = dialogRef.current
      if (!ov || !dlg || reduced) return
      gsap.fromTo(ov, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: 'power2.out' })
      gsap.fromTo(
        dlg,
        { opacity: 0, y: 36, scale: 0.96, filter: 'blur(10px)' },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.65,
          ease: 'power4.out',
        },
      )
    },
    { dependencies: [open, reduced] },
  )

  const onKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') setOpen(null)
  }, [])

  useEffect(() => {
    if (open == null) return
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    const t = window.setTimeout(() => closeRef.current?.focus(), 50)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      window.clearTimeout(t)
    }
  }, [onKey, open])

  const active = open != null ? BLESSINGS[open] : null

  const modal =
    active &&
    createPortal(
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050208]/88 p-4 sm:p-6 md:backdrop-blur-[10px]"
        role="presentation"
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) setOpen(null)
        }}
      >
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="relative w-full max-w-xl overflow-hidden rounded-[1.45rem] border border-gold/25 bg-[#100818] shadow-[0_0_0_1px_rgba(230,192,104,0.08),0_32px_80px_rgba(0,0,0,0.65)]"
        >
          <div
            className="h-1.5 w-full bg-gradient-to-r from-transparent via-gold/90 to-transparent opacity-90"
            aria-hidden
          />
          <div className="relative">
            <div className="relative flex h-44 items-center justify-center overflow-hidden bg-[radial-gradient(circle,rgba(255,221,148,0.18)_0%,rgba(255,221,148,0.06)_34%,transparent_72%)] sm:h-56">
              <img
                src={active.image}
                alt=""
                className="h-[132%] w-auto max-w-[88%] object-contain mix-blend-screen drop-shadow-[0_0_36px_rgba(255,223,147,0.32)]"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#100818] via-[#100818]/50 to-transparent"
                aria-hidden
              />
              <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 bg-[#100818]/70 text-gold backdrop-blur-sm">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
                  <path d="M12 2C8 6 6 9 6 12c0 3.3 2 6 6 8 4-2 6-4.7 6-8 0-3-2-6-6-10z" opacity="0.9" />
                </svg>
              </div>
            </div>
            <div className="border-t border-gold/10 px-6 pb-6 pt-5 sm:px-8 sm:pb-8 sm:pt-6">
              <p className="font-body text-[10px] font-semibold uppercase tracking-[0.4em] text-gold/70">
                Нооруз тилеги — толук текст
              </p>
              <h3
                id={titleId}
                className="mt-2 font-display text-2xl font-bold text-parchment sm:text-[1.75rem]"
              >
                {active.title}
              </h3>
              <p className="mt-4 font-body text-[0.95rem] leading-relaxed text-cream/88 sm:text-base">
                {active.verse}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  ref={closeRef}
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-gold/50 bg-gradient-to-b from-gold/20 to-amber/10 px-6 py-2.5 text-sm font-bold text-parchment shadow-gold transition hover:border-gold/70 hover:from-gold/30 hover:to-amber/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                  onClick={() => setOpen(null)}
                >
                  <svg
                    className="h-4 w-4 opacity-90"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden
                  >
                    <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                  </svg>
                  Жабуу
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>,
      document.body,
    )

  return (
    <section
      ref={root}
      id="blessings"
      className="relative z-10 overflow-hidden bg-gradient-to-b from-[#13091d] via-[#160a24] to-[#0e0717] px-5 py-24 md:px-10 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,rgba(230,192,104,0.06),transparent_55%),radial-gradient(ellipse_at_80%_20%,rgba(200,155,191,0.06),transparent_32%)]" />
      <div className="relative z-30 mx-auto max-w-6xl">
        <header className="mb-12 grid gap-6 lg:grid-cols-[minmax(0,1fr)_19rem] lg:items-end">
          <div className="max-w-3xl">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.45em] text-gold/80">
              Тилектер жыйнагы
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-parchment sm:text-4xl md:text-5xl">
              Ноорузга арналган жылуу тилектер
            </h2>
            <p className="mt-4 max-w-2xl font-body text-sm leading-7 text-cream/72 sm:text-base">
              Бул бөлүмдө нооруздук куттуктоону тереңдеткен алты кыска тилек бар. Каалаганыңызды ачып,
              толук текстин окуп же жакындарыңызга жылуу сөз катары колдонсоңуз болот.
            </p>
          </div>
          <div className="rounded-[1.8rem] border border-gold/15 bg-[#171022]/78 p-5 shadow-bloom md:backdrop-blur-xl">
            <p className="text-[10px] uppercase tracking-[0.42em] text-gold/75">Blessing set</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {CHIPS.map((chip) => (
                <span
                  key={chip}
                  className="inline-flex items-center rounded-full border border-gold/15 bg-[#22132f]/90 px-3 py-1.5 text-[10px] uppercase tracking-[0.28em] text-[#f6dfab]"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </header>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18.5rem] lg:items-start">
          <div className="flex flex-col gap-4 sm:gap-5">
            {BLESSINGS.map((b, i) => (
              <BlessingPanel
                key={b.title}
                index={i}
                title={b.title}
                preview={b.preview}
                imageSrc={b.image}
                onOpen={setOpen}
              />
            ))}
          </div>

          <aside className="rounded-[1.85rem] border border-gold/15 bg-[#12081f]/78 p-6 shadow-bloom lg:sticky lg:top-24 lg:backdrop-blur-xl">
            <p className="text-[10px] uppercase tracking-[0.42em] text-gold/75">Жылуу эскертүү</p>
            <h3 className="mt-3 font-display text-2xl font-semibold text-parchment">
              Тилек бөлүшүлгөндө майрам дагы да жылыйт
            </h3>
            <p className="mt-4 text-sm leading-7 text-cream/72">
              Бул жерден өзүңүзгө жаккан тилекти тандап, сайттагы жалпы нооруздук куттуктоонун
              маанайына жараша текст катары колдонсоңуз болот.
            </p>
            <div className="mt-6 space-y-3">
              <div className="rounded-2xl border border-gold/12 bg-[#1b1029]/78 p-4">
                <p className="text-[10px] uppercase tracking-[0.34em] text-gold/78">1-кадам</p>
                <p className="mt-2 text-sm text-cream/76">Карточканы басып, толук тилекти ачыңыз.</p>
              </div>
              <div className="rounded-2xl border border-gold/12 bg-[#1b1029]/78 p-4">
                <p className="text-[10px] uppercase tracking-[0.34em] text-gold/78">2-кадам</p>
                <p className="mt-2 text-sm text-cream/76">Кайсы маанай сайтыңызга туура келерин тандаңыз.</p>
              </div>
              <div className="rounded-2xl border border-gold/12 bg-[#1b1029]/78 p-4">
                <p className="text-[10px] uppercase tracking-[0.34em] text-gold/78">3-кадам</p>
                <p className="mt-2 text-sm text-cream/76">Финалдык куттуктоого ушул жылуулукту улаңыз.</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
      {modal}
    </section>
  )
}
