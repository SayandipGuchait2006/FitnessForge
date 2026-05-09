import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { className, name, email, phone, date, timeSlot } = await request.json()

    if (!className || !name || !email) {
      return NextResponse.json(
        { error: 'Required fields missing' },
        { status: 400 }
      )
    }

    // In production, this would save to DB and send confirmation email
    // For now, return success
    return NextResponse.json({
      success: true,
      message: `Your spot for ${className} has been booked! We'll send a confirmation to ${email}.`,
    })
  } catch (error) {
    console.error('Booking error:', error)
    return NextResponse.json(
      { error: 'Booking failed. Please try again.' },
      { status: 500 }
    )
  }
}
