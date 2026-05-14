import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdminSession } from '@/lib/admin-session'

export async function GET() {
  const { response } = await requireAdminSession()
  if (response) return response

  const [
    totalMemberships,
    freeTrials,
    contactInquiries,
    revenueAgg,
    activeMemberships,
  ] = await Promise.all([
    prisma.membership.count(),
    prisma.freeTrial.count(),
    prisma.contactInquiry.count(),
    prisma.payment.aggregate({
      where: { status: 'SUCCEEDED' },
      _sum: { amountPaise: true },
    }),
    prisma.membership.count({ where: { status: 'ACTIVE' } }),
  ])

  const revenuePaise = revenueAgg._sum.amountPaise ?? 0
  const revenueInr = revenuePaise / 100

  return NextResponse.json({
    totalMemberships,
    activeMemberships,
    freeTrials,
    contactInquiries,
    revenuePaise,
    revenueInr,
  })
}
