import { createClient as createSupabaseClient } from "@supabase/supabase-js"

/**
 * Creates a Supabase server client for server-side operations.
 * Always create a new client within each function when using it.
 */
export async function createClient() {
  return createSupabaseClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
