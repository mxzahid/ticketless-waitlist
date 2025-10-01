-- Create waitlist table for TICKETLESS app signups
create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  phone text,
  ip_hash text not null,
  created_at timestamptz default now() not null
);

-- Create index on email for faster lookups
create index if not exists idx_waitlist_email on public.waitlist(email);

-- Create index on ip_hash for rate limiting checks
create index if not exists idx_waitlist_ip_hash on public.waitlist(ip_hash);

-- Create index on created_at for time-based queries
create index if not exists idx_waitlist_created_at on public.waitlist(created_at);

-- Enable RLS (Row Level Security)
alter table public.waitlist enable row level security;

-- Allow anyone to insert (public waitlist signup)
create policy "Allow public inserts"
  on public.waitlist
  for insert
  with check (true);

-- Allow anyone to read (for duplicate email checks)
create policy "Allow public select"
  on public.waitlist
  for select
  using (true);
