import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getPlanAmountPaise } from '@/lib/plans'
import { notifyAdmin } from '@/lib/notifications'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const {
      selectedPlan,
      name,
      email,
      phone,
      date,
      timeSlot,
    } = body as {
      selectedPlan?: string
      name?: string
      email?: string
      phone?: string
      date?: string
      timeSlot?: string
    }

    if (!name || !email || !phone) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const planKey = typeof selectedPlan === 'string' ? selectedPlan.trim() : ''
    const amountPaise = getPlanAmountPaise(planKey)
    if (!amountPaise) {
      return NextResponse.json(
        { success: false, error: 'Invalid membership plan' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(String(email).trim())) {
      return NextResponse.json(
        { success: false, error: 'Invalid email address' },
        { status: 400 }
      )
    }

    const membership = await prisma.membership.create({
      data: {
        selectedPlan: planKey.toUpperCase(),
        name: String(name).trim().slice(0, 120),
        email: String(email).trim().toLowerCase().slice(0, 200),
        phone: String(phone).replace(/\D/g, '').slice(0, 20),
        date: date ? String(date).slice(0, 40) : undefined,
        timeSlot: timeSlot ? String(timeSlot).slice(0, 40) : undefined,
        status: 'AWAITING_PAYMENT',
        amountPaise,
        currency: 'INR',
      },
    })

    await notifyAdmin({
      subject: `New membership — ${membership.selectedPlan}`,
      text: [
        `Status: Awaiting payment`,
        `Plan: ${membership.selectedPlan}`,
        `Name: ${membership.name}`,
        `Email: ${membership.email}`,
        `Phone: ${membership.phone}`,
        membership.date ? `Preferred date: ${membership.date}` : '',
        membership.timeSlot ? `Time: ${membership.timeSlot}` : '',
        `Record ID: ${membership.id}`,
      ]
        .filter(Boolean)
        .join('\n'),
    })

    return NextResponse.json({
      success: true,
      membershipId: membership.id,
      membership,
    })
  } catch (error) {
    console.error('Membership API Error:', error)

    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
