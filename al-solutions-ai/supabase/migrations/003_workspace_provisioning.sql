create table if not exists public.tenant_members (
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  user_id uuid not null,
  role text not null default 'member' check (role in ('owner', 'admin', 'member')),
  created_at timestamptz not null default now(),
  primary key (tenant_id, user_id)
);

create index if not exists idx_tenant_members_user_id on public.tenant_members (user_id);

create table if not exists public.chatbot_configs (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  name text not null,
  avatar text,
  colors jsonb not null default '{}'::jsonb,
  system_prompt text not null,
  welcome_message text not null,
  quick_replies jsonb not null default '[]'::jsonb,
  enabled boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_chatbot_configs_tenant_id on public.chatbot_configs (tenant_id);

create trigger trg_chatbot_configs_updated_at
before update on public.chatbot_configs
for each row
execute function public.set_updated_at();

alter table public.tenant_members enable row level security;
alter table public.chatbot_configs enable row level security;

drop policy if exists "tenant_members_select_own" on public.tenant_members;
create policy "tenant_members_select_own" on public.tenant_members
for select using (user_id = auth.uid());

drop policy if exists "tenant_members_manage_service" on public.tenant_members;
create policy "tenant_members_manage_service" on public.tenant_members
for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');

drop policy if exists "chatbot_configs_select_members" on public.chatbot_configs;
create policy "chatbot_configs_select_members" on public.chatbot_configs
for select using (
  tenant_id in (
    select tenant_id
    from public.tenant_members
    where user_id = auth.uid()
  )
);

drop policy if exists "chatbot_configs_manage_service" on public.chatbot_configs;
create policy "chatbot_configs_manage_service" on public.chatbot_configs
for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');