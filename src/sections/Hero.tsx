import { useGSAP } from '@gsap/react'
import { useEffect, useRef, type CSSProperties } from 'react'
import { MagneticButton } from '../components/MagneticButton'
import { useBoot } from '../context/BootContext'
import { useMobilePerformanceMode } from '../hooks/useMobilePerformanceMode'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { gsap } from '../utils/gsapContext'

const TAGS = ['Көктөм', 'Береке', 'Жаңылануу', 'Ынтымак']

const POLLEN_DOTS = [
  { left: '5%', top: '16%', size: 4, opacity: 0.72, delay: 0.15, duration: 3.8 },
  { left: '11%', top: '24%', size: 3, opacity: 0.54, delay: 0.7, duration: 4.1 },
  { left: '18%', top: '11%', size: 5, opacity: 0.78, delay: 1.1, duration: 3.5 },
  { left: '26%', top: '30%', size: 3, opacity: 0.58, delay: 0.3, duration: 4.4 },
  { left: '34%', top: '14%', size: 4, opacity: 0.66, delay: 1.4, duration: 3.6 },
  { left: '43%', top: '8%', size: 3, opacity: 0.48, delay: 0.9, duration: 4.6 },
  { left: '51%', top: '20%', size: 4, opacity: 0.63, delay: 1.8, duration: 3.9 },
  { left: '62%', top: '12%', size: 3, opacity: 0.56, delay: 0.5, duration: 4.3 },
  { left: '70%', top: '9%', size: 5, opacity: 0.82, delay: 1.2, duration: 3.4 },
  { left: '77%', top: '24%', size: 3, opacity: 0.51, delay: 0.2, duration: 4.8 },
  { left: '85%', top: '17%', size: 4, opacity: 0.69, delay: 1.6, duration: 3.7 },
  { left: '92%', top: '13%', size: 4, opacity: 0.73, delay: 0.45, duration: 4.2 },
] as const

const SPARKLES = [
  { left: '13%', top: '18%', size: 22, opacity: 0.74, delay: 0.4, duration: 5.3 },
  { left: '28%', top: '9%', size: 16, opacity: 0.56, delay: 1.2, duration: 4.9 },
  { left: '39%', top: '24%', size: 18, opacity: 0.62, delay: 0.8, duration: 5.6 },
  { left: '57%', top: '15%', size: 15, opacity: 0.5, delay: 1.7, duration: 5.1 },
  { left: '69%', top: '30%', size: 20, opacity: 0.66, delay: 0.6, duration: 5.8 },
  { left: '82%', top: '11%', size: 24, opacity: 0.8, delay: 1.35, duration: 5.2 },
  { left: '89%', top: '26%', size: 17, opacity: 0.58, delay: 0.1, duration: 5.5 },
] as const

const PETALS = [
  { left: '51%', top: '27%', width: 14, height: 9, opacity: 0.48, delay: 0.25, duration: 5.4, dx: 18, dy: -18, rotate: -18 },
  { left: '58%', top: '34%', width: 16, height: 10, opacity: 0.56, delay: 0.75, duration: 5.9, dx: -14, dy: -22, rotate: 16 },
  { left: '63%', top: '21%', width: 12, height: 8, opacity: 0.45, delay: 1.1, duration: 4.8, dx: 10, dy: -16, rotate: -12 },
  { left: '69%', top: '40%', width: 15, height: 10, opacity: 0.52, delay: 1.45, duration: 6.1, dx: -16, dy: -20, rotate: 19 },
  { left: '74%', top: '18%', width: 14, height: 9, opacity: 0.44, delay: 0.55, duration: 5.1, dx: 15, dy: -15, rotate: -14 },
  { left: '80%', top: '33%', width: 17, height: 11, opacity: 0.58, delay: 1.25, duration: 6.3, dx: -12, dy: -18, rotate: 12 },
] as const

function dotStyle(dot: (typeof POLLEN_DOTS)[number]): CSSProperties {
  return {
    left: dot.left,
    top: dot.top,
    width: dot.size,
    height: dot.size,
    opacity: dot.opacity,
  }
}

function sparkleStyle(sparkle: (typeof SPARKLES)[number]): CSSProperties {
  return {
    left: sparkle.left,
    top: sparkle.top,
    width: sparkle.size,
    height: sparkle.size,
    opacity: sparkle.opacity,
  }
}

function petalStyle(petal: (typeof PETALS)[number]): CSSProperties {
  return {
    left: petal.left,
    top: petal.top,
    width: petal.width,
    height: petal.height,
    opacity: petal.opacity,
  }
}

function HeroLandscape() {
  return (
    <svg
      className="h-auto w-full overflow-visible"
      viewBox="0 0 1100 580"
      preserveAspectRatio="xMidYMax meet"
      aria-hidden
    >
      <defs>
        <linearGradient id="hero-mountain-back" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(112,130,101,0.6)" />
          <stop offset="100%" stopColor="rgba(49,32,70,0.72)" />
        </linearGradient>
        <linearGradient id="hero-mountain-front" x1="0%" y1="20%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(164,123,79,0.54)" />
          <stop offset="100%" stopColor="rgba(44,28,58,0.92)" />
        </linearGradient>
        <linearGradient id="hero-meadow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(57,72,44,0.88)" />
          <stop offset="52%" stopColor="rgba(92,111,64,0.84)" />
          <stop offset="100%" stopColor="rgba(44,51,34,0.86)" />
        </linearGradient>
        <radialGradient id="hero-lantern-glow" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="rgba(255,225,149,0.55)" />
          <stop offset="55%" stopColor="rgba(255,225,149,0.14)" />
          <stop offset="100%" stopColor="rgba(255,225,149,0)" />
        </radialGradient>
      </defs>

      <path
        d="M0 420 L110 302 L174 338 L274 210 L376 346 L470 168 L590 348 L720 118 L838 354 L954 234 L1100 390 V580 H0 Z"
        fill="url(#hero-mountain-back)"
      />
      <path
        d="M0 468 L112 416 L208 434 L332 330 L440 444 L548 302 L652 442 L760 342 L882 448 L988 390 L1100 452 V580 H0 Z"
        fill="url(#hero-mountain-front)"
      />
      <path
        d="M0 486 C76 468 144 468 216 486 C296 506 368 510 450 490 C546 466 624 468 714 490 C802 512 884 516 974 492 C1016 480 1058 476 1100 478 V580 H0 Z"
        fill="url(#hero-meadow)"
      />

      <g opacity="0.92">
        <path d="M640 432 C680 370 766 370 808 432 V502 H640 Z" fill="rgba(247, 236, 207, 0.16)" />
        <path d="M656 430 C688 392 760 392 792 430" stroke="rgba(255,239,201,0.18)" strokeWidth="8" />
        <rect x="707" y="444" width="34" height="58" rx="12" fill="rgba(18,11,27,0.34)" />
        <path d="M650 502 H798" stroke="rgba(255,239,201,0.14)" strokeWidth="6" />
      </g>

      <g opacity="0.9">
        <rect x="852" y="410" width="10" height="66" rx="5" fill="rgba(35,23,49,0.85)" />
        <path d="M857 334 C830 362 820 400 834 432 C840 446 846 458 857 476 C868 458 874 446 880 432 C894 400 884 362 857 334 Z" fill="rgba(70,93,62,0.82)" />
        <path d="M857 348 C839 368 834 398 844 425 C848 437 851 447 857 462 C863 447 866 437 870 425 C880 398 875 368 857 348 Z" fill="rgba(236, 215, 151, 0.08)" />
      </g>

      <g opacity="0.72">
        <rect x="194" y="430" width="8" height="52" rx="4" fill="rgba(34,23,48,0.72)" />
        <path d="M198 370 C176 394 168 424 180 446 C184 456 188 466 198 482 C208 466 212 456 216 446 C228 424 220 394 198 370 Z" fill="rgba(74,98,66,0.7)" />
      </g>

      <g>
        <ellipse cx="710" cy="506" rx="94" ry="16" fill="rgba(9,5,15,0.26)" />
        <ellipse cx="874" cy="500" rx="54" ry="12" fill="rgba(9,5,15,0.18)" />
        <ellipse cx="198" cy="506" rx="52" ry="10" fill="rgba(9,5,15,0.14)" />
      </g>

      <g>
        {[
          { x: 600, y: 484, scale: 1.2, rotate: -7 },
          { x: 626, y: 494, scale: 0.94, rotate: 4 },
          { x: 846, y: 478, scale: 1.05, rotate: 6 },
          { x: 872, y: 490, scale: 0.86, rotate: -5 },
          { x: 170, y: 488, scale: 0.96, rotate: -4 },
          { x: 194, y: 498, scale: 0.76, rotate: 5 },
        ].map((flower, index) => (
          <g
            key={index}
            transform={`translate(${flower.x} ${flower.y}) rotate(${flower.rotate}) scale(${flower.scale})`}
          >
            <path d="M4 0 C5 14 5 22 4 32" stroke="rgba(117,164,92,0.5)" strokeWidth="2" />
            <path
              d="M4 1 C0 5 -1 10 1 15 C2 13 3 11 4 9 C5 11 6 13 7 15 C9 10 8 5 4 1 Z"
              fill="rgba(230,135,74,0.72)"
            />
          </g>
        ))}
      </g>

      <circle cx="744" cy="446" r="92" fill="url(#hero-lantern-glow)" opacity="0.68" />
    </svg>
  )
}

export function Hero() {
  const root = useRef<HTMLElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)
  const sunGlowRef = useRef<HTMLDivElement>(null)
  const sunRef = useRef<HTMLDivElement>(null)
  const medallionRef = useRef<HTMLDivElement>(null)
  const landscapeRef = useRef<HTMLDivElement>(null)
  const sealRef = useRef<HTMLDivElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const mobileLite = useMobilePerformanceMode()
  const { introEnabled, markWebGLReady } = useBoot()
  const activePollen = mobileLite ? POLLEN_DOTS.filter((_, index) => index % 2 === 0) : POLLEN_DOTS
  const activeSparkles = mobileLite ? SPARKLES.slice(0, 4) : SPARKLES
  const activePetals = mobileLite ? PETALS.slice(0, 2) : PETALS

  useEffect(() => {
    const id = window.requestAnimationFrame(() => {
      markWebGLReady()
    })
    return () => window.cancelAnimationFrame(id)
  }, [markWebGLReady])

  useEffect(() => {
    const section = root.current
    const scene = sceneRef.current
    if (!section || !scene || reduced || mobileLite || !introEnabled) return

    const xTo = gsap.quickTo(scene, 'x', { duration: 1.1, ease: 'power3.out' })
    const yTo = gsap.quickTo(scene, 'y', { duration: 1.1, ease: 'power3.out' })

    const onMove = (event: PointerEvent) => {
      const bounds = section.getBoundingClientRect()
      const px = (event.clientX - bounds.left) / bounds.width - 0.5
      const py = (event.clientY - bounds.top) / bounds.height - 0.5
      xTo(px * 16)
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
  }, [introEnabled, mobileLite, reduced])

  useGSAP(
    () => {
      const scope = root.current
      const sunGlow = sunGlowRef.current
      const sun = sunRef.current
      const medallion = medallionRef.current
      const landscape = landscapeRef.current
      const seal = sealRef.current
      const copy = copyRef.current
      if (!scope || !sunGlow || !sun || !medallion || !landscape || !seal || !copy || !introEnabled) return

      const pollen = scope.querySelectorAll<HTMLElement>('.hero-pollen')
      const sparkles = scope.querySelectorAll<SVGSVGElement>('.hero-sparkle')
      const petals = scope.querySelectorAll<HTMLElement>('.hero-petal')
      const orbits = scope.querySelectorAll<SVGSVGElement>('.hero-orbit')
      const copyLines = scope.querySelectorAll<HTMLElement>('.hero-copy-line')
      const tags = scope.querySelectorAll<HTMLElement>('.hero-tag')
      const scrollHint = scope.querySelector<HTMLElement>('.hero-scroll-hint')
      const scrollChevron = scope.querySelector<HTMLElement>('.hero-scroll-chevron')

      if (reduced) {
        gsap.set([sunGlow, sun, medallion, landscape, seal, copy, ...copyLines, ...tags, scrollHint], {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          filter: 'none',
        })
        gsap.set([...pollen, ...sparkles, ...petals, ...orbits], { opacity: 1, scale: 1, x: 0, y: 0 })
        return
      }

      gsap.set(pollen, { opacity: 0, scale: 0.4, y: 18 })
      gsap.set(sparkles, { opacity: 0, scale: 0.35, rotation: -18, transformOrigin: '50% 50%' })
      gsap.set(petals, { opacity: 0, scale: 0.55, y: 14, rotation: -6, transformOrigin: '50% 50%' })
      gsap.set(orbits, { opacity: 0, scale: 0.9, y: -16 })
      gsap.set(sunGlow, { opacity: 0, scale: 0.72 })
      gsap.set(sun, { opacity: 0, y: 34, scale: 0.86, filter: 'blur(12px)' })
      gsap.set(medallion, { opacity: 0, y: 38, scale: 0.88, filter: 'blur(10px)' })
      gsap.set(landscape, { opacity: 0, y: 44, scale: 0.95, filter: 'blur(14px)' })
      gsap.set(seal, { opacity: 0, y: -12, scale: 0.82 })
      gsap.set(copy, { opacity: 0, y: 42 })
      gsap.set(copyLines, { opacity: 0, y: 20 })
      gsap.set(tags, { opacity: 0, y: 18, scale: 0.92 })
      gsap.set(scrollHint, { opacity: 0, y: 12 })

      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

      tl.to(seal, { opacity: 1, y: 0, scale: 1, duration: 0.72 }, 0.06)
        .to(pollen, { opacity: 1, scale: 1, y: 0, duration: 0.8, stagger: 0.04 }, 0.1)
        .to(sparkles, { opacity: 1, scale: 1, rotation: 0, duration: 0.9, stagger: 0.08 }, 0.14)
        .to(petals, { opacity: 1, scale: 1, y: 0, rotation: 0, duration: 0.86, stagger: 0.06 }, 0.2)
        .to(orbits, { opacity: 1, scale: 1, y: 0, duration: 0.96, stagger: 0.05 }, 0.3)
        .to(sunGlow, { opacity: 0.95, scale: 1, duration: 1.1 }, 0.34)
        .to(sun, { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 1.05 }, 0.42)
        .to(medallion, { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 1.06 }, 0.58)
        .to(landscape, { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 1.08 }, 0.76)
        .to(copy, { opacity: 1, y: 0, duration: 0.9 }, 0.92)
        .to(copyLines, { opacity: 1, y: 0, duration: 0.72, stagger: 0.08 }, 1.02)
        .to(tags, { opacity: 1, y: 0, scale: 1, duration: 0.54, stagger: 0.06, ease: 'back.out(1.25)' }, 1.14)
        .to(scrollHint, { opacity: 1, y: 0, duration: 0.7 }, 1.32)

      gsap.to(seal, {
        y: mobileLite ? -2 : -4,
        duration: mobileLite ? 5.4 : 3.6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      gsap.to(sunGlow, {
        scale: mobileLite ? 1.04 : 1.08,
        opacity: mobileLite ? 0.88 : 0.8,
        duration: mobileLite ? 6.4 : 4.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      gsap.to(sun, {
        y: mobileLite ? -4 : -8,
        scale: mobileLite ? 1.01 : 1.02,
        duration: mobileLite ? 6.1 : 4.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      gsap.to(medallion, {
        y: mobileLite ? -5 : -12,
        duration: mobileLite ? 6.8 : 5.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      gsap.to(landscape, {
        y: mobileLite ? -3 : -6,
        duration: mobileLite ? 7.4 : 6.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      if (!mobileLite) {
        gsap.to(orbits, {
          rotation: '+=10',
          duration: 14,
          repeat: -1,
          ease: 'none',
          stagger: { each: 0.4, from: 'random' },
        })

        pollen.forEach((dot, index) => {
          const config = activePollen[index]
          gsap.to(dot, {
            y: index % 2 === 0 ? -10 : 7,
            x: index % 3 === 0 ? 5 : -4,
            scale: 1.42,
            opacity: Math.max(config.opacity * 0.64, 0.34),
            duration: config.duration,
            delay: 1 + config.delay,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          })
        })

        sparkles.forEach((sparkle, index) => {
          const config = activeSparkles[index]
          gsap.to(sparkle, {
            scale: 1.16,
            opacity: Math.max(config.opacity * 0.5, 0.28),
            duration: config.duration,
            delay: 1.1 + config.delay,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          })
        })

        petals.forEach((petal, index) => {
          const config = activePetals[index]
          gsap.to(petal, {
            x: config.dx,
            y: config.dy,
            rotation: config.rotate,
            duration: config.duration,
            delay: 0.9 + config.delay,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          })
        })
      }

      if (scrollChevron) {
        gsap.to(scrollChevron, {
          y: 10,
          duration: 1.35,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 1.4,
        })
      }

      if (!mobileLite) {
        gsap.to(medallion, {
          yPercent: -6,
          ease: 'none',
          scrollTrigger: {
            trigger: scope,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        })

        gsap.to(landscape, {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: scope,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        })
      }
    },
    { scope: root, dependencies: [introEnabled, mobileLite, reduced] },
  )

  return (
    <section
      ref={root}
      id="top"
      className="relative isolate overflow-hidden bg-festive-sky"
      style={{ perspective: '1400px' }}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_58%_18%,rgba(255,214,123,0.16),transparent_24%),radial-gradient(circle_at_24%_18%,rgba(142,188,106,0.1),transparent_20%),radial-gradient(circle_at_76%_34%,rgba(230,143,71,0.14),transparent_24%),linear-gradient(180deg,rgba(48,28,76,0.92)_0%,rgba(30,17,49,0.94)_48%,rgba(10,6,17,1)_100%)]" />
        <div className="absolute left-[52%] top-[6%] h-44 w-44 rounded-full bg-[radial-gradient(circle,rgba(255,225,156,0.18)_0%,rgba(255,225,156,0.06)_36%,transparent_72%)] blur-[56px] sm:h-72 sm:w-72 sm:blur-[90px] md:h-[28rem] md:w-[28rem]" />
        <div className="absolute -left-10 top-[30%] h-36 w-36 rounded-full bg-[#78a45a]/8 blur-[72px] sm:h-52 sm:w-52 sm:blur-[120px] md:h-72 md:w-72" />
        <div className="absolute -right-8 top-[20%] h-40 w-40 rounded-full bg-[#da8744]/10 blur-[72px] sm:h-56 sm:w-56 sm:blur-[120px] md:h-80 md:w-80" />
        <div className="absolute inset-0 hidden opacity-[0.22] mix-blend-overlay lux-noise md:block" />
      </div>

      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {activePollen.map((dot, index) => (
          <span
            key={`pollen-${index}`}
            className="hero-pollen absolute rounded-full bg-[#fff1c7] shadow-[0_0_18px_rgba(255,226,146,0.62)]"
            style={dotStyle(dot)}
          />
        ))}
        {activeSparkles.map((sparkle, index) => (
          <svg
            key={`sparkle-${index}`}
            className="hero-sparkle absolute overflow-visible text-[#ffe8a1] drop-shadow-[0_0_12px_rgba(255,224,145,0.62)]"
            style={sparkleStyle(sparkle)}
            viewBox="0 0 32 32"
            fill="none"
          >
            <path
              d="M16 0 L18.8 13.2 L32 16 L18.8 18.8 L16 32 L13.2 18.8 L0 16 L13.2 13.2 Z"
              fill="currentColor"
            />
          </svg>
        ))}
        {activePetals.map((petal, index) => (
          <span
            key={`petal-${index}`}
            className="hero-petal absolute rounded-[999px_999px_999px_999px/72%_72%_40%_40%] bg-[linear-gradient(180deg,rgba(255,211,145,0.82)_0%,rgba(232,138,74,0.74)_100%)] shadow-[0_0_22px_rgba(255,201,128,0.22)]"
            style={petalStyle(petal)}
          />
        ))}
      </div>

      <div className="relative z-30 mx-auto flex min-h-[100dvh] max-w-7xl flex-col px-4 pb-10 pt-4 sm:px-5 sm:pb-12 sm:pt-5 md:px-10 md:pb-16 md:pt-7">
        <div className="flex items-center justify-between text-[9px] uppercase tracking-[0.36em] text-[#f7dfa0]/60 sm:text-[10px] sm:tracking-[0.45em] md:text-[11px]">
          <div className="flex items-center gap-3">
            <div
              ref={sealRef}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/15 bg-[#160c24]/78 p-2 shadow-[0_0_24px_rgba(255,214,120,0.12)] sm:h-12 sm:w-12 md:h-14 md:w-14 md:backdrop-blur-md"
            >
              <svg viewBox="0 0 24 24" className="h-full w-full text-[#ffd88e]" fill="none" aria-hidden>
                <circle cx="12" cy="12" r="5.2" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.2" />
                <path
                  d="M12 3.8 V1.8 M12 22.2 V20.2 M20.2 12 H22.2 M1.8 12 H3.8 M17.9 6.1 L19.3 4.7 M4.7 19.3 L6.1 17.9 M17.9 17.9 L19.3 19.3 M4.7 4.7 L6.1 6.1"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <span className="max-[359px]:hidden">Кыргызча нооруздук сахна</span>
          </div>
          <span className="hidden lg:inline">Күн • Жашылдык • Ынтымак</span>
        </div>

        <div className="relative flex-1">
          <div
            ref={sceneRef}
            className={`pointer-events-none absolute inset-x-0 top-0 min-h-[26rem] sm:min-h-[30rem] md:inset-0 md:min-h-[36rem] ${mobileLite ? '' : 'will-change-transform'}`}
          >
            <div
              ref={sunGlowRef}
              className="absolute left-[62%] top-[10%] h-[13rem] w-[13rem] -translate-x-1/2 rounded-full sm:h-[16rem] sm:w-[16rem] md:left-[67%] md:top-[12%] md:h-[31rem] md:w-[31rem]"
              style={{
                background:
                  'radial-gradient(circle, rgba(255,221,147,0.34) 0%, rgba(255,221,147,0.14) 32%, rgba(129,161,88,0.07) 52%, transparent 74%)',
                filter: mobileLite ? 'blur(16px)' : 'blur(24px)',
              }}
            />

            <svg
              className="hero-orbit absolute left-[30%] top-[7%] h-14 w-[55%] opacity-75 md:left-[34%] md:top-[6%] md:h-20 md:w-[52%]"
              viewBox="0 0 760 120"
              preserveAspectRatio="none"
              aria-hidden
            >
              <path
                d="M12 58 C 162 18, 320 14, 470 34 C 598 50, 674 52, 748 44"
                fill="none"
                stroke="rgba(247,223,160,0.52)"
                strokeWidth="1.6"
              />
            </svg>
            {!mobileLite && (
              <svg
                className="hero-orbit absolute left-[38%] top-[16%] h-10 w-[46%] opacity-55 md:left-[43%] md:top-[15%] md:h-16 md:w-[40%]"
                viewBox="0 0 680 90"
                preserveAspectRatio="none"
                aria-hidden
              >
                <path
                  d="M12 54 C 140 20, 304 20, 446 40 C 544 54, 602 52, 668 46"
                  fill="none"
                  stroke="rgba(255,232,181,0.42)"
                  strokeWidth="1.2"
                  strokeDasharray="4 10"
                />
              </svg>
            )}

            <div
              ref={sunRef}
              className="absolute left-[63%] top-[14%] z-20 h-[7.5rem] w-[7.5rem] -translate-x-1/2 rounded-full border border-[#ffe0a0]/28 bg-[radial-gradient(circle,rgba(255,245,214,0.92)_0%,rgba(255,222,150,0.78)_30%,rgba(246,163,79,0.44)_64%,rgba(246,163,79,0)_100%)] shadow-[0_0_46px_rgba(255,203,104,0.28)] sm:h-[9rem] sm:w-[9rem] md:left-[68%] md:top-[15%] md:h-[16rem] md:w-[16rem]"
            >
              <div className="absolute inset-[10%] rounded-full border border-[#fff2cb]/26" />
              <div className="absolute inset-[18%] rounded-full border border-[#fff2cb]/18" />
            </div>

            <div
              ref={medallionRef}
              className="absolute left-[62%] top-[24%] z-30 w-[11.25rem] -translate-x-1/2 sm:w-[13rem] md:left-[67%] md:top-[23%] md:w-[24rem]"
            >
              <div className="relative overflow-hidden rounded-[2rem] border border-[#f7dfa0]/18 bg-[linear-gradient(180deg,rgba(33,19,49,0.84)_0%,rgba(20,10,30,0.74)_100%)] px-4 py-4 text-center shadow-[0_20px_52px_rgba(0,0,0,0.26)] sm:px-5 sm:py-5 md:rounded-[2.6rem] md:px-8 md:py-8 md:backdrop-blur-xl">
                <div className="absolute inset-x-[18%] top-0 h-px bg-gradient-to-r from-transparent via-[#fff1c4]/70 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_26%,rgba(255,231,172,0.16),transparent_38%),radial-gradient(circle_at_50%_92%,rgba(115,155,79,0.12),transparent_34%)]" />
                <p className="relative text-[9px] uppercase tracking-[0.42em] text-gold/80 sm:text-[10px] md:text-[11px]">
                  Жаңы күн
                </p>
                <p className="relative mt-2 font-display text-[1.95rem] font-bold leading-none text-transparent sm:text-[2.2rem] md:text-[4.5rem] [background-image:linear-gradient(180deg,#fff6d6_0%,#f0cf81_55%,#ca8d35_100%)] bg-clip-text drop-shadow-[0_0_26px_rgba(255,212,126,0.26)]">
                  Нооруз
                </p>
                <p className="relative mt-1 font-display text-base font-semibold uppercase tracking-[0.24em] text-[#ffe4a3] sm:text-lg md:mt-3 md:text-[1.6rem]">
                  Кут болсун
                </p>
                <p className="relative mt-3 text-[10px] uppercase tracking-[0.32em] text-cream/58 md:mt-4 md:text-xs">
                  Жаңылануу • Береке • Ынтымак
                </p>
              </div>
            </div>

            <div
              ref={landscapeRef}
              className="absolute bottom-[0.35rem] left-1/2 z-10 w-[21rem] -translate-x-1/2 sm:bottom-[0.7rem] sm:w-[26rem] md:left-[64%] md:bottom-[0.85rem] md:w-[58rem]"
            >
              <HeroLandscape />
            </div>
          </div>

          <div className="relative z-20 pt-[22rem] sm:pt-[25rem] md:flex md:min-h-[calc(100dvh-7.5rem)] md:items-end md:pt-0">
            <div
              ref={copyRef}
              className="mx-auto w-full max-w-[22rem] rounded-[1.75rem] border border-[#f7dfa0]/14 bg-[#12081f]/84 p-4 shadow-bloom sm:max-w-md sm:rounded-[2rem] sm:p-5 md:mx-0 md:mb-6 md:max-w-[24rem] md:bg-[#12081f]/38 md:p-6 md:backdrop-blur-xl"
            >
              <p className="hero-copy-line text-xs uppercase tracking-[0.4em] text-gold/80">
                Көктөмдүн майрамы
              </p>
              <h1 className="hero-copy-line mt-3 font-display text-[2.1rem] font-bold leading-[0.96] text-parchment sm:text-3xl md:text-5xl">
                Нооруз кут болсун
              </h1>
              <p className="hero-copy-line mt-4 text-[0.98rem] leading-8 text-cream/85 sm:text-sm sm:leading-7 md:text-base">
                Үйүңүздөргө жаңы дем, дасторконуңуздарга береке, жүрөгүңүздөргө жарык маанай жана
                ар бир күнүңүздөргө көктөмдөй жаңылануу келсин.
              </p>
              <div className="hero-copy-line mt-6 flex flex-wrap gap-4">
                <MagneticButton href="#story">Нооруз ирмемдери</MagneticButton>
              </div>
              <ul className="mt-6 flex flex-wrap gap-2.5 md:mt-7 md:gap-3">
                {TAGS.map((label) => (
                  <li key={label}>
                    <span className="hero-tag inline-flex items-center rounded-full border border-gold/20 bg-[#1a0e25]/78 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.24em] text-[#f7e9bf] sm:text-[11px] sm:tracking-[0.28em] md:text-xs">
                      <span className="mr-2 h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#e39e4d] to-[#b8ca6f] shadow-[0_0_10px_rgba(227,158,77,0.8)]" />
                      {label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-scroll-hint pointer-events-none absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-1.5 text-gold/60 sm:bottom-7 sm:gap-2">
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
