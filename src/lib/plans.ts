export const MEMBERSHIP_PLANS = [
  { code: 'STARTER', label: 'STARTER', amountPaise: 1499 * 100 },
  { code: 'PRO', label: 'PRO', amountPaise: 2999 * 100 },
  { code: 'ELITE', label: 'ELITE', amountPaise: 4999 * 100 },
] as const

export type PlanCode = (typeof MEMBERSHIP_PLANS)[number]['code']

export function getPlanByCode(planName: string) {
  const normalized = planName.trim().toUpperCase()
  return MEMBERSHIP_PLANS.find((p) => p.code === normalized) ?? null
}

export function getPlanAmountPaise(planName: string): number | null {
  const plan = getPlanByCode(planName)
  return plan?.amountPaise ?? null
}
