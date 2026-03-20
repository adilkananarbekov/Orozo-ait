import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import { gsap } from '../utils/gsapContext'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const SHOTS = [
  {
    src: '/assets/story/shot-01.jpg',
    label: 'Майрамдык учур',
    title: 'Милдеттүү түнөн кийинки таң',
    subtitle: 'Биринчи нур — колуңуз менен сезе ала турган ыраазычылык сыяктуу.',
  },
  {
    src: '/assets/story/shot-02.jpg',
    label: 'Майрамдык учур',
    title: 'Сүйүү менен жайылган дасторкон',
    subtitle: 'Ар бир табакта үйдө күткөн адамдарыңыз эскерилет.',
  },
  {
    src: '/assets/story/shot-03.jpg',
    label: 'Майрамдык учур',
    title: 'Эшиктин алдындагы тынчтык',
    subtitle: 'Эшик ачык болсун: тынчтык жана жакшы кабарлар кирсин.',
  },
  {
    src: '/assets/story/shot-04.jpg',
    label: 'Майрамдык учур',
    title: 'Шаардын үстүндөгү кечки алтын',
    subtitle: 'Асман эстетет: нур ар дайым кайтып келет.',
  },
  {
    src: '/assets/story/shot-05.jpg',
    label: 'Майрамдык учур',
    title: 'Дуба менен нанды кармаган колдор',
    subtitle: 'Бул кыймылда — элдин бүткүл тарыхы жатат.',
  },
  {
    src: '/assets/story/shot-06.jpg',
    label: 'Майрамдык учур',
    title: 'Коридордогу балдардын күлкүсү',
    subtitle: 'Жер жүзүндөгү эң таза музыка ушул.',
  },
] as const

export function StoryReel() {
  const section = useRef<HTMLElement>(null)
  const reduced = usePrefersReducedMotion()

  useGSAP(
    () => {
      const root = section.current
      if (!root) return

      const blocks = root.querySelectorAll<HTMLElement>('[data-story-block]')

      blocks.forEach((block, i) => {
        const img = block.querySelector<HTMLElement>('[data-story-img]')
        const panel = block.querySelector<HTMLElement>('[data-story-panel]')
        const inner = block.querySelector<HTMLElement>('[data-story-inner]')
        const fromRight = i % 2 === 1
        const hidden = fromRight ? 'inset(0% 0% 0% 100%)' : 'inset(0% 100% 0% 0%)'

        if (!reduced) {
          gsap.set(block, { clipPath: hidden })
          gsap.to(block, {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.35,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: block,
              start: 'top 86%',
              toggleActions: 'play none none none',
            },
          })
          if (inner) {
            gsap.fromTo(
              inner,
              { scale: 0.94, filter: 'brightness(0.75) blur(4px)' },
              {
                scale: 1,
                filter: 'brightness(1) blur(0px)',
                duration: 1.35,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: block,
                  start: 'top 86%',
                  toggleActions: 'play none none none',
                },
              },
            )
          }
        } else {
          gsap.set(block, { clearProps: 'clipPath' })
        }

        if (img && !reduced) {
          gsap.to(img, {
            yPercent: -18,
            scale: 1.04,
            ease: 'none',
            scrollTrigger: {
              trigger: block,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.65,
            },
          })
        }

        if (panel && !reduced) {
          gsap.from(panel, {
            y: 48,
            opacity: 0,
            filter: 'blur(8px)',
            duration: 1.05,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: block,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          })
        }
      })
    },
    { scope: section, dependencies: [reduced] },
  )

  return (
    <section
      ref={section}
      id="story"
      className="relative z-10 bg-void px-5 py-24 md:px-10 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(155,126,212,0.08),transparent_50%)]" />
      <div className="relative mx-auto max-w-6xl">
        <header className="mb-16 max-w-2xl">
          <p className="font-body text-xs uppercase tracking-[0.4em] text-gold/80">Майрамдын көз ирмеми</p>
          <h2 className="mt-4 font-display text-3xl font-semibold text-parchment md:text-4xl">
            Орозо Айтка арналган алты жылуу кадр
          </h2>
        </header>
        <div className="flex flex-col gap-20 md:gap-28">
          {SHOTS.map((shot) => (
            <article
              key={shot.src}
              data-story-block
              className="relative overflow-hidden rounded-3xl border border-gold/10 bg-[#1a0d28]/50 shadow-bloom"
            >
              <div
                data-story-inner
                className="relative aspect-[16/10] w-full overflow-hidden will-change-transform md:aspect-[21/9]"
              >
                <img
                  data-story-img
                  src={shot.src}
                  alt=""
                  className="h-[118%] w-full -translate-y-[4%] object-cover will-change-transform"
                  loading="lazy"
                  decoding="async"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-night/85 via-[#2a1450]/35 to-amber/10 mix-blend-multiply"
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night via-transparent to-transparent opacity-90"
                  aria-hidden
                />
              </div>
              <div
                data-story-panel
                className="relative z-[1] -mt-2 px-6 pb-10 pt-6 md:absolute md:bottom-0 md:left-0 md:mt-0 md:max-w-xl md:pb-12 md:pl-10"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-gold/90">
                  {shot.label}
                </p>
                <h3 className="mt-3 font-display text-2xl font-semibold text-parchment md:text-3xl">
                  {shot.title}
                </h3>
                <p className="mt-2 max-w-md font-body text-sm text-cream/75 md:text-base">
                  {shot.subtitle}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
