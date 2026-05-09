'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, CheckCircle2, AlertCircle, Loader2, Dumbbell } from 'lucide-react'
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

interface BookClassModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  className?: string
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

export function BookClassModal({ open, onOpenChange, className }: BookClassModalProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [date, setDate] = useState('')
  const [timeSlot, setTimeSlot] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const resetForm = () => {
    setName('')
    setEmail('')
    setPhone('')
    setDate('')
    setTimeSlot('')
    setSuccess(false)
    setError('')
    setIsSubmitting(false)
  }

  const handleClose = (isOpen: boolean) => {
    if (!isOpen) {
      resetForm()
    }
    onOpenChange(isOpen)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!name.trim() || !email.trim()) {
      setError('Please fill in all required fields.')
      return
    }

    setIsSubmitting(true)

    try {
      const res = await fetch('/api/book-class', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          className,
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          date: date || undefined,
          timeSlot: timeSlot || undefined,
        }),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        setSuccess(true)
      } else {
        setError(data.error || 'Booking failed. Please try again.')
      }
    } catch {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-[#111111] border-white/[0.08] text-white sm:max-w-md rounded-2xl p-0 overflow-hidden">
        {/* Amber accent top bar */}
        <div className="h-1 bg-gradient-to-r from-[#d4a017] to-[#e8b923]" />

        <AnimatePresence mode="wait">
          {success ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="px-6 pb-6 pt-4 text-center"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
                <CheckCircle2 className="h-8 w-8 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Booking Confirmed!</h3>
              <p className="mt-2 text-sm text-neutral-400">
                Your spot for <span className="text-[#e8b923] font-semibold">{className}</span> has
                been reserved. We&apos;ll send a confirmation to{' '}
                <span className="text-white font-medium">{email}</span>.
              </p>
              {timeSlot && (
                <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/[0.04] px-3 py-1.5 text-xs text-neutral-300">
                  <Calendar className="h-3 w-3 text-[#e8b923]" />
                  {date && <span>{date}</span>}
                  {date && timeSlot && <span className="text-neutral-600">•</span>}
                  <span>{timeSlot}</span>
                </div>
              )}
              <Button
                onClick={() => handleClose(false)}
                className="mt-6 w-full bg-gradient-to-r from-[#d4a017] to-[#e8b923] text-black font-semibold hover:opacity-90"
              >
                Done
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <DialogHeader className="px-6 pt-5 pb-2">
                <DialogTitle className="text-lg font-bold text-white flex items-center gap-2">
                  <Dumbbell className="h-5 w-5 text-[#e8b923]" />
                  Book a Class
                </DialogTitle>
                <DialogDescription className="text-sm text-neutral-400">
                  Reserve your spot in an upcoming session.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-4">
                {/* Class Name Badge */}
                {className && (
                  <div className="flex items-center gap-2">
                    <Badge className="bg-gradient-to-r from-[#d4a017] to-[#e8b923] text-black font-semibold text-xs px-3 py-1 border-0">
                      {className}
                    </Badge>
                  </div>
                )}

                {/* Name */}
                <div className="space-y-1.5">
                  <Label className="text-neutral-300 text-xs">
                    Full Name <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    required
                    className="bg-white/[0.04] border-white/[0.08] text-white placeholder:text-neutral-500 focus:border-[#d4a017]/50 focus:ring-[#d4a017]/20 h-10"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <Label className="text-neutral-300 text-xs">
                    Email <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="bg-white/[0.04] border-white/[0.08] text-white placeholder:text-neutral-500 focus:border-[#d4a017]/50 focus:ring-[#d4a017]/20 h-10"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <Label className="text-neutral-300 text-xs">Phone</Label>
                  <Input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="bg-white/[0.04] border-white/[0.08] text-white placeholder:text-neutral-500 focus:border-[#d4a017]/50 focus:ring-[#d4a017]/20 h-10"
                  />
                </div>

                {/* Date and Time Row */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Preferred Date */}
                  <div className="space-y-1.5">
                    <Label className="text-neutral-300 text-xs">Preferred Date</Label>
                    <Input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="bg-white/[0.04] border-white/[0.08] text-white placeholder:text-neutral-500 focus:border-[#d4a017]/50 focus:ring-[#d4a017]/20 h-10 [color-scheme:dark]"
                    />
                  </div>

                  {/* Time Slot */}
                  <div className="space-y-1.5">
                    <Label className="text-neutral-300 text-xs">Time Slot</Label>
                    <Select value={timeSlot} onValueChange={setTimeSlot}>
                      <SelectTrigger className="bg-white/[0.04] border-white/[0.08] text-white h-10 w-full focus:ring-[#d4a017]/20">
                        <SelectValue placeholder="Select" className="text-neutral-500" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1a1a1a] border-white/[0.08] text-white">
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

                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 rounded-lg bg-red-500/10 px-3 py-2 text-xs text-red-400"
                  >
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    {error}
                  </motion.div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#d4a017] to-[#e8b923] text-black font-semibold hover:opacity-90 transition-opacity h-11"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Booking...
                    </>
                  ) : (
                    'Confirm Booking'
                  )}
                </Button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
