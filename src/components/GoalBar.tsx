import { motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { WORKSHOP } from '../lib/data'
import { Reveal } from './primitives'

// Animated count-up number.
function CountUp({ to, duration = 1.4 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!inView) return
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / (duration * 1000))
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(Math.round(eased * to))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to, duration])
  return <span ref={ref}>{val.toLocaleString('en-IN')}</span>
}

export default function GoalBar({ total }: { total: number }) {
  const pct = Math.min(100, (total / WORKSHOP.goal) * 100)
  return (
    <section className="relative px-5 py-20">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] glass p-8 sm:p-12">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet/25 blur-3xl" />
            <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan">
                  Campaign goal · 7 days
                </span>
                <h2 className="mt-2 font-display text-4xl font-bold sm:text-5xl">
                  <span className="text-gradient">
                    <CountUp to={total} />
                  </span>
                  <span className="text-white/30"> / {WORKSHOP.goal}</span>
                </h2>
                <p className="mt-1 text-sm text-white/50">
                  final-year students registered for the workshop
                </p>
              </div>
              <div className="text-right">
                <div className="font-display text-3xl font-bold text-lime">{Math.round(pct)}%</div>
                <div className="text-xs text-white/40">to target</div>
              </div>
            </div>

            <div className="relative mt-7 h-4 w-full overflow-hidden rounded-full bg-white/8">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${pct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative h-full rounded-full bg-gradient-to-r from-violet via-cyan to-lime"
              >
                <div className="absolute inset-0 opacity-50 [background:linear-gradient(110deg,transparent,rgba(255,255,255,0.6),transparent)] [background-size:200%_100%] [animation:shimmer_2.5s_linear_infinite]" />
              </motion.div>
            </div>
            <p className="mt-4 text-sm text-white/45">
              Every referral you bring moves this bar. The campaign hits 500 when enough builders
              each invite just <span className="font-semibold text-white/80">2–3 friends</span>.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
