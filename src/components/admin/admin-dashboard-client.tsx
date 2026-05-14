'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { format } from 'date-fns'
import {
  CreditCard,
  Loader2,
  Mail,
  Search,
  Trash2,
  Users,
  MessageSquare,
  Sparkles,
  RefreshCw,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'

type Stats = {
  totalMemberships: number
  activeMemberships: number
  freeTrials: number
  contactInquiries: number
  revenueInr: number
}

type MembershipRow = {
  id: string
  selectedPlan: string
  name: string
  email: string
  phone: string
  status: string
  createdAt: string
  amountPaise: number | null
}

type TrialRow = {
  id: string
  name: string
  email: string
  phone: string | null
  date: string
  time: string
  goal: string
  createdAt: string
}

type ContactRow = {
  id: string
  name: string
  email: string
  phone: string | null
  message: string
  createdAt: string
}

export function AdminDashboardClient() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [memberships, setMemberships] = useState<MembershipRow[]>([])
  const [trials, setTrials] = useState<TrialRow[]>([])
  const [contacts, setContacts] = useState<ContactRow[]>([])
  const [refreshing, setRefreshing] = useState(false)
  const [mQ, setMQ] = useState('')
  const [mStatus, setMStatus] = useState<string>('all')
  const [tQ, setTQ] = useState('')
  const [cQ, setCQ] = useState('')
  const [deleteTarget, setDeleteTarget] = useState<{
    type: 'membership' | 'trial' | 'contact'
    id: string
  } | null>(null)
  const [deleting, setDeleting] = useState(false)

  const loadStats = useCallback(async () => {
    const res = await fetch('/api/admin/stats')
    if (!res.ok) return
    const data = (await res.json()) as Stats
    setStats(data)
  }, [])

  const loadMemberships = useCallback(async () => {
    const params = new URLSearchParams()
    if (mQ.trim()) params.set('q', mQ.trim())
    if (mStatus !== 'all') params.set('status', mStatus)
    const res = await fetch(`/api/admin/memberships?${params}`)
    if (!res.ok) return
    const data = (await res.json()) as { rows: MembershipRow[] }
    setMemberships(data.rows)
  }, [mQ, mStatus])

  const loadTrials = useCallback(async () => {
    const params = new URLSearchParams()
    if (tQ.trim()) params.set('q', tQ.trim())
    const res = await fetch(`/api/admin/free-trials?${params}`)
    if (!res.ok) return
    const data = (await res.json()) as { rows: TrialRow[] }
    setTrials(data.rows)
  }, [tQ])

  const loadContacts = useCallback(async () => {
    const params = new URLSearchParams()
    if (cQ.trim()) params.set('q', cQ.trim())
    const res = await fetch(`/api/admin/contacts?${params}`)
    if (!res.ok) return
    const data = (await res.json()) as { rows: ContactRow[] }
    setContacts(data.rows)
  }, [cQ])

  useEffect(() => {
    void loadStats()
  }, [loadStats])

  useEffect(() => {
    const t = setTimeout(() => {
      void loadMemberships()
    }, 280)
    return () => clearTimeout(t)
  }, [loadMemberships])

  useEffect(() => {
    const t = setTimeout(() => {
      void loadTrials()
    }, 280)
    return () => clearTimeout(t)
  }, [loadTrials])

  useEffect(() => {
    const t = setTimeout(() => {
      void loadContacts()
    }, 280)
    return () => clearTimeout(t)
  }, [loadContacts])

  async function confirmDelete() {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      const path =
        deleteTarget.type === 'membership'
          ? `/api/admin/memberships?id=${deleteTarget.id}`
          : deleteTarget.type === 'trial'
            ? `/api/admin/free-trials?id=${deleteTarget.id}`
            : `/api/admin/contacts?id=${deleteTarget.id}`
      const res = await fetch(path, { method: 'DELETE' })
      if (res.ok) {
        await loadStats()
        await Promise.all([loadMemberships(), loadTrials(), loadContacts()])
      }
    } finally {
      setDeleting(false)
      setDeleteTarget(null)
    }
  }

  const revenueDisplay = useMemo(() => {
    if (!stats) return '—'
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(stats.revenueInr)
  }, [stats])

  function statusBadge(status: string) {
    const map: Record<string, string> = {
      ACTIVE: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
      AWAITING_PAYMENT:
        'bg-amber-500/15 text-amber-300 border-amber-500/30',
      PAYMENT_FAILED: 'bg-red-500/15 text-red-400 border-red-500/30',
      CANCELLED: 'bg-neutral-500/15 text-neutral-400 border-neutral-500/30',
    }
    return map[status] ?? 'bg-white/10 text-neutral-300 border-white/20'
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            Memberships, trials, messages, and revenue at a glance.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="border-white/10 bg-white/[0.03] text-neutral-200"
          onClick={() => {
            setRefreshing(true)
            void Promise.all([
              loadStats(),
              loadMemberships(),
              loadTrials(),
              loadContacts(),
            ]).finally(() => setRefreshing(false))
          }}
          disabled={refreshing}
        >
          {refreshing ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          ) : (
            <RefreshCw className="h-4 w-4" aria-hidden />
          )}
          <span className="ml-2">Refresh</span>
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="border-white/[0.08] bg-[#111111]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-neutral-400">
              Total memberships
            </CardTitle>
            <Users className="h-4 w-4 text-[#e8b923]" aria-hidden />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-white">
              {stats?.totalMemberships ?? '—'}
            </p>
            <p className="mt-1 text-xs text-neutral-500">
              Active: {stats?.activeMemberships ?? '—'}
            </p>
          </CardContent>
        </Card>
        <Card className="border-white/[0.08] bg-[#111111]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-neutral-400">
              Free trials
            </CardTitle>
            <Sparkles className="h-4 w-4 text-[#e8b923]" aria-hidden />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-white">
              {stats?.freeTrials ?? '—'}
            </p>
          </CardContent>
        </Card>
        <Card className="border-white/[0.08] bg-[#111111]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-neutral-400">
              Contact inquiries
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-[#e8b923]" aria-hidden />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-white">
              {stats?.contactInquiries ?? '—'}
            </p>
          </CardContent>
        </Card>
        <Card className="border-white/[0.08] bg-[#111111]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-neutral-400">
              Revenue
            </CardTitle>
            <CreditCard className="h-4 w-4 text-[#e8b923]" aria-hidden />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-white tabular-nums">
              {revenueDisplay}
            </p>
            <p className="mt-1 text-xs text-neutral-500">Successful payments</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="memberships" className="w-full">
        <TabsList className="grid w-full max-w-xl grid-cols-3 border border-white/[0.08] bg-[#111111] p-1">
          <TabsTrigger
            value="memberships"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#d4a017] data-[state=active]:to-[#e8b923] data-[state=active]:text-black"
          >
            Memberships
          </TabsTrigger>
          <TabsTrigger
            value="trials"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#d4a017] data-[state=active]:to-[#e8b923] data-[state=active]:text-black"
          >
            Free trials
          </TabsTrigger>
          <TabsTrigger
            value="contacts"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#d4a017] data-[state=active]:to-[#e8b923] data-[state=active]:text-black"
          >
            Messages
          </TabsTrigger>
        </TabsList>

        <TabsContent value="memberships" className="mt-6 space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
              <Input
                value={mQ}
                onChange={(e) => setMQ(e.target.value)}
                placeholder="Search name, email, phone, plan…"
                className="border-white/[0.08] bg-white/[0.04] pl-9 text-white placeholder:text-neutral-600"
                aria-label="Search memberships"
              />
            </div>
            <Select value={mStatus} onValueChange={setMStatus}>
              <SelectTrigger className="w-full border-white/[0.08] bg-white/[0.04] text-white sm:w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="border-white/[0.08] bg-[#1a1a1a] text-white">
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="AWAITING_PAYMENT">Awaiting payment</SelectItem>
                <SelectItem value="ACTIVE">Active</SelectItem>
                <SelectItem value="PAYMENT_FAILED">Payment failed</SelectItem>
                <SelectItem value="CANCELLED">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-x-auto rounded-xl border border-white/[0.08] bg-[#111111]">
            <Table>
              <TableHeader>
                <TableRow className="border-white/[0.06] hover:bg-transparent">
                  <TableHead className="text-neutral-400">Plan</TableHead>
                  <TableHead className="text-neutral-400">Member</TableHead>
                  <TableHead className="text-neutral-400">Status</TableHead>
                  <TableHead className="text-neutral-400">Created</TableHead>
                  <TableHead className="text-right text-neutral-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {memberships.map((m) => (
                  <TableRow key={m.id} className="border-white/[0.06]">
                    <TableCell className="font-medium text-white">
                      {m.selectedPlan}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-white">{m.name}</span>
                        <span className="text-xs text-neutral-500">{m.email}</span>
                        <span className="text-xs text-neutral-500">{m.phone}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`border ${statusBadge(m.status)}`}
                      >
                        {m.status.replace(/_/g, ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-neutral-400 text-sm">
                      {format(new Date(m.createdAt), 'dd MMM yyyy HH:mm')}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        className="text-red-400 hover:bg-red-500/10 hover:text-red-300"
                        aria-label={`Delete membership for ${m.name}`}
                        onClick={() =>
                          setDeleteTarget({ type: 'membership', id: m.id })
                        }
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {memberships.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="py-10 text-center text-neutral-500"
                    >
                      No membership records match your filters.
                    </TableCell>
                  </TableRow>
                ) : null}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="trials" className="mt-6 space-y-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
            <Input
              value={tQ}
              onChange={(e) => setTQ(e.target.value)}
              placeholder="Search trials…"
              className="border-white/[0.08] bg-white/[0.04] pl-9 text-white placeholder:text-neutral-600"
              aria-label="Search free trials"
            />
          </div>
          <div className="overflow-x-auto rounded-xl border border-white/[0.08] bg-[#111111]">
            <Table>
              <TableHeader>
                <TableRow className="border-white/[0.06] hover:bg-transparent">
                  <TableHead className="text-neutral-400">Name</TableHead>
                  <TableHead className="text-neutral-400">Schedule</TableHead>
                  <TableHead className="text-neutral-400">Goal</TableHead>
                  <TableHead className="text-neutral-400">Booked</TableHead>
                  <TableHead className="text-right text-neutral-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trials.map((t) => (
                  <TableRow key={t.id} className="border-white/[0.06]">
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-white">{t.name}</span>
                        <span className="text-xs text-neutral-500">{t.email}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-neutral-300">
                      {t.date} · {t.time}
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate text-sm text-neutral-400">
                      {t.goal}
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-sm text-neutral-400">
                      {format(new Date(t.createdAt), 'dd MMM yyyy')}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        className="text-red-400 hover:bg-red-500/10"
                        aria-label={`Delete trial for ${t.name}`}
                        onClick={() => setDeleteTarget({ type: 'trial', id: t.id })}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {trials.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="py-10 text-center text-neutral-500"
                    >
                      No trial requests found.
                    </TableCell>
                  </TableRow>
                ) : null}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="contacts" className="mt-6 space-y-4">
          <div className="relative max-w-md">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
            <Input
              value={cQ}
              onChange={(e) => setCQ(e.target.value)}
              placeholder="Search messages…"
              className="border-white/[0.08] bg-white/[0.04] pl-9 text-white placeholder:text-neutral-600"
              aria-label="Search contact messages"
            />
          </div>
          <div className="overflow-x-auto rounded-xl border border-white/[0.08] bg-[#111111]">
            <Table>
              <TableHeader>
                <TableRow className="border-white/[0.06] hover:bg-transparent">
                  <TableHead className="text-neutral-400">From</TableHead>
                  <TableHead className="text-neutral-400">Message</TableHead>
                  <TableHead className="text-neutral-400">Received</TableHead>
                  <TableHead className="text-right text-neutral-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contacts.map((c) => (
                  <TableRow key={c.id} className="border-white/[0.06]">
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-white">{c.name}</span>
                        <span className="text-xs text-neutral-500">{c.email}</span>
                        {c.phone ? (
                          <span className="text-xs text-neutral-500">{c.phone}</span>
                        ) : null}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-md text-sm text-neutral-300">
                      <span className="line-clamp-3">{c.message}</span>
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-sm text-neutral-400">
                      {format(new Date(c.createdAt), 'dd MMM yyyy HH:mm')}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        className="text-red-400 hover:bg-red-500/10"
                        aria-label={`Delete message from ${c.name}`}
                        onClick={() =>
                          setDeleteTarget({ type: 'contact', id: c.id })
                        }
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {contacts.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="py-10 text-center text-neutral-500"
                    >
                      No messages found.
                    </TableCell>
                  </TableRow>
                ) : null}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(o) => {
          if (!o) setDeleteTarget(null)
        }}
      >
        <AlertDialogContent className="border-white/[0.08] bg-[#111111] text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this record?</AlertDialogTitle>
            <AlertDialogDescription className="text-neutral-400">
              This action cannot be undone. The item will be permanently removed
              from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-white/10 bg-transparent text-white hover:bg-white/10">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 text-white hover:bg-red-700"
              disabled={deleting}
              onClick={(e) => {
                e.preventDefault()
                void confirmDelete()
              }}
            >
              {deleting ? 'Deleting…' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
