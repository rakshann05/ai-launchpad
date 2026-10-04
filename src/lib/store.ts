import { useEffect, useState } from 'react'
import { BASE_REGISTRATIONS, SEED_LEADERS, WORKSHOP } from './data'

// ─────────────────────────────────────────────────────────────
// Lightweight client store. Persists the current user's
// registration + simulated referral activity in localStorage so
// the demo is fully interactive without a backend.
// (In production this layer swaps for an API — see README.)
// ─────────────────────────────────────────────────────────────

const KEY = 'nxtwave_ai_launchpad_v1'

export interface Registrant {
  name: string
  college: string
  code: string
  referrals: number
  joinedAt: number
}

interface StoreShape {
  me: Registrant | null
}

function read(): StoreShape {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    /* ignore */
  }
  return { me: null }
}

function write(s: StoreShape) {
  try {
    localStorage.setItem(KEY, JSON.stringify(s))
  } catch {
    /* ignore */
  }
}

export function makeCode(name: string): string {
  const base = (name || 'builder')
    .toUpperCase()
    .replace(/[^A-Z]/g, '')
    .slice(0, 4)
    .padEnd(4, 'X')
  const n = Math.floor(100 + Math.random() * 900)
  return `${base}-AI${n}`
}

export function useRegistrant() {
  const [me, setMe] = useState<Registrant | null>(() => read().me)

  const register = (name: string, college: string) => {
    const reg: Registrant = {
      name: name.trim() || 'Future Builder',
      college: college.trim() || 'Your Campus',
      code: makeCode(name),
      referrals: 0,
      joinedAt: Date.now(),
    }
    setMe(reg)
    write({ me: reg })
    return reg
  }

  // Simulate a successful referral (demo of the tracker).
  const addReferral = () => {
    setMe((prev) => {
      if (!prev) return prev
      const next = { ...prev, referrals: prev.referrals + 1 }
      write({ me: next })
      return next
    })
  }

  const reset = () => {
    setMe(null)
    write({ me: null })
  }

  return { me, register, addReferral, reset }
}

// Build the live leaderboard: seed data + the current user, ranked.
export function buildLeaderboard(me: Registrant | null) {
  const rows = SEED_LEADERS.map((s) => ({ ...s, isMe: false }))
  if (me) {
    rows.push({ name: `${me.name} (You)`, college: me.college, referrals: me.referrals, isMe: true })
  }
  rows.sort((a, b) => b.referrals - a.referrals)
  return rows.map((r, i) => ({ ...r, rank: i + 1 }))
}

// Registrations counted toward the 500 goal (demo baseline + you + your invites).
export function totalRegistrations(me: Registrant | null) {
  const mine = me ? 1 + me.referrals : 0
  return BASE_REGISTRATIONS + mine
}

// ── Countdown hook to the workshop date ──
export function useCountdown(targetISO: string = WORKSHOP.dateISO) {
  const calc = () => {
    const diff = Math.max(0, new Date(targetISO).getTime() - Date.now())
    const d = Math.floor(diff / 86400000)
    const h = Math.floor((diff % 86400000) / 3600000)
    const m = Math.floor((diff % 3600000) / 60000)
    const s = Math.floor((diff % 60000) / 1000)
    return { d, h, m, s, done: diff === 0 }
  }
  const [t, setT] = useState(calc)
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetISO])
  return t
}
