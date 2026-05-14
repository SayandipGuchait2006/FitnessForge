import { NextResponse } from 'next/server'
import Razorpay from 'razorpay'
import { prisma } from '@/lib/prisma'
import { getPlanAmountPaise } from '@/lib/plans'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const membershipId =
      typeof body.membershipId === 'string' ? body.membershipId.trim() : ''
    if (!membershipId) {
      return NextResponse.json({ error: 'membershipId is required' }, { status: 400 })
    }

    const membership = await prisma.membership.findUnique({
      where: { id: membershipId },
    })
    if (!membership) {
      return NextResponse.json({ error: 'Membership not found' }, { status: 404 })
    }
    if (membership.status === 'ACTIVE') {
      return NextResponse.json({ error: 'Membership is already active' }, { status: 400 })
    }

    const amountPaise =
      membership.amountPaise ?? getPlanAmountPaise(membership.selectedPlan)
    if (!amountPaise || amountPaise < 100) {
      return NextResponse.json({ error: 'Invalid plan or amount' }, { status: 400 })
    }

    const keyId = process.env.RAZORPAY_KEY_ID?.trim()
    const keySecret = process.env.RAZORPAY_KEY_SECRET?.trim()
    if (!keyId || !keySecret) {
      return NextResponse.json(
        { error: 'Razorpay is not configured on the server' },
        { status: 503 }
      )
    }

    const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret })
    const receipt = `m_${membership.id.replace(/[^a-zA-Z0-9]/g, '').slice(0, 20)}`
    const order = await razorpay.orders.create({
      amount: amountPaise,
      currency: membership.currency || 'INR',
      receipt,
      notes: {
        membershipId: membership.id,
        plan: membership.selectedPlan,
      },
    })

    await prisma.membership.update({
      where: { id: membership.id },
      data: {
        razorpayOrderId: order.id,
        amountPaise,
      },
    })

    await prisma.payment.create({
      data: {
        membershipId: membership.id,
        gateway: 'RAZORPAY',
        status: 'CREATED',
        orderId: order.id,
        amountPaise,
        currency: membership.currency || 'INR',
      },
    })

    return NextResponse.json({
      orderId: order.id,
      amount: amountPaise,
      currency: membership.currency || 'INR',
      keyId,
      membershipId: membership.id,
      prefill: {
        name: membership.name,
        email: membership.email,
        contact: membership.phone,
      },
    })
  } catch (e) {
    console.error('[razorpay create-order]', e)
    return NextResponse.json({ error: 'Could not create payment order' }, { status: 500 })
  }
}
