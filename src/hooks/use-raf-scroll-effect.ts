'use client'

import { useEffect, useRef } from 'react'

/**
 * Runs the callback at most once per animation frame during scroll or resize.
 * Reduces main-thread work when many components listen to scroll.
 */
export function useRafScrollEffect(effect: () => void) {
  const cb = useRef(effect)
  cb.current = effect
  const rafRef = useRef(0)

  useEffect(() => {
    const tick = () => {
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0
        cb.current()
      })
    }

    window.addEventListener('scroll', tick, { passive: true })
    window.addEventListener('resize', tick, { passive: true })
    tick()

    return () => {
      window.removeEventListener('scroll', tick)
      window.removeEventListener('resize', tick)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])
}
