'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { ChevronDown, ArrowRight, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const heroStats = [
  { target: 5000, suffix: '+', label: 'Members' },
  { target: 50, suffix: '+', label: 'Classes' },
  { target: 30, suffix: '+', label: 'Trainers' },
  { target: 15, suffix: '+', label: 'Years' },
]

/** Animated counter that counts up from 0 with easeOutCubic easing */
function HeroStatCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(target) // Start at final value for SSR
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el || hasAnimated.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          observer.disconnect()

          // Reset to 0 and animate up
          const duration = 2000
          const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)
          const startTime = performance.now()

          setCount(0)
          const intervalId = setInterval(() => {
            const elapsed = performance.now() - startTime
            const progress = Math.min(elapsed / duration, 1)
            const easedProgress = easeOutCubic(progress)
            const currentValue = Math.floor(easedProgress * target)

            if (progress >= 1) {
              setCount(target)
              clearInterval(intervalId)
            } else {
              setCount(currentValue)
            }
          }, 16)
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [target])

  return (
    <span ref={ref} className="text-2xl sm:text-3xl font-black text-forge-amber tabular-nums">
      {count}{suffix}
    </span>
  )
}

/** Typing effect: animates each letter of the eyebrow text */
function TypingText({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span className="inline-flex overflow-hidden">
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.03,
            delay: delay + i * 0.04,
            ease: 'easeOut',
          }}
          className="inline-block"
          style={{ whiteSpace: char === ' ' ? 'pre' : undefined }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  )
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const [glitchActive, setGlitchActive] = useState(false)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  const handleGlitchHover = useCallback(() => {
    setGlitchActive(false)
    // Force reflow to restart animation
    requestAnimationFrame(() => {
      setGlitchActive(true)
      setTimeout(() => setGlitchActive(false), 500)
    })
  }, [])

  const handleScrollTo = (href: string) => {
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Background image with dark overlay + parallax */}
      <motion.div
        className="absolute inset-0 z-0 gradient-mesh-bg"
        style={{ y: backgroundY }}
      >
        <img
          src="/images/hero-bg.png"
          alt="Avenger The Fitness Temple"
          className="w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-forge-dark" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/30" />
        {/* Vignette effect for cinematic feel */}
        <div className="absolute inset-0 vignette" />
      </motion.div>

      {/* Noise overlay */}
      <div className="absolute inset-0 z-[1] noise-overlay" />

      {/* Diagonal scan line overlay */}
      <div className="scan-line-overlay" />

      {/* Decorative geometric line pattern behind headline */}
      <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none">
        <svg
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] opacity-[0.015]"
          viewBox="0 0 800 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Horizontal lines */}
          <line x1="0" y1="100" x2="800" y2="100" stroke="#d4a017" strokeWidth="0.5" />
          <line x1="0" y1="200" x2="800" y2="200" stroke="#d4a017" strokeWidth="0.5" />
          <line x1="0" y1="300" x2="800" y2="300" stroke="#d4a017" strokeWidth="0.5" />
          <line x1="0" y1="400" x2="800" y2="400" stroke="#d4a017" strokeWidth="0.5" />
          <line x1="0" y1="500" x2="800" y2="500" stroke="#d4a017" strokeWidth="0.5" />
          {/* Vertical lines */}
          <line x1="100" y1="0" x2="100" y2="600" stroke="#d4a017" strokeWidth="0.5" />
          <line x1="200" y1="0" x2="200" y2="600" stroke="#d4a017" strokeWidth="0.5" />
          <line x1="300" y1="0" x2="300" y2="600" stroke="#d4a017" strokeWidth="0.5" />
          <line x1="400" y1="0" x2="400" y2="600" stroke="#d4a017" strokeWidth="0.5" />
          <line x1="500" y1="0" x2="500" y2="600" stroke="#d4a017" strokeWidth="0.5" />
          <line x1="600" y1="0" x2="600" y2="600" stroke="#d4a017" strokeWidth="0.5" />
          <line x1="700" y1="0" x2="700" y2="600" stroke="#d4a017" strokeWidth="0.5" />
          {/* Diagonal accents */}
          <line x1="0" y1="600" x2="400" y2="200" stroke="#e8b923" strokeWidth="0.3" />
          <line x1="800" y1="0" x2="400" y2="400" stroke="#e8b923" strokeWidth="0.3" />
          {/* Diamond shape */}
          <polygon points="400,150 550,300 400,450 250,300" stroke="#d4a017" strokeWidth="0.5" fill="none" />
        </svg>
      </div>

      {/* Floating gradient orbs with breathing animation */}
      <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-[10%] w-72 h-72 rounded-full bg-forge-amber/5 blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            x: [0, -20, 0],
            opacity: [0.05, 0.12, 0.05],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-1/3 right-[15%] w-96 h-96 rounded-full bg-forge-gold/5 blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, -15, 0],
            opacity: [0.03, 0.08, 0.03],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
          className="absolute top-1/2 right-[40%] w-64 h-64 rounded-full bg-forge-amber/3 blur-3xl"
        />

        {/* Floating particle dots */}
        <motion.div
          animate={{ y: [-20, -800], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear', delay: 0 }}
          className="absolute bottom-0 left-[15%] h-1 w-1 rounded-full bg-[#d4a017]/60"
        />
        <motion.div
          animate={{ y: [-20, -800], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear', delay: 2 }}
          className="absolute bottom-0 left-[35%] h-1.5 w-1.5 rounded-full bg-[#e8b923]/40"
        />
        <motion.div
          animate={{ y: [-20, -800], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear', delay: 4 }}
          className="absolute bottom-0 right-[25%] h-1 w-1 rounded-full bg-[#d4a017]/50"
        />
        <motion.div
          animate={{ y: [-20, -800], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: 'linear', delay: 1 }}
          className="absolute bottom-0 left-[55%] h-0.5 w-0.5 rounded-full bg-[#f0c040]/60"
        />
        <motion.div
          animate={{ y: [-20, -800], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'linear', delay: 3 }}
          className="absolute bottom-0 right-[40%] h-1.5 w-1.5 rounded-full bg-[#d4a017]/30"
        />
        <motion.div
          animate={{ y: [-20, -800], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'linear', delay: 5 }}
          className="absolute bottom-0 left-[75%] h-1 w-1 rounded-full bg-[#e8b923]/50"
        />
      </div>

      {/* Radial spotlight behind headline */}
      <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[900px] md:h-[900px] rounded-full bg-[#d4a017]"
          style={{
            opacity: 0,
            animation: 'spotlight-pulse 6s ease-in-out infinite',
            filter: 'blur(120px)',
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-12 flex-1 flex flex-col justify-center">
        <div className="max-w-3xl">
          {/* Eyebrow text with typing effect */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center gap-2 mb-6"
          >
            <div className="h-px w-8 bg-forge-amber" />
            <span className="text-forge-amber text-sm font-semibold tracking-[0.2em] uppercase">
              <TypingText text="PREMIUM FITNESS EXPERIENCE" delay={0.6} />
            </span>
          </motion.div>

          {/* Headline line 1 — hover triggers glitch on line 2 */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[0.95] cursor-default"
            style={{ textShadow: '0 0 30px rgba(255,255,255,0.08), 0 0 60px rgba(255,255,255,0.04)' }}
            onMouseEnter={handleGlitchHover}
          >
            UNLEASH YOUR
          </motion.h1>

          {/* Headline line 2 with gradient */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] mt-1"
          >
            <span className={cn("gradient-text glow-text glitch-text", glitchActive ? "glitch-text-active" : "glitch-text-replay")} data-text="STRONGEST" aria-hidden="true">STRONGEST</span>
            <span className="sr-only" style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', borderWidth: 0 }}>STRONGEST</span>{' '}
            <span className="text-white">SELF</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="mt-6 text-lg sm:text-xl text-gray-400 max-w-xl leading-relaxed"
          >
            Where determination meets transformation. Premium fitness, elite coaching,
            extraordinary results.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.95 }}
            className="mt-8 flex flex-col sm:flex-row gap-4 items-start"
          >
            <div className="flex flex-col gap-2">
              <Button
                onClick={() => handleScrollTo('#pricing')}
                size="lg"
                className="bg-forge-amber hover:bg-forge-gold text-forge-dark font-bold px-8 py-6 text-base rounded-md transition-all duration-300 hover:shadow-lg hover:shadow-forge-amber/25 group btn-ripple magnetic-btn"
              >
                Start Your Journey
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              {/* Counter badge */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5, duration: 0.5 }}
                className="flex items-center gap-1.5 pl-1"
              >
                <span className="text-sm">🔥</span>
                <span className="text-xs text-gray-400">
                  <span className="text-forge-amber font-semibold">234</span> people joined this month
                </span>
              </motion.div>
            </div>
            {/* Book Free Trial with rotating dashed border */}
            <div className="relative group">
              {/* Rotating dashed border */}
              <div className="absolute inset-0 rounded-md overflow-hidden">
                <div className="absolute inset-0 animate-spin-slow rounded-md border-2 border-dashed border-forge-amber/40 group-hover:border-forge-amber/70 transition-colors duration-300" />
              </div>
              <Button
                onClick={() => handleScrollTo('#contact')}
                variant="outline"
                size="lg"
                className="relative border-0 bg-transparent text-white hover:bg-white/10 hover:text-forge-amber px-8 py-6 text-base rounded-md transition-all duration-300 magnetic-btn"
              >
                <Play className="mr-2 h-4 w-4" />
                Book Free Trial
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats bar at bottom of hero */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.2 }}
        className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pb-24"
      >
        <div className="glass rounded-xl p-6 relative stats-bar-shimmer stats-bar-pulse border border-[#d4a017]/20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-forge-border">
            {heroStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 0 30px rgba(212, 160, 23, 0.15)',
                }}
                transition={{ duration: 0.2 }}
                className={cn(
                  'flex flex-col items-center justify-center text-center cursor-default rounded-lg py-2 transition-colors duration-300',
                  index > 0 && 'md:pl-6'
                )}
              >
                <HeroStatCounter target={stat.target} suffix={stat.suffix} />
                <span className="text-sm text-gray-400 mt-1 font-medium tracking-wide uppercase">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
          {/* Animated gradient border at the bottom of stats bar */}
          <div className="section-divider absolute bottom-0 left-4 right-4 rounded-full" />
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-gray-500 tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="h-5 w-5 text-forge-amber/60" />
        </motion.div>
      </motion.div>
    </section>
  )
}
