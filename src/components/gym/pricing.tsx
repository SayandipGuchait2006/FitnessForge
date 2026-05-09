'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Check, Zap, ArrowRight, Dumbbell, Users, User, Lock, Utensils, Bath, Star, Crown, Calendar, Trophy, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollReveal } from '@/components/gym/scroll-reveal'
import { ComparisonTable } from '@/components/gym/comparison-table'
import { cn } from '@/lib/utils'

interface PricingPlan {
  name: string
  price: number
  priceDisplay: string
  period: string
  features: string[]
  featureIcons: React.ElementType[]
  popular?: boolean
  badge?: string
}

const plans: PricingPlan[] = [
  {
    name: 'STARTER',
    price: 1499,
    priceDisplay: '₹1,499',
    period: '/month',
    features: [
      'Gym Access',
      'Locker Room',
      'Basic Equipment',
      '2 Group Classes/week',
    ],
    featureIcons: [Dumbbell, Lock, Star, Users],
  },
  {
    name: 'PRO',
    price: 2999,
    priceDisplay: '₹2,999',
    period: '/month',
    popular: true,
    badge: 'Best Value',
    features: [
      'Full Gym Access',
      'All Group Classes',
      'Personal Locker',
      'Nutrition Consultation',
      'Steam & Sauna',
      '1 PT Session/month',
    ],
    featureIcons: [Dumbbell, Users, Lock, Utensils, Bath, User],
  },
  {
    name: 'ELITE',
    price: 4999,
    priceDisplay: '₹4,999',
    period: '/month',
    features: [
      'Everything in Pro',
      'Unlimited PT Sessions',
      'Priority Booking',
      'VIP Lounge Access',
      'Monthly Body Assessment',
      'Guest Passes (2/month)',
    ],
    featureIcons: [Crown, User, Clock, Trophy, Star, Users],
  },
]

function AnimatedPrice({ value, prefix = '₹', isInView, isPopular }: { value: number; prefix?: string; isInView: boolean; isPopular: boolean }) {
  const [count, setCount] = useState(value)

  useEffect(() => {
    if (!isInView) return

    const duration = 1500
    const increment = value / (duration / 16)
    let start = 0
    let intervalId: ReturnType<typeof setInterval>

    const rafId = requestAnimationFrame(() => {
      setCount(0)
      intervalId = setInterval(() => {
        start += increment
        if (start >= value) {
          setCount(value)
          clearInterval(intervalId)
        } else {
          setCount(Math.floor(start))
        }
      }, 16)
    })

    return () => {
      cancelAnimationFrame(rafId)
      clearInterval(intervalId)
    }
  }, [isInView, value])

  const formattedCount = count.toLocaleString('en-IN')

  return (
    <span
      className={cn(
        'font-extrabold tabular-nums',
        isPopular ? 'text-5xl md:text-6xl gradient-text' : 'text-4xl md:text-5xl text-white'
      )}
    >
      {prefix}{formattedCount}
    </span>
  )
}

export function Pricing() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [comparisonOpen, setComparisonOpen] = useState(false)

  return (
    <section id="pricing" ref={ref} className="relative py-20 md:py-28 bg-[#111111] overflow-hidden dot-grid section-progress corner-accent-both">
      {/* Decorative section number */}
      <span className="absolute top-8 left-8 text-[200px] font-black text-white/[0.02] pointer-events-none select-none leading-none parallax-section-number">02</span>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-14 md:mb-20">
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#d4a017]/60">02 — Membership</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mt-2" style={{ textShadow: '0 0 40px rgba(212, 160, 23, 0.1)' }}>
            MEMBERSHIP PLANS
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
          <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-neutral-400">
            Invest in yourself. Choose the plan that matches your ambition.
          </p>
        </ScrollReveal>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-5 lg:gap-8 items-stretch">
          {plans.map((plan, index) => (
            <ScrollReveal key={plan.name} delay={index * 0.15}>
              <div
                className={cn(
                  'relative flex h-full flex-col rounded-2xl border p-7 md:p-8 backdrop-blur-sm transition-all duration-300',
                  plan.popular
                    ? 'border-[#d4a017]/60 bg-[#d4a017]/[0.06] md:scale-105 md:-my-2 shadow-[0_0_60px_-10px_rgba(212,160,23,0.15)] breathing-border animated-border-card premium-stripe-bg'
                    : 'border-white/[0.06] bg-white/[0.03] hover:border-white/[0.12] hover:-translate-y-1 card-glow amber-glow-hover card-border-hover'
                )}
              >
                {/* PRO card glow behind */}
                {plan.popular && (
                  <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-[#d4a017]/20 via-[#e8b923]/10 to-transparent blur-2xl pro-card-glow -z-10" />
                )}

                {/* Popular Badge - top center */}
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#d4a017] to-[#e8b923] px-5 py-1.5 text-sm font-bold uppercase tracking-wider text-black shadow-lg popular-badge-glow">
                      <Zap className="h-4 w-4" />
                      Most Popular
                    </span>
                  </div>
                )}

                {/* "Most Popular" Ribbon from right side */}
                {plan.popular && (
                  <div className="absolute -right-1 top-8 md:top-10 z-20">
                    <div className="relative">
                      <div className="bg-gradient-to-r from-[#d4a017] to-[#e8b923] text-black text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-l-md shadow-md">
                        ★ PRO
                      </div>
                      <div className="absolute right-0 top-full w-0 h-0 border-l-[6px] border-l-[#b8860b] border-b-[6px] border-b-transparent" />
                    </div>
                  </div>
                )}

                {/* Plan Name */}
                <h3
                  className={cn(
                    'text-sm font-bold uppercase tracking-[0.2em]',
                    plan.popular ? 'text-[#e8b923]' : 'text-neutral-400'
                  )}
                >
                  {plan.name}
                </h3>

                {/* Price with count-up */}
                <div className="mt-4 flex items-baseline gap-1">
                  <AnimatedPrice value={plan.price} isInView={isInView} isPopular={!!plan.popular} />
                </div>

                {/* Per month text below price */}
                <p className={cn(
                  'mt-1 text-xs font-normal italic',
                  plan.popular ? 'text-[#d4a017]/50' : 'text-neutral-600'
                )}>
                  per month
                </p>

                {/* Badge below price */}
                {plan.badge && (
                  <div className="mt-2">
                    <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 text-xs font-semibold text-emerald-400">
                      Save 20%
                    </span>
                  </div>
                )}

                {/* Divider */}
                <div
                  className={cn(
                    'my-6 h-px w-full',
                    plan.popular
                      ? 'bg-gradient-to-r from-transparent via-[#d4a017]/40 to-transparent'
                      : 'bg-white/[0.06]'
                  )}
                />

                {/* Features with icons */}
                <ul className="flex flex-1 flex-col gap-3.5">
                  {plan.features.map((feature, i) => {
                    const FeatureIcon = plan.featureIcons[i] || Check
                    return (
                      <li key={feature} className="flex items-start gap-3">
                        <div className={cn(
                          'mt-0.5 flex items-center justify-center h-4 w-4 shrink-0 rounded-sm',
                          plan.popular ? 'text-[#e8b923]' : 'text-neutral-500'
                        )}>
                          <FeatureIcon className="h-3.5 w-3.5" />
                        </div>
                        <span className="text-sm text-neutral-300">{feature}</span>
                      </li>
                    )
                  })}
                </ul>

                {/* CTA */}
                <Button
                  className={cn(
                    'mt-8 w-full font-semibold transition-all duration-300',
                    plan.popular
                      ? 'bg-gradient-to-r from-[#d4a017] to-[#e8b923] text-black hover:shadow-[0_0_20px_-3px_rgba(212,160,23,0.5)] shimmer btn-ripple'
                      : 'border border-white/10 bg-white/[0.04] text-white hover:border-[#d4a017]/40 hover:bg-[#d4a017]/10'
                  )}
                  variant={plan.popular ? 'default' : 'outline'}
                  size="lg"
                >
                  Get Started
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Button>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Compare Plans & Free Trial CTA */}
        <ScrollReveal delay={0.5}>
          <div className="mt-14 text-center space-y-4">
            <Button
              variant="outline"
              size="lg"
              className="border-[#d4a017]/40 bg-transparent text-[#e8b923] hover:bg-[#d4a017]/10 hover:border-[#d4a017]/60 font-semibold transition-all duration-300"
              onClick={() => {
                const el = document.getElementById('free-trial')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Book Free Trial
            </Button>
            <div>
              <button
                onClick={() => setComparisonOpen(true)}
                className="text-sm text-neutral-500 hover:text-[#d4a017] transition-colors duration-300 underline underline-offset-4 decoration-neutral-700 hover:decoration-[#d4a017]/50"
              >
                Compare Plans →
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
      <ComparisonTable open={comparisonOpen} onOpenChange={setComparisonOpen} />
    </section>
  )
}
