/**
 * Parses the business-flow page out of references/2C2MRV-Flows.json.
 *
 * The JSON is the single source of truth for diagram text and topology
 * (it mirrors references/2C2MRV-Flows.drawio). Layout, styling and modal
 * content are layered on top by id — see layout.ts and content.ts.
 */
import flowsJson from "../../references/2C2MRV-Flows.json";

interface RawCell {
  id: string;
  type: "layer" | "node" | "edge";
  parent?: string;
  label?: string;
  html?: string;
  source?: string;
  target?: string;
}

interface RawPage {
  id: string;
  name: string;
  cells: RawCell[];
}

interface FlowsFile {
  version: string;
  pages: RawPage[];
}

export interface SourceNode {
  id: string;
  /** Decoded, trimmed label; lines separated by \n. */
  label: string;
}

export interface SourceEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
}

const BUSINESS_PAGE_ID = "biz-flow-01";

/** Decode the handful of HTML entities the draw.io export leaves in labels. */
function decodeLabel(raw: string): string {
  return raw
    .replace(/&nbsp;/g, " ")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .trim();
}

const flows = flowsJson as unknown as FlowsFile;

const businessPage = flows.pages.find((p) => p.id === BUSINESS_PAGE_ID);
if (!businessPage) {
  throw new Error(
    `Business-flow page "${BUSINESS_PAGE_ID}" not found in 2C2MRV-Flows.json`,
  );
}

export const sourceNodes: SourceNode[] = businessPage.cells
  .filter((c) => c.type === "node")
  .map((c) => ({ id: c.id, label: decodeLabel(c.label ?? "") }));

export const sourceEdges: SourceEdge[] = businessPage.cells
  .filter((c) => c.type === "edge")
  .map((c) => {
    if (!c.source || !c.target) {
      throw new Error(`Edge ${c.id} in ${BUSINESS_PAGE_ID} is missing an endpoint`);
    }
    return {
      id: c.id,
      source: c.source,
      target: c.target,
      label: c.label ? decodeLabel(c.label) : undefined,
    };
  });
