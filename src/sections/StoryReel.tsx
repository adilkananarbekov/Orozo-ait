import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { gsap } from '../utils/gsapContext'
import { publicPath } from '../utils/publicPath'

const SHOTS = [
  {
    src: publicPath('assets/story/shot-01.jpg'),
    label: 'Таңкы нур',
    title: 'Орозо Айттын алгачкы таңы',
    subtitle: 'Күн жаңыдан көтөрүлгөндө дуба менен толгон аба бүт айылды жумшак жарыкка бөлөйт.',
  },
  {
    src: publicPath('assets/story/shot-02.jpg'),
    label: 'Дасторкон',
    title: 'Береке менен жайылган дасторкон',
    subtitle: 'Ар бир таттуу, ар бир чыны чай бул күнү бөлүшүүнүн жана ыраазычылыктын белгисине айланат.',
  },
  {
    src: publicPath('assets/story/shot-03.jpg'),
    label: 'Жолугушуу',
    title: 'Эшик алдындагы жылуу салам',
    subtitle: 'Майрамдын эң кооз жери ушул: бири-бирине ачык жүз менен жолуккан адамдар.',
  },
  {
    src: publicPath('assets/story/shot-04.jpg'),
    label: 'Кечки асман',
    title: 'Шаардын үстүндөгү алтын тынчтык',
    subtitle: 'Кечки жарык майрам бүткөндөн кийин да жүрөктө кала турган назик эстеликти жаратат.',
  },
  {
    src: publicPath('assets/story/shot-05.jpg'),
    label: 'Дуба',
    title: 'Колдордогу мээрим жана тилек',
    subtitle: 'Чын дилден айтылган ар бир бата бул күндү дагы да терең жана маңыздуу кылат.',
  },
  {
    src: publicPath('assets/story/shot-06.jpg'),
    label: 'Кубаныч',
    title: 'Балдардын күлкүсү чыккан ирмем',
    subtitle: 'Майрамдын тазалыгы көбүнчө дал ушундай жөнөкөй, бирок абдан жарык көз ирмемдерде жашайт.',
  },
] as const

const STORY_CHIPS = ['6 кадр', 'Жылуу атмосфера', 'Кыргызча куттуктоо']

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
            y: 42,
            x: fromRight ? 26 : -26,
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
      className="relative z-10 overflow-hidden bg-[#0f0718] px-5 py-24 md:px-10 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_18%_14%,rgba(255,225,148,0.08),transparent_35%),radial-gradient(ellipse_at_78%_26%,rgba(200,155,191,0.08),transparent_30%),linear-gradient(180deg,rgba(15,7,24,1)_0%,rgba(13,6,21,0.98)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent" />
      <div className="relative z-30 mx-auto max-w-6xl">
        <header className="mb-16 grid gap-6 md:mb-20 md:grid-cols-[minmax(0,1fr)_18rem] md:items-end">
          <div className="max-w-3xl">
            <p className="font-body text-xs uppercase tracking-[0.4em] text-gold/80">Майрамдын көз ирмеми</p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-parchment md:text-5xl">
              Орозо Айттын жылуулугун алып жүргөн кадрлар
            </h2>
            <p className="mt-4 max-w-2xl font-body text-sm leading-7 text-cream/72 md:text-base">
              Бул бөлүм hero’догу майрамдык атмосфераны чыныгы турмуштун көз ирмемдерине улайт:
              дуба, дасторкон, жолугушуу жана балалык кубаныч.
            </p>
          </div>
          <div className="rounded-[1.8rem] border border-gold/15 bg-[#171022]/72 p-5 shadow-bloom backdrop-blur-xl">
            <p className="text-[10px] uppercase tracking-[0.42em] text-gold/75">Scene note</p>
            <p className="mt-3 text-sm leading-7 text-cream/72">
              Ар бир карточкада сүрөт үстүнөн жумшак cinematic overlay жана кезектешкен маалымат
              панели бар. Бул ритм бетти бир калыпта эмес, жандуу кылат.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {STORY_CHIPS.map((chip) => (
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

        <div className="flex flex-col gap-14 md:gap-20">
          {SHOTS.map((shot, index) => {
            const fromRight = index % 2 === 1

            return (
              <article
                key={shot.src}
                data-story-block
                className="group relative overflow-hidden rounded-[2rem] border border-gold/10 bg-[#171022]/55 shadow-[0_24px_80px_rgba(0,0,0,0.38)]"
              >
                <div
                  data-story-inner
                  className="relative aspect-[16/11] w-full overflow-hidden will-change-transform md:aspect-[21/9]"
                >
                  <img
                    data-story-img
                    src={shot.src}
                    alt=""
                    className="h-[118%] w-full -translate-y-[4%] object-cover will-change-transform transition duration-700 group-hover:scale-[1.03]"
                    loading="lazy"
                    decoding="async"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-night/90 via-[#2a1450]/28 to-amber/10 mix-blend-multiply"
                    aria-hidden
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#08040d] via-[#08040d]/12 to-transparent opacity-95"
                    aria-hidden
                  />
                  <div
                    className={`pointer-events-none absolute inset-y-0 w-[36%] ${
                      fromRight
                        ? 'left-0 bg-gradient-to-r from-[#0a0514]/78 to-transparent'
                        : 'right-0 bg-gradient-to-l from-[#0a0514]/78 to-transparent'
                    }`}
                    aria-hidden
                  />
                </div>

                <div
                  data-story-panel
                  className={`relative z-[1] mx-4 -mt-16 rounded-[1.65rem] border border-gold/15 bg-[#12081f]/78 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.32)] backdrop-blur-xl md:absolute md:bottom-8 md:mx-0 md:max-w-[25rem] md:p-6 ${
                    fromRight ? 'md:right-8' : 'md:left-8'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 bg-[#241332] font-display text-sm font-semibold text-gold">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.38em] text-gold/90">
                      {shot.label}
                    </p>
                  </div>
                  <h3 className="mt-4 font-display text-2xl font-semibold text-parchment md:text-[1.9rem]">
                    {shot.title}
                  </h3>
                  <p className="mt-3 max-w-md font-body text-sm leading-7 text-cream/74 md:text-base">
                    {shot.subtitle}
                  </p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
