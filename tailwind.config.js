/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        void: '#12081f',
        cream: '#f5ecd8',
        coral: '#e8983c',
        gold: '#e6c068',
        mint: '#c89bbf',
        sky: '#9b7ed4',
        night: '#0a0514',
        parchment: '#f8efd4',
        amber: '#f0a850',
        mauve: '#b87da8',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        body: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        hero: '-0.02em',
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
        shimmer: 'shimmer 4s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.55' },
          '50%': { opacity: '1' },
        },
      },
      backgroundImage: {
        'hero-radial':
          'radial-gradient(ellipse 85% 55% at 50% 18%, rgba(232, 152, 60, 0.18) 0%, transparent 52%), radial-gradient(ellipse 70% 50% at 75% 45%, rgba(155, 126, 212, 0.14) 0%, transparent 48%)',
        'festive-sky':
          'linear-gradient(165deg, #2a1450 0%, #1a0a32 28%, #12081f 55%, #0d0618 100%)',
      },
      boxShadow: {
        gold: '0 0 40px rgba(230, 192, 104, 0.35)',
        bloom: '0 0 60px rgba(232, 184, 74, 0.25), 0 0 120px rgba(139, 90, 168, 0.2)',
      },
    },
  },
  plugins: [],
}
