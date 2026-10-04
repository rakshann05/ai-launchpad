import { motion, useInView } from 'framer-motion'
import {
  Award,
  Briefcase,
  Clock,
  Crown,
  GraduationCap,
  Link2,
  Rocket,
  Sparkles,
  Ticket,
  Trophy,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import { useRef, type ReactNode } from 'react'

export const ICONS: Record<string, LucideIcon> = {
  GraduationCap,
  Clock,
  Briefcase,
  Ticket,
  Link2,
  Zap,
  Crown,
  Trophy,
  Rocket,
  Sparkles,
  Award,
}

export function Icon({ name, className }: { name: string; className?: string }) {
  const C = ICONS[name] ?? Sparkles
  return <C className={className} />
}

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium tracking-wide text-white/70">
      {children}
    </span>
  )
}

export function SectionHead({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string
  title: ReactNode
  sub?: string
}) {
  return (
    <div className="mx-auto mb-14 max-w-2xl text-center">
      <Reveal>
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-violet">
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
          {title}
        </h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.1}>
          <p className="mt-4 text-base text-white/55">{sub}</p>
        </Reveal>
      )}
    </div>
  )
}
