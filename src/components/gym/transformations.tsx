'use client'

import { Quote } from 'lucide-react'
import { ScrollReveal } from '@/components/gym/scroll-reveal'

const transformations = [
  {
    name: 'Rahul',
    achievement: 'Lost 25kg in 8 months',
    quote: 'I never thought I could do it. Avenger proved me wrong.',
    gradient: 'from-red-900/40 via-orange-900/30 to-[#1a1a1a]',
  },
  {
    name: 'Priya',
    achievement: 'Gained muscle, lost fat in 6 months',
    quote: 'The personalized training changed everything.',
    gradient: 'from-purple-900/40 via-pink-900/30 to-[#1a1a1a]',
  },
  {
    name: 'Vikram',
    achievement: 'Complete body recomposition in 10 months',
    quote: 'Best investment in my health.',
    gradient: 'from-amber-900/40 via-yellow-900/30 to-[#1a1a1a]',
  },
]

export default function Transformations() {
  return (
    <section id="transformations" className="relative py-20 md:py-28 bg-[#111111] overflow-hidden">
      {/* Subtle diagonal line pattern background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
        backgroundImage: `repeating-linear-gradient(
          45deg,
          transparent,
          transparent 40px,
          rgba(212, 160, 23, 0.5) 40px,
          rgba(212, 160, 23, 0.5) 41px
        )`,
      }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            REAL <span className="text-[#e8b923]">TRANSFORMATIONS</span>
          </h2>
          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-[#d4a017] to-[#e8b923]" />
          <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-neutral-400">
            Proof that commitment + coaching = results.
          </p>
        </ScrollReveal>

        {/* Transformation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {transformations.map((t, idx) => (
            <ScrollReveal key={t.name} delay={idx * 0.15}>
              <div className="group relative rounded-2xl bg-[#1a1a1a] border-l-4 border-[#d4a017] overflow-hidden hover:border-[#e8b923] transition-colors duration-300 hover:shadow-[0_0_30px_-5px_rgba(212,160,23,0.2)]">
                {/* Visual top area with gradient placeholder */}
                <div
                  className={`relative h-48 md:h-56 bg-gradient-to-br ${t.gradient} flex items-center justify-center`}
                >
                  {/* Transformation image overlay */}
                  <img
                    src="/images/transformation1.png"
                    alt={`${t.name}'s transformation`}
                    className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-luminosity"
                  />
                  {/* Name badge */}
                  <div className="relative z-10 text-center">
                    <p className="text-5xl md:text-6xl font-black text-white/10 group-hover:text-white/20 transition-colors duration-500">
                      {t.name}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-white font-bold text-xl mb-1">{t.name}</p>
                  <p className="text-[#e8b923] font-semibold text-sm mb-4">
                    {t.achievement}
                  </p>
                  <div className="flex gap-2 items-start">
                    <Quote className="size-4 text-[#d4a017] shrink-0 mt-1" />
                    <p className="text-gray-400 italic text-sm leading-relaxed">
                      {t.quote}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="mt-10 text-center text-xs text-neutral-600">
          *Results may vary. Individual outcomes depend on commitment, diet, and genetic factors.
        </p>
      </div>
    </section>
  )
}
