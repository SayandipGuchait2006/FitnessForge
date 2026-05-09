'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MapPin } from 'lucide-react'

interface ProofItem {
  name: string
  action: string
  city: string
  initial: string
}

const proofData: ProofItem[] = [
  { name: 'Arjun S.', action: 'just joined Avenger', city: 'Bangalore', initial: 'A' },
  { name: 'Priya M.', action: 'booked HIIT class', city: 'Koramangala', initial: 'P' },
  { name: 'Vikram R.', action: 'started a free trial', city: 'Indiranagar', initial: 'V' },
  { name: 'Sneha K.', action: 'joined PowerLift', city: 'HSR Layout', initial: 'S' },
  { name: 'Rahul D.', action: 'booked Boxing class', city: 'Whitefield', initial: 'R' },
  { name: 'Ananya P.', action: 'just joined Avenger', city: 'Jayanagar', initial: 'A' },
  { name: 'Karan T.', action: 'started a free trial', city: 'MG Road', initial: 'K' },
  { name: 'Meera J.', action: 'booked Yoga class', city: 'JP Nagar', initial: 'M' },
  { name: 'Aditya N.', action: 'joined CrossFit', city: 'Electronic City', initial: 'A' },
  { name: 'Divya L.', action: 'booked Spin class', city: 'Marathahalli', initial: 'D' },
  { name: 'Rohan G.', action: 'just joined Avenger', city: 'BTM Layout', initial: 'R' },
  { name: 'Ishita V.', action: 'started a free trial', city: 'Banashankari', initial: 'I' },
]

const avatarColors = [
  'from-red-500 to-orange-500',
  'from-green-500 to-emerald-500',
  'from-purple-500 to-pink-500',
  'from-blue-500 to-cyan-500',
  'from-amber-500 to-yellow-500',
  'from-rose-500 to-pink-500',
]

export function SocialProof() {
  const [visible, setVisible] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [dismissed, setDismissed] = useState(false)
  const indexRef = useRef(0)

  useEffect(() => {
    if (dismissed) return

    let showTimeout: ReturnType<typeof setTimeout>
    let hideTimeout: ReturnType<typeof setTimeout>
    let cycleTimeout: ReturnType<typeof setTimeout>

    const showNotification = () => {
      setVisible(true)
      hideTimeout = setTimeout(() => {
        setVisible(false)
      }, 4000)
    }

    const scheduleNext = () => {
      const delay = 15000 + Math.random() * 10000
      cycleTimeout = setTimeout(() => {
        indexRef.current = (indexRef.current + 1) % proofData.length
        setCurrentIndex(indexRef.current)
        showNotification()
        setTimeout(() => {
          scheduleNext()
        }, 4500)
      }, delay)
    }

    // Show first notification after 5 seconds
    showTimeout = setTimeout(() => {
      showNotification()
      setTimeout(() => {
        scheduleNext()
      }, 4500)
    }, 5000)

    return () => {
      clearTimeout(showTimeout)
      clearTimeout(hideTimeout)
      clearTimeout(cycleTimeout)
    }
  }, [dismissed])

  const handleDismiss = () => {
    setDismissed(true)
    setVisible(false)
  }

  const proof = proofData[currentIndex]
  const colorClass = avatarColors[currentIndex % avatarColors.length]

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-40 left-6 z-[25] max-w-[280px]"
        >
          <div className="flex items-start gap-3 rounded-2xl border border-white/[0.08] bg-[#111111]/95 backdrop-blur-xl p-3.5 shadow-2xl shadow-black/50">
            {/* Avatar */}
            <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${colorClass} text-white text-sm font-bold shadow-lg`}>
              {proof.initial}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white leading-snug">
                <span className="font-semibold">{proof.name}</span>{' '}
                <span className="text-neutral-400">{proof.action}</span>
              </p>
              <div className="flex items-center gap-1 mt-1">
                <MapPin className="h-3 w-3 text-[#d4a017]" />
                <span className="text-xs text-neutral-500">{proof.city}</span>
              </div>
              <p className="text-[10px] text-neutral-600 mt-1">Just now</p>
            </div>

            {/* Dismiss button */}
            <button
              onClick={handleDismiss}
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-neutral-500 transition-colors hover:bg-white/[0.06] hover:text-white"
              aria-label="Dismiss notification"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
