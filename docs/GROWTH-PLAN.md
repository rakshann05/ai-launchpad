# Growth Plan — 500 Registrations in 7 Days

**Workshop:** *Build Your First AI Project in 60 Minutes* (free, live)
**Goal:** 500 final-year engineering students registered · **Budget:** ₹2,000 · **Window:** 7 days

---

## 1. Understand the student

**Who exactly:** Final-year B.Tech/B.E. students (CSE, IT, ECE and allied) in Tier-2/Tier-3 colleges,
3–8 months from placements, with a thin GitHub and a vague "I should learn AI" anxiety.

**Why they care (the real emotion):** Placement season is here and their resume has *coursework, not
proof*. "Everyone is doing AI projects." They don't need another 10-hour course they'll abandon by
video 3 — they need **one finished, demoable thing, fast**.

**What makes them register:**
1. **Low time cost** — 60 minutes, not a semester.
2. **A tangible outcome** — a real AI app on their GitHub + a live link for the resume *today*.
3. **Social proof + FOMO** — friends and classmates are registering; seats are limited.
4. **Zero price, low risk** — free, no prerequisites.

> Insight that shaped everything: a final-year student's scarcest resource isn't money, it's
> **believable, finishable proof of skill before placements**. The offer and the asset both sell that.

---

## 2. The campaign plan (prioritised — not 20 ideas, 1 engine + 3 channels)

**The engine: a referral growth loop.** With ₹2,000 you cannot *buy* 500 registrations. You can only
*seed* a few hundred and let students bring the rest. So the whole plan is built around making every
registrant a channel. (This is the asset I built — see below.)

**Channel 1 — WhatsApp (the primary engine). ~60% of registrations.**
*What:* Seed the landing page into final-year **class/section/placement WhatsApp groups** via 15–20
student "campus leads." Each registrant gets a personal code + a 1-tap pre-written WhatsApp invite.
*Why it works:* WhatsApp groups are where this exact audience already coordinates placements — trust +
reach are built in, and the referral loop compounds inside them with zero CAC.

**Channel 2 — College coding clubs / chapters (GDSC, CodeChef, IEEE). ~25%.**
*What:* DM 10–12 club leads a ready-to-post bundle (poster + caption + their club's own tracked
referral link). They post to their members; we attribute via `?ref=`.
*Why it works:* One message to a club = hundreds of relevant students, delivered by a trusted source.
Clubs *want* free value for their members.

**Channel 3 — A tiny paid seed on Instagram. ~15%, ~₹2,000.**
*What:* ₹2,000 on a sharp Instagram Reel/story targeting final-year CS students in a few cities — only
to light the fuse for the first ~150 registrants, who then refer.
*Why it works:* Paid isn't the plan, it's the *spark*. Earned referral reach carries the rest.

**Deliberately cut:** generic email blasts, LinkedIn cold outreach, 20-influencer deals, SEO content —
all too slow or too expensive for a 7-day, ₹2,000 constraint.

### Budget (₹2,000)
| Line | ₹ | Purpose |
| --- | ---: | --- |
| Instagram seed ads | 1,600 | Spark first ~150 registrants |
| Reward fulfilment (templates, certificates, swag for top referrers) | 400 | Fuel the referral loop |
| Landing page / tools | 0 | Built with AI, hosted free |

### How the 500 come in (the math)
| Day | Lever | New regs | Cumulative |
| ---: | --- | ---: | ---: |
| 1–2 | IG seed + 15 campus leads seed WhatsApp | 150 | 150 |
| 3–4 | Referral loop + club posts | 180 | 330 |
| 5–6 | Leaderboard race (reward tiers kick in) | 130 | 460 |
| 7 | "Seats almost full" + last-day push | 60 | **520** |

Core assumption: each engaged registrant brings **~1.5–2 friends**. The product is engineered to make
that the path of least resistance (personal code, WhatsApp 1-tap, visible rank, unlockable rewards).

---

## 3. The one thing I built

**A gamified referral growth engine** (this repo) — landing page + referral code/tracker + engagement
tooling in one product. Register → auto-generated code → WhatsApp share → live leaderboard → reward
tiers → a 0→500 goal bar. It *is* Channel 1's engine, not a brochure for it. Live demo + code included.

---

## 4. How I thought (the three questions)

**What changed between my first idea and final solution?**
First idea was a polished landing page with a registration form. I rejected it because a landing page
is a *dead end* — it can't manufacture reach, and ₹2,000 can't buy 500 signups. The final solution
makes **every registrant a distribution channel** via a referral loop with visible status and rewards.
The asset went from "a page that collects" to "a machine that spreads."

**If I had another 24 hours, what would I improve?**
Wire a real backend (Supabase) so referrals attribute across users and the leaderboard is genuinely
live; add an admin dashboard with per-channel/`ref` conversion so spend can be reallocated daily; and
A/B test two hero messages and two reward structures to find the highest viral coefficient.

**What did AI suggest that I rejected, and why?**
AI suggested maximising channel count — email + LinkedIn + Discord + SEO blog + 20 micro-influencers.
I rejected it: in a 7-day / ₹2,000 box, spreading thin kills the referral loop's compounding. I also
rejected its first instinct to spend the whole ₹2,000 on ads — that buys a one-time spike, not a loop.
(More examples in [AI-NOTES.md](AI-NOTES.md).)
