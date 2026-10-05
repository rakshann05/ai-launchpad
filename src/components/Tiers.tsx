import { TIERS } from '../lib/data'
import { Icon, Reveal, SectionHead } from './primitives'

export default function Tiers({ referrals, registered }: { referrals: number; registered: boolean }) {
  return (
    <section id="rewards" className="relative px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          index="04"
          label="Referral rewards"
          title={<>Invite friends, <span className="ed-serif">unlock more.</span></>}
          sub="Registering is free. Each friend who joins with your code bumps you a tier — and up the leaderboard."
        />
        <div className="mt-12 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-5">
          {TIERS.map((t, i) => {
            const unlocked = registered && referrals >= t.min
            return (
              <Reveal key={t.name} delay={i * 0.05}>
                <div className={`relative h-full bg-paper p-6 ${unlocked ? '' : ''}`}>
                  <div className="flex items-center justify-between">
                    <span
                      className="grid h-10 w-10 place-items-center border"
                      style={{ borderColor: unlocked ? 'var(--color-accent)' : 'var(--color-line-strong)' }}
                    >
                      <Icon name={t.icon} className="h-5 w-5" style={{ color: unlocked ? 'var(--color-accent)' : undefined }} />
                    </span>
                    <span className="nums text-xs text-faint">
                      {t.min === 0 ? 'SIGN-UP' : `${t.min}+ REF`}
                    </span>
                  </div>
                  <h3 className="display mt-5 text-lg">{t.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{t.perk}</p>
                  {unlocked && (
                    <span className="mt-4 inline-block bg-accent px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-paper">
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
