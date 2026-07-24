-- Presence schema — profiles, analyses, creators, ideas
-- All tables RLS-scoped to auth.uid().

create extension if not exists "uuid-ossp";

-- profiles: 1:1 with auth.users, holds niche + app context for prompts
create table if not exists public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  app_name text,
  niche text,
  telegram_user_id bigint unique,
  created_at timestamptz not null default now()
);

-- analyses: one row per /analyze run
create table if not exists public.analyses (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  url text not null,
  niche text not null,
  status text not null default 'queued',
  title text,
  duration_sec int,
  transcript text,
  analysis_json jsonb,
  ideas_json jsonb,
  error text,
  created_at timestamptz not null default now()
);
create index if not exists analyses_user_created_idx on public.analyses(user_id, created_at desc);

-- creators: UGC creator CRM
create table if not exists public.creators (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  handle text,
  platforms text[] default '{}',
  contact text,
  notes text,
  status text not null default 'prospect', -- prospect | active | paused | dropped
  created_at timestamptz not null default now()
);
create index if not exists creators_user_created_idx on public.creators(user_id, created_at desc);

-- ideas: organic post ideas inbox
create table if not exists public.ideas (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  hook text not null,
  format text,
  outline text,
  cta text,
  notes text,
  source_analysis_id uuid references public.analyses(id) on delete set null,
  status text not null default 'inbox', -- inbox | drafting | shipped | killed
  created_at timestamptz not null default now()
);
create index if not exists ideas_user_created_idx on public.ideas(user_id, created_at desc);

-- Auto-create a profile row on new user signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (user_id) values (new.id) on conflict do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- RLS
alter table public.profiles enable row level security;
alter table public.analyses enable row level security;
alter table public.creators enable row level security;
alter table public.ideas enable row level security;

-- Policies: users only see/modify their own rows
create policy "profiles self" on public.profiles for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "analyses self" on public.analyses for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "creators self" on public.creators for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "ideas self"    on public.ideas    for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
