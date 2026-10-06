import { ArrowLeft } from 'lucide-react'
import { useAdminStats, useCountdown, type AdminStats } from '../lib/store'

export default function Admin() {
  const { stats, loading, isLive } = useAdminStats()
  const { d } = useCountdown()

  return (
    <div className="min-h-screen">
      <header className="rule-b bg-paper/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 sm:px-8">
          <a href="/" className="flex items-center gap-2 text-sm text-muted transition hover:text-ink">
            <ArrowLeft className="h-4 w-4" /> Back to site
          </a>
          <div className="flex items-center gap-2.5">
            <span className="display text-lg">Growth Cockpit</span>
            <span
              className={`kicker border px-2 py-0.5 ${isLive ? 'border-accent text-accent' : 'border-line-strong text-muted'}`}
            >
              {isLive ? '● Live' : 'Demo data'}
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="kicker"><span className="text-accent">✱</span> Campaign command center</div>
        <h1 className="display mt-3 text-4xl sm:text-5xl">
          Are we going to hit <span className="ed-serif text-accent">500?</span>
        </h1>
        <p className="mt-3 max-w-xl text-muted">
          The numbers a growth lead actually watches — so the ₹2,000 and 7 days go where they convert.
        </p>

        {loading || !stats ? (
          <div className="rule-t mt-10 py-16 text-center text-muted">Loading campaign data…</div>
        ) : (
          <Dashboard stats={stats} daysLeft={d} />
        )}
      </main>

      <footer className="rule-t px-5 py-8 text-center sm:px-8">
        <span className="kicker">AI Launchpad · Growth Cockpit — {isLive ? 'live Supabase data' : 'demo data (add keys to go live)'}</span>
      </footer>
    </div>
  )
}

function Dashboard({ stats, daysLeft }: { stats: AdminStats; daysLeft: number }) {
  const pct = Math.min(100, (stats.total / stats.goal) * 100)
  const onTrack = stats.projectionDays !== null && stats.projectionDays <= daysLeft

  return (
    <div className="mt-10">
      {/* KPI row */}
      <div className="grid grid-cols-2 gap-px bg-line lg:grid-cols-4">
        <Kpi label="Registrations" value={stats.total.toLocaleString('en-IN')} sub={`${Math.round(pct)}% of ${stats.goal}`} />
        <Kpi label="Referral share" value={`${Math.round(stats.referralShare * 100)}%`} sub={`${stats.referred} via referrals`} accent />
        <Kpi label="K-factor" value={stats.kFactor.toFixed(2)} sub="referrals / registrant" />
        <Kpi
          label="Projected to 500"
          value={stats.projectedLabel}
          sub={stats.projectionDays !== null ? `${stats.projectionDays} days at current pace` : '—'}
          accent={onTrack}
        />
      </div>

      {/* on-track verdict */}
      <div className={`rule-b mt-px flex items-center gap-3 border-x border-line bg-paper px-5 py-3 text-sm`}>
        <span className={`inline-block h-2.5 w-2.5 ${onTrack ? 'bg-accent' : 'bg-ink'}`} />
        {stats.projectionDays === null ? (
          <span>Not enough signups yet to project a finish date.</span>
        ) : onTrack ? (
          <span>
            <b>On track.</b> At ~{Math.round(stats.dailyRate)}/day we reach 500 in {stats.projectionDays} days — inside the {daysLeft}-day window.
          </span>
        ) : (
          <span>
            <b>Behind pace.</b> At ~{Math.round(stats.dailyRate)}/day we'd finish in {stats.projectionDays} days — past the {daysLeft}-day window. Push referrals.
          </span>
        )}
      </div>

      {/* charts row */}
      <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        {/* signups per day */}
        <div className="border border-line-strong">
          <div className="rule-b flex items-center justify-between px-5 py-3">
            <span className="kicker">Registrations / day</span>
            <span className="kicker text-muted">last 7 days</span>
          </div>
          <div className="p-5">
            <BarChart data={stats.perDay} />
          </div>
        </div>

        {/* channel split */}
        <div className="border border-line-strong">
          <div className="rule-b px-5 py-3">
            <span className="kicker">How they arrive</span>
          </div>
          <div className="space-y-5 p-5">
            <SplitBar label="Referred (earned)" value={stats.referred} total={stats.total} accent />
            <SplitBar label="Direct" value={stats.direct} total={stats.total} />
            <p className="text-xs leading-relaxed text-muted">
              The higher the <b className="text-ink">referred share</b>, the cheaper each registration —
              it's the loop doing the work, not the ₹2,000.
            </p>
          </div>
        </div>
      </div>

      {/* top referrers */}
      <div className="mt-8 border border-line-strong">
        <div className="rule-b grid grid-cols-[3rem_1fr_auto] gap-4 bg-ink px-5 py-3 text-paper">
          <span className="kicker text-paper/60">#</span>
          <span className="kicker text-paper/60">Top referrer</span>
          <span className="kicker text-paper/60">Invites</span>
        </div>
        {stats.topReferrers.map((r, i) => (
          <div key={r.name + i} className="rule-b grid grid-cols-[3rem_1fr_auto] items-center gap-4 px-5 py-3 last:border-b-0">
            <span className={`nums ${i < 3 ? 'text-accent' : 'text-faint'}`}>{String(i + 1).padStart(2, '0')}</span>
            <div>
              <div className="text-sm font-semibold">{r.name}</div>
              <div className="text-xs text-faint">{r.college}</div>
            </div>
            <span className="nums text-lg">{r.referrals}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Kpi({ label, value, sub, accent }: { label: string; value: string; sub: string; accent?: boolean }) {
  return (
    <div className="bg-paper p-5">
      <div className="kicker">{label}</div>
      <div className={`display mt-2 text-3xl sm:text-4xl ${accent ? 'text-accent' : ''}`}>{value}</div>
      <div className="mt-1 text-xs text-muted">{sub}</div>
    </div>
  )
}

function BarChart({ data }: { data: { label: string; count: number }[] }) {
  const max = Math.max(1, ...data.map((d) => d.count))
  const W = 520
  const H = 180
  const gap = 14
  const bw = (W - gap * (data.length - 1)) / data.length
  return (
    <svg viewBox={`0 0 ${W} ${H + 28}`} className="w-full" role="img" aria-label="Registrations per day">
      {data.map((d, i) => {
        const h = (d.count / max) * H
        const x = i * (bw + gap)
        const last = i === data.length - 1
        return (
          <g key={i}>
            <rect
              x={x}
              y={H - h}
              width={bw}
              height={h}
              fill={last ? 'var(--color-accent)' : 'var(--color-ink)'}
            />
            <text x={x + bw / 2} y={H - h - 6} textAnchor="middle" fontFamily="Space Mono, monospace" fontSize="13" fill="var(--color-ink)">
              {d.count}
            </text>
            <text x={x + bw / 2} y={H + 18} textAnchor="middle" fontFamily="Space Mono, monospace" fontSize="11" fill="var(--color-muted)">
              {d.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

function SplitBar({ label, value, total, accent }: { label: string; value: number; total: number; accent?: boolean }) {
  const pct = total ? Math.round((value / total) * 100) : 0
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span>{label}</span>
        <span className="nums">{value} · {pct}%</span>
      </div>
      <div className="mt-2 h-2.5 w-full bg-line">
        <div className={`h-full ${accent ? 'bg-accent' : 'bg-ink'}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
