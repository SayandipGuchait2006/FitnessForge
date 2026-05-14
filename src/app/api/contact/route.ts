import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { notifyAdmin } from '@/lib/notifications'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, message } = body

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

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Sanitize inputs
    const sanitizedData = {
      name: name.trim().slice(0, 100),
      email: email.trim().slice(0, 200),
      phone: phone ? String(phone).trim().slice(0, 20) : null,
      message: message.trim().slice(0, 2000),
    }

    // Save to database
    const inquiry = await db.contactInquiry.create({
      data: sanitizedData,
    })

    await notifyAdmin({
      subject: 'New contact inquiry',
      text: [
        `From: ${sanitizedData.name}`,
        `Email: ${sanitizedData.email}`,
        sanitizedData.phone ? `Phone: ${sanitizedData.phone}` : '',
        '',
        sanitizedData.message,
      ]
        .filter(Boolean)
        .join('\n'),
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for your inquiry! We will get back to you soon.',
        id: inquiry.id,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Contact API is running' },
    { status: 200 }
  )
}
