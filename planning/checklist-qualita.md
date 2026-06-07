# Checklist di Qualità (planning/checklist-qualita.md)

Questo documento elenca i criteri di accettazione qualitativi che il progetto deve soddisfare prima di poter essere considerato pronto per il rilascio in produzione.

---

## 1. Compilazione e Codice
- [ ] **Build**: La build di produzione di Next.js (`npm run build`) viene completata con successo senza alcun errore o warning bloccante.
- [ ] **Lint**: L'analisi statica del codice (`npm run lint`) non rileva violazioni di stile o errori di sintassi.
- [ ] **TypeScript**: Nessun tipo `any` non giustificato. Il compilatore in modalità `strict` non restituisce errori.
- [ ] **Console**: La console del browser non presenta errori JavaScript (`uncaught exceptions`) o warning rilevanti durante la navigazione di tutte le pagine.

---

## 2. Esperienza Visiva e Responsività
- [ ] **Responsive**: Il layout si adatta fluidamente su schermi mobile (320px+), tablet (768px+), laptop (1024px+), desktop standard (1440px) e monitor di grandi dimensioni (2560px).
- [ ] **Mobile**: I menu e gli elementi interattivi sono facilmente cliccabili con le dita (touch target di almeno 48x48px). Nessun elemento straborda orizzontalmente (no horizontal scrolling indesiderato).
- [ ] **Coerenza Design**: Allineamento rigido alla palette colori, alla tipografia e al sistema di spaziatura definiti in `DESIGN_DIRECTION.md`.

---

## 3. Animazioni (Motion System)
- [ ] **Fluidità**: Le animazioni ed i passaggi di stato mantengono frame rate elevati (puntando a 60fps) anche su dispositivi di fascia media.
- [ ] **Discrezione**: Le animazioni non rallentano la compilazione del testo o l'interazione fondamentale dell'utente.
- [ ] **Preferenza Movimento Ridotto**: Rispetto dell'impostazione di sistema per utenti che preferiscono animazioni ridotte tramite la media query `@media (prefers-reduced-motion: reduce)`.

---

## 4. Accessibilità (a11y)
- [ ] **Semantica HTML**: Corretto utilizzo dei tag di struttura.
- [ ] **Contrasto Cromatico**: Tutti i testi e gli elementi interattivi soddisfano lo standard WCAG AA.
- [ ] **Keyboard Navigation**: Navigazione del sito possibile interamente tramite tasto `Tab` e attivazione elementi con `Invio` / `Spazio`.
- [ ] **Aria Attributes**: Utilizzo di attributi `aria-label` per icone interattive e tag di descrizione per screen reader.

---

## 5. Ottimizzazione SEO & Performance
- [ ] **Metadati**: Presenti titolo e descrizione unici ed efficaci su ogni pagina. I tag Open Graph sono configurati correttamente.
- [ ] **Immagini**: Tutte le immagini utilizzano formati moderni (WebP/AVIF) e sono ottimizzate con il componente `next/image` per evitare variazioni di layout (CLS).
- [ ] **Core Web Vitals**: Punteggio Lighthouse superiore a 90 nelle categorie:
  - Performance
  - Accessibilità
  - Best Practice
  - SEO
- [ ] **Sitemap & Robots**: Generati correttamente nella build finale.

---

## 6. Contenuti
- [ ] **Dati Corretti**: Numeri di telefono, indirizzi email, dati societari e contatti sono verificati ed esatti.
- [ ] **Ordinamento Visivo**: I testi non si sovrappongono in nessun breakpoint responsivo.
- [ ] **Zero Placeholder**: Nessun testo "lorem ipsum" o immagine di test residua.

---

## 7. Deploy e Pipeline
- [ ] **SSL**: Il certificato HTTPS è attivo e configurato correttamente sul dominio di destinazione.
- [ ] **Redirect**: I reindirizzamenti da HTTP a HTTPS e da non-www a www sono attivi.
- [ ] **Caching**: La configurazione del server/CDN gestisce la cache degli asset statici in modo ottimale.
