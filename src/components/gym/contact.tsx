'use client'

import { useState, useCallback, useRef } from 'react'
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Send,
  Instagram,
  Twitter,
  Facebook,
  Youtube,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { ScrollReveal } from '@/components/gym/scroll-reveal'

const socialLinks = [
  { icon: Instagram, label: 'Instagram', href: '#', hoverColor: '#E4405F' },
  { icon: Facebook, label: 'Facebook', href: '#', hoverColor: '#1877F2' },
  { icon: Twitter, label: 'Twitter', href: '#', hoverColor: '#FFFFFF' },
  { icon: Youtube, label: 'YouTube', href: '#', hoverColor: '#FF0000' },
]

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const submitBtnRef = useRef<HTMLButtonElement>(null)

  const handleRipple = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = submitBtnRef.current
    if (!btn) return
    const rect = btn.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const circle = document.createElement('span')
    circle.className = 'ripple-circle'
    circle.style.left = `${x}px`
    circle.style.top = `${y}px`
    circle.style.width = '20px'
    circle.style.height = '20px'
    circle.style.marginLeft = '-10px'
    circle.style.marginTop = '-10px'
    btn.appendChild(circle)
    setTimeout(() => circle.remove(), 600)
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      message: formData.get('message') as string,
    }

    try {
      const response = await fetch('/api/contact', {
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
      setTimeout(() => setSubmitted(false), 4000)
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="relative py-20 md:py-28 bg-[#0a0a0a] overflow-hidden section-progress corner-accent-tl">
      {/* Decorative section number */}
      <span className="absolute top-8 right-8 text-[200px] font-black text-white/[0.02] pointer-events-none select-none leading-none parallax-section-number">10</span>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-14">
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#d4a017]/60">10 — Contact</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-2" style={{ textShadow: '0 0 40px rgba(212, 160, 23, 0.1)' }}>
            GET IN <span className="text-[#e8b923]">TOUCH</span>
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
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mt-6">
            Ready to start? We&apos;re here to help.
          </p>
        </ScrollReveal>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          {/* Form Column with decorative amber line */}
          <ScrollReveal direction="left">
            <div className="relative pl-6">
              {/* Decorative amber line on the left */}
              <div className="absolute left-0 top-0 bottom-0 w-1 rounded-full bg-gradient-to-b from-[#d4a017] via-[#e8b923] to-[#d4a017]/20" />

              <form onSubmit={handleSubmit} className="space-y-5 contact-form-glow border border-[#d4a017]/10 rounded-xl p-6 bg-[#0d0d0d]/50 backdrop-blur-sm gradient-border-animated">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm text-gray-400 mb-1.5 block font-medium">
                      Name
                    </label>
                    <Input
                      name="name"
                      placeholder="Your name"
                      required
                      className="bg-[#1a1a1a] border-white/10 text-white placeholder:text-gray-700 placeholder:italic focus-visible:border-[#d4a017] focus-visible:ring-[#d4a017]/30 h-11 transition-all duration-300 input-focus-ring"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-1.5 block font-medium">
                      Email
                    </label>
                    <Input
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      required
                      className="bg-[#1a1a1a] border-white/10 text-white placeholder:text-gray-700 placeholder:italic focus-visible:border-[#d4a017] focus-visible:ring-[#d4a017]/30 h-11 transition-all duration-300 input-focus-ring"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-400 mb-1.5 block font-medium">
                    Phone
                  </label>
                  <Input
                    name="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    className="bg-[#1a1a1a] border-white/10 text-white placeholder:text-gray-700 placeholder:italic focus-visible:border-[#d4a017] focus-visible:ring-[#d4a017]/30 h-11 transition-all duration-300 input-focus-ring"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-400 mb-1.5 block font-medium">
                    Message
                  </label>
                  <Textarea
                    name="message"
                    placeholder="Tell us about your fitness goals..."
                    required
                    rows={5}
                    className="bg-[#1a1a1a] border-white/10 text-white placeholder:text-gray-700 placeholder:italic focus-visible:border-[#d4a017] focus-visible:ring-[#d4a017]/30 resize-none transition-all duration-300 input-focus-ring"
                  />
                </div>

                {error && (
                  <div className="rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
                    {error}
                  </div>
                )}

                <Button
                  ref={submitBtnRef}
                  type="submit"
                  disabled={loading}
                  onClick={handleRipple}
                  className="w-full bg-[#d4a017] hover:bg-[#e8b923] text-black font-bold h-12 text-base transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed btn-ripple-effect gradient-shine-hover"
                >
                  {loading ? (
                    'Sending...'
                  ) : submitted ? (
                    'Message Sent! ✓'
                  ) : (
                    <>
                      <Send className="size-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </ScrollReveal>

          {/* Contact Info Column */}
          <ScrollReveal direction="right" delay={0.2}>
            <div className="space-y-6 frost-glass rounded-xl p-6">
              {/* Address */}
              <div className="flex gap-4 items-start">
                <div className="size-10 rounded-lg bg-[#1a1a1a] border border-white/10 flex items-center justify-center shrink-0">
                  <MapPin className="size-5 text-[#d4a017]" />
                </div>
                <div>
                  <p className="text-white font-semibold mb-1">Address</p>
                  <p className="text-gray-400 text-sm">
                    42 Fitness Avenue, Koramangala, Bangalore 560034
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4 items-start">
                <div className="size-10 rounded-lg bg-[#1a1a1a] border border-white/10 flex items-center justify-center shrink-0">
                  <Phone className="size-5 text-[#d4a017]" />
                </div>
                <div>
                  <p className="text-white font-semibold mb-1">Phone</p>
                  <a
                    href="tel:+919876543210"
                    className="text-gray-400 text-sm hover:text-[#e8b923] transition-colors"
                  >
                    +91 98765 43210
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4 items-start">
                <div className="size-10 rounded-lg bg-[#1a1a1a] border border-white/10 flex items-center justify-center shrink-0">
                  <Mail className="size-5 text-[#d4a017]" />
                </div>
                <div>
                  <p className="text-white font-semibold mb-1">Email</p>
                  <a
                    href="mailto:hello@forgefitness.in"
                    className="text-gray-400 text-sm hover:text-[#e8b923] transition-colors"
                  >
                    hello@forgefitness.in
                  </a>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex gap-4 items-start">
                <div className="size-10 rounded-lg bg-[#1a1a1a] border border-white/10 flex items-center justify-center shrink-0">
                  <Clock className="size-5 text-[#d4a017]" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-white font-semibold">Business Hours</p>
                    <span className="inline-flex items-center gap-1 text-green-400 text-[10px] font-medium">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400 shadow-[0_0_6px_rgba(34,197,94,0.6)]" />
                      </span>
                      Now Open
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Mon - Sat: 5:30 AM - 10:00 PM
                  </p>
                  <p className="text-gray-400 text-sm">Sun: 7:00 AM - 8:00 PM</p>
                </div>
              </div>

              {/* Or call us directly divider */}
              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/[0.06]" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-[#0a0a0a] px-3 text-xs text-neutral-500 uppercase tracking-wider">
                    Or call us directly
                  </span>
                </div>
              </div>

              {/* WhatsApp Button */}
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300"
              >
                <MessageCircle className="size-5" />
                Chat on WhatsApp
              </a>

              {/* Social Media Links */}
              <div className="pt-2">
                <p className="text-xs text-neutral-500 uppercase tracking-wider mb-3 font-medium">Follow Us</p>
                <div className="flex items-center gap-3">
                  {socialLinks.map((social) => {
                    const SocialIcon = social.icon
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        aria-label={social.label}
                        className="social-icon-hover flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-neutral-500 transition-all duration-300"
                        style={{ '--hover-color': social.hoverColor } as React.CSSProperties}
                      >
                        <SocialIcon className="h-4 w-4" />
                      </a>
                    )
                  })}
                </div>
              </div>

              {/* Enhanced Map with SVG street grid, pin, and directions */}
              <div className="w-full h-56 rounded-xl bg-[#1a1a1a] border border-white/10 relative overflow-hidden">
                {/* SVG Street Grid Map */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 224" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Background */}
                  <rect width="400" height="224" fill="#1a1a1a" />
                  {/* Main roads (horizontal) */}
                  <line x1="0" y1="56" x2="400" y2="56" stroke="#2a2a2a" strokeWidth="3" />
                  <line x1="0" y1="112" x2="400" y2="112" stroke="#2a2a2a" strokeWidth="3" />
                  <line x1="0" y1="168" x2="400" y2="168" stroke="#2a2a2a" strokeWidth="3" />
                  {/* Main roads (vertical) */}
                  <line x1="80" y1="0" x2="80" y2="224" stroke="#2a2a2a" strokeWidth="3" />
                  <line x1="200" y1="0" x2="200" y2="224" stroke="#2a2a2a" strokeWidth="3" />
                  <line x1="320" y1="0" x2="320" y2="224" stroke="#2a2a2a" strokeWidth="3" />
                  {/* Secondary streets */}
                  <line x1="0" y1="28" x2="400" y2="28" stroke="#222" strokeWidth="1" />
                  <line x1="0" y1="84" x2="400" y2="84" stroke="#222" strokeWidth="1" />
                  <line x1="0" y1="140" x2="400" y2="140" stroke="#222" strokeWidth="1" />
                  <line x1="0" y1="196" x2="400" y2="196" stroke="#222" strokeWidth="1" />
                  <line x1="40" y1="0" x2="40" y2="224" stroke="#222" strokeWidth="1" />
                  <line x1="120" y1="0" x2="120" y2="224" stroke="#222" strokeWidth="1" />
                  <line x1="160" y1="0" x2="160" y2="224" stroke="#222" strokeWidth="1" />
                  <line x1="240" y1="0" x2="240" y2="224" stroke="#222" strokeWidth="1" />
                  <line x1="280" y1="0" x2="280" y2="224" stroke="#222" strokeWidth="1" />
                  <line x1="360" y1="0" x2="360" y2="224" stroke="#222" strokeWidth="1" />
                  {/* Animated grid lines (subtle) */}
                  <line x1="0" y1="56" x2="400" y2="56" stroke="#d4a017" strokeWidth="1" opacity="0.06">
                    <animate attributeName="opacity" values="0.03;0.08;0.03" dur="4s" repeatCount="indefinite" />
                  </line>
                  <line x1="200" y1="0" x2="200" y2="224" stroke="#d4a017" strokeWidth="1" opacity="0.06">
                    <animate attributeName="opacity" values="0.03;0.08;0.03" dur="5s" repeatCount="indefinite" />
                  </line>
                  {/* Block fills for realism */}
                  <rect x="81" y="57" width="119" height="55" fill="#1e1e1e" rx="2" />
                  <rect x="201" y="57" width="119" height="55" fill="#1c1c1c" rx="2" />
                  <rect x="81" y="113" width="119" height="55" fill="#1c1c1c" rx="2" />
                  <rect x="201" y="113" width="119" height="55" fill="#1e1e1e" rx="2" />
                  <rect x="321" y="57" width="79" height="55" fill="#1d1d1d" rx="2" />
                  <rect x="321" y="113" width="79" height="55" fill="#1d1d1d" rx="2" />
                  {/* Street labels */}
                  <text x="12" y="52" fill="#444" fontSize="6" fontFamily="sans-serif">100th St</text>
                  <text x="12" y="108" fill="#444" fontSize="6" fontFamily="sans-serif">Fitness Ave</text>
                  <text x="12" y="164" fill="#444" fontSize="6" fontFamily="sans-serif">Koramangala Rd</text>
                  <text x="84" y="16" fill="#444" fontSize="6" fontFamily="sans-serif">5th Cross</text>
                  <text x="204" y="16" fill="#444" fontSize="6" fontFamily="sans-serif">Main St</text>
                  <text x="324" y="16" fill="#444" fontSize="6" fontFamily="sans-serif">Park Ln</text>
                  {/* AVENGER FITNESS building highlight */}
                  <rect x="120" y="70" width="70" height="36" fill="#d4a017" opacity="0.12" rx="3" stroke="#d4a017" strokeWidth="0.5" strokeOpacity="0.3" />
                </svg>
                {/* Location Pin with pulse */}
                <div className="absolute" style={{ left: 'calc(50% - 8px)', top: 'calc(40% - 24px)' }}>
                  {/* Pulse ring */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full border-2 border-[#d4a017]/40 animate-ping" style={{ animationDuration: '2s' }} />
                  </div>
                  <MapPin className="size-8 text-[#d4a017] animate-pin-bounce relative z-10 drop-shadow-[0_0_8px_rgba(212,160,23,0.5)]" />
                </div>
                {/* AVENGER FITNESS label */}
                <div className="absolute top-3 right-3 z-10">
                  <span className="inline-flex items-center gap-1 rounded-md bg-[#d4a017]/20 border border-[#d4a017]/30 px-2 py-0.5 text-[10px] font-bold text-[#e8b923] tracking-wider uppercase backdrop-blur-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#d4a017]" />
                    AVENGER FITNESS
                  </span>
                </div>
                {/* Get Directions button */}
                <a
                  href="https://www.google.com/maps/search/42+Fitness+Avenue+Koramangala+Bangalore+560034"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 inline-flex items-center gap-1.5 rounded-lg bg-[#d4a017] hover:bg-[#e8b923] text-black px-4 py-1.5 text-xs font-bold transition-colors duration-300 shadow-lg"
                >
                  <MapPin className="size-3.5" />
                  Get Directions
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
