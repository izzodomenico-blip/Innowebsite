/**
 * Area Clienti & Documentazione Digitale — MODELLO DATI (SOLO TIPI) — v2 (FASE G2.5).
 *
 * NON contiene dati reali, NON implementa backend/DB/auth e NON è ancora usato a
 * runtime. È la base per la futura integrazione (vedi
 * `docs/customer-area-architecture.md`).
 *
 * Convenzione di naming (DECISA in G2.5, quindi esplicita e coerente):
 * - Nomi CAMPO in ITALIANO (allineati alla specifica e ai contenuti del sito).
 * - Valori enum e nomi TIPO/entità in INGLESE (convenzione tecnica).
 * - Le label IT/EN restano nella UI. In Postgres le colonne saranno snake_case.
 */

// ──────────────────────────── Identificatori ────────────────────────────

/** UUID v4 (come sarà in Postgres/Supabase). */
export type UUID = string;
export type CustomerId = UUID;
export type UserId = UUID;
export type MachineId = UUID;
export type DocumentId = UUID;
export type RevisionId = UUID;
export type AccessLogId = UUID;
export type TicketId = UUID;
export type TicketMessageId = UUID;
export type AssignmentId = UUID;

/** Timestamp ISO 8601 in UTC, es. "2026-06-07T10:00:00Z". */
export type ISODateString = string;

// ──────────────────────────── Enumerazioni ──────────────────────────────

export type CustomerStatus = "active" | "suspended" | "archived";

export type UserRole =
  | "adminInnotec"
  | "clienteAdmin"
  | "clienteUser"
  | "manutentore";

export type UserStatus = "invited" | "active" | "disabled";

export type MachineStatus = "active" | "maintenance" | "decommissioned";

/** Tassonomia settori (allineata a quella del sito pubblico). */
export type Sector =
  | "elettrodomestico"
  | "farmaceutico"
  | "logistica"
  | "industria"
  | "altro";

export type DocumentType =
  | "manuale_uso_manutenzione"
  | "dichiarazione_ce"
  | "schema_elettrico"
  | "schema_pneumatico"
  | "layout"
  | "ricambi"
  | "certificato"
  | "altro";

export type DocumentVisibility = "public" | "private";

/** Lingua ISO 639-1 (estendibile). */
export type Language = "it" | "en" | "de" | "fr" | "es";

export type AccessAction = "view" | "download" | "print";

export type TicketStatus =
  | "open"
  | "in_progress"
  | "waiting_customer"
  | "resolved"
  | "closed";

export type TicketPriority = "low" | "normal" | "high" | "urgent";

// ──────────────────────────── Entità ────────────────────────────────────

/** Azienda cliente (tenant). */
export interface Customer {
  id: CustomerId;
  /** Codice cliente leggibile e UNIVOCO (usato anche nel login "codice cliente"). */
  codiceCliente: string;
  ragioneSociale: string;
  emailReferente: string;
  telefono: string;
  stato: CustomerStatus;
  createdAt: ISODateString;
  // Estensioni opzionali:
  partitaIva?: string;
  note?: string;
  updatedAt?: ISODateString;
}

/** Profilo utente. `id` coincide con l'utente di Supabase Auth. */
export interface UserProfile {
  id: UserId;
  /** Tenant di appartenenza. `null` solo per `adminInnotec` (staff interno). */
  customerId: CustomerId | null;
  nome: string;
  email: string;
  ruolo: UserRole;
  stato: UserStatus;
  lastLogin: ISODateString | null;
  createdAt?: ISODateString;
}

/** Macchina / impianto consegnato a un cliente. */
export interface Machine {
  id: MachineId;
  customerId: CustomerId;
  /** UNIVOCA (vincolo unique nel DB). */
  matricola: string;
  codiceCommessa: string;
  nomeImpianto: string;
  descrizione: string;
  anno: number;
  /** Data di messa in servizio: base per il calcolo della "vita macchina". */
  commissionedAt?: ISODateString | null;
  settore: Sector;
  stato: MachineStatus;
  /** Token opaco pubblico, UNIVOCO e non indovinabile, usato nel QR (≠ matricola). */
  publicCode: string;
  /** URL del QR, DERIVATO da publicCode (colonna generata nel DB). Vedi machineQrPath(). */
  qrCodeUrl: string;
  /** Avvia il conteggio della retention minima post-dismissione. */
  decommissionedAt?: ISODateString | null;
  createdAt?: ISODateString;
  updatedAt?: ISODateString;
}

/**
 * Documento: metadati + puntatore alla revisione corrente.
 * I FILE NON stanno qui: vivono in `DocumentRevision` (fonte unica di verità).
 */
export interface Document {
  id: DocumentId;
  machineId: MachineId;
  /** Denormalizzato dal Machine (coerenza garantita da trigger nel DB). */
  customerId: CustomerId;
  titolo: string;
  tipoDocumento: DocumentType;
  lingua: Language;
  /** Revisione corrente; i file/attributi stanno in DocumentRevision. */
  currentRevisionId: RevisionId;
  downloadable: boolean;
  printable: boolean;
  visibility: DocumentVisibility;
  updatedAt: ISODateString;
  createdAt?: ISODateString;
}

/** Revisione di un documento (storico immutabile + file effettivo). */
export interface DocumentRevision {
  id: RevisionId;
  documentId: DocumentId;
  /** Numero progressivo monotòno: ordina e individua "l'ultima". */
  revisionNumber: number;
  /** Etichetta visualizzata, es. "Rev. 03". */
  revisionLabel: string;
  /** Path nel bucket PRIVATO (NON un URL pubblico: l'URL è il signed URL effimero). */
  storagePath: string;
  fileName: string;
  /** Dimensione file in byte. */
  fileSize: number;
  mimeType: string;
  /** Hash sha256 per integrità (consigliato). */
  checksum?: string;
  /** Validità di questa specifica revisione. */
  validFrom: ISODateString;
  note: string;
  createdBy?: UserId;
  createdAt: ISODateString;
}

/** Log di accesso (append-only, per audit e tracciabilità). */
export interface AccessLog {
  id: AccessLogId;
  userId: UserId;
  documentId: DocumentId;
  /** Revisione effettivamente acceduta (audit di conformità: "quale versione"). */
  revisionId?: RevisionId;
  /** Denormalizzato e OBBLIGATORIO: serve all'RLS per "log del mio cliente". */
  customerId: CustomerId;
  action: AccessAction;
  timestamp: ISODateString;
  ip?: string;
  userAgent?: string;
}

/** Ticket di assistenza post-vendita (intestazione del thread). */
export interface SupportTicket {
  id: TicketId;
  customerId: CustomerId;
  /** Macchina collegata (facoltativa: alcuni ticket sono generali). */
  machineId: MachineId | null;
  subject: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  /** Autore del ticket (obbligatorio). */
  createdBy: UserId;
  /** Staff INNO.TEC incaricato (facoltativo). */
  assignedTo?: UserId | null;
  createdAt: ISODateString;
  updatedAt?: ISODateString;
  closedAt?: ISODateString | null;
}

/** Messaggio nel thread di un ticket (conversazione post-vendita). */
export interface TicketMessage {
  id: TicketMessageId;
  ticketId: TicketId;
  authorId: UserId;
  body: string;
  createdAt: ISODateString;
}

/**
 * OPZIONALE / FUTURO — assegnazione macchina ↔ utente.
 * Serve SOLO se il "manutentore" sarà un tecnico INNO.TEC sul campo con accesso
 * a macchine specifiche (anche di clienti diversi). Nella v1 il manutentore è
 * lato cliente (un solo `customerId`) e questa entità NON è usata.
 */
export interface MachineAssignment {
  id: AssignmentId;
  userId: UserId;
  machineId: MachineId;
  createdAt: ISODateString;
}

// ──────────────────────────── Permessi (RBAC) ───────────────────────────

/**
 * Capability nel formato `risorsa:azione[:scope]`.
 * Lo scope (`own` = proprie, `own-customer` = del proprio tenant, `technical` =
 * solo documenti tecnici) va SEMPRE imposto lato server con RLS: questi permessi
 * descrivono solo il "tipo" di azione consentita al ruolo.
 * NB: `roleHasPermission` da solo NON autorizza — è solo un capability-check.
 */
export type Permission =
  | "customer:read:any"
  | "customer:read:own"
  | "customer:manage"
  | "user:read:own-customer"
  | "user:invite:own-customer"
  | "user:manage:own-customer"
  | "user:manage:any"
  | "machine:read:any"
  | "machine:read:own-customer"
  | "machine:manage"
  | "document:read:public"
  | "document:read:own-customer"
  | "document:read:technical"
  | "document:download"
  | "document:print"
  | "document:manage"
  | "revision:manage"
  | "ticket:create:own-customer"
  | "ticket:read:own"
  | "ticket:read:own-customer"
  | "ticket:read:any"
  | "ticket:manage"
  | "accesslog:read:own-customer"
  | "accesslog:read:any";

/** Matrice ruolo → permessi. Fonte di verità per il gating lato UI/server. */
export const ROLE_PERMISSIONS = {
  adminInnotec: [
    "customer:read:any",
    "customer:manage",
    "user:manage:any",
    "user:manage:own-customer",
    "user:read:own-customer",
    "user:invite:own-customer",
    "machine:read:any",
    "machine:manage",
    "document:read:public",
    "document:read:own-customer",
    "document:download",
    "document:print",
    "document:manage",
    "revision:manage",
    "ticket:read:any",
    "ticket:manage",
    "ticket:create:own-customer",
    "accesslog:read:any",
  ],
  clienteAdmin: [
    "customer:read:own",
    "user:read:own-customer",
    "user:invite:own-customer",
    "user:manage:own-customer",
    "machine:read:own-customer",
    "document:read:public",
    "document:read:own-customer",
    "document:download",
    "document:print",
    "ticket:create:own-customer",
    "ticket:read:own-customer",
    "accesslog:read:own-customer",
  ],
  clienteUser: [
    "customer:read:own",
    "machine:read:own-customer",
    "document:read:public",
    "document:read:own-customer",
    "document:download",
    "document:print",
    "ticket:create:own-customer",
    "ticket:read:own",
  ],
  manutentore: [
    "machine:read:own-customer",
    "document:read:public",
    "document:read:technical",
    "document:download",
    "document:print",
    "ticket:create:own-customer",
    "ticket:read:own",
  ],
} as const satisfies Record<UserRole, readonly Permission[]>;

/**
 * Verifica PURA di capability (nessun accesso a dati).
 * Lo scope (own / own-customer / technical) va comunque imposto lato server con RLS.
 */
export function roleHasPermission(
  role: UserRole,
  permission: Permission
): boolean {
  return (ROLE_PERMISSIONS[role] as readonly Permission[]).includes(permission);
}

/** Tipi documento considerati "tecnici" — ciò che il `manutentore` può vedere. */
export const TECHNICAL_DOCUMENT_TYPES = [
  "manuale_uso_manutenzione",
  "dichiarazione_ce",
  "schema_elettrico",
  "schema_pneumatico",
  "layout",
  "ricambi",
  "certificato",
] as const satisfies readonly DocumentType[];

export function isTechnicalDocumentType(type: DocumentType): boolean {
  return (TECHNICAL_DOCUMENT_TYPES as readonly DocumentType[]).includes(type);
}

// ──────────────────────────── QR code ───────────────────────────────────

/** Prefisso path (senza dominio) della scheda macchina raggiunta dal QR. */
export const MACHINE_CARD_PATH = "/m";

/** Path della scheda macchina dato il publicCode (l'URL completo aggiunge il dominio). */
export function machineQrPath(publicCode: string): string {
  return `${MACHINE_CARD_PATH}/${publicCode}`;
}

// ──────────────────────────── Retention ─────────────────────────────────

/** Regole di conservazione documentale (vedi doc, §Retention). */
export const DOCUMENT_RETENTION = {
  /** I documenti restano disponibili per tutta la vita della macchina. */
  keepForMachineLife: true,
  /** Anni minimi di conservazione DOPO la dismissione della macchina. */
  minYearsAfterDecommission: 10,
  /** Le revisioni storiche non vengono mai cancellate (solo archiviate). */
  keepAllRevisions: true,
} as const;

/** Conservazione dei log di accesso (contengono PII) — bilanciamento audit/GDPR. */
export const ACCESS_LOG_RETENTION_MONTHS = 18;
