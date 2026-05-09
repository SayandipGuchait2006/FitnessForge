'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Lock, Users, Flame, Zap, Trophy, Crown, Target } from 'lucide-react'
import { ScrollReveal } from '@/components/gym/scroll-reveal'

type BadgeTier = 'bronze' | 'silver' | 'gold'

interface BadgeData {
  emoji: string
  name: string
  description: string
  tier: BadgeTier
  unlocked: boolean
  earnedBy: number
  icon: typeof Flame
}

const tierGradients: Record<BadgeTier, string> = {
  bronze: 'from-amber-700/80 to-amber-900/80',
  silver: 'from-gray-300/80 to-gray-500/80',
  gold: 'from-yellow-400/80 to-amber-500/80',
}

const tierGlows: Record<BadgeTier, string> = {
  bronze: 'shadow-[0_0_30px_-5px_rgba(180,120,40,0.3)]',
  silver: 'shadow-[0_0_30px_-5px_rgba(180,180,200,0.3)]',
  gold: 'shadow-[0_0_40px_-5px_rgba(255,200,50,0.4)]',
}

const tierBorders: Record<BadgeTier, string> = {
  bronze: 'border-amber-700/40',
  silver: 'border-gray-400/40',
  gold: 'border-yellow-400/50',
}

const badges: BadgeData[] = [
  {
    emoji: '🔥',
    name: 'First Week Warrior',
    description: 'Complete your first week of training',
    tier: 'bronze',
    unlocked: true,
    earnedBy: 4230,
    icon: Flame,
  },
  {
    emoji: '💪',
    name: 'Iron Will',
    description: '100 workouts completed',
    tier: 'silver',
    unlocked: true,
    earnedBy: 1850,
    icon: Zap,
  },
  {
    emoji: '🏆',
    name: 'Centurion',
    description: '1000 workouts completed',
    tier: 'gold',
    unlocked: true,
    earnedBy: 312,
    icon: Trophy,
  },
  {
    emoji: '⚡',
    name: 'Speed Demon',
    description: 'Complete a HIIT class under 30 min',
    tier: 'bronze',
    unlocked: false,
    earnedBy: 2670,
    icon: Zap,
  },
  {
    emoji: '🎯',
    name: 'Consistency King',
    description: '30-day workout streak',
    tier: 'silver',
    unlocked: false,
    earnedBy: 890,
    icon: Target,
  },
  {
    emoji: '👑',
    name: 'AVENGER Legend',
    description: '5-year member',
    tier: 'gold',
    unlocked: false,
    earnedBy: 156,
    icon: Crown,
  },
]

function BadgeCard({ badge, index, isInView }: { badge: BadgeData; index: number; isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.9 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="relative"
    >
      <motion.div
        whileHover={
          badge.unlocked
            ? { y: -6, boxShadow: '0 0 40px -5px rgba(212, 160, 23, 0.25)' }
            : { x: [0, -2, 2, -2, 2, 0], transition: { duration: 0.4 } }
        }
        transition={{ duration: 0.3 }}
        className={`relative rounded-2xl border bg-[#1a1a1a]/60 backdrop-blur-md p-6 text-center transition-all duration-300 overflow-hidden
          ${badge.unlocked
            ? `border-white/[0.08] hover:border-[#d4a017]/40 ${tierGlows[badge.tier]}`
            : 'border-white/[0.04] opacity-50'
          }`}
      >
        {/* Amber glow overlay for unlocked */}
        {badge.unlocked && (
          <div className="absolute inset-0 bg-gradient-to-b from-[#d4a017]/5 to-transparent opacity-60 pointer-events-none" />
        )}

        {/* Lock overlay for locked badges */}
        {!badge.unlocked && (
          <div className="absolute inset-0 bg-black/20 pointer-events-none" />
        )}

        {/* Circular icon area */}
        <div className="relative z-10 mb-4">
          <div
            className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center text-3xl relative
              ${badge.unlocked
                ? `bg-gradient-to-br ${tierGradients[badge.tier]} shadow-lg`
                : 'bg-gray-800/60 grayscale'
              }`}
          >
            <span className={badge.unlocked ? '' : 'grayscale opacity-50'}>
              {badge.emoji}
            </span>

            {/* Gold glow ring for unlocked gold tier */}
            {badge.unlocked && badge.tier === 'gold' && (
              <motion.div
                animate={{
                  boxShadow: [
                    '0 0 15px rgba(255, 200, 50, 0.2)',
                    '0 0 25px rgba(255, 200, 50, 0.4)',
                    '0 0 15px rgba(255, 200, 50, 0.2)',
                  ],
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 rounded-full"
              />
            )}

            {/* Lock icon for locked badges */}
            {!badge.unlocked && (
              <motion.div
                animate={{ opacity: [0.5, 0.9, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full"
              >
                <Lock className="w-6 h-6 text-gray-400" />
              </motion.div>
            )}
          </div>
        </div>

        {/* Badge info */}
        <div className="relative z-10">
          <h3 className={`text-base font-bold mb-1 ${badge.unlocked ? 'text-white' : 'text-gray-500'}`}>
            {badge.name}
          </h3>
          <p className={`text-xs leading-relaxed mb-3 ${badge.unlocked ? 'text-gray-400' : 'text-gray-600'}`}>
            {badge.description}
          </p>

          {/* Tier badge */}
          <span
            className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider
              ${badge.unlocked
                ? `tierBorders[badge.tier] ${badge.tier === 'gold' ? 'border-yellow-400/40 bg-yellow-400/10 text-yellow-300' : badge.tier === 'silver' ? 'border-gray-400/30 bg-gray-400/10 text-gray-300' : 'border-amber-700/30 bg-amber-700/10 text-amber-400'}`
                : 'border-white/10 bg-white/5 text-gray-600'
              }`}
          >
            {badge.tier === 'gold' ? '★ Gold' : badge.tier === 'silver' ? '◆ Silver' : '● Bronze'}
          </span>

          {/* Earned by counter */}
          <div className={`flex items-center justify-center gap-1 mt-3 ${badge.unlocked ? 'text-gray-500' : 'text-gray-700'}`}>
            <Users className="w-3 h-3" />
            <span className="text-[11px] font-medium">
              Earned by {badge.earnedBy.toLocaleString()} members
            </span>
          </div>
        </div>

        {/* Bottom border accent */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-[2px] rounded-b-2xl transition-all duration-500
            ${badge.unlocked
              ? `bg-gradient-to-r from-transparent ${
                  badge.tier === 'gold' ? 'via-yellow-400/50' : badge.tier === 'silver' ? 'via-gray-400/40' : 'via-amber-700/40'
                } to-transparent`
              : 'bg-gradient-to-r from-transparent via-white/5 to-transparent'
            }`}
        />
      </motion.div>
    </motion.div>
  )
}

export function AchievementBadges() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  return (
    <section
      id="achievements-badges"
      ref={sectionRef}
      className="relative py-16 sm:py-20 bg-[#0a0a0a] noise-overlay"
    >
      {/* Decorative section number */}
      <div className="absolute top-4 right-8 text-[200px] font-black text-white/[0.02] leading-none pointer-events-none select-none">
        06
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-10 sm:mb-14">
            <span className="text-xs tracking-[0.3em] text-[#d4a017]/60 font-medium uppercase">
              06 — Badges
            </span>
            <h2
              className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight"
              style={{ textShadow: '0 0 40px rgba(212, 160, 23, 0.1)' }}
            >
              EARN YOUR <span className="text-[#d4a017]">STRIPES</span>
            </h2>
            {/* Decorative divider */}
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#d4a017]/50" />
              <div className="h-px w-12 bg-[#d4a017]/60" />
              <div className="w-1.5 h-1.5 rotate-45 bg-[#d4a017]" />
              <div className="h-px w-12 bg-[#d4a017]/60" />
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#d4a017]/50" />
            </div>
            <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-neutral-400">
              Unlock achievements, track milestones, and show off your dedication. Every workout counts toward your next badge.
            </p>
          </div>
        </ScrollReveal>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {badges.map((badge, index) => (
            <BadgeCard key={badge.name} badge={badge} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  )
}
