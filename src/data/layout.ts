/**
 * Visual layer for the business-flow diagram.
 *
 * Positions, sizes and colors are copied 1:1 from the corrected
 * references/2C2MRV-Flows.drawio (business page), so the site renders the
 * same poster — with pan/zoom and click-for-details on top.
 */

export type Tone =
  | "owner" // Project Owning Firm
  | "vvb" // Auditor (VVB)
  | "steering" // Steering Committee
  | "operations" // Operations
  | "authority" // Competent Authority (MoECC)
  | "automatic" // system-owned stages
  | "mint" // credit creation (gold)
  | "market" // venue-neutral Carbon Market
  | "retired" // terminal retirement (dark)
  | "publicLookup" // public, no-login surface (dashed gray)
  | "ledger" // chain/ledger rule (light blue)
  | "plain";

export interface ToneStyle {
  fill: string;
  stroke: string;
  text: string;
}

/** draw.io fills/strokes, verbatim. */
export const TONES: Record<Tone, ToneStyle> = {
  owner: { fill: "#dae8fc", stroke: "#6c8ebf", text: "#1f2937" },
  vvb: { fill: "#d5e8d4", stroke: "#82b366", text: "#1f2937" },
  steering: { fill: "#f8cecc", stroke: "#b85450", text: "#1f2937" },
  operations: { fill: "#ffe6cc", stroke: "#d79b00", text: "#1f2937" },
  authority: { fill: "#e1d5e7", stroke: "#9673a6", text: "#1f2937" },
  automatic: { fill: "#f5f5f5", stroke: "#999999", text: "#1f2937" },
  mint: { fill: "#fff2cc", stroke: "#d6b656", text: "#1f2937" },
  market: { fill: "#ffffff", stroke: "#666666", text: "#1f2937" },
  retired: { fill: "#333333", stroke: "#000000", text: "#ffffff" },
  publicLookup: { fill: "#f5f5f5", stroke: "#999999", text: "#1f2937" },
  ledger: { fill: "#b1ddf0", stroke: "#10739e", text: "#1f2937" },
  plain: { fill: "transparent", stroke: "transparent", text: "#1f2937" },
};

export type NodeKind =
  | "stage" // process box
  | "legend" // legend chip
  | "phase" // band header ("1 · REGISTER THE PROJECT")
  | "note" // small callout ("No credits exist yet")
  | "rule" // three-rules card
  | "docs" // four-documents strip
  | "title"
  | "subtitle";

export interface LayoutEntry {
  x: number;
  y: number;
  w: number;
  h: number;
  kind: NodeKind;
  tone: Tone;
  bold?: boolean;
  dashed?: boolean;
  align?: "left" | "center" | "right";
  fontSize?: number;
  /** Color override for text-only nodes (subtitle, note, phase headers). */
  textColor?: string;
}

/** Geometry from the corrected .drawio, keyed by cell id. */
export const LAYOUT: Record<string, LayoutEntry> = {
  // header
  bt: { x: 40, y: 20, w: 800, h: 36, kind: "title", tone: "plain", bold: true, align: "left", fontSize: 20 },
  bs: { x: 40, y: 54, w: 800, h: 24, kind: "subtitle", tone: "plain", align: "left", fontSize: 12, textColor: "#666666" },

  // legend
  lg1: { x: 1060, y: 24, w: 130, h: 28, kind: "legend", tone: "owner", fontSize: 11 },
  lg2: { x: 1200, y: 24, w: 130, h: 28, kind: "legend", tone: "vvb", fontSize: 11 },
  lg3: { x: 1340, y: 24, w: 130, h: 28, kind: "legend", tone: "steering", fontSize: 11 },
  lg6: { x: 1020, y: 58, w: 170, h: 28, kind: "legend", tone: "authority", fontSize: 11 },
  lg4: { x: 1200, y: 58, w: 130, h: 28, kind: "legend", tone: "operations", fontSize: 11 },
  lg5: { x: 1340, y: 58, w: 130, h: 28, kind: "legend", tone: "automatic", fontSize: 11 },

  // phase 1 — register the project
  ph1: { x: 40, y: 100, w: 180, h: 24, kind: "phase", tone: "plain", bold: true, align: "left", fontSize: 13, textColor: "#333333" },
  b1: { x: 40, y: 136, w: 170, h: 60, kind: "stage", tone: "owner" },
  b1a: { x: 245, y: 136, w: 170, h: 60, kind: "stage", tone: "automatic" },
  b2: { x: 450, y: 136, w: 170, h: 60, kind: "stage", tone: "automatic" },
  b3: { x: 655, y: 128, w: 180, h: 76, kind: "stage", tone: "steering" },
  b4: { x: 870, y: 122, w: 190, h: 88, kind: "stage", tone: "vvb" },
  b5: { x: 1095, y: 132, w: 170, h: 68, kind: "stage", tone: "steering", bold: true },
  b5n: { x: 900, y: 206, w: 180, h: 28, kind: "note", tone: "plain", align: "right", fontSize: 11, textColor: "#b85450" },

  // phase 2 — earn credits
  ph2: { x: 40, y: 250, w: 130, h: 24, kind: "phase", tone: "plain", bold: true, align: "left", fontSize: 13, textColor: "#333333" },
  b6: { x: 40, y: 286, w: 180, h: 60, kind: "stage", tone: "owner" },
  b6a: { x: 250, y: 278, w: 180, h: 76, kind: "stage", tone: "steering" },
  b7: { x: 460, y: 272, w: 210, h: 88, kind: "stage", tone: "vvb" },
  b8: { x: 695, y: 286, w: 160, h: 60, kind: "stage", tone: "operations" },
  b9: { x: 880, y: 282, w: 195, h: 68, kind: "stage", tone: "steering" },
  "JaASU19LGJu8xGfdlSRQ-6": { x: 1100, y: 282, w: 200, h: 68, kind: "stage", tone: "authority", bold: true },
  b10: { x: 1320, y: 286, w: 175, h: 60, kind: "stage", tone: "mint", bold: true },

  // phase 3 — use the credits
  ph3: { x: 40, y: 400, w: 145, h: 24, kind: "phase", tone: "plain", bold: true, align: "left", fontSize: 13, textColor: "#333333" },
  b11: { x: 40, y: 436, w: 160, h: 60, kind: "stage", tone: "owner" },
  b12: { x: 255, y: 436, w: 160, h: 60, kind: "stage", tone: "market" },
  b13: { x: 470, y: 436, w: 190, h: 60, kind: "stage", tone: "retired", bold: true },
  b14: { x: 705, y: 436, w: 200, h: 60, kind: "stage", tone: "publicLookup", dashed: true },

  // three rules + documents strip
  tr: { x: 40, y: 540, w: 500, h: 24, kind: "phase", tone: "plain", bold: true, align: "left", fontSize: 13 },
  tr1: { x: 40, y: 572, w: 360, h: 72, kind: "rule", tone: "vvb" },
  tr2: { x: 420, y: 572, w: 400, h: 72, kind: "rule", tone: "mint" },
  tr3: { x: 840, y: 572, w: 420, h: 72, kind: "rule", tone: "ledger" },
  docs: { x: 40, y: 668, w: 1240, h: 22, kind: "docs", tone: "plain", align: "left", fontSize: 11, textColor: "#333333" },
};

/** Node ids that render but open no modal. */
export const NON_CLICKABLE = new Set(["bt", "bs"]);

export type HandleId = "t" | "b" | "b2" | "l" | "r";

export interface EdgeStyleEntry {
  sourceHandle: HandleId;
  targetHandle: HandleId | "t2";
  dashed?: boolean;
  /** Force the horizontal "lane" the middle segment runs in (drawio waypoints). */
  centerY?: number;
  centerX?: number;
  /** Shift the label off the path midpoint (px, canvas space). */
  labelDx?: number;
  labelDy?: number;
}

/** Routing per edge id, mirroring the .drawio waypoints. */
export const EDGE_STYLE: Record<string, EdgeStyleEntry> = {
  e1: { sourceHandle: "r", targetHandle: "l" },
  e1b: { sourceHandle: "r", targetHandle: "l" },
  e2: { sourceHandle: "r", targetHandle: "l" },
  e3: { sourceHandle: "r", targetHandle: "l" },
  e4: { sourceHandle: "r", targetHandle: "l" },
  e5: { sourceHandle: "b", targetHandle: "t2", centerY: 246 },
  e6: { sourceHandle: "r", targetHandle: "l" },
  e6b: { sourceHandle: "r", targetHandle: "l" },
  e7: { sourceHandle: "r", targetHandle: "l" },
  e8: { sourceHandle: "r", targetHandle: "l" },
  e9: { sourceHandle: "r", targetHandle: "l", labelDy: 36 },
  "JaASU19LGJu8xGfdlSRQ-8": { sourceHandle: "r", targetHandle: "l", labelDy: 36 },
  e9r: { sourceHandle: "t", targetHandle: "t", dashed: true, centerY: 258 },
  e10: { sourceHandle: "b", targetHandle: "b", dashed: true, centerY: 386 },
  e11: { sourceHandle: "b2", targetHandle: "t2", centerY: 416 },
  e12: { sourceHandle: "r", targetHandle: "l" },
  e13: { sourceHandle: "r", targetHandle: "l" },
  e14: { sourceHandle: "r", targetHandle: "l", dashed: true },
};

export const EDGE_COLOR = "#3f3f46";
export const CANVAS = { width: 1500, height: 900 };
