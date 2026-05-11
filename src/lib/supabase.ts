import { createClient } from '@supabase/supabase-js'

// Fallback values are provided to prevent build errors when environment variables are missing.
// These dummy values will be replaced by real ones at runtime in the browser.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-url.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
