# Render / Foto reali — slot visivi INNO.TEC

Questa cartella ospita i visual reali (render AI o foto) che sostituiscono gli
schemi SVG segnaposto negli slot del sito.

## Come attivare un'immagine (drop-in, 1 minuto)

1. Genera/ottieni l'immagine (vedi prompt più sotto).
2. Ottimizzala in **WebP** e salvala qui con il **nome esatto** indicato.
3. Apri `src/content/site.ts` → oggetto `renders` e imposta il percorso, es:

   ```ts
   export const renders = {
     heroConveyor: { src: "/renders/hero-conveyor.webp", alt: "Trasportatore a rulli modulare INNO.TEC" },
     innocell:     { src: "/renders/inno-cell.webp",     alt: "Cella di automazione modulare INNO.CELL" },
     structures:   { src: "/renders/structures.webp",    alt: "Soppalco industriale in carpenteria metallica" },
   };
   ```

   Finché un valore resta `null`, lo slot mostra automaticamente il fallback SVG.
   Nessun'altra modifica al codice è necessaria.

## Specifiche tecniche

- **Formato**: WebP (in alternativa AVIF/PNG con trasparenza).
- **Sfondo**: scuro o trasparente (il sito è dark). Evitare sfondi bianchi.
- **Risoluzione**: lato lungo ~1600–2000px (gli slot sono ≤ 760px renderizzati).
- **Stile**: render premium, vista esplosa, luce da studio, accenti ciano,
  **senza testi, lettere, numeri o loghi** generati dall'AI.
- **Peso**: puntare a < 250 KB per immagine dopo compressione.

## Slot e nomi file

| Slot | File | Aspect | Soggetto |
| :--- | :--- | :--- | :--- |
| Hero | `hero-conveyor.webp` | 16:9 | Trasportatore a rulli modulare (vista esplosa) |
| INNO.CELL | `inno-cell.webp` | 1:1 | Cella di automazione modulare |
| Strutture | `structures.webp` | 4:3 | Soppalco / struttura in carpenteria metallica |

---

## Prompt AI pronti (Midjourney / DALL·E / SDXL)

### 1) Hero — `hero-conveyor.webp` (16:9)
> Premium industrial technology exploded view of a modular roller conveyor
> module, rollers, side frames, drive motor, sensors, supports, mechanical
> parts floating in precise alignment, clean engineering render, futuristic but
> realistic, soft studio lighting, dark elegant background, subtle blue/cyan
> rim glow, high-end SaaS industrial-tech aesthetic, realistic brushed metal and
> dark polymer materials, cinematic depth of field, no text, no logos, ultra
> clean, professional product visualization --ar 16:9

### 2) INNO.CELL — `inno-cell.webp` (1:1)
> Premium exploded view of a modular intelligent automation cell, compact
> robotic handling island, input/output conveyor stubs, control module, sensors,
> data flow hints as subtle glowing cyan lines, floating modular components in
> precise alignment, elegant dark background, soft studio lighting, realistic
> metal and glass materials, high-end industrial-tech render, cinematic depth,
> no text, no logos, ultra clean --ar 1:1

### 3) Strutture — `structures.webp` (4:3)
> Premium engineering render of an industrial steel mezzanine structure,
> bolted steel beams and columns, cross bracing, access staircase, modular
> metal framework, exploded/technical look, elegant dark background, soft studio
> lighting, subtle cyan accents, realistic galvanized steel material, high-end
> industrial design visualization, no text, no logos, ultra clean --ar 4:3

> Suggerimento: mantenere coerenza tra i tre visual (stessa palette, stessa
> luce, stesso tipo di sfondo) per un effetto "famiglia di prodotto".

---

## Video (slot .mp4)

Ogni slot accetta anche un **video** al posto dell'immagine. Il video parte
quando entra in viewport (reveal, non in loop), è muto/`playsInline`, e in
`prefers-reduced-motion` resta sul **poster** (ultimo frame).

**Attivazione** — salva i file in `/public/renders/` e in `site.ts` → `renders`:

```ts
structures: {
  video: "/renders/structures.mp4",
  poster: "/renders/structures-poster.webp", // ultimo frame (struttura finita)
  alt: "Montaggio di una struttura industriale INNO.TEC",
},
```

**Specifiche video**
- **16:9**, ~12s, **1920×1080** (o 1280×720), **24–30 fps**.
- **MP4 (H.264)** + opzionale **WebM (VP9)**; **muto**; target **< 4 MB**.
- **Poster** = ultimo frame (mostrato prima del play e in reduced-motion).
- Non in loop: è un *reveal* (parte una volta quando entra in viewport).

**Nomi file consigliati**: `structures.mp4` + `structures-poster.webp`
(stesso schema per `hero-conveyor.mp4`/`inno-cell.mp4` se vorrai animare anche
quegli slot).

**Generazione (image-to-video)**: usa il frame **wireframe** come primo frame e
la **struttura clad** come ultimo frame (Kling / Luma / Runway) per una
trasformazione brand-esatta. Prompt master fornito separatamente.
