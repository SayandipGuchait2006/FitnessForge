import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdminSession } from '@/lib/admin-session'
import type { Prisma } from '@prisma/client'

const MEMBERSHIP_STATUSES = [
  'AWAITING_PAYMENT',
  'ACTIVE',
  'PAYMENT_FAILED',
  'CANCELLED',
] as const

export async function GET(req: NextRequest) {
  const { response } = await requireAdminSession()
  if (response) return response

  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q')?.trim() ?? ''
  const statusParam = searchParams.get('status')?.trim() ?? ''

  const where: Prisma.MembershipWhereInput = {}

  if (q) {
    where.OR = [
      { name: { contains: q } },
      { email: { contains: q } },
      { phone: { contains: q } },
      { selectedPlan: { contains: q } },
    ]
  }

  if (
    statusParam &&
    MEMBERSHIP_STATUSES.includes(statusParam as (typeof MEMBERSHIP_STATUSES)[number])
  ) {
    where.status = statusParam as (typeof MEMBERSHIP_STATUSES)[number]
  }

  const rows = await prisma.membership.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    take: 200,
    include: {
      payments: {
        orderBy: { createdAt: 'desc' },
        take: 3,
      },
    },
  })

  return NextResponse.json({ rows })
}

export async function DELETE(req: NextRequest) {
  const { response } = await requireAdminSession()
  if (response) return response

  const id = new URL(req.url).searchParams.get('id')?.trim()
  if (!id) {
    return NextResponse.json({ error: 'id is required' }, { status: 400 })
  }

  await prisma.membership.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
