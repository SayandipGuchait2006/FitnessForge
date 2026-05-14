import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getPlanAmountPaise } from '@/lib/plans'

export async function POST(req: Request) {
  try {
    const apiKey = process.env.NOWPAYMENTS_API_KEY?.trim()
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Crypto checkout is not configured' },
        { status: 503 }
      )
    }

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

    const base =
      process.env.NEXT_PUBLIC_APP_URL?.trim() ||
      process.env.NEXTAUTH_URL?.trim() ||
      'http://localhost:3000'
    const ipn = `${base.replace(/\/$/, '')}/api/payments/crypto/webhook`

    const priceAmount = amountPaise / 100

    const res = await fetch('https://api.nowpayments.io/v1/invoice', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        price_amount: priceAmount,
        price_currency: 'inr',
        order_id: membership.id,
        order_description: `Avenger Gym — ${membership.selectedPlan}`,
        ipn_callback_url: ipn,
        success_url: `${base.replace(/\/$/, '')}/?crypto=success`,
        cancel_url: `${base.replace(/\/$/, '')}/?crypto=cancel`,
      }),
    })

    const raw = await res.text()
    if (!res.ok) {
      console.error('[NOWPayments invoice]', res.status, raw)
      return NextResponse.json(
        { error: 'Could not create crypto invoice' },
        { status: 502 }
      )
    }

    const data = JSON.parse(raw) as { id?: string; invoice_url?: string }

    await prisma.membership.update({
      where: { id: membership.id },
      data: {
        cryptoInvoiceId: data.id ?? undefined,
        cryptoPayUrl: data.invoice_url ?? undefined,
        amountPaise,
      },
    })

    await prisma.payment.create({
      data: {
        membershipId: membership.id,
        gateway: 'NOWPAYMENTS',
        status: 'CREATED',
        orderId: data.id ?? null,
        amountPaise,
        currency: 'INR',
      },
    })

    return NextResponse.json({
      url: data.invoice_url,
      invoiceId: data.id,
    })
  } catch (e) {
    console.error('[crypto invoice]', e)
    return NextResponse.json({ error: 'Invoice failed' }, { status: 500 })
  }
}
