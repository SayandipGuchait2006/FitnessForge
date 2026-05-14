'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Loader2, Lock, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function AdminLoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await signIn('credentials', {
        redirect: false,
        email: email.trim().toLowerCase(),
        password,
        callbackUrl: `${window.location.origin}/admin`,
      })
      if (res?.error) {
        const hint =
          res.error === 'Configuration'
            ? ' Server configuration error (check NEXTAUTH_SECRET and NEXTAUTH_URL).'
            : ''
        setError(
          `Sign-in failed (${res.error}). Check email/password.${hint} Use the same URL as NEXTAUTH_URL (e.g. localhost vs 127.0.0.1).`
        )
        setLoading(false)
        return
      }
      if (res?.ok === false) {
        setError('Sign-in was rejected. Check email and password.')
        setLoading(false)
        return
      }
      router.push('/admin')
      router.refresh()
    } catch {
      setError('Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md rounded-2xl border border-white/[0.08] bg-[#111111] p-8 shadow-[0_0_60px_-20px_rgba(212,160,23,0.25)]"
    >
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#d4a017] to-[#e8b923] text-black">
          <Shield className="h-6 w-6" aria-hidden />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">Admin access</h1>
          <p className="text-sm text-neutral-500">Avenger Gym control center</p>
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="admin-email" className="text-neutral-300">
            Email
          </Label>
          <Input
            id="admin-email"
            name="email"
            type="text"
            inputMode="email"
            autoComplete="username"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11 border-white/[0.08] bg-white/[0.04] text-white placeholder:text-neutral-600"
            placeholder="admin@yourdomain.com"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="admin-password" className="text-neutral-300">
            Password
          </Label>
          <Input
            id="admin-password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-11 border-white/[0.08] bg-white/[0.04] text-white placeholder:text-neutral-600"
            placeholder="••••••••"
          />
        </div>

        {error ? (
          <p className="text-sm text-red-400" role="alert">
            {error}
          </p>
        ) : null}

        <Button
          type="submit"
          disabled={loading}
          className="h-11 w-full bg-gradient-to-r from-[#d4a017] to-[#e8b923] font-semibold text-black hover:opacity-95"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />
              Signing in…
            </>
          ) : (
            <>
              <Lock className="mr-2 h-4 w-4" aria-hidden />
              Sign in
            </>
          )}
        </Button>
      </form>
    </motion.div>
  )
}
