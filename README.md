# 2C2MRV — Docs & Interactive Business Flow

Reference documents for the 2C2MRV carbon-credit MRV platform, plus a Next.js
site that renders the business-flow diagram as an interactive poster — click
any element for the PRD detail behind it.

## References (`references/`)

| File | What it is |
|---|---|
| `2C2MRV-MVP-PRD.md` | The MVP Product Requirements Document (v0.6) — **the authority** when documents disagree |
| `2C2MRV-Annex-A-Contract-Framework.md` | Annex A — the smart-contract framework |
| `2C2MRV-Flows.drawio` | The flow diagrams (draw.io source; business + technical pages) |
| `2C2MRV-Flows.json` | The same diagrams as JSON — **the site reads its business page directly** |
| `Carbon_Credit_Framework - Copy.docx` | The underlying framework study — source of the three quantification equations (GWP conversion, ER = BE − PE − LE, multi-year accumulation) |

Conflict priority: **PRD → Annex A → Flows**. The business-flow page of both
flow files has been aligned to PRD v0.6 (five institutions, the S11b
Competent-Authority gate before every mint, seeded shortlist draw + Steering
selection, S2/S8 stages, document-naming rules). The technical page is not yet
aligned — known deviations from PRD v0.6 / Annex A, deliberately deferred:
`c2` says "THRESHOLD-SIGNED by Steering keys" (Annex A: Creditor Committee
member keys plus a separate Competent Authority key, and `attestAuthorization`
is missing); `a5`'s issuance job reads "decision + attested ERVR" (missing the
authority confirmation); Layer 1 has no Competent Authority workspace (D-11).

## The site

- **Diagram text and topology** come from `references/2C2MRV-Flows.json` at
  build time (`src/data/flow-source.ts`) — edit the diagram there (or in
  draw.io and re-export) and the site follows.
- **Positions and colors** mirror the `.drawio` geometry 1:1
  (`src/data/layout.ts`).
- **Modal content** is written from the PRD, per node, but phrased as
  standalone explanations — no document citations (`src/data/content.ts`).
  All site prose follows the project skill `.claude/skills/stop-slop`
  (active voice, no em dashes, no AI-tell patterns).
- **Vocabulary** in the header nav explains every abbreviation and term of
  art on the chart (`src/data/vocabulary.ts`); it supersedes the poster's
  bottom "four documents" caption, which the site therefore hides (the node
  stays in the flow files for the poster).
- A build-time assertion fails `next build` if any rendered diagram node
  lacks layout or modal content (`src/data/index.ts`), so the layers cannot
  drift silently.

Rendering: React Flow (`@xyflow/react`) canvas with the draw.io palette,
pan/zoom, keyboard-accessible nodes, and a Radix dialog for details. This site
is a standalone visualization app — it is intentionally **not** the PRD §14
product stack (React Router / FastAPI).

## Develop

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # includes the diagram/content coverage assertion
```
