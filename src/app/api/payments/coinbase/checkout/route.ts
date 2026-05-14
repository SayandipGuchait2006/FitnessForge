import { NextResponse } from 'next/server'

/**
 * Placeholder for Coinbase Commerce. Crypto checkout is implemented via
 * NOWPayments (`/api/payments/crypto/invoice`) to keep flows separate from Razorpay.
 */
export async function POST() {
  return NextResponse.json(
    {
      error:
        'Coinbase Commerce is not enabled in this deployment. Use “Pay with Crypto (Beta)” (NOWPayments) or Razorpay.',
    },
    { status: 501 }
  )
}
