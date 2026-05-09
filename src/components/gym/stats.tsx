'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Users, Award, Dumbbell, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StatItemProps {
  icon: React.ReactNode
  value: number
  suffix?: string
  label: string
  delay: number
  isInView: boolean
}

function AnimatedCounter({ value, suffix = '', isInView }: { value: number; suffix?: string; isInView: boolean }) {
  const [count, setCount] = useState(value) // Start at final value for SSR

  useEffect(() => {
    if (!isInView) return

    const duration = 2000
    let intervalId: ReturnType<typeof setInterval>
    let startTime: number | null = null

    // Easing function: ease-out cubic for dramatic "rolling" deceleration
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

    // Defer to next frame to reset count and start animation
    const rafId = requestAnimationFrame(() => {
      setCount(0)
      startTime = performance.now()
      intervalId = setInterval(() => {
        if (startTime === null) return
        const elapsed = performance.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        // Apply easing for a "rolling" effect that decelerates near the end
        const easedProgress = easeOutCubic(progress)
        const currentValue = Math.floor(easedProgress * value)

        if (progress >= 1) {
          setCount(value)
          clearInterval(intervalId)
        } else {
          setCount(currentValue)
        }
      }, 16)
    })

    return () => {
      cancelAnimationFrame(rafId)
      clearInterval(intervalId)
    }
  }, [isInView, value])

  return (
    <span className="text-4xl sm:text-5xl font-black text-forge-amber tabular-nums">
      {count}
      {suffix}
    </span>
  )
}

function StatItem({ icon, value, suffix = '+', label, delay, isInView }: StatItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="flex flex-col items-center text-center group"
    >
      <div className="pulse-ring flex items-center justify-center w-14 h-14 rounded-xl bg-forge-amber/10 text-forge-amber mb-4 group-hover:bg-forge-amber/20 transition-colors duration-300">
        {icon}
      </div>
      <AnimatedCounter value={value} suffix={suffix} isInView={isInView} />
      <span className="text-sm text-gray-400 mt-2 font-medium tracking-wider uppercase">
        {label}
      </span>
    </motion.div>
  )
}

const stats = [
  {
    icon: <Users className="w-6 h-6" />,
    value: 5000,
    suffix: '+',
    label: 'Active Members',
  },
  {
    icon: <Award className="w-6 h-6" />,
    value: 30,
    suffix: '+',
    label: 'Expert Trainers',
  },
  {
    icon: <Dumbbell className="w-6 h-6" />,
    value: 50,
    suffix: '+',
    label: 'Fitness Classes',
  },
  {
    icon: <Clock className="w-6 h-6" />,
    value: 15,
    suffix: '+',
    label: 'Years Experience',
  },
]

export function Stats() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section
      id="stats"
      ref={ref}
      className="relative py-16 sm:py-20 bg-forge-darker noise-overlay"
    >
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8 relative">
          {/* SVG connecting line between stats (desktop only) */}
          <svg
            className="absolute top-7 left-0 w-full h-0 hidden lg:block pointer-events-none z-0"
            viewBox="0 0 1000 0"
            preserveAspectRatio="none"
          >
            <motion.line
              x1="12.5%"
              y1="0"
              x2="87.5%"
              y2="0"
              stroke="#d4a017"
              strokeWidth="1"
              strokeDasharray="4 4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 0.15 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 1.5, delay: 0.5, ease: 'easeInOut' }}
            />
          </svg>
          {stats.map((stat, index) => (
            <div key={stat.label} className="relative z-10">
              <StatItem
                icon={stat.icon}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                delay={index * 0.15}
                isInView={isInView}
              />
              {/* Gradient divider between stats */}
              {index < stats.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-16 bg-gradient-to-b from-transparent via-forge-amber/30 to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="section-divider absolute bottom-0 left-0 right-0" />
    </section>
  )
}
