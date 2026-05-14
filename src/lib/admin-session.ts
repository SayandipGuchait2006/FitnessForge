import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth'

export async function requireAdminSession() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email || session.user.role !== 'admin') {
    return {
      session: null,
      response: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
    }
  }
  return { session, response: null as NextResponse | null }
}
