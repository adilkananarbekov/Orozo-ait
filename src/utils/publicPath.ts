/** Public folder URL (honors Vite `base`, e.g. root domain deployment). */
export function publicPath(relativeFromPublic: string): string {
  const base = import.meta.env.BASE_URL
  const path = relativeFromPublic.replace(/^\/+/, '')
  return `${base}${path}`
}
