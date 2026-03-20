import { useGSAP } from '@gsap/react'
import { lazy, Suspense, useEffect, useMemo, useRef } from 'react'
import { FestiveDecor } from '../components/FestiveDecor'
import { MagneticButton } from '../components/MagneticButton'
import { Orb } from '../components/Orb'
import { useBoot } from '../context/BootContext'
import { useGyro } from '../hooks/useGyro'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { gsap } from '../utils/gsapContext'

const MoonScene = lazy(async () => {
  const m = await import('../components/MoonScene')
  return { default: m.MoonScene }
})

const PILLS = ['Чырак нуру', 'Тынч түн', 'Үй-бүлө', 'Ырайым']

const TITLE_CHARS = 'ОРОЗО АЙТ'.split('')

export function Hero() {
  const root = useRef<HTMLElement>(null)
  const conicRef = useRef<HTMLDivElement>(null)
  const ringPulseRef = useRef<HTMLDivElement>(null)
  const moodboardRef = useRef<HTMLDivElement>(null)
  const moonColRef = useRef<HTMLDivElement>(null)
  const titleWrapRef = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const { introEnabled, markWebGLReady } = useBoot()

  const coarsePointer = useMemo(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(pointer: coarse)').matches
  }, [])

  const gyro = useGyro(coarsePointer && !reduced)

  useEffect(() => {
    const section = root.current
    const mb = moodboardRef.current
    if (!section || !mb || reduced || !introEnabled) return

    const xTo = gsap.quickTo(mb, 'xPercent', { duration: 1.05, ease: 'power3.out' })
    const yTo = gsap.quickTo(mb, 'yPercent', { duration: 1.05, ease: 'power3.out' })

    const onMove = (e: PointerEvent) => {
      const r = section.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width - 0.5
      const py = (e.clientY - r.top) / r.height - 0.5
      xTo(px * 5.5)
      yTo(py * 4.5)
    }
    const onLeave = () => {
      xTo(0)
      yTo(0)
    }
    section.addEventListener('pointermove', onMove)
    section.addEventListener('pointerleave', onLeave)
    return () => {
      section.removeEventListener('pointermove', onMove)
      section.removeEventListener('pointerleave', onLeave)
    }
  }, [introEnabled, reduced])

  useGSAP(
    () => {
      const scope = root.current
      if (!scope || !introEnabled) return

      const moodboard = moodboardRef.current
      const moonCol = moonColRef.current
      const conic = conicRef.current
      const ringPulse = ringPulseRef.current
      const titleWrap = titleWrapRef.current
      const kicker = scope.querySelector<HTMLElement>('.hero-kicker')
      const chars = scope.querySelectorAll<HTMLElement>('.hero-char')
      const greeting = scope.querySelector<HTMLElement>('.hero-greeting')
      const body = scope.querySelector<HTMLElement>('.hero-body')
      const cta = scope.querySelector<HTMLElement>('.hero-cta-wrap')
      const pills = scope.querySelectorAll<HTMLElement>('.hero-pill')
      const chev = scope.querySelector<HTMLElement>('.hero-chev')
      const scrollHint = scope.querySelector<HTMLElement>('.hero-scroll-hint')
      const atmospheres = scope.querySelectorAll<HTMLElement>('.hero-atmosphere')
      const lanterns = scope.querySelectorAll<HTMLElement>('.festive-lantern')

      if (reduced) {
        gsap.set(moodboard, { opacity: 0.34, scale: 1, xPercent: 0, yPercent: 0 })
        gsap.set(atmospheres, { opacity: 1, y: 0 })
        gsap.set(moonCol, { opacity: 1, y: 0, scale: 1, filter: 'none' })
        gsap.set(conic, { opacity: 0.88, scale: 1, rotation: 0 })
        gsap.set(ringPulse, { opacity: 0.45, scale: 1 })
        gsap.set(kicker, { opacity: 1, y: 0, letterSpacing: '0.5em', filter: 'none' })
        gsap.set(chars, { opacity: 1, y: 0, rotateX: 0 })
        gsap.set(greeting, { opacity: 1, x: 0, skewX: 0, filter: 'none' })
        gsap.set(body, { opacity: 1, y: 0, filter: 'none' })
        gsap.set(cta, { opacity: 1, scale: 1, y: 0 })
        gsap.set(pills, { opacity: 1, y: 0, scale: 1 })
        gsap.set(scrollHint, { opacity: 1, y: 0 })
        return
      }

      gsap.set(moodboard, { opacity: 0, scale: 1.14 })
      gsap.set(atmospheres, { opacity: 0, y: 32 })
      gsap.set(moonCol, { opacity: 0, y: 72, scale: 0.88, filter: 'blur(22px)' })
      gsap.set(conic, { opacity: 0, scale: 0.82, rotation: -40 })
      gsap.set(ringPulse, { opacity: 0, scale: 0.75 })
      gsap.set(kicker, { opacity: 0, y: 28, letterSpacing: '0.8em', filter: 'blur(10px)' })
      gsap.set(chars, { opacity: 0, y: 110, rotateX: -58, transformOrigin: '50% 100%' })
      gsap.set(greeting, { opacity: 0, x: -48, skewX: -6, filter: 'blur(12px)' })
      gsap.set(body, { opacity: 0, y: 36, filter: 'blur(8px)' })
      gsap.set(cta, { opacity: 0, scale: 0.88, y: 20 })
      gsap.set(pills, { opacity: 0, y: 22, scale: 0.92 })
      gsap.set(scrollHint, { opacity: 0, y: 12 })

      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

      tl.to(moodboard, { opacity: 0.34, scale: 1, duration: 2.4, ease: 'power2.inOut' }, 0)
        .to(
          atmospheres,
          { opacity: 1, y: 0, duration: 1.35, stagger: 0.12, ease: 'power3.out' },
          0.15,
        )
        .to(conic, { opacity: 0.9, scale: 1, rotation: 0, duration: 1.5, ease: 'power3.out' }, 0.28)
        .to(ringPulse, { opacity: 0.55, scale: 1, duration: 1.25, ease: 'power2.out' }, 0.4)
        .to(moonCol, { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 1.55 }, 0.38)
        .to(kicker, { opacity: 1, y: 0, letterSpacing: '0.5em', filter: 'blur(0px)', duration: 1 }, 0.52)
        .to(
          chars,
          { opacity: 1, y: 0, rotateX: 0, duration: 0.85, stagger: { each: 0.045, from: 'start' } },
          0.62,
        )
        .to(greeting, { opacity: 1, x: 0, skewX: 0, filter: 'blur(0px)', duration: 1.05 }, 0.95)
        .to(body, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.1 }, 1.12)
        .to(cta, { opacity: 1, scale: 1, y: 0, duration: 0.85, ease: 'back.out(1.35)' }, 1.32)
        .to(pills, { opacity: 1, y: 0, scale: 1, duration: 0.65, stagger: 0.07, ease: 'back.out(1.2)' }, 1.42)
        .to(scrollHint, { opacity: 1, y: 0, duration: 0.75 }, 1.58)

      if (conic) {
        gsap.to(conic, {
          rotation: 360,
          duration: 100,
          repeat: -1,
          ease: 'none',
          delay: 0,
        })
      }

      if (ringPulse) {
        gsap.to(ringPulse, {
          scale: 1.06,
          opacity: 0.35,
          duration: 2.8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      }

      if (titleWrap) {
        gsap.to(titleWrap, {
          scale: 1.02,
          duration: 3.4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      }

      if (chev) {
        gsap.to(chev, {
          y: 10,
          duration: 1.35,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 1.9,
        })
      }

      if (lanterns.length) {
        gsap.to(lanterns, {
          rotation: 4,
          transformOrigin: '50% 0%',
          duration: 2.4 + Math.random() * 0.4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          stagger: { each: 0.35, from: 'random' },
        })
      }

      if (conic) {
        gsap.to(conic, {
          filter: 'hue-rotate(35deg) saturate(1.2)',
          ease: 'none',
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.15,
          },
        })
      }

    },
    { scope: root, dependencies: [reduced, introEnabled] },
  )

  return (
    <section
      ref={root}
      className="relative flex min-h-[100dvh] flex-col overflow-hidden bg-festive-sky"
      style={{ perspective: '1400px' }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          ref={moodboardRef}
          className="hero-moodboard absolute inset-[-6%] bg-cover bg-center bg-no-repeat opacity-[0.34] mix-blend-soft-light will-change-transform"
          style={{ backgroundImage: 'url(/assets/moodboard-hero.png)' }}
          aria-hidden
        />
      </div>
      <div
        className="hero-atmosphere pointer-events-none absolute inset-0 bg-gradient-to-b from-[#2d1a4a]/80 via-transparent to-[#0a0514]/95"
        aria-hidden
      />
      <div
        className="hero-atmosphere pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_15%,rgba(255,214,120,0.2),transparent_45%),radial-gradient(ellipse_at_85%_25%,rgba(180,120,200,0.15),transparent_40%),radial-gradient(ellipse_at_50%_80%,rgba(232,152,60,0.08),transparent_55%)]"
        aria-hidden
      />
      <div
        className="hero-atmosphere pointer-events-none absolute inset-0 bg-hero-radial opacity-95 mix-blend-screen"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.28] mix-blend-overlay lux-noise"
        aria-hidden
      />

      <FestiveDecor className="z-[1]" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 gap-10 px-5 pb-16 pt-10 md:grid-cols-2 md:items-center md:gap-6 md:px-10 md:pb-24 md:pt-14">
        <div className="order-2 flex flex-col justify-center md:order-1" style={{ transformStyle: 'preserve-3d' }}>
          <p className="hero-kicker font-body text-xs uppercase text-gold/90 md:text-sm">
            Ыйык майрам
          </p>
          <div
            ref={titleWrapRef}
            className="hero-title-wrap mt-5 inline-block origin-center will-change-transform"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <h1 className="font-display text-[clamp(2.4rem,9vw,4.8rem)] font-bold leading-[0.98] tracking-tight [text-shadow:0_2px_24px_rgba(0,0,0,0.5),0_0_48px_rgba(230,192,104,0.3)]">
              {TITLE_CHARS.map((ch, i) => (
                <span
                  key={`${ch}-${i}`}
                  className="hero-char inline-block bg-gradient-to-b from-[#fff6d4] via-gold to-[#c9952c] bg-clip-text text-transparent"
                  style={{ whiteSpace: ch === ' ' ? 'pre' : undefined }}
                >
                  {ch === ' ' ? '\u00A0' : ch}
                </span>
              ))}
            </h1>
          </div>
          <p className="hero-greeting mt-4 font-display text-xl font-bold text-gold md:text-2xl [text-shadow:0_0_28px_rgba(230,192,104,0.45)]">
            Майрамыңыз кут болсун!
          </p>
          <p className="hero-body mt-5 max-w-lg font-body text-base leading-relaxed text-cream/85 md:text-lg">
            Улуу Орозо Айт майрамы менен куттуктайбыз! Бул күн үйүңүзгө тынчтык, жүрөгүңүзгө нур, жакындарыңызга
            кубаныч алып келсин.
          </p>
          <div className="hero-cta-wrap mt-8 flex flex-wrap items-center gap-4">
            <MagneticButton href="#story">Майрамдык кадрлар</MagneticButton>
          </div>
          <ul className="mt-10 flex flex-wrap gap-2 md:gap-3">
            {PILLS.map((label) => (
              <li key={label}>
                <span className="hero-pill inline-flex items-center rounded-full border border-gold/25 bg-[#1f1028]/60 px-3 py-1.5 text-[11px] font-medium uppercase tracking-widest text-parchment/90 shadow-gold backdrop-blur-md md:text-xs">
                  <span className="mr-2 h-1.5 w-1.5 rounded-full bg-gradient-to-r from-amber to-gold shadow-[0_0_10px_rgba(240,168,80,0.9)]" />
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div
          ref={moonColRef}
          className="relative order-1 flex min-h-[min(58vh,520px)] items-center justify-center md:order-2 md:min-h-[min(72vh,640px)]"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div
            ref={ringPulseRef}
            className="pointer-events-none absolute inset-[10%] rounded-full md:inset-[12%]"
            style={{
              background:
                'radial-gradient(circle, transparent 52%, rgba(230,192,104,0.22) 56%, transparent 62%)',
              filter: 'blur(4px)',
            }}
            aria-hidden
          />
          <div
            ref={conicRef}
            className="absolute inset-[4%] rounded-full opacity-[0.88] will-change-transform md:inset-[6%]"
            style={{
              background:
                'conic-gradient(from 0deg, rgba(230,192,104,0.65), rgba(200,120,180,0.45), rgba(232,152,60,0.5), rgba(255,236,180,0.55), rgba(155,126,212,0.4), rgba(230,192,104,0.65))',
              maskImage: 'radial-gradient(circle, transparent 58%, black 62%)',
              WebkitMaskImage: 'radial-gradient(circle, transparent 58%, black 62%)',
              filter: 'drop-shadow(0 0 32px rgba(230, 192, 104, 0.35))',
            }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_40%_28%,rgba(255,240,200,0.35),transparent_45%)] opacity-80 mix-blend-screen"
            aria-hidden
          />
          <Suspense
            fallback={
              <div
                className="relative z-[1] flex h-full min-h-[280px] w-full max-w-[min(100%,420px)] items-center justify-center rounded-full bg-[#1a0d28]/50 md:max-w-[min(100%,480px)]"
                aria-hidden
              />
            }
          >
            <MoonScene
              className="relative z-[1] h-full w-full max-w-[min(100%,420px)] md:max-w-[min(100%,480px)]"
              gyro={{ x: gyro.x, y: gyro.y }}
              reducedMotion={reduced}
              onSceneReady={markWebGLReady}
            />
          </Suspense>
        </div>
      </div>

      <Orb
        className="left-[6%] top-[18%] h-36 w-36 bg-gradient-to-br from-amber/35 to-transparent"
        delay={0}
      />
      <Orb
        className="right-[10%] top-[28%] h-28 w-28 bg-gradient-to-br from-mauve/40 to-transparent"
        delay={0.4}
      />
      <Orb
        className="bottom-[22%] left-[14%] h-24 w-24 bg-gradient-to-br from-gold/30 to-transparent"
        delay={0.8}
      />
      <Orb
        className="right-[18%] bottom-[16%] h-32 w-32 bg-gradient-to-br from-coral/25 to-transparent"
        delay={1.1}
      />
      <Orb
        className="left-1/2 top-[8%] h-20 w-20 -translate-x-1/2 bg-gradient-to-br from-parchment/25 to-transparent"
        delay={1.5}
      />

      <div className="hero-scroll-hint pointer-events-none absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-gold/60">
        <span className="text-[10px] uppercase tracking-[0.45em]">Төмөн жылдырыңыз</span>
        <svg
          className="hero-chev h-6 w-6 text-gold"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden
        >
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  )
}
