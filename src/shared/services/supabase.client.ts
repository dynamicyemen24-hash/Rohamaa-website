import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const hasSupabaseConfig = Boolean(supabaseUrl && supabaseAnonKey);
export const DB_SCHEMA = import.meta.env.VITE_SUPABASE_SCHEMA || 'gs_website';

export const supabase = createClient(
  hasSupabaseConfig ? supabaseUrl : 'https://disabled.supabase.co',
  hasSupabaseConfig ? supabaseAnonKey : 'disabled-anon-key',
  {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
      global: {
        headers: {
          'x-application-name': 'rohamaa-website',
        },
      },
    }
);
