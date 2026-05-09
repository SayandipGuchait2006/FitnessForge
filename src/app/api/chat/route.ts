import { NextRequest, NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'

const SYSTEM_PROMPT = `You are a helpful AI assistant for Avenger The Fitness Temple, a premium gym in Koramangala, Bangalore. 

Key information about Avenger The Fitness Temple:
- Located at: 42 Fitness Avenue, Koramangala, Bangalore 560034
- Phone: +91 98765 43210
- Email: hello@forgefitness.in
- Hours: Mon-Sat 5:30 AM - 10:00 PM, Sunday 7:00 AM - 8:00 PM
- Membership Plans: Starter ₹1,499/month, Pro ₹2,999/month (most popular), Elite ₹4,999/month
- Current Offer: First month 20% off with code AVENGER20
- Classes: HIIT Inferno, PowerLift, Yoga Flow, Boxing Blitz, Spin Cyclone, CrossFit Forge
- Facilities: Olympic Weight Zone, Cardio Theater, Heated Pool, Recovery Spa, Juice Bar, PT Studios
- Trainers: 30+ expert trainers with 7-12+ years experience
- 5000+ active members, 15+ years in business
- Free trial available - visitors can book via the contact form or WhatsApp

Be friendly, professional, and concise. Help visitors with their queries about memberships, classes, timings, facilities, and pricing. If asked about something not related to the gym, politely redirect. Always encourage them to visit or book a free trial.`

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    const zai = await ZAI.create()

    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...(history || []).map((msg: { role: string; content: string }) => ({
        role: msg.role,
        content: msg.content,
      })),
      { role: 'user', content: message.slice(0, 1000) },
    ]

    const response = await zai.chat.completions.create({
      model: 'glm-4-flash',
      messages,
      temperature: 0.7,
      max_tokens: 300,
    })

    const reply =
      response.choices?.[0]?.message?.content ||
      'Sorry, I could not process your request. Please try again.'

    return NextResponse.json({ reply })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
