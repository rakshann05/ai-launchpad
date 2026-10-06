import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { FAQ } from '../lib/data'
import { Reveal, SectionHead } from './primitives'

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section className="relative px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <SectionHead index="06" label="FAQ" title={<>Quick <span className="ed-serif">questions.</span></>} />
        <div className="mt-10">
          {FAQ.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.04}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="rule-t w-full py-5 text-left last:rule-b"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="display text-lg sm:text-xl">{f.q}</span>
                  <Plus className={`h-5 w-5 shrink-0 text-accent transition ${open === i ? 'rotate-45' : ''}`} />
                </div>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden text-[0.95rem] text-muted"
                    >
                      <span className="block max-w-xl pt-3">{f.a}</span>
                    </motion.p>
                  )}
                </AnimatePresence>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function FinalCta({ onRegister }: { onRegister: () => void }) {
  return (
    <section className="relative px-5 py-20 sm:px-8">
      <Reveal>
        <div className="mx-auto max-w-6xl border border-line-strong bg-ink p-10 text-paper sm:p-16">
          <span className="kicker text-paper/60"><span className="text-accent">✱</span> One hour away</span>
          <h2 className="display mt-5 text-[clamp(2.2rem,6vw,5rem)] leading-[0.95]">
            Your first AI project is
            <br />
            <span className="ed-serif text-accent">one hour away.</span>
          </h2>
          <p className="mt-5 max-w-md text-paper/60">
            Free seat, real project, a live link for your resume. Bring a friend and climb the board.
          </p>
          <button
            onClick={onRegister}
            className="group mt-8 inline-flex items-center gap-2.5 bg-accent px-8 py-4 font-semibold text-paper transition hover:bg-paper hover:text-ink"
          >
            Reserve my free seat
            <span className="transition group-hover:translate-x-1">→</span>
          </button>
        </div>
      </Reveal>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="rule-t px-5 py-10 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 text-sm text-muted sm:flex-row sm:items-center">
        <span className="display text-base text-ink">AI&nbsp;Launchpad <span className="kicker">/ NxtWave</span></span>
        <div className="flex items-center gap-5">
          <a href="/admin" className="kicker transition hover:text-accent">Growth cockpit →</a>
          <span className="kicker">© {new Date().getFullYear()} — Growth Intern Challenge</span>
        </div>
      </div>
    </footer>
  )
}
