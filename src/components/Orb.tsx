import { useGSAP } from '@gsap/react'
import { useMemo, useRef } from 'react'
import { useBoot } from '../context/BootContext'
import { gsap } from '../utils/gsapContext'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

type OrbProps = {
  className?: string
  style?: React.CSSProperties
  delay?: number
}

export function Orb({ className = '', style, delay = 0 }: OrbProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const { introEnabled } = useBoot()
  const drift = useMemo(
    () => ({
      dur: 3 + Math.random() * 3,
      x: (Math.random() - 0.5) * 80,
      y: (Math.random() - 0.5) * 100,
      s: 0.85 + Math.random() * 0.35,
    }),
    [],
  )

  useGSAP(
    () => {
      const el = ref.current
      if (!el || reduced || !introEnabled) return
      gsap.set(el, { x: 0, y: 0, scale: 1 })
      gsap.to(el, {
        x: drift.x,
        y: drift.y,
        scale: drift.s,
        duration: drift.dur,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay,
      })
    },
    { scope: ref, dependencies: [reduced, delay, drift, introEnabled] },
  )

  return (
    <div
      ref={ref}
      className={`pointer-events-none absolute rounded-full mix-blend-screen backdrop-blur-md ${className}`}
      style={style}
      aria-hidden
    />
  )
}
