-- ─────────────────────────────────────────────────────────────────────────────
-- FASE G3 — Schema iniziale Area Clienti (DRAFT, da NON eseguire in produzione
-- senza validazione). Applicare prima in un progetto Supabase di DEV.
-- Rispecchia src/types/customer-area.ts (v2). Nessun dato reale.
-- ─────────────────────────────────────────────────────────────────────────────

create extension if not exists pgcrypto;

-- updated_at automatico
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ── CUSTOMERS ───────────────────────────────────────────────────────────────
create table public.customers (
  id uuid primary key default gen_random_uuid(),
  codice_cliente text not null unique,
  ragione_sociale text not null,
  email_referente text not null,
  telefono text,
  stato text not null default 'active'
    check (stato in ('active','suspended','archived')),
  partita_iva text,
  note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger trg_customers_updated before update on public.customers
  for each row execute function public.set_updated_at();

-- ── PROFILES (1:1 con auth.users) ───────────────────────────────────────────
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  customer_id uuid references public.customers(id) on delete restrict,
  nome text not null,
  email text not null,
  ruolo text not null
    check (ruolo in ('adminInnotec','clienteAdmin','clienteUser','manutentore')),
  stato text not null default 'invited'
    check (stato in ('invited','active','disabled')),
  last_login timestamptz,
  created_at timestamptz not null default now(),
  -- adminInnotec senza tenant; gli altri ruoli con tenant
  constraint chk_customer_scope check (
    (ruolo = 'adminInnotec' and customer_id is null)
    or (ruolo <> 'adminInnotec' and customer_id is not null)
  )
);
create index idx_profiles_customer on public.profiles(customer_id);

-- ── MACHINES ────────────────────────────────────────────────────────────────
create table public.machines (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.customers(id) on delete restrict,
  matricola text not null unique,
  codice_commessa text not null,
  nome_impianto text not null,
  descrizione text,
  anno int,
  commissioned_at timestamptz,
  settore text not null
    check (settore in ('elettrodomestico','farmaceutico','logistica','industria','altro')),
  stato text not null default 'active'
    check (stato in ('active','maintenance','decommissioned')),
  public_code text not null unique,
  -- URL del QR DERIVATO da public_code (niente drift):
  qr_code_url text generated always as
    ('https://www.innotecsrl.eu/m/' || public_code) stored,
  decommissioned_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index idx_machines_customer on public.machines(customer_id);
create trigger trg_machines_updated before update on public.machines
  for each row execute function public.set_updated_at();

-- ── DOCUMENTS ───────────────────────────────────────────────────────────────
create table public.documents (
  id uuid primary key default gen_random_uuid(),
  machine_id uuid not null references public.machines(id) on delete restrict,
  customer_id uuid not null references public.customers(id) on delete restrict,
  titolo text not null,
  tipo_documento text not null check (tipo_documento in (
    'manuale_uso_manutenzione','dichiarazione_ce','schema_elettrico',
    'schema_pneumatico','layout','ricambi','certificato','altro')),
  lingua text not null default 'it',
  current_revision_id uuid,  -- FK aggiunta dopo (riferimento circolare)
  downloadable boolean not null default true,
  printable boolean not null default true,
  visibility text not null default 'private'
    check (visibility in ('public','private')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index idx_documents_customer on public.documents(customer_id);
create index idx_documents_machine on public.documents(machine_id);
create trigger trg_documents_updated before update on public.documents
  for each row execute function public.set_updated_at();

-- ── DOCUMENT_REVISIONS (storico + file effettivo) ───────────────────────────
create table public.document_revisions (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null references public.documents(id) on delete cascade,
  revision_number int not null,
  revision_label text not null,
  storage_path text not null,           -- path nel bucket privato (NON un URL)
  file_name text not null,
  file_size bigint not null,
  mime_type text not null,
  checksum text,
  valid_from timestamptz not null default now(),
  note text,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  unique (document_id, revision_number)
);
create index idx_revisions_document on public.document_revisions(document_id);

-- FK circolare: documents.current_revision_id -> document_revisions.id
alter table public.documents
  add constraint fk_documents_current_revision
  foreign key (current_revision_id) references public.document_revisions(id)
  deferrable initially deferred;

-- Coerenza tenant: documents.customer_id deve seguire la macchina
create or replace function public.documents_sync_customer()
returns trigger language plpgsql as $$
begin
  select customer_id into new.customer_id
  from public.machines where id = new.machine_id;
  return new;
end;
$$;
create trigger trg_documents_sync_customer
  before insert or update of machine_id on public.documents
  for each row execute function public.documents_sync_customer();

-- ── ACCESS_LOGS (append-only) ───────────────────────────────────────────────
create table public.access_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id),
  document_id uuid not null references public.documents(id) on delete cascade,
  revision_id uuid references public.document_revisions(id),
  customer_id uuid not null references public.customers(id),
  action text not null check (action in ('view','download','print')),
  "timestamp" timestamptz not null default now()
);
create index idx_access_logs_customer_ts
  on public.access_logs(customer_id, "timestamp" desc);

-- ── SUPPORT_TICKETS ─────────────────────────────────────────────────────────
create table public.support_tickets (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.customers(id) on delete restrict,
  machine_id uuid references public.machines(id) on delete set null,
  subject text not null,
  description text not null,
  status text not null default 'open'
    check (status in ('open','in_progress','waiting_customer','resolved','closed')),
  priority text not null default 'normal'
    check (priority in ('low','normal','high','urgent')),
  created_by uuid not null references public.profiles(id),
  assigned_to uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  closed_at timestamptz
);
create index idx_tickets_customer on public.support_tickets(customer_id);
create trigger trg_tickets_updated before update on public.support_tickets
  for each row execute function public.set_updated_at();

-- ── TICKET_MESSAGES (thread) ────────────────────────────────────────────────
create table public.ticket_messages (
  id uuid primary key default gen_random_uuid(),
  ticket_id uuid not null references public.support_tickets(id) on delete cascade,
  author_id uuid not null references public.profiles(id),
  body text not null,
  created_at timestamptz not null default now()
);
create index idx_ticket_messages_ticket on public.ticket_messages(ticket_id);

-- ── MACHINE_ASSIGNMENTS (opzionale / futuro) ────────────────────────────────
create table public.machine_assignments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  machine_id uuid not null references public.machines(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, machine_id)
);
