'use client'

import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { LogOut, LayoutDashboard } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function AdminShell({
  email,
  children,
}: {
  email: string
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#0a0a0a]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#d4a017] to-[#e8b923] text-black">
              <LayoutDashboard className="h-5 w-5" aria-hidden />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold tracking-tight text-white">Admin</p>
              <p className="truncate text-xs text-neutral-500">{email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="outline"
              size="sm"
              className="border-white/10 bg-white/[0.03] text-neutral-200 hover:bg-white/[0.06]"
              asChild
            >
              <Link href="/">View site</Link>
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-red-500/30 text-red-400 hover:bg-red-500/10"
              onClick={() => signOut({ callbackUrl: '/admin/login' })}
            >
              <LogOut className="mr-1.5 h-4 w-4" aria-hidden />
              Sign out
            </Button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
    </div>
  )
}
