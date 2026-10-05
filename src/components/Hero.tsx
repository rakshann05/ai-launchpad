import { motion } from 'framer-motion'
import { WORKSHOP } from '../lib/data'
import { useCountdown, type Me } from '../lib/store'

const COLLEGES = ['VIT', 'SRM', 'BITS', 'NIT-W', 'IIIT-H', 'Amrita', 'Anna Univ.', 'MIT Manipal', 'VNIT', 'KIIT', 'PES', 'RVCE']

const ease = [0.22, 1, 0.36, 1] as const

export default function Hero({
  onRegister,
  me,
  seatsLeft,
  total,
}: {
  onRegister: () => void
  me: Me | null
  seatsLeft: number
  total: number
}) {
  const { d, h, m, s } = useCountdown()
  const filledPct = Math.min(100, ((WORKSHOP.seatsTotal - seatsLeft) / WORKSHOP.seatsTotal) * 100)

  return (
    <section id="top" className="relative px-5 pt-28 pb-16 sm:px-8 sm:pt-32">
      <div className="mx-auto max-w-6xl">
        {/* meta line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="kicker flex flex-wrap items-center gap-x-3 gap-y-1"
        >
          <span className="text-accent">●</span>
          <span>Free live workshop</span>
          <span className="text-faint">/</span>
          <span>{WORKSHOP.priceLabel}</span>
          <span className="text-faint">/</span>
          <span>Final-year engineers</span>
        </motion.div>

        {/* headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.06, ease }}
          className="display mt-6 text-[clamp(2.7rem,9vw,7rem)] leading-[0.92]"
        >
          Build your <span className="ed-serif text-accent">first AI project</span>
          <br />
          in 60 minutes.
        </motion.h1>

        {/* two-column: pitch + details panel */}
        <div className="mt-10 grid gap-10 md:grid-cols-[1.3fr_1fr] md:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease }}
          >
            <p className="max-w-md text-lg leading-relaxed text-muted">
              A live, hands-on workshop for final-year engineering students. Walk away with a real AI
              app on your GitHub — and a live link you can put on your resume today.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={onRegister}
                className="group inline-flex items-center gap-2.5 bg-accent px-7 py-4 text-base font-semibold text-paper transition hover:bg-ink"
              >
                {me ? 'Open your referral dashboard' : 'Reserve my free seat'}
                <span className="transition group-hover:translate-x-1">→</span>
              </button>
              <span className="text-sm text-muted">No cost · No prerequisites · 60 min</span>
            </div>

            {/* live registrations ticker */}
            <div className="mt-8 flex items-center gap-2.5 text-sm text-muted">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="nums text-ink">{total.toLocaleString('en-IN')}</span>
              registered so far
            </div>
          </motion.div>

          {/* details / countdown panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24, ease }}
            className="border border-line-strong bg-card"
          >
            <div className="rule-b flex items-center justify-between px-5 py-3">
              <span className="kicker">Starts in</span>
              <span className="kicker text-accent">Live</span>
            </div>
            <div className="grid grid-cols-4 divide-x divide-line text-center">
              {[
                { v: d, l: 'days' },
                { v: h, l: 'hrs' },
                { v: m, l: 'min' },
                { v: s, l: 'sec' },
              ].map((c) => (
                <div key={c.l} className="py-5">
                  <div className="nums text-3xl sm:text-4xl">{String(c.v).padStart(2, '0')}</div>
                  <div className="kicker mt-1 text-[0.6rem]">{c.l}</div>
                </div>
              ))}
            </div>
            <div className="rule-t px-5 py-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted">Seats remaining</span>
                <span className="nums font-bold text-accent">{seatsLeft}</span>
              </div>
              <div className="mt-2.5 h-1.5 w-full bg-line">
                <div className="h-full bg-ink" style={{ width: `${filledPct}%` }} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* college marquee */}
      <div className="mt-16 rule-t rule-b overflow-hidden py-4">
        <div className="flex w-max animate-marquee items-center gap-10">
          {[...COLLEGES, ...COLLEGES].map((c, i) => (
            <span key={i} className="display shrink-0 text-xl text-faint">
              {c}
              <span className="ml-10 text-accent">✱</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
