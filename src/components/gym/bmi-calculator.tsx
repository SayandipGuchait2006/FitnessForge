'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calculator, ArrowRight, Ruler, Weight, User, Sparkles } from 'lucide-react'
import { ScrollReveal } from '@/components/gym/scroll-reveal'
import { cn } from '@/lib/utils'

type UnitMode = 'metric' | 'imperial'
type Gender = 'male' | 'female'

interface BMIResult {
  value: number
  category: string
  color: string
  gradientClass: string
  advice: string
  plan: string
}

function getBMICategory(bmi: number): BMIResult {
  if (bmi < 18.5) {
    return {
      value: bmi,
      category: 'Underweight',
      color: '#3b82f6',
      gradientClass: 'from-blue-400 to-blue-600',
      advice: 'Consider a nutrient-rich diet with strength training to build healthy muscle mass and reach an optimal weight.',
      plan: 'Our BASIC plan with guided nutrition counseling and beginner-friendly strength classes can help you build a stronger foundation!',
    }
  } else if (bmi < 25) {
    return {
      value: bmi,
      category: 'Normal',
      color: '#22c55e',
      gradientClass: 'from-green-400 to-green-600',
      advice: 'Great job! Maintain your healthy weight with regular exercise and a balanced diet for long-term wellness.',
      plan: 'Our STANDARD plan with diverse class access and wellness programs is perfect for maintaining your peak condition!',
    }
  } else if (bmi < 30) {
    return {
      value: bmi,
      category: 'Overweight',
      color: '#f59e0b',
      gradientClass: 'from-amber-400 to-amber-600',
      advice: 'A combination of cardio and strength training along with mindful eating can help you reach a healthier weight.',
      plan: 'Our PRO plan with personal training sessions and HIIT classes is designed to accelerate your transformation!',
    }
  } else {
    return {
      value: bmi,
      category: 'Obese',
      color: '#ef4444',
      gradientClass: 'from-red-400 to-red-600',
      advice: 'Start with low-impact exercises and consult our trainers for a safe, progressive fitness plan tailored to your needs.',
      plan: 'Our PRO plan with 1-on-1 personal training, nutrition coaching, and recovery sessions provides the full support you need!',
    }
  }
}

export function BmiCalculator() {
  const [unitMode, setUnitMode] = useState<UnitMode>('metric')
  const [gender, setGender] = useState<Gender>('male')
  const [weight, setWeight] = useState('')
  const [heightCm, setHeightCm] = useState('')
  const [heightFt, setHeightFt] = useState('')
  const [heightIn, setHeightIn] = useState('')
  const [age, setAge] = useState('')
  const [result, setResult] = useState<BMIResult | null>(null)
  const [showResult, setShowResult] = useState(false)

  const calculateBMI = () => {
    let weightKg: number
    let heightM: number

    if (unitMode === 'metric') {
      weightKg = parseFloat(weight)
      heightM = parseFloat(heightCm) / 100
    } else {
      weightKg = parseFloat(weight) * 0.453592
      const totalInches = parseFloat(heightFt) * 12 + parseFloat(heightIn)
      heightM = totalInches * 0.0254
    }

    if (!weightKg || !heightM || weightKg <= 0 || heightM <= 0) return

    const bmi = weightKg / (heightM * heightM)
    const bmiResult = getBMICategory(Math.round(bmi * 10) / 10)
    setResult(bmiResult)
    setShowResult(true)
  }

  const handleReset = () => {
    setShowResult(false)
    setResult(null)
  }

  // BMI scale indicator position (10-40 range mapped to percentage)
  const scalePosition = useMemo(() => {
    if (!result) return 0
    const min = 10
    const max = 40
    const clamped = Math.max(min, Math.min(max, result.value))
    return ((clamped - min) / (max - min)) * 100
  }, [result])

  return (
    <section id="bmi" className="relative py-20 bg-forge-dark overflow-hidden">
      {/* Decorative section number */}
      <span className="absolute top-8 left-8 text-[200px] font-black text-white/[0.02] pointer-events-none select-none leading-none">08</span>
      {/* Subtle background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-forge-amber/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-forge-amber/20 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#d4a017]/60">08 — Health Check</span>
            <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight" style={{ textShadow: '0 0 40px rgba(212, 160, 23, 0.1)' }}>
              BMI <span className="gradient-text">Calculator</span>
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
            <p className="mt-6 text-gray-400 max-w-xl mx-auto">
              Know your Body Mass Index and get personalized fitness recommendations from Avenger The Fitness Temple.
            </p>
          </div>
        </ScrollReveal>

        <div className="max-w-2xl mx-auto">
          <ScrollReveal delay={0.1}>
            <div className="glass rounded-2xl p-6 sm:p-8 border border-white/5 relative overflow-hidden">
              {/* Decorative glow */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-forge-amber/5 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-forge-gold/5 rounded-full blur-3xl pointer-events-none" />

              <AnimatePresence mode="wait">
                {!showResult ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Unit toggle */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <Calculator className="size-5 text-forge-amber" />
                        <span className="text-white font-semibold text-sm">Unit System</span>
                      </div>
                      <div className="flex bg-forge-card rounded-lg p-1 border border-white/5">
                        <button
                          onClick={() => setUnitMode('metric')}
                          className={cn(
                            'px-4 py-1.5 text-xs font-medium rounded-md transition-all duration-200',
                            unitMode === 'metric'
                              ? 'bg-forge-amber text-forge-dark'
                              : 'text-gray-400 hover:text-white'
                          )}
                        >
                          Metric
                        </button>
                        <button
                          onClick={() => setUnitMode('imperial')}
                          className={cn(
                            'px-4 py-1.5 text-xs font-medium rounded-md transition-all duration-200',
                            unitMode === 'imperial'
                              ? 'bg-forge-amber text-forge-dark'
                              : 'text-gray-400 hover:text-white'
                          )}
                        >
                          Imperial
                        </button>
                      </div>
                    </div>

                    {/* Gender toggle */}
                    <div className="mb-5">
                      <label className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-2 block">
                        Gender
                      </label>
                      <div className="flex bg-forge-card rounded-lg p-1 border border-white/5">
                        <button
                          onClick={() => setGender('male')}
                          className={cn(
                            'flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-md transition-all duration-200',
                            gender === 'male'
                              ? 'bg-forge-amber/20 text-forge-amber border border-forge-amber/30'
                              : 'text-gray-400 hover:text-white border border-transparent'
                          )}
                        >
                          <User className="size-4" />
                          Male
                        </button>
                        <button
                          onClick={() => setGender('female')}
                          className={cn(
                            'flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-md transition-all duration-200',
                            gender === 'female'
                              ? 'bg-forge-amber/20 text-forge-amber border border-forge-amber/30'
                              : 'text-gray-400 hover:text-white border border-transparent'
                          )}
                        >
                          <User className="size-4" />
                          Female
                        </button>
                      </div>
                    </div>

                    {/* Weight input */}
                    <div className="mb-5">
                      <label className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-2 block">
                        Weight ({unitMode === 'metric' ? 'kg' : 'lbs'})
                      </label>
                      <div className="relative">
                        <Weight className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-500" />
                        <input
                          type="number"
                          value={weight}
                          onChange={(e) => setWeight(e.target.value)}
                          placeholder={unitMode === 'metric' ? 'e.g. 75' : 'e.g. 165'}
                          min="0"
                          className="w-full bg-forge-card border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-forge-amber/50 focus:ring-1 focus:ring-forge-amber/20 transition-all"
                        />
                      </div>
                    </div>

                    {/* Height input */}
                    <div className="mb-5">
                      <label className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-2 block">
                        Height{unitMode === 'imperial' ? ' (ft & in)' : ' (cm)'}
                      </label>
                      {unitMode === 'metric' ? (
                        <div className="relative">
                          <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-500" />
                          <input
                            type="number"
                            value={heightCm}
                            onChange={(e) => setHeightCm(e.target.value)}
                            placeholder="e.g. 175"
                            min="0"
                            className="w-full bg-forge-card border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-forge-amber/50 focus:ring-1 focus:ring-forge-amber/20 transition-all"
                          />
                        </div>
                      ) : (
                        <div className="flex gap-3">
                          <div className="relative flex-1">
                            <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-500" />
                            <input
                              type="number"
                              value={heightFt}
                              onChange={(e) => setHeightFt(e.target.value)}
                              placeholder="ft"
                              min="0"
                              className="w-full bg-forge-card border border-white/10 rounded-lg pl-10 pr-3 py-3 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-forge-amber/50 focus:ring-1 focus:ring-forge-amber/20 transition-all"
                            />
                          </div>
                          <div className="relative flex-1">
                            <input
                              type="number"
                              value={heightIn}
                              onChange={(e) => setHeightIn(e.target.value)}
                              placeholder="in"
                              min="0"
                              max="11"
                              className="w-full bg-forge-card border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-forge-amber/50 focus:ring-1 focus:ring-forge-amber/20 transition-all"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Age input (optional) */}
                    <div className="mb-6">
                      <label className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-2 block">
                        Age <span className="text-gray-600">(optional)</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-500" />
                        <input
                          type="number"
                          value={age}
                          onChange={(e) => setAge(e.target.value)}
                          placeholder="e.g. 28"
                          min="0"
                          className="w-full bg-forge-card border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-forge-amber/50 focus:ring-1 focus:ring-forge-amber/20 transition-all"
                        />
                      </div>
                    </div>

                    {/* Calculate button */}
                    <button
                      onClick={calculateBMI}
                      className="w-full bg-forge-amber hover:bg-forge-gold text-forge-dark font-bold py-3.5 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-forge-amber/25 flex items-center justify-center gap-2 text-sm"
                    >
                      <Sparkles className="size-4" />
                      Calculate BMI
                      <ArrowRight className="size-4" />
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {result && (
                      <>
                        {/* BMI Value display */}
                        <div className="text-center mb-6">
                          <p className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-2">
                            Your BMI
                          </p>
                          <motion.p
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                            className={cn(
                              'text-6xl sm:text-7xl font-black bg-gradient-to-r bg-clip-text text-transparent',
                              result.gradientClass
                            )}
                          >
                            {result.value}
                          </motion.p>
                          <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="mt-2 inline-flex"
                          >
                            <span
                              className={cn(
                                'px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border',
                                result.category === 'Underweight' && 'bg-blue-500/10 text-blue-400 border-blue-500/20',
                                result.category === 'Normal' && 'bg-green-500/10 text-green-400 border-green-500/20',
                                result.category === 'Overweight' && 'bg-amber-500/10 text-amber-400 border-amber-500/20',
                                result.category === 'Obese' && 'bg-red-500/10 text-red-400 border-red-500/20'
                              )}
                            >
                              {result.category}
                            </span>
                          </motion.div>
                        </div>

                        {/* Visual BMI scale bar */}
                        <div className="mb-6">
                          <div className="relative h-3 rounded-full overflow-hidden bg-gray-800">
                            <div className="absolute inset-0 flex">
                              <div className="w-[30%] bg-gradient-to-r from-blue-500 to-blue-400" />
                              <div className="w-[21.7%] bg-gradient-to-r from-green-500 to-green-400" />
                              <div className="w-[16.6%] bg-gradient-to-r from-amber-500 to-amber-400" />
                              <div className="flex-1 bg-gradient-to-r from-red-500 to-red-400" />
                            </div>
                          </div>
                          {/* Indicator arrow */}
                          <motion.div
                            initial={{ left: 0 }}
                            animate={{ left: `${scalePosition}%` }}
                            transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
                            className="absolute -top-1 -translate-x-1/2"
                            style={{ position: 'relative', marginTop: '-4px' }}
                          >
                            <div
                              className="w-3 h-3 rotate-45 mx-auto border-2 border-white"
                              style={{ backgroundColor: result.color }}
                            />
                          </motion.div>
                          {/* Scale labels */}
                          <div className="flex justify-between mt-2 text-[10px] text-gray-600">
                            <span>10</span>
                            <span>18.5</span>
                            <span>25</span>
                            <span>30</span>
                            <span>40</span>
                          </div>
                        </div>

                        {/* Health advice */}
                        <div className="bg-forge-card/50 rounded-lg p-4 border border-white/5 mb-4">
                          <p className="text-gray-300 text-sm leading-relaxed">
                            💡 {result.advice}
                          </p>
                        </div>

                        {/* Recommended plan */}
                        <div className="bg-forge-amber/5 rounded-lg p-4 border border-forge-amber/10 mb-6">
                          <div className="flex items-start gap-2">
                            <Sparkles className="size-4 text-forge-amber shrink-0 mt-0.5" />
                            <p className="text-gray-300 text-sm leading-relaxed">
                              {result.plan}
                            </p>
                          </div>
                        </div>

                        {/* Recalculate button */}
                        <button
                          onClick={handleReset}
                          className="w-full border border-white/10 text-gray-300 hover:text-white hover:border-forge-amber/30 font-medium py-3 rounded-lg transition-all duration-300 text-sm"
                        >
                          Recalculate
                        </button>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
