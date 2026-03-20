import { forwardRef, useEffect, useRef } from 'react'
import { gsap } from '../utils/gsapContext'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

type LoadingScreenProps = {
  progress: number
}

export const LoadingScreen = forwardRef<HTMLDivElement, LoadingScreenProps>(function LoadingScreen(
  { progress },
  ref,
) {
  const reduced = usePrefersReducedMotion()
  const ringRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (reduced || !ringRef.current) return
    gsap.to(ringRef.current, {
      rotation: 360,
      duration: 22,
      repeat: -1,
      ease: 'none',
    })
  }, [reduced])

  useEffect(() => {
    if (!lineRef.current) return
    gsap.to(lineRef.current, {
      scaleX: Math.min(1, Math.max(0.04, progress / 100)),
      duration: 0.35,
      ease: 'power2.out',
    })
  }, [progress])

  useEffect(() => {
    if (reduced || !titleRef.current || !subRef.current) return
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.from(titleRef.current, { y: 28, opacity: 0, filter: 'blur(12px)', duration: 1 })
      .from(subRef.current, { y: 16, opacity: 0, duration: 0.7 }, '-=0.5')
    return () => {
      tl.kill()
    }
  }, [reduced])

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#0f0618] text-parchment"
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label="Орозо Айт баракчасы жүктөлүүдө"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25 mix-blend-soft-light"
        style={{ backgroundImage: 'url(/assets/moodboard-hero.png)' }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35] mix-blend-overlay lux-noise"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(230,192,104,0.22),transparent_55%),radial-gradient(ellipse_at_80%_70%,rgba(155,126,212,0.12),transparent_50%)]"
        aria-hidden
      />

      <div ref={ringRef} className="relative mb-12 h-32 w-32 md:h-40 md:w-40" aria-hidden>
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              'conic-gradient(from 0deg, rgba(230,192,104,0.95), rgba(200,155,190,0.55), rgba(232,152,60,0.85), rgba(255,236,200,0.75), rgba(230,192,104,0.95))',
            maskImage: 'radial-gradient(circle, transparent 62%, black 66%)',
            WebkitMaskImage: 'radial-gradient(circle, transparent 62%, black 66%)',
          }}
        />
        <div className="absolute inset-[18%] rounded-full border border-gold/20 bg-[#12081f]/90 backdrop-blur-sm" />
        <div className="absolute inset-0 flex items-center justify-center font-display text-sm font-semibold text-gold md:text-base">
          {Math.round(progress)}%
        </div>
      </div>

      <h1
        ref={titleRef}
        className="px-6 text-center font-display text-3xl font-bold tracking-tight md:text-5xl [text-shadow:0_0_32px_rgba(230,192,104,0.35)]"
      >
        <span className="bg-gradient-to-b from-[#fff6d4] via-gold to-[#c9952c] bg-clip-text text-transparent">
          Орозо Айт
        </span>
      </h1>
      <p ref={subRef} className="mt-4 max-w-md px-8 text-center font-body text-sm text-cream/65 md:text-base">
        Чырак нуру, ай жана баталар даярдалууда…
      </p>

      <div className="mt-14 h-px w-[min(280px,70vw)] overflow-hidden rounded-full bg-white/10">
        <div
          ref={lineRef}
          className="h-full origin-left bg-gradient-to-r from-amber via-gold to-mauve"
          style={{ transform: 'scaleX(0.05)' }}
        />
      </div>
    </div>
  )
})
