# Kurman Ait Congrats

Backend-free Vite + React + TypeScript single-page greeting for Kurman Ait. The site keeps the immersive festive scene, GSAP scroll choreography, blessing cards, story reel, and closing glass panel, with production deployment intended for `https://congrats.adilkan.com/`.

## Quick Start

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The generated `dist/` folder is ready to upload to `/var/www/congrats-adilkan`.

## Deployment

1. Build locally with `npm run build`.
2. Upload the contents of `dist/` to `/var/www/congrats-adilkan`.
3. Install `nginx/congrats-adilkan.conf` on the server.
4. Ensure DNS points `congrats.adilkan.com` to the server.

## Stack

- Vite 5, React 18, TypeScript 5
- Tailwind CSS 3.4+
- GSAP 3 + `@gsap/react` + ScrollTrigger
- `@react-three/fiber`, `@react-three/drei`, Three.js
