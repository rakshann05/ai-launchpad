import { motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { WORKSHOP } from '../lib/data'

function CountUp({ to, duration = 1.3 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!inView) return
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / (duration * 1000))
      setVal(Math.round((1 - Math.pow(1 - p, 3)) * to))
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
    <section className="relative px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="rule-t rule-b py-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="kicker"><span className="text-accent">✱</span> Campaign goal — 7 days</span>
              <div className="display mt-3 text-5xl sm:text-7xl">
                <span className="nums"><CountUp to={total} /></span>
                <span className="text-faint"> / {WORKSHOP.goal}</span>
              </div>
              <p className="mt-2 text-sm text-muted">final-year students registered for the workshop</p>
            </div>
            <div className="text-right">
              <div className="display text-4xl text-accent sm:text-5xl">{Math.round(pct)}%</div>
              <div className="kicker mt-1">to target</div>
            </div>
          </div>

          <div className="mt-7 h-3 w-full border border-line-strong bg-paper p-[2px]">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${pct}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
              className="h-full bg-accent"
            />
          </div>
          <p className="mt-4 max-w-2xl text-sm text-muted">
            Every referral moves this bar. The campaign hits 500 when enough builders each invite just{' '}
            <span className="font-semibold text-ink">2–3 friends</span> — earned reach, not paid ads.
          </p>
        </div>
      </div>
    </section>
  )
}
