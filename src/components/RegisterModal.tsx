import confetti from 'canvas-confetti'
import { AnimatePresence, motion } from 'framer-motion'
import { PartyPopper, Rocket, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { Registrant } from '../lib/store'
import Dashboard from './Dashboard'

function fireConfetti() {
  const colors = ['#8b5cf6', '#22d3ee', '#a3e635', '#fbbf24']
  confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 }, colors })
  setTimeout(() => confetti({ particleCount: 60, angle: 60, spread: 55, origin: { x: 0 }, colors }), 150)
  setTimeout(() => confetti({ particleCount: 60, angle: 120, spread: 55, origin: { x: 1 }, colors }), 150)
}

export default function RegisterModal({
  open,
  onClose,
  me,
  onRegister,
  onAddReferral,
}: {
  open: boolean
  onClose: () => void
  me: Registrant | null
  onRegister: (name: string, college: string) => void
  onAddReferral: () => void
}) {
  const [name, setName] = useState('')
  const [college, setCollege] = useState('')
  const [refCode, setRefCode] = useState('')
  const [justRegistered, setJustRegistered] = useState(false)

  // Prefill referral code from URL (?ref=CODE)
  useEffect(() => {
    const p = new URLSearchParams(location.search).get('ref')
    if (p) setRefCode(p.toUpperCase())
  }, [])

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    onRegister(name, college)
    setJustRegistered(true)
    fireConfetti()
  }

  const showDashboard = me && (justRegistered || me.referrals >= 0)

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.35 }}
            className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-white/10 bg-ink-2 shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/10 transition hover:bg-white/20"
            >
              <X className="h-4 w-4" />
            </button>

            {showDashboard ? (
              <div className="p-6 sm:p-7">
                {justRegistered && (
                  <div className="mb-5 flex items-center gap-3 rounded-2xl bg-lime/10 p-3 text-sm">
                    <PartyPopper className="h-5 w-5 shrink-0 text-lime" />
                    <span>
                      <b>You’re in!</b> Your seat is reserved. Now invite friends to unlock rewards ↓
                    </span>
                  </div>
                )}
                <Dashboard me={me!} onAddReferral={onAddReferral} />
              </div>
            ) : (
              <form onSubmit={submit} className="p-6 sm:p-8">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-violet to-cyan">
                  <Rocket className="h-6 w-6 text-white" />
                </span>
                <h3 className="mt-4 font-display text-2xl font-bold">Reserve your free seat</h3>
                <p className="mt-1 text-sm text-white/55">
                  60 minutes. One real AI project. Zero cost.
                </p>

                <div className="mt-6 space-y-4">
                  <Field label="Full name" value={name} onChange={setName} placeholder="Ananya Kumar" required />
                  <Field
                    label="College"
                    value={college}
                    onChange={setCollege}
                    placeholder="e.g. VIT Vellore"
                    required
                  />
                  <Field
                    label="Referral code (optional)"
                    value={refCode}
                    onChange={setRefCode}
                    placeholder="FRND-AI123"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-6 w-full rounded-2xl bg-gradient-to-r from-violet to-cyan py-3.5 font-semibold text-white transition hover:scale-[1.02] active:scale-95"
                >
                  Confirm my free seat →
                </button>
                <p className="mt-3 text-center text-[11px] text-white/35">
                  By registering you’ll get your own referral code to climb the leaderboard.
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
  label,
  value,
  onChange,
  placeholder,
  required,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  required?: boolean
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-white/50">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm outline-none transition placeholder:text-white/25 focus:border-violet focus:bg-white/[0.07]"
      />
    </label>
  )
}
