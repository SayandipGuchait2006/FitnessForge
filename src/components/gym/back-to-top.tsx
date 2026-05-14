'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { useRafScrollEffect } from '@/hooks/use-raf-scroll-effect'

export function BackToTop() {
  const [visible, setVisible] = useState(false)
  const lastVisible = useRef(false)

  useRafScrollEffect(() => {
    const next = window.scrollY > 500
    if (next !== lastVisible.current) {
      lastVisible.current = next
      setVisible(next)
    }
  })

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          className="fixed bottom-24 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-[#1a1a1a] border border-white/[0.1] text-[#d4a017] shadow-lg hover:bg-[#d4a017] hover:text-black hover:border-[#d4a017] hover:scale-110 hover:shadow-xl hover:shadow-[#d4a017]/30 transition-all duration-300"
          aria-label="Back to top"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
