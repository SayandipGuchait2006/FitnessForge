'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

const STORAGE_KEY = 'forge-cookie-consent'

export function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem(STORAGE_KEY)
    if (!consent) {
      // Show after a longer delay so it doesn't interrupt initial browsing
      const timer = setTimeout(() => {
        setVisible(true)
      }, 6000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem(STORAGE_KEY, 'accepted')
    setVisible(false)
  }

  const handleDecline = () => {
    localStorage.setItem(STORAGE_KEY, 'declined')
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 sm:left-6 sm:translate-x-0 sm:w-[400px] z-[55]"
        >
          <div className="relative flex flex-col gap-3 rounded-2xl border border-[#d4a017]/20 bg-[#0f0f0f]/98 backdrop-blur-2xl px-5 py-4 shadow-2xl shadow-black/60">
            {/* Close X button */}
            <button
              onClick={handleDecline}
              className="absolute top-3 right-3 flex h-6 w-6 items-center justify-center rounded-md text-neutral-600 transition-colors hover:bg-white/[0.06] hover:text-white"
              aria-label="Close"
            >
              <X className="h-3.5 w-3.5" />
            </button>

            {/* Icon + Message */}
            <div className="flex items-start gap-3 pr-6">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#d4a017]/10 border border-[#d4a017]/20">
                <Shield className="h-4.5 w-4.5 text-[#e8b923]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white leading-snug">Your Privacy Matters</p>
                <p className="text-xs text-neutral-400 leading-relaxed mt-1">
                  We use cookies to enhance your experience and analyze site traffic. By continuing, you agree to our{' '}
                  <span className="text-[#e8b923] font-medium underline underline-offset-2 cursor-pointer hover:text-[#f0c040] transition-colors">
                    cookie policy
                  </span>.
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-2 pl-12">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDecline}
                className="border-white/[0.15] text-neutral-400 hover:bg-white/[0.04] hover:text-neutral-200 hover:border-white/[0.25] text-xs px-4 h-8 rounded-lg transition-all duration-200"
              >
                Decline
              </Button>
              <Button
                size="sm"
                onClick={handleAccept}
                className="bg-gradient-to-r from-[#d4a017] to-[#e8b923] text-black font-bold hover:opacity-90 text-xs px-5 h-8 rounded-lg shadow-lg shadow-[#d4a017]/15 transition-all duration-200"
              >
                Accept All
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
