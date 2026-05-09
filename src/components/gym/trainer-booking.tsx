'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, User, Mail, Phone, FileText, CheckCircle2, Loader2 } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface TrainerBookingProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  preselectedTrainer?: string
}

const trainers = [
  { id: 'arjun', name: 'Arjun Mehta', specialty: 'Strength & Conditioning' },
  { id: 'priya', name: 'Priya Sharma', specialty: 'Yoga & Wellness' },
  { id: 'vikram', name: 'Vikram Singh', specialty: 'CrossFit & HIIT' },
  { id: 'ananya', name: 'Ananya Rao', specialty: 'Boxing & Cardio' },
]

const sessionTypes = [
  { id: 'personal', label: 'Personal Training', desc: 'One-on-one focused session' },
  { id: 'group', label: 'Group Training', desc: 'Small group (3-6 people)' },
  { id: 'assessment', label: 'Assessment', desc: 'Fitness evaluation & goal setting' },
]

const timeSlots = [
  { id: 'morning', label: 'Morning', time: '6:00 AM – 10:00 AM' },
  { id: 'afternoon', label: 'Afternoon', time: '12:00 PM – 4:00 PM' },
  { id: 'evening', label: 'Evening', time: '5:00 PM – 9:00 PM' },
]

type FormState = 'form' | 'loading' | 'success'

interface FormData {
  trainer: string
  sessionType: string
  date: string
  time: string
  name: string
  email: string
  phone: string
  notes: string
}

interface FormErrors {
  trainer?: string
  sessionType?: string
  date?: string
  time?: string
  name?: string
  email?: string
  phone?: string
}

function validateForm(data: FormData): FormErrors {
  const errors: FormErrors = {}
  if (!data.trainer) errors.trainer = 'Please select a trainer'
  if (!data.sessionType) errors.sessionType = 'Please select a session type'
  if (!data.date) errors.date = 'Please select a date'
  if (!data.time) errors.time = 'Please select a time slot'
  if (!data.name.trim()) errors.name = 'Name is required'
  if (!data.email.trim()) errors.email = 'Email is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Invalid email address'
  if (!data.phone.trim()) errors.phone = 'Phone number is required'
  return errors
}

export function TrainerBooking({ open, onOpenChange, preselectedTrainer }: TrainerBookingProps) {
  const [formState, setFormState] = useState<FormState>('form')
  const [formData, setFormData] = useState<FormData>({
    trainer: preselectedTrainer || '',
    sessionType: '',
    date: '',
    time: '',
    name: '',
    email: '',
    phone: '',
    notes: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = async () => {
    const validationErrors = validateForm(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setFormState('loading')

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    setFormState('success')
  }

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      // Reset form when closing
      setTimeout(() => {
        setFormState('form')
        setFormData({
          trainer: preselectedTrainer || '',
          sessionType: '',
          date: '',
          time: '',
          name: '',
          email: '',
          phone: '',
          notes: '',
        })
        setErrors({})
      }, 200)
    }
    onOpenChange(newOpen)
  }

  // Get today's date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split('T')[0]

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-[#111111]/95 backdrop-blur-xl border border-white/[0.08] text-white max-w-lg p-0 gap-0 overflow-hidden max-h-[90vh]">
        <AnimatePresence mode="wait">
          {formState === 'form' && (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {/* Header with gradient accent */}
              <div className="relative p-6 pb-4 border-b border-white/[0.06]">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#d4a017] via-[#e8b923] to-[#d4a017]" />
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold text-white flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-[#d4a017]" />
                    Book a Session
                  </DialogTitle>
                  <DialogDescription className="text-sm text-gray-400">
                    Schedule a training session with one of our expert trainers.
                  </DialogDescription>
                </DialogHeader>
              </div>

              {/* Scrollable form */}
              <div className="p-6 space-y-5 overflow-y-auto max-h-[65vh]">
                {/* Trainer Selection */}
                <div className="space-y-2">
                  <Label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Trainer <span className="text-[#d4a017]">*</span>
                  </Label>
                  <Select
                    value={formData.trainer}
                    onValueChange={(val) => handleChange('trainer', val)}
                  >
                    <SelectTrigger className={`w-full bg-[#1a1a1a]/80 border-white/[0.08] text-white ${errors.trainer ? 'border-red-500/50' : ''}`}>
                      <SelectValue placeholder="Select a trainer" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a1a1a] border-white/[0.08]">
                      {trainers.map((t) => (
                        <SelectItem key={t.id} value={t.id} className="text-white focus:bg-[#d4a017]/10 focus:text-white">
                          <div>
                            <span className="font-medium">{t.name}</span>
                            <span className="text-gray-500 text-xs ml-2">{t.specialty}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.trainer && <p className="text-xs text-red-400">{errors.trainer}</p>}
                </div>

                {/* Session Type */}
                <div className="space-y-2">
                  <Label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Session Type <span className="text-[#d4a017]">*</span>
                  </Label>
                  <RadioGroup
                    value={formData.sessionType}
                    onValueChange={(val) => handleChange('sessionType', val)}
                    className="grid grid-cols-1 gap-2"
                  >
                    {sessionTypes.map((type) => (
                      <label
                        key={type.id}
                        className={`flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition-all duration-200
                          ${formData.sessionType === type.id
                            ? 'border-[#d4a017]/50 bg-[#d4a017]/10'
                            : 'border-white/[0.06] bg-[#1a1a1a]/40 hover:border-white/[0.12]'
                          }`}
                      >
                        <RadioGroupItem
                          value={type.id}
                          className="border-[#d4a017]/50 text-[#d4a017]"
                        />
                        <div>
                          <span className="text-sm font-medium text-white">{type.label}</span>
                          <p className="text-[11px] text-gray-500">{type.desc}</p>
                        </div>
                      </label>
                    ))}
                  </RadioGroup>
                  {errors.sessionType && <p className="text-xs text-red-400">{errors.sessionType}</p>}
                </div>

                {/* Date and Time Row */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Date <span className="text-[#d4a017]">*</span>
                    </Label>
                    <Input
                      type="date"
                      min={today}
                      value={formData.date}
                      onChange={(e) => handleChange('date', e.target.value)}
                      className={`bg-[#1a1a1a]/80 border-white/[0.08] text-white ${errors.date ? 'border-red-500/50' : ''}`}
                    />
                    {errors.date && <p className="text-xs text-red-400">{errors.date}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Time <span className="text-[#d4a017]">*</span>
                    </Label>
                    <Select
                      value={formData.time}
                      onValueChange={(val) => handleChange('time', val)}
                    >
                      <SelectTrigger className={`w-full bg-[#1a1a1a]/80 border-white/[0.08] text-white ${errors.time ? 'border-red-500/50' : ''}`}>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1a1a1a] border-white/[0.08]">
                        {timeSlots.map((slot) => (
                          <SelectItem key={slot.id} value={slot.id} className="text-white focus:bg-[#d4a017]/10 focus:text-white">
                            <div>
                              <span className="font-medium">{slot.label}</span>
                              <span className="text-gray-500 text-xs ml-1">{slot.time}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.time && <p className="text-xs text-red-400">{errors.time}</p>}
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-3">
                  <Label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Your Information
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <Input
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className={`pl-10 bg-[#1a1a1a]/80 border-white/[0.08] text-white placeholder:text-gray-600 ${errors.name ? 'border-red-500/50' : ''}`}
                    />
                  </div>
                  {errors.name && <p className="text-xs text-red-400 -mt-1">{errors.name}</p>}

                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <Input
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className={`pl-10 bg-[#1a1a1a]/80 border-white/[0.08] text-white placeholder:text-gray-600 ${errors.email ? 'border-red-500/50' : ''}`}
                    />
                  </div>
                  {errors.email && <p className="text-xs text-red-400 -mt-1">{errors.email}</p>}

                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <Input
                      type="tel"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      className={`pl-10 bg-[#1a1a1a]/80 border-white/[0.08] text-white placeholder:text-gray-600 ${errors.phone ? 'border-red-500/50' : ''}`}
                    />
                  </div>
                  {errors.phone && <p className="text-xs text-red-400 -mt-1">{errors.phone}</p>}
                </div>

                {/* Special Notes */}
                <div className="space-y-2">
                  <Label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Special Notes
                  </Label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                    <Textarea
                      placeholder="Any injuries, goals, or preferences..."
                      value={formData.notes}
                      onChange={(e) => handleChange('notes', e.target.value)}
                      className="pl-10 bg-[#1a1a1a]/80 border-white/[0.08] text-white placeholder:text-gray-600 min-h-[80px] resize-none"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-[#d4a017] to-[#e8b923] text-black font-bold py-6 text-base hover:shadow-[0_0_25px_-3px_rgba(212,160,23,0.5)] transition-all duration-300"
                >
                  <Clock className="mr-2 h-4 w-4" />
                  Request Booking
                </Button>
              </div>
            </motion.div>
          )}

          {formState === 'loading' && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-12 flex flex-col items-center justify-center min-h-[300px]"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >
                <Loader2 className="w-10 h-10 text-[#d4a017]" />
              </motion.div>
              <p className="mt-4 text-gray-400 text-sm">Submitting your booking request...</p>
            </motion.div>
          )}

          {formState === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="p-12 flex flex-col items-center justify-center min-h-[300px] text-center"
            >
              {/* Animated Checkmark */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 15,
                  delay: 0.1,
                }}
                className="w-20 h-20 rounded-full bg-gradient-to-br from-[#d4a017] to-[#e8b923] flex items-center justify-center mb-6 shadow-[0_0_40px_-5px_rgba(212,160,23,0.4)]"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                >
                  <CheckCircle2 className="w-10 h-10 text-black" />
                </motion.div>
              </motion.div>

              <h3 className="text-xl font-bold text-white mb-2">Booking Requested!</h3>
              <p className="text-gray-400 text-sm max-w-xs mb-6">
                We&apos;ll confirm your session with{' '}
                <span className="text-[#d4a017] font-medium">
                  {trainers.find(t => t.id === formData.trainer)?.name || 'your trainer'}
                </span>{' '}
                within 24 hours via email.
              </p>

              <div className="rounded-xl border border-white/[0.08] bg-[#1a1a1a]/60 p-4 w-full max-w-xs mb-6">
                <div className="text-xs text-gray-500 space-y-1">
                  <div className="flex justify-between">
                    <span>Date</span>
                    <span className="text-white">{formData.date || 'TBD'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time</span>
                    <span className="text-white">
                      {timeSlots.find(s => s.id === formData.time)?.label || 'TBD'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Session</span>
                    <span className="text-white capitalize">{formData.sessionType || 'TBD'}</span>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => handleOpenChange(false)}
                variant="outline"
                className="border-white/[0.08] bg-transparent text-white hover:bg-white/10 hover:text-[#d4a017]"
              >
                Close
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
