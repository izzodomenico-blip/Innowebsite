# Ispirazione e Competitor (references/competitor-inspiration.md)

Questo documento elenca le fonti di ispirazione estetica e funzionale, definendo cosa osservare in ciascuna di esse e stabilendo i limiti per evitare copie banali.

---

## 1. Ispirazioni Estetiche Chiave

### Linear ([linear.app](https://linear.app))
- **Cosa osservare**:
  - L'uso superbo del Dark Mode e delle palette grigie e nere.
  - La precisione dei bordi da 1px semi-trasparenti per separare le sezioni.
  - L'effetto spotlight sulle card (il gradiente che segue il puntatore del mouse).
  - Micro-interazioni fluide al passaggio sui pulsanti e nei menu.
- **Cosa non copiare**:
  - La struttura specifica dell'applicazione di project management.
  - I colori identificativi del loro brand.

### Apple ([apple.com](https://www.apple.com))
- **Cosa osservare**:
  - Lo storytelling visivo incentrato sui dettagli dei prodotti fisici.
  - Le transizioni guidate dallo scroll (scroll-driven animations) per mostrare l'interno o l'esploso di un dispositivo.
  - La scala tipografica grandiosa e pulita.
  - La transizione fluida tra testo e immagini.
- **Cosa non copiare**:
  - Il menu di navigazione standard di Apple.
  - Lo stile fotografico specifico a sfondo bianco puro (se decidiamo di usare il dark mode premium).

### Stripe ([stripe.com](https://stripe.com))
- **Cosa osservare**:
  - I mega-menu a tendina animati che si adattano dinamicamente alla dimensione del contenuto (popover transitions).
  - La chiarezza espositiva dei servizi complessi.
  - Diagrammi di flusso animati integrati direttamente nella pagina (animazioni SVG).
- **Cosa non copiare**:
  - I gradienti colorati diagonali eccessivamente iconici di Stripe (troppo riconoscibili).

### Vercel ([vercel.com](https://vercel.com))
- **Cosa osservare**:
  - Il minimalismo estremo basato su bianco, nero e grigio.
  - La velocità di caricamento e la reattività istantanea dei componenti.
  - L'uso di font a spaziatura fissa (monospace) per codici o specifiche tecniche.
- **Cosa non copiare**:
  - Il look eccessivamente orientato agli sviluppatori di software (il nostro target è anche industriale).

---

## 2. Elementi da Analizzare per Sezione

### Hero Section
- **Cosa cercare**: Strutture con un titolo centrale o asimmetrico a sinistra, seguito da una CTA secondaria e un elemento grafico sottostante (es. una dashboard o un mockup tridimensionale) che emerge parzialmente dal fondo pagina.
- **Storytelling**: La Hero deve rispondere a tre domande in 3 secondi: *Cos'è? Per chi è? Perché è la scelta migliore?*

### Animazioni & Transizioni
- **Cosa cercare**: Transizioni che seguono l'inerzia naturale (ease-out/ease-in-out morbide).
- **Scroll Reveal**: Elementi che compaiono con un leggero fade-in associato a uno spostamento sull'asse Y (traslazione verso l'alto di 20-30px).

### Cards & Layouts
- **Cosa cercare**: Griglie bento-box asimmetriche (Bento Grid) che mostrano diverse funzionalità o vantaggi con dimensioni differenti delle card, rendendo la lettura visivamente varia ed interessante.

### Call to Action (CTA)
- **Cosa cercare**: Pulsanti con effetti di riflesso interni (shimmer/glow effect) e transizioni di colore del bordo o dello sfondo estremamente morbide.
