# Orozo Ait — Immersive Wonder Scroll

Backend-free Vite + React + TypeScript single-page scroll experience: Russian copy, full-screen **boot loader** (fonts + images + moon GLB + first WebGL frame), cosmic hero with R3F moon, GSAP choreography, story reel, blessing cards, and a closing glass panel.

## Quick start

```bash
cd orozo-ait
npm install
npm run dev
```

## Create from scratch (reference)

```bash
npm create vite@latest orozo-ait -- --template react-ts
cd orozo-ait
npm install @fontsource/bricolage-grotesque @fontsource/space-grotesk @gsap/react gsap @react-three/fiber @react-three/drei three
npm install -D tailwindcss postcss autoprefixer typescript vite @vitejs/plugin-react vite-imagetools @types/three
npx tailwindcss init -p
```

Copy this repo’s `src/`, `public/`, config files, and `index.html`.

## Fonts & assets

- **Fonts:** Bricolage Grotesque + Space Grotesk via `@fontsource/*` (Latin-focused subsets; Cyrillic may fall back to the system UI font — add a Cyrillic `@fontsource` family if you want full control).
- **Images:** `public/assets/story/shot-01.jpg` … `shot-06.jpg` and `public/assets/blessings/blessing-01.jpg` … `blessing-06.jpg`.
- **Fetch curated photos + moon:** `npm run assets:fetch` (PowerShell + `curl`) pulls deterministic [Picsum](https://picsum.photos) crops and copies `../moon.glb` into `public/models/` when present.
- **3D:** `public/models/moon.glb` — auto-scaled to a consistent size. If loading fails, a procedural moon is used.
- **Placeholders:** `npm run assets:placeholders` — local gradient JPEGs (Windows + System.Drawing).

## Scripts

| Command        | Description              |
| -------------- | ------------------------ |
| `npm run dev`  | Vite dev server          |
| `npm run build`| `tsc --noEmit` + `vite build` |
| `npm run preview` | Preview production build |
| `npm run assets:fetch` | Download Picsum story/blessing images + copy `moon.glb` |
| `npm run assets:placeholders` | Generate local placeholder JPEGs |

## Stack

- Vite 5, React 18, TypeScript 5
- Tailwind CSS 3.4+
- GSAP 3 + `@gsap/react` + ScrollTrigger
- `@react-three/fiber`, `@react-three/drei`, Three.js

## Visual verification (run `npm run dev`)

1. Hero: dark gradients, rotating conic ring, lens-style radial glow, five drifting orbs, staggered title/pills, magnetic CTA, pulsing scroll chevron.
2. **Wonder** marquee scrolls infinitely with edge fades (disabled under `prefers-reduced-motion`).
3. Story: six panels with parallax scrub, alternating clip-path reveals at `top 86%`, gradient veils.
4. Blessings: six glass cards; click opens modal with unique copy; stagger on scroll.
5. Final section: large frosted panel with closing copy.
6. **Moon:** rotates gently, follows pointer; on coarse pointers, gyro may apply (where the browser allows).
7. Toggle OS “reduce motion”: looping GSAP/orb drift/marquee/3D motion ease down or stop.
8. DevTools console: no errors (with valid assets; missing `moon.glb` uses procedural moon without failing the app).
