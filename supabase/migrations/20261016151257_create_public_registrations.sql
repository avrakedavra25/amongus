create table if not exists public.registrations (
  id uuid primary key default gen_random_uuid(),
  full_name text not null check (char_length(btrim(full_name)) between 1 and 120),
  scholar_number text not null check (char_length(btrim(scholar_number)) between 1 and 40),
  branch text not null check (char_length(btrim(branch)) between 1 and 120),
  email text not null check (char_length(btrim(email)) between 3 and 320),
  phone_number text not null check (char_length(btrim(phone_number)) between 5 and 30),
  hostel_sector text not null check (hostel_sector in ('H1', 'H3', 'H4', 'H5', 'PnT', 'Girls')),
  crewmate_color text not null check (char_length(btrim(crewmate_color)) between 1 and 30),
  created_at timestamptz not null default now()
);

alter table public.registrations enable row level security;

revoke all on table public.registrations from anon, authenticated;
grant insert on table public.registrations to anon, authenticated;

drop policy if exists "Allow public registration submissions" on public.registrations;
create policy "Allow public registration submissions"
on public.registrations
for insert
to anon, authenticated
with check (true);
