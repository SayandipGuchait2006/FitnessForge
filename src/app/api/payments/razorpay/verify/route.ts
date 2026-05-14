import crypto from 'crypto'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { notifyAdmin } from '@/lib/notifications'

type VerifyBody = {
  razorpay_order_id?: string
  razorpay_payment_id?: string
  razorpay_signature?: string
  membershipId?: string
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as VerifyBody
    const orderId = body.razorpay_order_id?.trim()
    const paymentId = body.razorpay_payment_id?.trim()
    const signature = body.razorpay_signature?.trim()
    const membershipId = body.membershipId?.trim()

    if (!orderId || !paymentId || !signature || !membershipId) {
      return NextResponse.json({ error: 'Missing payment fields' }, { status: 400 })
    }

    const secret = process.env.RAZORPAY_KEY_SECRET?.trim()
    if (!secret) {
      return NextResponse.json({ error: 'Server misconfiguration' }, { status: 503 })
    }

    const expected = crypto
      .createHmac('sha256', secret)
      .update(`${orderId}|${paymentId}`)
      .digest('hex')

    if (expected !== signature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    const membership = await prisma.membership.findFirst({
      where: { id: membershipId, razorpayOrderId: orderId },
    })
    if (!membership) {
      return NextResponse.json({ error: 'Membership not found for this order' }, { status: 404 })
    }

    if (membership.status === 'ACTIVE') {
      return NextResponse.json({ success: true, membershipId: membership.id })
    }

    const paymentRow = await prisma.payment.findFirst({
      where: {
        membershipId: membership.id,
        orderId,
        gateway: 'RAZORPAY',
      },
      orderBy: { createdAt: 'desc' },
    })

    await prisma.$transaction(async (tx) => {
      if (paymentRow) {
        await tx.payment.update({
          where: { id: paymentRow.id },
          data: { status: 'SUCCEEDED', paymentId },
        })
      }
      await tx.membership.update({
        where: { id: membership.id },
        data: { status: 'ACTIVE' },
      })
    })

    await notifyAdmin({
      subject: `Payment received — ${membership.selectedPlan}`,
      text: [
        `Razorpay payment succeeded.`,
        `Plan: ${membership.selectedPlan}`,
        `Member: ${membership.name}`,
        `Email: ${membership.email}`,
        `Phone: ${membership.phone}`,
        `Order: ${orderId}`,
        `Payment: ${paymentId}`,
      ].join('\n'),
    })

    return NextResponse.json({ success: true, membershipId: membership.id })
  } catch (e) {
    console.error('[razorpay verify]', e)
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 })
  }
}
