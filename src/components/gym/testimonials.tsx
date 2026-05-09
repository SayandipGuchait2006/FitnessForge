'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ScrollReveal } from '@/components/gym/scroll-reveal'

const avatarColors = [
  'bg-[#d4a017]',
  'bg-emerald-600',
  'bg-violet-600',
  'bg-rose-600',
  'bg-cyan-600',
]

const testimonials = [
  {
    quote: 'Avenger changed my life. Lost 20kg in 6 months with their incredible trainers.',
    name: 'Rahul K.',
    since: 'Member since 2022',
  },
  {
    quote: 'The community here is unlike any gym I\'ve been to. Everyone pushes each other.',
    name: 'Sneha P.',
    since: 'Member since 2021',
  },
  {
    quote: 'Premium facilities, world-class trainers. Worth every rupee.',
    name: 'Amit T.',
    since: 'Member since 2023',
  },
  {
    quote: 'From a beginner to running marathons. The coaching here is exceptional.',
    name: 'Divya M.',
    since: 'Member since 2022',
  },
  {
    quote: 'The yoga sessions are transformative. Best decision I ever made.',
    name: 'Karthik R.',
    since: 'Member since 2023',
  },
]

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [direction, setDirection] = useState(0)
  const [progressKey, setProgressKey] = useState(0)

  const next = useCallback(() => {
    setDirection(1)
    setCurrent((prev) => (prev + 1) % testimonials.length)
    setProgressKey((prev) => prev + 1)
  }, [])

  const prev = useCallback(() => {
    setDirection(-1)
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setProgressKey((prev) => prev + 1)
  }, [])

  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(next, 4000)
    return () => clearInterval(interval)
  }, [isPaused, next])

  const variants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? 40 : -40,
    }),
    center: {
      opacity: 1,
      x: 0,
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? -40 : 40,
    }),
  }

  return (
    <section id="testimonials" className="relative py-20 md:py-28 bg-[#0a0a0a] overflow-hidden diagonal-line-pattern">
      {/* Decorative section number */}
      <span className="absolute top-8 right-8 text-[200px] font-black text-white/[0.02] pointer-events-none select-none leading-none parallax-section-number">05</span>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-14">
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#d4a017]/60">05 — Testimonials</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-2" style={{ textShadow: '0 0 40px rgba(212, 160, 23, 0.1)' }}>
            MEMBER <span className="text-[#e8b923]">STORIES</span>
          </h2>
          <div className="mx-auto mt-4 flex items-center gap-2">
            <div className="h-px w-8 bg-[#d4a017]/30" />
            <div className="h-1 w-8 rounded-full bg-gradient-to-r from-[#d4a017] to-[#e8b923]" />
            <div className="h-px w-8 bg-[#d4a017]/30" />
            <div className="size-1.5 rotate-45 bg-[#d4a017]" />
            <div className="h-px w-8 bg-[#d4a017]/30" />
            <div className="h-1 w-8 rounded-full bg-gradient-to-r from-[#e8b923] to-[#d4a017]" />
            <div className="h-px w-8 bg-[#d4a017]/30" />
          </div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mt-6">
            Real people. Real results. Real transformations.
          </p>
        </ScrollReveal>

        {/* Carousel with card stack effect */}
        <ScrollReveal delay={0.2}>
          <div
            className="relative max-w-3xl mx-auto"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Decorative quote marks in background - larger and more decorative */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
              <span className="text-[280px] leading-none text-[#d4a017]/[0.04] font-serif select-none" aria-hidden="true">❝</span>
            </div>
            <div className="absolute top-4 right-4 pointer-events-none select-none">
              <Quote className="size-24 text-[#d4a017]/[0.06] rotate-180" />
            </div>
            <div className="absolute bottom-4 left-4 pointer-events-none select-none">
              <Quote className="size-16 text-[#d4a017]/[0.05]" />
            </div>

            {/* Card stack: previous card (behind-left) */}
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{ zIndex: 0 }}
            >
              <div
                className="w-[90%] h-[90%] rounded-2xl bg-[#1a1a1a]/40 backdrop-blur-sm border border-white/[0.03] opacity-30"
                style={{
                  transform: 'rotate(-4deg) scale(0.92) translateX(-30px)',
                }}
              />
            </div>
            {/* Card stack: next card (behind-right) */}
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{ zIndex: 0 }}
            >
              <div
                className="w-[90%] h-[90%] rounded-2xl bg-[#1a1a1a]/40 backdrop-blur-sm border border-white/[0.03] opacity-20"
                style={{
                  transform: 'rotate(3deg) scale(0.88) translateX(30px)',
                }}
              />
            </div>

            {/* Testimonial Card with starfield background */}
            <div className="relative z-10 overflow-hidden rounded-2xl bg-[#1a1a1a]/80 backdrop-blur-xl border border-white/5 p-8 md:p-12 min-h-[320px] flex flex-col items-center justify-center text-center starfield-bg">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={current}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="flex flex-col items-center"
                >
                  {/* Amber quote mark - larger and more decorative */}
                  <div className="relative mb-6">
                    <Quote className="size-12 text-[#d4a017] opacity-80" />
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-px bg-gradient-to-r from-transparent via-[#d4a017]/40 to-transparent" />
                  </div>

                  {/* Amber gradient line above quote text */}
                  <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#d4a017] to-transparent mb-4 rounded-full" />

                  {/* Quote text */}
                  <p className="text-lg md:text-xl lg:text-2xl text-gray-200 italic leading-relaxed mb-8 max-w-2xl">
                    &ldquo;{testimonials[current].quote}&rdquo;
                  </p>

                  {/* Stars with glow pulse */}
                  <div className="flex gap-1 mb-4 star-glow-pulse">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="size-6 fill-[#e8b923] text-[#e8b923]"
                      />
                    ))}
                  </div>

                  {/* Avatar + Name & Since */}
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      'flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white',
                      avatarColors[current % avatarColors.length]
                    )}>
                      {getInitials(testimonials[current].name)}
                    </div>
                    <div className="text-left">
                      <p className="text-white font-semibold">
                        {testimonials[current].name}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {testimonials[current].since}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Auto-rotation progress bar */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2a2a2a]">
                <div
                  key={progressKey}
                  className="h-full bg-gradient-to-r from-[#d4a017] to-[#e8b923] testimonial-progress"
                  style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
                />
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prev}
              className="absolute left-2 md:-left-5 top-1/2 -translate-y-1/2 z-10 size-10 md:size-12 rounded-full bg-[#1a1a1a] border border-white/10 flex items-center justify-center text-white hover:border-[#d4a017] hover:text-[#d4a017] transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              onClick={next}
              className="absolute right-2 md:-right-5 top-1/2 -translate-y-1/2 z-10 size-10 md:size-12 rounded-full bg-[#1a1a1a] border border-white/10 flex items-center justify-center text-white hover:border-[#d4a017] hover:text-[#d4a017] transition-all duration-300"
              aria-label="Next testimonial"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </ScrollReveal>

        {/* Dots with pulse on active */}
        <ScrollReveal delay={0.3}>
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > current ? 1 : -1)
                  setCurrent(idx)
                  setProgressKey((prev) => prev + 1)
                }}
                className={cn(
                  'h-2 rounded-full transition-all duration-300',
                  idx === current
                    ? 'w-8 bg-[#e8b923] dot-pulse-active'
                    : 'w-2 bg-gray-600 hover:bg-gray-400'
                )}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
