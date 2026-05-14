'use client'

import { useEffect, useRef } from 'react'

/**
 * Updates CSS variables for parallax / section progress.
 * Throttled to one layout pass per frame and caches `.section-progress` nodes
 * (avoids querySelectorAll + many getBoundingClientRect on every raw scroll event).
 */
export function ScrollTracker() {
  const sectionsRef = useRef<HTMLElement[]>([])
  const rafRef = useRef(0)

  useEffect(() => {
    const collect = () => {
      sectionsRef.current = Array.from(
        document.querySelectorAll('.section-progress')
      ) as HTMLElement[]
    }

    collect()
    const t = window.setTimeout(collect, 500)

    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches

    const run = () => {
      const scrollY = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollFraction = docHeight > 0 ? scrollY / docHeight : 0
      document.documentElement.style.setProperty('--scroll', String(scrollFraction))

      if (reduceMotion) return

      const viewportHeight = window.innerHeight
      const sections = sectionsRef.current
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i]
        const rect = section.getBoundingClientRect()
        const sectionHeight = rect.height
        const scrolledInto = viewportHeight - rect.top
        const progress = Math.max(
          0,
          Math.min(1, scrolledInto / (sectionHeight + viewportHeight * 0.5))
        )
        section.style.setProperty('--section-progress', `${progress * 100}%`)
      }
    }

    const onScrollOrResize = () => {
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0
        run()
      })
    }

    const onResize = () => {
      collect()
      onScrollOrResize()
    }

    window.addEventListener('scroll', onScrollOrResize, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })
    onScrollOrResize()

    return () => {
      window.removeEventListener('scroll', onScrollOrResize)
      window.removeEventListener('resize', onResize)
      clearTimeout(t)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return null
}
