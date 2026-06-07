# Passaggio Consegne Agenti (AGENT_HANDOFF.md)

Questo documento traccia lo stato di avanzamento del progetto e coordina le transizioni tra i diversi agenti AI (Gemini/Antigravity, Claude Code, Codex).

---

## 1. Stato Attuale del Progetto
Completate da **Claude Code**: **Fase 3 (Audit)**, **brand truth + architettura** (FASE 1), **Design System** (FASE 2), **Motion System** (FASE B), **sistema visivi / render drop-in** (FASE C), **SEO + finalizzazione pubblicabile** (FASE D), **Motion Experience premium** (FASE E) e **audit finale / deploy-readiness** (FASE F).

> **Verdetto FASE F: QUASI PRONTO** — deployabile in preview subito; per il go-live pubblico servono solo i dati reali dal cliente (vedi §3). Build/lint verdi, 0 errori console, tutte le route statiche.

Aggiunta **FASE G — Wow semantico per sezione**: ogni effetto nasce dal contenuto (vedi §2-octies).

Aggiunta **FASE G1 — Area Clienti & Documentazione Digitale (mockup frontend sicuro)**:
- Sezione homepage `AreaClienti` (tra Certificazioni e Contatti): pitch + 8 categorie documenti + visual `DocsSchematic` (documento + QR con scan-line) + CTA "Accedi all'Area Clienti" (/area-clienti) e "Scopri la documentazione digitale" (/documentazione-digitale).
- Pagina **/area-clienti**: login PREMIUM ma **mockup** — `ClientAreaLoginForm` (client) con `onSubmit→preventDefault`, bottone **disabilitato** "Accesso in fase di attivazione", `autoComplete` off/new-password, nessuno storage/backend/fetch. **`robots: noindex, nofollow`**.
- Pagina **/documentazione-digitale**: informativa **pubblica indicizzabile** (categorie, QR macchina prudente, download/stampa/versioni/lingue/copia cartacea/accesso autorizzato) + aggiunta a `sitemap.ts`.
- Layout sottopagine: `SubpageShell` (logo→home + footer minimale; no nav ad ancore che si romperebbero fuori home).
- Navbar + Footer: link "Area Clienti" (rotta) e "Documentazione digitale".
- Content: `docCategories` + `clientArea` in site.ts (solo etichette di TIPO documento; **nessun cliente/documento finto**).
- **Niente** auth reale, DB, credenziali salvate, conformità legale assoluta. Build + lint verdi.

La homepage è ora una one-page strutturata in 9 sezioni con i contenuti reali di **Inno.Tec S.r.l.** (material handling). Sono stati rimossi tutti i dati inventati e le stringhe di sviluppo visibili. La build di produzione (`npm run build`) e il lint (`npm run lint`) si completano con **0 errori e 0 warning**; nessun errore in console.

Look mantenuto: **Cinematic Industrial Dark** (sfondo near-black, accento ciano, bordi 1px, glassmorphism, grana sottile). **Animazioni avanzate volutamente NON ancora introdotte** (no GSAP/Lenis, no scroll-reveal): rimandate alla fase Motion.

---

## 2. Cosa ha fatto Claude Code in questo turno

### Bonifica (brand truth)
- Brand corretto ovunque: `innowebsite` → **INNO.TEC / Inno.Tec S.r.l.** (layout, navbar, footer, metadata).
- Contatti reali: sede **Via Ettore Majorana, Marcianise (CE)**, tel **0823 459968**, email **amministrazione@innotecsrl.eu**, social reali.
- Rimossi dati finti: indirizzo Bologna, telefono/email/P.IVA/REA/capitale inventati.
- Rimosse stringhe di sviluppo visibili ("Fase 1: Configurazione...", "VISTA ESPLOSA AI MOCKUP").
- Rimossi servizi inventati (Cobot, firmware PLC, WMS, Eco-Software) e la finta dashboard software.
- Rimosso CTA "Accedi" (sito vetrina B2B, non portale).
- Certificazioni reali: **UNI EN 1090-1:2012**, **ISO 45001**.
- Corretti gli anchor morti della navbar (ora puntano solo a sezioni esistenti).

### Fix tecnici
- **Font ricablato**: bug `--font-sans: var(--font-sans)` (circolare) risolto. Nuovo type system: **Archivo** (display/body) + **JetBrains Mono** (label/spec) via `next/font`.
- Aggiunti `scroll-behavior` + `scroll-padding-top` per la navigazione one-page e `prefers-reduced-motion`.

### Architettura (componentizzazione)
- Nuovo content layer unico: `src/content/site.ts` (tutti i dati reali, niente hardcoded sparsi).
- Sezioni in `src/components/sections/`: Hero, Manifesto, Sectors, Solutions, Process, InnoCell, Structures, Certifications, ContactCta.
- Sistema visivo in `src/components/visuals/`: `TechnicalFrame` (cornice blueprint = slot per render/foto futuri) + `Schematics` (SVG line-art: trasportatore, cella, soppalco).
- `SectionHeading` riutilizzabile. `SpotlightCard` e `AnimatedButton` **preservati**.
- `page.tsx` ridotto a semplice composizione delle sezioni.

---

## 2-bis. Cosa ha fatto Claude Code nel turno FASE 2 (Design System)
- **Token centralizzati** in `globals.css`: palette `.dark` allineata ai token reali (eliminato il doppio sistema colore) + token semantici `--color-ink/surface/line/line-strong/brand/brand-soft/faint`.
- **Scala tipografica fluida** con `clamp()`: utility `text-display`, `text-display-sm`, `text-h2`, `text-h3`, `text-lead`, `text-eyebrow`.
- **Utility riutilizzabili**: `.panel`, `.hairline-top`, `.text-gradient`, `.btn-glow`, `.bg-grid`, `.glow-radial-top/soft`; vars `--ease-premium`, `--glow-rgb`, `--shadow-panel`.
- **Nuovi primitivi** in `src/components/ui/`: `Section` (ritmo/container/divider/tone), `Eyebrow`, `Card`, `Badge`.
- **Componenti raffinati**: `Button` (CTA più grandi, focus ciano, varianti premium), `AnimatedButton` (glow via token), `TechnicalFrame` (griglia sfumata, glow, label-chip), `SectionHeading` (scala fluida), tocco leggero a `SpotlightCard`.
- **9 sezioni** rifattorizzate sui primitivi + elevazione statica (Hero con trust row, **INNO.CELL trattata da prodotto di punta** con pannello e doppio glow, superfici alternate). Contenuti invariati. Build + lint verdi, responsive verificato desktop/mobile.

## 2-ter. Cosa ha fatto Claude Code nel turno FASE B (Motion System)
- **Smooth scroll**: aggiunto `lenis` + provider `src/components/motion/SmoothScroll.tsx` (RAF loop, gestione anchor con offset navbar, disattivato se `prefers-reduced-motion`). CSS Lenis in `globals.css`.
- **Primitivi motion** (`src/components/motion/`): `Reveal`, `Stagger`/`StaggerItem`, `MountStagger` (framer-motion, reduced-motion safe), `Parallax` (useScroll/useTransform).
- **Hero**: entrata in cascata (MountStagger) + **assemblaggio del trasportatore** (`ConveyorAssembly.tsx`: telaio che si disegna, rulli in sequenza, pacco che entra) + parallax leggero sul frame.
- **Reveal allo scroll** applicati a tutte le sezioni: heading (baked in `SectionHeading`), griglie in stagger (Settori, Soluzioni, feature INNO.CELL, certificazioni), pannelli/colonne in reveal.
- **Navbar**: stato "scrolled" (sfondo/bordo/ombra si intensificano dopo lo scroll).
- Tutto su `transform`/`opacity` (GPU). Build + lint verdi; verificati a runtime smooth scroll, anchor nav, reveal e responsive mobile; 0 errori console.

## 2-quater. Cosa ha fatto Claude Code nel turno FASE C (Visual / render)
- **Sistema slot drop-in**: nuovo `src/components/visuals/RenderFrame.tsx` (mostra `next/image` se c'è un render reale, altrimenti il fallback SVG) + config centralizzata `renders` in `src/content/site.ts` (ora `null`).
- **Hero, INNO.CELL, Strutture** passano per `RenderFrame`: basta valorizzare `renders.*` per attivare le immagini reali, zero altre modifiche.
- **`public/renders/README.md`**: nomi file esatti, specifiche (WebP, sfondo scuro, no testi/loghi) e **prompt AI pronti** per i 3 slot.
- **Visual SVG potenziati** ("rendered look"): ombre di appoggio, shading cilindrico dei rulli, sfumature metallo, glow dietro la cella — mantenendo l'identità blueprint.
- NOTA: i render fotorealistici NON sono generabili in questo ambiente; vanno prodotti con i prompt forniti (o forniti dal cliente) e droppati in `public/renders/`.

## 2-quinquies. Cosa ha fatto Claude Code nel turno FASE D (SEO / pubblicabile)
- **Metadata** (`layout.tsx`): `metadataBase`, canonical, keywords, Open Graph completo, Twitter card `summary_large_image`. URL centralizzato in `siteUrl` (`site.ts`).
- **OG/Twitter image**: generate a build-time con `next/og` (`app/opengraph-image.tsx` + `app/twitter-image.tsx`) — card brandizzata, nessuna immagine stock.
- **Favicon**: `app/icon.svg` (motivo trasportatore ciano su dark); rimossa la favicon default di Next.
- **robots & sitemap**: `app/robots.ts` + `app/sitemap.ts` (sistema nativo Next).
- **JSON-LD**: `components/JsonLd.tsx` — `Organization` con SOLO dati reali (Inno.Tec S.r.l., Marcianise CE, tel, email, social). Nessun P.IVA/REA inventato.
- **A11y**: focus-visible sui link, verificata gerarchia heading (1 solo h1), aria-label presenti.
- **Pagine legali**: `/privacy` e `/cookie` segnaposto (noindex) + link nel footer. Nessun testo legale inventato.
- Build + lint verdi; verificati a runtime robots/sitemap/OG/meta/JSON-LD; 0 errori console sulle pagine reali.

## 2-sexies. Cosa ha fatto Claude Code nel turno FASE E (Motion Experience)
- **Sistema motion ampliato** (`src/components/motion/`): `MotionReveal` + `StaggerContainer` + `StaggerItem` (prop `trigger: scroll|mount`, alias retro-compatibili `Reveal/Stagger/MountStagger`), nuovi `MotionHeadline` (ingresso parola-per-parola, opz. mask + gradient), `AnimatedSection`, `AnimatedCard`. Tutto in Framer Motion, reduced-motion safe.
- **Showpiece**: Hero con headline parola-per-parola (mask+gradient) + cascata al mount + drift griglia + respiro glow + parallax/assembly; **Processo** `ProcessTimeline` (linea che si disegna allo scroll con `useScroll` + nodi che si attivano progressivamente); **INNO.CELL** `CellAssembly` (cella che si compone allo scroll).
- **Micro-interazioni**: `AnimatedButton` (micro-lift + nudge icona via base `Button`), `SpotlightCard` (tilt 3D leggero, off in reduced/touch), `AnimatedCard` (lift+bordo).
- **Sezioni**: Manifesto/Settori/Soluzioni/Strutture/Certificazioni/Contatti con reveal in cascata coerenti.
- **Dipendenze**: nessuna nuova (no GSAP). Lenis resta solo per lo smooth scroll.
- Build + lint verdi; verificati a runtime su scroll reale (desktop+mobile) hero/timeline/cella; 0 errori console. NB: i reveal sono scroll-triggered (lo scroll *instant* sintetico nei test non li attiva, ma lo scroll reale sì).

## 2-septies. Cosa ha fatto Claude Code nel turno FASE F (audit + deploy-readiness)
- **Audit severo** read-only: build/lint verdi; nessun `console.log`/`any`/`@ts-ignore`; root pulita (nessun screenshot/temp); a11y runtime (h1 unico, 0 dead anchor, focus, aria, lang) ok; SEO riverificato; motion QA su scroll reale ok.
- **Dead-code rimosso** (autorizzato): `src/components/ui/Card.tsx`, `src/components/motion/AnimatedSection.tsx`, alias `MountStagger`. Build/lint ancora verdi.
- **Micro-fix proposti ma NON applicati** (in attesa): `siteUrl` env-aware (`NEXT_PUBLIC_SITE_URL`); contrasto label minori `zinc-500→zinc-400`.
- **Deploy**: pronto per Vercel (preset Next.js auto, nessun `vercel.json`, nessuna env var obbligatoria). Manca solo `git init` + push (la cartella non è un repo git). Lighthouse NON eseguibile in locale: lanciarlo sull'URL preview.

## 2-octies. Cosa ha fatto Claude Code nel turno FASE G (wow semantico)
Effetti content-driven, distinti per sezione (no fade uguale ovunque), reduced-motion safe, nessuna nuova dipendenza:
- **Strutture**: `StructureAssembly` — **tensostruttura/capannone a portale** che si assembla allo scroll (colonne, falde, capriata, controventi X) e poi viene **rivestito** dai pannelli (telaio → struttura coperta), come dai due frame reference del cliente. (Sostituisce `MezzanineAssembly`, rimosso; `MezzanineSchematic` resta come asset latente per "soppalchi".)
- **Processo**: testa luminosa che **guida la linea** allo scroll (`useTransform` su `scrollYProgress`) → flusso.
- **INNO.CELL**: `CellAssembly` + **impulsi di flusso** che viaggiano IN→OUT (entrata via framer, viaggio via CSS `.flow-pulse`).
- **Manifesto**: i **3 verbi** (velocizzare/ottimizzare/automatizzare) in accento ciano via nuova prop `highlight` di `MotionHeadline`.
- **Settori**: **watermark-icona per settore** (identità visiva distinta) con hover immersivo.
- **CTA**: **aurora** ciano lentissima (`.cta-aurora`) per la chiusura emozionale.
- **Volutamente NON toccate** (restraint): Hero, Soluzioni, Certificazioni (già forti/sobrie) → per loro previsti video-slot reali.
- Build/lint verdi; verificati a runtime (desktop) Strutture/Settori/CTA + verbi Manifesto (ciano via DOM); 0 errori console.

## 3. Cosa NON è ancora stato fatto (backlog per le prossime fasi)
- **Motion system** (Fase 8 + FASE E): completato. Residuo opzionale: effetti scrub/pin avanzati, flusso luminoso continuo lungo le linee SVG, page-transition tra route.
- **Visual reali** (Fase 9): infrastruttura pronta (FASE C) + **video-slot** (FASE H). **FATTO**: Strutture ora usa il **video reale** del cliente (`public/renders/TENDOSTRUTTURE.mp4`, play-on-view) con **poster** = ultimo frame (`structures-poster.jpg`, estratto via canvas) e il **logo reale** è integrato (navbar/footer/legali) come `public/logo-innotec.png` (versione dark-mode: bianco→trasparente + testo ricolorato in bianco via canvas, ingranaggio arancione preservato). **Settori = sistema video per-settore** (`SectorMedia`: **autoplay-in-view + `preload="auto"` + loop** = immediato, nessuna attesa, fluido; poster, reduced-motion→poster; card "media-top" in griglia 2×2). `VideoMedia` (Strutture/slot) anch'esso `preload="auto"`.: **farmaceutico** ha il video reale (`FARMACEUTICO.mp4` + poster estratto); gli altri 3 settori mostrano un placeholder blueprint. Per aggiungerne uno: drop dell'mp4 in `public/renders/`, estrarre il poster, valorizzare `video`/`poster` nel relativo `sector` in `site.ts`. Video settori attivi: **Elettrodomestico** (`ELETTRODOMESTICO.mp4`) + **Distribuzione farmaceutica** (`FARMACEUTICO.mp4`), entrambi con poster. **Restano placeholder**: settori Logistica/Industria, Hero (conveyor), INNO.CELL (cella).
- **Logo animato = media dell'Hero** (NON più overlay separato): su richiesta utente il logo è integrato con la stessa logica degli altri video → `renders.heroConveyor = { video: "/renders/logo-intro.mp4", poster: "/renders/logo-poster.jpg", alt }`, mostrato dall'Hero via `RenderFrame`/`VideoMedia` (autoplay-in-view, preload auto). **Rimosso** del tutto il sistema intro a parte (`components/BrandIntro.tsx`, mount nel layout, `<noscript>`, CSS `.brand-intro`, config `intro` in site.ts). Soglia `VideoMedia` abbassata a 0.12 così l'hero parte all'atterraggio (frame ~29% in vista). Fallback (se video rimosso): `ConveyorAssembly` SVG. Verificato: gira 10s nell'hero, console pulita.
- **Design system**: fondamenta completate (FASE 2). Residuo opzionale: migrare anche le ultime utility `zinc-*` rimaste (es. footer) verso i token semantici per uniformità totale.
- **SEO**: base completata (FASE D). Residuo: confermare il dominio di produzione (`siteUrl`); upgrade JSON-LD a `LocalBusiness` (orari + geo-coordinate); `apple-touch-icon` PNG per iOS.
- **Contenuti da validare col cliente**: P.IVA, C.F., REA, capitale sociale; specifiche tecniche reali di INNO.CELL; eventuali case study/numeri.
- **Pagine legali**: pagine segnaposto pronte (FASE D, noindex). Manca il testo legale reale (Privacy/Cookie) dal consulente.
- **Accessibilità**: audit contrasto WCAG completo; test tastiera approfondito.

---

## 4. Prossimo Agente / Fase Consigliata
- **Agente**: **Claude Code** per Fase 5 (strategia UI/UX di dettaglio) → Fase 8 (Motion) → Fase 9 (Visual AI). **Codex** per Fase 10 (review tecnica) e Fase 12 (collaudo).
- **Nota**: prima di avviare il Motion, decidere se consolidare il design system (token colore/spaziatura) per evitare di rifinire due volte.

---

## 5. Note Specifiche per gli Agenti

### Note per Claude Code
- Contenuti centralizzati in `src/content/site.ts`: modificare lì i testi, non nei componenti.
- Gli slot visivi (`TechnicalFrame`) sono pronti a ricevere `<Image>` reali senza toccare il layout.
- Mantenere `prefers-reduced-motion` quando si aggiungeranno le animazioni.

### Note per Codex
- Stack: Next.js 16 (App Router, Turbopack), React 19, Tailwind v4, framer-motion. Build e lint verdi.
- I token shadcn OKLCH in `globals.css` sono ancora scollegati dalle utility usate: candidato a refactor del design system.
