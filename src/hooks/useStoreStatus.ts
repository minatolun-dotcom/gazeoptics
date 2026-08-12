import { useEffect, useState } from 'react'
import { locationInfo } from '../content/site'

export type StoreStatus =
  | { isOpen: true; closesAt: string }
  | { isOpen: false; opensAt: string }

/**
 * Live "Open now / Closed" status, computed from the real store schedule
 * (src/content/site.ts → locationInfo.schedule) in the store's timezone.
 * Re-checks every 60s so the badge stays accurate across opening/closing time.
 */
export function useStoreStatus(): StoreStatus {
  const [status, setStatus] = useState<StoreStatus>(() => compute())

  useEffect(() => {
    const id = window.setInterval(() => setStatus(compute()), 60_000)
    return () => window.clearInterval(id)
  }, [])

  return status
}

const WEEKDAY_INDEX: Record<string, number> = {
  Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6,
}

/** Current day index (0 = Sunday … 6 = Saturday) in the store's timezone. */
function storeDay(): number {
  const name = new Intl.DateTimeFormat('en-US', {
    timeZone: locationInfo.timeZone,
    weekday: 'short',
  }).format(new Date())
  return WEEKDAY_INDEX[name] ?? new Date().getDay()
}

/** Minutes since midnight, in the store's timezone. */
function storeMinutesOfDay(): number {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: locationInfo.timeZone,
    hour: 'numeric',
    minute: 'numeric',
    hourCycle: 'h23',
  }).formatToParts(new Date())
  const hour = Number(parts.find((p) => p.type === 'hour')?.value ?? 0)
  const minute = Number(parts.find((p) => p.type === 'minute')?.value ?? 0)
  return hour * 60 + minute
}

function compute(): StoreStatus {
  const day = storeDay()
  const nowMin = storeMinutesOfDay()
  const slot = locationInfo.schedule.find((s) => s.day === day)

  if (!slot) {
    return { isOpen: false, opensAt: nextOpening(day, nowMin) }
  }

  const openMin = slot.open * 60
  const closeMin = slot.close * 60

  if (nowMin >= openMin && nowMin < closeMin) {
    return { isOpen: true, closesAt: formatMinutes(closeMin) }
  }

  return { isOpen: false, opensAt: nextOpening(day, nowMin) }
}

/** Label for the next opening: "today 10:00 AM" / "tomorrow 10:00 AM" / "Monday 10:00 AM". */
function nextOpening(day: number, nowMin: number): string {
  const week: { n: number; label: string }[] = [
    { n: 1, label: 'Monday' },
    { n: 2, label: 'Tuesday' },
    { n: 3, label: 'Wednesday' },
    { n: 4, label: 'Thursday' },
    { n: 5, label: 'Friday' },
    { n: 6, label: 'Saturday' },
  ]

  // Before opening on an open day → it opens later today.
  const todaysSlot = locationInfo.schedule.find((s) => s.day === day)
  if (todaysSlot && nowMin < todaysSlot.open * 60) {
    return `today ${formatMinutes(todaysSlot.open * 60)}`
  }

  // Otherwise the next scheduled open day (closest future day with a slot).
  // daysAhead is always >= 1 here (today is handled by the early return above).
  const next = week.find((s) => s.n > day) ?? week[0]
  const daysAhead = ((next.n - day) + 7) % 7
  const when = daysAhead === 1 ? 'tomorrow' : next.label
  const open = locationInfo.schedule.find((s) => s.day === next.n)?.open ?? 10
  return `${when} ${formatMinutes(open * 60)}`
}

/** Format minutes-since-midnight as a 12-hour label, e.g. 1020 → "5:00 PM". */
function formatMinutes(min: number): string {
  const h = Math.floor(min / 60)
  const m = min % 60
  const period = h >= 12 ? 'PM' : 'AM'
  const twelve = h % 12 === 0 ? 12 : h % 12
  return `${twelve}:${String(m).padStart(2, '0')} ${period}`
}
