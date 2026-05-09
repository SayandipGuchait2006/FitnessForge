'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Instagram, Youtube, Twitter, Facebook, ArrowUp, Send } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ScrollReveal } from '@/components/gym/scroll-reveal'

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#home' },
  { label: 'Classes', href: '#classes' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Trainers', href: '#trainers' },
  { label: 'Contact', href: '#contact' },
  { label: 'Back to Top', href: '#home' },
]
const classLinks = [
  { label: 'HIIT', href: '#classes' },
  { label: 'Yoga', href: '#classes' },
  { label: 'Boxing', href: '#classes' },
  { label: 'CrossFit', href: '#classes' },
  { label: 'Spinning', href: '#classes' },
  { label: 'Strength', href: '#classes' },
]

const socialIcons = [
  { icon: Instagram, label: 'Instagram', href: '#', hoverColor: '#E4405F' },
  { icon: Youtube, label: 'YouTube', href: '#', hoverColor: '#FF0000' },
  { icon: Twitter, label: 'Twitter', href: '#', hoverColor: '#FFFFFF' },
  { icon: Facebook, label: 'Facebook', href: '#', hoverColor: '#1877F2' },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  return (
    <footer className="bg-[#050505] mt-auto relative">
      {/* Gradient line at top of footer */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d4a017]/60 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* 4-Column Grid */}
        <ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-14">
            {/* Brand Column */}
            <div className="sm:col-span-2 lg:col-span-1 lg:border-r lg:border-white/[0.06] lg:pr-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative">
                  <img
                    src="/images/gym-logo.png"
                    alt="Avenger The Fitness Temple logo"
                    className="h-10 w-auto"
                  />
                  {/* Back to top arrow bounce */}
                  <a
                    href="#home"
                    onClick={(e) => {
                      e.preventDefault()
                      document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="absolute -top-3 -right-3 flex items-center justify-center size-5 rounded-full bg-[#1a1a1a] border border-[#d4a017]/30 text-[#d4a017] hover:bg-[#d4a017] hover:text-black transition-colors duration-300"
                    aria-label="Back to top"
                  >
                    <ArrowUp className="size-3 arrow-bounce-up" />
                  </a>
                </div>
                <span className="text-white font-black text-xl tracking-tight">
                  AVENGER FITNESS
                </span>
              </div>
              <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                Forge Your Strongest Self
              </p>
              {/* Social Icons with rotate + scale hover */}
              <div className="flex gap-3">
                {socialIcons.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    whileHover={{ scale: 1.15, rotate: 8 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                    className="size-10 rounded-lg bg-[#1a1a1a] border border-white/5 flex items-center justify-center text-gray-500 hover:border-white/20 transition-colors duration-300 social-icon-hover"
                    style={{ '--hover-color': social.hoverColor } as React.CSSProperties}
                  >
                    <social.icon className="size-4" />
                  </motion.a>
                ))}
              </div>

              {/* Newsletter subscription */}
              <div className="mt-6">
                <p className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-2">
                  Stay Updated
                </p>
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="flex-1 min-w-0 bg-[#1a1a1a] border border-white/10 rounded-md px-3 py-2 text-xs text-white placeholder:text-gray-600 focus:outline-none focus:border-[#d4a017]/50 transition-colors"
                  />
                  <button
                    type="submit"
                    className="flex items-center gap-1 bg-[#d4a017] hover:bg-[#e8b923] text-black font-semibold px-3 py-2 rounded-md text-xs transition-colors duration-300 shrink-0"
                  >
                    <Send className="size-3" />
                    Subscribe
                  </button>
                </form>
                {subscribed && (
                  <p className="text-green-400 text-xs mt-1.5">✓ Subscribed!</p>
                )}
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:border-r lg:border-white/[0.06] lg:pr-8">
              <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-5">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault()
                        handleNavClick(link.href)
                      }}
                      className={cn(
                        'footer-link link-hover-underline text-gray-500 text-sm hover:text-[#e8b923] transition-colors duration-200',
                        link.label === 'Back to Top' && 'text-gray-400'
                      )}
                    >
                      {link.label === 'Back to Top' && (
                        <ArrowUp className="size-3" />
                      )}
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Classes */}
            <div className="lg:border-r lg:border-white/[0.06] lg:pr-8">
              <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-5">
                Classes
              </h3>
              <ul className="space-y-3">
                {classLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault()
                        handleNavClick(link.href)
                      }}
                      className="footer-link link-hover-underline text-gray-500 text-sm hover:text-[#e8b923] transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-5">
                Contact Info
              </h3>
              <div className="space-y-3 text-sm">
                <p className="text-gray-500">
                  42 Fitness Avenue, Koramangala, Bangalore 560034
                </p>
                <p>
                  <a
                    href="tel:+919876543210"
                    className="text-gray-500 hover:text-[#e8b923] transition-colors"
                  >
                    +91 98765 43210
                  </a>
                </p>
                <p>
                  <a
                    href="mailto:hello@forgefitness.in"
                    className="text-gray-500 hover:text-[#e8b923] transition-colors"
                  >
                    hello@forgefitness.in
                  </a>
                </p>
                <div className="text-gray-500 pt-2">
                  {/* Now Open badge */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-flex items-center gap-1.5 bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium px-2.5 py-1 rounded-full now-open-glow">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                      </span>
                      Now Open
                    </span>
                  </div>
                  <p>Mon - Sat: 5:30 AM - 10:00 PM</p>
                  <p>Sun: 7:00 AM - 8:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs">
            &copy; <span suppressHydrationWarning>{new Date().getFullYear()}</span> Avenger The Fitness Temple. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-gray-600 text-xs hover:text-[#e8b923] transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-600 text-xs hover:text-[#e8b923] transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
