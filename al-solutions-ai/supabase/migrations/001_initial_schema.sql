create extension if not exists pgcrypto;

create table if not exists public.tenants (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  plan text not null default 'growth',
  settings jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid references public.tenants(id) on delete cascade,
  source text not null default 'website',
  name text,
  email text,
  company text,
  industry text,
  budget_range text,
  timeline text,
  qualification_data jsonb not null default '{}'::jsonb,
  chat_initiated boolean not null default false,
  messages_sent integer not null default 0,
  lead_captured_at timestamptz,
  status text not null default 'new',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid references public.tenants(id) on delete cascade,
  lead_id uuid references public.leads(id) on delete set null,
  channel text not null default 'website',
  started_at timestamptz not null default now(),
  ended_at timestamptz,
  language text not null default 'en',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  role text not null check (role in ('user', 'assistant', 'system')),
  content text not null,
  token_count integer,
  created_at timestamptz not null default now()
);

create table if not exists public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid references public.tenants(id) on delete cascade,
  event_name text not null,
  event_properties jsonb not null default '{}'::jsonb,
  session_id text,
  page text,
  created_at timestamptz not null default now()
);

create table if not exists public.audit_requests (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid references public.tenants(id) on delete cascade,
  lead_id uuid references public.leads(id) on delete set null,
  company_name text not null,
  contact_name text not null,
  email text not null,
  industry text,
  team_size text,
  notes text,
  status text not null default 'requested',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_leads_tenant_created_at on public.leads (tenant_id, created_at desc);
create index if not exists idx_conversations_tenant_started_at on public.conversations (tenant_id, started_at desc);
create index if not exists idx_messages_conversation_created_at on public.messages (conversation_id, created_at);
create index if not exists idx_analytics_events_tenant_created_at on public.analytics_events (tenant_id, created_at desc);
create index if not exists idx_audit_requests_tenant_created_at on public.audit_requests (tenant_id, created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger trg_tenants_updated_at
before update on public.tenants
for each row
execute function public.set_updated_at();

create trigger trg_leads_updated_at
before update on public.leads
for each row
execute function public.set_updated_at();

create trigger trg_conversations_updated_at
before update on public.conversations
for each row
execute function public.set_updated_at();

create trigger trg_audit_requests_updated_at
before update on public.audit_requests
for each row
execute function public.set_updated_at();

alter table public.tenants enable row level security;
alter table public.leads enable row level security;
alter table public.conversations enable row level security;
alter table public.messages enable row level security;
alter table public.analytics_events enable row level security;
alter table public.audit_requests enable row level security;

create policy "tenants_select_own" on public.tenants
for select using (auth.uid() is not null);

create policy "leads_tenant_isolation" on public.leads
for all using (
  tenant_id in (
    select id from public.tenants
  )
) with check (
  tenant_id in (
    select id from public.tenants
  )
);

create policy "conversations_tenant_isolation" on public.conversations
for all using (
  tenant_id in (
    select id from public.tenants
  )
) with check (
  tenant_id in (
    select id from public.tenants
  )
);

create policy "messages_by_conversation" on public.messages
for all using (
  conversation_id in (
    select id from public.conversations
  )
) with check (
  conversation_id in (
    select id from public.conversations
  )
);

create policy "analytics_tenant_isolation" on public.analytics_events
for all using (
  tenant_id in (
    select id from public.tenants
  )
) with check (
  tenant_id in (
    select id from public.tenants
  )
);

create policy "audit_requests_tenant_isolation" on public.audit_requests
for all using (
  tenant_id in (
    select id from public.tenants
  )
) with check (
  tenant_id in (
    select id from public.tenants
  )
);
