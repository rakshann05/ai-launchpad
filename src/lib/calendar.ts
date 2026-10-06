import { WORKSHOP } from './data'

// ─────────────────────────────────────────────────────────────
// Calendar helpers — turn a registration into attendance.
// 60-minute workshop event, as a Google Calendar link and a
// downloadable .ics (Apple Calendar / Outlook).
// ─────────────────────────────────────────────────────────────

const TITLE = `NxtWave — ${WORKSHOP.title}`
const DETAILS =
  'Your free live workshop. Build a real AI project in 60 minutes and get a live link for your resume. Keep an eye on your email for the join link.'

function pad(n: number) {
  return String(n).padStart(2, '0')
}

// UTC timestamp in the compact form calendars expect: YYYYMMDDTHHMMSSZ
function toCalUTC(d: Date) {
  return (
    d.getUTCFullYear() +
    pad(d.getUTCMonth() + 1) +
    pad(d.getUTCDate()) +
    'T' +
    pad(d.getUTCHours()) +
    pad(d.getUTCMinutes()) +
    pad(d.getUTCSeconds()) +
    'Z'
  )
}

function startEnd() {
  const start = new Date(WORKSHOP.dateISO)
  const end = new Date(start.getTime() + 60 * 60 * 1000)
  return { start, end }
}

export function googleCalUrl(): string {
  const { start, end } = startEnd()
  const p = new URLSearchParams({
    action: 'TEMPLATE',
    text: TITLE,
    dates: `${toCalUTC(start)}/${toCalUTC(end)}`,
    details: DETAILS,
    location: 'Online · link emailed before the workshop',
  })
  return `https://calendar.google.com/calendar/render?${p.toString()}`
}

export function downloadIcs() {
  const { start, end } = startEnd()
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//AI Launchpad//NxtWave Workshop//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${Date.now()}@ai-launchpad`,
    `DTSTAMP:${toCalUTC(new Date())}`,
    `DTSTART:${toCalUTC(start)}`,
    `DTEND:${toCalUTC(end)}`,
    `SUMMARY:${TITLE}`,
    `DESCRIPTION:${DETAILS}`,
    'LOCATION:Online — link emailed before the workshop',
    'BEGIN:VALARM',
    'TRIGGER:-PT60M',
    'ACTION:DISPLAY',
    'DESCRIPTION:Workshop starts in 1 hour',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'ai-launchpad-workshop.ics'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
