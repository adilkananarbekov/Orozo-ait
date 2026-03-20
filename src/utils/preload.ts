import { publicPath } from './publicPath'

const SCENE = [
  publicPath('assets/scene/lamp.png'),
  publicPath('assets/scene/crescent.png'),
  publicPath('assets/scene/text-kg.png'),
  publicPath('assets/scene/mosque-desktop.png'),
  publicPath('assets/scene/mosque-mobile.png'),
]

// Keep startup light: below-the-fold sections stay lazy-loaded.
export const PRELOAD_IMAGE_URLS = [...SCENE]

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
