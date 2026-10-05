import { AGENDA, AUDIENCE, WHY } from '../lib/data'
import { Icon, Reveal, SectionHead } from './primitives'

export function Audience() {
  return (
    <section className="relative px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          index="01"
          label="Who it's for"
          title={<>Built for the student <span className="ed-serif">running out of runway.</span></>}
          sub="Final-year engineers who need one real project before placements — not another 8-hour course they'll never finish."
        />
        <div className="mt-12 grid gap-px bg-line sm:grid-cols-3">
          {AUDIENCE.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.08} className="bg-paper">
              <div className="group h-full bg-paper p-7 transition hover:bg-card">
                <div className="flex items-center justify-between">
                  <span className="grid h-10 w-10 place-items-center border border-line-strong">
                    <Icon name={a.icon} className="h-5 w-5" />
                  </span>
                  <span className="nums text-sm text-faint">0{i + 1}</span>
                </div>
                <h3 className="display mt-6 text-xl">{a.title}</h3>
                <p className="mt-2.5 text-[0.95rem] leading-relaxed text-muted">{a.body}</p>
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
    <section id="why" className="relative px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          index="02"
          label="Why register"
          title={<>Why they'll actually <span className="ed-serif">show up.</span></>}
          sub="The offer is engineered around the three things a final-year student cares about most."
        />
        <div className="mt-12 grid gap-px bg-line md:grid-cols-3">
          {WHY.map((w, i) => (
            <Reveal key={w.label} delay={i * 0.08}>
              <div className="h-full bg-paper p-8">
                <div className="flex items-baseline gap-2">
                  <span className="display text-7xl text-accent">{w.stat}</span>
                  <span className="kicker">{w.label}</span>
                </div>
                <p className="mt-5 text-[0.95rem] leading-relaxed text-muted">{w.body}</p>
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
    <section id="agenda" className="relative px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <SectionHead
          index="03"
          label="The 60 minutes"
          title={<>One hour, <span className="ed-serif">one shipped project.</span></>}
        />
        <div className="mt-12">
          {AGENDA.map((a, i) => (
            <Reveal key={a.t} delay={i * 0.05}>
              <div className="rule-t grid grid-cols-[auto_1fr] items-start gap-5 py-6 sm:grid-cols-[6rem_auto_1fr] sm:gap-8">
                <span className="nums text-sm text-accent sm:pt-1">{a.t}</span>
                <span className="display hidden text-2xl text-faint sm:block">0{i + 1}</span>
                <div>
                  <h3 className="display text-xl">{a.title}</h3>
                  <p className="mt-1.5 text-[0.95rem] text-muted">{a.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
          <div className="rule-t" />
        </div>
      </div>
    </section>
  )
}
