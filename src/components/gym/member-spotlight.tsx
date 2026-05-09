'use client'

import { motion } from 'framer-motion'
import { Quote, Award, Calendar } from 'lucide-react'
import { ScrollReveal } from '@/components/gym/scroll-reveal'
import { cn } from '@/lib/utils'

interface Member {
  name: string
  initials: string
  gradient: string
  achievement: string
  quote: string
  duration: string
}

const members: Member[] = [
  {
    name: 'Ananya Sharma',
    initials: 'AS',
    gradient: 'from-[#d4a017] via-[#e8b923] to-[#f0c040]',
    achievement: 'Lost 22kg in 8 months',
    quote: 'Avenger didn\'t just change my body — it changed my entire mindset. The trainers pushed me beyond what I thought was possible, and the community kept me going on the tough days.',
    duration: '2 years at Avenger',
  },
  {
    name: 'Rahul Verma',
    initials: 'RV',
    gradient: 'from-[#e8b923] via-[#d4a017] to-[#b8860b]',
    achievement: 'First marathon at 45',
    quote: 'I walked into Avenger at 42, barely able to run a kilometer. Three years later, I completed my first full marathon. This place builds more than muscle — it builds belief.',
    duration: '3 years at Avenger',
  },
  {
    name: 'Priya Patel',
    initials: 'PP',
    gradient: 'from-[#f0c040] via-[#e8b923] to-[#d4a017]',
    achievement: 'State powerlifting champion',
    quote: 'From a shy beginner to competing on stage — Avenger gave me the coaching, the confidence, and the competitive edge. Every rep here is a step toward greatness.',
    duration: '1.5 years at Avenger',
  },
]

export function MemberSpotlight() {
  return (
    <section className="relative py-20 md:py-28 bg-[#0a0a0a] overflow-hidden" id="spotlight">
      {/* Decorative section number */}
      <span className="absolute top-8 right-8 text-[200px] font-black text-white/[0.02] pointer-events-none select-none leading-none">17</span>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-10 md:mb-14">
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#d4a017]/60">17 — Member Spotlight</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-2" style={{ textShadow: '0 0 40px rgba(212, 160, 23, 0.1)' }}>
            REAL PEOPLE, <span className="text-[#e8b923]">REAL RESULTS</span>
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
            Meet the members who transformed their lives at Avenger. Their stories inspire us every day.
          </p>
        </ScrollReveal>

        {/* Member Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {members.map((member, index) => (
            <ScrollReveal key={member.name} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                className={cn(
                  'group relative rounded-2xl border bg-white/[0.03] backdrop-blur-xl p-6 transition-all duration-300 overflow-hidden',
                  'border-white/[0.08] hover:border-[#d4a017]/40 hover:shadow-[0_0_40px_-10px_rgba(212,160,23,0.2)]'
                )}
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#d4a017]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  {/* Quote icon */}
                  <Quote className="h-8 w-8 text-[#d4a017]/20 mb-4" />

                  {/* Quote text */}
                  <p className="text-gray-300 text-sm leading-relaxed mb-6 group-hover:text-gray-200 transition-colors">
                    &ldquo;{member.quote}&rdquo;
                  </p>

                  {/* Member info */}
                  <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                    {/* Avatar with initials */}
                    <div className={cn(
                      'flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br shadow-lg shrink-0',
                      member.gradient
                    )}>
                      <span className="text-black font-bold text-sm">{member.initials}</span>
                    </div>

                    <div className="min-w-0">
                      <h4 className="text-white font-bold text-sm truncate">{member.name}</h4>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <Award className="h-3 w-3 text-[#d4a017] shrink-0" />
                        <span className="text-xs text-[#e8b923] font-medium truncate">{member.achievement}</span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <Calendar className="h-3 w-3 text-gray-500 shrink-0" />
                        <span className="text-xs text-gray-500 truncate">{member.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom border accent */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] rounded-b-2xl bg-gradient-to-r from-transparent via-[#d4a017]/0 to-transparent group-hover:via-[#d4a017]/40 transition-all duration-500" />
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
