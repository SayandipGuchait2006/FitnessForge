'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, Clock, Flame, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollReveal } from '@/components/gym/scroll-reveal'
import { cn } from '@/lib/utils'

interface Challenge {
  name: string
  duration: string
  durationDays: number
  participants: number
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels'
  progress: number
  description: string
  icon: React.ElementType
  accentColor: string
  accentBorder: string
}

const challenges: Challenge[] = [
  {
    name: '30-Day Push-Up Challenge',
    duration: '30 Days',
    durationDays: 30,
    participants: 847,
    difficulty: 'Beginner',
    progress: 68,
    description: 'Build upper body strength from 10 to 100 push-ups in 30 days.',
    icon: Flame,
    accentColor: 'from-emerald-500/20 to-emerald-500/5',
    accentBorder: 'border-l-emerald-500',
  },
  {
    name: '10K Steps Daily',
    duration: '14 Days',
    durationDays: 14,
    participants: 1234,
    difficulty: 'All Levels',
    progress: 82,
    description: 'Walk your way to better health. Hit 10,000 steps every single day.',
    icon: Users,
    accentColor: 'from-blue-500/20 to-blue-500/5',
    accentBorder: 'border-l-blue-500',
  },
  {
    name: 'Plank Master',
    duration: '21 Days',
    durationDays: 21,
    participants: 563,
    difficulty: 'Intermediate',
    progress: 45,
    description: 'Hold a 5-minute plank by day 21. Core strength like never before.',
    icon: Clock,
    accentColor: 'from-[#d4a017]/20 to-[#d4a017]/5',
    accentBorder: 'border-l-[#d4a017]',
  },
  {
    name: 'Flexibility Journey',
    duration: '28 Days',
    durationDays: 28,
    participants: 391,
    difficulty: 'Advanced',
    progress: 33,
    description: 'Achieve full splits and advanced yoga poses in 28 days of dedicated stretching.',
    icon: Flame,
    accentColor: 'from-purple-500/20 to-purple-500/5',
    accentBorder: 'border-l-purple-500',
  },
]

const difficultyBadge: Record<string, string> = {
  'Beginner': 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
  'Intermediate': 'bg-[#d4a017]/10 border-[#d4a017]/30 text-[#e8b923]',
  'Advanced': 'bg-purple-500/10 border-purple-500/30 text-purple-400',
  'All Levels': 'bg-blue-500/10 border-blue-500/30 text-blue-400',
}

export function FitnessChallenges() {
  const [joinedChallenges, setJoinedChallenges] = useState<Set<string>>(new Set())

  const handleJoin = (name: string) => {
    setJoinedChallenges((prev) => {
      const next = new Set(prev)
      if (next.has(name)) {
        next.delete(name)
      } else {
        next.add(name)
      }
      return next
    })
  }

  return (
    <section
      className="relative py-20 md:py-28 bg-[#111111] overflow-hidden"
      id="challenges"
    >
      {/* Decorative section number */}
      <span className="absolute top-8 right-8 text-[200px] font-black text-white/[0.02] pointer-events-none select-none leading-none">
        19
      </span>

      {/* Subtle diagonal pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 40px,
            rgba(212, 160, 23, 0.5) 40px,
            rgba(212, 160, 23, 0.5) 41px
          )`,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-10 md:mb-14">
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#d4a017]/60">
            19 — Challenges
          </span>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-2"
            style={{ textShadow: '0 0 40px rgba(212, 160, 23, 0.1)' }}
          >
            FITNESS <span className="text-[#e8b923]">CHALLENGES</span>
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
            Push your limits with our community challenges. Compete, grow, and win together.
          </p>
        </ScrollReveal>

        {/* Challenges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {challenges.map((challenge, idx) => {
            const Icon = challenge.icon
            const isJoined = joinedChallenges.has(challenge.name)

            return (
              <ScrollReveal key={challenge.name} delay={idx * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className={cn(
                    'group relative rounded-2xl border bg-white/[0.03] backdrop-blur-xl overflow-hidden transition-all duration-300',
                    'border-white/[0.08] hover:border-[#d4a017]/30 hover:shadow-[0_0_40px_-10px_rgba(212,160,23,0.2)]',
                    `border-l-4 ${challenge.accentBorder}`
                  )}
                >
                  {/* Gradient accent on left border */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${challenge.accentColor}`} />

                  <div className="p-5">
                    {/* Icon + Duration badge */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/[0.05] border border-white/[0.08]">
                        <Icon className="h-5 w-5 text-[#d4a017]" />
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-white/[0.06] border border-white/[0.08] text-xs font-semibold text-gray-300">
                        {challenge.duration}
                      </span>
                    </div>

                    {/* Challenge name */}
                    <h3 className="text-white font-bold text-base mb-1.5 leading-tight">
                      {challenge.name}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-500 text-xs leading-relaxed mb-4">
                      {challenge.description}
                    </p>

                    {/* Progress bar */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs text-gray-500">Community Progress</span>
                        <span className="text-xs font-semibold text-[#e8b923]">{challenge.progress}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${challenge.progress}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
                          className="h-full rounded-full bg-gradient-to-r from-[#d4a017] to-[#e8b923]"
                        />
                      </div>
                    </div>

                    {/* Participants + Difficulty */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5 text-gray-500" />
                        <span className="text-xs text-gray-400">
                          {challenge.participants.toLocaleString()} joined
                        </span>
                      </div>
                      <span
                        className={cn(
                          'px-2 py-0.5 rounded-md border text-[10px] font-bold uppercase tracking-wider',
                          difficultyBadge[challenge.difficulty]
                        )}
                      >
                        {challenge.difficulty}
                      </span>
                    </div>

                    {/* Join button */}
                    <Button
                      onClick={() => handleJoin(challenge.name)}
                      className={cn(
                        'w-full font-semibold text-sm transition-all duration-300',
                        isJoined
                          ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20'
                          : 'bg-gradient-to-r from-[#d4a017] to-[#e8b923] text-black hover:shadow-[0_0_20px_-3px_rgba(212,160,23,0.5)]'
                      )}
                      size="sm"
                    >
                      {isJoined ? 'Joined ✓' : 'Join Challenge'}
                      {!isJoined && <ArrowRight className="ml-1.5 h-3.5 w-3.5" />}
                    </Button>
                  </div>
                </motion.div>
              </ScrollReveal>
            )
          })}
        </div>

        {/* View All CTA */}
        <ScrollReveal delay={0.4}>
          <div className="mt-12 text-center">
            <Button
              variant="outline"
              size="lg"
              className="border-[#d4a017]/40 bg-transparent text-[#e8b923] hover:bg-[#d4a017]/10 hover:border-[#d4a017]/60 font-semibold transition-all duration-300"
            >
              View All Challenges
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
