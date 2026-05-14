'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Flame } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from '@/components/ui/sheet'
import { useRafScrollEffect } from '@/hooks/use-raf-scroll-effect'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Classes', href: '#classes' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Trainers', href: '#trainers' },
  { label: 'Schedule', href: '#schedule' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
]

interface NavbarProps {
  promoVisible?: boolean
}

export function Navbar({ promoVisible = false }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [pastHero, setPastHero] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('#home')
  const [scrollProgress, setScrollProgress] = useState(0)

  const scrollSnap = useRef({ scrolled: false, pastHero: false, progress: 0 })

  useRafScrollEffect(() => {
    const y = window.scrollY
    const scrolled = y > 50
    const pastHero = y > 600
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const progress = docHeight > 0 ? Math.min((y / docHeight) * 100, 100) : 0

    const s = scrollSnap.current
    if (s.scrolled !== scrolled) setScrolled(scrolled)
    if (s.pastHero !== pastHero) setPastHero(pastHero)
    if (Math.abs(s.progress - progress) > 0.25) setScrollProgress(progress)
    scrollSnap.current = { scrolled, pastHero, progress }
  })

  // IntersectionObserver for active section detection
  useEffect(() => {
    const sectionIds = navLinks.map((link) => link.href.replace('#', ''))
    const observers: IntersectionObserver[] = []

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(`#${id}`)
            }
          })
        },
        {
          rootMargin: '-20% 0px -60% 0px',
          threshold: 0,
        }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => {
      observers.forEach((obs) => obs.disconnect())
    }
  }, [])

  const handleNavClick = useCallback((href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn(
        'fixed left-0 right-0 z-50 transition-all duration-500',
        promoVisible ? 'top-10' : 'top-0',
        scrolled
          ? 'glass-strong shadow-lg shadow-black/20'
          : 'bg-transparent'
      )}
    >
      {/* Scroll progress bar */}
      <div className="absolute top-0 left-0 right-0 h-[2px] z-10">
        <motion.div
          className="h-full bg-gradient-to-r from-forge-amber to-forge-gold"
          style={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.1, ease: 'linear' }}
        />
      </div>

      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo with hover rotate */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault()
            handleNavClick('#home')
          }}
          className="flex items-center gap-2 group"
        >
          <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-forge-amber/10 group-hover:bg-forge-amber/20 transition-colors">
            <img
              src="/images/gym-logo.png"
              alt="Forge Fitness"
              className="w-7 h-7 object-contain transition-transform duration-300 group-hover:rotate-12"
            />
          </div>
          <span className="text-lg font-bold tracking-wider text-white logo-glow">
            AVENGER<span className="text-forge-amber ml-1">FITNESS</span>
          </span>
        </a>

        {/* Desktop Navigation with active section indicator */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(link.href)
                }}
                className={cn(
                  'relative px-3 py-2 text-sm font-medium transition-colors group',
                  isActive
                    ? 'text-white'
                    : 'text-gray-300 hover:text-white'
                )}
              >
                {link.label}
                <span
                  className={cn(
                    'absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-forge-amber transition-all duration-300',
                    isActive
                      ? 'w-3/4'
                      : 'w-0 group-hover:w-3/4'
                  )}
                />
              </a>
            )
          })}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="relative">
            <Button
              onClick={() => handleNavClick('#pricing')}
              className="bg-forge-amber hover:bg-forge-gold text-forge-dark font-semibold px-5 rounded-md transition-all duration-300 hover:shadow-lg hover:shadow-forge-amber/25"
            >
              Join Now
            </Button>
            {/* FREE TRIAL badge - appears after scrolling past hero */}
            <AnimatePresence>
              {pastHero && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.5, y: 5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.5, y: 5 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="absolute -top-1.5 -right-1.5 rounded-full bg-[#d4a017] text-black text-[9px] font-bold px-2 py-0.5 whitespace-nowrap animate-pulse"
                >
                  FREE TRIAL
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Menu */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-white hover:bg-white/10 hover:text-forge-amber"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="bg-forge-dark border-forge-border w-72"
          >
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2 text-white">
                <img
                  src="/images/gym-logo.png"
                  alt="Forge Fitness"
                  className="w-6 h-6 object-contain"
                />
                <span className="font-bold tracking-wider">
                  AVENGER<span className="text-forge-amber">FITNESS</span>
                </span>
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-1 px-4 mt-4">
              {navLinks.map((link, index) => {
                const isActive = activeSection === link.href
                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavClick(link.href)
                    }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 + 0.1 }}
                    className={cn(
                      'flex items-center gap-3 rounded-md px-3 py-3 text-base font-medium transition-colors',
                      isActive
                        ? 'text-forge-amber bg-forge-amber/10'
                        : 'text-gray-300 hover:text-forge-amber hover:bg-white/5'
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-forge-amber" />
                    )}
                  </motion.a>
                )
              })}
            </div>
            <div className="mt-6 px-4">
              <Button
                onClick={() => handleNavClick('#pricing')}
                className="w-full bg-forge-amber hover:bg-forge-gold text-forge-dark font-semibold py-3 rounded-md transition-all duration-300"
              >
                Join Now
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </motion.header>
  )
}
