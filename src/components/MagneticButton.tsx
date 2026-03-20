import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import { gsap } from '../utils/gsapContext'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

type MagneticButtonProps = {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  href?: string
}

export function MagneticButton({
  children,
  className = '',
  onClick,
  href,
}: MagneticButtonProps) {
  const root = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLSpanElement>(null)
  const reduced = usePrefersReducedMotion()

  useGSAP(
    () => {
      const wrap = root.current
      const target = inner.current
      if (!wrap || !target || reduced) return

      const xTo = gsap.quickTo(target, 'x', { duration: 0.45, ease: 'power3.out' })
      const yTo = gsap.quickTo(target, 'y', { duration: 0.45, ease: 'power3.out' })

      const onMove = (e: PointerEvent) => {
        const r = wrap.getBoundingClientRect()
        const cx = r.left + r.width / 2
        const cy = r.top + r.height / 2
        const dx = ((e.clientX - cx) / r.width) * 18
        const dy = ((e.clientY - cy) / r.height) * 14
        xTo(dx)
        yTo(dy)
      }

      const onLeave = () => {
        xTo(0)
        yTo(0)
      }

      wrap.addEventListener('pointermove', onMove)
      wrap.addEventListener('pointerleave', onLeave)
      return () => {
        wrap.removeEventListener('pointermove', onMove)
        wrap.removeEventListener('pointerleave', onLeave)
      }
    },
    { scope: root, dependencies: [reduced] },
  )

  const content = (
    <span
      ref={inner}
      className="inline-flex items-center justify-center gap-2 will-change-transform"
    >
      {children}
    </span>
  )

  const shell = `relative inline-flex overflow-hidden rounded-full border border-gold/50 bg-[#1f1028]/70 px-8 py-3 text-sm font-semibold text-parchment shadow-gold backdrop-blur-md transition-colors hover:border-amber/70 hover:bg-[#2a1835]/80 md:text-base ${className}`

  if (href) {
    return (
      <div ref={root} className="inline-block">
        <a href={href} className={shell} onClick={onClick}>
          {content}
        </a>
      </div>
    )
  }

  return (
    <div ref={root} className="inline-block">
      <button type="button" className={shell} onClick={onClick}>
        {content}
      </button>
    </div>
  )
}
