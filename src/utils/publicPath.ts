/** Public folder URL (honors Vite `base`, e.g. GitHub Pages `/Orozo-ait/`). */
export function publicPath(relativeFromPublic: string): string {
  const base = import.meta.env.BASE_URL
  const path = relativeFromPublic.replace(/^\/+/, '')
  return `${base}${path}`
}
