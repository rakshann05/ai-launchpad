import { TIERS } from '../lib/data'
import type { Registrant } from '../lib/store'
import { Icon, Reveal, SectionHead } from './primitives'

export default function Tiers({ me }: { me: Registrant | null }) {
  const refs = me?.referrals ?? 0
  return (
    <section id="rewards" className="relative px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          eyebrow="Referral rewards"
          title={<>Invite friends, <span className="text-gradient">unlock more</span></>}
          sub="Registering is free. Each friend who joins with your code bumps you to the next tier — and up the leaderboard."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {TIERS.map((t, i) => {
            const unlocked = refs >= t.min
            return (
              <Reveal key={t.name} delay={i * 0.06}>
                <div
                  className={`relative h-full rounded-3xl border p-6 transition ${
                    unlocked
                      ? 'border-white/20 bg-white/[0.06]'
                      : 'border-white/8 bg-white/[0.02] opacity-70'
                  }`}
                >
                  <span
                    className="grid h-11 w-11 place-items-center rounded-2xl ring-1 ring-white/10"
                    style={{ background: `${t.color}22` }}
                  >
                    <Icon name={t.icon} className="h-5 w-5" />
                  </span>
                  <div className="mt-4 text-[11px] font-semibold uppercase tracking-wider text-white/40">
                    {t.min === 0 ? 'On sign-up' : `${t.min}+ referrals`}
                  </div>
                  <h3 className="mt-0.5 font-display text-lg font-bold" style={{ color: t.color }}>
                    {t.name}
                  </h3>
                  <p className="mt-2 text-sm text-white/60">{t.perk}</p>
                  {unlocked && me && (
                    <span className="mt-4 inline-block rounded-full bg-lime/15 px-3 py-1 text-[11px] font-semibold text-lime">
                      Unlocked
                    </span>
                  )}
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
