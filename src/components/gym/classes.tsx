'use client'

import { useState } from 'react'
import { Flame, Dumbbell, Leaf, Swords, Bike, Crosshair, Clock, Star, ArrowRight, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollReveal } from '@/components/gym/scroll-reveal'
import { BookClassModal } from '@/components/gym/book-class-modal'
import { cn } from '@/lib/utils'

interface GymClass {
  name: string
  description: string
  duration: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  icon: React.ElementType
  popular?: boolean
}

const classes: GymClass[] = [
  {
    name: 'HIIT Inferno',
    description: 'High-intensity interval training that torches calories and skyrockets your metabolism.',
    duration: '45 min',
    difficulty: 'Advanced',
    icon: Flame,
    popular: true,
  },
  {
    name: 'PowerLift',
    description: 'Raw strength and power training to build serious muscle and functional force.',
    duration: '60 min',
    difficulty: 'Intermediate',
    icon: Dumbbell,
  },
  {
    name: 'Yoga Flow',
    description: 'Mind-body harmony through fluid movements, breathwork, and deep flexibility.',
    duration: '50 min',
    difficulty: 'Beginner',
    icon: Leaf,
  },
  {
    name: 'Boxing Blitz',
    description: 'Combat cardio that sharpens reflexes, builds endurance, and relieves stress.',
    duration: '45 min',
    difficulty: 'Intermediate',
    icon: Swords,
  },
  {
    name: 'Spin Cyclone',
    description: 'Indoor cycling with rhythm-based routines that push your cardiovascular limits.',
    duration: '40 min',
    difficulty: 'Beginner',
    icon: Bike,
  },
  {
    name: 'CrossFit Forge',
    description: 'Functional fitness combining varied movements for total athletic dominance.',
    duration: '55 min',
    difficulty: 'Advanced',
    icon: Crosshair,
  },
]

const difficultyStyles: Record<string, string> = {
  Beginner: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  Intermediate: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  Advanced: 'bg-red-500/20 text-red-400 border-red-500/30',
}

export function Classes() {
  const [selectedClass, setSelectedClass] = useState<string>('')
  const [bookingOpen, setBookingOpen] = useState(false)

  const handleBookNow = (className: string) => {
    setSelectedClass(className)
    setBookingOpen(true)
  }

  return (
    <section id="classes" className="relative py-20 md:py-28 bg-[#0a0a0a] overflow-hidden section-progress grid-pattern">
      {/* Decorative section number */}
      <span className="absolute top-8 right-8 text-[200px] font-black text-white/[0.02] pointer-events-none select-none leading-none parallax-section-number">01</span>
      <BookClassModal open={bookingOpen} onOpenChange={setBookingOpen} className={selectedClass} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-14 md:mb-20">
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#d4a017]/60">01 — Our Programs</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mt-2" style={{ textShadow: '0 0 40px rgba(212, 160, 23, 0.1)' }}>
            OUR CLASSES
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
            Train with purpose. Every class designed to push your limits.
          </p>
        </ScrollReveal>

        {/* Classes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {classes.map((gymClass, index) => {
            const Icon = gymClass.icon
            return (
              <ScrollReveal key={gymClass.name} delay={index * 0.1}>
                <div
                  className={cn(
                    'group relative flex flex-col rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 md:p-7',
                    'backdrop-blur-sm transition-all duration-300',
                    'hover:border-[#d4a017]/50 hover:bg-white/[0.05]',
                    'hover:shadow-[0_0_30px_-5px_rgba(212,160,23,0.15)]',
                    'hover:-translate-y-1',
                    'card-border-hover card-bottom-border shimmer card-gradient-hover card-amber-border-hover'
                  )}
                >
                  {/* Bottom gradient overlay for text readability */}
                  <div className="absolute inset-x-0 bottom-0 h-24 rounded-b-2xl bg-gradient-to-t from-black/40 via-black/20 to-transparent pointer-events-none" />
                  {/* Popular Badge */}
                  {gymClass.popular && (
                    <div className="absolute -top-2.5 right-4 z-10 badge-pulse badge-glow-pulse">
                      <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-[#d4a017] to-[#e8b923] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-black shadow-lg">
                        <Flame className="h-3 w-3" />
                        Popular
                      </span>
                    </div>
                  )}

                  {/* Icon */}
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#d4a017]/10 transition-all duration-300 group-hover:bg-[#d4a017]/20 group-hover:scale-110">
                    <Icon className="h-6 w-6 text-[#e8b923]" />
                  </div>

                  {/* Name */}
                  <h3 className="text-xl font-bold text-white">{gymClass.name}</h3>

                  {/* Description */}
                  <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                    {gymClass.description}
                  </p>

                  {/* Meta row */}
                  <div className="mt-5 flex items-center gap-3">
                    <div className="flex items-center gap-1.5 text-neutral-500">
                      <Clock className="h-4 w-4" />
                      <span className="text-xs font-medium">{gymClass.duration}</span>
                    </div>
                    <Badge
                      variant="outline"
                      className={cn(
                        'text-[10px] font-semibold uppercase tracking-wider border',
                        difficultyStyles[gymClass.difficulty]
                      )}
                    >
                      <Star className="mr-0.5 h-3 w-3" />
                      {gymClass.difficulty}
                    </Badge>
                  </div>

                  {/* CTA */}
                  <Button
                    className="mt-6 w-full bg-[#d4a017] text-black font-semibold hover:bg-[#e8b923] transition-all duration-300 group/btn book-now-glow"
                    size="sm"
                    onClick={() => handleBookNow(gymClass.name)}
                  >
                    Book Now
                    <ArrowRight className="ml-1.5 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </Button>
                </div>
              </ScrollReveal>
            )
          })}
        </div>

        {/* Schedule Info */}
        <ScrollReveal delay={0.6}>
          <div className="mt-14 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-6 py-3 backdrop-blur-sm">
              <Clock className="h-4 w-4 text-[#e8b923]" />
              <span className="text-sm text-neutral-300">
                Mon–Sat: <span className="font-semibold text-white">5:30 AM – 10:00 PM</span>
              </span>
              <span className="text-neutral-600">|</span>
              <span className="text-sm text-neutral-300">
                Sunday: <span className="font-semibold text-white">7:00 AM – 8:00 PM</span>
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
