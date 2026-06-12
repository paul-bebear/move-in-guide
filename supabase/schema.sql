-- Move-In Guide shared catalog.
-- Run this once in your Supabase project: SQL Editor → New query → paste → Run.

create table if not exists catalog (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  city text not null check (char_length(city) <= 40),
  name text not null check (char_length(name) between 1 and 120),
  category text not null check (category in ('Restaurant', 'Bar', 'Café', 'Club', 'Other')),
  area text check (char_length(area) <= 80),
  menu_url text check (char_length(menu_url) <= 500),
  rating int not null check (rating between 1 and 5),
  notes text check (char_length(notes) <= 600),
  added_by text check (char_length(added_by) <= 60)
);

alter table catalog enable row level security;

-- Anyone with the link can read and add entries; nobody can edit or delete
-- from the client (do moderation in the Supabase dashboard).
create policy "public read" on catalog for select using (true);
create policy "public insert" on catalog for insert with check (true);
