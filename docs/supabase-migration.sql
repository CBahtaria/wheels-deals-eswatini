-- wheels-deals-eswatini Supabase migration
-- Run this in the Supabase SQL editor before using media pipeline, analytics, or survey features.

-- Media processing job queue
create table if not exists media_jobs (
  id uuid primary key default gen_random_uuid(),
  raw_path text not null,
  bucket text not null default 'raw-uploads',
  status text not null default 'pending',
  result jsonb,
  created_at timestamptz default now()
);
create index if not exists media_jobs_status_idx on media_jobs(status, created_at);

-- Anonymous session event log (vehicle views, searches, etc.)
create table if not exists user_events (
  id uuid primary key default gen_random_uuid(),
  session_id text not null,
  event text not null,
  payload jsonb,
  created_at timestamptz default now()
);
create index if not exists user_events_session_idx on user_events(session_id);
create index if not exists user_events_event_idx on user_events(event, created_at);

-- UX survey responses
create table if not exists survey_responses (
  id uuid primary key default gen_random_uuid(),
  session_id text not null,
  q_found_vehicle text,
  q_ease_rating int check (q_ease_rating between 1 and 5),
  q_device text check (q_device in ('mobile', 'tablet', 'desktop')),
  q_improvements text[],
  q_open text,
  created_at timestamptz default now()
);
create index if not exists survey_responses_created_idx on survey_responses(created_at desc);

-- Adaptive site configuration (updated by survey engine)
create table if not exists site_config (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz default now()
);

-- Seed default config values
insert into site_config (key, value) values
  ('featured_body_types', '[]'::jsonb),
  ('layout_mode', '"default"'::jsonb),
  ('cta_prominence', '"normal"'::jsonb)
on conflict (key) do nothing;

-- Supabase Storage buckets to create manually in Dashboard > Storage:
-- 1. raw-uploads   (private)
-- 2. processed-media (public, CDN-backed)
