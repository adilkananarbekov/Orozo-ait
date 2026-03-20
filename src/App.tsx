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

type MinaretProps = {
  x: number
  baseY: number
  width: number
  shaftHeight: number
}

type DomeHallProps = {
  x: number
  baseY: number
  width: number
  bodyHeight: number
  domeHeight: number
  domeWidthRatio?: number
  shoulderHeight?: number
}

type SteppedPalaceProps = {
  x: number
  baseY: number
  width: number
  height: number
}

function Minaret({ x, baseY, width, shaftHeight }: MinaretProps) {
  const shaftY = baseY - shaftHeight
  const balconyHeight = Math.max(width * 0.34, 7)
  const balconyY = shaftY + shaftHeight * 0.34
  const balconyWidth = width * 1.55
  const domeBaseY = shaftY
  const domeWidth = width * 0.72
  const domeX = x + (width - domeWidth) / 2
  const domeHeight = width * 1.06
  const spireHeight = width * 0.9
  const spireX = x + width * 0.45
  const topY = domeBaseY - domeHeight - spireHeight

  return (
    <g>
      <rect x={x} y={shaftY} width={width} height={shaftHeight} rx={2} />
      <rect x={x - (balconyWidth - width) / 2} y={balconyY} width={balconyWidth} height={balconyHeight} rx={2} />
      <path
        d={`M ${domeX} ${domeBaseY} Q ${x + width / 2} ${domeBaseY - domeHeight} ${domeX + domeWidth} ${domeBaseY} L ${domeX + domeWidth} ${domeBaseY + balconyHeight * 0.8} L ${domeX} ${domeBaseY + balconyHeight * 0.8} Z`}
      />
      <rect x={spireX} y={domeBaseY - domeHeight - spireHeight} width={width * 0.1} height={spireHeight} rx={1} />
      <polygon
        points={`${x + width / 2},${topY} ${x + width * 0.28},${domeBaseY - domeHeight - spireHeight} ${x + width * 0.72},${domeBaseY - domeHeight - spireHeight}`}
      />
    </g>
  )
}

function DomeHall({
  x,
  baseY,
  width,
  bodyHeight,
  domeHeight,
  domeWidthRatio = 0.68,
  shoulderHeight = 0,
}: DomeHallProps) {
  const bodyY = baseY - bodyHeight
  const domeWidth = width * domeWidthRatio
  const domeX = x + (width - domeWidth) / 2
  const shoulderWidth = width * 0.18
  const finialWidth = Math.max(width * 0.03, 4)
  const finialX = x + width / 2 - finialWidth / 2

  return (
    <g>
      <rect x={x} y={bodyY} width={width} height={bodyHeight} rx={4} />
      {shoulderHeight > 0 ? (
        <>
          <rect x={x + width * 0.06} y={bodyY - shoulderHeight} width={shoulderWidth} height={shoulderHeight} rx={2} />
          <rect
            x={x + width - width * 0.06 - shoulderWidth}
            y={bodyY - shoulderHeight}
            width={shoulderWidth}
            height={shoulderHeight}
            rx={2}
          />
        </>
      ) : null}
      <path
        d={`M ${domeX} ${bodyY} Q ${x + width / 2} ${bodyY - domeHeight} ${domeX + domeWidth} ${bodyY} L ${domeX + domeWidth} ${bodyY + 12} L ${domeX} ${bodyY + 12} Z`}
      />
      <rect x={finialX} y={bodyY - domeHeight - 18} width={finialWidth} height={18} rx={1} />
      <polygon
        points={`${x + width / 2},${bodyY - domeHeight - 30} ${x + width / 2 - width * 0.042},${bodyY - domeHeight - 18} ${x + width / 2 + width * 0.042},${bodyY - domeHeight - 18}`}
      />
    </g>
  )
}

function SteppedPalace({ x, baseY, width, height }: SteppedPalaceProps) {
  const baseHeight = height * 0.56
  const midHeight = height * 0.26
  const topHeight = height * 0.18

  return (
    <g>
      <rect x={x} y={baseY - baseHeight} width={width} height={baseHeight} rx={4} />
      <rect x={x + width * 0.12} y={baseY - baseHeight - midHeight} width={width * 0.76} height={midHeight} rx={4} />
      <rect x={x + width * 0.28} y={baseY - height} width={width * 0.44} height={topHeight} rx={3} />
      <polygon
        points={`${x + width / 2},${baseY - height - width * 0.1} ${x + width * 0.4},${baseY - height} ${x + width * 0.6},${baseY - height}`}
      />
    </g>
  )
}

function IslamicSkyline() {
  return (
    <div className="global-backdrop__skyline">
      <svg className="skyline skyline--rear" viewBox="0 0 1600 340" preserveAspectRatio="none">
        <g fill="currentColor">
          <rect x="0" y="292" width="1600" height="48" />
          <SteppedPalace x={28} baseY={292} width={110} height={98} />
          <DomeHall x={182} baseY={292} width={176} bodyHeight={74} domeHeight={56} shoulderHeight={18} />
          <Minaret x={392} baseY={292} width={24} shaftHeight={138} />
          <SteppedPalace x={448} baseY={292} width={108} height={88} />
          <DomeHall x={592} baseY={292} width={212} bodyHeight={80} domeHeight={72} shoulderHeight={22} />
          <Minaret x={840} baseY={292} width={24} shaftHeight={146} />
          <SteppedPalace x={906} baseY={292} width={104} height={84} />
          <DomeHall x={1046} baseY={292} width={168} bodyHeight={68} domeHeight={54} shoulderHeight={16} />
          <Minaret x={1254} baseY={292} width={22} shaftHeight={132} />
          <SteppedPalace x={1312} baseY={292} width={122} height={96} />
          <DomeHall x={1462} baseY={292} width={112} bodyHeight={60} domeHeight={48} shoulderHeight={14} />
        </g>
      </svg>

      <svg className="skyline skyline--front" viewBox="0 0 1600 340" preserveAspectRatio="none">
        <g fill="currentColor">
          <rect x="0" y="308" width="1600" height="32" />
          <Minaret x={36} baseY={308} width={28} shaftHeight={172} />
          <DomeHall x={92} baseY={308} width={214} bodyHeight={88} domeHeight={76} shoulderHeight={22} />
          <SteppedPalace x={336} baseY={308} width={108} height={108} />
          <Minaret x={474} baseY={308} width={28} shaftHeight={182} />
          <DomeHall x={536} baseY={308} width={258} bodyHeight={100} domeHeight={98} shoulderHeight={24} />
          <Minaret x={822} baseY={308} width={28} shaftHeight={194} />
          <SteppedPalace x={890} baseY={308} width={118} height={102} />
          <DomeHall x={1056} baseY={308} width={218} bodyHeight={84} domeHeight={74} shoulderHeight={20} />
          <Minaret x={1306} baseY={308} width={26} shaftHeight={166} />
          <SteppedPalace x={1370} baseY={308} width={116} height={96} />
          <DomeHall x={1496} baseY={308} width={86} bodyHeight={62} domeHeight={50} shoulderHeight={14} />
        </g>
      </svg>
    </div>
  )
}

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
      <IslamicSkyline />
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
