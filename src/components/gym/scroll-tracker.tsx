'use client'

import { useEffect } from 'react'

/**
 * Tracks scroll position and updates CSS custom properties used for
 * parallax effects on section numbers and section progress indicators.
 */
export function ScrollTracker() {
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollFraction = docHeight > 0 ? scrollY / docHeight : 0

      document.documentElement.style.setProperty('--scroll', String(scrollFraction))

      // Update section progress indicators
      const progressSections = document.querySelectorAll('.section-progress')
      progressSections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        const sectionHeight = rect.height
        const viewportHeight = window.innerHeight

        // Calculate how much of the section has been scrolled through
        const scrolledInto = viewportHeight - rect.top
        const progress = Math.max(0, Math.min(1, scrolledInto / (sectionHeight + viewportHeight * 0.5)))

        ;(section as HTMLElement).style.setProperty('--section-progress', `${progress * 100}%`)
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial call

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return null
}
