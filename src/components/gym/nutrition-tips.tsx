'use client'

import { motion } from 'framer-motion'
import { Apple, Beef, Droplets, Wheat, Egg, Fish, ChevronRight, Sparkles } from 'lucide-react'
import { ScrollReveal } from '@/components/gym/scroll-reveal'
import { cn } from '@/lib/utils'

interface NutritionCard {
  icon: React.ElementType
  category: string
  color: string
  bgColor: string
  borderColor: string
  tips: string[]
}

const nutritionCards: NutritionCard[] = [
  {
    icon: Beef,
    category: 'Protein',
    color: 'text-red-400',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/20',
    tips: [
      'Aim for 1.6-2.2g protein per kg bodyweight daily',
      'Distribute protein across 4-5 meals for optimal absorption',
      'Combine plant and animal sources for complete amino profiles',
    ],
  },
  {
    icon: Droplets,
    category: 'Hydration',
    color: 'text-sky-400',
    bgColor: 'bg-sky-500/10',
    borderColor: 'border-sky-500/20',
    tips: [
      'Drink 3-4 liters of water daily for active individuals',
      'Add electrolytes during intense sessions over 60 minutes',
      'Monitor urine color — pale yellow indicates good hydration',
    ],
  },
  {
    icon: Wheat,
    category: 'Carbs',
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/20',
    tips: [
      'Time complex carbs around workouts for peak performance',
      'Choose whole grains over refined for sustained energy release',
      'Carb cycle: higher on training days, lower on rest days',
    ],
  },
  {
    icon: Apple,
    category: 'Fats',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/20',
    tips: [
      'Include 0.5-1g healthy fats per kg bodyweight for hormone health',
      'Prioritize omega-3 from fish, walnuts, and flaxseed',
      'Avoid trans fats — stick to avocados, olive oil, and nuts',
    ],
  },
  {
    icon: Egg,
    category: 'Vitamins',
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/20',
    tips: [
      'Vitamin D3: 2000-4000 IU daily, especially in low-sunlight months',
      'Magnesium before bed aids recovery and sleep quality',
      'Eat a rainbow of vegetables for broad micronutrient coverage',
    ],
  },
  {
    icon: Fish,
    category: 'Supplements',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/20',
    tips: [
      'Creatine monohydrate: 5g daily for strength and power gains',
      'Whey protein post-workout for rapid muscle protein synthesis',
      'Caffeine: 3-6mg/kg 30-60 min before training for performance boost',
    ],
  },
]

export function NutritionTips() {
  return (
    <section className="relative py-20 md:py-28 bg-[#0a0a0a] overflow-hidden" id="nutrition">
      {/* Decorative section number */}
      <span className="absolute top-8 right-8 text-[200px] font-black text-white/[0.02] pointer-events-none select-none leading-none">14</span>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-10 md:mb-14">
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#d4a017]/60">14 — Nutrition</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-2" style={{ textShadow: '0 0 40px rgba(212, 160, 23, 0.1)' }}>
            FUEL YOUR <span className="text-[#e8b923]">GAINS</span>
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
            Training hard is only half the battle. Optimize your nutrition for maximum results.
          </p>
        </ScrollReveal>

        {/* Nutrition Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {nutritionCards.map((card, index) => {
            const Icon = card.icon
            return (
              <ScrollReveal key={card.category} delay={index * 0.08}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className={cn(
                    'group relative rounded-2xl border bg-white/[0.03] backdrop-blur-xl p-6 transition-all duration-300',
                    'hover:border-[#d4a017]/40 hover:shadow-[0_0_30px_-5px_rgba(212,160,23,0.12)]',
                    card.borderColor
                  )}
                >
                  {/* Amber glow on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#d4a017]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative z-10">
                    {/* Icon + Category */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className={cn('flex h-10 w-10 items-center justify-center rounded-xl', card.bgColor)}>
                        <Icon className={cn('h-5 w-5', card.color)} />
                      </div>
                      <h3 className="text-lg font-bold text-white group-hover:text-[#e8b923] transition-colors">
                        {card.category}
                      </h3>
                      <Sparkles className="h-3.5 w-3.5 text-[#d4a017]/40 ml-auto" />
                    </div>

                    {/* Tips */}
                    <ul className="space-y-2.5 mb-5">
                      {card.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-start gap-2.5">
                          <div className={cn('mt-1.5 size-1.5 rounded-full flex-shrink-0', card.bgColor, 'ring-1', card.borderColor.replace('border-', 'ring-'))} />
                          <span className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                            {tip}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Learn More */}
                    <div className="flex items-center gap-1.5 text-[#d4a017]/60 group-hover:text-[#e8b923] transition-colors text-xs font-medium">
                      <span>Learn More</span>
                      <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Bottom border accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] rounded-b-2xl bg-gradient-to-r from-transparent via-[#d4a017]/0 to-transparent group-hover:via-[#d4a017]/40 transition-all duration-500" />
                </motion.div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
