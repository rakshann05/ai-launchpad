import { useState } from 'react'
import Background from './components/Background'
import Dashboard from './components/Dashboard'
import { Faq, FinalCta, Footer } from './components/FaqFooter'
import GoalBar from './components/GoalBar'
import Hero from './components/Hero'
import Leaderboard from './components/Leaderboard'
import Nav from './components/Nav'
import RegisterModal from './components/RegisterModal'
import { Agenda, Audience, Why } from './components/Sections'
import { Reveal } from './components/primitives'
import Tiers from './components/Tiers'
import { WORKSHOP } from './lib/data'
import { totalRegistrations, useRegistrant } from './lib/store'

export default function App() {
  const { me, register, addReferral } = useRegistrant()
  const [modalOpen, setModalOpen] = useState(false)

  const total = totalRegistrations(me)
  const seatsLeft = Math.max(12, WORKSHOP.seatsTotal - total)

  const openModal = () => setModalOpen(true)

  return (
    <div className="relative min-h-screen">
      <Background />
      <Nav onRegister={openModal} />

      <main>
        <Hero onRegister={openModal} me={me} seatsLeft={seatsLeft} />
        <GoalBar total={total} />
        <Audience />
        <Why />

        {/* Live personal dashboard once registered */}
        {me && (
          <section className="relative px-5 py-10">
            <div className="mx-auto max-w-2xl">
              <Reveal>
                <Dashboard me={me} onAddReferral={addReferral} />
              </Reveal>
            </div>
          </section>
        )}

        <Agenda />
        <Tiers me={me} />
        <Leaderboard me={me} />
        <Faq />
        <FinalCta onRegister={openModal} />
      </main>

      <Footer />

      <RegisterModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        me={me}
        onRegister={register}
        onAddReferral={addReferral}
      />
    </div>
  )
}
