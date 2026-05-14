'use client'

import { Check, Instagram, Twitter, Linkedin, Calendar } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { TRAINER_NAME_TO_BOOKING_ID } from '@/lib/trainer-meta'
import { siteSocial } from '@/lib/site-config'

interface Trainer {
  name: string
  specialty: string
  experience: string
  image: string
}

interface TrainerProfileModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  trainer: Trainer | null
}

const trainerBios: Record<string, string> = {
  'Arjun Mehta':
    'Arjun is a certified strength and conditioning specialist with over 12 years of experience transforming lives through power training. His methodology combines progressive overload with functional movement patterns to build real-world strength.',
  'Priya Sharma':
    'Priya brings 8 years of holistic wellness expertise, blending traditional yoga practices with modern fitness science. Her classes focus on breathwork, flexibility, and mindful movement for complete mind-body harmony.',
  'Vikram Singh':
    'A CrossFit Level 2 trainer and HIIT specialist, Vikram has spent 10 years pushing athletes beyond their perceived limits. His high-energy sessions are designed for maximum calorie burn and cardiovascular conditioning.',
  'Ananya Rao':
    'Ananya is a competitive boxer turned fitness coach with 7 years of experience. Her boxing-inspired workouts combine technique, cardio, and strength for the ultimate full-body burn.',
}

const trainerCerts: Record<string, string[]> = {
  'Arjun Mehta': ['NSCA-CSCS Certified', 'FMS Level 2', 'Precision Nutrition L1', 'Kettlebell Specialist'],
  'Priya Sharma': ['RYT-500 Certified', 'Meditation Teacher', 'Ayurvedic Wellness Coach', 'Pilates Certified'],
  'Vikram Singh': ['CrossFit Level 2', 'ACE Personal Trainer', 'Olympic Lifting Certified', 'Sports Nutrition'],
  'Ananya Rao': ['USA Boxing Coach', 'ACE Group Fitness', 'Kickboxing Certified', 'CPR/AED Certified'],
}

const trainerSpecs: Record<string, string[]> = {
  'Arjun Mehta': ['Powerlifting', 'Olympic Lifts', 'Body Recomp', 'Athletic Performance'],
  'Priya Sharma': ['Vinyasa Flow', 'Meditation', 'Flexibility', 'Stress Relief'],
  'Vikram Singh': ['CrossFit', 'HIIT', 'Endurance', 'Functional Fitness'],
  'Ananya Rao': ['Boxing', 'Kickboxing', 'Cardio Blast', 'Self-Defense'],
}

const specColors: Record<string, string> = {
  Powerlifting: 'bg-red-500/10 border-red-500/30 text-red-400',
  'Olympic Lifts': 'bg-orange-500/10 border-orange-500/30 text-orange-400',
  'Body Recomp': 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
  'Athletic Performance': 'bg-blue-500/10 border-blue-500/30 text-blue-400',
  'Vinyasa Flow': 'bg-purple-500/10 border-purple-500/30 text-purple-400',
  Meditation: 'bg-teal-500/10 border-teal-500/30 text-teal-400',
  Flexibility: 'bg-pink-500/10 border-pink-500/30 text-pink-400',
  'Stress Relief': 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400',
  CrossFit: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
  HIIT: 'bg-red-500/10 border-red-500/30 text-red-400',
  Endurance: 'bg-green-500/10 border-green-500/30 text-green-400',
  'Functional Fitness': 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400',
  Boxing: 'bg-orange-500/10 border-orange-500/30 text-orange-400',
  Kickboxing: 'bg-red-500/10 border-red-500/30 text-red-400',
  'Cardio Blast': 'bg-rose-500/10 border-rose-500/30 text-rose-400',
  'Self-Defense': 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400',
}

export function TrainerProfileModal({ open, onOpenChange, trainer }: TrainerProfileModalProps) {
  if (!trainer) return null

  const bio = trainerBios[trainer.name] || ''
  const certs = trainerCerts[trainer.name] || []
  const specs = trainerSpecs[trainer.name] || []

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#111111]/95 backdrop-blur-xl border border-white/[0.08] text-white max-w-lg p-0 gap-0 overflow-hidden max-h-[90vh]">
        {/* Trainer Image */}
        <div className="relative w-full aspect-video overflow-hidden rounded-t-xl">
          <img
            src={trainer.image}
            alt={trainer.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {/* Name & Specialty */}
          <DialogHeader className="text-left mb-4">
            <DialogTitle className="text-2xl font-bold text-white">
              {trainer.name}
            </DialogTitle>
            <p className="text-[#e8b923] font-medium text-sm">{trainer.specialty}</p>
          </DialogHeader>

          {/* Experience Badge */}
          <div className="mb-5">
            <span className="inline-flex items-center rounded bg-[#d4a017]/10 border border-[#d4a017]/30 text-[#e8b923] px-3 py-1 text-xs font-medium">
              {trainer.experience}
            </span>
          </div>

          {/* Bio */}
          <p className="text-neutral-400 text-sm leading-relaxed mb-6">{bio}</p>

          {/* Certifications */}
          <div className="mb-6">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 mb-3">
              Certifications
            </h4>
            <ul className="space-y-2.5">
              {certs.map((cert) => (
                <li key={cert} className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-[#e8b923] shrink-0" />
                  <span className="text-neutral-300 text-sm">{cert}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Specializations */}
          <div className="mb-6">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 mb-3">
              Specializations
            </h4>
            <div className="flex flex-wrap gap-2">
              {specs.map((spec) => (
                <span
                  key={spec}
                  className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${specColors[spec] || 'bg-white/10 border-white/20 text-white'}`}
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>

          {/* Book Session Button */}
          <Button
            onClick={() => {
              const trainerId = TRAINER_NAME_TO_BOOKING_ID[trainer.name] || ''
              onOpenChange(false)
              // Dispatch custom event for page-level TrainerBooking component to listen to
              window.dispatchEvent(new CustomEvent('open-trainer-booking', { detail: { trainerId } }))
            }}
            className="w-full bg-gradient-to-r from-[#d4a017] to-[#e8b923] text-black font-semibold hover:shadow-[0_0_20px_-3px_rgba(212,160,23,0.5)] transition-all duration-300 mb-5"
          >
            <Calendar className="mr-2 h-4 w-4" />
            Book Session
          </Button>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-3">
            {[
              { icon: Instagram, label: 'Instagram', href: siteSocial.instagram },
              { icon: Twitter, label: 'Twitter', href: siteSocial.twitter },
              { icon: Linkedin, label: 'LinkedIn', href: siteSocial.linkedin },
            ].map((social) => {
              const SocialIcon = social.icon
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="social-icon-hover flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-neutral-500 transition-all duration-300"
                >
                  <SocialIcon className="h-4 w-4" />
                </a>
              )
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
