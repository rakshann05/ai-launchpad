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
import { useRef, type CSSProperties, type ReactNode } from 'react'

export const ICONS: Record<string, LucideIcon> = {
  GraduationCap, Clock, Briefcase, Ticket, Link2, Zap, Crown, Trophy, Rocket, Sparkles, Award,
}

export function Icon({ name, className, style }: { name: string; className?: string; style?: CSSProperties }) {
  const C = ICONS[name] ?? Sparkles
  return <C className={className} style={style} />
}

export function Reveal({
  children,
  delay = 0,
  y = 22,
  className,
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-70px' })
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

// Editorial section header: hairline rule + numbered kicker + big left title.
export function SectionHead({
  index,
  label,
  title,
  sub,
}: {
  index: string
  label: string
  title: ReactNode
  sub?: string
}) {
  return (
    <div className="rule-t pt-6">
      <Reveal>
        <div className="kicker flex items-center gap-3">
          <span className="text-accent">{index}</span>
          <span className="h-px w-8 bg-line-strong/30" />
          <span>{label}</span>
        </div>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="display mt-5 max-w-3xl text-4xl sm:text-5xl md:text-6xl">{title}</h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-xl text-lg text-muted">{sub}</p>
        </Reveal>
      )}
    </div>
  )
}
