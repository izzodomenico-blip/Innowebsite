import {
  WashingMachine,
  Pill,
  Truck,
  Factory,
  DraftingCompass,
  PencilRuler,
  Wrench,
  HardHat,
  CircleCheck,
  Headset,
  RefreshCw,
  Cpu,
  Building2,
  Tent,
  ShieldCheck,
  Boxes,
  Workflow,
  Layers,
  BookOpen,
  BadgeCheck,
  CircuitBoard,
  Wind,
  LayoutGrid,
  History,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * Single source of truth per i contenuti del sito INNO.TEC.
 * Tutti i dati sono reali (fonte: innotecsrl.eu). Nessun dato inventato:
 * dove un'informazione non è disponibile è omessa e segnalata con un commento.
 */

export const company = {
  legalName: "Inno.Tec S.r.l.",
  name: "INNO.TEC",
  /** Slogan ufficiale dell'azienda. */
  tagline:
    "Velocizzare, ottimizzare e automatizzare sono il leitmotiv del nostro lavoro.",
  /** Vision aziendale. */
  vision: "Essere l'azienda di riferimento nel material handling.",
  /** Descrizione sintetica usata in hero e metadata. */
  description:
    "INNO.TEC progetta, costruisce e installa sistemi di material handling e automazione industriale su misura: dall'analisi di fattibilità all'engineering, dalla produzione all'installazione e al collaudo, fino all'assistenza tecnica.",
} as const;

/**
 * URL di produzione (canonical, metadataBase, sitemap, JSON-LD).
 * DA CONFERMARE: impostato sul dominio attuale dell'azienda; aggiornare se il
 * nuovo sito verrà pubblicato su un dominio/sottodominio diverso.
 */
export const siteUrl = "https://www.innotecsrl.eu";

/** Parole chiave coerenti col business (uso SEO marginale, ma innocue). */
export const keywords = [
  "material handling",
  "automazione industriale",
  "trasportatori a rulli",
  "trasportatori a nastro",
  "manipolatori industriali",
  "celle di automazione",
  "soppalchi industriali",
  "carpenteria metallica",
  "Industria 4.0",
  "INNO.TEC",
  "Marcianise",
  "Caserta",
];

export const contacts = {
  address: {
    street: "Via Ettore Majorana, snc",
    city: "81025 Marcianise (CE)",
    country: "Italia",
  },
  phone: { label: "0823 459968", href: "tel:+390823459968" },
  email: "amministrazione@innotecsrl.eu",
  social: {
    linkedin: "https://www.linkedin.com/company/inno-tec-srl",
    instagram: "https://www.instagram.com/inno.tec_s.r.l_",
    facebook: "https://www.facebook.com/profile.php?id=100068129831873",
  },
  // NOTA: P.IVA, REA e capitale sociale non sono pubblicati sul sito attuale.
  // Vanno richiesti al cliente prima di inserirli (nessun dato inventato).
} as const;

export type NavItem = { name: string; href: string };

export const navigation: NavItem[] = [
  { name: "Settori", href: "#settori" },
  { name: "Soluzioni", href: "#soluzioni" },
  { name: "Metodo", href: "#metodo" },
  { name: "INNO.CELL", href: "#inno-cell" },
  { name: "Strutture", href: "#strutture" },
];

export type Sector = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  /** Video del settore (mp4). Se assente la card mostra un placeholder blueprint. */
  video?: string;
  poster?: string;
};

export const sectors: Sector[] = [
  {
    id: "elettrodomestico",
    title: "Elettrodomestico",
    description:
      "Linee di produzione e sistemi di movimentazione per l'industria del bianco e dell'elettrodomestico.",
    icon: WashingMachine,
    video: "/renders/ELETTRODOMESTICO.mp4",
    poster: "/renders/elettrodomestico-poster.jpg",
  },
  {
    id: "farmaceutico",
    title: "Distribuzione farmaceutica",
    description:
      "Logistica di magazzino e handling per la distribuzione farmaceutica, dove precisione e tracciabilità sono essenziali.",
    icon: Pill,
    video: "/renders/FARMACEUTICO.mp4",
    poster: "/renders/farmaceutico-poster.jpg",
  },
  {
    id: "logistica",
    title: "Logistica e distribuzione",
    description:
      "Ottimizzazione dei flussi di materiale per centri logistici e di distribuzione ad alta intensità.",
    icon: Truck,
  },
  {
    id: "industria",
    title: "Industria su misura",
    description:
      "Sistemi di material handling custom, ingegnerizzati sulle specifiche esigenze del processo produttivo.",
    icon: Factory,
  },
];

export type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const services: Service[] = [
  {
    title: "Engineering",
    description:
      "Analisi di fattibilità, calcoli e ingegnerizzazione del sistema sulle esigenze reali di processo.",
    icon: DraftingCompass,
  },
  {
    title: "Progettazione",
    description:
      "Progettazione meccanica e di dettaglio dei moduli, delle linee e dei componenti.",
    icon: PencilRuler,
  },
  {
    title: "Costruzione",
    description:
      "Produzione e assemblaggio dei sistemi con squadre e officina specializzate.",
    icon: Wrench,
  },
  {
    title: "Installazione",
    description:
      "Montaggio meccanico, elettrico e software presso il sito del cliente con team dedicati.",
    icon: HardHat,
  },
  {
    title: "Messa in funzione e collaudo",
    description:
      "Avviamento, test e collaudo degli impianti fino alla piena operatività.",
    icon: CircleCheck,
  },
  {
    title: "Assistenza 24h",
    description:
      "Supporto tecnico pre e post-vendita, con assistenza on-site e reperibilità 24 ore.",
    icon: Headset,
  },
  {
    title: "Revamping e relocation",
    description:
      "Aggiornamento, ricostruzione e ricollocazione di impianti esistenti per estenderne la vita utile.",
    icon: RefreshCw,
  },
  {
    title: "Industria 4.0 / 5.0",
    description:
      "Software di controllo, integrazione dei dati e connettività cloud per impianti connessi.",
    icon: Cpu,
  },
];

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Analisi",
    description: "Studio di fattibilità e analisi delle esigenze produttive.",
  },
  {
    number: "02",
    title: "Engineering",
    description: "Progettazione ingegneristica, meccanica e di dettaglio.",
  },
  {
    number: "03",
    title: "Produzione",
    description: "Costruzione e assemblaggio dei moduli in officina.",
  },
  {
    number: "04",
    title: "Installazione",
    description: "Montaggio meccanico, elettrico e software on-site.",
  },
  {
    number: "05",
    title: "Collaudo",
    description: "Messa in funzione, test e avviamento dell'impianto.",
  },
  {
    number: "06",
    title: "Assistenza",
    description: "Supporto continuo e assistenza tecnica 24 ore.",
  },
];

export const innocell = {
  name: "INNO.CELL",
  eyebrow: "Soluzione modulare",
  title: "L'automazione, condensata in una cella.",
  description:
    "INNO.CELL è la soluzione modulare e intelligente di INNO.TEC per la movimentazione automatizzata: un'isola compatta che integra meccanica, controllo e flussi di processo in un unico modulo scalabile.",
  features: [
    {
      title: "Modulare",
      description: "Architettura a moduli, configurabile e replicabile.",
      icon: Boxes,
    },
    {
      title: "Intelligente",
      description: "Controllo integrato e dati di processo in tempo reale.",
      icon: Cpu,
    },
    {
      title: "Scalabile",
      description: "Cresce con la produzione, senza ridisegnare l'impianto.",
      icon: Layers,
    },
    {
      title: "Flussi ottimizzati",
      description: "Movimentazione fluida tra ingresso, lavorazione e uscita.",
      icon: Workflow,
    },
  ],
  // NOTA: specifiche tecniche di dettaglio (dimensioni, portate, cicli)
  // da validare con il cliente prima della pubblicazione.
} as const;

export type Structure = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const structures: Structure[] = [
  {
    title: "Soppalchi industriali",
    description:
      "Soppalchi e strutture in carpenteria metallica per ottimizzare gli spazi operativi.",
    icon: Building2,
  },
  {
    title: "Tensostrutture",
    description:
      "Coperture e tensostrutture per ambienti industriali e logistici.",
    icon: Tent,
  },
  {
    title: "Carpenteria certificata",
    description:
      "Strutture in acciaio e alluminio realizzate secondo la norma UNI EN 1090-1.",
    icon: ShieldCheck,
  },
];

export type DocCategory = {
  title: string;
  description: string;
  icon: LucideIcon;
};

/** Categorie di documentazione (tipi reali; nessun documento o cliente finto). */
export const docCategories: DocCategory[] = [
  {
    title: "Manuali uso e manutenzione",
    description: "Documentazione operativa di ogni macchina e impianto.",
    icon: BookOpen,
  },
  {
    title: "Dichiarazioni CE / UE",
    description: "Dichiarazioni di conformità e marcatura.",
    icon: BadgeCheck,
  },
  {
    title: "Schemi elettrici",
    description: "Schemi e quadri elettrici dell'impianto.",
    icon: CircuitBoard,
  },
  {
    title: "Schemi pneumatici",
    description: "Circuiti e componenti pneumatici.",
    icon: Wind,
  },
  {
    title: "Layout impianto",
    description: "Disposizione, ingombri e installazione.",
    icon: LayoutGrid,
  },
  {
    title: "Ricambi",
    description: "Liste ricambi e codici dei componenti.",
    icon: Wrench,
  },
  {
    title: "Revisioni documentali",
    description: "Versioni aggiornate e storico delle revisioni.",
    icon: History,
  },
  {
    title: "Assistenza post-vendita",
    description: "Richieste di supporto e interventi.",
    icon: Headset,
  },
];

export const clientArea = {
  eyebrow: "Area Clienti",
  title: "La tua macchina e i suoi documenti, sempre con te.",
  description:
    "I clienti INNO.TEC accederanno in modo riservato a macchine, manuali, dichiarazioni di conformità, schemi e assistenza. In futuro ogni macchina potrà avere un QR code dedicato per raggiungere rapidamente la sua scheda e la sua documentazione.",
} as const;

export type Certification = {
  code: string;
  description: string;
};

export const certifications: Certification[] = [
  {
    code: "UNI EN 1090-1:2012",
    description: "Componenti strutturali in acciaio e alluminio.",
  },
  {
    code: "ISO 45001",
    description: "Gestione della salute e sicurezza sul lavoro.",
  },
];

/**
 * Render/foto reali per gli slot visivi (FASE C).
 *
 * Finché un valore è `null` viene mostrato il fallback SVG.
 * Per attivare un'immagine reale: genera/ottieni il file (vedi
 * public/renders/README.md per prompt e specifiche), salvalo in
 * /public/renders/ e imposta qui il percorso, es:
 *   heroConveyor: "/renders/hero-conveyor.webp"
 */
/**
 * Un asset può essere un'immagine (`src`) oppure un video (`video` + `poster`).
 * Esempi:
 *   structures: { video: "/renders/structures.mp4", poster: "/renders/structures-poster.webp", alt: "..." }
 *   heroConveyor: { src: "/renders/hero-conveyor.webp", alt: "..." }
 */
export type RenderAsset = {
  src?: string;
  video?: string;
  poster?: string;
  alt: string;
};

export const renders: {
  heroConveyor: RenderAsset | null;
  innocell: RenderAsset | null;
  structures: RenderAsset | null;
} = {
  heroConveyor: {
    video: "/renders/logo-intro.mp4",
    poster: "/renders/logo-poster.jpg",
    alt: "INNO.TEC — material handling e automazione industriale",
  },
  innocell: null,
  structures: {
    video: "/renders/TENDOSTRUTTURE.mp4",
    poster: "/renders/structures-poster.jpg",
    alt: "Montaggio di una tensostruttura industriale INNO.TEC",
  },
};
