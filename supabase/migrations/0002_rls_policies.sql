-- ─────────────────────────────────────────────────────────────────────────────
-- FASE G3 — Row Level Security (DRAFT, da validare in DEV).
-- Isolamento multi-tenant + controllo ruoli + utente attivo.
-- Le helper sono SECURITY DEFINER per evitare ricorsione con l'RLS di profiles.
-- ─────────────────────────────────────────────────────────────────────────────

-- ── Helper (prefisso app_ per non collidere con keyword Postgres) ────────────
create or replace function public.app_role()
returns text language sql stable security definer set search_path = public as $$
  select ruolo from public.profiles where id = auth.uid();
$$;

create or replace function public.app_customer_id()
returns uuid language sql stable security definer set search_path = public as $$
  select customer_id from public.profiles where id = auth.uid();
$$;

create or replace function public.app_is_active()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles
                 where id = auth.uid() and stato = 'active');
$$;

create or replace function public.app_is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles
                 where id = auth.uid() and ruolo = 'adminInnotec' and stato = 'active');
$$;

-- ── Abilita RLS ──────────────────────────────────────────────────────────────
alter table public.customers           enable row level security;
alter table public.profiles            enable row level security;
alter table public.machines            enable row level security;
alter table public.documents           enable row level security;
alter table public.document_revisions  enable row level security;
alter table public.access_logs         enable row level security;
alter table public.support_tickets     enable row level security;
alter table public.ticket_messages     enable row level security;
alter table public.machine_assignments enable row level security;

-- ── CUSTOMERS ─────────────────────────────────────────────────────────────────
create policy customers_admin_all on public.customers for all
  using (public.app_is_admin()) with check (public.app_is_admin());
create policy customers_self_read on public.customers for select
  using (public.app_is_active() and id = public.app_customer_id());

-- ── PROFILES ──────────────────────────────────────────────────────────────────
create policy profiles_read on public.profiles for select using (
  id = auth.uid()
  or public.app_is_admin()
  or (public.app_role() = 'clienteAdmin' and customer_id = public.app_customer_id())
);
create policy profiles_admin_manage on public.profiles for all
  using (public.app_is_admin()) with check (public.app_is_admin());
create policy profiles_clienteadmin_manage on public.profiles for update
  using (public.app_role() = 'clienteAdmin' and customer_id = public.app_customer_id())
  with check (public.app_role() = 'clienteAdmin' and customer_id = public.app_customer_id());

-- ── MACHINES ──────────────────────────────────────────────────────────────────
create policy machines_read on public.machines for select using (
  public.app_is_active()
  and (public.app_is_admin() or customer_id = public.app_customer_id())
);
create policy machines_admin_manage on public.machines for all
  using (public.app_is_admin()) with check (public.app_is_admin());

-- ── DOCUMENTS (manutentore = solo tipi tecnici) ──────────────────────────────
create policy documents_read on public.documents for select using (
  public.app_is_active() and (
    public.app_is_admin()
    or visibility = 'public'
    or (
      customer_id = public.app_customer_id()
      and (
        public.app_role() <> 'manutentore'
        or tipo_documento in (
          'manuale_uso_manutenzione','dichiarazione_ce','schema_elettrico',
          'schema_pneumatico','layout','ricambi','certificato')
      )
    )
  )
);
create policy documents_admin_manage on public.documents for all
  using (public.app_is_admin()) with check (public.app_is_admin());

-- ── DOCUMENT_REVISIONS (visibili se è visibile il documento padre) ───────────
create policy revisions_read on public.document_revisions for select using (
  exists (select 1 from public.documents d where d.id = document_id)
);
create policy revisions_admin_manage on public.document_revisions for all
  using (public.app_is_admin()) with check (public.app_is_admin());

-- ── ACCESS_LOGS (append-only: insert+select; nessuna policy update/delete) ────
create policy logs_insert on public.access_logs for insert
  with check (public.app_is_active() and user_id = auth.uid());
create policy logs_read on public.access_logs for select using (
  public.app_is_admin()
  or (public.app_role() = 'clienteAdmin' and customer_id = public.app_customer_id())
);
-- Difesa in profondità: nega esplicitamente UPDATE/DELETE agli utenti.
revoke update, delete on public.access_logs from authenticated;

-- ── SUPPORT_TICKETS (user vede i propri; clienteAdmin quelli aziendali) ──────
create policy tickets_insert on public.support_tickets for insert with check (
  public.app_is_active()
  and customer_id = public.app_customer_id()
  and created_by = auth.uid()
);
create policy tickets_read on public.support_tickets for select using (
  public.app_is_admin()
  or created_by = auth.uid()
  or (public.app_role() = 'clienteAdmin' and customer_id = public.app_customer_id())
);
create policy tickets_admin_manage on public.support_tickets for update
  using (public.app_is_admin()) with check (public.app_is_admin());

-- ── TICKET_MESSAGES (visibili/creabili se è accessibile il ticket) ───────────
create policy ticket_messages_read on public.ticket_messages for select using (
  exists (select 1 from public.support_tickets t where t.id = ticket_id)
);
create policy ticket_messages_insert on public.ticket_messages for insert with check (
  author_id = auth.uid()
  and exists (select 1 from public.support_tickets t where t.id = ticket_id)
);

-- ── MACHINE_ASSIGNMENTS (opzionale / futuro) ─────────────────────────────────
create policy assignments_admin on public.machine_assignments for all
  using (public.app_is_admin()) with check (public.app_is_admin());
create policy assignments_self_read on public.machine_assignments for select
  using (user_id = auth.uid());
