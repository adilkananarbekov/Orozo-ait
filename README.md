# Kurman Ait Congrats

A festive greeting page for Kurman Ait, written in Kyrgyz. It is a single-page site with no backend, built with React, TypeScript and Vite, and animated with GSAP as you scroll.

**Live:** https://congrats.adilkan.com/

## What is on the page

1. **Loading screen.** Shows progress while the fonts and hero images preload, then slides away.
2. **Hero.** A night scene with swinging lamps, a crescent, a mosque silhouette (separate desktop and mobile images) and twinkling stars, plus the greeting and a button that jumps to the photo section. On desktop the scene follows the pointer, and parts of it move at different speeds as you scroll.
3. **Festive marquee.** A running line of greetings. From 768 px wide a second row runs in the opposite direction.
4. **Story reel.** Six photo frames. On scroll each one is revealed with a wipe, and the photo inside moves slower than the page.
5. **Blessings.** Six blessing cards. Each opens a dialog with the full text, which closes with `Esc`, the close button or a click outside.
6. **Final blessing.** A closing panel with buttons back to the top and to the photos.

Behind everything there is an SVG skyline of domes and minarets that slides down and fades near the end of the page, side ornaments and a light grain filter.

## Features

- **Scroll animations.** GSAP and ScrollTrigger, used through the `useGSAP` hook from `@gsap/react`.
- **Reduced motion.** With `prefers-reduced-motion: reduce`, the loading screen is skipped and elements appear in their final state without animation.
- **Mobile performance mode.** At widths of 820 px or less, or on touch-only devices, the page uses fewer stars and particles and simpler reveal animations. Pointer parallax and the "magnetic" buttons are also turned off.
- **Magnetic buttons.** On desktop, buttons follow the pointer slightly.
- **Self-hosted fonts.** Bricolage Grotesque and Space Grotesk, installed through Fontsource.
- **Kyrgyz page setup.** `lang="ky"`, a Kyrgyz description, Open Graph tags and a canonical URL.

## Tech stack

- React 18, TypeScript 5, Vite 5 (with `vite-imagetools`)
- Tailwind CSS 3
- GSAP 3, `@gsap/react`, ScrollTrigger
- Fontsource fonts
- nginx config for self-hosting and a GitHub Actions workflow for GitHub Pages

The repository also contains a Three.js moon scene: `src/components/MoonScene.tsx`, built on `@react-three/fiber` and `@react-three/drei`, together with `public/models/moon.glb`. The current page does not render it.

## Run locally

You need Node.js and npm. The Pages workflow builds with Node 20.

```bash
git clone https://github.com/adilkananarbekov/Orozo-ait.git
cd Orozo-ait
npm install
npm run dev        # dev server, http://localhost:5173 by default
```

Other scripts:

```bash
npm run build      # type-check (tsc --noEmit) and build into dist/
npm run preview    # serve the built dist/ locally
```

By default the site is built for the domain root (`/`). To serve it from a sub-path, set `SITE_BASE`:

```bash
SITE_BASE=/Orozo-ait/ npm run build
```

## Deployment

### Own server (congrats.adilkan.com)

1. Build with `npm run build`.
2. Upload the contents of `dist/` to `/var/www/congrats-adilkan`.
3. Install `nginx/congrats-adilkan.conf`. It serves the single-page app with an `index.html` fallback, caches static files for 30 days and adds `X-Content-Type-Options` and `Referrer-Policy` headers. The file covers plain HTTP on port 80 only. TLS is not part of it.
4. Point the DNS record for `congrats.adilkan.com` to the server.

### GitHub Pages

`.github/workflows/deploy-pages.yml` builds the site and deploys `dist/` on every push to `main`. GitHub Pages serves this project from `/Orozo-ait/`, so the build step needs `SITE_BASE=/Orozo-ait/`. The workflow does not set it at the moment.

## Asset helper scripts

Two PowerShell scripts (Windows) can refill the photo folders. Both overwrite existing files in `public/assets/story/` and `public/assets/blessings/`.

- `npm run assets:placeholders` writes gradient placeholder JPEGs.
- `npm run assets:fetch` downloads sample photos from picsum.photos.

## Project structure

```
src/
  sections/     Hero, WonderMarquee, StoryReel, BlessingsGrid, FinalBlessing
  components/   BootGate and LoadingScreen, Marquee, BlessingPanel, MagneticButton,
                MoonScene (not used on the page)
  hooks/        reduced-motion and mobile-performance media queries
  utils/        GSAP setup, image preloading, public path helper
public/
  assets/       scene, story and blessing images
  models/       moon.glb
nginx/          server config for congrats.adilkan.com
.github/        GitHub Pages workflow
```

## Credits

- **Moon model** (`public/models/moon.glb`): "Moon" by AirStudios on Sketchfab, licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Source page: `sketchfab.com/3d-models/moon-75c46b8b71ce4b23bb2acb7982fa652c`. The title, author, licence and source are taken from the metadata stored inside the `.glb` file.

## Author

Adilkan Anarbekov, web and Flutter developer from Bishkek, Kyrgyzstan.

- Website: https://adilkan.com
- GitHub: https://github.com/adilkananarbekov
- Telegram: [@Adilkan_07](https://t.me/Adilkan_07)
- Email: adilkananarbekov751@gmail.com
