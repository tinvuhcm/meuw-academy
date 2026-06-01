# Supabase setup for Meuw Academy

This app uses Supabase only for account login and cloud backup of the local learning state.
The app stays offline-first: localStorage remains the runtime source while the learner studies.

## 1. Create project

1. Create a free Supabase project.
2. Open Project Settings > API.
3. Copy the Project URL and publishable anon key into `js/supabase-config.js`.
4. In Authentication > Providers, keep Email enabled.

## 2. Create sync table

Run this SQL in Supabase SQL Editor:

```sql
create table if not exists public.user_states (
  user_id uuid primary key references auth.users(id) on delete cascade,
  state jsonb not null,
  device_id text,
  updated_at timestamptz not null default now()
);

alter table public.user_states enable row level security;

drop policy if exists "users can read own state" on public.user_states;
create policy "users can read own state"
on public.user_states
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "users can insert own state" on public.user_states;
create policy "users can insert own state"
on public.user_states
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "users can update own state" on public.user_states;
create policy "users can update own state"
on public.user_states
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
```

## 3. Conflict rule

When local data and cloud data differ, the app asks the parent before overwriting:

- Use cloud data: overwrites this device.
- Keep this device: no overwrite happens; parent can later push this device to cloud.

## 4. Migration flow

For an existing device with the correct progress:

1. Open Parent Dashboard > Data.
2. Sign in or create the learner account.
3. When asked, push this device's data to cloud.

For a new device:

1. Sign in with the same email and password.
2. Choose cloud data when the app detects a difference.
