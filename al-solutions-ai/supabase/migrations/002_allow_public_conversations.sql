-- Allow public website conversations without tenant_id
ALTER TABLE public.conversations
ALTER COLUMN tenant_id DROP NOT NULL;

-- Update the RLS policy for conversations to allow public website access
DROP POLICY IF EXISTS "conversations_tenant_isolation" ON public.conversations;

CREATE POLICY "conversations_public_or_tenant" ON public.conversations
FOR ALL USING (
  tenant_id IS NULL OR tenant_id IN (
    SELECT id FROM public.tenants
  )
) WITH CHECK (
  tenant_id IS NULL OR tenant_id IN (
    SELECT id FROM public.tenants
  )
);

-- Allow leads without tenant_id for public website leads
ALTER TABLE public.leads
ALTER COLUMN tenant_id DROP NOT NULL;

-- Update the RLS policy for leads to allow public website access
DROP POLICY IF EXISTS "leads_tenant_isolation" ON public.leads;

CREATE POLICY "leads_public_or_tenant" ON public.leads
FOR ALL USING (
  tenant_id IS NULL OR tenant_id IN (
    SELECT id FROM public.tenants
  )
) WITH CHECK (
  tenant_id IS NULL OR tenant_id IN (
    SELECT id FROM public.tenants
  )
);

-- Add session_id column to conversations for tracking public sessions
ALTER TABLE public.conversations
ADD COLUMN IF NOT EXISTS session_id TEXT;

-- Create index for session_id lookups
CREATE INDEX IF NOT EXISTS idx_conversations_session_id ON public.conversations (session_id);
