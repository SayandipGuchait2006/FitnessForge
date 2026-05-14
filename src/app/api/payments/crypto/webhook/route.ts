import crypto from 'crypto'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { notifyAdmin } from '@/lib/notifications'

function sortObject(obj: Record<string, unknown>): Record<string, unknown> {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return obj
  return Object.keys(obj)
    .sort()
    .reduce<Record<string, unknown>>((acc, key) => {
      const val = obj[key]
      acc[key] =
        val && typeof val === 'object' && val !== null && !Array.isArray(val)
          ? sortObject(val as Record<string, unknown>)
          : val
      return acc
    }, {})
}

function verifyNowPaymentsSignature(
  payload: Record<string, unknown>,
  secret: string,
  signature: string
) {
  const sorted = JSON.stringify(sortObject(payload))
  const digest = crypto.createHmac('sha512', secret).update(sorted).digest('hex')
  return digest === signature
}

export async function POST(req: Request) {
  try {
    const ipnSecret = process.env.NOWPAYMENTS_IPN_SECRET?.trim()
    const sig = req.headers.get('x-nowpayments-sig')?.trim()

    const rawBody = await req.text()
    let payload: Record<string, unknown>
    try {
      payload = JSON.parse(rawBody) as Record<string, unknown>
    } catch {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }

    if (ipnSecret && sig) {
      const ok = verifyNowPaymentsSignature(payload, ipnSecret, sig)
      if (!ok) {
        return NextResponse.json({ error: 'Bad signature' }, { status: 401 })
      }
    } else if (process.env.NODE_ENV === 'production') {
      console.warn('[crypto webhook] Missing IPN secret or signature in production')
    }

    const orderId =
      typeof payload.order_id === 'string' ? payload.order_id : undefined
    const paymentStatus =
      typeof payload.payment_status === 'string'
        ? payload.payment_status
        : undefined

    if (!orderId) {
      return NextResponse.json({ ok: true })
    }

    const finished =
      paymentStatus === 'finished' ||
      paymentStatus === 'confirmed' ||
      paymentStatus === 'completed'

    if (!finished) {
      return NextResponse.json({ ok: true })
    }

    const membership = await prisma.membership.findUnique({
      where: { id: orderId },
    })
    if (!membership || membership.status === 'ACTIVE') {
      return NextResponse.json({ ok: true })
    }

    const paymentId =
      typeof payload.payment_id === 'string'
        ? payload.payment_id
        : typeof payload.id === 'string'
          ? payload.id
          : null

    const paymentRow = await prisma.payment.findFirst({
      where: {
        membershipId: membership.id,
        gateway: 'NOWPAYMENTS',
        status: 'CREATED',
      },
      orderBy: { createdAt: 'desc' },
    })

    await prisma.$transaction(async (tx) => {
      if (paymentRow) {
        await tx.payment.update({
          where: { id: paymentRow.id },
          data: {
            status: 'SUCCEEDED',
            ...(paymentId ? { paymentId } : {}),
          },
        })
      }
      await tx.membership.update({
        where: { id: membership.id },
        data: { status: 'ACTIVE' },
      })
    })

    await notifyAdmin({
      subject: `Crypto payment — ${membership.selectedPlan}`,
      text: [
        `NOWPayments reported success.`,
        `Plan: ${membership.selectedPlan}`,
        `Member: ${membership.name}`,
        `Email: ${membership.email}`,
        `Phone: ${membership.phone}`,
        `Payment status: ${paymentStatus ?? 'n/a'}`,
      ].join('\n'),
    })

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('[crypto webhook]', e)
    return NextResponse.json({ error: 'Webhook error' }, { status: 500 })
  }
}
