# Regole di Progetto (PROJECT_RULES.md)

Questo documento definisce le regole e le linee guida vincolanti per lo sviluppo del sito **innowebsite**. Ogni agente AI (Gemini/Antigravity, Claude Code, Codex) deve leggere e comprendere questo file prima di apportare modifiche o scrivere codice.

---

## 1. Obiettivo Generale
Creare un sito web vetrina ed istituzionale premium, ad alto impatto tecnologico ed estetico (industrial-tech), che trasmetta fiducia a partner e clienti di livello enterprise. Il sito deve risultare fluido, altamente performante, ottimizzato per i motori di ricerca, perfettamente accessibile e visivamente sbalorditivo.

---

## 2. Stack Futuro Previsto
- **Framework**: Next.js (App Router, React 19)
- **Linguaggio**: TypeScript (strict mode)
- **Styling**: Tailwind CSS (per layout e utilities) + CSS standard (per soluzioni personalizzate e micro-interazioni complesse)
- **Animazioni**: Framer Motion / GSAP (gestito principalmente da Claude Code)
- **Iconografia**: Lucide React / icone SVG custom
- **Componenti Premium**: Componenti custom ispirati a `21st.dev`, shadcn/ui o Magic UI

---

## 3. Regole Generali per tutti gli AI Agent
- **Lettura obbligatoria**: Prima di iniziare a scrivere codice, l'agente deve verificare lo stato attuale leggendo `AGENT_HANDOFF.md` e questo file.
- **Nessuna distruzione**: Non rimuovere configurazioni esistenti, commenti rilevanti o funzionalità funzionanti senza autorizzazione o chiara motivazione documentata.
- **Incrementalità**: Lavorare per step successivi e verificabili. Non fare enormi refactoring tutti in una volta se non richiesto espressamente.
- **Aggiornamento documentale**: Alla fine del proprio turno, ogni agente deve aggiornare il file `AGENT_HANDOFF.md` indicando cosa ha fatto, lo stato del codice e i suggerimenti per l'agente successivo.

---

## 4. Regole UI/UX
- **User First**: Navigazione intuitiva, chiara e pulita. L'utente non deve mai perdersi.
- **Premium Feel**: Design spazioso (buon uso dei margini e dei padding), layout bilanciato, contrasti elevati.
- **Interactive Feedback**: Ogni interazione (hover, click, focus) deve fornire una risposta visiva immediata e curata (ad esempio, transizioni fluide sui pulsanti, micro-spostamenti delle card).
- **Struttura chiara**: Pagine strutturate in sezioni logiche con intestazioni chiare e CTA (Call to Action) posizionate strategicamente.

---

## 5. Regole Design
- **Tavolozza Colori**: Utilizzare una palette sofisticata e moderna (es. sfondi scuri premium, toni di grigio freddo, tocchi di blu elettrico, ciano o verde neon per evidenziare elementi chiave). Evitare colori base primari piatti.
- **Tipografia**: Utilizzare font moderni ed eleganti (es. Inter, Geist Sans, Outfit o Roboto dal catalogo Google Fonts). Curare la scala tipografica (`line-height`, `letter-spacing`).
- **Texture e Profondità**: Utilizzare gradienti sfumati, effetti di "glassmorphism" (sfondi semi-trasparenti con `backdrop-blur`), ombreggiature sottili e bordi semi-trasparenti per dare un senso di profondità 3D/layering.
- **No Placeholders**: Non usare immagini di segnaposto grigie o testi "lorem ipsum" generici nella versione finale. Utilizzare testi reali e immagini prodotte tramite AI.

---

## 6. Regole Motion
- **Scopo delle animazioni**: Le animazioni devono arricchire l'esperienza d'uso, non rallentarla. Devono guidare l'attenzione dell'utente ed enfatizzare i contenuti.
- **Performance**: Utilizzare animazioni ottimizzate per la GPU (es. `transform: translate`, `opacity`). Evitare di animare proprietà che causano reflow (es. `width`, `height`, `margin`, `top`, `left`).
- **Coerenza**: Definire transizioni e curve di easing standardizzate (es. `cubic-bezier` personalizzati per un effetto premium e scattante).
- **Scroll Reveal & Parallax**: Implementare effetti di comparsa al caricamento (fade-in-up) e transizioni guidate dallo scroll (scroll-driven animations) controllate in modo da non affaticare l'utente.

---

## 7. Regole Visual AI / Exploded View
- **Grafiche Tecniche**: Mostrare visual ad alta definizione generati tramite AI che illustrino componenti meccanici o logici "esplosi" (exploded views) per enfatizzare la precisione e l'ingegneria del brand.
- **Interattività**: Le grafiche principali del sito (es. nella Hero o nelle sezioni prodotto) dovrebbero avere elementi interattivi (es. hover per rivelare i dettagli di un componente, tooltip informativi).

---

## 8. Regole Codice
- **TypeScript**: Tipizzazione forte. Evitare l'uso di `any`. Se necessario, definire interfacce e tipi chiari.
- **Componentizzazione**: Creare componenti React modulari, riutilizzabili e con responsabilità singola (Single Responsibility Principle).
- **Clean Code**: Nomi di variabili e funzioni auto-esplicativi. Mantenere le funzioni corte.
- **Standardizzazione Import**: Organizzare gli import in modo ordinato (librerie esterne prima, componenti interni dopo, stili e utility alla fine).
- **Gestione Errori**: Implementare Error Boundaries e controlli preventivi sui dati per evitare crash dell'applicazione.

---

## 9. Regole Responsive
- **Mobile First o Desktop Out**: Il sito deve essere impeccabile su schermi da 320px fino a 2560px.
- **Flexbox & Grid**: Utilizzare layout fluidi basati su CSS Flexbox e CSS Grid.
- **Immagini Responsive**: Utilizzare il componente `Image` di Next.js configurando opportunamente i parametri `sizes` e `priority` per i visual della Hero.

---

## 10. Regole Accessibilità (a11y)
- **Semantica**: Usare tag HTML5 semantici (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<article>`).
- **Contrasto**: Garantire un contrasto cromatico conforme alle linee guida WCAG AA (minimo 4.5:1 per testo normale).
- **Navigazione da tastiera**: Tutti gli elementi interattivi devono essere focalizzabili (`:focus-visible` ben visibile) e attivabili tramite tasto Invio/Spazio.
- **Attributi ARIA & Alt**: Fornire sempre testi alternativi per le immagini (`alt`) ed etichette descrittive per i lettori di schermo (`aria-label`) dove necessario.

---

## 11. Regole SEO
- **Metadati**: Configurare i metadati dinamici (titoli, descrizioni, open graph) per ogni pagina nel file `layout.tsx` o `page.tsx` usando le API di Next.js.
- **Struttura Heading**: Un solo tag `<h1>` per pagina. Utilizzare in modo coerente e gerarchico i tag `<h2>`, `<h3>` e `<h4>`.
- **Sitemap & Robots**: Generare automaticamente `sitemap.xml` e `robots.txt` a livello di build.
- **Performance**: Ottimizzare i tempi di caricamento (Core Web Vitals) mantenendo basso il tempo di interazione (TBT, LCP) per favorire l'indicizzazione su Google.

---

## 12. Cosa è Vietato Fare
- **NO Inline Styles**: Non usare stili inline direttamente nei tag HTML (salvo per variabili CSS dinamiche calcolate via Javascript).
- **NO Library Overload**: Non installare pacchetti o librerie npm ridondanti senza averne prima verificato la reale necessità.
- **NO Plain Red/Blue/Green**: Vietato l'uso di colori primari saturi non armonizzati (es. `#FF0000`, `#00FF00`, `#0000FF`).
- **NO Hardcoded Strings**: Evitare di inserire testi importanti direttamente nel codice; strutturarli in costanti o file di contenuto dedicati per facilitare manutenzione ed eventuale internazionalizzazione.

---

## 13. Procedura Prima di Ogni Modifica
1. **Leggere** `AGENT_HANDOFF.md` per capire l'ultimo stato noto.
2. **Verificare** lo stato attuale del repository (es. `git status` o controllo file).
3. **Pianificare** le modifiche strutturando i passaggi logici.
4. **Verificare** di non violare nessuna delle regole descritte in questo documento.

---

## 14. Procedura Dopo Ogni Modifica
1. **Testare la build**: Assicurarsi che la build di Next.js vada a buon fine senza errori TypeScript o di linting (`npm run build`).
2. **Verificare il responsive** e l'accessibilità di base sulle pagine modificate.
3. **Aggiornare il backlog** (`planning/backlog-miglioramenti.md`) se sono stati riscontrati problemi o se sono necessarie migliorie future.
4. **Scrivere il report** in `AGENT_HANDOFF.md` descrivendo le modifiche apportate e preparando il terreno per l'agente successivo.
