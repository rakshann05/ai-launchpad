# AI + Learning Notes

How I used AI while building this — and, importantly, where I **overrode** it. The challenge rewards
judgment *with* AI available, so these are the decisions, not just the prompts.

---

### Example 1 — Choosing the asset

- **What I asked:** "For a 7-day, ₹2,000 campaign to get 500 students to register for a free workshop,
  what one asset should I build?"
- **What AI suggested:** A conversion-optimised **landing page** with a hero, countdown, and form.
- **What I changed:** The brief literally warns *"everyone might build a landing page."* A page can't
  create reach, and ₹2,000 can't buy 500 signups. I turned the asset into a **referral growth loop**
  where each registrant becomes a channel (personal code + leaderboard + reward tiers). The landing
  page became just the entry point to the loop.

---

### Example 2 — Budget allocation

- **What I asked:** "How should I split ₹2,000 across the 7 days?"
- **What AI suggested:** Put ~all of it into Instagram/Meta ads for maximum impressions.
- **What I changed:** Ads buy a **one-time spike**, not a compounding loop. I capped paid at ~₹1,600 as
  a *seed* to light the first ~150 registrants, reserved ₹400 for **referral rewards** (the thing that
  actually keeps the loop spinning), and made WhatsApp + club seeding (₹0) the primary engine.

---

### Example 3 — Channel strategy

- **What I asked:** "Which marketing channels for final-year engineering students in India?"
- **What AI suggested:** A broad list — email blasts, LinkedIn outreach, Discord, SEO blog posts, and
  20+ micro-influencer collabs.
- **What I changed:** The brief says *"Prioritise. Don't give us 20 ideas."* Spreading ₹2,000 and 7
  days across 6 channels starves the referral loop. I cut to **WhatsApp (primary) + coding clubs +
  a tiny IG seed**, because that's where this exact audience already congregates and trusts.

---

### Example 4 — Reward design (product)

- **What I asked:** "Design a referral reward ladder for a free workshop."
- **What AI suggested:** Cash/Amazon vouchers per referral.
- **What I changed:** Cash attracts the wrong, extrinsic crowd and burns the ₹2,000 instantly. I made
  the rewards **status + career value** — project templates, Q&A priority, a certificate, a 1:1 mentor
  review, and a community-wall feature. These cost ~₹0, map to what the audience actually wants
  (placement proof), and keep the loop intrinsically motivated.

---

### Example 5 — Technical (building the asset)

- **What I asked:** "Best way to make the leaderboard and referral tracking live in the demo?"
- **What AI suggested:** Stand up a full backend (DB + auth + API) before anything renders.
- **What I changed:** For a 48-hour build + reviewable demo, I used a `localStorage` data layer with a
  clean seam (`src/lib/store.ts`) so the exact same UI swaps to a real API with no component changes.
  Shipped a working, interactive demo *now*; documented the productionization path. **Bias to ship.**

---

**Meta-learning:** AI is excellent at breadth (every option) and terrible at the *constraint*. My job
was to hold the ₹2,000 / 7-day / "one loop, not 20 ideas" box and reject anything that didn't compound
inside it. Every rejection above was a constraint decision AI didn't make for me.
