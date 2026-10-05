import { useState } from 'react'
import Background from './components/Background'
import Dashboard from './components/Dashboard'
import { Faq, FinalCta, Footer } from './components/FaqFooter'
import GoalBar from './components/GoalBar'
import Hero from './components/Hero'
import Leaderboard from './components/Leaderboard'
import Nav from './components/Nav'
import { Reveal } from './components/primitives'
import RegisterModal from './components/RegisterModal'
import { Agenda, Audience, Why } from './components/Sections'
import Tiers from './components/Tiers'
import { WORKSHOP } from './lib/data'
import { useCampaign } from './lib/store'

export default function App() {
  const { me, myReferrals, myRank, total, leaders, loading, busy, isLive, register, addReferral } = useCampaign()
  const [modalOpen, setModalOpen] = useState(false)
  const seatsLeft = Math.max(12, WORKSHOP.seatsTotal - total)
  const openModal = () => setModalOpen(true)

  return (
    <div className="relative min-h-screen">
      <Background />
      <Nav onRegister={openModal} />

      <main>
        <Hero onRegister={openModal} me={me} seatsLeft={seatsLeft} total={total} />
        <GoalBar total={total} />
        <Audience />
        <Why />

        {me && (
          <section className="relative px-5 py-10 sm:px-8">
            <div className="mx-auto max-w-2xl">
              <Reveal>
                <Dashboard me={me} referrals={myReferrals} rank={myRank} onAddReferral={addReferral} isLive={isLive} />
              </Reveal>
            </div>
          </section>
        )}

        <Agenda />
        <Tiers referrals={myReferrals} registered={me !== null} />
        <Leaderboard leaders={leaders} loading={loading} />
        <Faq />
        <FinalCta onRegister={openModal} />
      </main>

      <Footer />

      <RegisterModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        me={me}
        referrals={myReferrals}
        rank={myRank}
        onRegister={register}
        onAddReferral={addReferral}
        busy={busy}
        isLive={isLive}
      />
    </div>
  )
}
