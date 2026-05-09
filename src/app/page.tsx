'use client'

import { useState, useEffect, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { Navbar } from '@/components/gym/navbar'
import { Hero } from '@/components/gym/hero'
import { OurStory } from '@/components/gym/our-story'
import { Stats } from '@/components/gym/stats'
import { Classes } from '@/components/gym/classes'
import { Pricing } from '@/components/gym/pricing'
import { Trainers } from '@/components/gym/trainers'
import { Facilities } from '@/components/gym/facilities'
import { PromoStrip } from '@/components/gym/promo-strip'
import { BackToTop } from '@/components/gym/back-to-top'
import { WhatsappFloat } from '@/components/gym/whatsapp-float'
import { ChatWidget } from '@/components/gym/chat-widget'
import { CookieConsent } from '@/components/gym/cookie-consent'
import { LoadingSplash } from '@/components/gym/loading-splash'
import { ScrollTracker } from '@/components/gym/scroll-tracker'
import Footer from '@/components/gym/footer'

// Dynamic imports for heavy components to reduce initial bundle
const Testimonials = dynamic(() => import('@/components/gym/testimonials'), { ssr: false })
const Transformations = dynamic(() => import('@/components/gym/transformations'), { ssr: false })
const TransformationSlider = dynamic(() => import('@/components/gym/transformation-slider').then(m => ({ default: m.TransformationSlider })), { ssr: false })
const Gallery = dynamic(() => import('@/components/gym/gallery'), { ssr: false })
const ClassSchedule = dynamic(() => import('@/components/gym/class-schedule').then(m => ({ default: m.ClassSchedule })), { ssr: false })
const ExerciseLibrary = dynamic(() => import('@/components/gym/exercise-library').then(m => ({ default: m.ExerciseLibrary })), { ssr: false })
const Wod = dynamic(() => import('@/components/gym/wod').then(m => ({ default: m.Wod })), { ssr: false })
const NutritionTips = dynamic(() => import('@/components/gym/nutrition-tips').then(m => ({ default: m.NutritionTips })), { ssr: false })
const WorkoutPlan = dynamic(() => import('@/components/gym/workout-plan').then(m => ({ default: m.WorkoutPlan })), { ssr: false })
const Community = dynamic(() => import('@/components/gym/community').then(m => ({ default: m.Community })), { ssr: false })
const MemberSpotlight = dynamic(() => import('@/components/gym/member-spotlight').then(m => ({ default: m.MemberSpotlight })), { ssr: false })
const FitnessChallenges = dynamic(() => import('@/components/gym/fitness-challenges').then(m => ({ default: m.FitnessChallenges })), { ssr: false })
const CtaBanner = dynamic(() => import('@/components/gym/cta-banner').then(m => ({ default: m.CtaBanner })), { ssr: false })
const BmiCalculator = dynamic(() => import('@/components/gym/bmi-calculator').then(m => ({ default: m.BmiCalculator })), { ssr: false })
const FAQ = dynamic(() => import('@/components/gym/faq'), { ssr: false })
const FreeTrial = dynamic(() => import('@/components/gym/free-trial').then(m => ({ default: m.FreeTrial })), { ssr: false })
const Contact = dynamic(() => import('@/components/gym/contact'), { ssr: false })
const SocialProof = dynamic(() => import('@/components/gym/social-proof').then(m => ({ default: m.SocialProof })), { ssr: false })
const WorkoutTimer = dynamic(() => import('@/components/gym/workout-timer').then(m => ({ default: m.WorkoutTimer })), { ssr: false })
const QuoteCalculator = dynamic(() => import('@/components/gym/quote-calculator').then(m => ({ default: m.QuoteCalculator })), { ssr: false })
const ProgressTracker = dynamic(() => import('@/components/gym/progress-tracker').then(m => ({ default: m.ProgressTracker })), { ssr: false })
const LiveClassStatus = dynamic(() => import('@/components/gym/live-class-status').then(m => ({ default: m.LiveClassStatus })), { ssr: false })
const NewsletterPopup = dynamic(() => import('@/components/gym/newsletter-popup').then(m => ({ default: m.NewsletterPopup })), { ssr: false })
const Achievements = dynamic(() => import('@/components/gym/achievements').then(m => ({ default: m.Achievements })), { ssr: false })
const AchievementBadges = dynamic(() => import('@/components/gym/achievement-badges').then(m => ({ default: m.AchievementBadges })), { ssr: false })
const TrainerBooking = dynamic(() => import('@/components/gym/trainer-booking').then(m => ({ default: m.TrainerBooking })), { ssr: false })

export default function Home() {
  const [promoVisible, setPromoVisible] = useState(true)
  const [trainerBookingOpen, setTrainerBookingOpen] = useState(false)
  const [preselectedTrainer, setPreselectedTrainer] = useState<string | undefined>(undefined)

  const handleTrainerBookingEvent = useCallback((e: Event) => {
    const detail = (e as CustomEvent).detail
    if (detail?.trainerId) {
      setPreselectedTrainer(detail.trainerId)
    }
    setTrainerBookingOpen(true)
  }, [])

  useEffect(() => {
    window.addEventListener('open-trainer-booking', handleTrainerBookingEvent)
    return () => window.removeEventListener('open-trainer-booking', handleTrainerBookingEvent)
  }, [handleTrainerBookingEvent])

  return (
    <div className="relative min-h-screen flex flex-col bg-[#0a0a0a]">
      <LoadingSplash />
      <ScrollTracker />
      <PromoStrip visible={promoVisible} onDismiss={() => setPromoVisible(false)} />
      <Navbar promoVisible={promoVisible} />
      <main className="flex-1">
        <Hero />
        <OurStory />
        <div className="amber-gradient-line" />
        <Stats />
        <div className="section-glow-line" />
        <Achievements />
        <AchievementBadges />
        {/* Diagonal transition: Stats→Achievements → Classes */}
        <div className="section-diagonal-transition" />
        <Classes />
        <Pricing />
        <div className="section-glow-line" />
        <Trainers />
        {/* Diagonal transition: Trainers→Facilities */}
        <div className="section-diagonal-transition-light" />
        <Facilities />
        <Testimonials />
        <div className="amber-gradient-line" />
        <Transformations />
        <TransformationSlider />
        <Gallery />
        <div className="section-glow-line" />
        <ClassSchedule />
        <ExerciseLibrary />
        <Wod />
        <NutritionTips />
        <WorkoutPlan />
        <Community />
        <MemberSpotlight />
        <FitnessChallenges />
        <CtaBanner />
        <div className="amber-gradient-line" />
        <BmiCalculator />
        <FAQ />
        {/* Diagonal transition: FAQ→FreeTrial */}
        <div className="section-diagonal-transition" />
        <FreeTrial />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <ChatWidget />
      <WhatsappFloat />
      <ProgressTracker />
      <LiveClassStatus />
      <SocialProof />
      <WorkoutTimer />
      <QuoteCalculator />
      <CookieConsent />
      <NewsletterPopup />
      <TrainerBooking open={trainerBookingOpen} onOpenChange={setTrainerBookingOpen} preselectedTrainer={preselectedTrainer} />
    </div>
  )
}
