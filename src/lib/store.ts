import { useCallback, useEffect, useRef, useState } from 'react'
import { BASE_REGISTRATIONS, SEED_LEADERS, WORKSHOP } from './data'
import { isLive, supabase } from './supabase'

// ─────────────────────────────────────────────────────────────
// Campaign data layer.
//   • LIVE mode  (Supabase keys present): real, cross-user
//     registrations, referral attribution and a shared leaderboard.
//   • DEMO mode  (no keys): seeded leaderboard + local referral
//     simulation, so the app is fully interactive with zero setup.
// The component API is identical in both modes.
// ─────────────────────────────────────────────────────────────

export interface Me {
  id: string
  name: string
  college: string
  code: string
}

export interface LeaderRow {
  code: string
  name: string
  college: string
  referrals: number
  rank: number
  isMe: boolean
}

const KEY = 'nxtwave_ai_launchpad_v2'

export function makeCode(name: string): string {
  const base = (name || 'builder')
    .toUpperCase()
    .replace(/[^A-Z]/g, '')
    .slice(0, 4)
    .padEnd(4, 'X')
  const n = Math.floor(100 + Math.random() * 900)
  return `${base}-AI${n}`
}

// ── local persistence of "who am I" + demo referral count ──
interface Persisted {
  me: Me | null
  demoReferrals: number
}
function load(): Persisted {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    /* ignore */
  }
  return { me: null, demoReferrals: 0 }
}
function save(p: Persisted) {
  try {
    localStorage.setItem(KEY, JSON.stringify(p))
  } catch {
    /* ignore */
  }
}

// ── Countdown hook ──
export function useCountdown(targetISO: string = WORKSHOP.dateISO) {
  const calc = () => {
    const diff = Math.max(0, new Date(targetISO).getTime() - Date.now())
    return {
      d: Math.floor(diff / 86400000),
      h: Math.floor((diff % 86400000) / 3600000),
      m: Math.floor((diff % 3600000) / 60000),
      s: Math.floor((diff % 60000) / 1000),
      done: diff === 0,
    }
  }
  const [t, setT] = useState(calc)
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetISO])
  return t
}

// ── The campaign hook ──
export function useCampaign() {
  const [me, setMe] = useState<Me | null>(() => load().me)
  const [demoReferrals, setDemoReferrals] = useState<number>(() => load().demoReferrals)
  const [myReferrals, setMyReferrals] = useState<number>(0)
  const [total, setTotal] = useState<number>(BASE_REGISTRATIONS)
  const [leaders, setLeaders] = useState<LeaderRow[]>([])
  const [loading, setLoading] = useState<boolean>(isLive)
  const [busy, setBusy] = useState<boolean>(false)
  const meRef = useRef(me)
  meRef.current = me

  // Build the demo leaderboard (seed + me)
  const demoBoard = useCallback(
    (refs: number): LeaderRow[] => {
      const rows = SEED_LEADERS.map((s) => ({ ...s, isMe: false }))
      const m = meRef.current
      if (m) rows.push({ code: m.code, name: `${m.name} (You)`, college: m.college, referrals: refs, isMe: true })
      rows.sort((a, b) => b.referrals - a.referrals)
      return rows.map((r, i) => ({ ...r, rank: i + 1 }))
    },
    [],
  )

  // ── Refresh all campaign numbers ──
  const refresh = useCallback(async () => {
    if (!isLive || !supabase) {
      setMyReferrals(demoReferrals)
      setTotal(BASE_REGISTRATIONS + (meRef.current ? 1 + demoReferrals : 0))
      setLeaders(demoBoard(demoReferrals))
      return
    }
    try {
      const [{ count }, boardRes, myRes] = await Promise.all([
        supabase.from('registrations').select('*', { count: 'exact', head: true }),
        supabase.from('leaderboard').select('code,name,college,referrals').order('referrals', { ascending: false }).limit(12),
        meRef.current
          ? supabase.from('leaderboard').select('referrals').eq('code', meRef.current.code).maybeSingle()
          : Promise.resolve({ data: null } as { data: { referrals: number } | null }),
      ])

      setTotal(count ?? 0)

      const mine = (myRes as { data: { referrals: number } | null }).data?.referrals ?? 0
      setMyReferrals(mine)

      const board: LeaderRow[] = (boardRes.data ?? []).map((r, i) => ({
        code: r.code as string,
        name: r.name as string,
        college: r.college as string,
        referrals: Number(r.referrals),
        rank: i + 1,
        isMe: meRef.current?.code === r.code,
      }))
      // Ensure the current user is visible even if below the top 12
      if (meRef.current && !board.some((b) => b.isMe)) {
        board.push({
          code: meRef.current.code,
          name: `${meRef.current.name} (You)`,
          college: meRef.current.college,
          referrals: mine,
          rank: board.length + 1,
          isMe: true,
        })
      } else {
        const meRow = board.find((b) => b.isMe)
        if (meRow) meRow.name = `${meRow.name} (You)`
      }
      setLeaders(board)
    } catch (e) {
      console.warn('[campaign] refresh failed, showing demo data', e)
      setLeaders(demoBoard(demoReferrals))
    } finally {
      setLoading(false)
    }
  }, [demoReferrals, demoBoard])

  // initial load + realtime/polling in live mode
  useEffect(() => {
    refresh()
    if (!isLive || !supabase) return
    const sb = supabase
    const channel = sb
      .channel('registrations-stream')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'registrations' }, () => refresh())
      .subscribe()
    const poll = setInterval(refresh, 20000)
    return () => {
      sb.removeChannel(channel)
      clearInterval(poll)
    }
  }, [refresh])

  // ── Register ──
  const register = useCallback(
    async (name: string, college: string, refCodeRaw?: string): Promise<Me> => {
      setBusy(true)
      const cleanName = name.trim() || 'Future Builder'
      const cleanCollege = college.trim() || 'Your Campus'
      const refCode = (refCodeRaw || '').trim().toUpperCase() || null

      try {
        if (!isLive || !supabase) {
          const demo: Me = { id: crypto.randomUUID(), name: cleanName, college: cleanCollege, code: makeCode(cleanName) }
          setMe(demo)
          save({ me: demo, demoReferrals: 0 })
          setDemoReferrals(0)
          setMyReferrals(0)
          return demo
        }

        // live: insert with a unique code (retry on collision)
        let created: Me | null = null
        for (let attempt = 0; attempt < 4 && !created; attempt++) {
          const code = makeCode(cleanName)
          const payload: Record<string, unknown> = { name: cleanName, college: cleanCollege, code }
          if (refCode) payload.referred_by = refCode
          const { data, error } = await supabase.from('registrations').insert(payload).select('id,name,college,code').single()
          if (!error && data) {
            created = { id: data.id, name: data.name, college: data.college, code: data.code }
          } else if (error && error.code === '23503' && refCode) {
            // referrer code doesn't exist — register without attribution
            const { data: d2 } = await supabase
              .from('registrations')
              .insert({ name: cleanName, college: cleanCollege, code })
              .select('id,name,college,code')
              .single()
            if (d2) created = { id: d2.id, name: d2.name, college: d2.college, code: d2.code }
          } else if (error && error.code !== '23505') {
            // non-duplicate error: stop retrying
            throw error
          }
        }
        if (!created) throw new Error('Could not generate a unique code')
        setMe(created)
        save({ me: created, demoReferrals: 0 })
        await refresh()
        return created
      } finally {
        setBusy(false)
      }
    },
    [refresh],
  )

  // ── Simulate / record a referral (demo button) ──
  const addReferral = useCallback(async () => {
    const m = meRef.current
    if (!m) return
    if (!isLive || !supabase) {
      setDemoReferrals((prev) => {
        const next = prev + 1
        save({ me: m, demoReferrals: next })
        return next
      })
      return
    }
    // live: insert a real referred registration under my code
    const code = makeCode('friend')
    await supabase.from('registrations').insert({ name: 'A friend', college: 'Campus', code, referred_by: m.code })
    await refresh()
  }, [refresh])

  // keep numbers in sync when the user or their demo referrals change
  useEffect(() => {
    refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [me, demoReferrals])

  const myRank = leaders.find((l) => l.isMe)?.rank ?? null

  return { me, myReferrals, myRank, total, leaders, loading, busy, isLive, register, addReferral, refresh }
}
