'use client'

import { useRef, useEffect, useState } from 'react'
import {
  Dumbbell,
  HeartPulse,
  Waves,
  Sparkles,
  CupSoda,
  UserCheck,
  ArrowRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollReveal } from '@/components/gym/scroll-reveal'
import { cn } from '@/lib/utils'

interface FacilityFeature {
  name: string
  icon: React.ElementType
  count: number
}

const features: FacilityFeature[] = [
  { name: 'Olympic Weight Zone', icon: Dumbbell, count: 12 },
  { name: 'Cardio Theater', icon: HeartPulse, count: 45 },
  { name: 'Heated Pool', icon: Waves, count: 1 },
  { name: 'Recovery Spa', icon: Sparkles, count: 3 },
  { name: 'Juice Bar', icon: CupSoda, count: 2 },
  { name: 'Personal Training Studios', icon: UserCheck, count: 8 },
]

const facilityImages = [
  { src: '/images/facility1.png', alt: 'Olympic Weight Zone', label: 'Olympic Weight Zone', count: '01' },
  { src: '/images/facility2.png', alt: 'Cardio Theater', label: 'Cardio Theater', count: '02' },
  { src: '/images/facility3.png', alt: 'Recovery Spa', label: 'Recovery Spa', count: '03' },
  { src: '/images/facility4.png', alt: 'Heated Pool', label: 'Heated Pool', count: '04' },
]

/** Animated count-up component for facility feature numbers */
function FeatureCountUp({ value, isInView }: { value: number; isInView: boolean }) {
  const [count, setCount] = useState(value)

  useEffect(() => {
    if (!isInView) return
    const duration = 1500
    const increment = value / (duration / 16)
    let start = 0
    let intervalId: ReturnType<typeof setInterval>

    const rafId = requestAnimationFrame(() => {
      setCount(0)
      intervalId = setInterval(() => {
        start += increment
        if (start >= value) {
          setCount(value)
          clearInterval(intervalId)
        } else {
          setCount(Math.floor(start))
        }
      }, 16)
    })

    return () => {
      cancelAnimationFrame(rafId)
      clearInterval(intervalId)
    }
  }, [isInView, value])

  return <span className="text-sm font-bold text-[#e8b923]">{count}</span>
}

export function Facilities() {
  const featureRef = useRef<HTMLDivElement>(null)
  const [featuresInView, setFeaturesInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFeaturesInView(true)
        }
      },
      { threshold: 0.3 }
    )
    if (featureRef.current) {
      observer.observe(featureRef.current)
    }
    return () => observer.disconnect()
  }, [])
  return (
    <section id="facilities" className="relative py-20 md:py-28 bg-[#111111] overflow-hidden section-progress">
      {/* Decorative section number */}
      <span className="absolute top-8 left-8 text-[200px] font-black text-white/[0.02] pointer-events-none select-none leading-none parallax-section-number">04</span>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-14 md:mb-20">
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#d4a017]/60">04 — Our Facilities</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mt-2" style={{ textShadow: '0 0 40px rgba(212, 160, 23, 0.1)' }}>
            WORLD-CLASS FACILITIES
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
          <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-neutral-400">
            Every detail designed for your peak performance.
          </p>
        </ScrollReveal>

        {/* Asymmetric Image Grid */}
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {/* Large Featured Image - Left */}
            <div className="group relative aspect-[4/3] md:aspect-auto md:row-span-2 overflow-hidden rounded-2xl border border-white/[0.06] hover:scale-[1.02] transition-transform duration-[1200ms] tilt-card">
              <img
                src={facilityImages[0].src}
                alt={facilityImages[0].alt}
                className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
              />
              {/* Count Indicator */}
              <div className="absolute top-4 left-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[#d4a017]/80 text-xs font-bold text-black backdrop-blur-sm">
                {facilityImages[0].count}
              </div>
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute bottom-0 left-0 right-0 translate-y-4 p-6 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="text-lg font-bold text-white">{facilityImages[0].label}</span>
              </div>
            </div>

            {/* Right Side - 3 Smaller Images */}
            <div className="grid grid-cols-2 gap-4 md:gap-5">
              {/* Top right image */}
              <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/[0.06] tilt-card">
                <img
                  src={facilityImages[1].src}
                  alt={facilityImages[1].alt}
                  className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                />
                <div className="absolute top-3 left-3 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-[#d4a017]/80 text-[10px] font-bold text-black backdrop-blur-sm">
                  {facilityImages[1].count}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 right-0 translate-y-4 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="text-sm font-bold text-white">{facilityImages[1].label}</span>
                </div>
              </div>

              {/* Top right second image */}
              <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/[0.06] tilt-card">
                <img
                  src={facilityImages[2].src}
                  alt={facilityImages[2].alt}
                  className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                />
                <div className="absolute top-3 left-3 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-[#d4a017]/80 text-[10px] font-bold text-black backdrop-blur-sm">
                  {facilityImages[2].count}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 right-0 translate-y-4 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="text-sm font-bold text-white">{facilityImages[2].label}</span>
                </div>
              </div>

              {/* Bottom right - spans 2 cols */}
              <div className="col-span-2 group relative aspect-[8/3] overflow-hidden rounded-2xl border border-white/[0.06] tilt-card">
                <img
                  src={facilityImages[3].src}
                  alt={facilityImages[3].alt}
                  className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                />
                <div className="absolute top-3 left-3 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-[#d4a017]/80 text-[10px] font-bold text-black backdrop-blur-sm">
                  {facilityImages[3].count}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 right-0 translate-y-4 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="text-sm font-bold text-white">{facilityImages[3].label}</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Feature List */}
        <ScrollReveal delay={0.3}>
          <div ref={featureRef} className="mt-12 md:mt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
            {features.map((feature) => {
              const FeatureIcon = feature.icon
              return (
                <div
                  key={feature.name}
                  className={cn(
                    'group flex flex-col items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] p-5 text-center',
                    'backdrop-blur-sm transition-all duration-300',
                    'hover:border-[#d4a017]/40 hover:bg-[#d4a017]/[0.06] hover:shadow-[0_0_20px_-5px_rgba(212,160,23,0.15)]'
                  )}
                >
                  <div className="icon-bounce-hover flex h-10 w-10 items-center justify-center rounded-lg bg-[#d4a017]/10 transition-colors duration-300 group-hover:bg-[#d4a017]/20">
                    <FeatureIcon className="h-5 w-5 text-[#e8b923]" />
                  </div>
                  <span className="text-xs font-medium text-neutral-300 group-hover:text-white transition-colors duration-300">
                    {feature.name}
                  </span>
                  <FeatureCountUp value={feature.count} isInView={featuresInView} />
                </div>
              )
            })}
          </div>
        </ScrollReveal>

        {/* View All Facilities Button */}
        <ScrollReveal delay={0.4}>
          <div className="mt-10 text-center">
            <Button
              variant="outline"
              size="lg"
              className="border-[#d4a017]/40 bg-transparent text-[#e8b923] hover:bg-[#d4a017]/10 hover:border-[#d4a017]/60 font-semibold transition-all duration-300 group"
            >
              View All Facilities
              <ArrowRight className="ml-1.5 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
