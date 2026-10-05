-- ════════════════════════════════════════════════════════════════
--  AI Launchpad — Supabase schema
--  Run this once in your Supabase project:
--  Dashboard → SQL Editor → New query → paste → Run.
-- ════════════════════════════════════════════════════════════════

create extension if not exists "pgcrypto";

-- ── Registrations ────────────────────────────────────────────────
create table if not exists public.registrations (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  college     text not null,
  code        text not null unique,
  referred_by text references public.registrations(code) on delete set null,
  created_at  timestamptz not null default now()
);

create index if not exists idx_registrations_referred_by on public.registrations(referred_by);

-- ── Leaderboard view (referrals = how many people used your code) ─
create or replace view public.leaderboard as
select
  r.code,
  r.name,
  r.college,
  r.created_at,
  (select count(*) from public.registrations x where x.referred_by = r.code) as referrals
from public.registrations r;

-- ── Row Level Security: public can register + read the board ─────
alter table public.registrations enable row level security;

drop policy if exists "public read registrations"  on public.registrations;
drop policy if exists "public insert registrations" on public.registrations;

create policy "public read registrations"
  on public.registrations for select using (true);

create policy "public insert registrations"
  on public.registrations for insert with check (true);

-- ── Live updates: expose the table to Realtime ───────────────────
alter publication supabase_realtime add table public.registrations;

-- ════════════════════════════════════════════════════════════════
--  SEED DATA — gives the leaderboard + goal bar life from day one.
--  Safe to re-run: guarded by NOT EXISTS on the seed codes.
-- ════════════════════════════════════════════════════════════════

-- Top referrers (the people shown on the podium / board)
insert into public.registrations (name, college, code)
select v.name, v.college, v.code
from (values
  ('Aarav S.',   'VIT',          'AARV-AI100'),
  ('Priya R.',   'SRM',          'PRIY-AI101'),
  ('Karthik M.', 'IIIT-H',       'KART-AI102'),
  ('Sneha P.',   'BITS',         'SNEH-AI103'),
  ('Rahul D.',   'NIT-W',        'RAHU-AI104'),
  ('Ananya K.',  'Amrita',       'ANAN-AI105'),
  ('Vikram N.',  'Anna Univ.',   'VIKR-AI106'),
  ('Divya T.',   'MIT Manipal',  'DIVY-AI107')
) as v(name, college, code)
where not exists (select 1 from public.registrations r where r.code = v.code);

-- Their referrals (each row references a leader's code)
insert into public.registrations (name, college, code, referred_by)
select 'Builder ' || t.code || '-' || g,
       'Campus',
       t.code || '-R' || g,
       t.code
from (values
  ('AARV-AI100', 14),
  ('PRIY-AI101', 11),
  ('KART-AI102', 9),
  ('SNEH-AI103', 7),
  ('RAHU-AI104', 6),
  ('ANAN-AI105', 5),
  ('VIKR-AI106', 4),
  ('DIVY-AI107', 3)
) as t(code, n),
generate_series(1, t.n) as g
where not exists (select 1 from public.registrations r where r.code = t.code || '-R' || g);

-- Baseline registrations so the 0→500 goal bar starts populated
insert into public.registrations (name, college, code)
select 'Registrant ' || g, 'Campus', 'BASE-' || g
from generate_series(1, 230) as g
where not exists (select 1 from public.registrations r where r.code = 'BASE-' || g);

-- Total after seeding ≈ 8 + 59 + 230 = 297 registrations.
