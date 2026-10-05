import { motion } from 'framer-motion'
import { Check, Copy, Share2 } from 'lucide-react'
import { useState } from 'react'
import { tierFor } from '../lib/data'
import type { Me } from '../lib/store'

export default function Dashboard({
  me,
  referrals,
  rank,
  onAddReferral,
  isLive,
  compact = false,
}: {
  me: Me
  referrals: number
  rank: number | null
  onAddReferral: () => void
  isLive: boolean
  compact?: boolean
}) {
  const [copied, setCopied] = useState(false)
  const { current, next } = tierFor(referrals)

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

  const progressToNext = next ? Math.min(100, ((referrals - current.min) / (next.min - current.min)) * 100) : 100

  return (
    <div className={compact ? '' : 'border border-line-strong bg-card'}>
      {!compact && (
        <div className="rule-b flex items-center justify-between bg-ink px-6 py-4 text-paper">
          <div>
            <div className="kicker text-paper/60">Your referral dashboard</div>
            <div className="display mt-0.5 text-xl">Hey {me.name.split(' ')[0]} 👋</div>
          </div>
          <span className="border border-paper/30 px-3 py-1 text-xs font-bold uppercase tracking-wider">
            {current.name}
          </span>
        </div>
      )}

      <div className={compact ? '' : 'p-6'}>
        {/* stat row */}
        <div className="grid grid-cols-3 border border-line divide-x divide-line">
          <Stat value={referrals} label="referrals" />
          <Stat value={rank ? `#${rank}` : '—'} label="rank" />
          <Stat value={current.name} label="tier" small />
        </div>

        {/* referral code */}
        <div className="mt-5 border border-line-strong">
          <div className="rule-b px-4 py-2">
            <span className="kicker">Your referral code</span>
          </div>
          <div className="flex items-center justify-between gap-3 px-4 py-3">
            <span className="nums text-2xl font-bold text-accent">{me.code}</span>
            <button
              onClick={copy}
              className="inline-flex items-center gap-1.5 border border-line-strong px-3 py-2 text-xs font-semibold transition hover:bg-ink hover:text-paper"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>

        {/* next tier */}
        {next && (
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-muted">
              <span>
                {next.min - referrals} more to <span className="font-semibold text-ink">{next.name}</span>
              </span>
              <span className="nums">{referrals}/{next.min}</span>
            </div>
            <div className="mt-2 h-1.5 w-full bg-line">
              <motion.div
                animate={{ width: `${progressToNext}%` }}
                transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.6 }}
                className="h-full bg-accent"
              />
            </div>
          </div>
        )}

        {/* share */}
        <div className="mt-5 grid grid-cols-2 gap-px bg-line">
          <a
            href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-accent px-4 py-3 text-sm font-semibold text-paper transition hover:bg-ink"
          >
            <Share2 className="h-4 w-4" /> WhatsApp
          </a>
          <button
            onClick={async () => {
              try {
                if (navigator.share) await navigator.share({ title: 'NxtWave AI Workshop', text: shareText, url: shareUrl })
                else await navigator.clipboard.writeText(shareText)
              } catch {
                /* dismissed */
              }
            }}
            className="inline-flex items-center justify-center gap-2 bg-ink px-4 py-3 text-sm font-semibold text-paper transition hover:bg-accent"
          >
            <Copy className="h-4 w-4" /> Copy invite
          </button>
        </div>

        {/* demo */}
        <button
          onClick={onAddReferral}
          className="mt-4 w-full border border-dashed border-line-strong px-4 py-2.5 text-xs text-muted transition hover:border-accent hover:text-accent"
        >
          ▶ {isLive ? 'Demo: add a real referral under your code (+1)' : 'Demo: simulate a friend registering (+1)'}
        </button>
      </div>
    </div>
  )
}

function Stat({ value, label, small }: { value: React.ReactNode; label: string; small?: boolean }) {
  return (
    <div className="bg-paper px-3 py-4 text-center">
      <div className={`display ${small ? 'text-base' : 'nums text-2xl'}`}>{value}</div>
      <div className="kicker mt-1 text-[0.6rem]">{label}</div>
    </div>
  )
}
