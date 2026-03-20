import { useEffect, useState } from 'react'

const QUERY = '(max-width: 820px), (hover: none) and (pointer: coarse)'

const getMatch = () => typeof window !== 'undefined' && window.matchMedia(QUERY).matches

export function useMobilePerformanceMode() {
  const [mobileMode, setMobileMode] = useState(getMatch)

  useEffect(() => {
    const media = window.matchMedia(QUERY)
    const onChange = () => setMobileMode(media.matches)

    setMobileMode(media.matches)

    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', onChange)
      return () => media.removeEventListener('change', onChange)
    }

    media.addListener(onChange)
    return () => media.removeListener(onChange)
  }, [])

  return mobileMode
}
