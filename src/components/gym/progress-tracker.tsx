'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ChevronDown, Compass } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useRafScrollEffect } from '@/hooks/use-raf-scroll-effect'

interface SectionInfo {
  id: string
  label: string
}

const sections: SectionInfo[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'classes', label: 'Classes' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'trainers', label: 'Trainers' },
  { id: 'facilities', label: 'Facilities' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'schedule', label: 'Schedule' },
  { id: 'faq', label: 'FAQ' },
  { id: 'free-trial', label: 'Free Trial' },
  { id: 'contact', label: 'Contact' },
]

export function ProgressTracker() {
  const [scrollPercent, setScrollPercent] = useState(0)
  const [expanded, setExpanded] = useState(false)
  const [viewedSections, setViewedSections] = useState<Set<string>>(new Set())
  const autoCollapseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const lastRounded = useRef(-1)

  useRafScrollEffect(() => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0
    const rounded = Math.min(Math.round(progress), 100)
    if (rounded !== lastRounded.current) {
      lastRounded.current = rounded
      setScrollPercent(rounded)
    }
  })

  // IntersectionObserver for sections
  useEffect(() => {
    const observers: IntersectionObserver[] = []

    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setViewedSections((prev) => {
                const next = new Set(prev)
                next.add(id)
                return next
              })
            }
          })
        },
        {
          rootMargin: '-10% 0px -50% 0px',
          threshold: 0,
        }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => {
      observers.forEach((obs) => obs.disconnect())
    }
  }, [])

  // Auto-collapse after 5 seconds if opened and not interacted
  const resetAutoCollapse = useCallback(() => {
    if (autoCollapseTimerRef.current) {
      clearTimeout(autoCollapseTimerRef.current)
    }
    if (expanded) {
      autoCollapseTimerRef.current = setTimeout(() => {
        setExpanded(false)
      }, 5000)
    }
  }, [expanded])

  useEffect(() => {
    resetAutoCollapse()
    return () => {
      if (autoCollapseTimerRef.current) {
        clearTimeout(autoCollapseTimerRef.current)
      }
    }
  }, [expanded, resetAutoCollapse])

  const handleToggle = () => {
    setExpanded((prev) => !prev)
  }

  const handleJumpTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
    setExpanded(false)
  }

  const handleInteraction = () => {
    // Reset auto-collapse timer on any interaction
    if (autoCollapseTimerRef.current) {
      clearTimeout(autoCollapseTimerRef.current)
    }
    if (expanded) {
      autoCollapseTimerRef.current = setTimeout(() => {
        setExpanded(false)
      }, 5000)
    }
  }

  // Circular progress ring calculations
  const radius = 28
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (scrollPercent / 100) * circumference

  return (
    <div
      className="fixed top-24 right-4 z-40"
      onMouseEnter={handleInteraction}
      onMouseLeave={handleInteraction}
    >
      <AnimatePresence mode="wait">
        {expanded ? (
          <motion.div
            key="panel"
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-64 rounded-2xl bg-[#1a1a1a]/90 border border-white/[0.08] backdrop-blur-xl shadow-xl shadow-black/30 overflow-hidden"
          >
            {/* Header with circular progress */}
            <div className="flex items-center gap-3 p-4 border-b border-white/[0.06]">
              <div className="relative w-16 h-16 shrink-0">
                <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
                  <circle
                    cx="32"
                    cy="32"
                    r={radius}
                    fill="none"
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth="4"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r={radius}
                    fill="none"
                    stroke="url(#progressGradient)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    className="transition-all duration-300 ease-out"
                  />
                  <defs>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#d4a017" />
                      <stop offset="100%" stopColor="#e8b923" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-bold text-white">{scrollPercent}%</span>
                </div>
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Page Progress</p>
                <p className="text-gray-500 text-xs mt-0.5">
                  {viewedSections.size}/{sections.length} sections viewed
                </p>
              </div>
            </div>

            {/* Section List */}
            <div className="max-h-72 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {sections.map((section) => {
                const isViewed = viewedSections.has(section.id)
                return (
                  <button
                    key={section.id}
                    onClick={() => handleJumpTo(section.id)}
                    className={cn(
                      'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200',
                      'hover:bg-white/[0.05]',
                      isViewed ? 'text-white' : 'text-gray-500'
                    )}
                  >
                    {/* Checkmark or indicator */}
                    <div className={cn(
                      'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all duration-300',
                      isViewed
                        ? 'bg-[#d4a017]/15 border-[#d4a017]/40'
                        : 'border-white/10'
                    )}>
                      {isViewed ? (
                        <Check className="h-3 w-3 text-[#e8b923]" />
                      ) : (
                        <div className="h-1.5 w-1.5 rounded-full bg-white/10" />
                      )}
                    </div>
                    <span className="text-sm font-medium">{section.label}</span>
                  </button>
                )
              })}
            </div>

            {/* Collapse button */}
            <div className="border-t border-white/[0.06] p-2">
              <button
                onClick={handleToggle}
                className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-gray-500 hover:text-[#e8b923] hover:bg-white/[0.05] text-xs font-medium transition-all duration-200"
              >
                <ChevronDown className="h-3.5 w-3.5" />
                Collapse
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="pill"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={handleToggle}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1a1a1a]/90 border border-white/[0.08] backdrop-blur-xl shadow-lg shadow-black/20 hover:border-[#d4a017]/40 hover:shadow-[#d4a017]/10 transition-all duration-300 group"
          >
            <Compass className="h-4 w-4 text-[#d4a017] group-hover:text-[#e8b923] transition-colors duration-300" />
            <span className="text-xs text-gray-500 hidden sm:inline">Explore</span>
            <span className="text-sm font-semibold text-white tabular-nums">{scrollPercent}%</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
