import { publicPath } from './publicPath'

// Keep startup light on mobile: below-the-fold cards and story images stay lazy-loaded.
export const PRELOAD_IMAGE_URLS = [publicPath('assets/moodboard-hero.png')]

function loadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = () => resolve()
    img.src = src
  })
}

export async function preloadSiteAssets(onProgress?: (t: number) => void): Promise<void> {
  if (typeof document !== 'undefined' && document.fonts?.ready) {
    await document.fonts.ready
  }

  let done = 0
  const tick = () => {
    done += 1
    onProgress?.(done / PRELOAD_IMAGE_URLS.length)
  }

  await Promise.all(
    PRELOAD_IMAGE_URLS.map((src) =>
      loadImage(src).then(() => {
        tick()
      }),
    ),
  )
}
