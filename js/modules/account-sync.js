import { supabaseConfig, isSupabaseEnabled } from '../supabase-config.js';

let client = null;

function requireConfigured() {
  if (!isSupabaseEnabled()) {
    throw new Error('Supabase chưa được cấu hình. Hãy nhập URL và anon key trước.');
  }
}

export function isAccountSyncConfigured() {
  return isSupabaseEnabled();
}

export async function getSupabaseClient() {
  requireConfigured();
  if (client) return client;

  const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm');
  client = createClient(supabaseConfig.url, supabaseConfig.anonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: false,
    },
  });
  return client;
}

export async function getCurrentSession() {
  const supabase = await getSupabaseClient();
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
}

export async function signUpWithEmail(email, password) {
  const supabase = await getSupabaseClient();
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
  return data;
}

export async function signInWithEmail(email, password) {
  const supabase = await getSupabaseClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function signOutAccount() {
  const supabase = await getSupabaseClient();
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function fetchCloudState() {
  const supabase = await getSupabaseClient();
  const session = await getCurrentSession();
  if (!session?.user) throw new Error('Chưa đăng nhập.');

  const { data, error } = await supabase
    .from('user_states')
    .select('state, updated_at')
    .eq('user_id', session.user.id)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function saveCloudState(state) {
  const supabase = await getSupabaseClient();
  const session = await getCurrentSession();
  if (!session?.user) throw new Error('Chưa đăng nhập.');

  const payload = {
    user_id: session.user.id,
    state,
    device_id: state?.syncMeta?.deviceId || null,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from('user_states')
    .upsert(payload, { onConflict: 'user_id' })
    .select('updated_at')
    .single();

  if (error) throw error;
  return data;
}
