'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function LoadingSplash() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Splash is disabled for QA - re-enable by setting showSplash to true
    const showSplash = false

    if (!showSplash) return

    // Check if splash was seen recently (within 1 day)
    const seen = localStorage.getItem('forge-splash-seen')
    if (seen) {
      const seenTime = parseInt(seen, 10)
      const oneDayMs = 24 * 60 * 60 * 1000
      if (Date.now() - seenTime < oneDayMs) {
        return // Skip splash
      }
    }

    // Defer setState to next frame to avoid synchronous setState in effect
    const rafId = requestAnimationFrame(() => {
      setVisible(true)
    })

    const timer = setTimeout(() => {
      setVisible(false)
      localStorage.setItem('forge-splash-seen', Date.now().toString())
    }, 2500)

    return () => {
      cancelAnimationFrame(rafId)
      clearTimeout(timer)
    }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] bg-[#0a0a0a] flex items-center justify-center"
        >
          <div className="flex flex-col items-center">
            {/* AVENGER text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
              className="text-5xl sm:text-7xl md:text-8xl font-black tracking-[0.15em] text-white"
            >
              AVENGER
            </motion.div>

            {/* Gold line sweep */}
            <div className="w-48 sm:w-64 md:w-80 h-[2px] bg-[#2a2a2a] mt-4 mb-4 relative overflow-hidden">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.7 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d4a017] to-transparent"
              />
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.8 }}
                className="absolute inset-0 bg-gradient-to-r from-[#d4a017] via-[#e8b923] to-[#d4a017] origin-left"
              />
            </div>

            {/* FITNESS text */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 1.2 }}
              className="text-2xl sm:text-3xl md:text-4xl font-light tracking-[0.6em] text-[#d4a017]"
            >
              FITNESS
            </motion.div>

            {/* Subtle glow effect */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: [0, 0.15, 0.05], scale: 1 }}
              transition={{ duration: 1.5, ease: 'easeOut', delay: 0.5 }}
              className="absolute w-96 h-96 rounded-full bg-[#d4a017]/10 blur-[100px] pointer-events-none"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
