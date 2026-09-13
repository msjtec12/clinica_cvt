import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

const hasValidUrl = Boolean(
  supabaseUrl &&
  /^https?:\/\//i.test(supabaseUrl) &&
  !supabaseUrl.includes("seu-projeto.supabase.co")
);

const hasValidAnonKey = Boolean(
  supabaseAnonKey &&
  supabaseAnonKey !== "sua-chave-anon-publica" &&
  supabaseAnonKey.length > 20
);

export const isSupabaseConfigured = hasValidUrl && hasValidAnonKey;

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;
