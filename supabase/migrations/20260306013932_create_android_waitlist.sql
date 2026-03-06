create table if not exists android_waitlist (
  id         uuid        primary key default gen_random_uuid(),
  email      text        not null unique,
  phone      text,
  created_at timestamptz not null default now()
);
