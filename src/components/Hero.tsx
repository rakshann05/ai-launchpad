import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react'
import { WORKSHOP } from '../lib/data'
import { useCountdown, type Registrant } from '../lib/store'
import { Pill } from './primitives'

const COLLEGES = ['VIT', 'SRM', 'BITS', 'NIT-W', 'IIIT-H', 'Amrita', 'Anna Univ.', 'MIT Manipal', 'VNIT', 'KIIT']

function CountCell({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative grid h-16 w-16 place-items-center rounded-2xl glass sm:h-20 sm:w-20">
        <span className="font-display text-2xl font-bold tabular-nums sm:text-3xl">
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="mt-2 text-[10px] uppercase tracking-[0.2em] text-white/40">{label}</span>
    </div>
  )
}

export default function Hero({
  onRegister,
  me,
  seatsLeft,
}: {
  onRegister: () => void
  me: Registrant | null
  seatsLeft: number
}) {
  const { d, h, m, s } = useCountdown()

  return (
    <section id="top" className="relative px-5 pt-36 pb-20 sm:pt-44">
      <div className="mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <Pill>
            <Sparkles className="h-3.5 w-3.5 text-amber" />
            Free live workshop · {WORKSHOP.priceLabel} · Limited seats
          </Pill>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="mx-auto mt-6 max-w-4xl font-display text-4xl font-bold leading-[1.05] sm:text-6xl md:text-7xl"
        >
          Build your first <span className="text-gradient">AI project</span>
          <br className="hidden sm:block" /> in 60 minutes.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.16 }}
          className="mx-auto mt-6 max-w-2xl text-base text-white/60 sm:text-lg"
        >
          A free, live, hands-on workshop for final-year engineering students. Walk away with a
          real AI app on your GitHub — and a live link you can drop on your resume today.
        </motion.p>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.24 }}
          className="mt-10 flex items-center justify-center gap-3 sm:gap-4"
        >
          <CountCell value={d} label="days" />
          <span className="pb-6 font-display text-2xl text-white/20">:</span>
          <CountCell value={h} label="hrs" />
          <span className="pb-6 font-display text-2xl text-white/20">:</span>
          <CountCell value={m} label="min" />
          <span className="pb-6 font-display text-2xl text-white/20">:</span>
          <CountCell value={s} label="sec" />
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.32 }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <button
            onClick={onRegister}
            className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet to-cyan px-7 py-4 font-semibold text-white shadow-[0_0_40px_-8px_rgba(139,92,246,0.7)] transition hover:scale-[1.03] active:scale-95"
          >
            {me ? 'Open your referral dashboard' : 'Reserve my free seat'}
            <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
          </button>
          <div className="inline-flex items-center gap-2 text-sm text-white/50">
            <CheckCircle2 className="h-4 w-4 text-lime" />
            No cost · No prerequisites · 60 min
          </div>
        </motion.div>

        {/* Seats bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mx-auto mt-10 max-w-sm"
        >
          <div className="flex items-center justify-between text-xs text-white/50">
            <span>Seats filling fast</span>
            <span className="font-semibold text-amber">{seatsLeft} left</span>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber to-violet"
              style={{ width: `${Math.min(100, ((WORKSHOP.seatsTotal - seatsLeft) / WORKSHOP.seatsTotal) * 100)}%` }}
            />
          </div>
        </motion.div>
      </div>

      {/* College marquee */}
      <div className="relative mt-20 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_15%,#000_85%,transparent)]">
        <p className="mb-5 text-center text-xs uppercase tracking-[0.3em] text-white/30">
          Builders joining from
        </p>
        <div className="flex w-max animate-marquee gap-10">
          {[...COLLEGES, ...COLLEGES].map((c, i) => (
            <span key={i} className="font-display text-lg font-semibold text-white/25">
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
