import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import { MagneticButton } from '../components/MagneticButton'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { gsap } from '../utils/gsapContext'

export function FinalBlessing() {
  const root = useRef<HTMLElement>(null)
  const reduced = usePrefersReducedMotion()

  useGSAP(
    () => {
      const section = root.current
      const panel = section?.querySelector<HTMLElement>('[data-final-panel]')
      const lines = section?.querySelectorAll<HTMLElement>('[data-final-line]')
      if (!panel || reduced) return

      gsap.from(panel, {
        y: 52,
        opacity: 0,
        scale: 0.97,
        filter: 'blur(10px)',
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: panel,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      })

      if (lines?.length) {
        gsap.from(lines, {
          y: 18,
          opacity: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: panel,
            start: 'top 78%',
            toggleActions: 'play none none none',
          },
        })
      }
    },
    { scope: root, dependencies: [reduced] },
  )

  return (
    <section
      ref={root}
      className="relative z-10 overflow-hidden px-5 py-28 md:px-10 md:py-36"
      aria-labelledby="final-blessing-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_80%,rgba(230,192,104,0.08),transparent_50%),radial-gradient(ellipse_at_18%_24%,rgba(200,155,191,0.08),transparent_30%)]" />
      <div className="relative z-30 mx-auto max-w-5xl">
        <div
          data-final-panel
          className="relative overflow-hidden rounded-[2.1rem] border border-gold/15 bg-[#1a0e26]/82 p-8 shadow-bloom md:p-14 md:backdrop-blur-2xl"
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
          <div
            className="pointer-events-none absolute left-8 right-8 top-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent"
            aria-hidden
          />

          <div className="relative grid gap-8 md:grid-cols-[minmax(0,1fr)_15rem] md:items-end">
            <div>
              <p
                data-final-line
                className="font-body text-xs uppercase tracking-[0.45em] text-gold/85"
              >
                Акыркы тилек
              </p>
              <h2
                id="final-blessing-heading"
                data-final-line
                className="mt-5 font-display text-3xl font-semibold leading-tight text-parchment md:text-[2.8rem]"
              >
                Нооруздун жылуулугу жүрөгүңүздө кала берсин
              </h2>
              <p
                data-final-line
                className="mt-6 max-w-3xl font-body text-base leading-8 text-cream/80 md:text-xl"
              >
                Бул Нооруз үйүңүздөргө жаңы дем, жүрөгүңүздөргө жарык үмүт, дасторконуңуздарга мол береке
                жана ар бир жаңы күнүңүздөргө көктөмдөй жандуу маанай алып келсин. Жакындарыңыздар менен
                бөлүшкөн ар бир кубаныч эстеликке айланып, бул майрам узак жылуулук болуп сакталсын.
              </p>
              <p
                data-final-line
                className="mt-8 font-display text-sm font-semibold uppercase tracking-[0.35em] text-gold/95"
              >
                Нооруз кут болсун!
              </p>
            </div>

            <div className="flex flex-col gap-3 md:items-end">
              <div data-final-line>
                <MagneticButton href="#top" className="w-full justify-center md:w-auto">
                  Башына кайтуу
                </MagneticButton>
              </div>
              <div data-final-line>
                <MagneticButton href="#story" className="w-full justify-center md:w-auto">
                  Ирмемдерди көрүү
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
