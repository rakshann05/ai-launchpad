import { motion } from 'framer-motion'

export default function Nav({ onRegister }: { onRegister: () => void }) {
  return (
    <motion.header
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 rule-b bg-paper/85 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 sm:px-8">
        <a href="#top" className="flex items-baseline gap-2.5">
          <span className="grid h-6 w-6 translate-y-1 place-items-center bg-accent text-paper">
            <span className="text-[13px] font-bold leading-none">↗</span>
          </span>
          <span className="display text-lg tracking-tight">AI&nbsp;Launchpad</span>
          <span className="kicker hidden sm:inline">/ NxtWave</span>
        </a>
        <nav className="hidden items-center gap-7 text-sm text-muted md:flex">
          <a href="#why" className="transition hover:text-ink">Why</a>
          <a href="#agenda" className="transition hover:text-ink">Agenda</a>
          <a href="#rewards" className="transition hover:text-ink">Rewards</a>
          <a href="#leaderboard" className="transition hover:text-ink">Leaderboard</a>
        </nav>
        <button
          onClick={onRegister}
          className="group inline-flex items-center gap-2 bg-ink px-4 py-2 text-sm font-semibold text-paper transition hover:bg-accent"
        >
          Claim free seat
          <span className="transition group-hover:translate-x-0.5">→</span>
        </button>
      </div>
    </motion.header>
  )
}
