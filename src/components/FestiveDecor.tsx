import { useId } from 'react'

type FestiveDecorProps = {
  className?: string
}

export function FestiveDecor({ className = '' }: FestiveDecorProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      <svg
        className="absolute left-0 right-0 top-0 h-[18%] w-full opacity-80 md:h-[22%]"
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="wireGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3d2a5c" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#e8c547" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#3d2a5c" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <path
          d="M0,40 Q300,8 600,42 T1200,38"
          fill="none"
          stroke="url(#wireGrad)"
          strokeWidth="1.2"
          className="drop-shadow-[0_0_8px_rgba(232,197,71,0.5)]"
        />
        {[80, 200, 360, 520, 680, 840, 1000, 1120].map((x, i) => (
          <circle
            key={i}
            cx={x}
            cy={38 + Math.sin(i * 0.7) * 6}
            r={i % 2 === 0 ? 2.2 : 1.6}
            fill="#f5d77a"
            className="opacity-90"
            style={{ filter: 'drop-shadow(0 0 4px rgba(252, 220, 120, 0.95))' }}
          />
        ))}
      </svg>

      <Lantern className="festive-lantern left-[4%] top-[14%] h-24 w-16 md:left-[6%] md:top-[16%] md:h-32 md:w-20" />
      <Lantern className="festive-lantern right-[5%] top-[20%] h-20 w-14 md:right-[8%] md:top-[22%] md:h-28 md:w-[4.5rem]" />
      <Lantern className="festive-lantern bottom-[28%] left-[8%] h-[4.5rem] w-14 opacity-90 md:bottom-[30%]" />
      <Lantern className="festive-lantern bottom-[32%] right-[10%] h-24 w-16 opacity-85" />

      <div className="absolute inset-x-0 bottom-0 h-[min(38vh,320px)] bg-gradient-to-t from-[#0a0514] via-[#12081f]/90 to-transparent" />

      <svg
        className="absolute bottom-0 left-1/2 w-[min(140%,900px)] -translate-x-1/2 text-[#080410] opacity-[0.92]"
        style={{ filter: 'drop-shadow(0 -12px 40px rgba(232, 180, 90, 0.15))' }}
        viewBox="0 0 800 160"
        preserveAspectRatio="xMidYMax meet"
      >
        <defs>
          <linearGradient id="mosqueRim" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2a1f3d" />
            <stop offset="100%" stopColor="#0a0512" />
          </linearGradient>
        </defs>
        <path
          fill="url(#mosqueRim)"
          d="M0,160 L0,95 L35,95 L35,55 L50,55 L50,95 L120,95 L120,70 L135,45 L150,70 L150,95 L220,95 L220,50 L235,35 L250,50 L250,95 L310,95 L310,65 L340,38 L370,65 L370,95 L430,95 L430,50 L445,35 L460,50 L460,95 L520,95 L520,70 L535,48 L550,70 L550,95 L620,95 L620,55 L635,55 L635,95 L680,95 L680,75 L695,55 L710,75 L710,95 L800,95 L800,160 Z"
        />
        <ellipse cx="340" cy="38" rx="42" ry="36" fill="#0d0818" opacity="0.95" />
        <ellipse cx="445" cy="35" rx="38" ry="32" fill="#0d0818" opacity="0.95" />
        <ellipse cx="535" cy="48" rx="28" ry="24" fill="#0d0818" opacity="0.95" />
      </svg>
    </div>
  )
}

function Lantern({ className }: { className: string }) {
  const uid = useId().replace(/:/g, '')
  const gid = `lg-${uid}`
  const fid = `lf-${uid}`
  return (
    <div className={`absolute ${className}`}>
      <svg viewBox="0 0 64 96" className="h-full w-full overflow-visible">
        <defs>
          <filter id={fid} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id={gid} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff2c4" />
            <stop offset="45%" stopColor="#e8b84a" />
            <stop offset="100%" stopColor="#b8860f" />
          </linearGradient>
        </defs>
        <line x1="32" y1="0" x2="32" y2="14" stroke="#c9a227" strokeWidth="1.5" opacity="0.7" />
        <path
          d="M32,14 L44,22 L44,52 C44,64 38,72 32,76 C26,72 20,64 20,52 L20,22 Z"
          fill={`url(#${gid})`}
          filter={`url(#${fid})`}
          opacity="0.92"
        />
        <path
          d="M24,32 L40,32 M24,42 L40,42 M24,52 L40,52"
          stroke="#5c3d1e"
          strokeWidth="0.8"
          opacity="0.35"
        />
        <path d="M26,76 L32,88 L38,76" fill="#8b6914" opacity="0.9" />
      </svg>
    </div>
  )
}
