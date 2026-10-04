<div align="center">

# 🚀 AI Launchpad — Referral Growth Engine

**NxtWave Growth Intern Challenge · Round 1 · "Build One Thing"**

A gamified, referral-powered registration platform for the free workshop
**"Build Your First AI Project in 60 Minutes."**

Not just a landing page — a **growth loop**: register → get a personal referral code →
invite friends → climb the live leaderboard → unlock reward tiers → drive the campaign to **500**.

### [🌐 &nbsp;Live Demo &nbsp;→](https://nxtwave-ai-launchpad.vercel.app)

[Why this instead of a landing page](#why-this-is-more-than-a-landing-page) ·
[Run it](#run-it-locally) · [Deploy a live link](#deploy-a-live-link) ·
[Growth Plan](docs/GROWTH-PLAN.md) · [AI Notes](docs/AI-NOTES.md)

<br />

![AI Launchpad preview](public/og.png)

</div>

---

## The brief, in one line

> Get **500 final-year engineering students** to register for a free 60-minute AI workshop.
> Budget **₹2,000**, **7 days**, any AI tools. Build **one working asset**.

The challenge hints that *"everyone might build a landing page."* So this asset combines **three** of
the suggested builds into one product — a landing page **+** referral code & tracker **+** in-page
engagement tooling — because the viral referral loop is the only mechanism that turns ₹2,000 and 7
days into 500 registrations without paid ads carrying the whole load.

## Why this is more than a landing page

| Everyone's landing page | This growth engine |
| --- | --- |
| One-way: visit → maybe register | **Two-way loop**: register → *you become a channel* |
| Flat CTA | **Personal referral code** generated on sign-up (`RAKS-AI430`) |
| No reason to share | **5 reward tiers** + **live leaderboard** make sharing a game |
| No progress signal | **Live 0→500 goal bar** creates collective momentum & urgency |
| Static | **WhatsApp 1-tap share**, `?ref=` attribution, state persisted |

**The math it unlocks:** if 170 students each bring just 2 friends, that's 340 referred + 170 = **510 registrations** — the 500 target hit almost entirely through earned/organic reach, keeping the ₹2,000 for a tiny seed push to the first ~150 registrants. (See [Growth Plan](docs/GROWTH-PLAN.md).)

## ✨ Features

- **Live countdown** to the workshop
- **One-click registration** → auto-generated personal referral code
- **Referral dashboard** — your invites, live rank, current tier, next-tier progress
- **Live leaderboard** with animated podium (you appear and climb in real time)
- **Progress-to-500 goal bar** — the exact campaign target, with animated count-up
- **5 gamified reward tiers** (Starter → Legend) that unlock as you refer
- **WhatsApp / native share** with pre-written invite copy + `?ref=CODE` attribution
- **"Extreme UI"** — glassmorphism, animated gradient mesh, scroll reveals, confetti, full dark theme, fully responsive

## 🛠 Tech stack

- **React 18 + TypeScript** (Vite 6)
- **Tailwind CSS v4** (CSS-first config)
- **Framer Motion** for animation
- **canvas-confetti**, **lucide-react** icons
- Fonts: Space Grotesk (display) + Inter

## Run it locally

```bash
npm install
npm run dev     # http://localhost:5173
```

```bash
npm run build   # type-check + production build to /dist
npm run preview # preview the production build
```

## Deploy a live link

The app is a static SPA — deploy `dist/` anywhere. Fastest options (free):

- **Vercel:** `npm i -g vercel && vercel` (framework auto-detected as Vite)
- **Netlify:** build command `npm run build`, publish directory `dist`
- **GitHub Pages:** push, then serve `dist/` via an action

## How the referral tracking works (and productionizing it)

For a self-contained, zero-backend demo, the current user's registration and referral activity are
persisted in `localStorage` (see [`src/lib/store.ts`](src/lib/store.ts)), and the leaderboard merges
seed data with the live user. The **"▶ Demo: simulate a friend registering"** button lets a reviewer
watch the tracker, tiers, and rank update instantly.

To make referrals real across users, swap the `store.ts` functions for API calls:
`register()` → `POST /registrations` returning a code; `?ref=CODE` → attribute on the referrer;
leaderboard → `GET /leaderboard`. The UI does not change — only the data layer.

## Project structure

```
src/
├─ App.tsx                 # page composition + modal state
├─ lib/
│  ├─ data.ts              # all copy, tiers, agenda, FAQ, seed data
│  └─ store.ts             # registration + referral logic, countdown hook
└─ components/
   ├─ Background.tsx       # animated gradient mesh + grid
   ├─ Nav.tsx  Hero.tsx    # nav + hero with countdown
   ├─ GoalBar.tsx          # animated 0→500 progress
   ├─ Sections.tsx         # audience / why / agenda
   ├─ Tiers.tsx            # reward tiers
   ├─ Leaderboard.tsx      # podium + ranked list
   ├─ RegisterModal.tsx    # registration + confetti
   ├─ Dashboard.tsx        # referral tracker
   └─ FaqFooter.tsx        # FAQ + final CTA + footer
```

## Deliverables for the challenge

- **Working asset:** this app ✅
- **Growth Plan (≤2 pages):** [`docs/GROWTH-PLAN.md`](docs/GROWTH-PLAN.md)
- **AI + Learning Notes:** [`docs/AI-NOTES.md`](docs/AI-NOTES.md)
- **3-minute video:** record a walkthrough of this app + the plan

---

<div align="center">
Built for the NxtWave Growth Intern Challenge.
</div>
