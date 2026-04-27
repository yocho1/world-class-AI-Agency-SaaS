insert into public.tenants (name, slug, plan)
values ('AL Solutions Demo', 'al-solutions-demo', 'growth')
on conflict (slug) do nothing;
