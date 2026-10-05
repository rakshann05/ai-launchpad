// ─────────────────────────────────────────────────────────────
// Workshop + campaign content. Single source of truth for copy.
// ─────────────────────────────────────────────────────────────

export const WORKSHOP = {
  title: 'Build Your First AI Project in 60 Minutes',
  host: 'NxtWave',
  // Target used by the progress bar — the exact challenge goal.
  goal: 500,
  priceLabel: '100% Free',
  // Workshop date: next Saturday-ish. Rendered live via countdown.
  dateISO: nextWeekendISO(),
  seatsTotal: 600,
}

function nextWeekendISO(): string {
  const now = new Date()
  const d = new Date(now)
  // 6 days out at 6:00 PM local — keeps the countdown meaningful.
  d.setDate(now.getDate() + 6)
  d.setHours(18, 0, 0, 0)
  return d.toISOString()
}

export const AUDIENCE = [
  {
    icon: 'GraduationCap',
    title: 'Final-year B.Tech / B.E.',
    body: 'CSE, IT, ECE & allied branches staring down placements with a thin GitHub.',
  },
  {
    icon: 'Clock',
    title: 'Short on time, big on FOMO',
    body: '“Everyone is doing AI.” They want in — but tutorials are 8 hours long and they stall.',
  },
  {
    icon: 'Briefcase',
    title: 'Placement-season anxious',
    body: 'One real, demoable project changes the resume. 60 minutes is a bet they will take.',
  },
]

export const WHY = [
  {
    stat: '1',
    label: 'real project',
    body: 'Leave with a working AI app pushed to your GitHub — not notes, a deliverable.',
  },
  {
    stat: '60',
    label: 'minutes',
    body: 'Built for a lunch break. Live, guided, no 10-hour course guilt.',
  },
  {
    stat: '₹0',
    label: 'to join',
    body: 'Free, but seats are capped. Referrals jump you up the waitlist.',
  },
]

export const AGENDA = [
  { t: '0–10 min', title: 'The 60-minute mindset', body: 'Pick a project you can actually finish. Scope like an engineer.' },
  { t: '10–35 min', title: 'Build it live', body: 'Prompt → code → run. A real AI feature wired end to end.' },
  { t: '35–50 min', title: 'Ship & deploy', body: 'Push to GitHub, get a live link you can put on a resume.' },
  { t: '50–60 min', title: 'Make it yours', body: 'Ideas to extend it this week + how to talk about it in interviews.' },
]

// Referral reward tiers — the gamification spine.
export const TIERS = [
  { min: 0, name: 'Starter', perk: 'Confirmed seat + workshop kit', color: '#94a3b8', icon: 'Ticket' },
  { min: 1, name: 'Connector', perk: 'Early-access project templates', color: '#22d3ee', icon: 'Link2' },
  { min: 3, name: 'Amplifier', perk: 'Live Q&A priority + certificate', color: '#8b5cf6', icon: 'Zap' },
  { min: 5, name: 'Campus Lead', perk: '1:1 mentor review of your project', color: '#a3e635', icon: 'Crown' },
  { min: 10, name: 'Legend', perk: 'Featured on the NxtWave community wall', color: '#fbbf24', icon: 'Trophy' },
]

export function tierFor(referrals: number) {
  let current = TIERS[0]
  for (const t of TIERS) if (referrals >= t.min) current = t
  const next = TIERS.find((t) => t.min > referrals) ?? null
  return { current, next }
}

export const FAQ = [
  {
    q: 'Do I need prior AI or ML experience?',
    a: 'No. If you can write a basic program, you can follow along. We handle the AI parts live.',
  },
  {
    q: 'What do I actually walk away with?',
    a: 'A working AI project on your GitHub with a live link — something you can demo in interviews the same day.',
  },
  {
    q: 'Is it really free? What’s the catch?',
    a: 'Fully free. Seats are limited to keep it interactive, so inviting friends bumps you up the list.',
  },
  {
    q: 'How do referrals work?',
    a: 'Register to get a personal code. Every friend who registers with it counts — unlocking reward tiers and climbing the leaderboard.',
  },
]

// Seed leaderboard so an empty page still feels alive (demo mode).
// Codes mirror supabase/schema.sql so live + demo stay consistent.
export const SEED_LEADERS = [
  { code: 'AARV-AI100', name: 'Aarav S.', college: 'VIT', referrals: 14 },
  { code: 'PRIY-AI101', name: 'Priya R.', college: 'SRM', referrals: 11 },
  { code: 'KART-AI102', name: 'Karthik M.', college: 'IIIT-H', referrals: 9 },
  { code: 'SNEH-AI103', name: 'Sneha P.', college: 'BITS', referrals: 7 },
  { code: 'RAHU-AI104', name: 'Rahul D.', college: 'NIT-W', referrals: 6 },
  { code: 'ANAN-AI105', name: 'Ananya K.', college: 'Amrita', referrals: 5 },
  { code: 'VIKR-AI106', name: 'Vikram N.', college: 'Anna Univ.', referrals: 4 },
  { code: 'DIVY-AI107', name: 'Divya T.', college: 'MIT Manipal', referrals: 3 },
]

// Baseline registrations already "in" — drives the goal bar (demo).
export const BASE_REGISTRATIONS = 327
