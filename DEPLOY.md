# Deploy & Go-Live — INNO.TEC

Stato: il sito è **deployabile in preview SUBITO**. Per il go-live pubblico
servono alcuni dati reali dal cliente (sezione 1). L'Area Clienti resta un
**mockup** finché non si collega Supabase (sezione 4).

## 1. Prima del go-live pubblico (dati dal cliente)
- [ ] **Dominio di produzione** confermato → aggiornare `siteUrl` in `src/content/site.ts` (oggi `https://www.innotecsrl.eu`, DA CONFERMARE).
- [ ] **Testi legali reali** per `/privacy` e `/cookie` (oggi segnaposto, `noindex`).
- [ ] **Dati societari** nel footer: P.IVA, C.F., REA, capitale sociale (oggi TODO, non inventati).
- [ ] (Facoltativo) specifiche reali INNO.CELL; video settori mancanti (Logistica, Industria); render Hero/INNO.CELL.

> Nota: i testi legali e i dati fiscali vanno validati dal cliente / consulenza —
> non vanno inventati.

## 2. Build
```
npm run build   # produzione (attualmente verde, 0 errori)
npm run lint
```

## 3. Deploy
La preview è pubblica: richiede un **account di hosting del cliente** (non creabile
dall'agente). Opzioni:

**Netlify** (config in `netlify.toml`)
- Collega il repo GitHub a Netlify → build automatica. Il runtime Next viene
  rilevato; il plugin `@netlify/plugin-nextjs` è auto-installato.

**Vercel** (zero-config)
- Importa il repo: Next.js è riconosciuto automaticamente, nessuna config.

Dopo il primo deploy: impostare il **dominio** e aggiornare `siteUrl` se diverso.

## 4. Env variables (solo quando si attiva l'Area Clienti reale — FASE G3.6+)
Da `.env.example` (vedi `supabase/README.md`):
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` (pubbliche)
- `SUPABASE_SERVICE_ROLE_KEY` (**segreta, solo server** — impostarla nelle env del
  provider di hosting, mai nel repo)

## 5. Verifiche post-deploy
- [ ] Home, `/area-clienti` (login mockup, **noindex**), `/documentazione-digitale` (indicizzabile).
- [ ] `robots.txt`, `sitemap.xml`, OG/Twitter image, favicon.
- [ ] `/privacy` e `/cookie` raggiungibili e `noindex`.
- [ ] Video (hero/strutture/settori) partono; nessun errore console.
