import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Rocket } from 'lucide-react'
import { useState } from 'react'
import { FAQ } from '../lib/data'
import { Reveal, SectionHead } from './primitives'

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section className="relative px-5 py-24">
      <div className="mx-auto max-w-2xl">
        <SectionHead eyebrow="FAQ" title="Quick questions" />
        <div className="space-y-3">
          {FAQ.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.05}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full rounded-2xl glass p-5 text-left transition hover:border-white/20"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="font-medium">{f.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-white/40 transition ${open === i ? 'rotate-180' : ''}`}
                  />
                </div>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden text-sm text-white/55"
                    >
                      <span className="block pt-3">{f.a}</span>
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
    <section className="relative px-5 py-24">
      <Reveal>
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-violet/20 via-ink-2 to-cyan/15 p-10 text-center sm:p-16">
          <div className="pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full bg-violet/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-cyan/30 blur-3xl" />
          <h2 className="relative font-display text-3xl font-bold sm:text-5xl">
            Your first AI project is <span className="text-gradient">one hour away.</span>
          </h2>
          <p className="relative mx-auto mt-4 max-w-md text-white/60">
            Free seat, real project, live link for your resume. Bring a friend and climb the board.
          </p>
          <button
            onClick={onRegister}
            className="relative mt-8 inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 font-semibold text-ink transition hover:scale-[1.03] active:scale-95"
          >
            <Rocket className="h-5 w-5" /> Reserve my free seat
          </button>
        </div>
      </Reveal>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-white/5 px-5 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-white/40 sm:flex-row">
        <span>© {new Date().getFullYear()} AI Launchpad · A NxtWave growth demo</span>
        <span className="text-xs">
          Built for the NxtWave Growth Intern Challenge · referral growth engine
        </span>
      </div>
    </footer>
  )
}
