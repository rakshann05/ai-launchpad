import confetti from 'canvas-confetti'
import { AnimatePresence, motion } from 'framer-motion'
import { CalendarPlus, Download, PartyPopper, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { downloadIcs, googleCalUrl } from '../lib/calendar'
import type { Me } from '../lib/store'
import Dashboard from './Dashboard'

function fireConfetti() {
  const colors = ['#f0411e', '#16150f', '#e9b949', '#1f7a4d']
  confetti({ particleCount: 90, spread: 70, origin: { y: 0.55 }, colors })
  setTimeout(() => confetti({ particleCount: 55, angle: 60, spread: 55, origin: { x: 0 }, colors }), 150)
  setTimeout(() => confetti({ particleCount: 55, angle: 120, spread: 55, origin: { x: 1 }, colors }), 150)
}

export default function RegisterModal({
  open,
  onClose,
  me,
  referrals,
  rank,
  onRegister,
  onAddReferral,
  busy,
  isLive,
}: {
  open: boolean
  onClose: () => void
  me: Me | null
  referrals: number
  rank: number | null
  onRegister: (name: string, college: string, ref?: string) => Promise<Me>
  onAddReferral: () => void
  busy: boolean
  isLive: boolean
}) {
  const [name, setName] = useState('')
  const [college, setCollege] = useState('')
  const [refCode, setRefCode] = useState('')
  const [justRegistered, setJustRegistered] = useState(false)

  useEffect(() => {
    const p = new URLSearchParams(location.search).get('ref')
    if (p) setRefCode(p.toUpperCase())
  }, [])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onRegister(name, college, refCode)
    setJustRegistered(true)
    fireConfetti()
  }

  const showDashboard = me !== null

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-ink/40 backdrop-blur-[3px]" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.32 }}
            className="relative w-full max-w-md border border-line-strong bg-paper shadow-[8px_8px_0_0_var(--color-ink)]"
          >
            <button
              onClick={onClose}
              className="absolute right-3 top-3 z-10 grid h-8 w-8 place-items-center border border-line-strong bg-paper transition hover:bg-ink hover:text-paper"
            >
              <X className="h-4 w-4" />
            </button>

            {showDashboard ? (
              <div className="p-6">
                {justRegistered && (
                  <div className="mb-5 border border-line-strong">
                    <div className="flex items-center gap-3 rule-b bg-accent/10 p-3 text-sm">
                      <PartyPopper className="h-5 w-5 shrink-0 text-accent" />
                      <span>
                        <b>You're in!</b> Lock the time so you don't miss it — then invite friends ↓
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-px bg-line">
                      <a
                        href={googleCalUrl()}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-2 bg-paper px-3 py-2.5 text-xs font-semibold transition hover:bg-ink hover:text-paper"
                      >
                        <CalendarPlus className="h-4 w-4" /> Google Calendar
                      </a>
                      <button
                        onClick={downloadIcs}
                        className="inline-flex items-center justify-center gap-2 bg-paper px-3 py-2.5 text-xs font-semibold transition hover:bg-ink hover:text-paper"
                      >
                        <Download className="h-4 w-4" /> Apple / .ics
                      </button>
                    </div>
                  </div>
                )}
                <Dashboard me={me!} referrals={referrals} rank={rank} onAddReferral={onAddReferral} isLive={isLive} />
              </div>
            ) : (
              <form onSubmit={submit} className="p-7">
                <span className="kicker"><span className="text-accent">✱</span> Free registration</span>
                <h3 className="display mt-3 text-3xl">Reserve your seat</h3>
                <p className="mt-1.5 text-sm text-muted">60 minutes. One real AI project. Zero cost.</p>

                <div className="mt-6 space-y-4">
                  <Field label="Full name" value={name} onChange={setName} placeholder="Ananya Kumar" required />
                  <Field label="College" value={college} onChange={setCollege} placeholder="e.g. VIT Vellore" required />
                  <Field label="Referral code (optional)" value={refCode} onChange={setRefCode} placeholder="FRND-AI123" mono />
                </div>

                <button
                  type="submit"
                  disabled={busy}
                  className="mt-6 w-full bg-accent py-3.5 font-semibold text-paper transition hover:bg-ink disabled:opacity-60"
                >
                  {busy ? 'Reserving…' : 'Confirm my free seat →'}
                </button>
                <p className="mt-3 text-center text-xs text-faint">
                  You'll get your own referral code to climb the leaderboard.
                </p>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Field({
  label, value, onChange, placeholder, required, mono,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  required?: boolean
  mono?: boolean
}) {
  return (
    <label className="block">
      <span className="kicker mb-1.5 block normal-case tracking-normal text-muted">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className={`w-full border border-line-strong bg-card px-4 py-3 text-sm outline-none transition placeholder:text-faint focus:border-accent focus:ring-2 focus:ring-accent/20 ${mono ? 'nums' : ''}`}
      />
    </label>
  )
}
