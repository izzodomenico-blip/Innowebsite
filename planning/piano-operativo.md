# Piano Operativo (planning/piano-operativo.md)

Questo documento traccia le fasi operative dettagliate per lo sviluppo del sito **innowebsite**.

---

## Elenco delle Fasi di Sviluppo

### FASE 0 — Preparazione Cartella e Documentazione
- **Obiettivo**: Configurare la struttura iniziale e preparare i file di testo per allineare gli agenti AI.
- **Stato**: **COMPLETATO** (Gemini)

---

### FASE 1 — Scaffold Next.js con Gemini
- **Obiettivo**: Inizializzare Next.js con TypeScript, Tailwind CSS, App Router e configurazioni base in modalità non interattiva.
- **Stato**: *Pianificato / Prossimo Step*

---

### FASE 2 — Verifica Base con Gemini
- **Obiettivo**: Eseguire una prima compilazione di prova (`npm run build`) e correggere eventuali problemi nello scaffold.
- **Stato**: *Pianificato*

---

### FASE 3 — Audit con Claude Code
- **Obiettivo**: Analisi della struttura del codice e dei file di configurazione da parte di Claude Code per predisporre il lavoro estetico ed interattivo.
- **Stato**: *Pianificato*

---

### FASE 4 — Configurazione CLAUDE.md
- **Obiettivo**: Creare il file `CLAUDE.md` contenente comandi rapidi di compilazione, test, regole di stile del codice e linee guida per le risposte di Claude.
- **Stato**: *Pianificato*

---

### FASE 5 — Strategia UI/UX
- **Obiettivo**: Definire l'architettura informativa del sito, creare i wireframe concettuali delle sezioni e mappare i percorsi utente (user journeys).
- **Stato**: *Pianificato*

---

### FASE 6 — Implementazione Premium
- **Obiettivo**: Sviluppare la struttura delle pagine principali (Home, Servizi, Prodotti, Contatti) implementando il design system definito.
- **Stato**: *Pianificato*

---

### FASE 7 — Integrazione 21st.dev
- **Obiettivo**: Importare ed adattare componenti di design avanzati, griglie interattive e visual da `21st.dev` o Magic UI.
- **Stato**: *Pianificato*

---

### FASE 8 — Sviluppo Motion System
- **Obiettivo**: Integrare Framer Motion o GSAP per gestire gli effetti di scorrimento (scroll trigger), le comparse degli elementi (reveal) e le micro-interazioni sui pulsanti/card.
- **Stato**: *Pianificato*

---

### FASE 9 — Visual AI / Exploded View
- **Obiettivo**: Generare i visual 3D/esplosi tramite AI, ottimizzarli per il web (WebP/SVG) ed inserirli nelle rispettive sezioni con animazioni dedicate.
- **Stato**: *Pianificato*

---

### FASE 10 — Review Tecnica Codex
- **Obiettivo**: Effettuare una revisione profonda del codice (refactoring), verificare la correttezza dei tipi TypeScript, pulire i file inutilizzati ed ottimizzare i bundle npm.
- **Stato**: *Pianificato*

---

### FASE 11 — Polish Claude
- **Obiettivo**: Ottimizzazione finale dell'esperienza visiva, cura dei margini, fluidità dei frame al secondo delle animazioni (puntando a 60fps costanti) ed allineamenti di fino.
- **Stato**: *Pianificato*

---

### FASE 12 — Collaudo Finale Codex
- **Obiettivo**: Controlli qualitativi finali di accessibilità (Lighthouse a11y), responsive test, test SEO e simulazione di build finale.
- **Stato**: *Pianificato*

---

### FASE 13 — Deploy
- **Obiettivo**: Configurare la pipeline CI/CD ed eseguire il deploy del sito in produzione (es. Vercel, Netlify o server proprietario).
- **Stato**: *Pianificato*
