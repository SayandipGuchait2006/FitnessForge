'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Calendar, Clock, Target, Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ScrollReveal } from '@/components/gym/scroll-reveal'

const benefits = [
  'No commitment required',
  'Full gym access for 1 day',
  'Free consultation with a trainer',
  'All classes included',
]

const timeSlots = [
  { value: 'morning', label: 'Morning 6-10AM' },
  { value: 'afternoon', label: 'Afternoon 10-2PM' },
  { value: 'evening', label: 'Evening 2-6PM' },
  { value: 'night', label: 'Night 6-10PM' },
]

const fitnessGoals = [
  { value: 'weight-loss', label: 'Weight Loss' },
  { value: 'muscle-gain', label: 'Muscle Gain' },
  { value: 'general-fitness', label: 'General Fitness' },
  { value: 'sports-performance', label: 'Sports Performance' },
  { value: 'rehabilitation', label: 'Rehabilitation' },
]

export function FreeTrial() {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      date: formData.get('date') as string,
      time: formData.get('time') as string,
      goal: formData.get('goal') as string,
    }

    try {
      const response = await fetch('/api/free-trial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        setError(result.error || 'Something went wrong')
        return
      }

      setSubmitted(true)
      ;(e.target as HTMLFormElement).reset()
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="relative py-20 md:py-28 bg-[#111111] overflow-hidden" id="free-trial">
      {/* Decorative section number */}
      <span className="absolute top-8 right-8 text-[200px] font-black text-white/[0.02] pointer-events-none select-none leading-none">11</span>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-14">
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#d4a017]/60">11 — Free Trial</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-2" style={{ textShadow: '0 0 40px rgba(212, 160, 23, 0.1)' }}>
            BOOK YOUR <span className="text-[#e8b923]">FREE TRIAL</span>
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
        </ScrollReveal>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          {/* Left - Motivational Text + Benefits */}
          <ScrollReveal direction="left">
            <div className="flex flex-col justify-center h-full">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Experience <span className="text-[#e8b923]">AVENGER FITNESS</span> Risk-Free
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                Take the first step towards your transformation. Try our world-class facilities, expert trainers, and energizing classes — all at zero cost. No strings attached.
              </p>

              {/* Benefits List */}
              <div className="space-y-4 mb-8">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#d4a017]/15 border border-[#d4a017]/30">
                      <Check className="h-3.5 w-3.5 text-[#e8b923]" />
                    </div>
                    <span className="text-gray-300 text-base font-medium">{benefit}</span>
                  </motion.div>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-xl bg-[#1a1a1a]/80 border border-white/[0.06] p-4 text-center backdrop-blur-xl">
                  <p className="text-2xl font-bold text-[#e8b923]">500+</p>
                  <p className="text-xs text-gray-500 mt-1">Trial Users</p>
                </div>
                <div className="rounded-xl bg-[#1a1a1a]/80 border border-white/[0.06] p-4 text-center backdrop-blur-xl">
                  <p className="text-2xl font-bold text-[#e8b923]">95%</p>
                  <p className="text-xs text-gray-500 mt-1">Join Rate</p>
                </div>
                <div className="rounded-xl bg-[#1a1a1a]/80 border border-white/[0.06] p-4 text-center backdrop-blur-xl">
                  <p className="text-2xl font-bold text-[#e8b923]">1 Day</p>
                  <p className="text-xs text-gray-500 mt-1">Full Access</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right - Booking Form */}
          <ScrollReveal direction="right" delay={0.2}>
            <div className="relative rounded-2xl bg-[#1a1a1a]/80 border border-white/[0.06] backdrop-blur-xl p-6 md:p-8">
              {/* Amber glow accent */}
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-[#d4a017]/10 via-transparent to-[#e8b923]/5 pointer-events-none" />

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                      className="flex h-20 w-20 items-center justify-center rounded-full bg-[#d4a017]/15 border-2 border-[#d4a017]/40 mb-6"
                    >
                      <Check className="h-10 w-10 text-[#e8b923]" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-2">Trial Booked!</h3>
                    <p className="text-gray-400 max-w-sm">
                      We&apos;ll send you a confirmation email with all the details. Get ready to transform!
                    </p>
                    <Button
                      onClick={() => setSubmitted(false)}
                      className="mt-6 bg-white/[0.06] text-[#e8b923] hover:bg-white/[0.1] border border-white/[0.08] font-medium"
                    >
                      Book Another Trial
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="relative space-y-5"
                  >
                    <h3 className="text-xl font-bold text-white mb-1">Claim Your Free Day</h3>
                    <p className="text-sm text-gray-500 mb-4">Fill in the details below to book your trial.</p>

                    {/* Full Name */}
                    <div>
                      <label className="text-sm text-gray-400 mb-1.5 block font-medium">
                        Full Name <span className="text-[#d4a017]">*</span>
                      </label>
                      <Input
                        name="name"
                        placeholder="John Doe"
                        required
                        className="bg-[#111111] border-white/10 text-white placeholder:text-gray-600 focus-visible:border-[#d4a017] focus-visible:ring-[#d4a017]/30 h-11 transition-all duration-300"
                      />
                    </div>

                    {/* Email + Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-gray-400 mb-1.5 block font-medium">
                          Email <span className="text-[#d4a017]">*</span>
                        </label>
                        <Input
                          name="email"
                          type="email"
                          placeholder="you@email.com"
                          required
                          className="bg-[#111111] border-white/10 text-white placeholder:text-gray-600 focus-visible:border-[#d4a017] focus-visible:ring-[#d4a017]/30 h-11 transition-all duration-300"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-gray-400 mb-1.5 block font-medium">Phone</label>
                        <Input
                          name="phone"
                          type="tel"
                          placeholder="+91 98765 43210"
                          className="bg-[#111111] border-white/10 text-white placeholder:text-gray-600 focus-visible:border-[#d4a017] focus-visible:ring-[#d4a017]/30 h-11 transition-all duration-300"
                        />
                      </div>
                    </div>

                    {/* Date + Time */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-gray-400 mb-1.5 block font-medium">
                          Preferred Date <span className="text-[#d4a017]">*</span>
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
                          <Input
                            name="date"
                            type="date"
                            required
                            className="bg-[#111111] border-white/10 text-white placeholder:text-gray-600 focus-visible:border-[#d4a017] focus-visible:ring-[#d4a017]/30 h-11 pl-10 transition-all duration-300"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm text-gray-400 mb-1.5 block font-medium">
                          Preferred Time <span className="text-[#d4a017]">*</span>
                        </label>
                        <div className="relative">
                          <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
                          <select
                            name="time"
                            required
                            className="w-full h-11 pl-10 pr-4 rounded-md bg-[#111111] border border-white/10 text-white text-sm focus:border-[#d4a017] focus:outline-none focus:ring-1 focus:ring-[#d4a017]/30 transition-all duration-300 appearance-none cursor-pointer"
                          >
                            <option value="" className="bg-[#111111]">Select time</option>
                            {timeSlots.map((slot) => (
                              <option key={slot.value} value={slot.label} className="bg-[#111111]">
                                {slot.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Fitness Goal */}
                    <div>
                      <label className="text-sm text-gray-400 mb-1.5 block font-medium">
                        Fitness Goal <span className="text-[#d4a017]">*</span>
                      </label>
                      <div className="relative">
                        <Target className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
                        <select
                          name="goal"
                          required
                          className="w-full h-11 pl-10 pr-4 rounded-md bg-[#111111] border border-white/10 text-white text-sm focus:border-[#d4a017] focus:outline-none focus:ring-1 focus:ring-[#d4a017]/30 transition-all duration-300 appearance-none cursor-pointer"
                        >
                          <option value="" className="bg-[#111111]">Select your goal</option>
                          {fitnessGoals.map((goal) => (
                            <option key={goal.value} value={goal.label} className="bg-[#111111]">
                              {goal.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {error && (
                      <div className="rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
                        {error}
                      </div>
                    )}

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-[#d4a017] to-[#e8b923] hover:from-[#e8b923] hover:to-[#d4a017] text-black font-bold h-12 text-base transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-[#d4a017]/25"
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Booking...
                        </span>
                      ) : (
                        'Book Free Trial'
                      )}
                    </Button>

                    <p className="text-xs text-gray-600 text-center mt-3">
                      No credit card required. Cancel anytime.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
