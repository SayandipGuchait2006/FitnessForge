import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdminSession } from '@/lib/admin-session'

export async function GET(req: NextRequest) {
  const { response } = await requireAdminSession()
  if (response) return response

  const q = new URL(req.url).searchParams.get('q')?.trim().toLowerCase() ?? ''

  const rows = await prisma.freeTrial.findMany({
    where: q
      ? {
          OR: [
            { name: { contains: q } },
            { email: { contains: q } },
            { phone: { contains: q } },
            { goal: { contains: q } },
          ],
        }
      : {},
    orderBy: { createdAt: 'desc' },
    take: 200,
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

  await prisma.freeTrial.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
