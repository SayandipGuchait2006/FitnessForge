'use client'

import { ArrowRight, Play } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ScrollReveal } from '@/components/gym/scroll-reveal'

export function CtaBanner() {
  const handleScrollTo = (href: string) => {
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="cta" className="relative py-20 md:py-28 overflow-hidden corner-accent dot-grid">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1005] via-[#1a0f00] to-[#0a0a0a]" />

      {/* Decorative section number */}
      <span className="absolute top-8 right-8 text-[200px] font-black text-white/[0.02] pointer-events-none select-none leading-none z-[1]">07</span>

      {/* Decorative diagonal lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] border border-[#d4a017]/5 rotate-45" />
        <div className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] border border-[#d4a017]/5 rotate-12" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-[#d4a017]/5 blur-3xl" />

        {/* Floating amber particles */}
        <motion.div
          animate={{ y: [-20, -600], opacity: [0, 0.8, 0.8, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear', delay: 0 }}
          className="absolute bottom-0 left-[20%] h-1.5 w-1.5 rounded-full bg-[#d4a017]/50"
        />
        <motion.div
          animate={{ y: [-20, -500], opacity: [0, 0.6, 0.6, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear', delay: 2 }}
          className="absolute bottom-0 left-[45%] h-1 w-1 rounded-full bg-[#e8b923]/40"
        />
        <motion.div
          animate={{ y: [-20, -700], opacity: [0, 0.7, 0.7, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear', delay: 4 }}
          className="absolute bottom-0 right-[30%] h-1 w-1 rounded-full bg-[#d4a017]/60"
        />
        <motion.div
          animate={{ y: [-20, -550], opacity: [0, 0.5, 0.5, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'linear', delay: 1 }}
          className="absolute bottom-0 left-[65%] h-0.5 w-0.5 rounded-full bg-[#f0c040]/50"
        />
        <motion.div
          animate={{ y: [-20, -650], opacity: [0, 0.6, 0.6, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'linear', delay: 3 }}
          className="absolute bottom-0 right-[15%] h-1.5 w-1.5 rounded-full bg-[#d4a017]/35"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal>
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#d4a017]/60">07 — Get Started</span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mt-2" style={{ textShadow: '0 0 60px rgba(212, 160, 23, 0.15)' }}>
            READY TO{'\u00A0'}
            <span className="gradient-text text-shimmer">TRANSFORM?</span>
          </h2>
          <p className="mt-6 text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
            Join Avenger The Fitness Temple today and get your first month at 20% off. No commitment, no risk — just results.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={() => handleScrollTo('#pricing')}
              size="lg"
              className="bg-[#d4a017] hover:bg-[#e8b923] text-black font-bold px-10 py-7 text-lg rounded-md transition-all duration-300 hover:shadow-lg hover:shadow-[#d4a017]/25 group btn-ripple magnetic-btn"
            >
              Join Now
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              onClick={() => handleScrollTo('#contact')}
              variant="outline"
              size="lg"
              className="border-white/20 text-white hover:bg-white/10 hover:text-[#e8b923] hover:border-[#d4a017]/50 px-10 py-7 text-lg rounded-md transition-all duration-300"
            >
              <Play className="mr-2 h-5 w-5" />
              Book Free Trial
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
