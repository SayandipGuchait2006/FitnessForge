'use client'

import { ArrowRight, MapPin, Building2, Ruler } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollReveal } from '@/components/gym/scroll-reveal'

export function OurStory() {
  return (
    <section id="about" className="relative py-20 md:py-28 bg-[#0a0a0a] overflow-hidden">
      {/* Decorative section number */}
      <span className="absolute top-8 right-8 text-[200px] font-black text-white/[0.02] pointer-events-none select-none leading-none">
        00
      </span>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Image with decorative frame */}
          <ScrollReveal direction="right">
            <div className="relative">
              {/* Decorative amber border frame offset 8px behind */}
              <div className="absolute top-2 left-2 w-[calc(100%-16px)] h-[calc(100%-16px)] border-2 border-[#d4a017]/30 rounded-xl" />
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src="/images/facility1.png"
                  alt="Avenger The Fitness Temple Facility"
                  className="w-full h-auto object-cover aspect-[4/3] rounded-xl"
                />
                {/* Ambient gradient overlay from transparent to dark */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#0a0a0a]/60 rounded-xl" />
              </div>
              {/* Est. 2009 badge */}
              <div className="absolute bottom-4 right-4 z-10">
                <span className="inline-flex items-center gap-1.5 rounded-md bg-[#d4a017]/20 border border-[#d4a017]/40 px-3 py-1.5 text-xs font-bold text-[#e8b923] tracking-wider uppercase backdrop-blur-sm">
                  Est. 2009
                </span>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column - Text Content */}
          <ScrollReveal direction="left">
            <div>
              {/* Section Number Tag */}
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#d4a017]/60">
                — Our Story
              </span>

              {/* Title */}
              <h2
                className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-white"
                style={{ textShadow: '0 0 40px rgba(212, 160, 23, 0.1)' }}
              >
                BUILT ON GRIT, FUELED BY PASSION
              </h2>

              {/* Decorative Divider */}
              <div className="mt-4 flex items-center gap-2">
                <div className="h-px w-8 bg-[#d4a017]/30" />
                <div className="h-1 w-8 rounded-full bg-gradient-to-r from-[#d4a017] to-[#e8b923]" />
                <div className="h-px w-8 bg-[#d4a017]/30" />
                <div className="size-1.5 rotate-45 bg-[#d4a017]" />
                <div className="h-px w-8 bg-[#d4a017]/30" />
                <div className="h-1 w-8 rounded-full bg-gradient-to-r from-[#e8b923] to-[#d4a017]" />
                <div className="h-px w-8 bg-[#d4a017]/30" />
              </div>

              {/* Paragraphs */}
              <div className="mt-6 space-y-4">
                <p className="text-neutral-400 text-base leading-relaxed">
                  Avenger The Fitness Temple was born in 2009 from a simple belief: that everyone
                  deserves access to world-class fitness facilities and expert coaching.
                  What started as a 2,000 sq.ft studio in Koramangala has grown into
                  Bangalore&apos;s most trusted fitness destination.
                </p>
                <p className="text-neutral-400 text-base leading-relaxed">
                  Our founding team — former athletes and certified coaches — built Avenger
                  on the principle that real transformation happens when premium equipment
                  meets passionate guidance. Today, with 5,000+ members and 30+ expert
                  trainers, we continue to forge stronger versions of everyday people.
                </p>
              </div>

              {/* Stats Row */}
              <div className="mt-8 grid grid-cols-3 gap-4">
                {[
                  { icon: Building2, label: 'Founded', value: '2009' },
                  { icon: MapPin, label: 'Location', value: 'Koramangala' },
                  { icon: Ruler, label: 'Sq.Ft', value: '25,000+' },
                ].map((stat) => {
                  const StatIcon = stat.icon
                  return (
                    <div
                      key={stat.label}
                      className="flex flex-col items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.03] p-4 text-center"
                    >
                      <StatIcon className="h-5 w-5 text-[#d4a017] mb-2" />
                      <span className="text-white font-bold text-lg">{stat.value}</span>
                      <span className="text-neutral-500 text-xs mt-0.5">{stat.label}</span>
                    </div>
                  )
                })}
              </div>

              {/* Learn More Button */}
              <div className="mt-8">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-[#d4a017]/40 bg-transparent text-[#e8b923] hover:bg-[#d4a017]/10 hover:border-[#d4a017]/60 font-semibold transition-all duration-300"
                  onClick={() => {
                   document.getElementById("pricing")?.scrollIntoView({ 
                     behavior: "smooth",
                   });
                 }}
                
                >

            
                  Learn More
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
