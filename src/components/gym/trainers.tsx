'use client'

import { useState } from 'react'
import { Instagram, Twitter, Linkedin, Calendar, ArrowRight, Clock, Star, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollReveal } from '@/components/gym/scroll-reveal'
import { TrainerProfileModal } from '@/components/gym/trainer-profile-modal'
import { cn } from '@/lib/utils'

interface Trainer {
  name: string
  specialty: string
  experience: string
  image: string
  experienceYears: number
  rating: string
  clients: string
}

const trainers: Trainer[] = [
  {
    name: 'Arjun Mehta',
    specialty: 'Strength & Conditioning',
    experience: '12+ Years Experience',
    image: '/images/trainer1.png',
    experienceYears: 12,
    rating: '4.9',
    clients: '200+',
  },
  {
    name: 'Priya Sharma',
    specialty: 'Yoga & Wellness',
    experience: '8+ Years Experience',
    image: '/images/trainer2.png',
    experienceYears: 8,
    rating: '4.8',
    clients: '150+',
  },
  {
    name: 'Vikram Singh',
    specialty: 'CrossFit & HIIT',
    experience: '10+ Years Experience',
    image: '/images/trainer3.png',
    experienceYears: 10,
    rating: '4.9',
    clients: '180+',
  },
  {
    name: 'Ananya Rao',
    specialty: 'Boxing & Cardio',
    experience: '7+ Years Experience',
    image: '/images/trainer4.png',
    experienceYears: 7,
    rating: '4.7',
    clients: '120+',
  },
]

const socialLinks = [
  { icon: Instagram, label: 'Instagram', hoverColor: '#E4405F' },
  { icon: Twitter, label: 'Twitter', hoverColor: '#FFFFFF' },
  { icon: Linkedin, label: 'LinkedIn', hoverColor: '#0A66C2' },
]

export function Trainers() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null)

  const handleViewProfile = (trainer: Trainer) => {
    setSelectedTrainer(trainer)
    setModalOpen(true)
  }

  return (
    <section id="trainers" className="relative py-20 md:py-28 bg-[#0a0a0a] overflow-hidden">
      {/* Decorative section number */}
      <span className="absolute top-8 right-8 text-[200px] font-black text-white/[0.02] pointer-events-none select-none leading-none parallax-section-number">03</span>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-14 md:mb-20">
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#d4a017]/60">03 — Our Team</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mt-2" style={{ textShadow: '0 0 40px rgba(212, 160, 23, 0.1)' }}>
            EXPERT TRAINERS
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
            Learn from the best. Our coaches are champions in their craft.
          </p>
        </ScrollReveal>

        {/* Trainer Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {trainers.map((trainer, index) => (
            <ScrollReveal key={trainer.name} delay={index * 0.12}>
              <div className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm transition-all duration-500 hover:border-[#d4a017]/40 hover:shadow-[0_0_30px_-5px_rgba(212,160,23,0.15)] hover:-translate-y-1">
                {/* Image Container */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={trainer.image}
                    alt={trainer.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Dark gradient overlay at bottom for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Amber gradient overlay on Hover with bottom-heavy gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#d4a017]/90 via-[#d4a017]/40 to-[#d4a017]/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Book Session Button - appears on hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-500 group-hover:opacity-100">
                    <Button
                      size="sm"
                      className="bg-white text-black font-semibold hover:bg-white/90 shadow-xl"
                    >
                      <Calendar className="mr-1.5 h-4 w-4" />
                      Book Session
                    </Button>
                  </div>

                  {/* Social icons overlay on hover with stagger */}
                  <div className="absolute bottom-16 left-0 right-0 flex justify-center gap-3 opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                    {socialLinks.map((social, i) => {
                      const SocialIcon = social.icon
                      return (
                        <button
                          key={social.label}
                          aria-label={social.label}
                          className="social-icon-hover flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white transition-all duration-300 hover:bg-white/10 hover:border-white/30"
                          style={{ transitionDelay: `${i * 75}ms`, '--hover-color': social.hoverColor } as React.CSSProperties}
                        >
                          <SocialIcon className="h-4 w-4" />
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Info Section */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-white transition-all duration-300 group-hover:[text-shadow:0_0_12px_rgba(212,160,23,0.4)]">
                    {trainer.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-[#e8b923]">
                    {trainer.specialty}
                  </p>

                  {/* Stats bar: Experience | Rating | Clients */}
                  <div className="mt-2 flex items-center gap-3 text-[11px]">
                    <div className="flex items-center gap-1 text-neutral-400">
                      <Clock className="h-3 w-3 text-[#d4a017]/70" />
                      <span>{trainer.experienceYears}+ Yrs</span>
                    </div>
                    <div className="w-px h-3 bg-white/10" />
                    <div className="flex items-center gap-1 text-neutral-400">
                      <Star className="h-3 w-3 text-[#d4a017]/70 fill-[#d4a017]/70" />
                      <span>{trainer.rating}</span>
                    </div>
                    <div className="w-px h-3 bg-white/10" />
                    <div className="flex items-center gap-1 text-neutral-400">
                      <Users className="h-3 w-3 text-[#d4a017]/70" />
                      <span>{trainer.clients}</span>
                    </div>
                  </div>

                  {/* VIEW PROFILE Link */}
                  <button
                    onClick={() => handleViewProfile(trainer)}
                    className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-neutral-500 hover:text-[#e8b923] transition-colors duration-300 uppercase tracking-wider group/profile"
                  >
                    View Profile
                    <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover/profile:translate-x-0.5" />
                  </button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Divider line */}
        <div className="section-divider mt-20" />
      </div>

      {/* Trainer Profile Modal */}
      <TrainerProfileModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        trainer={selectedTrainer}
      />
    </section>
  )
}
