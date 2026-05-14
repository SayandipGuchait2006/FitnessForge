'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Calendar,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Dumbbell,
  CreditCard,
  Bitcoin,
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { getPlanAmountPaise, getPlanByCode } from '@/lib/plans'

interface MembershipModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedPlan?: string
}

const timeSlots = [
  '6:00 AM',
  '7:00 AM',
  '8:00 AM',
  '9:00 AM',
  '10:00 AM',
  '5:00 PM',
  '6:00 PM',
  '7:00 PM',
  '8:00 PM',
]

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(false)
      return
    }
    if ((window as unknown as { Razorpay?: unknown }).Razorpay) {
      resolve(true)
      return
    }
    const existing = document.querySelector(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
    )
    if (existing) {
      existing.addEventListener('load', () => resolve(true))
      existing.addEventListener('error', () => resolve(false))
      return
    }
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

type Step = 'form' | 'payment' | 'success' | 'error'

export function MembershipModal({
  open,
  onOpenChange,
  selectedPlan,
}: MembershipModalProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [date, setDate] = useState('')
  const [timeSlot, setTimeSlot] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [step, setStep] = useState<Step>('form')
  const [error, setError] = useState('')
  const [membershipId, setMembershipId] = useState<string | null>(null)
  const [payLoading, setPayLoading] = useState<'razorpay' | 'crypto' | null>(null)

  const planMeta = selectedPlan ? getPlanByCode(selectedPlan) : null
  const amountPaise = selectedPlan ? getPlanAmountPaise(selectedPlan) : null
  const priceLabel =
    amountPaise != null
      ? new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR',
          maximumFractionDigits: 0,
        }).format(amountPaise / 100)
      : ''

  const resetForm = useCallback(() => {
    setName('')
    setEmail('')
    setPhone('')
    setDate('')
    setTimeSlot('')
    setStep('form')
    setError('')
    setMembershipId(null)
    setIsSubmitting(false)
    setPayLoading(null)
  }, [])

  const handleClose = (isOpen: boolean) => {
    if (!isOpen) {
      resetForm()
    }
    onOpenChange(isOpen)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!selectedPlan?.trim()) {
      setError('Please select a membership plan first.')
      return
    }

    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError('Please fill in all required fields.')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.trim())) {
      setError('Please enter a valid email address.')
      return
    }

    const cleanedPhone = phone.replace(/\D/g, '')
    if (cleanedPhone.length < 10) {
      setError('Please enter a valid phone number (at least 10 digits).')
      return
    }

    setIsSubmitting(true)

    try {
      const res = await fetch('/api/membership', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          selectedPlan,
          name: name.trim(),
          email: email.trim(),
          phone: cleanedPhone,
          date: date || undefined,
          timeSlot: timeSlot || undefined,
        }),
      })

      const data = (await res.json()) as {
        success?: boolean
        error?: string
        membershipId?: string
      }

      if (res.ok && data.success && data.membershipId) {
        setMembershipId(data.membershipId)
        setStep('payment')
      } else {
        setError(data.error || 'Request failed. Please try again.')
      }
    } catch {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const startRazorpay = async () => {
    if (!membershipId) return
    setError('')
    setPayLoading('razorpay')
    try {
      const scriptOk = await loadRazorpayScript()
      if (!scriptOk) {
        setError('Could not load payment gateway. Please try again or use another method.')
        setPayLoading(null)
        return
      }

      const orderRes = await fetch('/api/payments/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ membershipId }),
      })
      const orderJson = (await orderRes.json()) as {
        error?: string
        orderId?: string
        amount?: number
        currency?: string
        keyId?: string
        prefill?: { name?: string; email?: string; contact?: string }
      }

      if (!orderRes.ok || !orderJson.orderId || !orderJson.keyId || !orderJson.amount) {
        setError(orderJson.error || 'Unable to start checkout.')
        setPayLoading(null)
        return
      }

      const Razorpay = (window as unknown as { Razorpay: new (opts: Record<string, unknown>) => { open: () => void } })
        .Razorpay

      const options: Record<string, unknown> = {
        key: orderJson.keyId,
        amount: orderJson.amount,
        currency: orderJson.currency || 'INR',
        order_id: orderJson.orderId,
        name: 'Avenger The Fitness Temple',
        description: `${selectedPlan ?? 'Membership'} — monthly`,
        prefill: orderJson.prefill ?? {
          name: name.trim(),
          email: email.trim(),
          contact: phone.replace(/\D/g, ''),
        },
        theme: { color: '#d4a017' },
        modal: {
          ondismiss: () => {
            setPayLoading(null)
          },
        },
        handler: async (response: {
          razorpay_payment_id: string
          razorpay_order_id: string
          razorpay_signature: string
        }) => {
          try {
            const verifyRes = await fetch('/api/payments/razorpay/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                ...response,
                membershipId,
              }),
            })
            const verifyJson = (await verifyRes.json()) as { error?: string }
            if (verifyRes.ok) {
              setStep('success')
            } else {
              setError(verifyJson.error || 'Payment verification failed.')
              setStep('error')
            }
          } catch {
            setError('Verification request failed.')
            setStep('error')
          } finally {
            setPayLoading(null)
          }
        },
      }

      const rz = new Razorpay(options)
      rz.open()
      setPayLoading(null)
    } catch {
      setError('Something went wrong starting Razorpay.')
      setPayLoading(null)
    }
  }

  const startCrypto = async () => {
    if (!membershipId) return
    setError('')
    setPayLoading('crypto')
    try {
      const res = await fetch('/api/payments/crypto/invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ membershipId }),
      })
      const data = (await res.json()) as { error?: string; url?: string }
      if (!res.ok || !data.url) {
        setError(data.error || 'Crypto checkout is unavailable.')
        setPayLoading(null)
        return
      }
      window.open(data.url, '_blank', 'noopener,noreferrer')
      setPayLoading(null)
    } catch {
      setError('Could not start crypto checkout.')
      setPayLoading(null)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className="max-h-[90vh] overflow-y-auto border-white/[0.08] bg-[#111111] p-0 text-white sm:max-w-md rounded-2xl overflow-hidden"
      >
        <div className="h-1 bg-gradient-to-r from-[#d4a017] to-[#e8b923]" />

        <AnimatePresence mode="wait">
          {step === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="px-6 pb-6 pt-4 text-center"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
                <CheckCircle2 className="h-8 w-8 text-emerald-400" aria-hidden />
              </div>

              <h3 className="text-xl font-bold text-white">Payment successful</h3>
              <DialogDescription className="sr-only">
                Your membership payment completed successfully.
              </DialogDescription>

              <p className="mt-2 text-sm text-neutral-400">
                Your{' '}
                <span className="font-semibold text-[#e8b923]">
                  {selectedPlan}
                </span>{' '}
                membership is now active. A confirmation has been sent to{' '}
                <span className="font-medium text-white">{email}</span>.
              </p>

              {timeSlot ? (
                <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/[0.04] px-3 py-1.5 text-xs text-neutral-300">
                  <Calendar className="h-3 w-3 text-[#e8b923]" aria-hidden />
                  {date ? <span>{date}</span> : null}
                  {date && timeSlot ? (
                    <span className="text-neutral-600">•</span>
                  ) : null}
                  <span>{timeSlot}</span>
                </div>
              ) : null}

              <Button
                onClick={() => handleClose(false)}
                className="mt-6 w-full bg-gradient-to-r from-[#d4a017] to-[#e8b923] font-semibold text-black hover:opacity-90"
              >
                Done
              </Button>
            </motion.div>
          ) : null}

          {step === 'error' ? (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="px-6 pb-6 pt-4 text-center"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
                <AlertCircle className="h-8 w-8 text-red-400" aria-hidden />
              </div>
              <h3 className="text-xl font-bold text-white">Payment issue</h3>
              <DialogDescription className="sr-only">
                There was a problem processing your payment.
              </DialogDescription>
              <p className="mt-2 text-sm text-red-400/90">{error}</p>
              <div className="mt-6 flex flex-col gap-2">
                <Button
                  onClick={() => {
                    setStep('payment')
                    setError('')
                  }}
                  className="w-full bg-gradient-to-r from-[#d4a017] to-[#e8b923] font-semibold text-black"
                >
                  Try again
                </Button>
                <Button variant="ghost" onClick={() => handleClose(false)}>
                  Close
                </Button>
              </div>
            </motion.div>
          ) : null}

          {step === 'payment' ? (
            <motion.div
              key="payment"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="px-6 pb-6 pt-5"
            >
              <DialogHeader className="pb-4 text-left">
                <DialogTitle className="flex items-center gap-2 text-lg font-bold text-white">
                  <CreditCard className="h-5 w-5 text-[#e8b923]" aria-hidden />
                  Complete payment
                </DialogTitle>
                <DialogDescription className="text-sm text-neutral-400">
                  Secure checkout — UPI, cards, net banking, and wallets via Razorpay.
                  Crypto uses a separate hosted flow (beta).
                </DialogDescription>
              </DialogHeader>

              {selectedPlan ? (
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <Badge className="border-0 bg-gradient-to-r from-[#d4a017] to-[#e8b923] px-3 py-1 text-xs font-semibold text-black">
                    {selectedPlan}
                  </Badge>
                  {priceLabel ? (
                    <span className="text-sm text-neutral-300">
                      Due today:{' '}
                      <span className="font-bold text-white">{priceLabel}</span>
                    </span>
                  ) : null}
                </div>
              ) : null}

              {error ? (
                <div
                  className="mb-4 flex items-center gap-2 rounded-lg bg-red-500/10 px-3 py-2 text-xs text-red-400"
                  role="alert"
                >
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden />
                  {error}
                </div>
              ) : null}

              <div className="flex flex-col gap-3">
                <Button
                  type="button"
                  onClick={() => void startRazorpay()}
                  disabled={payLoading !== null}
                  className="h-11 w-full bg-gradient-to-r from-[#d4a017] to-[#e8b923] font-semibold text-black hover:opacity-90"
                >
                  {payLoading === 'razorpay' ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />
                      Opening Razorpay…
                    </>
                  ) : (
                    'Pay with Razorpay'
                  )}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => void startCrypto()}
                  disabled={payLoading !== null}
                  className="h-11 border-white/15 bg-white/[0.03] text-[#e8b923] hover:bg-white/[0.06]"
                >
                  {payLoading === 'crypto' ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />
                      Preparing…
                    </>
                  ) : (
                    <>
                      <Bitcoin className="mr-2 h-4 w-4" aria-hidden />
                      Pay with Crypto (Beta)
                    </>
                  )}
                </Button>

                <p className="text-center text-[11px] leading-relaxed text-neutral-500">
                  Crypto opens a secure invoice in a new tab. Your membership activates
                  after the network confirms payment (usually a few minutes).
                </p>
              </div>
            </motion.div>
          ) : null}

          {step === 'form' ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <DialogHeader className="px-6 pt-5 pb-2">
                <DialogTitle className="flex items-center gap-2 text-lg font-bold text-white">
                  <Dumbbell className="h-5 w-5 text-[#e8b923]" aria-hidden />
                  Join membership
                </DialogTitle>

                <DialogDescription className="text-sm text-neutral-400">
                  Enter your details, then pay securely online.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4 px-6 pb-6">
                {selectedPlan && planMeta ? (
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className="border-0 bg-gradient-to-r from-[#d4a017] to-[#e8b923] px-3 py-1 text-xs font-semibold text-black">
                      {selectedPlan}
                    </Badge>
                    <span className="text-xs text-neutral-500">
                      Billed monthly · {priceLabel}
                    </span>
                  </div>
                ) : selectedPlan ? (
                  <p className="text-xs text-red-400">Unknown plan. Please pick a plan from pricing.</p>
                ) : null}

                <div className="space-y-1.5">
                  <Label htmlFor="mm-name" className="text-xs text-neutral-300">
                    Full name <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    id="mm-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    required
                    autoComplete="name"
                    className="h-10 border-white/[0.08] bg-white/[0.04] text-white placeholder:text-neutral-500 focus:border-[#d4a017]/50 focus:ring-[#d4a017]/20"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="mm-email" className="text-xs text-neutral-300">
                    Email <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    id="mm-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    autoComplete="email"
                    className="h-10 border-white/[0.08] bg-white/[0.04] text-white placeholder:text-neutral-500 focus:border-[#d4a017]/50 focus:ring-[#d4a017]/20"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="mm-phone" className="text-xs text-neutral-300">
                    Phone <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    id="mm-phone"
                    type="tel"
                    inputMode="numeric"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    required
                    autoComplete="tel"
                    className="h-10 border-white/[0.08] bg-white/[0.04] text-white placeholder:text-neutral-500 focus:border-[#d4a017]/50 focus:ring-[#d4a017]/20"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="mm-date" className="text-xs text-neutral-300">
                      Preferred date
                    </Label>
                    <Input
                      id="mm-date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="h-10 border-white/[0.08] bg-white/[0.04] text-white focus:border-[#d4a017]/50 focus:ring-[#d4a017]/20 [color-scheme:dark]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs text-neutral-300">Time slot</Label>
                    <Select value={timeSlot} onValueChange={setTimeSlot}>
                      <SelectTrigger className="h-10 w-full border-white/[0.08] bg-white/[0.04] text-white focus:ring-[#d4a017]/20">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent className="border-white/[0.08] bg-[#1a1a1a] text-white">
                        {timeSlots.map((slot) => (
                          <SelectItem
                            key={slot}
                            value={slot}
                            className="focus:bg-[#d4a017]/20 focus:text-white"
                          >
                            {slot}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {error ? (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 rounded-lg bg-red-500/10 px-3 py-2 text-xs text-red-400"
                    role="alert"
                  >
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden />
                    {error}
                  </motion.div>
                ) : null}

                <Button
                  type="submit"
                  disabled={isSubmitting || !selectedPlan}
                  className="h-11 w-full bg-gradient-to-r from-[#d4a017] to-[#e8b923] font-semibold text-black transition-opacity hover:opacity-90"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />
                      Saving…
                    </>
                  ) : (
                    'Continue to payment'
                  )}
                </Button>
              </form>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
