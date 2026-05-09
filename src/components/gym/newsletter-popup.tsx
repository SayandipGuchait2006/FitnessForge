'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Check, Mail, Diamond } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const STORAGE_KEY = 'forge-newsletter-dismissed'
const COOKIE_KEY = 'forge-cookie-consent'
const EXPIRY_DAYS = 7

function isDismissed(): boolean {
  if (typeof window === 'undefined') return false
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) return false
  try {
    const data = JSON.parse(stored) as { timestamp: number }
    const now = Date.now()
    const expiry = EXPIRY_DAYS * 24 * 60 * 60 * 1000
    return now - data.timestamp < expiry
  } catch {
    return false
  }
}

function setDismissed(): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ timestamp: Date.now() }))
}

export function NewsletterPopup() {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  // Show popup after user scrolls 50% of the page AND cookie consent is resolved
  useEffect(() => {
    if (isDismissed()) return

    const handleScroll = () => {
      if (isDismissed()) return

      // Don't show if cookie consent hasn't been resolved yet
      const cookieConsent = localStorage.getItem(COOKIE_KEY)
      if (!cookieConsent) return

      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight <= 0) return
      const scrollPercent = window.scrollY / docHeight

      if (scrollPercent >= 0.5) {
        setOpen(true)
        window.removeEventListener('scroll', handleScroll)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleDismiss = useCallback(() => {
    setOpen(false)
    setDismissed()
  }, [])

  const handleSubscribe = useCallback(async () => {
    setError('')

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email.trim() || !emailRegex.test(email)) {
      setError('Please enter a valid email address.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      })
      const data = (await res.json()) as { message?: string; error?: string }

      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.')
        return
      }

      setSuccess(true)
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [email])

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) {
        handleDismiss()
      }
    }}>
      <DialogContent
        showCloseButton={false}
        className="sm:max-w-md bg-[#111111]/95 backdrop-blur-xl border-white/[0.08] p-0 overflow-hidden"
      >
        <DialogTitle className="sr-only">Newsletter Subscription</DialogTitle>
        <DialogDescription className="sr-only">Subscribe to the Forge Fitness newsletter for exclusive fitness tips and member-only discounts.</DialogDescription>

        <AnimatePresence mode="wait">
          {success ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="p-8 text-center"
            >
              {/* Animated checkmark */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
                className="w-16 h-16 rounded-full bg-[#d4a017]/20 flex items-center justify-center mx-auto mb-4"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 12, delay: 0.3 }}
                >
                  <Check className="w-8 h-8 text-[#d4a017]" strokeWidth={3} />
                </motion.div>
              </motion.div>
              <h3 className="text-xl font-bold text-white mb-2">Welcome to the family!</h3>
              <p className="text-sm text-gray-400">
                You&apos;re now part of the Avenger community. Check your inbox for a welcome surprise.
              </p>
              <Button
                onClick={handleDismiss}
                className="mt-6 bg-[#d4a017]/20 text-[#d4a017] hover:bg-[#d4a017]/30 border border-[#d4a017]/30 rounded-md"
              >
                Continue Browsing
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Decorative amber gradient line at top */}
              <div className="h-1 w-full bg-gradient-to-r from-[#d4a017] via-[#e8b923] to-[#d4a017]" />

              {/* Decorative sparkle icons */}
              <div className="relative px-8 pt-8">
                <Sparkles className="absolute top-6 right-8 w-4 h-4 text-[#d4a017]/30" />
                <Diamond className="absolute top-12 left-6 w-3 h-3 text-[#e8b923]/20" />

                {/* Heading */}
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                  JOIN THE <span className="text-[#d4a017]">AVENGER</span> FAMILY
                </h3>

                {/* Subtext */}
                <p className="mt-3 text-sm text-gray-400 leading-relaxed">
                  Get exclusive fitness tips, early access to new classes, and member-only discounts delivered to your inbox.
                </p>

                {/* Email input */}
                <div className="mt-6 relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      setError('')
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSubscribe()
                    }}
                    className="pl-10 h-11 bg-[#0a0a0a]/50 border-white/10 text-white placeholder:text-gray-600 rounded-md focus-visible:border-[#d4a017] focus-visible:ring-[#d4a017]/20"
                  />
                </div>

                {/* Error */}
                {error && (
                  <p className="mt-2 text-xs text-red-400">{error}</p>
                )}

                {/* Subscribe button */}
                <Button
                  onClick={handleSubscribe}
                  disabled={loading}
                  className="mt-4 w-full h-11 bg-gradient-to-r from-[#d4a017] to-[#e8b923] text-black font-bold rounded-md hover:shadow-lg hover:shadow-[#d4a017]/25 transition-all duration-300 disabled:opacity-50"
                >
                  {loading ? 'Subscribing...' : 'Subscribe'}
                </Button>

                {/* Dismiss link */}
                <button
                  onClick={handleDismiss}
                  className="mt-4 block mx-auto text-xs text-gray-600 hover:text-gray-400 transition-colors"
                >
                  No thanks, maybe later
                </button>

                {/* Bottom sparkle */}
                <Diamond className="absolute bottom-0 right-4 w-3 h-3 text-[#d4a017]/20" />
              </div>

              {/* Bottom padding */}
              <div className="h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
