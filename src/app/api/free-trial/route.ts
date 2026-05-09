import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, date, time, goal } = body

    // Validate required fields
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      )
    }

    if (!email || typeof email !== 'string' || email.trim().length === 0) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    if (!date || typeof date !== 'string' || date.trim().length === 0) {
      return NextResponse.json(
        { error: 'Preferred date is required' },
        { status: 400 }
      )
    }

    if (!time || typeof time !== 'string' || time.trim().length === 0) {
      return NextResponse.json(
        { error: 'Preferred time is required' },
        { status: 400 }
      )
    }

    if (!goal || typeof goal !== 'string' || goal.trim().length === 0) {
      return NextResponse.json(
        { error: 'Fitness goal is required' },
        { status: 400 }
      )
    }

    const sanitizedData = {
      name: name.trim().slice(0, 100),
      email: email.trim().slice(0, 200),
      phone: phone ? String(phone).trim().slice(0, 20) : null,
      date: date.trim().slice(0, 50),
      time: time.trim().slice(0, 50),
      goal: goal.trim().slice(0, 100),
    }

    const trial = await db.freeTrial.create({
      data: sanitizedData,
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Your free trial has been booked! We will confirm your appointment soon.',
        id: trial.id,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Free trial booking error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Free Trial API is running' },
    { status: 200 }
  )
}
