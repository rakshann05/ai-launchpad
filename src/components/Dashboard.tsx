import { motion } from 'framer-motion'
import { Check, Copy, Share2, TrendingUp, UserPlus } from 'lucide-react'
import { useState } from 'react'
import { tierFor } from '../lib/data'
import { buildLeaderboard, type Registrant } from '../lib/store'
import { Icon } from './primitives'

export default function Dashboard({
  me,
  onAddReferral,
  compact = false,
}: {
  me: Registrant
  onAddReferral: () => void
  compact?: boolean
}) {
  const [copied, setCopied] = useState(false)
  const { current, next } = tierFor(me.referrals)
  const rank = buildLeaderboard(me).find((r) => r.isMe)?.rank ?? '—'

  const shareUrl = `${location.origin}${location.pathname}?ref=${me.code}`
  const shareText = `I just registered for NxtWave's FREE "Build Your First AI Project in 60 Minutes" workshop 🚀 Use my code ${me.code} and build a real AI project with me. Seats are limited 👉 ${shareUrl}`

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(me.code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      /* ignore */
    }
  }

  const progressToNext = next
    ? Math.min(100, ((me.referrals - current.min) / (next.min - current.min)) * 100)
    : 100

  return (
    <div className={compact ? '' : 'rounded-[2rem] glass p-6 sm:p-8'}>
      {!compact && (
        <div className="mb-6 flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-cyan">Your referral dashboard</div>
            <h3 className="mt-1 font-display text-xl font-bold">Hey {me.name.split(' ')[0]} 👋</h3>
          </div>
          <span
            className="rounded-full px-3 py-1 text-xs font-semibold"
            style={{ background: `${current.color}22`, color: current.color }}
          >
            {current.name}
          </span>
        </div>
      )}

      {/* Stat row */}
      <div className="grid grid-cols-3 gap-3">
        <Stat icon={<UserPlus className="h-4 w-4" />} value={me.referrals} label="referrals" />
        <Stat icon={<TrendingUp className="h-4 w-4" />} value={`#${rank}`} label="rank" />
        <Stat
          icon={<Icon name={current.icon} className="h-4 w-4" />}
          value={current.name}
          label="tier"
          small
        />
      </div>

      {/* Referral code */}
      <div className="mt-5 rounded-2xl border border-white/10 bg-ink-2/60 p-4">
        <div className="text-xs text-white/40">Your referral code</div>
        <div className="mt-1 flex items-center justify-between gap-3">
          <span className="font-display text-2xl font-bold tracking-wider text-gradient">
            {me.code}
          </span>
          <button
            onClick={copy}
            className="inline-flex items-center gap-1.5 rounded-xl bg-white/10 px-3 py-2 text-xs font-semibold transition hover:bg-white/20"
          >
            {copied ? <Check className="h-4 w-4 text-lime" /> : <Copy className="h-4 w-4" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>

      {/* Next tier progress */}
      {next && (
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs text-white/50">
            <span>
              {next.min - me.referrals} more to{' '}
              <span className="font-semibold" style={{ color: next.color }}>
                {next.name}
              </span>
            </span>
            <span>{me.referrals}/{next.min}</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
            <motion.div
              animate={{ width: `${progressToNext}%` }}
              transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.6 }}
              className="h-full rounded-full bg-gradient-to-r from-violet to-cyan"
            />
          </div>
        </div>
      )}

      {/* Share buttons */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        <a
          href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-semibold text-black transition hover:brightness-110"
        >
          <Share2 className="h-4 w-4" /> Share on WhatsApp
        </a>
        <button
          onClick={async () => {
            try {
              if (navigator.share) await navigator.share({ title: 'NxtWave AI Workshop', text: shareText, url: shareUrl })
              else await navigator.clipboard.writeText(shareText)
            } catch {
              /* user dismissed */
            }
          }}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold transition hover:bg-white/20"
        >
          <Copy className="h-4 w-4" /> Copy invite
        </button>
      </div>

      {/* Demo helper */}
      <button
        onClick={onAddReferral}
        className="mt-4 w-full rounded-xl border border-dashed border-white/15 px-4 py-2.5 text-xs text-white/45 transition hover:border-cyan/40 hover:text-cyan"
      >
        ▶ Demo: simulate a friend registering with your code (+1 referral)
      </button>
    </div>
  )
}

function Stat({
  icon,
  value,
  label,
  small,
}: {
  icon: React.ReactNode
  value: React.ReactNode
  label: string
  small?: boolean
}) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-3 text-center">
      <div className="mx-auto mb-1 grid h-7 w-7 place-items-center rounded-lg bg-white/5 text-cyan">
        {icon}
      </div>
      <div className={`font-display font-bold ${small ? 'text-sm' : 'text-xl'}`}>{value}</div>
      <div className="text-[10px] uppercase tracking-wider text-white/40">{label}</div>
    </div>
  )
}
