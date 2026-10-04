import { motion } from 'framer-motion'
import { Rocket } from 'lucide-react'

export default function Nav({ onRegister }: { onRegister: () => void }) {
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="mx-auto mt-4 flex max-w-6xl items-center justify-between rounded-2xl glass px-4 py-3 sm:px-6">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-violet to-cyan">
            <Rocket className="h-5 w-5 text-white" />
          </span>
          <span className="font-display text-sm font-bold tracking-tight">
            AI&nbsp;Launchpad<span className="text-white/40"> · NxtWave</span>
          </span>
        </a>
        <nav className="hidden items-center gap-7 text-sm text-white/60 md:flex">
          <a href="#why" className="transition hover:text-white">Why</a>
          <a href="#agenda" className="transition hover:text-white">Agenda</a>
          <a href="#rewards" className="transition hover:text-white">Rewards</a>
          <a href="#leaderboard" className="transition hover:text-white">Leaderboard</a>
        </nav>
        <button
          onClick={onRegister}
          className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-ink transition hover:scale-[1.03] active:scale-95"
        >
          Claim free seat
        </button>
      </div>
    </motion.header>
  )
}
