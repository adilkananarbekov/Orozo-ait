import { useGSAP } from '@gsap/react'
import { useEffect, useRef, type CSSProperties } from 'react'
import { MagneticButton } from '../components/MagneticButton'
import { useBoot } from '../context/BootContext'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { gsap } from '../utils/gsapContext'
import { publicPath } from '../utils/publicPath'

const TAGS = ['Береке', 'Ынтымак', 'Нур', 'Жакшылык']

const STAR_DOTS = [
  { left: '6%', top: '14%', size: 4, delay: 0.1, duration: 3.1, opacity: 0.85 },
  { left: '13%', top: '24%', size: 3, delay: 0.7, duration: 3.8, opacity: 0.55 },
  { left: '18%', top: '10%', size: 5, delay: 1.6, duration: 2.9, opacity: 0.75 },
  { left: '24%', top: '28%', size: 3, delay: 0.4, duration: 4.1, opacity: 0.65 },
  { left: '33%', top: '16%', size: 4, delay: 1.2, duration: 3.3, opacity: 0.9 },
  { left: '42%', top: '8%', size: 3, delay: 0.9, duration: 3.9, opacity: 0.58 },
  { left: '48%', top: '22%', size: 4, delay: 1.9, duration: 3.5, opacity: 0.7 },
  { left: '56%', top: '13%', size: 3, delay: 0.6, duration: 3.7, opacity: 0.62 },
  { left: '65%', top: '9%', size: 5, delay: 1.1, duration: 3.2, opacity: 0.82 },
  { left: '72%', top: '24%', size: 3, delay: 0.25, duration: 4.4, opacity: 0.5 },
  { left: '80%', top: '15%', size: 4, delay: 1.8, duration: 3.6, opacity: 0.77 },
  { left: '86%', top: '28%', size: 3, delay: 1.3, duration: 4.2, opacity: 0.56 },
  { left: '91%', top: '12%', size: 4, delay: 0.5, duration: 3.4, opacity: 0.74 },
  { left: '77%', top: '37%', size: 3, delay: 1.7, duration: 3.8, opacity: 0.52 },
  { left: '29%', top: '40%', size: 4, delay: 1.35, duration: 4.3, opacity: 0.63 },
  { left: '9%', top: '38%', size: 3, delay: 0.85, duration: 3.5, opacity: 0.61 },
]

const STAR_BURSTS = [
  { left: '12%', top: '19%', size: 24, delay: 0.4, duration: 5.2, opacity: 0.8 },
  { left: '26%', top: '11%', size: 18, delay: 1.4, duration: 4.6, opacity: 0.6 },
  { left: '37%', top: '24%', size: 20, delay: 0.9, duration: 5.8, opacity: 0.75 },
  { left: '59%', top: '17%', size: 16, delay: 1.8, duration: 4.9, opacity: 0.58 },
  { left: '68%', top: '32%', size: 22, delay: 0.7, duration: 5.3, opacity: 0.68 },
  { left: '81%', top: '10%', size: 26, delay: 1.25, duration: 4.8, opacity: 0.82 },
  { left: '88%', top: '25%', size: 18, delay: 0.2, duration: 5.5, opacity: 0.62 },
]

const STAR_PARTICLES = [
  { left: '4%', top: '16%', size: 2, opacity: 0.32, blur: 0, duration: 10.2, delay: 0.15, dx: 10, dy: -18 },
  { left: '9%', top: '28%', size: 3, opacity: 0.22, blur: 1.2, duration: 12.4, delay: 0.45, dx: -8, dy: -26 },
  { left: '16%', top: '12%', size: 2, opacity: 0.28, blur: 0.8, duration: 11.8, delay: 0.95, dx: 7, dy: -22 },
  { left: '22%', top: '34%', size: 4, opacity: 0.18, blur: 1.6, duration: 13.2, delay: 0.2, dx: 12, dy: -30 },
  { left: '27%', top: '18%', size: 2, opacity: 0.26, blur: 0, duration: 10.7, delay: 1.35, dx: -6, dy: -20 },
  { left: '34%', top: '10%', size: 3, opacity: 0.24, blur: 1.4, duration: 12.9, delay: 0.75, dx: 8, dy: -28 },
  { left: '41%', top: '26%', size: 2, opacity: 0.3, blur: 0, duration: 11.1, delay: 1.55, dx: -10, dy: -24 },
  { left: '47%', top: '15%', size: 4, opacity: 0.18, blur: 1.8, duration: 13.8, delay: 0.35, dx: 11, dy: -32 },
  { left: '53%', top: '32%', size: 2, opacity: 0.27, blur: 0.6, duration: 10.9, delay: 1.25, dx: -7, dy: -18 },
  { left: '59%', top: '20%', size: 3, opacity: 0.23, blur: 1.2, duration: 12.1, delay: 0.6, dx: 9, dy: -24 },
  { left: '64%', top: '8%', size: 2, opacity: 0.29, blur: 0, duration: 11.7, delay: 0.9, dx: -11, dy: -22 },
  { left: '69%', top: '28%', size: 4, opacity: 0.16, blur: 1.8, duration: 14.2, delay: 1.7, dx: 6, dy: -30 },
  { left: '74%', top: '14%', size: 2, opacity: 0.31, blur: 0.4, duration: 10.4, delay: 0.25, dx: 10, dy: -20 },
  { left: '79%', top: '36%', size: 3, opacity: 0.2, blur: 1.4, duration: 13.1, delay: 1.1, dx: -8, dy: -28 },
  { left: '85%', top: '18%', size: 2, opacity: 0.26, blur: 0, duration: 11.3, delay: 0.55, dx: 8, dy: -22 },
  { left: '90%', top: '30%', size: 4, opacity: 0.18, blur: 1.6, duration: 12.7, delay: 1.45, dx: -10, dy: -26 },
]

const SCENE_LAMPS = [
  {
    shellClassName: 'absolute left-1/2 top-[1%] z-30 w-[7.75rem] -translate-x-1/2 md:top-0 md:w-[10rem]',
    hangerClassName:
      'absolute left-1/2 -top-[5.6rem] h-[5.6rem] w-px -translate-x-1/2 bg-gradient-to-b from-[#f7dfa0]/90 via-[#f7dfa0]/55 to-transparent',
    anchorClassName:
      'absolute left-1/2 -top-[5.95rem] h-2.5 w-2.5 -translate-x-1/2 rounded-full border border-gold/45 bg-[#1c1228]/90 shadow-[0_0_10px_rgba(247,223,160,0.35)]',
    glowClassName:
      'absolute left-1/2 top-[24%] h-36 w-36 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,204,104,0.55)_0%,rgba(255,204,104,0.18)_35%,transparent_72%)] blur-2xl md:h-48 md:w-48',
    swing: 6,
    y: 0,
    delay: 1.1,
    opacity: 1,
  },
  {
    shellClassName: 'absolute left-[9%] top-[8%] z-30 w-[4.75rem] md:left-[15%] md:top-[11%] md:w-[6.25rem]',
    hangerClassName:
      'absolute left-1/2 -top-[4.5rem] h-[4.5rem] w-px -translate-x-1/2 bg-gradient-to-b from-[#f7dfa0]/90 via-[#f7dfa0]/55 to-transparent',
    anchorClassName:
      'absolute left-1/2 -top-[4.85rem] h-2 w-2 -translate-x-1/2 rounded-full border border-gold/45 bg-[#1c1228]/90 shadow-[0_0_10px_rgba(247,223,160,0.35)]',
    glowClassName:
      'absolute left-1/2 top-[30%] h-20 w-20 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,204,104,0.42)_0%,rgba(255,204,104,0.14)_38%,transparent_74%)] blur-2xl md:h-28 md:w-28',
    swing: -8,
    y: 6,
    delay: 1.35,
    opacity: 0.96,
  },
  {
    shellClassName: 'absolute right-[9%] top-[8%] z-30 w-[4.75rem] md:right-[15%] md:top-[11%] md:w-[6.25rem]',
    hangerClassName:
      'absolute left-1/2 -top-[4.5rem] h-[4.5rem] w-px -translate-x-1/2 bg-gradient-to-b from-[#f7dfa0]/90 via-[#f7dfa0]/55 to-transparent',
    anchorClassName:
      'absolute left-1/2 -top-[4.85rem] h-2 w-2 -translate-x-1/2 rounded-full border border-gold/45 bg-[#1c1228]/90 shadow-[0_0_10px_rgba(247,223,160,0.35)]',
    glowClassName:
      'absolute left-1/2 top-[30%] h-20 w-20 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,204,104,0.42)_0%,rgba(255,204,104,0.14)_38%,transparent_74%)] blur-2xl md:h-28 md:w-28',
    swing: 8,
    y: 2,
    delay: 1.55,
    opacity: 0.96,
  },
] as const

const LAMP_URL = publicPath('assets/scene/lamp.png')
const CRESCENT_URL = publicPath('assets/scene/crescent.png')
const TEXT_URL = publicPath('assets/scene/text-kg.png')
const MOSQUE_DESKTOP_URL = publicPath('assets/scene/mosque-desktop.png')
const MOSQUE_MOBILE_URL = publicPath('assets/scene/mosque-mobile.png')

function dotStyle(star: (typeof STAR_DOTS)[number]): CSSProperties {
  return {
    left: star.left,
    top: star.top,
    width: star.size,
    height: star.size,
    opacity: star.opacity,
    animationDelay: `${star.delay}s`,
    animationDuration: `${star.duration}s`,
  }
}

function burstStyle(star: (typeof STAR_BURSTS)[number]): CSSProperties {
  return {
    left: star.left,
    top: star.top,
    width: star.size,
    height: star.size,
    opacity: star.opacity,
    animationDelay: `${star.delay}s`,
    animationDuration: `${star.duration}s`,
  }
}

function particleStyle(star: (typeof STAR_PARTICLES)[number]): CSSProperties {
  return {
    left: star.left,
    top: star.top,
    width: star.size * 2.1,
    height: star.size * 2.1,
    opacity: star.opacity,
    filter: `blur(${star.blur}px)`,
  }
}

export function Hero() {
  const root = useRef<HTMLElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)
  const haloRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const crescentRef = useRef<HTMLDivElement>(null)
  const mosqueRef = useRef<HTMLDivElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const { introEnabled, markWebGLReady } = useBoot()

  useEffect(() => {
    const id = window.requestAnimationFrame(() => {
      markWebGLReady()
    })
    return () => window.cancelAnimationFrame(id)
  }, [markWebGLReady])

  useEffect(() => {
    const section = root.current
    const scene = sceneRef.current
    if (!section || !scene || reduced || !introEnabled) return

    const xTo = gsap.quickTo(scene, 'x', { duration: 1.1, ease: 'power3.out' })
    const yTo = gsap.quickTo(scene, 'y', { duration: 1.1, ease: 'power3.out' })

    const onMove = (e: PointerEvent) => {
      const r = section.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width - 0.5
      const py = (e.clientY - r.top) / r.height - 0.5
      xTo(px * 18)
      yTo(py * 12)
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
      const halo = haloRef.current
      const text = textRef.current
      const crescent = crescentRef.current
      const mosque = mosqueRef.current
      const copy = copyRef.current
      if (!scope || !halo || !text || !crescent || !mosque || !copy || !introEnabled) return

      const particles = scope.querySelectorAll<HTMLElement>('.hero-particle')
      const starDots = scope.querySelectorAll<HTMLElement>('.hero-star')
      const bursts = scope.querySelectorAll<SVGSVGElement>('.hero-burst')
      const lamps = scope.querySelectorAll<HTMLElement>('.hero-lamp')
      const copyLines = scope.querySelectorAll<HTMLElement>('.hero-copy-line')
      const tags = scope.querySelectorAll<HTMLElement>('.hero-tag')
      const scrollHint = scope.querySelector<HTMLElement>('.hero-scroll-hint')
      const scrollChevron = scope.querySelector<HTMLElement>('.hero-scroll-chevron')

      if (reduced) {
        gsap.set(halo, { opacity: 0.9, scale: 1 })
        gsap.set(lamps, { opacity: 1, y: 0, rotation: 0 })
        gsap.set(particles, { opacity: 0.42, scale: 1, x: 0, y: 0 })
        gsap.set(text, { opacity: 1, y: 0, x: 0, scale: 1, filter: 'none' })
        gsap.set(crescent, { opacity: 1, y: 0, x: 0, scale: 1, filter: 'none' })
        gsap.set(mosque, { opacity: 0.7, y: 0, x: 0, scale: 1, filter: 'none' })
        gsap.set([copy, ...copyLines, ...tags], {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          filter: 'none',
        })
        gsap.set(scrollHint, { opacity: 1, y: 0 })
        return
      }

      gsap.set(particles, { opacity: 0, scale: 0.18, y: 12, x: 0, transformOrigin: '50% 50%' })
      gsap.set(starDots, { opacity: 0, scale: 0.35, transformOrigin: '50% 50%' })
      gsap.set(bursts, { opacity: 0, scale: 0.3, rotation: -22, transformOrigin: '50% 50%' })
      gsap.set(halo, { opacity: 0, scale: 0.82 })
      gsap.set(lamps, { opacity: 0, y: -64, rotation: -5, transformOrigin: '50% 0%' })
      gsap.set(text, { opacity: 0, y: 44, scale: 0.92, filter: 'blur(12px)' })
      gsap.set(crescent, { opacity: 0, x: 0, y: -18, scale: 0.82, filter: 'blur(12px)' })
      gsap.set(mosque, { opacity: 0, y: 52, scale: 0.92, filter: 'blur(18px)' })
      gsap.set(copy, { opacity: 0, y: 42 })
      gsap.set(copyLines, { opacity: 0, y: 24 })
      gsap.set(tags, { opacity: 0, y: 18, scale: 0.92 })
      gsap.set(scrollHint, { opacity: 0, y: 12 })

      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

      tl.to(particles, { opacity: 0.46, scale: 1, y: 0, duration: 0.8, stagger: 0.03 }, 0.02)
        .to(starDots, { opacity: 1, scale: 1, duration: 0.75, stagger: 0.04 }, 0.05)
        .to(bursts, { opacity: 1, scale: 1, rotation: 0, duration: 1.05, stagger: 0.08 }, 0.12)
        .to(halo, { opacity: 0.92, scale: 1, duration: 1.25, ease: 'power2.out' }, 0.2)
        .to(lamps, { opacity: 1, y: 0, rotation: 0, duration: 1.05, stagger: 0.12 }, 0.24)
        .to(crescent, { opacity: 1, x: 0, y: 0, scale: 1, filter: 'blur(0px)', duration: 1.05 }, 0.34)
        .to(text, { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 1.15 }, 0.52)
        .to(mosque, { opacity: 0.7, y: 0, scale: 1, filter: 'blur(0px)', duration: 1.2 }, 0.74)
        .to(copy, { opacity: 1, y: 0, duration: 0.95 }, 0.98)
        .to(copyLines, { opacity: 1, y: 0, duration: 0.8, stagger: 0.08 }, 1.06)
        .to(tags, { opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.07, ease: 'back.out(1.25)' }, 1.2)
        .to(scrollHint, { opacity: 1, y: 0, duration: 0.7 }, 1.42)

      lamps.forEach((lamp, index) => {
        const config = SCENE_LAMPS[index]
        gsap.to(lamp, {
          rotation: config.swing,
          y: config.y,
          duration: 3.6 + index * 0.35,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: config.delay,
        })
      })

      gsap.to(crescent, {
        y: -4,
        rotation: -3,
        duration: 4.9,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      gsap.to(text, {
        y: -8,
        scale: 1.022,
        duration: 4.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      gsap.to(mosque, {
        y: -8,
        duration: 6.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      gsap.to(halo, {
        scale: 1.05,
        opacity: 0.82,
        duration: 4.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      gsap.to(bursts, {
        rotation: '+=18',
        duration: 16,
        repeat: -1,
        ease: 'none',
        stagger: { each: 1.2, from: 'random' },
      })

      particles.forEach((particle, index) => {
        const config = STAR_PARTICLES[index]
        const tl = gsap.timeline({
          repeat: -1,
          delay: 0.9 + config.delay,
          repeatDelay: 0.1 + (index % 4) * 0.08,
        })
        tl.fromTo(
          particle,
          {
            x: 0,
            y: 0,
            scale: 0.14,
            opacity: 0,
          },
          {
            x: config.dx * 0.35,
            y: config.dy * 0.35,
            scale: 1.08 + (index % 3) * 0.12,
            opacity: Math.max(config.opacity * 1.25, 0.3),
            duration: config.duration * 0.45,
            ease: 'sine.out',
          },
        ).to(particle, {
          x: config.dx,
          y: config.dy,
          scale: 2.1 + (index % 3) * 0.22,
          opacity: 0,
          duration: config.duration * 0.55,
          ease: 'sine.in',
        })
      })

      starDots.forEach((star, index) => {
        const config = STAR_DOTS[index]
        gsap.to(star, {
          scale: 1.48,
          x: index % 2 === 0 ? 5 : -5,
          y: index % 3 === 0 ? -8 : 6,
          opacity: Math.max(config.opacity * 0.68, 0.42),
          duration: config.duration,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 1.15 + config.delay,
        })
      })

      bursts.forEach((burst, index) => {
        const config = STAR_BURSTS[index]
        gsap.to(burst, {
          scale: 1.14,
          opacity: Math.max(config.opacity * 0.45, 0.26),
          duration: config.duration + 0.6,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 1.1 + config.delay,
        })
      })

      if (scrollChevron) {
        gsap.to(scrollChevron, {
          y: 10,
          duration: 1.35,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 1.5,
        })
      }

      gsap.to(text, {
        yPercent: -6,
        ease: 'none',
        scrollTrigger: {
          trigger: scope,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })

      gsap.to(mosque, {
        yPercent: 8,
        ease: 'none',
        scrollTrigger: {
          trigger: scope,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })
    },
    { scope: root, dependencies: [introEnabled, reduced] },
  )

  return (
    <section
      ref={root}
      id="top"
      className="relative isolate overflow-hidden bg-festive-sky"
      style={{ perspective: '1400px' }}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,227,167,0.12),transparent_42%),radial-gradient(circle_at_82%_24%,rgba(232,152,60,0.2),transparent_24%),radial-gradient(circle_at_18%_22%,rgba(248,239,212,0.12),transparent_18%),linear-gradient(180deg,rgba(45,26,74,0.95)_0%,rgba(18,8,31,0.98)_62%,rgba(8,3,14,1)_100%)]" />
        <div className="absolute inset-x-[8%] top-[9%] h-56 rounded-full bg-[radial-gradient(circle,rgba(255,228,158,0.2)_0%,rgba(255,228,158,0.06)_28%,transparent_72%)] blur-3xl md:inset-x-[20%]" />
        <div className="absolute -left-12 top-[22%] h-48 w-48 rounded-full bg-[#c89bbf]/10 blur-[110px] md:h-72 md:w-72" />
        <div className="absolute -right-10 top-[14%] h-56 w-56 rounded-full bg-[#e8983c]/12 blur-[120px] md:h-80 md:w-80" />
        <div className="absolute bottom-0 left-0 right-0 h-[42%] bg-gradient-to-t from-[#07030d] via-[#09040f]/90 to-transparent" />
        <div className="absolute bottom-[14%] left-1/2 h-40 w-[92%] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,216,151,0.18)_0%,rgba(232,152,60,0.08)_36%,transparent_72%)] blur-3xl md:w-[72%]" />
        <div className="absolute left-[56%] top-[28%] h-[14rem] w-[14rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(7,3,13,0.88)_0%,rgba(7,3,13,0.62)_34%,rgba(7,3,13,0.2)_60%,transparent_76%)] blur-3xl md:left-[61%] md:top-[31%] md:h-[20rem] md:w-[21rem]" />
        <div className="absolute inset-0 opacity-[0.26] mix-blend-overlay lux-noise" />
      </div>

      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {STAR_PARTICLES.map((star, i) => (
          <span
            key={`particle-${i}`}
            className="hero-particle absolute rounded-full bg-[#fff4cf] shadow-[0_0_20px_rgba(255,231,167,0.62)]"
            style={particleStyle(star)}
          />
        ))}
        {STAR_DOTS.map((star, i) => (
          <span
            key={`dot-${i}`}
            className="hero-star absolute rounded-full bg-[#fff1bf] shadow-[0_0_12px_rgba(255,226,146,0.9)]"
            style={dotStyle(star)}
          />
        ))}
        {STAR_BURSTS.map((star, i) => (
          <svg
            key={`burst-${i}`}
            className="hero-burst absolute overflow-visible text-[#ffe7a2] drop-shadow-[0_0_14px_rgba(255,224,145,0.75)]"
            style={burstStyle(star)}
            viewBox="0 0 32 32"
            fill="none"
          >
            <path
              d="M16 0 L18.8 13.2 L32 16 L18.8 18.8 L16 32 L13.2 18.8 L0 16 L13.2 13.2 Z"
              fill="currentColor"
            />
          </svg>
        ))}
      </div>

      <div className="relative z-30 mx-auto flex min-h-[100dvh] max-w-7xl flex-col px-5 pb-12 pt-5 md:px-10 md:pb-16 md:pt-7">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.45em] text-[#f7dfa0]/60 md:text-[11px]">
          <div className="flex items-center gap-3">
            <div
              ref={crescentRef}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/15 bg-[#160c24]/58 p-1.5 shadow-[0_0_24px_rgba(255,214,120,0.1)] backdrop-blur-md md:h-14 md:w-14 md:p-2"
            >
              <img
                src={CRESCENT_URL}
                alt=""
                className="h-full w-full object-contain mix-blend-screen brightness-[1.04] drop-shadow-[0_0_16px_rgba(255,214,120,0.3)]"
                loading="eager"
                draggable={false}
              />
            </div>
            <span>Кыргызча майрамдык сахна</span>
          </div>
          <span className="hidden sm:inline">Жарык • Береке • Ынтымак</span>
        </div>

        <div className="relative flex-1">
          <div
            ref={sceneRef}
            className="pointer-events-none absolute inset-x-0 top-0 min-h-[34rem] will-change-transform sm:min-h-[36rem] md:inset-0"
          >
            <div className="absolute inset-x-[4%] top-[1.35rem] z-20 h-16 md:inset-x-[10%] md:top-[1rem] md:h-24">
              <svg className="h-full w-full opacity-75" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="hero-wire" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(247,223,160,0.12)" />
                    <stop offset="50%" stopColor="rgba(247,223,160,0.72)" />
                    <stop offset="100%" stopColor="rgba(247,223,160,0.12)" />
                  </linearGradient>
                </defs>
                <path
                  d="M10 34 C 180 8, 340 8, 600 22 C 840 36, 1010 36, 1190 24"
                  fill="none"
                  stroke="url(#hero-wire)"
                  strokeWidth="1.9"
                />
              </svg>
              <div className="absolute left-[16%] top-[18px] h-11 w-px bg-gradient-to-b from-gold/90 via-gold/60 to-transparent md:h-14" />
              <div className="absolute left-1/2 top-[12px] h-9 w-px -translate-x-1/2 bg-gradient-to-b from-gold/90 via-gold/60 to-transparent md:h-12" />
              <div className="absolute right-[16%] top-[18px] h-11 w-px bg-gradient-to-b from-gold/90 via-gold/60 to-transparent md:h-14" />
            </div>

            <div
              ref={haloRef}
              className="absolute left-[60%] top-[14%] h-[22rem] w-[22rem] -translate-x-1/2 rounded-full md:left-[66%] md:top-[16%] md:h-[34rem] md:w-[34rem]"
              style={{
                background:
                  'radial-gradient(circle, rgba(255,228,158,0.22) 0%, rgba(255,228,158,0.1) 26%, rgba(200,155,191,0.08) 44%, transparent 72%)',
                filter: 'blur(22px)',
              }}
              aria-hidden
            />

            {SCENE_LAMPS.map((lamp, index) => (
              <div key={`lamp-${index}`} className={`hero-lamp ${lamp.shellClassName}`}>
                <div className={lamp.anchorClassName} />
                <div className={lamp.hangerClassName} />
                <div className={lamp.glowClassName} />
                <img
                  src={LAMP_URL}
                  alt=""
                  className="relative z-10 h-auto w-full drop-shadow-[0_28px_42px_rgba(255,173,55,0.18)]"
                  style={{ opacity: lamp.opacity }}
                  loading="eager"
                  draggable={false}
                />
              </div>
            ))}

            <div
              ref={textRef}
              className="absolute left-[56%] top-[18%] z-40 w-[12.5rem] -translate-x-1/2 md:left-[61%] md:top-[18%] md:w-[21rem]"
            >
              <img
                src={TEXT_URL}
                alt="Айт Маарек болсун"
                className="h-auto w-full mix-blend-screen contrast-[1.06] brightness-[1.04] drop-shadow-[0_0_38px_rgba(255,218,130,0.34)]"
                loading="eager"
                draggable={false}
              />
            </div>

            <div
              ref={mosqueRef}
              className="absolute bottom-[1.2rem] left-1/2 z-10 w-[21rem] -translate-x-1/2 sm:w-[24rem] md:left-[62%] md:bottom-[1rem] md:w-[56rem]"
            >
              <img
                src={MOSQUE_DESKTOP_URL}
                alt=""
                className="hidden h-auto w-full opacity-80 mix-blend-screen brightness-[0.9] saturate-[0.82] drop-shadow-[0_14px_36px_rgba(10,5,20,0.55)] md:block"
                loading="eager"
                draggable={false}
              />
              <img
                src={MOSQUE_MOBILE_URL}
                alt=""
                className="h-auto w-full opacity-82 mix-blend-screen brightness-[0.92] saturate-[0.84] drop-shadow-[0_14px_36px_rgba(10,5,20,0.55)] md:hidden"
                loading="eager"
                draggable={false}
              />
            </div>
          </div>

          <div className="relative z-20 pt-[31rem] sm:pt-[34rem] md:flex md:min-h-[calc(100dvh-7.5rem)] md:items-end md:pt-0">
            <div
              ref={copyRef}
              className="max-w-md rounded-[2rem] border border-[#f7dfa0]/12 bg-[#12081f]/36 p-5 shadow-bloom backdrop-blur-xl md:mb-6 md:max-w-[24rem] md:p-6"
            >
              <p className="hero-copy-line text-xs uppercase tracking-[0.4em] text-gold/80">
                Касиеттүү майрам
              </p>
              <h1 className="hero-copy-line mt-3 font-display text-3xl font-bold leading-tight text-parchment md:text-5xl">
                Орозо Айт кут болсун
              </h1>
              <p className="hero-copy-line mt-4 text-sm leading-7 text-cream/85 md:text-base">
                Жүрөгүңүздөргө тынчтык, үйүңүздөргө береке, дасторконуңуздарга кубаныч жана
                жакындарыңыздарга нур толсун.
              </p>
              <div className="hero-copy-line mt-6 flex flex-wrap gap-4">
                <MagneticButton href="#story">Майрамдык ирмемдер</MagneticButton>
              </div>
              <ul className="mt-7 flex flex-wrap gap-2.5 md:gap-3">
                {TAGS.map((label) => (
                  <li key={label}>
                    <span className="hero-tag inline-flex items-center rounded-full border border-gold/20 bg-[#1a0e25]/78 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.28em] text-[#f7e9bf] md:text-xs">
                      <span className="mr-2 h-1.5 w-1.5 rounded-full bg-gradient-to-r from-amber to-gold shadow-[0_0_10px_rgba(240,168,80,0.9)]" />
                      {label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-scroll-hint pointer-events-none absolute bottom-7 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-2 text-gold/60">
        <span className="text-[10px] uppercase tracking-[0.45em]">Төмөн жылдырыңыз</span>
        <svg
          className="hero-scroll-chevron h-6 w-6 text-gold"
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
