import { useEffect } from 'react'
import { Hero } from './sections/Hero'
import { ScrollTrigger } from './utils/gsapContext'
import { WonderMarquee } from './sections/WonderMarquee'
import { StoryReel } from './sections/StoryReel'
import { BlessingsGrid } from './sections/BlessingsGrid'
import { FinalBlessing } from './sections/FinalBlessing'

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
      <main className="relative min-h-screen bg-void">
        <Hero />
        <WonderMarquee />
        <StoryReel />
        <BlessingsGrid />
        <FinalBlessing />
        <footer className="relative z-10 border-t border-gold/10 bg-night/40 py-10 text-center text-xs uppercase tracking-[0.35em] text-gold/45">
          Орозо Айт · Майрамыңыз кут болсун
        </footer>
      </main>
    </>
  )
}
