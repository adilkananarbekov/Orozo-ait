import { useCallback, useEffect, useRef, useState } from 'react'

export type GyroTilt = { x: number; y: number; supported: boolean }

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v))

export function useGyro(enabled: boolean) {
  const [tilt, setTilt] = useState<GyroTilt>({ x: 0, y: 0, supported: false })
  const raf = useRef<number>(0)

  const handle = useCallback((e: DeviceOrientationEvent) => {
    if (e.gamma == null || e.beta == null) return
    const gx = clamp(e.gamma / 45, -1, 1)
    const gy = clamp((e.beta - 45) / 45, -1, 1)
    if (raf.current) cancelAnimationFrame(raf.current)
    raf.current = requestAnimationFrame(() => {
      setTilt({ x: gx, y: gy, supported: true })
    })
  }, [])

  useEffect(() => {
    if (!enabled) return

    const DeviceOrientationEventMaybe = window.DeviceOrientationEvent as
      | (typeof DeviceOrientationEvent & {
          requestPermission?: () => Promise<'granted' | 'denied'>
        })
      | undefined

    const requestPermission = DeviceOrientationEventMaybe?.requestPermission

    const start = () => {
      if (!('DeviceOrientationEvent' in window)) return
      window.addEventListener('deviceorientation', handle, true)
    }

    if (typeof requestPermission === 'function') {
      requestPermission()
        .then((status) => {
          if (status === 'granted') start()
        })
        .catch(() => {
          /* denied or unavailable */
        })
    } else {
      start()
    }

    return () => {
      window.removeEventListener('deviceorientation', handle, true)
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [enabled, handle])

  return tilt
}
