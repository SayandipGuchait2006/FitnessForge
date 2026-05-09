'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calculator, ChevronDown, ArrowRight, X, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type Goal = 'weight-loss' | 'muscle-gain' | 'general-fitness' | ''
type Frequency = '3' | '4' | '5' | '6' | ''
type BudgetRange = 'under-1500' | '1500-3000' | '3000+' | ''

interface Recommendation {
  plan: string
  price: string
  priceNum: number
  tagline: string
}

function getRecommendation(goal: Goal, frequency: Frequency, budget: BudgetRange): Recommendation | null {
  if (!goal || !frequency || !budget) return null

  // Logic: frequency+goal+budget → recommend a plan tier
  // Starter: ₹1,499/mo | PRO: ₹2,999/mo | Elite: ₹4,999/mo
  const freq = parseInt(frequency)

  // Score-based recommendation
  let score = 0
  if (goal === 'muscle-gain') score += 3
  else if (goal === 'weight-loss') score += 1
  else score += 2

  score += freq - 3 // 0-3 for frequency 3-6

  if (budget === 'under-1500') score -= 2
  else if (budget === '1500-3000') score += 0
  else score += 2

  if (score <= 1) {
    return {
      plan: 'STARTER',
      price: '₹1,499',
      priceNum: 1499,
      tagline: 'Perfect to start your fitness journey',
    }
  } else if (score <= 4) {
    return {
      plan: 'PRO',
      price: '₹2,999',
      priceNum: 2999,
      tagline: 'Best value for serious results',
    }
  } else {
    return {
      plan: 'ELITE',
      price: '₹4,999',
      priceNum: 4999,
      tagline: 'Ultimate fitness experience',
    }
  }
}

const goalOptions: { value: Goal; label: string }[] = [
  { value: 'weight-loss', label: 'Weight Loss' },
  { value: 'muscle-gain', label: 'Muscle Gain' },
  { value: 'general-fitness', label: 'General Fitness' },
]

const frequencyOptions: { value: Frequency; label: string }[] = [
  { value: '3', label: '3 days/week' },
  { value: '4', label: '4 days/week' },
  { value: '5', label: '5 days/week' },
  { value: '6', label: '6 days/week' },
]

const budgetOptions: { value: BudgetRange; label: string }[] = [
  { value: 'under-1500', label: 'Under ₹1,500' },
  { value: '1500-3000', label: '₹1,500 - ₹3,000' },
  { value: '3000+', label: '₹3,000+' },
]

export function QuoteCalculator() {
  const [expanded, setExpanded] = useState(false)
  const [visible, setVisible] = useState(false)
  const [goal, setGoal] = useState<Goal>('')
  const [frequency, setFrequency] = useState<Frequency>('')
  const [budget, setBudget] = useState<BudgetRange>('')
  const [result, setResult] = useState<Recommendation | null>(null)
  const [showResult, setShowResult] = useState(false)
  const autoCollapseRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  // Only visible after scrolling past pricing section
  useEffect(() => {
    const pricingSection = document.getElementById('pricing')
    if (!pricingSection) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0)
      },
      { threshold: 0 }
    )

    observer.observe(pricingSection)
    return () => observer.disconnect()
  }, [])

  // Auto-collapse after 8 seconds of no interaction
  const resetAutoCollapse = useCallback(() => {
    if (autoCollapseRef.current) {
      clearTimeout(autoCollapseRef.current)
    }
    if (expanded) {
      autoCollapseRef.current = setTimeout(() => {
        setExpanded(false)
      }, 8000)
    }
  }, [expanded])

  useEffect(() => {
    if (expanded) {
      resetAutoCollapse()
    }
    return () => {
      if (autoCollapseRef.current) {
        clearTimeout(autoCollapseRef.current)
      }
    }
  }, [expanded, resetAutoCollapse])

  const handleInteraction = useCallback(() => {
    resetAutoCollapse()
  }, [resetAutoCollapse])

  const handleToggle = useCallback(() => {
    setExpanded((prev) => !prev)
    if (!expanded) {
      // Reset state when opening
      setShowResult(false)
      setResult(null)
    }
  }, [expanded])

  const handleGetRecommendation = useCallback(() => {
    const rec = getRecommendation(goal, frequency, budget)
    if (rec) {
      setResult(rec)
      setShowResult(true)
    }
  }, [goal, frequency, budget])

  const handleReset = useCallback(() => {
    setGoal('')
    setFrequency('')
    setBudget('')
    setResult(null)
    setShowResult(false)
  }, [])

  if (!visible) return null

  return (
    <div
      className="fixed bottom-48 left-4 z-[25]"
      onMouseMove={handleInteraction}
      onMouseDown={handleInteraction}
      onTouchStart={handleInteraction}
    >
      <AnimatePresence>
        {expanded && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, scale: 0.9, y: 10, x: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10, x: -10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="absolute bottom-14 left-0 w-72 rounded-2xl border border-white/[0.08] bg-[#111111]/95 backdrop-blur-xl shadow-2xl shadow-black/50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <Calculator className="h-4 w-4 text-[#d4a017]" />
                <span className="text-sm font-bold text-white">Quick Quote</span>
              </div>
              <button
                onClick={handleToggle}
                className="flex items-center justify-center w-6 h-6 rounded-md text-gray-500 hover:text-white hover:bg-white/[0.06] transition-colors"
                aria-label="Close calculator"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="p-4">
              <AnimatePresence mode="wait">
                {showResult && result ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Result display */}
                    <div className="text-center mb-4">
                      <div className="flex items-center justify-center gap-1.5 mb-2">
                        <Sparkles className="h-4 w-4 text-[#d4a017]" />
                        <span className="text-xs font-bold tracking-wider uppercase text-[#d4a017]/60">
                          Recommended Plan
                        </span>
                      </div>
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#d4a017]/10 to-[#e8b923]/10 border border-[#d4a017]/20">
                        <span className="text-2xl font-black gradient-text">{result.plan}</span>
                      </div>
                    </div>

                    <div className="text-center mb-3">
                      <span className="text-3xl font-extrabold text-white">{result.price}</span>
                      <span className="text-sm text-gray-500 ml-1">/month</span>
                    </div>

                    <p className="text-center text-xs text-gray-400 mb-4">{result.tagline}</p>

                    <Button
                      onClick={() => {
                        const el = document.getElementById('pricing')
                        if (el) el.scrollIntoView({ behavior: 'smooth' })
                        setExpanded(false)
                      }}
                      className="w-full bg-gradient-to-r from-[#d4a017] to-[#e8b923] text-black font-bold text-sm hover:shadow-[0_0_20px_-3px_rgba(212,160,23,0.5)] transition-all duration-300"
                      size="sm"
                    >
                      View Plans
                      <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                    </Button>

                    <button
                      onClick={handleReset}
                      className="w-full mt-2 text-xs text-gray-500 hover:text-[#d4a017] transition-colors"
                    >
                      Try different options
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    {/* Goal */}
                    <div>
                      <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5 block">
                        Your Goal
                      </label>
                      <div className="relative">
                        <select
                          value={goal}
                          onChange={(e) => setGoal(e.target.value as Goal)}
                          className="w-full appearance-none rounded-lg bg-white/[0.04] border border-white/[0.08] px-3 py-2.5 pr-8 text-sm text-white focus:border-[#d4a017]/50 focus:outline-none focus:ring-1 focus:ring-[#d4a017]/30 transition-colors"
                        >
                          <option value="" className="bg-[#1a1a1a]">Select goal</option>
                          {goalOptions.map((opt) => (
                            <option key={opt.value} value={opt.value} className="bg-[#1a1a1a]">
                              {opt.label}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-500 pointer-events-none" />
                      </div>
                    </div>

                    {/* Frequency */}
                    <div>
                      <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5 block">
                        Frequency
                      </label>
                      <div className="relative">
                        <select
                          value={frequency}
                          onChange={(e) => setFrequency(e.target.value as Frequency)}
                          className="w-full appearance-none rounded-lg bg-white/[0.04] border border-white/[0.08] px-3 py-2.5 pr-8 text-sm text-white focus:border-[#d4a017]/50 focus:outline-none focus:ring-1 focus:ring-[#d4a017]/30 transition-colors"
                        >
                          <option value="" className="bg-[#1a1a1a]">Select frequency</option>
                          {frequencyOptions.map((opt) => (
                            <option key={opt.value} value={opt.value} className="bg-[#1a1a1a]">
                              {opt.label}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-500 pointer-events-none" />
                      </div>
                    </div>

                    {/* Budget */}
                    <div>
                      <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5 block">
                        Monthly Budget
                      </label>
                      <div className="relative">
                        <select
                          value={budget}
                          onChange={(e) => setBudget(e.target.value as BudgetRange)}
                          className="w-full appearance-none rounded-lg bg-white/[0.04] border border-white/[0.08] px-3 py-2.5 pr-8 text-sm text-white focus:border-[#d4a017]/50 focus:outline-none focus:ring-1 focus:ring-[#d4a017]/30 transition-colors"
                        >
                          <option value="" className="bg-[#1a1a1a]">Select budget</option>
                          {budgetOptions.map((opt) => (
                            <option key={opt.value} value={opt.value} className="bg-[#1a1a1a]">
                              {opt.label}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-500 pointer-events-none" />
                      </div>
                    </div>

                    {/* Submit */}
                    <Button
                      onClick={handleGetRecommendation}
                      disabled={!goal || !frequency || !budget}
                      className={cn(
                        'w-full font-bold text-sm transition-all duration-300',
                        goal && frequency && budget
                          ? 'bg-gradient-to-r from-[#d4a017] to-[#e8b923] text-black hover:shadow-[0_0_20px_-3px_rgba(212,160,23,0.5)]'
                          : 'bg-white/[0.06] text-gray-500 cursor-not-allowed'
                      )}
                      size="sm"
                    >
                      <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                      Get Recommendation
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle pill button */}
      <motion.button
        onClick={handleToggle}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          'flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all duration-300 shadow-lg',
          expanded
            ? 'bg-[#d4a017] border-[#e8b923] text-black shadow-[0_0_20px_rgba(212,160,23,0.3)]'
            : 'bg-[#111111]/90 border-white/[0.08] text-white hover:border-[#d4a017]/40 hover:shadow-[0_0_15px_rgba(212,160,23,0.15)] backdrop-blur-xl'
        )}
        aria-label="Toggle quick quote calculator"
      >
        <Calculator className={cn('h-4 w-4', expanded ? 'text-black' : 'text-[#d4a017]')} />
        <span className={cn('text-sm font-semibold', expanded ? 'text-black' : 'text-white')}>
          Quick Quote
        </span>
      </motion.button>
    </div>
  )
}
