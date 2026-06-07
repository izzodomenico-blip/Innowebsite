# Supabase — Backend Area Clienti (fondazione FASE G3)

> **Stato:** fondazione **as-code**, NON ancora attiva. Queste migrazioni e
> configurazioni **non sono state eseguite**: non esiste un progetto Supabase
> collegato e nel repo non ci sono credenziali. Sono **draft da validare in un
> progetto di DEV** prima della produzione. Rispecchiano `src/types/customer-area.ts`
> e `docs/customer-area-architecture.md`.

## Cosa c'è qui

```
supabase/
  migrations/
    0001_init_schema.sql    # tabelle, indici, qr_code_url generato, trigger coerenza
    0002_rls_policies.sql   # RLS multi-tenant + ruoli + utente attivo + append-only log
    0003_storage.sql        # bucket privato customer-docs
  README.md                 # questo file
```
Più: `.env.example` (placeholder, in root) e `src/lib/storage/provider.ts`
(astrazione storage provider-agnostica).

## Cosa serve da te per attivarlo (non posso farlo io)

Per completare G3.6+ (login reale, dashboard, download) servono passi che
richiedono **il tuo account/progetto cloud e chiavi segrete** — che io non creo
né gestisco:

1. **Crea un progetto Supabase** (https://supabase.com).
2. Copia `.env.example` → `.env.local` e compila:
   - `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` (pubbliche),
   - `SUPABASE_SERVICE_ROLE_KEY` (**segreta, solo server** — non condividerla).
3. Applica le migrazioni in **DEV** (Supabase CLI):
   ```
   supabase link --project-ref <ref>
   supabase db push           # oppure: incolla gli SQL nell'SQL Editor
   ```
4. Crea il bucket `customer-docs` (lo fa `0003_storage.sql`) e verifica che sia **privato**.
5. Confermami che è pronto: procedo con **G3.1** (pacchetti) e il wiring
   dell'app (client Supabase, middleware, login reale che sostituisce il mockup,
   dashboard, lista macchine, documenti, download con signed URL + AccessLog).

## Note di sicurezza (vedi doc §10)

- **Service role key solo lato server.** Mai in `NEXT_PUBLIC_*`, mai nel client.
- **Bucket privato + signed URL.** I PDF non stanno mai in `public/`.
- **RLS su tutte le tabelle** + `stato = 'active'`: un utente disabilitato non passa
  (e la sua sessione va invalidata al disable).
- **Access log append-only** (insert/select; update/delete revocati).
- Le migrazioni sono **draft non testati** su un'istanza reale: applicarli prima in DEV.
- Validare con consulenza legale le parti GDPR/retention (non sono garanzie assolute).
```
