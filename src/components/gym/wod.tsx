'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, Play, X, Flame, Dumbbell, Timer, RotateCcw, Pause, ChevronRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollReveal } from '@/components/gym/scroll-reveal'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced'

interface Exercise {
  name: string
  sets: number
  reps: string
}

interface DayWorkout {
  day: string
  short: string
  name: string
  difficulty: Difficulty
  time: string
  exercises: Exercise[]
  muscles: string[]
  description: string
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

const workouts: DayWorkout[] = [
  {
    day: 'Monday',
    short: 'Mon',
    name: 'Upper Body Blast',
    difficulty: 'Intermediate',
    time: '45 min',
    muscles: ['Chest', 'Shoulders', 'Triceps'],
    description: 'Push your upper body to the limit with compound movements and isolation work.',
    exercises: [
      { name: 'Barbell Bench Press', sets: 4, reps: '8-10' },
      { name: 'Overhead Press', sets: 3, reps: '10-12' },
      { name: 'Incline Dumbbell Press', sets: 3, reps: '10-12' },
      { name: 'Lateral Raises', sets: 3, reps: '12-15' },
      { name: 'Tricep Dips', sets: 3, reps: '10-12' },
      { name: 'Cable Flyes', sets: 3, reps: '12-15' },
    ],
  },
  {
    day: 'Tuesday',
    short: 'Tue',
    name: 'Leg Day Inferno',
    difficulty: 'Advanced',
    time: '55 min',
    muscles: ['Quads', 'Hamstrings', 'Glutes'],
    description: 'Build powerful legs with heavy compound lifts and targeted accessories.',
    exercises: [
      { name: 'Barbell Back Squat', sets: 5, reps: '5-8' },
      { name: 'Romanian Deadlift', sets: 4, reps: '8-10' },
      { name: 'Bulgarian Split Squat', sets: 3, reps: '10-12' },
      { name: 'Leg Press', sets: 3, reps: '12-15' },
      { name: 'Walking Lunges', sets: 3, reps: '12 each' },
      { name: 'Calf Raises', sets: 4, reps: '15-20' },
    ],
  },
  {
    day: 'Wednesday',
    short: 'Wed',
    name: 'Full Body Forge',
    difficulty: 'Intermediate',
    time: '50 min',
    muscles: ['Full Body', 'Core'],
    description: 'A balanced full-body session to build strength and functional fitness.',
    exercises: [
      { name: 'Deadlift', sets: 4, reps: '5-8' },
      { name: 'Pull-Ups', sets: 3, reps: '8-10' },
      { name: 'Front Squat', sets: 3, reps: '8-10' },
      { name: 'Push-Ups', sets: 3, reps: '15-20' },
      { name: 'Plank Hold', sets: 3, reps: '60 sec' },
      { name: 'Kettlebell Swings', sets: 3, reps: '15' },
    ],
  },
  {
    day: 'Thursday',
    short: 'Thu',
    name: 'Back & Biceps Attack',
    difficulty: 'Intermediate',
    time: '45 min',
    muscles: ['Back', 'Biceps', 'Rear Delts'],
    description: 'Sculpt a wide, thick back and powerful biceps with this pull-focused workout.',
    exercises: [
      { name: 'Barbell Rows', sets: 4, reps: '8-10' },
      { name: 'Weighted Pull-Ups', sets: 3, reps: '6-8' },
      { name: 'Seated Cable Row', sets: 3, reps: '10-12' },
      { name: 'Face Pulls', sets: 3, reps: '15-20' },
      { name: 'Barbell Curls', sets: 3, reps: '10-12' },
      { name: 'Hammer Curls', sets: 3, reps: '12-15' },
    ],
  },
  {
    day: 'Friday',
    short: 'Fri',
    name: 'HIIT Burnout',
    difficulty: 'Advanced',
    time: '35 min',
    muscles: ['Cardio', 'Full Body', 'Core'],
    description: 'High-intensity intervals that torch calories and push your limits.',
    exercises: [
      { name: 'Burpees', sets: 4, reps: '15' },
      { name: 'Box Jumps', sets: 4, reps: '12' },
      { name: 'Battle Ropes', sets: 4, reps: '30 sec' },
      { name: 'Mountain Climbers', sets: 4, reps: '20 each' },
      { name: 'Kettlebell Cleans', sets: 3, reps: '10 each' },
      { name: 'Sprint Intervals', sets: 5, reps: '30 sec' },
    ],
  },
  {
    day: 'Saturday',
    short: 'Sat',
    name: 'Shoulder & Arm Sculptor',
    difficulty: 'Beginner',
    time: '40 min',
    muscles: ['Shoulders', 'Biceps', 'Triceps'],
    description: 'Sculpt round delts and defined arms with focused isolation work.',
    exercises: [
      { name: 'Dumbbell Shoulder Press', sets: 3, reps: '10-12' },
      { name: 'Arnold Press', sets: 3, reps: '10-12' },
      { name: 'Lateral Raises', sets: 3, reps: '12-15' },
      { name: 'Preacher Curls', sets: 3, reps: '10-12' },
      { name: 'Skull Crushers', sets: 3, reps: '10-12' },
      { name: 'Reverse Flyes', sets: 3, reps: '12-15' },
    ],
  },
  {
    day: 'Sunday',
    short: 'Sun',
    name: 'Active Recovery Flow',
    difficulty: 'Beginner',
    time: '30 min',
    muscles: ['Flexibility', 'Core', 'Mobility'],
    description: 'Light movement and stretching to recover and prepare for the week ahead.',
    exercises: [
      { name: 'Yoga Sun Salutations', sets: 3, reps: '5 flows' },
      { name: 'Foam Rolling', sets: 1, reps: '10 min' },
      { name: 'Bird-Dog Holds', sets: 3, reps: '10 each' },
      { name: 'Cat-Cow Stretches', sets: 3, reps: '10' },
      { name: 'Hip 90/90 Stretch', sets: 2, reps: '30 sec each' },
      { name: 'Deep Breathing', sets: 3, reps: '10 breaths' },
    ],
  },
]

function getTodayIndex(): number {
  const day = new Date().getDay()
  // Sunday=0 → index 6, Monday=1 → index 0, etc.
  return day === 0 ? 6 : day - 1
}

function RestTimerModal({ open, onOpenChange, workoutName }: { open: boolean; onOpenChange: (open: boolean) => void; workoutName: string }) {
  const [time, setTime] = useState(0)
  const [running, setRunning] = useState(false)
  const [restTarget, setRestTarget] = useState(90)

  useEffect(() => {
    if (!running) return
    const interval = setInterval(() => {
      setTime((t) => t + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [running])

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  const handleReset = useCallback(() => {
    setRunning(false)
    setTime(0)
  }, [])

  const handleRestPreset = useCallback((seconds: number) => {
    setTime(0)
    setRestTarget(seconds)
    setRunning(true)
  }, [])

  const progressPercent = restTarget > 0 && running && time <= restTarget
    ? (time / restTarget) * 100
    : time > restTarget ? 100 : 0

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#111111]/95 backdrop-blur-xl border-[#d4a017]/20 text-white max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            <Timer className="h-5 w-5 text-[#d4a017]" />
            Rest Timer
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            {workoutName}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Timer Display */}
          <div className="text-center">
            <div className="relative inline-flex items-center justify-center">
              {/* SVG Ring */}
              <svg className="w-36 h-36 -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
                <circle
                  cx="60" cy="60" r="52" fill="none"
                  stroke="#d4a017" strokeWidth="6" strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 52}`}
                  strokeDashoffset={`${2 * Math.PI * 52 * (1 - progressPercent / 100)}`}
                  className="transition-all duration-1000"
                />
              </svg>
              <span className="absolute text-3xl font-mono font-bold text-white">
                {formatTime(time)}
              </span>
            </div>
            {running && time <= restTarget && (
              <p className="text-sm text-gray-400 mt-2">
                Rest: {restTarget - time}s remaining
              </p>
            )}
            {time > restTarget && running && (
              <p className="text-sm text-[#e8b923] mt-2 animate-pulse">
                Rest complete — go!
              </p>
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-3">
            {!running ? (
              <Button
                onClick={() => setRunning(true)}
                className="bg-gradient-to-r from-[#d4a017] to-[#e8b923] text-black font-semibold px-8"
              >
                <Play className="h-4 w-4 mr-2" />
                Start
              </Button>
            ) : (
              <Button
                onClick={() => setRunning(false)}
                variant="outline"
                className="border-[#d4a017]/40 text-[#e8b923] hover:bg-[#d4a017]/10"
              >
                <Pause className="h-4 w-4 mr-2" />
                Pause
              </Button>
            )}
            <Button
              onClick={handleReset}
              variant="ghost"
              className="text-gray-400 hover:text-white"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>

          {/* Rest Presets */}
          <div className="space-y-2">
            <p className="text-xs text-gray-500 text-center uppercase tracking-wider">Rest Presets</p>
            <div className="flex justify-center gap-2">
              {[30, 60, 90, 120, 180].map((sec) => (
                <button
                  key={sec}
                  onClick={() => handleRestPreset(sec)}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border',
                    restTarget === sec && !running
                      ? 'bg-[#d4a017]/20 text-[#e8b923] border-[#d4a017]/40'
                      : 'bg-white/[0.04] text-gray-400 border-white/[0.08] hover:border-[#d4a017]/30 hover:text-[#e8b923]'
                  )}
                >
                  {sec >= 60 ? `${sec / 60}m` : `${sec}s`}
                </button>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function Wod() {
  const [selectedDay, setSelectedDay] = useState(getTodayIndex)
  const [modalOpen, setModalOpen] = useState(false)

  const workout = workouts[selectedDay]
  const diffStyle = difficultyStyles[workout.difficulty]
  const isToday = (index: number) => index === getTodayIndex()

  return (
    <section className="relative py-20 md:py-28 bg-[#0a0a0a] overflow-hidden" id="wod">
      {/* Decorative section number */}
      <span className="absolute top-8 right-8 text-[200px] font-black text-white/[0.02] pointer-events-none select-none leading-none">13</span>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-10 md:mb-14">
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#d4a017]/60">13 — Workout of the Day</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-2" style={{ textShadow: '0 0 40px rgba(212, 160, 23, 0.1)' }}>
            TODAY&apos;S <span className="text-[#e8b923]">WOD</span>
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
            A fresh workout every day. Follow along or preview the week ahead.
          </p>
        </ScrollReveal>

        {/* Day Selector */}
        <ScrollReveal delay={0.1}>
          <div className="flex justify-center gap-2 mb-10 overflow-x-auto pb-2">
            {workouts.map((w, index) => (
              <button
                key={w.day}
                onClick={() => setSelectedDay(index)}
                className={cn(
                  'relative flex-shrink-0 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 border',
                  selectedDay === index
                    ? 'bg-gradient-to-r from-[#d4a017] to-[#e8b923] text-black border-transparent shadow-lg shadow-[#d4a017]/25'
                    : isToday(index)
                      ? 'bg-[#d4a017]/10 text-[#e8b923] border-[#d4a017]/30 hover:bg-[#d4a017]/20'
                      : 'bg-white/[0.04] text-neutral-400 border-white/[0.08] hover:border-[#d4a017]/40 hover:text-[#e8b923]'
                )}
              >
                {w.short}
                {isToday(index) && selectedDay !== index && (
                  <span className="absolute -top-1 -right-1 size-2 rounded-full bg-[#d4a017] animate-pulse" />
                )}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Workout Card */}
        <ScrollReveal delay={0.2}>
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedDay}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="max-w-3xl mx-auto"
            >
              <div className="relative rounded-2xl border border-[#d4a017]/20 bg-white/[0.03] backdrop-blur-xl overflow-hidden">
                {/* Gradient header */}
                <div className="relative bg-gradient-to-r from-[#d4a017]/15 via-[#e8b923]/10 to-[#d4a017]/15 px-6 py-5 border-b border-[#d4a017]/15">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Flame className="h-5 w-5 text-[#e8b923]" />
                        <h3 className="text-xl font-bold text-white">{workout.name}</h3>
                      </div>
                      <p className="text-sm text-gray-400">{workout.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={cn('text-[10px] font-semibold uppercase tracking-wider border', diffStyle.badge)}
                      >
                        <span className={cn('inline-block size-1.5 rounded-full mr-1', diffStyle.dot)} />
                        {workout.difficulty}
                      </Badge>
                      <Badge variant="outline" className="text-[10px] font-semibold uppercase tracking-wider border border-white/[0.12] bg-white/[0.06] text-gray-300">
                        <Clock className="h-3 w-3 mr-1" />
                        {workout.time}
                      </Badge>
                    </div>
                  </div>
                  {/* Muscle group tags */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {workout.muscles.map((muscle) => (
                      <span
                        key={muscle}
                        className="px-2.5 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider bg-[#d4a017]/10 text-[#e8b923] border border-[#d4a017]/20"
                      >
                        {muscle}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Exercise List */}
                <div className="p-6 space-y-3">
                  {workout.exercises.map((exercise, index) => (
                    <motion.div
                      key={exercise.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center justify-between py-2.5 px-4 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-[#d4a017]/20 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#d4a017]/10 text-[#d4a017] text-xs font-bold">
                          {index + 1}
                        </span>
                        <span className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">
                          {exercise.name}
                        </span>
                      </div>
                      <span className="text-xs font-semibold text-[#e8b923] bg-[#d4a017]/10 px-3 py-1 rounded-lg">
                        {exercise.sets} × {exercise.reps}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Footer with CTA */}
                <div className="px-6 pb-6">
                  <Button
                    onClick={() => setModalOpen(true)}
                    className="w-full bg-gradient-to-r from-[#d4a017] to-[#e8b923] text-black font-semibold py-3 rounded-xl hover:shadow-lg hover:shadow-[#d4a017]/25 transition-all duration-300 group"
                  >
                    <Dumbbell className="h-4 w-4 mr-2" />
                    Start Workout
                    <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </ScrollReveal>

        {/* Day indicator */}
        <ScrollReveal delay={0.3}>
          <p className="text-center text-xs text-gray-600 mt-6">
            {isToday(selectedDay) ? '🔥 Today\'s workout' : `Previewing ${workout.day}'s workout`} • Click any day to preview
          </p>
        </ScrollReveal>
      </div>

      {/* Rest Timer Modal */}
      <RestTimerModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        workoutName={workout.name}
      />
    </section>
  )
}
