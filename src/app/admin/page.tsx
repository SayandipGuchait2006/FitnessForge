import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { AdminShell } from '@/components/admin/admin-shell'
import { AdminDashboardClient } from '@/components/admin/admin-dashboard-client'

export const metadata = {
  title: 'Admin Dashboard — Avenger Gym',
  robots: { index: false, follow: false },
}

export default async function AdminHomePage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email || session.user.role !== 'admin') {
    redirect('/admin/login')
  }

  return (
    <AdminShell email={session.user.email ?? ''}>
      <AdminDashboardClient />
    </AdminShell>
  )
}
