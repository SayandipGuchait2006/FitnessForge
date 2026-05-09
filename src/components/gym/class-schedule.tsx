'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, User, Flame, Dumbbell, Leaf, Swords, Bike, Crosshair, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollReveal } from '@/components/gym/scroll-reveal'
import { BookClassModal } from '@/components/gym/book-class-modal'
import { cn } from '@/lib/utils'

type ClassType = 'HIIT' | 'Yoga' | 'PowerLift' | 'Boxing' | 'Spin' | 'CrossFit'

interface ScheduleSlot {
  className: string
  type: ClassType
  time: string
  trainer: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  duration: string
}

const classColors: Record<ClassType, { bg: string; border: string; text: string; badge: string }> = {
  HIIT: {
    bg: 'bg-red-500/10',
    border: 'border-red-500/30',
    text: 'text-red-400',
    badge: 'bg-red-500/20 text-red-400 border-red-500/30',
  },
  Yoga: {
    bg: 'bg-green-500/10',
    border: 'border-green-500/30',
    text: 'text-green-400',
    badge: 'bg-green-500/20 text-green-400 border-green-500/30',
  },
  PowerLift: {
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
    text: 'text-purple-400',
    badge: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  },
  Boxing: {
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/30',
    text: 'text-orange-400',
    badge: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  },
  Spin: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    text: 'text-blue-400',
    badge: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  },
  CrossFit: {
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    text: 'text-amber-400',
    badge: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  },
}

const classIcons: Record<ClassType, React.ElementType> = {
  HIIT: Flame,
  Yoga: Leaf,
  PowerLift: Dumbbell,
  Boxing: Swords,
  Spin: Bike,
  CrossFit: Crosshair,
}

const difficultyStyles: Record<string, string> = {
  Beginner: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  Intermediate: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  Advanced: 'bg-red-500/20 text-red-400 border-red-500/30',
}

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const
type Day = (typeof days)[number]

const fullDayNames: Record<Day, string> = {
  Mon: 'Monday',
  Tue: 'Tuesday',
  Wed: 'Wednesday',
  Thu: 'Thursday',
  Fri: 'Friday',
  Sat: 'Saturday',
  Sun: 'Sunday',
}

const schedule: Record<Day, ScheduleSlot[]> = {
  Mon: [
    { className: 'HIIT Inferno', type: 'HIIT', time: '6:00 AM', trainer: 'Coach Arjun', difficulty: 'Advanced', duration: '45 min' },
    { className: 'Yoga Flow', type: 'Yoga', time: '8:00 AM', trainer: 'Coach Priya', difficulty: 'Beginner', duration: '50 min' },
    { className: 'PowerLift', type: 'PowerLift', time: '10:00 AM', trainer: 'Coach Vikram', difficulty: 'Intermediate', duration: '60 min' },
    { className: 'Boxing Blitz', type: 'Boxing', time: '5:00 PM', trainer: 'Coach Rahul', difficulty: 'Intermediate', duration: '45 min' },
    { className: 'Spin Cyclone', type: 'Spin', time: '6:30 PM', trainer: 'Coach Meera', difficulty: 'Beginner', duration: '40 min' },
    { className: 'CrossFit Forge', type: 'CrossFit', time: '8:00 PM', trainer: 'Coach Arjun', difficulty: 'Advanced', duration: '55 min' },
  ],
  Tue: [
    { className: 'PowerLift', type: 'PowerLift', time: '6:00 AM', trainer: 'Coach Vikram', difficulty: 'Intermediate', duration: '60 min' },
    { className: 'Spin Cyclone', type: 'Spin', time: '8:00 AM', trainer: 'Coach Meera', difficulty: 'Beginner', duration: '40 min' },
    { className: 'Yoga Flow', type: 'Yoga', time: '10:00 AM', trainer: 'Coach Priya', difficulty: 'Beginner', duration: '50 min' },
    { className: 'HIIT Inferno', type: 'HIIT', time: '5:00 PM', trainer: 'Coach Arjun', difficulty: 'Advanced', duration: '45 min' },
    { className: 'CrossFit Forge', type: 'CrossFit', time: '6:30 PM', trainer: 'Coach Rahul', difficulty: 'Advanced', duration: '55 min' },
    { className: 'Boxing Blitz', type: 'Boxing', time: '8:00 PM', trainer: 'Coach Rahul', difficulty: 'Intermediate', duration: '45 min' },
  ],
  Wed: [
    { className: 'Yoga Flow', type: 'Yoga', time: '6:00 AM', trainer: 'Coach Priya', difficulty: 'Beginner', duration: '50 min' },
    { className: 'HIIT Inferno', type: 'HIIT', time: '8:00 AM', trainer: 'Coach Arjun', difficulty: 'Advanced', duration: '45 min' },
    { className: 'Boxing Blitz', type: 'Boxing', time: '10:00 AM', trainer: 'Coach Rahul', difficulty: 'Intermediate', duration: '45 min' },
    { className: 'Spin Cyclone', type: 'Spin', time: '5:00 PM', trainer: 'Coach Meera', difficulty: 'Beginner', duration: '40 min' },
    { className: 'PowerLift', type: 'PowerLift', time: '6:30 PM', trainer: 'Coach Vikram', difficulty: 'Intermediate', duration: '60 min' },
    { className: 'CrossFit Forge', type: 'CrossFit', time: '8:00 PM', trainer: 'Coach Arjun', difficulty: 'Advanced', duration: '55 min' },
  ],
  Thu: [
    { className: 'CrossFit Forge', type: 'CrossFit', time: '6:00 AM', trainer: 'Coach Arjun', difficulty: 'Advanced', duration: '55 min' },
    { className: 'Yoga Flow', type: 'Yoga', time: '8:00 AM', trainer: 'Coach Priya', difficulty: 'Beginner', duration: '50 min' },
    { className: 'Spin Cyclone', type: 'Spin', time: '10:00 AM', trainer: 'Coach Meera', difficulty: 'Beginner', duration: '40 min' },
    { className: 'HIIT Inferno', type: 'HIIT', time: '5:00 PM', trainer: 'Coach Arjun', difficulty: 'Advanced', duration: '45 min' },
    { className: 'Boxing Blitz', type: 'Boxing', time: '6:30 PM', trainer: 'Coach Rahul', difficulty: 'Intermediate', duration: '45 min' },
    { className: 'PowerLift', type: 'PowerLift', time: '8:00 PM', trainer: 'Coach Vikram', difficulty: 'Intermediate', duration: '60 min' },
  ],
  Fri: [
    { className: 'HIIT Inferno', type: 'HIIT', time: '6:00 AM', trainer: 'Coach Arjun', difficulty: 'Advanced', duration: '45 min' },
    { className: 'PowerLift', type: 'PowerLift', time: '8:00 AM', trainer: 'Coach Vikram', difficulty: 'Intermediate', duration: '60 min' },
    { className: 'Boxing Blitz', type: 'Boxing', time: '10:00 AM', trainer: 'Coach Rahul', difficulty: 'Intermediate', duration: '45 min' },
    { className: 'Yoga Flow', type: 'Yoga', time: '5:00 PM', trainer: 'Coach Priya', difficulty: 'Beginner', duration: '50 min' },
    { className: 'Spin Cyclone', type: 'Spin', time: '6:30 PM', trainer: 'Coach Meera', difficulty: 'Beginner', duration: '40 min' },
    { className: 'CrossFit Forge', type: 'CrossFit', time: '8:00 PM', trainer: 'Coach Rahul', difficulty: 'Advanced', duration: '55 min' },
  ],
  Sat: [
    { className: 'Yoga Flow', type: 'Yoga', time: '7:00 AM', trainer: 'Coach Priya', difficulty: 'Beginner', duration: '50 min' },
    { className: 'CrossFit Forge', type: 'CrossFit', time: '9:00 AM', trainer: 'Coach Arjun', difficulty: 'Advanced', duration: '55 min' },
    { className: 'HIIT Inferno', type: 'HIIT', time: '11:00 AM', trainer: 'Coach Arjun', difficulty: 'Advanced', duration: '45 min' },
    { className: 'Boxing Blitz', type: 'Boxing', time: '3:00 PM', trainer: 'Coach Rahul', difficulty: 'Intermediate', duration: '45 min' },
    { className: 'Spin Cyclone', type: 'Spin', time: '5:00 PM', trainer: 'Coach Meera', difficulty: 'Beginner', duration: '40 min' },
  ],
  Sun: [
    { className: 'Yoga Flow', type: 'Yoga', time: '8:00 AM', trainer: 'Coach Priya', difficulty: 'Beginner', duration: '50 min' },
    { className: 'PowerLift', type: 'PowerLift', time: '10:00 AM', trainer: 'Coach Vikram', difficulty: 'Intermediate', duration: '60 min' },
    { className: 'Spin Cyclone', type: 'Spin', time: '12:00 PM', trainer: 'Coach Meera', difficulty: 'Beginner', duration: '40 min' },
    { className: 'HIIT Inferno', type: 'HIIT', time: '4:00 PM', trainer: 'Coach Arjun', difficulty: 'Advanced', duration: '45 min' },
  ],
}

export function ClassSchedule() {
  const [activeDay, setActiveDay] = useState<Day>('Mon')
  const [selectedClass, setSelectedClass] = useState<string>('')
  const [bookingOpen, setBookingOpen] = useState(false)

  const handleBook = (className: string) => {
    setSelectedClass(className)
    setBookingOpen(true)
  }

  const currentSlots = schedule[activeDay]

  return (
    <section className="relative py-20 md:py-28 bg-[#0a0a0a]" id="schedule">
      <BookClassModal open={bookingOpen} onOpenChange={setBookingOpen} className={selectedClass} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-10 md:mb-14">
          <h2 className="text-sm font-semibold tracking-[0.2em] uppercase text-[#d4a017] mb-3">
            Weekly Schedule
          </h2>
          <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            CLASS <span className="text-[#e8b923]">TIMETABLE</span>
          </p>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Plan your week. Find the perfect class at the perfect time.
          </p>
        </ScrollReveal>

        {/* Day Tabs */}
        <ScrollReveal delay={0.1}>
          <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                className={cn(
                  'flex-shrink-0 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300',
                  activeDay === day
                    ? 'bg-gradient-to-r from-[#d4a017] to-[#e8b923] text-black shadow-lg shadow-[#d4a017]/25'
                    : 'bg-white/[0.04] text-neutral-400 border border-white/[0.08] hover:border-[#d4a017]/40 hover:text-[#e8b923]'
                )}
              >
                <span className="block text-xs font-medium opacity-70">{fullDayNames[day]}</span>
                <span className="block">{day}</span>
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Schedule Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDay}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="contents"
            >
              {currentSlots.map((slot, index) => {
                const colors = classColors[slot.type]
                const Icon = classIcons[slot.type]
                return (
                  <motion.div
                    key={`${slot.type}-${slot.time}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: index * 0.06 }}
                    className={cn(
                      'group relative flex flex-col rounded-2xl border bg-[#111111]/95 backdrop-blur-xl p-5 transition-all duration-300',
                      'hover:shadow-[0_0_30px_-5px_rgba(212,160,23,0.15)]',
                      colors.border,
                      'hover:border-[#d4a017]/50'
                    )}
                  >
                    {/* Top row: Icon + Time + Type badge */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className={cn('flex h-9 w-9 items-center justify-center rounded-lg', colors.bg)}>
                          <Icon className={cn('h-4.5 w-4.5', colors.text)} />
                        </div>
                        <div>
                          <p className="text-white font-bold text-sm leading-tight">{slot.className}</p>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <Clock className="h-3 w-3 text-neutral-500" />
                            <span className="text-xs text-neutral-400">{slot.time}</span>
                          </div>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={cn('text-[9px] font-semibold uppercase tracking-wider border', colors.badge)}
                      >
                        {slot.type}
                      </Badge>
                    </div>

                    {/* Trainer + Duration + Difficulty */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-center gap-1.5 text-neutral-500">
                        <User className="h-3 w-3" />
                        <span className="text-xs">{slot.trainer}</span>
                      </div>
                      <span className="text-neutral-700">•</span>
                      <span className="text-xs text-neutral-500">{slot.duration}</span>
                      <span className="text-neutral-700">•</span>
                      <Badge
                        variant="outline"
                        className={cn('text-[9px] font-semibold uppercase tracking-wider border', difficultyStyles[slot.difficulty])}
                      >
                        {slot.difficulty}
                      </Badge>
                    </div>

                    {/* Book Button */}
                    <Button
                      className="w-full bg-white/[0.06] text-[#e8b923] font-semibold text-xs hover:bg-gradient-to-r hover:from-[#d4a017] hover:to-[#e8b923] hover:text-black transition-all duration-300 border border-white/[0.06] hover:border-transparent group/btn"
                      size="sm"
                      onClick={() => handleBook(slot.className)}
                    >
                      Book Now
                      <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
                    </Button>
                  </motion.div>
                )
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Legend */}
        <ScrollReveal delay={0.4}>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {(Object.keys(classColors) as ClassType[]).map((type) => {
              const colors = classColors[type]
              return (
                <div key={type} className="flex items-center gap-1.5">
                  <div className={cn('h-2.5 w-2.5 rounded-full', colors.bg, 'ring-1', colors.border)} />
                  <span className={cn('text-xs font-medium', colors.text)}>{type}</span>
                </div>
              )
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
