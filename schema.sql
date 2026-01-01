-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Users table
create table public.users (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Events table (Calendar)
create table public.events (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users(id) on delete cascade not null,
  title text not null,
  start_time timestamp with time zone not null,
  end_time timestamp with time zone not null,
  is_goal boolean default false,
  is_completed boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Expenses table
create table public.expenses (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users(id) on delete cascade not null,
  amount decimal(10, 2) not null,
  category text not null,
  description text,
  date date not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Gratitude Journal table
create table public.gratitude_entries (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users(id) on delete cascade not null,
  content text not null,
  mood integer check (mood >= 1 and mood <= 5),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Row Level Security (RLS) policies
alter table public.users enable row level security;
alter table public.events enable row level security;
alter table public.expenses enable row level security;
alter table public.gratitude_entries enable row level security;

-- Policies (simplified for initial setup, assuming authenticated user matches user_id)
create policy "Users can view their own data" on public.users for select using (auth.uid() = id);
create policy "Users can view their own events" on public.events for select using (auth.uid() = user_id);
create policy "Users can insert their own events" on public.events for insert with check (auth.uid() = user_id);
create policy "Users can update their own events" on public.events for update using (auth.uid() = user_id);
create policy "Users can delete their own events" on public.events for delete using (auth.uid() = user_id);

create policy "Users can view their own expenses" on public.expenses for select using (auth.uid() = user_id);
create policy "Users can insert their own expenses" on public.expenses for insert with check (auth.uid() = user_id);

create policy "Users can view their own gratitude entries" on public.gratitude_entries for select using (auth.uid() = user_id);
create policy "Users can insert their own gratitude entries" on public.gratitude_entries for insert with check (auth.uid() = user_id);
