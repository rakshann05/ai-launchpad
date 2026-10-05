import { createClient, type SupabaseClient } from '@supabase/supabase-js'

// ─────────────────────────────────────────────────────────────
// Supabase client. Reads credentials from Vite env vars.
// If they're absent, `supabase` is null and the app runs in a
// self-contained demo mode (see store.ts) — so it works with
// zero setup and "goes live" the moment you add the two keys.
// ─────────────────────────────────────────────────────────────

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

export const isLive = Boolean(url && anonKey)

export const supabase: SupabaseClient | null = isLive
  ? createClient(url!, anonKey!, { auth: { persistSession: false } })
  : null
