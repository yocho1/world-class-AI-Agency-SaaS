create table if not exists public.workspace_invites (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  email text not null,
  role text not null default 'member' check (role in ('owner', 'admin', 'member')),
  token text not null unique,
  invited_by_user_id uuid not null,
  accepted_by_user_id uuid,
  accepted_at timestamptz,
  expires_at timestamptz not null default (now() + interval '7 days'),
  created_at timestamptz not null default now()
);

create index if not exists idx_workspace_invites_tenant_id on public.workspace_invites (tenant_id);
create index if not exists idx_workspace_invites_token on public.workspace_invites (token);

alter table public.workspace_invites enable row level security;

drop policy if exists "workspace_invites_select_admins" on public.workspace_invites;
create policy "workspace_invites_select_admins" on public.workspace_invites
for select using (
  tenant_id in (
    select tenant_id
    from public.tenant_members
    where user_id = auth.uid()
      and role in ('owner', 'admin')
  )
);

drop policy if exists "workspace_invites_manage_service" on public.workspace_invites;
create policy "workspace_invites_manage_service" on public.workspace_invites
for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');