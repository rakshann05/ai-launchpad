import { AGENDA, AUDIENCE, WHY } from '../lib/data'
import { Icon, Reveal, SectionHead } from './primitives'

export function Audience() {
  return (
    <section className="relative px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          eyebrow="Who this is for"
          title={<>Built for the student <span className="text-gradient">running out of runway</span></>}
          sub="Final-year engineers who need one real project before placements — not another 8-hour course they will never finish."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {AUDIENCE.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.08}>
              <div className="group h-full rounded-3xl glass p-7 transition hover:-translate-y-1 hover:border-white/20">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-violet/30 to-cyan/20 ring-1 ring-white/10">
                  <Icon name={a.icon} className="h-6 w-6 text-cyan" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{a.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Why() {
  return (
    <section id="why" className="relative px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          eyebrow="Why register"
          title={<>Why they will actually <span className="text-gradient">show up</span></>}
          sub="The offer is engineered around the three things a final-year student cares about most."
        />
        <div className="grid gap-5 sm:grid-cols-3">
          {WHY.map((w, i) => (
            <Reveal key={w.label} delay={i * 0.08}>
              <div className="relative overflow-hidden rounded-3xl glass p-8 text-center">
                <div className="font-display text-6xl font-bold text-gradient">{w.stat}</div>
                <div className="mt-1 text-xs uppercase tracking-[0.25em] text-white/40">
                  {w.label}
                </div>
                <p className="mt-4 text-sm text-white/60">{w.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Agenda() {
  return (
    <section id="agenda" className="relative px-5 py-24">
      <div className="mx-auto max-w-4xl">
        <SectionHead
          eyebrow="The 60 minutes"
          title={<>One hour, <span className="text-gradient">one shipped project</span></>}
        />
        <div className="relative space-y-4 before:absolute before:left-[1.35rem] before:top-2 before:h-[calc(100%-2rem)] before:w-px before:bg-gradient-to-b before:from-violet before:to-cyan">
          {AGENDA.map((a, i) => (
            <Reveal key={a.t} delay={i * 0.06}>
              <div className="flex gap-5">
                <span className="z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ink font-display text-sm font-bold ring-2 ring-violet/50">
                  {i + 1}
                </span>
                <div className="flex-1 rounded-2xl glass p-5">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-display font-semibold">{a.title}</h3>
                    <span className="rounded-full bg-white/5 px-2.5 py-0.5 text-[11px] font-medium text-cyan">
                      {a.t}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm text-white/55">{a.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
