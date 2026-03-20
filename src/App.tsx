import { useEffect, type CSSProperties } from 'react'
import { Hero } from './sections/Hero'
import { ScrollTrigger } from './utils/gsapContext'
import { WonderMarquee } from './sections/WonderMarquee'
import { StoryReel } from './sections/StoryReel'
import { BlessingsGrid } from './sections/BlessingsGrid'
import { FinalBlessing } from './sections/FinalBlessing'

const SIDE_PATTERN_MARKS = [
  { top: '9%', size: '1.2rem' },
  { top: '22%', size: '0.95rem' },
  { top: '36%', size: '1.1rem' },
  { top: '50%', size: '0.78rem' },
  { top: '64%', size: '1.08rem' },
  { top: '78%', size: '0.92rem' },
] as const

function GlobalGrain() {
  return (
    <svg
      className="pointer-events-none fixed left-0 top-0 h-0 w-0 overflow-hidden"
      aria-hidden
    >
      <defs>
        <filter id="lux-noise-filter" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="4"
            stitchTiles="stitch"
            result="noise"
          />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="table" tableValues="0 0.035" />
          </feComponentTransfer>
        </filter>
      </defs>
    </svg>
  )
}

function SideOrnament({ side }: { side: 'left' | 'right' }) {
  return (
    <div className={`side-ornament side-ornament--${side}`}>
      <div className="side-ornament__glow" />
      <div className="side-ornament__panel" />
      {SIDE_PATTERN_MARKS.map((mark, index) => (
        <div
          key={`${side}-${index}`}
          className="side-ornament__mark"
          style={
            {
              top: mark.top,
              width: mark.size,
              height: mark.size,
            } satisfies CSSProperties
          }
        />
      ))}
    </div>
  )
}

function GlobalBackdrop() {
  return (
    <div className="global-backdrop" aria-hidden>
      <div className="global-backdrop__veil" />
      <div className="global-backdrop__shadow global-backdrop__shadow--left" />
      <div className="global-backdrop__shadow global-backdrop__shadow--center" />
      <div className="global-backdrop__shadow global-backdrop__shadow--right" />
      <div className="global-backdrop__mesh" />
      <div className="global-backdrop__noise lux-noise" />
      <SideOrnament side="left" />
      <SideOrnament side="right" />
    </div>
  )
}

export default function App() {
  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh())
    const onResize = () => ScrollTrigger.refresh()
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(id)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <>
      <GlobalGrain />
      <GlobalBackdrop />
      <main className="relative min-h-screen bg-void">
        <Hero />
        <WonderMarquee />
        <StoryReel />
        <BlessingsGrid />
        <FinalBlessing />
        <footer className="relative z-20 overflow-hidden border-t border-gold/10 bg-night/70 py-10 text-center">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,222,145,0.07),transparent_45%)]" />
          <div className="relative z-30 mx-auto flex max-w-4xl flex-col items-center gap-3 px-5 md:px-10">
            <p className="text-[10px] uppercase tracking-[0.45em] text-gold/55">Орозо Айт</p>
            <p className="font-display text-lg text-[#f3ddb0] md:text-xl">Майрамыңыздар кут болсун</p>
            <p className="text-xs uppercase tracking-[0.32em] text-gold/40">
              Жарык • Береке • Ынтымак
            </p>
            <p className="text-[11px] uppercase tracking-[0.28em] text-gold/35">
              From Anarbekov Adilkan
            </p>
          </div>
        </footer>
      </main>
    </>
  )
}
