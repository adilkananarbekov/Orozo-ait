import { useGSAP } from '@gsap/react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { BootContext } from '../context/BootContext'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { preloadSiteAssets } from '../utils/preload'
import { gsap, ScrollTrigger } from '../utils/gsapContext'
import { LoadingScreen } from './LoadingScreen'

export function BootGate({ children }: { children: React.ReactNode }) {
  const reduced = usePrefersReducedMotion()
  const [assetProgress, setAssetProgress] = useState(0)
  const [assetsDone, setAssetsDone] = useState(false)
  const [webglDone, setWebglDone] = useState(false)
  const [minDone, setMinDone] = useState(false)
  const [loaderMounted, setLoaderMounted] = useState(true)
  const [introEnabled, setIntroEnabled] = useState(() => reduced)

  const loaderRef = useRef<HTMLDivElement>(null)
  const webglReported = useRef(false)

  const markWebGLReady = useCallback(() => {
    if (webglReported.current) return
    webglReported.current = true
    setWebglDone(true)
  }, [])

  useEffect(() => {
    if (reduced) return
    document.documentElement.style.overflow = introEnabled ? '' : 'hidden'
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [introEnabled, reduced])

  useEffect(() => {
    if (reduced) {
      setAssetsDone(true)
      setWebglDone(true)
      setMinDone(true)
      setAssetProgress(100)
      setIntroEnabled(true)
      setLoaderMounted(false)
      return
    }

    let cancelled = false
    ;(async () => {
      await preloadSiteAssets((t) => {
        if (!cancelled) setAssetProgress(Math.round(t * 78))
      })
      if (!cancelled) {
        setAssetsDone(true)
        setAssetProgress((p) => Math.max(p, 78))
      }
    })()

    const tMin = window.setTimeout(() => setMinDone(true), 1500)
    return () => {
      cancelled = true
      window.clearTimeout(tMin)
    }
  }, [reduced])

  useEffect(() => {
    if (reduced) return
    if (webglDone) setAssetProgress((p) => Math.max(p, 94))
  }, [reduced, webglDone])

  const canExit = assetsDone && webglDone && minDone

  const displayProgress = useMemo(() => {
    if (reduced) return 100
    if (!assetsDone) return assetProgress
    if (!webglDone) return Math.max(assetProgress, 82)
    return 100
  }, [reduced, assetProgress, assetsDone, webglDone])

  useGSAP(
    () => {
      if (!canExit || reduced) {
        if (canExit && reduced && loaderRef.current) {
          gsap.set(loaderRef.current, { display: 'none' })
          setLoaderMounted(false)
          setIntroEnabled(true)
        }
        return
      }
      const el = loaderRef.current
      if (!el) return
      const tl = gsap.timeline({
        onComplete: () => {
          setLoaderMounted(false)
          setIntroEnabled(true)
          requestAnimationFrame(() => ScrollTrigger.refresh())
        },
      })
      tl.to(el, {
        yPercent: -100,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.inOut',
        delay: 0.12,
      })
      return () => {
        tl.kill()
      }
    },
    { dependencies: [canExit, reduced] },
  )

  const ctxValue = useMemo(
    () => ({
      introEnabled,
      markWebGLReady,
    }),
    [introEnabled, markWebGLReady],
  )

  return (
    <BootContext.Provider value={ctxValue}>
      {children}
      {loaderMounted && !reduced && <LoadingScreen ref={loaderRef} progress={displayProgress} />}
    </BootContext.Provider>
  )
}
