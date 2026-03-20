const STORY = Array.from({ length: 6 }, (_, i) => `/assets/story/shot-${String(i + 1).padStart(2, '0')}.jpg`)
const BLESSINGS = Array.from({ length: 6 }, (_, i) => `/assets/blessings/blessing-${String(i + 1).padStart(2, '0')}.jpg`)

export const PRELOAD_IMAGE_URLS = [...STORY, ...BLESSINGS]

export const MOON_MODEL_URL = '/models/moon.glb'

function loadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = () => resolve()
    img.src = src
  })
}

function loadMoonModel(url: string): Promise<void> {
  return fetch(url, { method: 'GET', cache: 'force-cache' })
    .then((r) => {
      if (!r.ok) throw new Error('moon')
      return r.arrayBuffer()
    })
    .then(() => undefined)
    .catch(() => undefined)
}

export async function preloadSiteAssets(onProgress?: (t: number) => void): Promise<void> {
  if (typeof document !== 'undefined' && document.fonts?.ready) {
    await document.fonts.ready
  }

  const urls = [...PRELOAD_IMAGE_URLS, MOON_MODEL_URL]
  let done = 0
  const tick = () => {
    done += 1
    onProgress?.(done / urls.length)
  }

  await Promise.all(
    PRELOAD_IMAGE_URLS.map((src) =>
      loadImage(src).then(() => {
        tick()
      }),
    ),
  )

  await loadMoonModel(MOON_MODEL_URL).then(tick)
}
