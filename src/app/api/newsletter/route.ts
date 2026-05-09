import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    // Validate email
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

    const sanitizedEmail = email.trim().slice(0, 200)

    // Check for duplicate email
    const existing = await db.newsletter.findUnique({
      where: { email: sanitizedEmail },
    })

    if (existing) {
      return NextResponse.json(
        { error: 'This email is already subscribed! Welcome back.' },
        { status: 409 }
      )
    }

    // Store in database
    await db.newsletter.create({
      data: { email: sanitizedEmail },
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Welcome to the Avenger family! Check your inbox for a welcome surprise.',
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Newsletter API is running' },
    { status: 200 }
  )
}
