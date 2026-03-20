import { publicPath } from './publicPath'

const STORY = Array.from({ length: 6 }, (_, i) =>
  publicPath(`assets/story/shot-${String(i + 1).padStart(2, '0')}.jpg`),
)
const BLESSINGS = Array.from({ length: 6 }, (_, i) =>
  publicPath(`assets/blessings/blessing-${String(i + 1).padStart(2, '0')}.jpg`),
)
const SCENE = [
  publicPath('assets/scene/lamp.png'),
  publicPath('assets/scene/crescent.png'),
  publicPath('assets/scene/text-kg.png'),
  publicPath('assets/scene/mosque-desktop.png'),
  publicPath('assets/scene/mosque-mobile.png'),
]

export const PRELOAD_IMAGE_URLS = [...SCENE, ...STORY, ...BLESSINGS]

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
