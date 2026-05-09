'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface PromoStripProps {
  visible: boolean
  onDismiss: () => void
}

export function PromoStrip({ visible, onDismiss }: PromoStripProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 right-0 z-[60] h-10 bg-gradient-to-r from-[#b8860b] via-[#d4a017] to-[#b8860b] overflow-hidden shimmer-sweep"
        >
          <div className="flex items-center justify-center h-10 px-4">
            <p className="text-sm sm:text-base font-medium text-black text-center">
              🔥 LIMITED OFFER: First Month 20% OFF — Use Code <span className="font-bold">AVENGER20</span> | Free Trial Available
            </p>
            <button
              onClick={onDismiss}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-black/60 hover:text-black transition-colors"
              aria-label="Dismiss"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
