import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { AdminLoginForm } from '@/components/admin/admin-login-form'

export const metadata = {
  title: 'Admin Login — Avenger Gym',
  robots: { index: false, follow: false },
}

export default async function AdminLoginPage() {
  const session = await getServerSession(authOptions)
  if (session?.user?.role === 'admin') {
    redirect('/admin')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0a] px-4 py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(212,160,23,0.08),_transparent_50%)]" />
      <AdminLoginForm />
    </div>
  )
}
