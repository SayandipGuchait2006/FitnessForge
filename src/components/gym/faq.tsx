'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { ScrollReveal } from '@/components/gym/scroll-reveal'

const faqs = [
  {
    question: 'What are the gym timings?',
    answer:
      "We're open Monday to Saturday from 5:30 AM to 10:00 PM, and Sunday from 7:00 AM to 8:00 PM.",
  },
  {
    question: 'Do you offer personal training?',
    answer:
      'Yes! Our certified trainers offer 1-on-1 sessions tailored to your goals. PRO and ELITE members get complimentary sessions.',
  },
  {
    question: 'Is there a joining fee?',
    answer:
      'We occasionally waive the joining fee during promotions. Contact us for current offers!',
  },
  {
    question: 'Can I freeze my membership?',
    answer:
      'Yes, you can freeze your membership for up to 30 days per year with prior notice.',
  },
  {
    question: 'Do you have parking?',
    answer:
      'Yes, we offer free covered parking for all members.',
  },
  {
    question: 'What should I bring on my first visit?',
    answer:
      'Just comfortable workout clothes and a water bottle. We provide towels and lockers.',
  },
]

export default function FAQ() {
  return (
    <section id="faq" className="relative py-20 md:py-28 bg-[#111111] overflow-hidden grid-pattern">
      {/* Decorative section number */}
      <span className="absolute top-8 right-8 text-[200px] font-black text-white/[0.02] pointer-events-none select-none leading-none">09</span>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-14">
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#d4a017]/60">09 — FAQ</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-2" style={{ textShadow: '0 0 40px rgba(212, 160, 23, 0.1)' }}>
            FREQUENTLY ASKED <span className="text-[#e8b923]">QUESTIONS</span>
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

        {/* Accordion */}
        <ScrollReveal delay={0.2}>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, idx) => (
              <AccordionItem
                key={idx}
                value={`faq-${idx}`}
                className="rounded-xl bg-[#1a1a1a] border border-white/5 px-6 data-[state=open]:border-[#d4a017]/30 data-[state=open]:border-l-[3px] data-[state=open]:border-l-[#d4a017] transition-all duration-300"
              >
                <AccordionTrigger className="text-white hover:no-underline hover:text-[#e8b923] transition-colors duration-200 text-left text-base md:text-lg font-medium py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 text-base leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollReveal>
      </div>
    </section>
  )
}
