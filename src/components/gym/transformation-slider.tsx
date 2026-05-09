'use client'

import { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ScrollReveal } from '@/components/gym/scroll-reveal'

interface TransformationSliderProps {
  beforeGradient: string
  afterGradient: string
  name: string
  achievement: string
  beforeImage?: string
  afterImage?: string
}

const transformations: TransformationSliderProps[] = [
  {
    name: 'Rahul',
    achievement: 'Lost 25kg in 8 months',
    beforeGradient: 'from-gray-800 via-gray-700 to-[#1a1a1a]',
    afterGradient: 'from-[#d4a017]/30 via-[#e8b923]/20 to-[#1a1a1a]',
    beforeImage: '/images/transformation1.png',
    afterImage: '/images/transformation1.png',
  },
  {
    name: 'Priya',
    achievement: 'Gained muscle, lost fat in 6 months',
    beforeGradient: 'from-gray-700 via-slate-700 to-[#1a1a1a]',
    afterGradient: 'from-purple-900/30 via-pink-900/20 to-[#1a1a1a]',
    beforeImage: '/images/gallery1.png',
    afterImage: '/images/gallery2.png',
  },
  {
    name: 'Vikram',
    achievement: 'Complete body recomposition in 10 months',
    beforeGradient: 'from-gray-800 via-neutral-700 to-[#1a1a1a]',
    afterGradient: 'from-amber-900/30 via-yellow-900/20 to-[#1a1a1a]',
    beforeImage: '/images/gallery3.png',
    afterImage: '/images/gallery4.png',
  },
]

function ComparisonSlider({ item }: { item: TransformationSliderProps }) {
  const [sliderPos, setSliderPos] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPos(percentage)
  }, [])

  const handleMouseDown = useCallback(() => {
    isDragging.current = true
  }, [])

  const handleMouseUp = useCallback(() => {
    isDragging.current = false
  }, [])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging.current) return
      handleMove(e.clientX)
    },
    [handleMove]
  )

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging.current) return
      handleMove(e.touches[0].clientX)
    },
    [handleMove]
  )

  return (
    <div className="group relative rounded-2xl overflow-hidden border border-white/[0.08] hover:border-[#d4a017]/30 transition-all duration-300 hover:shadow-[0_0_40px_-10px_rgba(212,160,23,0.15)]">
      {/* Slider container */}
      <div
        ref={containerRef}
        className="relative h-64 sm:h-72 md:h-80 select-none cursor-col-resize"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
        onTouchMove={handleTouchMove}
      >
        {/* After image (full width, behind) */}
        <div className={`absolute inset-0 bg-gradient-to-br ${item.afterGradient}`}>
          {item.afterImage && (
            <img
              src={item.afterImage}
              alt={`${item.name} after transformation`}
              className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-luminosity"
            />
          )}
          {/* After label */}
          <div className="absolute top-3 right-3 z-20 px-3 py-1 rounded-md bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            After
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-6xl font-black text-white/[0.05] group-hover:text-white/[0.08] transition-colors">
              {item.name}
            </p>
          </div>
        </div>

        {/* Before image (clipped by slider position) */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${item.beforeGradient}`}
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
        >
          {item.beforeImage && (
            <img
              src={item.beforeImage}
              alt={`${item.name} before transformation`}
              className="absolute inset-0 w-full h-full object-cover opacity-15 mix-blend-luminosity grayscale"
            />
          )}
          {/* Before label */}
          <div className="absolute top-3 left-3 z-20 px-3 py-1 rounded-md bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider">
            Before
          </div>
        </div>

        {/* Divider line */}
        <div
          className="absolute top-0 bottom-0 z-10 pointer-events-none"
          style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
        >
          {/* Line */}
          <div className="w-0.5 h-full bg-gradient-to-b from-[#d4a017] via-[#e8b923] to-[#d4a017] shadow-[0_0_10px_rgba(212,160,23,0.4)]" />

          {/* Drag handle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#d4a017] border-2 border-[#e8b923] flex items-center justify-center shadow-[0_0_20px_rgba(212,160,23,0.5)] pointer-events-auto cursor-col-resize">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-black">
              <path d="M4 8L2 8M2 8L4 6M2 8L4 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 8L14 8M14 8L12 6M14 8L12 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* Info bar below slider */}
      <div className="px-5 py-4 bg-[#111111] border-t border-white/[0.06]">
        <p className="text-white font-bold text-lg">{item.name}</p>
        <p className="text-[#e8b923] text-sm font-medium">{item.achievement}</p>
      </div>
    </div>
  )
}

export function TransformationSlider() {
  return (
    <section
      className="relative py-20 md:py-28 bg-[#0a0a0a] overflow-hidden"
      id="transformation-slider"
    >
      {/* Decorative section number */}
      <span className="absolute top-8 right-8 text-[200px] font-black text-white/[0.02] pointer-events-none select-none leading-none">
        18
      </span>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-10 md:mb-14">
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#d4a017]/60">
            18 — Compare Results
          </span>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-2"
            style={{ textShadow: '0 0 40px rgba(212, 160, 23, 0.1)' }}
          >
            SEE THE <span className="text-[#e8b923]">DIFFERENCE</span>
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
            Drag the slider to compare before and after transformations. Real people, real results.
          </p>
        </ScrollReveal>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {transformations.map((item, idx) => (
            <ScrollReveal key={item.name} delay={idx * 0.15}>
              <ComparisonSlider item={item} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
