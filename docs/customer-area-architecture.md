# Area Clienti & Documentazione Digitale — Architettura Dati (v2, post-FASE G2.5)

> **Stato:** SOLO PROGETTAZIONE. Nessun backend, nessun database, nessun
> Supabase, nessuna autenticazione reale, nessun dato/cliente/documento reale.
> Questo documento + `src/types/customer-area.ts` definiscono il modello da
> implementare in FASE G3.
>
> **v2** recepisce la review severa G2.5 (vedi §0 Decisioni).

---

## 0. Decisioni prese in G2.5

| Tema | Decisione |
|---|---|
| **Naming** | Campi in **italiano**, valori enum + nomi tipo in **inglese**: convenzione **esplicita** (non più incoerenza). `fileUrl` → **`storagePath`** (era un nome errato: è un path, non un URL). |
| **File documento** | **Fonte unica = `DocumentRevision`**. `Document` non contiene più file: punta alla revisione corrente con `currentRevisionId`. |
| **Codice cliente** | Aggiunto `Customer.codiceCliente` (unique), coerente col login G1 "email **o codice cliente**". |
| **QR** | `Machine.publicCode` **obbligatorio + unique + non indovinabile**; `qrCodeUrl` **derivato** (colonna generata) da publicCode. |
| **Manutentore** | Lato **cliente** (un solo tenant), **solo documenti tecnici** (`document:read:technical`). Aggiunta entità **opzionale** `MachineAssignment` per il futuro tecnico-INNO.TEC sul campo (NON usata in v1). |
| **Ticket** | `clienteUser`/`manutentore` vedono **solo i propri** (`ticket:read:own`); `clienteAdmin` quelli **aziendali**. Aggiunti `priority`, `assignedTo`, `closedAt` e l'entità **`TicketMessage`** (thread). |
| **Viewer** | **Non** introdotto: restano i 4 ruoli richiesti; il caso "solo lettura" è coperto dai flag per-documento `downloadable`/`printable`. Aggiungibile in 1 riga. |
| **Gestione utenti** | `clienteAdmin` ora può **gestire** i propri utenti (`user:manage:own-customer`: disabilitare/cambiare ruolo). |
| **Audit** | `AccessLog.customerId` **obbligatorio** + aggiunto `revisionId` (quale versione). |

---

## 1. Principi

1. **Multi-tenant.** Ogni `Customer` è un tenant isolato. Un utente vede **solo** i
   dati del proprio `customerId` (eccetto `adminInnotec`).
2. **Security-first.** Isolamento imposto dal DB con **Row Level Security (RLS)** e
   dallo storage con **signed URL** — mai dal solo filtro client.
3. **Documentazione = bene a lungo termine.** Disponibile per **tutta la vita
   della macchina e almeno 10 anni** dopo la dismissione.
4. **QR senza segreti.** Punto d'ingresso, non una credenziale.
5. **Audit append-only.** Ogni view/download/print è tracciata in modo immutabile.
6. **Minimizzazione PII.** Solo dati necessari; GDPR con eccezioni per obblighi legali.

---

## 2. Entità e relazioni

```
Customer 1───N UserProfile
Customer 1───N Machine
Customer 1───N SupportTicket
Machine  1───N Document           (Document.customerId denormalizzato)
Machine  0/1─N SupportTicket
Document 1───1 DocumentRevision   (corrente, via currentRevisionId)
Document 1───N DocumentRevision   (storico)
SupportTicket 1─N TicketMessage
UserProfile 1─N AccessLog
Document    1─N AccessLog
(opz.) UserProfile N─N Machine     via MachineAssignment   [solo futuro]
```

Tipi completi in **`src/types/customer-area.ts`**. Campi chiave (✦ = nuovo/cambiato in v2):

- **Customer**: `id` · ✦`codiceCliente` (unique) · `ragioneSociale` · `emailReferente` · `telefono` · `stato` · `createdAt`
- **UserProfile**: `id` (= auth.users.id) · `customerId` (null solo adminInnotec) · `nome` · `email` · `ruolo` · `stato` · `lastLogin`
- **Machine**: `id` · `customerId` · `matricola` (unique) · `codiceCommessa` · `nomeImpianto` · `descrizione` · `anno` · ✦`commissionedAt` · `settore` · `stato` · ✦`publicCode` (unique) · ✦`qrCodeUrl` (derivato) · `decommissionedAt`
- **Document**: `id` · `machineId` · `customerId` · `titolo` · `tipoDocumento` · `lingua` · ✦`currentRevisionId` · `downloadable` · `printable` · `visibility` · `updatedAt` · *(✦ rimossi fileUrl/fileName/fileSize/revisione)*
- **DocumentRevision**: `id` · `documentId` · ✦`revisionNumber` · ✦`revisionLabel` · ✦`storagePath` · ✦`fileName` · ✦`fileSize` · ✦`mimeType` · ✦`checksum` · ✦`validFrom` · `note` · ✦`createdBy` · `createdAt`
- **AccessLog**: `id` · `userId` · `documentId` · ✦`revisionId` · ✦`customerId` (now required) · `action` · `timestamp` · `ip?` · `userAgent?`
- **SupportTicket**: `id` · `customerId` · `machineId?` · `subject` · `description` · `status` · ✦`priority` · ✦`createdBy` · ✦`assignedTo?` · `createdAt` · ✦`closedAt?`
- **TicketMessage** ✦: `id` · `ticketId` · `authorId` · `body` · `createdAt`
- **MachineAssignment** (opz./futuro) ✦: `id` · `userId` · `machineId` · `createdAt`

**Integrità:** `Document.customerId` e `AccessLog.customerId` sono denormalizzati →
coerenza con `Machine.customerId` garantita da **trigger** (o colonna generata) nel DB.

---

## 3. Ruoli e permessi (RBAC)

Fonte di verità: `ROLE_PERMISSIONS` in `src/types/customer-area.ts`.

| Capability | adminInnotec | clienteAdmin | clienteUser | manutentore |
|---|:---:|:---:|:---:|:---:|
| Vedere/gestire **tutti** i clienti | ✅ | — | — | — |
| Vedere il proprio cliente | ✅ | ✅ | ✅ | — |
| Invitare utenti del proprio cliente | ✅ | ✅ | — | — |
| **Gestire** (disabilitare/ruolo) utenti del proprio cliente | ✅ | ✅ | — | — |
| Gestire utenti (qualsiasi) | ✅ | — | — | — |
| Leggere macchine (tutte) | ✅ | — | — | — |
| Leggere macchine del proprio cliente | ✅ | ✅ | ✅ | ✅ |
| Creare/modificare macchine | ✅ | — | — | — |
| Leggere documenti **pubblici** | ✅ | ✅ | ✅ | ✅ |
| Leggere documenti privati del proprio cliente — **tutti** | ✅ | ✅ | ✅ | — |
| Leggere documenti privati — **solo tecnici** | — | — | — | ✅ |
| Download / stampa documenti | ✅ | ✅ | ✅ | ✅ |
| Caricare/gestire documenti e revisioni | ✅ | — | — | — |
| Creare ticket | ✅ | ✅ | ✅ | ✅ |
| Leggere **i propri** ticket | ✅ | ✅ | ✅ | ✅ |
| Leggere ticket **dell'azienda** | ✅ | ✅ | — | — |
| Gestire ticket (qualsiasi) | ✅ | — | — | — |
| Leggere access log del proprio cliente | ✅ | ✅ | — | — |
| Leggere access log (qualsiasi) | ✅ | — | — | — |

- **adminInnotec** = staff INNO.TEC (nessun `customerId`); accesso globale + upload documenti.
- **clienteAdmin** = referente cliente: gestisce gli utenti della propria azienda, vede ticket aziendali e access log interni.
- **clienteUser** = utente standard: consulta/scarica documenti, apre e vede **i propri** ticket.
- **manutentore** = tecnico **lato cliente**: macchine + **soli documenti tecnici**
  (`TECHNICAL_DOCUMENT_TYPES`) + propri ticket. *(Per un tecnico INNO.TEC su più
  clienti → `MachineAssignment`, fase futura.)*

> ⚠️ `roleHasPermission` è solo un **capability-check**: NON autorizza da solo.
> Lo scope (`own` / `own-customer` / `technical`) è imposto dall'RLS lato server.

---

## 4. Logica QR code macchina

- `Machine.publicCode`: token **opaco, unique, ≥16 char URL-safe** (es. nanoid 21)
  → impedisce l'**enumerazione** delle schede macchina. **≠ matricola** (niente serial in chiaro).
- `qrCodeUrl` **derivato**: `https://www.innotecsrl.eu` + `machineQrPath(publicCode)` = `/m/{publicCode}`
  (colonna generata nel DB → niente drift).
- Scansione → scheda impianto:
  - **Senza login:** solo info **minime e non identificanti** (modello/settore/anno).
    **Niente** ragione sociale, matricola o dati di commessa.
  - **Con login + autorizzazione (stesso tenant):** elenco documenti della macchina,
    download/stampa secondo flag e permessi.
- Il QR **non è un segreto**: smarrirlo non espone documenti riservati (richiedono
  comunque sessione + scope tenant).
- **Stabilità:** il QR è stampato fisicamente sulla macchina → `publicCode` resta
  **stabile**; prevista una **rotazione d'emergenza** documentata se compromesso.
- **Rate-limit** sull'endpoint pubblico `/m/{code}`.

---

## 5. Pubblico vs privato

**Pubblico:** sezione homepage "Area Clienti", `/documentazione-digitale`,
scheda macchina base via QR (solo metadati non sensibili), documenti `visibility:"public"` (raro).

**Privato (login + scope tenant + RLS):** manuali, dichiarazioni CE/UE, schemi,
layout, ricambi, revisioni, access log, ticket. `/area-clienti` e la futura dashboard
restano **`noindex, nofollow`**.

---

## 6. Flusso di login (futuro)

> Oggi `/area-clienti` è un **mockup** (form non funzionante, pulsante disabilitato,
> nessuna credenziale raccolta). Il flusso sotto è il target di G3.

1. **Provisioning** — `adminInnotec` crea il `Customer` e invita il `clienteAdmin`
   (Supabase Auth invite). Il `clienteAdmin` invita poi `clienteUser`/`manutentore`.
2. **Login** — email + password; in alternativa "codice cliente" (`Customer.codiceCliente`)
   risolto all'email.
3. **Sessione** — JWT Supabase; si carica `UserProfile` → `ruolo` + `customerId`.
4. **Gating** — la UI mostra solo ciò che `ROLE_PERMISSIONS` consente; il server
   ri-verifica sempre (RLS).
5. **lastLogin** aggiornato; tentativi falliti soggetti a **rate-limit**.

---

## 7. Flusso di download documento (futuro)

1. Utente autenticato richiede `documentId` (o una `revisionId` specifica).
2. **Autorizzazione server:** `document.customerId === profile.customerId`
   (o `adminInnotec`); per `manutentore` anche `isTechnicalDocumentType(tipoDocumento)`.
3. Flag: `downloadable === false` → solo view inline; `printable === false` → stampa
   disabilitata (best-effort lato viewer).
4. Il server emette un **signed URL a breve scadenza** (es. 60 s) dal bucket privato.
5. Scrittura **`AccessLog`** (`userId`, `documentId`, `revisionId`, `customerId`,
   `action`, `timestamp`) — nella stessa Edge Function che firma l'URL.
6. Il client scarica/visualizza tramite il signed URL.

> **Onestà:** `downloadable`/`printable` sono **deterrenti UX**, non DRM (un PDF
> visualizzabile è salvabile/screenshottabile). Per protezione reale → viewer
> dedicato + **watermark per-utente** sui documenti sensibili (G3+).

---

## 8. Documenti e storage

- **Bucket privato** unico (es. `customer-docs`), **mai** oggetti pubblici.
- **I PDF NON stanno in `public/`** (servito senza auth, finisce nel deploy/repo):
  regola di sicurezza non negoziabile. In `public/` solo asset di marketing.
- Accesso **solo via signed URL** dopo autorizzazione server.
- **Astrazione `StorageProvider`** (`getSignedUrl/upload/delete`): in DB si salva solo
  `storagePath` (provider-agnostico) → swap Supabase Storage ↔ S3/R2 indolore
  (Supabase espone già un endpoint **S3-compatibile**).
- **Supabase Storage è sufficiente per la v1** (PDF/manuali/schemi). Per file molto
  grandi (CAD/video) o grandi volumi/egress → valutare S3/R2 dietro la stessa astrazione.
- Struttura cartelle (revisione = sottocartella → storico nativo):

```
customer-docs/
  {customerId}/
    {machineId}/
      {documentId}/
        r01/{fileName}
        r02/{fileName}
        r03/{fileName}      ← currentRevisionId
```

---

## 9. Conservazione documentale (retention)

In `DOCUMENT_RETENTION` (`src/types/customer-area.ts`):
- Disponibili per **tutta la vita della macchina**.
- **Almeno 10 anni** dopo `Machine.decommissionedAt`.
- **Tutte le revisioni** conservate (storico immutabile, mai hard-delete).

**Enforcement (da implementare in G3+, oggi è solo dichiarativo):**
- Niente cancellazioni fisiche: stato `archived` + lifecycle/versioning del bucket.
- Trigger/job che blocca l'eliminazione finché `now < decommissionedAt + minYearsAfterDecommission`.
- **Log di accesso (PII):** retention separata `ACCESS_LOG_RETENTION_MONTHS = 18` (audit vs GDPR).

---

## 10. Sicurezza

- **RLS su OGNI tabella**: predicato `customer_id = (select customer_id from profiles where id = auth.uid())`
  **+** `profiles.stato = 'active'` (un utente `disabled` non passa). **Test cross-tenant** automatici.
- **Utente disabilitato**: oltre alla policy, **invalidare la sessione** (Supabase: ban/secessione) al disable.
- **Route private protette server-side** (Next **middleware**): non-auth → redirect login. Il gating client non basta.
- **service role key** solo server (mai in `NEXT_PUBLIC_*`, mai nel bundle). Al client solo `anon key`.
- **Audit append-only** via grant (insert+select, **revoke** update/delete).
- **noindex** sulle route riservate + `robots.txt` disallow + header `X-Robots-Tag: noindex`
  e `Cache-Control: private, no-store` sulle risposte coi documenti.
- **Upload (G3):** validazione tipo file (solo PDF/tipi noti) + scansione antivirus.
- **MFA** consigliata per `adminInnotec`; **rate-limit** su login ed emissione signed URL.
- **GDPR:** diritto all'oblio bilanciato con gli obblighi legali di conservazione.

---

## 11. Futura integrazione Supabase (NON ESEGUIRE ORA)

**Componenti:** Postgres + Auth + Storage + Edge Functions.

**Mappatura tipi → tabelle (snake_case):**

| Tipo TS | Tabella |
|---|---|
| `Customer` | `customers` |
| `UserProfile` | `profiles` (PK = `auth.users.id`) |
| `Machine` | `machines` |
| `Document` | `documents` |
| `DocumentRevision` | `document_revisions` |
| `AccessLog` | `access_logs` |
| `SupportTicket` | `support_tickets` |
| `TicketMessage` | `ticket_messages` |
| `MachineAssignment` *(opz.)* | `machine_assignments` |

**DDL illustrativa (estratto v2, da NON eseguire):**

```sql
create table customers (
  id uuid primary key default gen_random_uuid(),
  codice_cliente text not null unique,
  ragione_sociale text not null,
  email_referente text not null,
  telefono text,
  stato text not null default 'active'
    check (stato in ('active','suspended','archived')),
  created_at timestamptz not null default now()
);

create table documents (
  id uuid primary key default gen_random_uuid(),
  machine_id uuid not null references machines(id),
  customer_id uuid not null references customers(id),
  titolo text not null,
  tipo_documento text not null,
  lingua text not null default 'it',
  current_revision_id uuid,          -- FK a document_revisions (deferrable)
  downloadable boolean not null default true,
  printable boolean not null default true,
  visibility text not null default 'private'
    check (visibility in ('public','private')),
  updated_at timestamptz not null default now()
);

create table document_revisions (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null references documents(id),
  revision_number int not null,
  revision_label text not null,
  storage_path text not null,
  file_name text not null,
  file_size bigint not null,
  mime_type text not null,
  checksum text,
  valid_from timestamptz not null default now(),
  note text,
  created_by uuid references profiles(id),
  created_at timestamptz not null default now(),
  unique (document_id, revision_number)
);

create table access_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id),
  document_id uuid not null references documents(id),
  revision_id uuid references document_revisions(id),
  customer_id uuid not null references customers(id),
  action text not null check (action in ('view','download','print')),
  timestamp timestamptz not null default now()
);
```

**RLS (esempio, da NON eseguire):**

```sql
alter table documents enable row level security;

-- Staff interno: tutto.
create policy doc_admin_all on documents for select using (
  exists (select 1 from profiles p
    where p.id = auth.uid() and p.ruolo = 'adminInnotec' and p.stato = 'active')
);

-- Cliente: documenti pubblici oppure del proprio tenant; utente attivo.
create policy doc_tenant_read on documents for select using (
  exists (select 1 from profiles p where p.id = auth.uid() and p.stato = 'active')
  and (
    visibility = 'public'
    or customer_id = (select customer_id from profiles where id = auth.uid())
  )
);

-- Audit append-only: consenti insert/select, nega update/delete (nessuna policy).
alter table access_logs enable row level security;
create policy log_insert on access_logs for insert with check (true);
```

**Storage:** bucket privato `customer-docs` con policy analoghe; download via
`createSignedUrl` dentro una Edge Function che scrive anche l'`AccessLog`.

**Auth:** Supabase Auth (email/password + invite); `profiles.id = auth.users.id`.

**Env:** `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` (client),
`SUPABASE_SERVICE_ROLE_KEY` (solo server).

---

## 12. Piano operativo FASE G3

- **G3.0 — Modello congelato** *(prerequisito, fatto in G2.5)*: tipi v2 + questa doc.
- **G3.1 — Pacchetti**: `@supabase/supabase-js` + `@supabase/ssr`.
- **G3.2 — Env**: URL + anon key (client), service role (solo server) + `.env.example`.
- **G3.3 — Schema SQL**: migration versionata (tabelle, FK, unique, indici, trigger coerenza `customer_id`, colonna generata `qr_code_url`).
- **G3.4 — RLS**: policy per tabella, incluso `stato='active'`; **test cross-tenant**.
- **G3.5 — Storage**: bucket privato + policy + astrazione `StorageProvider` + signed URL.
- **G3.5b — Middleware**: protezione server-side delle route riservate + header noindex.
- **G3.6 — Login reale**: sostituisce il mockup G1; sessione + `profiles` + `lastLogin`; gestione disabilitati.
- **G3.7 — Dashboard cliente** (`noindex`, scoping tenant).
- **G3.8 — Lista macchine** (filtrata per tenant).
- **G3.9 — Documenti macchina** (lista + revisioni + flag download/print; filtro `technical` per manutentore).
- **G3.10 — Download sicuro**: signed URL + `AccessLog` atomico.
- **G3.11 — Admin upload + QR generation**: UI staff per documenti/revisioni e generazione QR.
- **G3.12 — Retention/audit enforcement + osservabilità**: job retention, log retention, append-only, monitoring.

---

## 13. Fuori scope (volutamente NON fatto)

- ❌ Nessun backend/DB/Supabase installato o configurato.
- ❌ Nessuna autenticazione reale (il mockup G1 resta invariato).
- ❌ Nessun dato reale di clienti, utenti, macchine o documenti; nessun file caricato.
- ❌ Nessuna dichiarazione di conformità legale assoluta: le regole GDPR/retention
  qui descritte sono linee guida progettuali da validare con consulenza dedicata.
