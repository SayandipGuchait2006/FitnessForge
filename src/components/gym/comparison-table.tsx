'use client'

import { Check, X, ArrowRight } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface ComparisonTableProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

type FeatureValue = string | boolean

interface ComparisonRow {
  feature: string
  starter: FeatureValue
  pro: FeatureValue
  elite: FeatureValue
}

const comparisonData: ComparisonRow[] = [
  { feature: 'Gym Access', starter: true, pro: true, elite: true },
  { feature: 'Group Classes', starter: '2/week', pro: 'Unlimited', elite: 'Unlimited' },
  { feature: 'Personal Training', starter: false, pro: '1/month', elite: 'Unlimited' },
  { feature: 'Locker Room', starter: 'Basic', pro: 'Personal', elite: 'VIP' },
  { feature: 'Steam & Sauna', starter: false, pro: true, elite: true },
  { feature: 'Nutrition Consultation', starter: false, pro: true, elite: true },
  { feature: 'VIP Lounge', starter: false, pro: false, elite: true },
  { feature: 'Guest Passes', starter: false, pro: false, elite: '2/month' },
  { feature: 'Monthly Assessment', starter: false, pro: false, elite: true },
  { feature: 'Priority Booking', starter: false, pro: false, elite: true },
  { feature: 'Free Towel Service', starter: false, pro: true, elite: true },
  { feature: 'Parking', starter: 'Paid', pro: 'Free', elite: 'Free' },
  { feature: 'Mobile App Access', starter: true, pro: true, elite: true },
  { feature: 'Freeze Membership', starter: false, pro: '7 days', elite: '14 days' },
  { feature: 'Cancellation', starter: '30 days', pro: '14 days', elite: '7 days' },
]

const plans = [
  { name: 'STARTER', price: '₹1,499', period: '/mo' },
  { name: 'PRO', price: '₹2,999', period: '/mo' },
  { name: 'ELITE', price: '₹4,999', period: '/mo' },
]

function CellValue({ value }: { value: FeatureValue }) {
  if (value === true) {
    return <Check className="h-5 w-5 text-emerald-400 mx-auto" />
  }
  if (value === false) {
    return <X className="h-5 w-5 text-neutral-600 mx-auto" />
  }
  return <span className="text-sm text-neutral-300 text-center">{value}</span>
}

export function ComparisonTable({ open, onOpenChange }: ComparisonTableProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#111111]/95 backdrop-blur-xl border border-white/[0.08] text-white max-w-3xl p-0 gap-0 overflow-hidden max-h-[90vh]">
        {/* Header - Sticky */}
        <div className="sticky top-0 z-10 bg-[#111111]/98 backdrop-blur-xl border-b border-white/[0.08]">
          <DialogHeader className="p-6 pb-4">
            <DialogTitle className="text-2xl font-bold text-white text-center">
              Compare Plans
            </DialogTitle>
            <p className="text-neutral-500 text-sm text-center">
              See which membership tier is right for you
            </p>
          </DialogHeader>

          {/* Plan Headers Row */}
          <div className="grid grid-cols-4 px-6 pb-4">
            <div className="flex items-center justify-center">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                Feature
              </span>
            </div>
            {plans.map((plan, idx) => (
              <div
                key={plan.name}
                className={`flex flex-col items-center justify-center rounded-lg p-3 ${
                  idx === 1
                    ? 'bg-[#d4a017]/10 border border-[#d4a017]/30'
                    : 'border border-transparent'
                }`}
              >
                <span
                  className={`text-xs font-bold uppercase tracking-[0.15em] ${
                    idx === 1 ? 'text-[#e8b923]' : 'text-neutral-400'
                  }`}
                >
                  {plan.name}
                </span>
                <span className="text-lg font-extrabold text-white mt-1">{plan.price}</span>
                <span className="text-xs text-neutral-500">{plan.period}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scrollable Table Body */}
        <div className="overflow-y-auto max-h-[50vh] px-6">
          <div className="space-y-0">
            {comparisonData.map((row, idx) => (
              <div
                key={row.feature}
                className={`grid grid-cols-4 py-3.5 ${
                  idx !== comparisonData.length - 1 ? 'border-b border-white/[0.04]' : ''
                }`}
              >
                <div className="flex items-center pr-4">
                  <span className="text-sm text-neutral-300 font-medium">{row.feature}</span>
                </div>
                {[row.starter, row.pro, row.elite].map((val, colIdx) => (
                  <div
                    key={`${row.feature}-${colIdx}`}
                    className={`flex items-center justify-center ${
                      colIdx === 1 ? 'bg-[#d4a017]/5 rounded' : ''
                    }`}
                  >
                    <CellValue value={val} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Footer - CTA Buttons */}
        <div className="sticky bottom-0 z-10 bg-[#111111]/98 backdrop-blur-xl border-t border-white/[0.08] p-6">
          <div className="grid grid-cols-4 gap-3">
            <div />
            {[
              { label: 'Get Started', variant: 'outline' as const },
              { label: 'Get Started', variant: 'default' as const },
              { label: 'Get Started', variant: 'outline' as const },
            ].map((btn, idx) => (
              <div key={idx} className="flex justify-center">
                <Button
                  variant={btn.variant}
                  className={
                    idx === 1
                      ? 'w-full bg-gradient-to-r from-[#d4a017] to-[#e8b923] text-black font-semibold hover:shadow-[0_0_20px_-3px_rgba(212,160,23,0.5)] transition-all duration-300'
                      : 'w-full border border-white/10 bg-white/[0.04] text-white hover:border-[#d4a017]/40 hover:bg-[#d4a017]/10 font-semibold transition-all duration-300'
                  }
                  size="sm"
                >
                  {btn.label}
                  <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
