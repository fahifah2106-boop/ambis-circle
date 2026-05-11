import { createClient } from '@supabase/supabase-js'

// Hardcoded for absolute reliability in this environment
const supabaseUrl = 'https://xmjodilpbxzfepjfbwry.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhtam9kaWxwYnh6ZmVwamZid3J5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcyOTA2MDAsImV4cCI6MjA5Mjg2NjYwMH0.cL6Z5OMcP2j6kok9a7SySkEhaeIDku27nEL2mDqiOLk'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
