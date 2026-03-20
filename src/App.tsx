import type { CSSProperties } from 'react'
import { BlessingsGrid } from './sections/BlessingsGrid'
import { FinalBlessing } from './sections/FinalBlessing'
import { Hero } from './sections/Hero'
import { StoryReel } from './sections/StoryReel'
import { WonderMarquee } from './sections/WonderMarquee'

const SIDE_PATTERN_MARKS = [
  { top: '11%', size: '1rem' },
  { top: '24%', size: '0.76rem' },
  { top: '38%', size: '0.98rem' },
  { top: '52%', size: '0.6rem' },
  { top: '67%', size: '1rem' },
  { top: '82%', size: '0.84rem' },
] as const

type OrnamentSide = 'left' | 'right'

function Yurt({
  x,
  y,
  scale = 1,
  opacity = 1,
}: {
  x: number
  y: number
  scale?: number
  opacity?: number
}) {
  const transform = `translate(${x} ${y}) scale(${scale})`

  return (
    <g transform={transform} opacity={opacity}>
      <path
        d="M0 36 C16 8 50 8 66 36 V58 H0 Z"
        fill="currentColor"
        fillOpacity="0.95"
      />
      <path d="M8 34 C22 18 44 18 58 34" stroke="rgba(246, 221, 154, 0.12)" strokeWidth="2.5" />
      <rect x="27" y="37" width="12" height="21" rx="4" fill="rgba(10, 8, 16, 0.42)" />
      <path d="M4 58 H62" stroke="rgba(246, 221, 154, 0.08)" strokeWidth="2.5" />
    </g>
  )
}

function Poplar({
  x,
  y,
  scale = 1,
  opacity = 1,
}: {
  x: number
  y: number
  scale?: number
  opacity?: number
}) {
  const transform = `translate(${x} ${y}) scale(${scale})`

  return (
    <g transform={transform} opacity={opacity}>
      <rect x="14" y="34" width="4" height="20" rx="2" fill="rgba(18, 11, 27, 0.72)" />
      <path
        d="M16 0 C6 8 3 20 8 32 C10 38 12 44 16 54 C20 44 22 38 24 32 C29 20 26 8 16 0 Z"
        fill="currentColor"
      />
      <path
        d="M16 7 C10 14 8 23 11 31 C12 35 13 39 16 47 C19 39 20 35 21 31 C24 23 22 14 16 7 Z"
        fill="rgba(246, 221, 154, 0.08)"
      />
    </g>
  )
}

function Tulip({
  x,
  y,
  scale = 1,
  rotate = 0,
}: {
  x: number
  y: number
  scale?: number
  rotate?: number
}) {
  const transform = `translate(${x} ${y}) rotate(${rotate}) scale(${scale})`

  return (
    <g transform={transform}>
      <path d="M4 0 C5 10 5 16 4 24" stroke="rgba(129, 161, 88, 0.45)" strokeWidth="1.8" />
      <path
        d="M4 1 C1 4 0 8 1 12 C2 11 3 10 4 8 C5 10 6 11 7 12 C8 8 7 4 4 1 Z"
        fill="rgba(224, 141, 66, 0.34)"
      />
    </g>
  )
}

function NooruzHorizon() {
  return (
    <div className="global-backdrop__skyline" aria-hidden>
      <svg
        className="skyline skyline--rear"
        style={{ color: 'rgba(33, 29, 48, 0.9)' }}
        viewBox="0 0 1600 320"
        preserveAspectRatio="none"
      >
        <path
          d="M0 248 L84 204 L138 218 L228 126 L318 210 L420 102 L520 198 L632 72 L760 212 L868 110 L1002 202 L1114 86 L1240 214 L1334 142 L1450 216 L1600 168 V320 H0 Z"
          fill="currentColor"
        />
        <path
          d="M0 274 L122 232 L210 246 L334 176 L438 248 L560 192 L662 256 L796 172 L922 246 L1060 196 L1174 264 L1300 212 L1428 258 L1600 230 V320 H0 Z"
          fill="rgba(63, 80, 61, 0.46)"
        />
      </svg>

      <svg
        className="skyline skyline--front"
        style={{ color: 'rgba(28, 21, 40, 0.96)' }}
        viewBox="0 0 1600 320"
        preserveAspectRatio="none"
      >
        <path
          d="M0 252 C90 238 186 246 264 256 C344 268 420 266 508 246 C620 220 704 214 802 242 C888 268 964 268 1062 244 C1168 216 1254 214 1348 240 C1432 262 1510 262 1600 246 V320 H0 Z"
          fill="currentColor"
        />
        <path
          d="M0 276 C90 266 170 272 256 284 C330 294 410 296 496 278 C618 252 706 250 808 280 C896 306 984 302 1088 278 C1194 252 1286 248 1390 270 C1460 286 1528 288 1600 278 V320 H0 Z"
          fill="rgba(51, 70, 52, 0.72)"
        />

        <Yurt x={150} y={218} scale={1.35} opacity={0.92} />
        <Yurt x={454} y={228} scale={1.08} opacity={0.72} />
        <Yurt x={980} y={221} scale={1.26} opacity={0.88} />
        <Yurt x={1328} y={230} scale={1.06} opacity={0.72} />

        <Poplar x={94} y={212} scale={1.02} opacity={0.92} />
        <Poplar x={368} y={214} scale={0.9} opacity={0.72} />
        <Poplar x={632} y={220} scale={0.98} opacity={0.8} />
        <Poplar x={820} y={216} scale={1.08} opacity={0.9} />
        <Poplar x={1186} y={214} scale={0.94} opacity={0.78} />
        <Poplar x={1490} y={218} scale={0.9} opacity={0.68} />

        <Tulip x={270} y={262} scale={1.45} rotate={-4} />
        <Tulip x={286} y={268} scale={1.1} rotate={6} />
        <Tulip x={708} y={258} scale={1.3} rotate={-7} />
        <Tulip x={725} y={266} scale={1} rotate={4} />
        <Tulip x={1146} y={260} scale={1.4} rotate={5} />
        <Tulip x={1164} y={268} scale={1.08} rotate={-5} />

        <path
          d="M0 292 H1600"
          stroke="rgba(246, 221, 154, 0.06)"
          strokeWidth="2"
          strokeDasharray="2 12"
        />
      </svg>
    </div>
  )
}

function GlobalGrain() {
  return (
    <svg className="absolute h-0 w-0" aria-hidden focusable="false">
      <filter id="lux-noise-filter">
        <feTurbulence type="fractalNoise" baseFrequency="0.95" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
        <feComponentTransfer>
          <feFuncA type="table" tableValues="0 0.55" />
        </feComponentTransfer>
      </filter>
    </svg>
  )
}

function SideOrnament({ side }: { side: OrnamentSide }) {
  return (
    <div className={`side-ornament side-ornament--${side}`} aria-hidden>
      <div className="side-ornament__glow" />
      <div className="side-ornament__panel" />
      {SIDE_PATTERN_MARKS.map((mark) => {
        const style = {
          top: mark.top,
          width: mark.size,
          height: mark.size,
        } satisfies CSSProperties

        return <span key={`${side}-${mark.top}`} className="side-ornament__mark" style={style} />
      })}
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(250,198,111,0.14),transparent_28%),radial-gradient(circle_at_22%_42%,rgba(98,136,88,0.12),transparent_24%),radial-gradient(circle_at_78%_46%,rgba(173,112,62,0.12),transparent_26%)]" />
      <NooruzHorizon />
      <div className="global-backdrop__mesh" />
      <div className="global-backdrop__noise lux-noise" />
      <SideOrnament side="left" />
      <SideOrnament side="right" />
    </div>
  )
}

export default function App() {
  return (
    <>
      <GlobalGrain />
      <GlobalBackdrop />
      <main className="relative z-30">
        <Hero />
        <WonderMarquee />
        <StoryReel />
        <BlessingsGrid />
        <FinalBlessing />
        <footer className="relative z-30 border-t border-gold/10 bg-[#0b0511]/88 px-5 py-8 md:px-10">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 text-sm text-cream/65 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-display text-lg font-semibold text-parchment">Нооруз</p>
              <p className="mt-1">Майрамыңыздар жаңылануу жана береке алып келсин</p>
            </div>
            <div className="text-left md:text-right">
              <p className="uppercase tracking-[0.28em] text-gold/75">Көктөм • Береке • Жаңылануу</p>
              <p className="mt-1 text-cream/45">From Anarbekov Adilkan</p>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}
