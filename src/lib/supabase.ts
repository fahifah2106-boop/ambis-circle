import { createClient } from '@supabase/supabase-js'

// Hardcoded for absolute reliability in this environment
const supabaseUrl = 'https://xmjodilpbxzfepjfbwry.supabase.co'
const supabaseAnonKey = 'sb_publishable_esOYBvQluuU2PcxElbnoqw_11TN0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
