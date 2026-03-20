import { useGSAP } from '@gsap/react'
import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { BlessingPanel } from '../components/BlessingPanel'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { gsap } from '../utils/gsapContext'
import { publicPath } from '../utils/publicPath'

const BLESSINGS = [
  {
    title: 'Тынчтык',
    preview: 'Үйүңөргө ынтымак менен тынчтык кеңейсин.',
    image: publicPath('assets/blessings/blessing-01.jpg'),
    verse:
      'Үйүңөргө салам ортосун кирсин — тынчтык, кеңдик жана меймандосуктук сыяктуу эшик ачык тургандай ыраазылык болсун. Ар бир кадамыңыз жакындарыңызга жакшылык алып келсин, өлкөңүзгө тынчтык орносун.',
  },
  {
    title: 'Нур',
    preview: 'Жүрөгүңүздөгү жарык эч качан өчпөсүн.',
    image: publicPath('assets/blessings/blessing-02.jpg'),
    verse:
      'Жүрөгүңүздөгү нур эч качан өчпөсүн — аны менен үй-бүлөңүз жылысын, жолуңузду издегендер табышсын. Майрам түндөгү фонарь сыяктуу, сиздин жакшылыгыңыз башкаларга жол көрсөтсүн.',
  },
  {
    title: 'Кечирим',
    preview: 'Өткөн күн оордон эмес, жеңилик менен жаңылансын.',
    image: publicPath('assets/blessings/blessing-03.jpg'),
    verse:
      'Өткөнүңүз жеңил болсун — майрам түндөгү көрдүн жумшак чөбү сыяктуу, аны шыпырууга болот. Кечирим жаңы бет ачат; жүрөгүңүз жеңил болуп, келечекке кең ачылсын.',
  },
  {
    title: 'Урук',
    preview: 'Тамырыңыз сизди эстеп, бутактары нурга умтулсун.',
    image: publicPath('assets/blessings/blessing-04.jpg'),
    verse:
      'Уругуңуздун тамыры сизди эстеп турсун, бутактары нурга умтулсун. Сиз — асман менен жердин ортосундагы жылуу байланыссыз; ар бир муунга мурас катары мейирим калтырыңыз.',
  },
  {
    title: 'Ден соолук',
    preview: 'Ар бир демиңиз — Алла Тааланын белеги болсун.',
    image: publicPath('assets/blessings/blessing-05.jpg'),
    verse:
      'Денеңиз намазга чыдай берсин, жаныңыз ыраазычылык менен толсун. Ар бир дем алыш — жеңил белек болсун; оору-сыркоодон Алла Таала сактап, узак өмүр жана күч берип турсун.',
  },
  {
    title: 'Береке',
    preview: 'Толук дасторкон жана ачык колдордун берекеси көп болсун.',
    image: publicPath('assets/blessings/blessing-06.jpg'),
    verse:
      'Дасторконуңуз толук болсун, колдоруңуз ачык болсун; ошондо асман айткан баракат көбөйөт. Бөлүшкөн нан эки эсе таттуу болот — майрамыңыз ушул мейирим менен улансын.',
  },
] as const

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
        className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050208]/88 p-4 backdrop-blur-[10px] sm:p-6"
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
          className="relative w-full max-w-lg overflow-hidden rounded-[1.35rem] border border-gold/25 bg-[#100818] shadow-[0_0_0_1px_rgba(230,192,104,0.08),0_32px_80px_rgba(0,0,0,0.65)]"
        >
          <div
            className="h-1.5 w-full bg-gradient-to-r from-transparent via-gold/90 to-transparent opacity-90"
            aria-hidden
          />
          <div className="relative">
            <div className="relative h-44 overflow-hidden sm:h-52">
              <img
                src={active.image}
                alt=""
                className="h-full w-full object-cover"
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
                Бата — толук текст
              </p>
              <h3
                id={titleId}
                className="mt-2 font-display text-2xl font-bold text-parchment sm:text-[1.65rem]"
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
      className="relative z-10 bg-gradient-to-b from-void via-[#160a24] to-void px-5 py-24 md:px-10 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,rgba(230,192,104,0.06),transparent_55%)]" />
      <div className="relative mx-auto max-w-3xl">
        <header className="mb-10 text-center sm:mb-12 sm:text-left">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.45em] text-gold/80">
            Бата жана тилектер
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-parchment sm:text-4xl">
            Орозо айт майрамына арналган баталар
          </h2>
          <p className="mx-auto mt-3 max-w-xl font-body text-sm leading-relaxed text-cream/70 sm:mx-0 sm:text-base">
            Алты жылуу тилек. Төмөнкү баскычтардын бирин баасып, толук батаны окуңуз.
          </p>
        </header>
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
      </div>
      {modal}
    </section>
  )
}
