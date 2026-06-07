# Direzione Artistica (DESIGN_DIRECTION.md)

Questo documento definisce l'identità visiva, lo stile grafico e le linee guida per la UX del nuovo sito **innowebsite**. Serve come riferimento costante per l'implementazione della UI e delle animazioni.

---

## 1. Stile Visivo Desiderato
Il design deve posizionarsi all'intersezione tra l'estetica dei prodotti SaaS più all'avanguardia e la solidità del mondo ingegneristico-industriale.

- **Premium**: Finiture curate nei dettagli, bordi sottili di 1px, ombreggiature morbide e sfocature di sfondo.
- **Industrial-Tech**: Focus su precisione meccanica, componenti modulari, automazione ed ecosistemi hardware-software.
- **Moderno & Dinamico**: Interfaccia che risponde attivamente all'utente con micro-animazioni ed elementi in movimento guidati dallo scroll.
- **Elegante & Autorevole**: Uso bilanciato degli spazi bianchi, tipografia imponente e palette colori sofisticata.
- **Tecnologico & Pulito**: Assenza di elementi superflui. Il layout deve apparire strutturato come un progetto tecnico d'ingegneria, ma estremamente raffinato.
- **Non Pacchiano / Non Standard**: Evitare grafiche infantili, colori ultra-saturi non coordinati, animazioni caotiche e layout pre-confezionati stile template Bootstrap anni 2010.

---

## 2. Fonti di Ispirazione Estetica
- **Apple**: Pulizia layout, cura maniacale dei dettagli di prodotto, fotografia impeccabile ed animazioni fluide.
- **Linear**: Uso magistrale del Dark Mode, bordi sottili di divisione (grigio scuro), angoli arrotondati precisi ed effetti di luce soffusa (glow).
- **Vercel**: Geometrie pulite, contrasto netto tra bianco e nero, transizioni istantanee e font monospace per dettagli tecnici.
- **Stripe**: Gradienti dinamici e complessi, transizioni fluide dei menu a tendina, diagrammi interattivi e layout impeccabili.
- **Framer**: Animazioni creative, interazione con il mouse avanzata, transizioni spaziali tridimensionali e storytelling visivo dinamico.
- **SaaS Premium & Industrial-Tech Evoluti**: Interfacce scure con cruscotti di controllo (dashboard preview), schemi a blocchi funzionali e rappresentazioni 3D/CAD di macchinari industriali.

---

## 2. Tavolozza Colori Consigliata (Dark Mode Principale)
- **Sfondo Primario**: Nero profondo / Grigio scuro opaco (es. HSL `240 10% 3.9%` o `#09090b`).
- **Sfondo Secondario / Card**: Grigio antracite con bordo semi-trasparente (es. HSL `240 5.9% 10%` con bordo `border-white/10`).
- **Colore Accento (Brand & Focus)**:
  - Blu Elettrico / Ciano (es. `#00d2ff` o `#0070f3`) per rimandi tecnologici e flussi dati.
  - Sfumature di ciano e viola per gradienti premium.
- **Testi**:
  - Principale: Bianco puro / Grigio chiaro (es. `#f4f4f5` o `#fafafa`).
  - Secondario / Muted: Grigio medio (es. `#a1a1aa` o `#71717a`).

---

## 3. Elementi Visuali Desiderati

### Hero Section Memorabile
- Un titolo tipografico forte (es. font *Outfit* o *Geist* con peso `font-bold` o `font-black`).
- Sfondo con un pattern geometrico sottile (es. griglia di pixel o linee di scansione) con un gradiente radiale che segue il mouse o illumina la sezione centrale.
- Un visual centrale ad alto impatto (es. mockup interattivo o render AI 3D con effetto profondità).

### Immagini AI & Componenti Esplosi
- Utilizzo di render in "exploded view" (viste esplose) di componenti meccanici o moduli software. I visual devono comunicare ingegnerizzazione e precisione.
- Gli elementi dell'esploso possono avere lievi movimenti fluttuanti (parallax/floating) per dare profondità.

### Interattività & Effetti Dinamici
- **Mouse Interaction**: Elementi che ruotano leggermente (tilt effect) o si illuminano al passaggio del cursore del mouse (card con effetto spotlight radial-gradient).
- **Scroll Reveal**: Comparsa asimmetrica delle sezioni mentre l'utente scorre la pagina, mantenendo il movimento morbido.
- **Dashboard Preview**: Una rappresentazione stilizzata e interattiva di un software di monitoraggio industriale (grafici lineari in tempo reale, stati macchina, flussi di automazione).
- **Floating Cards & Diagrammi Animati**: Card informative che fluttuano a diversi livelli di profondità sull'asse Z. Diagrammi di flusso che mostrano dati in movimento (es. pallini luminosi che corrono lungo linee di collegamento SVG).
