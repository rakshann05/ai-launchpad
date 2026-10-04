import { motion } from 'framer-motion'
import { Crown } from 'lucide-react'
import { buildLeaderboard, type Registrant } from '../lib/store'
import { Reveal, SectionHead } from './primitives'

const MEDAL = ['#fbbf24', '#cbd5e1', '#d97706']

export default function Leaderboard({ me }: { me: Registrant | null }) {
  const rows = buildLeaderboard(me)
  const top3 = rows.slice(0, 3)
  const rest = rows.slice(3, 10)
  // Podium order: 2nd, 1st, 3rd
  const podium = [top3[1], top3[0], top3[2]].filter(Boolean)
  const heights = ['h-28', 'h-40', 'h-20']

  return (
    <section id="leaderboard" className="relative px-5 py-24">
      <div className="mx-auto max-w-4xl">
        <SectionHead
          eyebrow="Campus leaderboard"
          title={<>Top <span className="text-gradient">referrers</span> this week</>}
          sub="Live ranking of who is bringing the most builders. Register and climb it yourself."
        />

        {/* Podium */}
        <div className="mb-10 flex items-end justify-center gap-3 sm:gap-5">
          {podium.map((p, idx) => {
            const realRank = p.rank
            return (
              <Reveal key={p.name} delay={idx * 0.1} y={40}>
                <div className="flex w-24 flex-col items-center sm:w-32">
                  {realRank === 1 && <Crown className="mb-1 h-6 w-6 text-amber" />}
                  <div
                    className={`grid h-14 w-14 place-items-center rounded-full font-display text-lg font-bold ring-2 ${
                      p.isMe ? 'ring-lime' : 'ring-white/15'
                    }`}
                    style={{ background: `${MEDAL[realRank - 1]}22`, color: MEDAL[realRank - 1] }}
                  >
                    {initials(p.name)}
                  </div>
                  <div className="mt-2 max-w-full truncate text-center text-xs font-semibold">
                    {p.name}
                  </div>
                  <div className="text-[10px] text-white/40">{p.referrals} invites</div>
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: 'auto' }}
                    viewport={{ once: true }}
                    className={`mt-2 w-full rounded-t-xl bg-gradient-to-t from-violet/10 to-cyan/30 ${heights[idx]} grid place-items-end pb-2`}
                  >
                    <span className="font-display text-xl font-bold text-white/80">#{realRank}</span>
                  </motion.div>
                </div>
              </Reveal>
            )
          })}
        </div>

        {/* Rest of list */}
        <Reveal>
          <div className="overflow-hidden rounded-3xl glass">
            {rest.map((r) => (
              <div
                key={r.name}
                className={`flex items-center gap-4 border-b border-white/5 px-5 py-3.5 last:border-0 ${
                  r.isMe ? 'bg-lime/10' : ''
                }`}
              >
                <span className="w-6 text-center font-display text-sm font-bold text-white/40">
                  {r.rank}
                </span>
                <span className="grid h-9 w-9 place-items-center rounded-full bg-white/5 text-xs font-semibold">
                  {initials(r.name)}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{r.name}</div>
                  <div className="text-[11px] text-white/40">{r.college}</div>
                </div>
                <span className="font-display text-sm font-bold text-cyan">{r.referrals}</span>
              </div>
            ))}
            {me && me.referrals === 0 && (
              <div className="bg-lime/10 px-5 py-3 text-center text-xs text-white/60">
                You’re on the board — share your code to start climbing ↑
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

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
