'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Radio, ChevronDown, Clock, User, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ClassSchedule {
  name: string
  trainer: string
  day: number // 0=Sun, 1=Mon, ..., 6=Sat
  startHour: number
  startMin: number
  endHour: number
  endMin: number
}

// Static weekly class schedule
const classSchedule: ClassSchedule[] = [
  { name: 'Power HIIT', trainer: 'Coach Arjun', day: 1, startHour: 6, startMin: 0, endHour: 7, endMin: 0 },
  { name: 'Yoga Flow', trainer: 'Coach Priya', day: 1, startHour: 8, startMin: 0, endHour: 9, endMin: 30 },
  { name: 'Boxing Fundamentals', trainer: 'Coach Mike', day: 1, startHour: 17, startMin: 0, endHour: 18, endMin: 0 },
  { name: 'CrossFit WOD', trainer: 'Coach Arjun', day: 2, startHour: 7, startMin: 0, endHour: 8, endMin: 0 },
  { name: 'Spin Cycle', trainer: 'Coach Riya', day: 2, startHour: 18, startMin: 0, endHour: 19, endMin: 0 },
  { name: 'Power Lifting', trainer: 'Coach Vikram', day: 3, startHour: 6, startMin: 30, endHour: 8, endMin: 0 },
  { name: 'HIIT Extreme', trainer: 'Coach Arjun', day: 3, startHour: 17, startMin: 30, endHour: 18, endMin: 30 },
  { name: 'Yoga & Meditation', trainer: 'Coach Priya', day: 4, startHour: 7, startMin: 0, endHour: 8, endMin: 30 },
  { name: 'Boxing Advanced', trainer: 'Coach Mike', day: 4, startHour: 18, startMin: 0, endHour: 19, endMin: 0 },
  { name: 'Full Body Forge', trainer: 'Coach Vikram', day: 5, startHour: 6, startMin: 0, endHour: 7, endMin: 30 },
  { name: 'Spin & Burn', trainer: 'Coach Riya', day: 5, startHour: 17, startMin: 0, endHour: 18, endMin: 0 },
  { name: 'Saturday SWEAT', trainer: 'Coach Arjun', day: 6, startHour: 8, startMin: 0, endHour: 9, endMin: 30 },
  { name: 'Power HIIT', trainer: 'Coach Arjun', day: 0, startHour: 9, startMin: 0, endHour: 10, endMin: 0 },
  { name: 'Yoga Flow', trainer: 'Coach Priya', day: 0, startHour: 10, startMin: 30, endHour: 12, endMin: 0 },
]

function getCurrentClass(): ClassSchedule | null {
  const now = new Date()
  const currentDay = now.getDay()
  const currentMinutes = now.getHours() * 60 + now.getMinutes()

  for (const cls of classSchedule) {
    if (cls.day !== currentDay) continue
    const startMinutes = cls.startHour * 60 + cls.startMin
    const endMinutes = cls.endHour * 60 + cls.endMin
    if (currentMinutes >= startMinutes && currentMinutes < endMinutes) {
      return cls
    }
  }
  return null
}

function getTimeRemaining(cls: ClassSchedule): string {
  const now = new Date()
  const currentMinutes = now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60
  const endMinutes = cls.endHour * 60 + cls.endMin
  const remaining = endMinutes - currentMinutes
  if (remaining <= 0) return 'Ending soon'
  const mins = Math.floor(remaining)
  const secs = Math.round((remaining - mins) * 60)
  return `${mins}m ${secs}s`
}

function formatTime(hour: number, min: number): string {
  const period = hour >= 12 ? 'PM' : 'AM'
  const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
  return `${displayHour}:${min.toString().padStart(2, '0')} ${period}`
}

export function LiveClassStatus() {
  const [expanded, setExpanded] = useState(false)
  const [currentClass, setCurrentClass] = useState<ClassSchedule | null>(null)
  const [timeRemaining, setTimeRemaining] = useState('')
  const autoCollapseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Update current class every 30 seconds
  useEffect(() => {
    const update = () => {
      setCurrentClass(getCurrentClass())
      if (getCurrentClass()) {
        setTimeRemaining(getTimeRemaining(getCurrentClass()!))
      }
    }
    update()
    const interval = setInterval(update, 30000)
    return () => clearInterval(interval)
  }, [])

  // Update time remaining every second when expanded and class is live
  useEffect(() => {
    if (!expanded || !currentClass) return
    const update = () => {
      setTimeRemaining(getTimeRemaining(currentClass))
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [expanded, currentClass])

  // Auto-collapse after 3 seconds if no interaction
  const resetAutoCollapse = useCallback(() => {
    if (autoCollapseTimerRef.current) {
      clearTimeout(autoCollapseTimerRef.current)
    }
    if (expanded) {
      autoCollapseTimerRef.current = setTimeout(() => {
        setExpanded(false)
      }, 3000)
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

  const handleInteraction = () => {
    if (autoCollapseTimerRef.current) {
      clearTimeout(autoCollapseTimerRef.current)
    }
    if (expanded) {
      autoCollapseTimerRef.current = setTimeout(() => {
        setExpanded(false)
      }, 3000)
    }
  }

  // Don't render if no class is currently happening
  if (!currentClass) return null

  return (
    <div
      className="fixed top-32 right-4 z-30"
      onMouseEnter={handleInteraction}
      onMouseLeave={handleInteraction}
    >
      <AnimatePresence mode="wait">
        {expanded ? (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, scale: 0.9, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -8 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-64 rounded-2xl bg-[#1a1a1a]/90 border border-[#d4a017]/25 backdrop-blur-xl shadow-xl shadow-black/30 overflow-hidden"
          >
            {/* Header with LIVE badge */}
            <div className="px-4 py-3 bg-gradient-to-r from-[#d4a017]/10 to-transparent border-b border-white/[0.06]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
                  </span>
                  <span className="text-xs font-bold tracking-wider text-red-400 uppercase">Live Now</span>
                </div>
                <button
                  onClick={() => setExpanded(false)}
                  className="text-gray-500 hover:text-white transition-colors"
                >
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Class Info */}
            <div className="px-4 py-4 space-y-3">
              <h4 className="text-base font-bold text-white">{currentClass.name}</h4>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="h-3.5 w-3.5 text-[#d4a017]" />
                  <span className="text-sm text-gray-300">{currentClass.trainer}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-[#d4a017]" />
                  <span className="text-sm text-gray-300">
                    {formatTime(currentClass.startHour, currentClass.startMin)} – {formatTime(currentClass.endHour, currentClass.endMin)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-3.5 w-3.5 text-[#d4a017]" />
                  <span className="text-sm text-[#e8b923] font-medium">{timeRemaining} remaining</span>
                </div>
              </div>
            </div>

            {/* Join Now Button */}
            <div className="px-4 pb-4">
              <button
                onClick={() => {
                  const el = document.getElementById('classes')
                  if (el) el.scrollIntoView({ behavior: 'smooth' })
                  setExpanded(false)
                }}
                className={cn(
                  'w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-300',
                  'bg-gradient-to-r from-[#d4a017] to-[#e8b923] text-black',
                  'hover:shadow-lg hover:shadow-[#d4a017]/25'
                )}
              >
                Join Now
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="collapsed"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={() => setExpanded(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#1a1a1a]/90 border border-[#d4a017]/25 backdrop-blur-xl shadow-lg shadow-black/20 hover:border-[#d4a017]/50 hover:shadow-[#d4a017]/10 transition-all duration-300 group"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
            </span>
            <span className="text-xs font-bold tracking-wider text-red-400 uppercase">Live</span>
            <div className="w-px h-3.5 bg-white/10" />
            <span className="text-xs font-medium text-gray-300 group-hover:text-white transition-colors">
              {currentClass.name}
            </span>
            <Radio className="h-3 w-3 text-[#d4a017] group-hover:text-[#e8b923] transition-colors" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
