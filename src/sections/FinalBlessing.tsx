import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import { gsap } from '../utils/gsapContext'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

export function FinalBlessing() {
  const root = useRef<HTMLElement>(null)
  const reduced = usePrefersReducedMotion()

  useGSAP(
    () => {
      const el = root.current?.querySelector<HTMLElement>('[data-final-panel]')
      if (!el || reduced) return
      gsap.from(el, {
        y: 52,
        opacity: 0,
        scale: 0.97,
        filter: 'blur(10px)',
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      })
    },
    { scope: root, dependencies: [reduced] },
  )

  return (
    <section
      ref={root}
      className="relative z-10 px-5 py-28 md:px-10 md:py-36"
      aria-labelledby="final-blessing-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_80%,rgba(230,192,104,0.08),transparent_50%)]" />
      <div className="relative mx-auto max-w-4xl">
        <div
          data-final-panel
          className="relative overflow-hidden rounded-[2rem] border border-gold/15 bg-[#1f1028]/70 p-10 shadow-bloom backdrop-blur-2xl md:p-16"
        >
          <div
            className="pointer-events-none absolute -left-24 top-0 h-64 w-64 rounded-full bg-amber/15 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-mauve/20 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-mauve/10"
            aria-hidden
          />
          <div className="relative">
            <p className="font-body text-xs uppercase tracking-[0.45em] text-gold/85">
              Акыркы тилек
            </p>
            <h2
              id="final-blessing-heading"
              className="mt-5 font-display text-3xl font-semibold leading-tight text-parchment md:text-[2.35rem]"
            >
              Майрамыңыз кут болсун — майрам жүрөгүңүздө кала берсин
            </h2>
            <p className="mt-6 font-body text-lg leading-relaxed text-cream/80 md:text-xl">
              Бул Орозо Айт үйүңүзгө таттуулук менен дубанын жытын, ар бир жаңы күнүңүзгө мээрим, сабыр жана
              нур алып келсин. Сизге жана жакындарыңызга сүйүү жана урмат менен — мубарак болсун!
            </p>
            <p className="mt-8 font-display text-sm font-semibold uppercase tracking-[0.35em] text-gold/95">
              Майрамыңыз менен!
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
