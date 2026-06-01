// Fill these values after creating the Supabase project.
// Use the project URL and publishable anon key from Supabase > Project Settings > API.
export const supabaseConfig = {
  url: 'https://kfiuaevgzaqssilyyynh.supabase.co',
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtmaXVhZXZnemFxc3NpbHl5eW5oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzMDg1MzksImV4cCI6MjA5NTg4NDUzOX0.5nIvldINckLouJdDjbvnkXhxMnasZsN7doCcdiFRqdo',
};

export function isSupabaseEnabled() {
  return Boolean(
    supabaseConfig.url &&
    supabaseConfig.anonKey &&
    supabaseConfig.url.includes('supabase.co')
  );
}
