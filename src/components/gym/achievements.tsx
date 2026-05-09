'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Trophy, Medal, Star, Award, Crown, Flame, Target, Zap, ChevronLeft, ChevronRight } from 'lucide-react'
import { ScrollReveal } from '@/components/gym/scroll-reveal'

const achievements = [
  { icon: Trophy, title: '5K+ Members', subtitle: 'Since 2009' },
  { icon: Medal, title: 'Best Gym 2024', subtitle: 'Bangalore' },
  { icon: Star, title: '4.9 Rating', subtitle: 'Google Reviews' },
  { icon: Award, title: '15 Years Strong', subtitle: 'Est. 2009' },
  { icon: Crown, title: 'Premium Tier', subtitle: 'Fitness Standard' },
  { icon: Flame, title: '50+ Classes', subtitle: 'Weekly Schedule' },
  { icon: Target, title: 'Certified Trainers', subtitle: '30+ Experts' },
  { icon: Zap, title: 'Transformations', subtitle: '1000+ Success Stories' },
]

export function Achievements() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const scrollAmount = 200
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
  }

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className="relative py-16 sm:py-20 bg-[#0a0a0a] noise-overlay"
    >
      {/* Decorative section number */}
      <div className="absolute top-4 right-8 text-[200px] font-black text-white/[0.02] leading-none pointer-events-none select-none">
        05
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-10 sm:mb-14">
            <span className="text-xs tracking-[0.3em] text-[#d4a017]/60 font-medium uppercase">
              05 — Achievements
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight"
              style={{ textShadow: '0 0 40px rgba(212, 160, 23, 0.1)' }}
            >
              OUR <span className="text-[#d4a017]">MILESTONES</span>
            </h2>
            {/* Decorative divider */}
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#d4a017]/50" />
              <div className="h-px w-12 bg-[#d4a017]/60" />
              <div className="w-1.5 h-1.5 rotate-45 bg-[#d4a017]" />
              <div className="h-px w-12 bg-[#d4a017]/60" />
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#d4a017]/50" />
            </div>
          </div>
        </ScrollReveal>

        {/* Scrollable row with arrows */}
        <div className="relative group/scroll">
          {/* Left arrow */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 hidden lg:flex items-center justify-center w-10 h-10 rounded-full bg-[#1a1a1a]/90 border border-white/10 text-[#d4a017] hover:bg-[#d4a017] hover:text-black transition-all duration-300 shadow-lg backdrop-blur-sm opacity-0 group-hover/scroll:opacity-100 -translate-x-2 group-hover/scroll:translate-x-0"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right arrow */}
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 hidden lg:flex items-center justify-center w-10 h-10 rounded-full bg-[#1a1a1a]/90 border border-white/10 text-[#d4a017] hover:bg-[#d4a017] hover:text-black transition-all duration-300 shadow-lg backdrop-blur-sm opacity-0 group-hover/scroll:opacity-100 translate-x-2 group-hover/scroll:translate-x-0"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Horizontal scrollable container */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-4 px-1 snap-x snap-mandatory"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#d4a01740 transparent',
            }}
          >
            {/* Custom scrollbar for webkit */}
            <style jsx>{`
              div::-webkit-scrollbar {
                height: 4px;
              }
              div::-webkit-scrollbar-track {
                background: transparent;
              }
              div::-webkit-scrollbar-thumb {
                background: rgba(212, 160, 23, 0.25);
                border-radius: 4px;
              }
              div::-webkit-scrollbar-thumb:hover {
                background: rgba(212, 160, 23, 0.4);
              }
            `}</style>

            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon
              return (
                <motion.div
                  key={achievement.title}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={
                    isInView
                      ? { opacity: 1, y: 0, scale: 1 }
                      : { opacity: 0, y: 30, scale: 0.9 }
                  }
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="flex-shrink-0 w-[150px] snap-center"
                >
                  <div className="relative group h-full rounded-xl border border-white/[0.08] bg-[#1a1a1a]/60 backdrop-blur-md p-5 text-center transition-all duration-300 hover:border-[#d4a017]/30 hover:bg-[#1a1a1a]/80 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#d4a017]/5">
                    {/* Amber glow on hover */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-[#d4a017]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="relative z-10">
                      {/* Icon */}
                      <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-xl bg-[#d4a017]/10 text-[#d4a017] mb-3 group-hover:bg-[#d4a017]/20 group-hover:scale-110 transition-all duration-300">
                        <IconComponent className="w-6 h-6" />
                      </div>

                      {/* Title */}
                      <h3 className="text-sm font-bold text-white leading-tight mb-1">
                        {achievement.title}
                      </h3>

                      {/* Subtitle */}
                      <p className="text-[11px] text-gray-500 font-medium">
                        {achievement.subtitle}
                      </p>
                    </div>

                    {/* Bottom border accent */}
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] rounded-b-xl bg-gradient-to-r from-transparent via-[#d4a017]/0 to-transparent group-hover:via-[#d4a017]/50 transition-all duration-500" />
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
