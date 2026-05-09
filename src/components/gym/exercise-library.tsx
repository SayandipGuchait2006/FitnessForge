'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Dumbbell, MoveUpRight, Trophy, Flame, Target, Shield, Zap, Heart } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { ScrollReveal } from '@/components/gym/scroll-reveal'
import { cn } from '@/lib/utils'

type MuscleGroup = 'Chest' | 'Back' | 'Legs' | 'Shoulders' | 'Arms' | 'Core'
type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced'
type FilterTab = 'All' | MuscleGroup

interface Exercise {
  name: string
  muscleGroup: MuscleGroup
  difficulty: Difficulty
  description: string
  icon: React.ElementType
}

const muscleGroupColors: Record<MuscleGroup, { bg: string; border: string; text: string; badge: string; glow: string }> = {
  Chest: {
    bg: 'bg-red-500/10',
    border: 'border-red-500/30',
    text: 'text-red-400',
    badge: 'bg-red-500/20 text-red-400 border-red-500/30',
    glow: 'hover:shadow-red-500/10',
  },
  Back: {
    bg: 'bg-sky-500/10',
    border: 'border-sky-500/30',
    text: 'text-sky-400',
    badge: 'bg-sky-500/20 text-sky-400 border-sky-500/30',
    glow: 'hover:shadow-sky-500/10',
  },
  Legs: {
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    text: 'text-amber-400',
    badge: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    glow: 'hover:shadow-amber-500/10',
  },
  Shoulders: {
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
    text: 'text-purple-400',
    badge: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    glow: 'hover:shadow-purple-500/10',
  },
  Arms: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    text: 'text-emerald-400',
    badge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    glow: 'hover:shadow-emerald-500/10',
  },
  Core: {
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/30',
    text: 'text-orange-400',
    badge: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    glow: 'hover:shadow-orange-500/10',
  },
}

const difficultyStyles: Record<Difficulty, { badge: string; dot: string }> = {
  Beginner: {
    badge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    dot: 'bg-emerald-400',
  },
  Intermediate: {
    badge: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    dot: 'bg-amber-400',
  },
  Advanced: {
    badge: 'bg-red-500/20 text-red-400 border-red-500/30',
    dot: 'bg-red-400',
  },
}

const muscleIcons: Record<MuscleGroup, React.ElementType> = {
  Chest: Trophy,
  Back: Shield,
  Legs: Flame,
  Shoulders: Target,
  Arms: Dumbbell,
  Core: Heart,
}

const exercises: Exercise[] = [
  {
    name: 'Barbell Bench Press',
    muscleGroup: 'Chest',
    difficulty: 'Intermediate',
    description: 'The king of chest exercises. Lie flat on a bench and press the barbell from chest level to full arm extension.',
    icon: muscleIcons.Chest,
  },
  {
    name: 'Incline Dumbbell Press',
    muscleGroup: 'Chest',
    difficulty: 'Beginner',
    description: 'Target the upper chest with dumbbells on an incline bench. Great for building balanced pectoral development.',
    icon: muscleIcons.Chest,
  },
  {
    name: 'Deadlift',
    muscleGroup: 'Back',
    difficulty: 'Advanced',
    description: 'The ultimate compound lift. Lift the barbell from the ground to hip level, engaging your entire posterior chain.',
    icon: muscleIcons.Back,
  },
  {
    name: 'Pull-Ups',
    muscleGroup: 'Back',
    difficulty: 'Intermediate',
    description: 'Hang from a bar and pull your body up until your chin clears it. Builds wide, powerful lats.',
    icon: muscleIcons.Back,
  },
  {
    name: 'Barbell Squat',
    muscleGroup: 'Legs',
    difficulty: 'Advanced',
    description: 'The foundation of leg training. Squat down with the barbell on your back and drive back up to standing.',
    icon: muscleIcons.Legs,
  },
  {
    name: 'Lunges',
    muscleGroup: 'Legs',
    difficulty: 'Beginner',
    description: 'Step forward and lower your back knee toward the ground. Excellent for quad and glute development.',
    icon: muscleIcons.Legs,
  },
  {
    name: 'Overhead Press',
    muscleGroup: 'Shoulders',
    difficulty: 'Intermediate',
    description: 'Press the barbell from shoulder height to full overhead lockout. Builds strong, capped delts.',
    icon: muscleIcons.Shoulders,
  },
  {
    name: 'Lateral Raises',
    muscleGroup: 'Shoulders',
    difficulty: 'Beginner',
    description: 'Raise dumbbells out to your sides to shoulder height. Isolates the medial deltoid for width.',
    icon: muscleIcons.Shoulders,
  },
  {
    name: 'Barbell Curl',
    muscleGroup: 'Arms',
    difficulty: 'Beginner',
    description: 'Curl the barbell from thigh level to shoulder height. The classic bicep builder for thick arms.',
    icon: muscleIcons.Arms,
  },
  {
    name: 'Tricep Dips',
    muscleGroup: 'Arms',
    difficulty: 'Intermediate',
    description: 'Lower your body on parallel bars by bending your elbows, then press back up. Builds horseshoe triceps.',
    icon: muscleIcons.Arms,
  },
  {
    name: 'Plank Hold',
    muscleGroup: 'Core',
    difficulty: 'Beginner',
    description: 'Hold a rigid push-up position on your forearms. Builds endurance and stability through the entire core.',
    icon: muscleIcons.Core,
  },
  {
    name: 'Hanging Leg Raises',
    muscleGroup: 'Core',
    difficulty: 'Advanced',
    description: 'Hang from a bar and raise your legs to parallel or above. The gold standard for lower ab development.',
    icon: muscleIcons.Core,
  },
]

const filterTabs: FilterTab[] = ['All', 'Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core']

export function ExerciseLibrary() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>('All')

  const filteredExercises = activeFilter === 'All'
    ? exercises
    : exercises.filter((ex) => ex.muscleGroup === activeFilter)

  return (
    <section className="relative py-20 md:py-28 bg-[#0a0a0a] overflow-hidden" id="exercises">
      {/* Decorative section number */}
      <span className="absolute top-8 right-8 text-[200px] font-black text-white/[0.02] pointer-events-none select-none leading-none">12</span>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-10 md:mb-14">
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#d4a017]/60">12 — Exercises</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-2" style={{ textShadow: '0 0 40px rgba(212, 160, 23, 0.1)' }}>
            EXERCISE <span className="text-[#e8b923]">LIBRARY</span>
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
            Master the fundamentals. Browse our curated collection of essential exercises.
          </p>
        </ScrollReveal>

        {/* Filter Tabs */}
        <ScrollReveal delay={0.1}>
          <div className="flex gap-2 overflow-x-auto pb-2 mb-10 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent justify-center flex-wrap">
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab
              const muscleGroup = tab as MuscleGroup
              const colorInfo = tab !== 'All' ? muscleGroupColors[muscleGroup] : null

              return (
                <button
                  key={tab}
                  onClick={() => setActiveFilter(tab)}
                  className={cn(
                    'flex-shrink-0 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 border',
                    isActive && tab === 'All'
                      ? 'bg-gradient-to-r from-[#d4a017] to-[#e8b923] text-black border-transparent shadow-lg shadow-[#d4a017]/25'
                      : isActive && colorInfo
                        ? `${colorInfo.bg} ${colorInfo.text} ${colorInfo.border}`
                        : 'bg-white/[0.04] text-neutral-400 border-white/[0.08] hover:border-[#d4a017]/40 hover:text-[#e8b923]'
                  )}
                >
                  {tab}
                </button>
              )
            })}
          </div>
        </ScrollReveal>

        {/* Exercise Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="contents"
            >
              {filteredExercises.map((exercise, index) => {
                const colors = muscleGroupColors[exercise.muscleGroup]
                const diffStyle = difficultyStyles[exercise.difficulty]
                const Icon = exercise.icon

                return (
                  <motion.div
                    key={exercise.name}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.06 }}
                    className={cn(
                      'group relative flex flex-col rounded-2xl border bg-[#111111]/95 backdrop-blur-xl p-5 transition-all duration-300',
                      'hover:-translate-y-1 hover:border-[#d4a017]/50',
                      'hover:shadow-[0_0_30px_-5px_rgba(212,160,23,0.15)]',
                      colors.border
                    )}
                  >
                    {/* Top Row: Icon + Muscle Badge + Difficulty */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className={cn('flex h-9 w-9 items-center justify-center rounded-lg', colors.bg)}>
                          <Icon className={cn('h-4.5 w-4.5', colors.text)} />
                        </div>
                        <Badge
                          variant="outline"
                          className={cn('text-[9px] font-semibold uppercase tracking-wider border', colors.badge)}
                        >
                          {exercise.muscleGroup}
                        </Badge>
                      </div>
                      <Badge
                        variant="outline"
                        className={cn('text-[9px] font-semibold uppercase tracking-wider border', diffStyle.badge)}
                      >
                        <span className={cn('inline-block size-1.5 rounded-full mr-1', diffStyle.dot)} />
                        {exercise.difficulty}
                      </Badge>
                    </div>

                    {/* Exercise Name */}
                    <h3 className="text-white font-bold text-base mb-2 group-hover:text-[#e8b923] transition-colors duration-300">
                      {exercise.name}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-4">
                      {exercise.description}
                    </p>

                    {/* Bottom: View Details link */}
                    <div className="flex items-center gap-1.5 text-[#d4a017]/70 group-hover:text-[#e8b923] transition-colors duration-300 text-xs font-medium">
                      <Zap className="h-3.5 w-3.5" />
                      <span>Learn Form</span>
                      <MoveUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Legend */}
        <ScrollReveal delay={0.4}>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {(Object.keys(muscleGroupColors) as MuscleGroup[]).map((group) => {
              const colors = muscleGroupColors[group]
              return (
                <div key={group} className="flex items-center gap-1.5">
                  <div className={cn('h-2.5 w-2.5 rounded-full', colors.bg, 'ring-1', colors.border)} />
                  <span className={cn('text-xs font-medium', colors.text)}>{group}</span>
                </div>
              )
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
