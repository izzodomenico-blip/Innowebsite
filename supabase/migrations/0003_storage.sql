-- ─────────────────────────────────────────────────────────────────────────────
-- FASE G3 — Storage documenti (DRAFT, da validare in DEV).
-- Bucket PRIVATO: i file NON sono mai pubblici. Il download avviene via signed
-- URL a breve scadenza, emessi lato server (Edge Function / route handler) DOPO
-- l'autorizzazione, che scrive anche l'AccessLog.
-- ─────────────────────────────────────────────────────────────────────────────

-- Bucket privato (public = false).
insert into storage.buckets (id, name, public)
values ('customer-docs', 'customer-docs', false)
on conflict (id) do nothing;

-- NB: con bucket privato e download via signed URL generati con la SERVICE ROLE
-- lato server, NON servono policy di lettura diretta per gli utenti: il bucket
-- resta inaccessibile senza signed URL. Si evita così di duplicare la logica RLS
-- nello storage.
--
-- Se in futuro si vuole far accedere il client direttamente allo storage con la
-- sessione utente, abilitare policy su storage.objects che replichino lo scoping
-- per tenant in base al primo segmento del path (customerId). Esempio (NON
-- attivo): la lettura sarebbe consentita se
--   (storage.foldername(name))[1] = public.app_customer_id()::text
-- più i controlli di ruolo/tipo documento. Per ora si preferisce il signed URL
-- server-side, più semplice e sicuro.

-- Struttura path attesa nel bucket:
--   {customerId}/{machineId}/{documentId}/r03/{fileName}
