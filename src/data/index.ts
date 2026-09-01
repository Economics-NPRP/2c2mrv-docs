/**
 * Merges the three data layers and asserts they cover each other.
 *
 * The assertions run at module load, so `next build` fails if a diagram node
 * lacks layout or modal content, or if content/layout reference ids that no
 * longer exist in references/2C2MRV-Flows.json.
 */
import { sourceNodes, sourceEdges } from "./flow-source";
import {
  LAYOUT,
  EDGE_STYLE,
  NON_CLICKABLE,
  HIDDEN,
  type LayoutEntry,
  type EdgeStyleEntry,
} from "./layout";
import { CONTENT, type ContentEntry } from "./content";

export interface FlowNodeModel {
  id: string;
  label: string;
  layout: LayoutEntry;
  content?: ContentEntry;
}

export interface FlowEdgeModel {
  id: string;
  source: string;
  target: string;
  label?: string;
  style: EdgeStyleEntry;
}

function assertCoverage(): void {
  const nodeIds = new Set(sourceNodes.map((n) => n.id));
  const problems: string[] = [];

  for (const n of sourceNodes) {
    if (HIDDEN.has(n.id)) continue; // in the flow files, deliberately not rendered
    if (!LAYOUT[n.id]) problems.push(`node "${n.id}" has no layout entry`);
    if (!NON_CLICKABLE.has(n.id) && !CONTENT[n.id])
      problems.push(`node "${n.id}" has no modal content`);
  }
  for (const id of Object.keys(LAYOUT)) {
    if (!nodeIds.has(id)) problems.push(`layout entry "${id}" has no source node`);
  }
  for (const id of Object.keys(CONTENT)) {
    if (!nodeIds.has(id)) problems.push(`content entry "${id}" has no source node`);
  }
  for (const e of sourceEdges) {
    if (!EDGE_STYLE[e.id]) problems.push(`edge "${e.id}" has no style entry`);
    if (!nodeIds.has(e.source)) problems.push(`edge "${e.id}" source "${e.source}" missing`);
    if (!nodeIds.has(e.target)) problems.push(`edge "${e.id}" target "${e.target}" missing`);
  }
  for (const id of Object.keys(EDGE_STYLE)) {
    if (!sourceEdges.some((e) => e.id === id))
      problems.push(`edge style "${id}" has no source edge`);
  }

  if (problems.length > 0) {
    throw new Error(
      `Flow data out of sync with references/2C2MRV-Flows.json:\n- ${problems.join("\n- ")}`,
    );
  }
}

assertCoverage();

export const flowNodes: FlowNodeModel[] = sourceNodes
  .filter((n) => !HIDDEN.has(n.id))
  .map((n) => ({
    id: n.id,
    label: n.label,
    layout: LAYOUT[n.id],
    content: CONTENT[n.id],
  }));

export const flowEdges: FlowEdgeModel[] = sourceEdges.map((e) => ({
  id: e.id,
  source: e.source,
  target: e.target,
  label: e.label,
  style: EDGE_STYLE[e.id],
}));

export { TONES, EDGE_COLOR, CANVAS, NON_CLICKABLE } from "./layout";
export type { Tone, NodeKind } from "./layout";
export type { ContentEntry, ContentSection } from "./content";
export { VOCABULARY } from "./vocabulary";
export type { VocabGroup, VocabTerm } from "./vocabulary";
