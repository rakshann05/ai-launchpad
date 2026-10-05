import { Reveal, SectionHead } from './primitives'
import type { LeaderRow } from '../lib/store'

function initials(name: string) {
  return name
    .replace(/\(You\)/, '')
    .trim()
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export default function Leaderboard({ leaders, loading }: { leaders: LeaderRow[]; loading: boolean }) {
  const rows = leaders.slice(0, 10)

  return (
    <section id="leaderboard" className="relative px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <SectionHead
          index="05"
          label="Campus leaderboard"
          title={<>Top referrers <span className="ed-serif">this week.</span></>}
          sub="A live ranking of who's bringing the most builders. Register and climb it yourself."
        />

        <Reveal className="mt-12">
          <div className="border border-line-strong">
            {/* header */}
            <div className="rule-b grid grid-cols-[3rem_1fr_auto] items-center gap-4 bg-ink px-5 py-3 text-paper">
              <span className="kicker text-paper/60">Rank</span>
              <span className="kicker text-paper/60">Builder</span>
              <span className="kicker text-paper/60">Invites</span>
            </div>

            {loading && rows.length === 0 ? (
              <div className="px-5 py-10 text-center text-sm text-muted">Loading the board…</div>
            ) : (
              rows.map((r) => (
                <div
                  key={r.code + r.rank}
                  className={`rule-b grid grid-cols-[3rem_1fr_auto] items-center gap-4 px-5 py-3.5 last:border-b-0 ${
                    r.isMe ? 'bg-accent/10' : 'bg-paper'
                  }`}
                >
                  <span className={`nums text-lg ${r.rank <= 3 ? 'text-accent' : 'text-faint'}`}>
                    {String(r.rank).padStart(2, '0')}
                  </span>
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center border border-line-strong text-[0.7rem] font-bold">
                      {initials(r.name)}
                    </span>
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold">{r.name}</div>
                      <div className="truncate text-xs text-faint">{r.college}</div>
                    </div>
                  </div>
                  <span className="nums text-lg">{r.referrals}</span>
                </div>
              ))
            )}
          </div>
          <p className="kicker mt-4 text-center">
            {leaders.some((l) => l.isMe) ? 'You’re on the board — share your code to climb ↑' : 'Register to claim your spot'}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
