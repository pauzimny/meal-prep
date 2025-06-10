-- Drop existing table (careful: this will remove all user data)
drop table if exists public.users cascade;

-- Create fresh 'users' table linked to auth.users(id)
create table public.users (
  id uuid primary key references auth.users(id),
  created_at timestamp without time zone null default now(),
  name text not null,
  email text not null,
  avatar_url text null,
  meal_count integer null default 0,
  favorite_cuisine text not null,
  dietary_preferences text[] not null,
  constraint users_email_key unique (email)
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can select their own profile"
ON users
FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
ON users
FOR UPDATE
USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
ON users
FOR INSERT
WITH CHECK (auth.uid() = id);