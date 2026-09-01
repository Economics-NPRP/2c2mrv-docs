# 2C2MRV — MVP Product Requirements Document

**Version** 0.6 (draft for review) · **Status** open decisions listed in §12 must be closed before M2 · **Scope** digitization of registration, verification and credit ownership under *existing, externally published* methodologies.

*Changelog 0.5 → 0.6 (business-flow merge, 31 Aug 2026): added the **Competent Authority** (MoECC) as a fifth institution type and stage **S11b** — a confirmation gate on every issuance, before the mint, attested on SC-2 with the authority's own key (FR-58..FR-62); S4/S8 changed from a single-winner draw to a **seeded shortlist draw + Steering selection with a public reason** (FR-9, FR-51, FR-56); introduced specialised person roles **Certified Auditor / Certified Creditor** (VVB) and **Creditor Committee member** (Steering) (§3.3, §7); added the quantification identity check behind "issuance based on certified equations" (FR-57) while keeping FR-37; added issuance packet and authorization record entities; closed D-8 for the MVP (keep PVR/ERVR); rewrote D-3 (independent posture, hosted under ets-gcc.org); added D-11..D-13; rewrote L-1, L-3, L-13; added L-14..L-16; updated §13 demo and §14 hosting. Changelog 0.4 → 0.5 (research-driven): closed D-9 — flat-fee escrow with outcome-independent platform fee (FR-48..FR-52); closed D-4 (15-day window per GCC); closed D-10 — buffer allocation at mint (FR-55); S4/S8 became automatic seeded draws, Steering ratifies re-draws only; added FR-53/54, escrow and fee-schedule entities, buffer system account; rewrote L-1, L-2, L-5, L-7; added L-11..L-13; positioning line in §1. Changelog 0.3 → 0.4: closed D-1 — chain layer in scope (SC-2 anchoring from M1, full contract set at M4 per Annex A); removed the Gatekeeper principal (S2/S3 are automatic transitions logged as `system`); Registry restated as a capability binding rather than a principal; added FR-46/47 and the tech stack (§14); narrowed D-2 to the market contract. Changelog 0.2 → 0.3: added Operations as a fourth institution, scoped to comment moderation and compliance review only (§3.1, §3.3, S10, FR-40..FR-45); renumbered issuance stages; revised L-1. Changelog 0.1 → 0.2: added the four-document set (§4.1); added the registration and issuance narratives (§5.1); added crediting period, verification event and issuance block to the domain model; added quantity-provenance and period requirements FR-33..FR-39; added D-7, D-8 and L-9.*

---

## 1. Summary

2C2MRV digitizes the trust pipeline that turns a claimed emission reduction into a credit someone can hold, transfer and retire. The MVP runs the full pipeline with **five institution types** — four private parties and a Competent Authority — under methodologies authored elsewhere, anchored to a public testnet from the first milestone.

The product's central assertion, which every requirement below serves:

> The auditor **recommends**, the committee **decides**, the authority **confirms**, the system **mints**. No institution performs another's step, and no credit exists without an independent audit, a recorded decision and a state confirmation.

Three rules distinguish the product (they are printed on the business-flow diagram and must stay true in code): (1) the party that audits a project's design is never the party that audits its performance — Certified Auditor versus Certified Creditor, at institution level; (2) the issued quantity is the Certified Creditor's recalculation, decomposed into the methodology's own terms (BE − PE − LE, CO₂e via the pinned GWP set) and checked for arithmetic consistency before any decision sees it; (3) no person can mint or un-retire, and every report, decision and confirmation is published to a public ledger, tamper-evident.

Positioning, in one sentence: Isometric asks the market to trust one company's integrity; 2C2MRV makes the separation of roles independently checkable.

---

## 2. Scope

**In scope.** Project submission; automated completeness gating; a timed public consultation window; VVB assignment by seeded shortlist draw and Steering selection; validation (ex-ante) and ER verification (ex-post) audits by accredited VVBs; committee decisions on registration and issuance; a **Competent Authority confirmation gate on every issuance** (S11b), fed by a generated issuance packet; serialized credit issuance; account holdings; transfer; retirement; a public project and credit lookup surface; the on-chain layer per Annex A — hash anchoring from M1, and the Registry, Attestation, Token and Certificate contracts at M4, chain-authoritative for the unit once minted.

**Out of scope for MVP.** Methodology authoring and methodology-as-code (we consume, we do not write and we do not compute BE, PE or LE — see FR-57 for what *is* checked). Any Operations capability beyond comment moderation and compliance review — in particular Operations never screens intake, admits VVBs, assigns them, or decides. Accreditation workflow. **Article 6 host-country authorization and corresponding adjustments** — the S11b confirmation is a product gate operated by MoECC, not a legal authorization; see L-3. Appeals. An on-chain market contract (see D-2). Integration with ETS-GCC (later; the two systems are independent for now — D-3). Programmatic aggregation (PoA). Real payment processing — escrow mechanics are in scope and run on test-mode money; the incentive structure is the deliverable, not the card processor.

**Non-goals.** This MVP is not a compliance-grade registry and must not be presented as one. §11 states the limitations that follow, and they are to be published with the product, not discovered by a reviewer.

---

## 3. Actors

### 3.1 Institutions (the parties that hold liability and accounts)

| Institution | What it does | Never does |
|---|---|---|
| **Project Owning Firm** | drafts and submits the PSF, operates the activity, submits monitoring reports, answers findings, holds and retires credits | assess its own submission; set its own verified quantity |
| **VVB** | validates project design (through its **Certified Auditor** role), verifies performance (through its **Certified Creditor** role), raises and closes findings, issues reports with an opinion | validate *and* verify the same project; approve anything; hold credits |
| **Steering Committee** | admits VVBs, selects the engagement VVB **from the seeded shortlist** with a recorded reason, decides registration, decides issuance (through its **Creditor Committee** role) | perform any audit work; select a VVB outside the shortlist or request a re-draw without a declared conflict; decide where a member has declared an interest |
| **Operations** | moderates consultation comments; performs the procedural compliance review of the ERVR | assign VVBs; decide anything; touch audit content, quantities or findings; hold credits |
| **Competent Authority** (MoECC) | receives the issuance packet after an approved issuance decision and **confirms or refuses** it, with a reason, before any mint | audit anything; alter a quantity; decide registration or issuance; admit or select VVBs; mint; hold credits |

**Modeling note.** Operations and the Steering Committee are organs of one legal party — the program administrator — not independent parties. They are separate `institution_type` values because that is what the guard in §7 binds capabilities to. The separation between them is internal control, not institutional independence, and L-1 says so. The Competent Authority *is* an independent party — a state ministry — which is what makes its confirmation worth more than another internal gate, and also what makes its response time a risk the platform does not control (L-14).

### 3.2 Automated stages and the Registry binding

S2 (completeness gate), S3 (consultation window), the shortlist draw inside S4/S8, and S12 (issuance) are automatic transitions with no human owner, logged with `system` as the acting principal so the audit trail has no gaps. S4/S8 as a whole are **not** automatic any more: the draw produces the shortlist, Steering picks from it (FR-9).

Issuance is additionally protected by a capability binding: `credit.mint` and `credit.burn` are bound to the institution type `REGISTRY`, which a database constraint (`CHECK (institution.type <> 'REGISTRY')`) makes unassignable to any account. The mint is callable only by the issuance job, which derives its quantity from the attested ERVR and requires **both** the approved Steering decision and the Competent Authority confirmation for the same period; it takes no quantity parameter. The Registry is not an institution and not an actor with judgment — it is the enforced answer to "who may create supply": nobody with a login. See §7.

### 3.3 Person-level roles within institutions (MVP set)

- **Project Owning Firm** — Firm Admin · Project Manager · Read-only. Submission and PMR attestation is performed by a named user and recorded as such.
- **VVB** — VVB Admin (no audit-content capabilities) · Team Leader · Team Member · **Approver** (performs independent technical review and signs the report; **must not appear on the audit team for that engagement**) · **Certified Auditor** (may lead and sign a *validation* engagement — the PVR) · **Certified Creditor** (may lead and sign a *verification* engagement — the ERVR and its verified quantity). A person may hold both certifications; the institution-level rule still applies — the institution that validated a project never verifies it (FR-11).
- **Steering Committee** — Member (votes on registration) · **Creditor Committee member** (a designated subset; only these members vote on issuance decisions) · Chair (finalizes a decision once quorum is met).
- **Operations** — Moderator (comment redaction, window extension) · Compliance Reviewer. No Operations person role carries any audit, assignment or decision capability.
- **Competent Authority** — **Authorizing Officer** (confirms or refuses an issuance packet; signs the confirmation) · Read-only. No authority role carries any audit, decision, assignment or holding capability.

Roles are person-level and specialise an institution; institutions can hold more than one. The guard binds a capability to `(institution_type, person_role)` where the role matters (§7). Custom, tenant-defined roles are **post-MVP**; the capability table is built now so that adding them later is data, not a rewrite.

**Naming hazard.** In finance a *creditor* is a lender. Buyers, banks and regulators will read "Certified Creditor" that way on first contact. The name is adopted here as decided; expect to explain it, and revisit before any external-facing release.

### 3.4 Holding credits

Credits are held by **accounts**, and every institution has one. In the MVP only **Project Owning Firm** accounts may hold, transfer or retire; VVB, Steering, Operations and Competent Authority accounts are permanently zero-balance. Firm-to-firm transfer is therefore the MVP trading model. To make a retirement meaningful on behalf of a third party, `retirement.beneficiary_name` is a free-text field on the retirement record. See L-6.

---

## 4. Domain model and document set

### 4.1 The four documents

Each phase follows the same three beats — **claim (owner) → audit (VVB) → decision (Steering)**. Every artifact belongs to exactly one beat; anything that does not fit the pattern is either a system record or does not belong in the set.

| # | Document | Author | Cardinality | Carries |
|---|---|---|---|---|
| 1 | **PSF** — Project Submission Form | Project Owner | 1 per project, versioned | design, baseline, additionality, monitoring plan, safeguards, ownership proof, proposed crediting period, ex-ante estimate (reference only) |
| 2 | **PVR** — Project Verification Report | **VVB-A**, signed by a Certified Auditor, ex-ante | 1 per project | desk assessment per PSF section, baseline and additionality conclusion, site-visit record, response to every consultation comment, findings register, opinion, assurance level, recommendation on registration and crediting period |
| 3 | **PMR** — Project Monitoring Report | Project Owner | 1 per monitoring period | period boundaries, measured parameters against the monitoring plan, raw evidence, **claimed** reductions and their calculation, deviations, responses to carried-forward FARs |
| 4 | **ERVR** — Emission Reduction Verification Report | **VVB-B**, signed by a Certified Creditor, ex-post | 1 per monitoring period | evidence assessment, recalculated **BE, PE, LE** and the GWP set used, **verified quantity** (= BE − PE − LE, FR-57), delta vs claim against ±5% materiality, site-visit record, findings register, opinion, assurance level, recommended issuance quantity |

Two of the four are written by the party whose revenue scales with the number in them. Exactly one document — the ERVR — may carry a `verified_quantity`, and it is the only field the mint reads.

Two further artifacts exist but are **system records, not documents in the claim/audit pattern**: the **issuance packet** the system generates when Steering approves issuance (what the Competent Authority reads), and the **authorization record** the authority produces (what the mint reads alongside the decision). Both are defined in §4.2.

**Naming.** The PVR is an *ex-ante* audit of design; the ERVR is an *ex-post* audit of performance. Both abbreviate colloquially to "the verification report" and will be conflated. D-8 is closed for the MVP: the GCC names are kept because the first version is GCC-inspired; "verification report" must still never appear unqualified in code, UI or specification, and "MRV" is part of the platform name, never a document name.

### 4.2 Entities

**Institution** — id, type (`OWNER` | `VVB` | `STEERING` | `OPERATIONS` | `COMPETENT_AUTHORITY`; `REGISTRY` exists as a type value but is unassignable, §3.2), legal name, jurisdiction, status, account_id.
**User** — id, institution_id, person role, credential flags.
**Project** — id, owner_institution_id, title, jurisdiction, coordinates, `methodology_id`, `methodology_version` (pinned at submission, immutable), current stage, PSF document set, `estimated_annual_reductions_reference` (no balance behind it; not readable by the issuance path).

**Crediting period** — project_id, start, length. Fixed by the registration decision; the outer window within which any monitoring period may earn credits.
**Accreditation record** (on VVB) — accreditation body, scheme, sectoral scopes, valid_from, valid_to, status. Read-only evidence of an *external* accreditation; the platform does not grant it.
**Engagement** — project_id, phase (`validation` | `verification`), period_id, draw_id (seed commitment, eligible pool snapshot, shortlist), vvb_institution_id, selected_by (Steering user), selection_reason (public), team assignments, lead certification (`CERTIFIED_AUDITOR` | `CERTIFIED_CREDITOR`), approver.

**Issuance packet** — generated by the system at the moment an issuance decision is approved: canonical JSON + rendered PDF bundling project identity and methodology pin, PSF/PVR/PMR/ERVR hashes and anchor transactions, the verified quantity with its BE/PE/LE components and GWP set, VVB identities with accreditation records, consultation summary, both decisions with votes, and the compliance-review outcome. Immutable; hash anchored via SC-2; exportable so it can be filed with an external system if the authority ever operates one (D-11).
**Authorization record** — project_id, period_id, decision_id, packet_hash, outcome (`CONFIRMED` | `REFUSED`), reason, authorizing officer, timestamp, SC-2 attestation id. One per packet; append-only.
**Audit** — desk sections, evidence items, quantification figures, site-visit checklist, findings, opinion, assurance level, readiness gates, issued report.
**Finding** — type (`CAR` | `CL` | `FAR`), status, raised_by, response, closed_by. CAR and CL are blocking; FAR carries forward.
**Monitoring period** — project_id, index n, start, end, PMR document set, `issued` flag. Non-overlapping; gaps permitted.

**Verification event** — project_id, engagement_id, the monitoring period(s) it covers, ERVR. MVP constraint: exactly one period per event (see D-7); the schema keys vintage to the period, not to the event, so multi-period batching is additive later.

**Issuance block** — the serialized credits minted from one approved issuance decision: serial range, project_id, vintage (= monitoring period n), quantity.
**Decision** — body, project_id, subject (`registration` | `issuance`), outcome, rationale, quorum, votes, timestamp — append-only.
**Credit unit / block** — serial range, project_id, vintage (= monitoring period n), quantity, state, current_account_id.
**Transfer** — from_account, to_account, serial range, timestamp.
**Retirement** — serial range, retiring_account, beneficiary_name, reason, certificate_id — terminal.
**Audit log entry** — actor, institution, capability used, resolved capability set at that moment, invariant result, target, before/after, timestamp.
**Fee schedule** — versioned, published: tier key (sector, size band, site-visit burden) → VVB portion, platform portion.
**Escrow entry** — project_id, phase, period_id, total, vvb_portion, platform_portion, state (`HELD` | `RELEASED` | `REFUNDED`), released_to, trigger (SC-2 attestation id).
**Buffer account** — a zero-login system account (like the Registry binding) that receives the FR-55 allocation; balance only grows in the MVP.

---

## 5. Lifecycle

### 5.1 In one sentence each

**Registration.** The Project Owner submits the **PSF** under a pinned methodology version → an automated completeness gate checks presence and schema → a public consultation window runs and comments are recorded → the system draws a **shortlist** of accredited, in-scope VVBs by seeded lottery and the Steering Committee **selects one from that shortlist with a recorded, public reason**, the engagement funded from the escrowed fee → that VVB (**VVB-A**, led by a Certified Auditor) conducts the validation audit, running the findings loop with the owner until every CAR is closed and every CL resolved, and issues the **PVR** recommending registration or not, with an opinion and assurance level → the Steering Committee approves or rejects. Approval registers the project and fixes its crediting period. **No credits are created at registration.**

**Issuance.** Credits are created later, once per monitoring period: the Project Owner submits the **PMR** with the claimed reductions for period n → the escrowed verification fee having been paid at submission, the system draws a shortlist from which VVB-A is excluded and Steering selects a **second, different VVB (VVB-B ≠ VVB-A)** → VVB-B, led by a Certified Creditor, recalculates the reductions from evidence and issues the **ERVR** carrying the **verified quantity** decomposed into BE, PE and LE → Operations performs a procedural compliance review, returning the ERVR to the VVB for correction if it is procedurally defective → the Steering Committee's **Creditor Committee** approves or rejects issuance, a binary decision → on approval the system generates the **issuance packet** and the **Competent Authority (MoECC) confirms or refuses it** → on confirmation the **Registry** mints serialized credits for period n, in exactly the quantity the ERVR verified. The project then returns to monitoring for period n+1.

Registration credits nothing because nothing has been measured yet. The ex-ante estimate in the PSF is a plausibility reference, never an entitlement — crediting it would mean issuing retirable permits against a forecast, and a retired credit cannot be recalled when the forecast proves wrong.

### 5.2 Stages

| # | Stage | Owner | Exit condition |
|---|---|---|---|
| S1 | PSF draft & submit | Owner Firm | required fields and attachments present; methodology version pinned; validation fee `HELD` in escrow |
| S2 | Completeness gate | *automatic* | schema and presence check passes; failure returns to S1 with a reason list |
| S3 | Stakeholder consultation window | *automatic* | window elapsed; comments recorded and attributed. Operations may moderate and may extend once |
| S4 | Validator shortlist & selection | *automatic draw* → Steering | seeded draw of k VVBs from the eligible pool (active, in-scope accreditation), seed anchored via SC-2; Steering selects one with a public reason; CoI declared by the selected VVB → re-draw, logged |
| S5 | Validation audit (ex-ante) | VVB-A (Certified Auditor) | **PVR** issued; all readiness gates pass |
| S6 | Registration decision | Steering | approve → **REGISTERED** and crediting period fixed; reject → returns to S1 with notes |
| S7 | Monitoring & PMR, period n | Owner Firm | PMR and evidence submitted; verification fee `HELD` in escrow |
| S8 | Verifier shortlist & selection | *automatic draw* → Steering | as S4, with VVB-A excluded from the pool before the draw (so VVB-B ≠ VVB-A is impossible, not merely checked); Steering selects with a public reason |
| S9 | ER verification (ex-post) | VVB-B (Certified Creditor) | **ERVR** issued with a **verified quantity** and its BE/PE/LE decomposition (FR-57) |
| S10 | Compliance review | Operations | automated pre-checks (incl. the FR-57 identity) pass and the judgment checklist is completed; return sends the ERVR back to VVB-B |
| S11 | Issuance decision | Steering (Creditor Committee) | approve → issuance packet generated, project enters S11b; reject → returns to S7 |
| S11b | Authorization | **Competent Authority** | `CONFIRMED` → mint; `REFUSED` with reason → returns to S11, where Steering may withdraw its decision (→ S7 with notes) or resubmit the packet once with additional information; no timeout in either direction |
| S12 | ACC issuance | *automatic (Registry binding)* | requires the S11 decision **and** the S11b confirmation, both attested on SC-2; serial range allocated, vintage = period n; SC-3 mint; project returns to S7 for period n+1 |

**Credit unit states.** `ISSUED` → `HELD` → (`TRANSFERRED` → `HELD`)\* → `RETIRED` (terminal, immutable, non-transferable).

S2 is a **presence and schema check, not a judgment**. Label it as such in the UI; automated validation is not screening, and calling it screening would overstate the control.

S11b is numbered as a sub-stage deliberately: it was inserted after the twelve-stage vocabulary had propagated into Annex A and the diagrams, and renumbering every reference buys nothing.

---

## 6. Functional requirements

Each requirement is testable. IDs are stable and referenced by the milestone plan.

**Identity & authorization**
- FR-1 Every user belongs to exactly one institution; the institution type is set at creation and is immutable.
- FR-2 Every state-changing action is authorized server-side by the guard in §7. Client-side gating is presentation only.
- FR-3 Every state-changing action writes an audit log entry including the resolved capability set at that moment.

**Submission**
- FR-4 A project is submitted with `methodology_id` and `methodology_version`; both are immutable for the lifetime of the project. Methodology records store identifier, version, issuing standard and a source URL — **not** the republished document text.
- FR-5 The completeness gate returns a machine-generated reason list on failure; the project returns to S1 editable.

**Consultation**
- FR-6 The consultation window opens automatically on S2 pass, runs for a configured duration, and closes automatically. Automatic transitions log `system` as the acting principal.
- FR-7 Comments are recorded with an author identity and are visible on the public project page.
- FR-8 The validation audit cannot reach "ready to issue" until every consultation comment has a recorded auditor response.

**Assignment**
- FR-9 No human composes the pool or the shortlist. The system draws a shortlist of k VVBs by seeded lottery (FR-51); the Steering Committee selects exactly one from that shortlist and must record a selection reason, which is public. Steering cannot select outside the shortlist, cannot re-order it, and cannot trigger a re-draw except on a conflict declared by the selected VVB (logged with reason).
- FR-10 The eligible pool excludes any VVB whose accreditation is expired, suspended, or does not cover the project's sectoral scope. Exclusion happens before the draw; it is not a check on the result.
- FR-11 For a verification engagement the eligible pool excludes the institution that validated the project. This is enforced at pool construction (the draw cannot produce VVB-A), in the database, and in SC-1 (`recordEngagement` reverts).

**Audit workspace**
- FR-12 Desk sections are individually assessed Pass / CAR / CL; unassessed sections block report issuance.
- FR-13 Findings: CAR and CL block advancement; FAR does not. Findings appear in the owner's inbox; the owner responds; only the VVB may close.
- FR-14 (verification) Claimed figures are displayed beside editable **verified** values; the delta is computed live against a ±5% materiality threshold. The recommended quantity is derived from verified values only.
- FR-15 Site-visit checklist requires an explicit sign-off by a named user.
- FR-16 Report issuance requires all gates: every section assessed, all CARs closed, all CLs resolved, site visit signed off, opinion set, approver sign-off recorded, and the signing lead holds the certification the phase requires — Certified Auditor for a PVR, Certified Creditor for an ERVR.
- FR-17 The approver must not hold any team assignment on that engagement.
- FR-18 Issuing a report advances the project to the next stage; it does not mint anything.

**Decisions**
- FR-19 A decision requires the configured quorum and is finalized by the Chair. Registration decisions are voted by Steering members; issuance decisions are voted only by members holding the Creditor Committee role, with their own quorum constant.
- FR-20 A member with a declared interest in a project is excluded from that decision and the exclusion is recorded.
- FR-21 Every decision writes an append-only log entry containing outcome, rationale and the evidence gates that permitted it.

**Issuance & registry**
- FR-22 Only the Registry binding mints. Minting requires, for the same period: an issued ERVR, an approved issuance decision, and a `CONFIRMED` authorization record — each attested on SC-2.
- FR-23 Serial ranges are globally unique, non-reusable, and carry project id and vintage.
- FR-24 Quantity minted equals the verified quantity in the ERVR. No override path exists in the MVP.
- FR-25 A monitoring period may produce at most one issuance.

**Holdings, transfer, retirement**
- FR-26 Transfer moves a serial range between accounts and appends to ownership history. Partial ranges may be split.
- FR-27 Only `HELD` units may be transferred. `RETIRED` units are immutable and non-transferable — enforced at the database level, not only in application code.
- FR-28 Retirement records beneficiary, reason and timestamp, and generates a certificate with a verifiable id.
- FR-29 Nothing is ever hard-deleted; states are appended, never overwritten.

**Public surface**
- FR-30 A public project page shows the pinned methodology, stage, consultation comments, issued reports and issuance history.
- FR-31 A public serial lookup resolves any serial to its project, vintage, current state and, if retired, its retirement record.
- FR-32 Eligibility labels (CORSIA, Article 6) render as **"Not assessed"** with an explanatory note. They are not omitted, and they are not implied. The Competent Authority confirmation is shown as its own label — "Confirmed by MoECC", with date and anchor transaction — and must never be rendered as, or adjacent to, Article 6 authorization or CORSIA eligibility (L-3).

**Periods and quantity provenance**
- FR-33 The registration decision fixes the crediting period. A project without one cannot enter S7.
- FR-34 Monitoring periods for a project must not overlap. Gaps are permitted and earn nothing.
- FR-35 Every monitoring period must fall entirely within the crediting period.
- FR-36 A monitoring period may be issued **at most once, ever**. Enforced on the period record, not on the report.
- FR-37 `verified_quantity` exists on the ERVR only. The PSF, PMR and PVR have no such field, and the mint reads no other source.
- FR-38 The PSF's ex-ante estimate is stored as `estimated_annual_reductions_reference`, carries no balance, and is not readable by the issuance path.
- FR-39 Where an issuance for period n materially exceeds the pro-rata ex-ante estimate, the verification workspace raises an automatic flag for the VVB to address in the ERVR.

**Operations**
- FR-40 Operations may soft-hide a consultation comment with a reason code. The comment and the redaction are both retained and visible in the audit log; no hard delete exists (FR-29).
- FR-41 Operations may extend a consultation window **once**, by no more than the original duration, with a recorded reason. No party may close a window early, including Operations.
- FR-42 The compliance review runs **automated pre-checks first**: ERVR issued by the assigned VVB-B and signed by a Certified Creditor; all readiness gates passed; period within the crediting period, non-overlapping and not already issued; verified quantity present and equal to BE − PE − LE as decomposed on the ERVR (FR-57); GWP set stated and matching the pinned methodology; materiality delta documented; carried-forward FARs addressed. A failing pre-check blocks the stage and is not overridable by a human.
- FR-43 Operations completes a **judgment checklist** covering only what a machine cannot decide: whether the ERVR narrative supports the quantity, whether monitoring-plan deviations are explained, and whether anything is anomalous against prior periods or the ex-ante reference.
- FR-44 Operations has **return**, not reject: it may send the ERVR back to VVB-B with notes, or pass it to Steering. It cannot approve issuance, alter a quantity, close a finding, or edit any audit artifact.
- FR-45 The Steering decision screen displays the compliance review outcome, the count of consultation comments, and how many became findings.

**Chain layer (Annex A)**
- FR-46 From M1, every PSF, PMR, PVR, ERVR, decision, compliance outcome and consultation-close Merkle root is hashed (canonical JSON) and anchored via SC-2; the transaction hash is displayed on the artifact. Publishing runs through an outbox so the product functions when the chain does not.
- FR-47 From M4, credits are chain-authoritative once minted: SC-3 holds supply, custody and retirement; the database holding record becomes a mirror. `attestDecision` requires threshold signatures from Creditor Committee member keys, and `attestAuthorization` requires the Competent Authority's key; SC-3 mints only when both exist for the period — never on the relayer alone, and never on either one alone.

**Fees & escrow (closes D-9)**
- FR-48 Fee tiers are published and versioned (by sector, size band, site-visit burden). The engagement fee — VVB portion + platform portion — is due at submission (S1 for validation, S7 for verification), before any outcome exists. The platform portion is identical in every outcome branch: approve, reject, adverse opinion, low verified quantity.
- FR-49 The fee sits in an escrow entry (`HELD`) until SC-2 attests the issued report; that attestation releases the VVB portion. An adverse opinion pays identically to a positive one. The VVB's counterparty is the escrow, never the owner.
- FR-50 Refunds: owner abandonment mid-engagement → VVB paid pro-rata per the published schedule, remainder refunded; VVB non-delivery → engagement voided, full refund **including the platform fee**.
- FR-51 Assignment starts with a deterministic seeded draw. Suitability lives entirely in the **pool filter**, which is published: accreditation valid and in scope (FR-10), ≠ the validating institution for verification (FR-11), methodology-family experience or newcomer pairing, capacity cap, rotation cap (D-5), no declared conflict. The draw is **uniform** over the filtered pool — it never ranks — and returns a shortlist of k (D-12). The seed is committed via SC-2 before the draw, the pool snapshot and shortlist are stored, and anyone can recompute the shortlist from the commitment. Steering then selects per FR-9. The selected VVB files a conflict-of-interest declaration; a declared conflict triggers a re-draw of the shortlist, logged with reason. The owner has no choice and no veto at any step.
- FR-52 A public per-VVB statistics page shows engagements, opinions issued, and the average delta between claimed and verified quantities — a computed view, never cached.

**Transparency & double-counting (research parity)**
- FR-53 The public project page shows every consultation comment together with the VVB's recorded response.
- FR-54 Both audits record a cross-registry double-registration check (other registries and the platform's own portal); manual lookup is acceptable in the MVP, with the evidence stored on the audit.

**Reversal cover (closes D-10)**
- FR-55 For activity classes flagged with reversal risk, a published flat percentage of each issuance is allocated at mint to the buffer system account; the remainder goes to the owner. FR-24 is preserved: the mint still equals the ERVR verified quantity exactly — the split happens at allocation, never at mint. No clawback logic exists in the MVP; the buffer account only accumulates.

**Selection transparency (bounds the FR-9 discretion)**
- FR-56 The shortlist size k is a published constant. Every engagement's public record shows the seed commitment, the pool snapshot, the shortlist, the selected VVB and Steering's reason. The per-VVB statistics page (FR-52) additionally shows how often each VVB was shortlisted versus selected, next to its claimed-vs-verified delta, so a pattern of selecting lenient auditors is visible to anyone.

**Quantification identity (the "certified equations" rule, compatible with FR-37)**
- FR-57 The ERVR states the verified quantity as `verified_quantity = BE − PE − LE` with each term given separately, in tCO₂e, together with the GWP set (e.g. AR5 or AR6, 100-year) required by the pinned methodology; where non-CO₂ gases are involved the per-gas conversion `Σ Eᵢ × GWPᵢ` is shown. The platform **checks** the identity and the GWP-set match as a hard pre-check (FR-42) and rejects an ERVR that fails it. The platform does **not** compute BE, PE or LE and has no methodology-as-code engine: the derivation of each term is the Certified Creditor's work under the methodology, and its correctness is what the audit, not the software, vouches for (L-15).

**Authorization gate (S11b)**
- FR-58 When an issuance decision is approved, the system generates the issuance packet (§4.2) — canonical JSON plus PDF — hashes and anchors it, and places it in the Competent Authority's queue. Nothing is minted in this state.
- FR-59 An Authorizing Officer records exactly one outcome per packet: `CONFIRMED` or `REFUSED`, with a reason. A confirmation is signed with the authority's key and attested via SC-2 `attestAuthorization`; a refusal is anchored. The record is append-only.
- FR-60 Refusal returns the project to S11 with the reason visible to Steering and the owner. Steering may withdraw its decision (project returns to S7 with notes) or resubmit the packet once with additional information; a second refusal ends the period's issuance path. There is no auto-confirm on elapsed time and no auto-refuse: silence is neither.
- FR-61 The authority's queue shows, publicly, every pending packet and the days elapsed since its generation (D-13 sets the target). The delay is visible; it is not enforceable by the platform.
- FR-62 No Competent Authority capability reads or writes audit content, findings, quantities, decisions, VVB admission or selection, or any account balance. The authority sees the packet and the public record — nothing else.

---

## 7. Authorization model

Three layers, evaluated server-side on every action:

1. **Capability ceiling** — each capability binds to exactly one institution type and, where the capability is role-specific, to one person role within it (`report.sign_pvr` → VVB · Certified Auditor; `report.sign_ervr` → VVB · Certified Creditor; `decision.issuance.vote` → Steering · Creditor Committee member; `authorization.record` → Competent Authority · Authorizing Officer). This binding is seeded constant data, not configuration.
2. **Stage ownership** — the acting institution type must own the project's current stage.
3. **Engagement scope + invariants** — the user must hold an assignment on this project, phase and period, and all invariants must pass.

```
can(user, action, target):
    cap = action.capability
    assert cap.institution_type == user.institution.type
    assert cap.person_role is None or cap.person_role in user.roles
    assert stage_owner(target.project.stage) == user.institution.type
    assert assignment_exists(user, target.project, target.phase, target.period)
    assert cap in resolved_capabilities(user)
    assert all(invariants(action, target, user)) 
```

**Invariants (institution-level unless stated).** Verifying VVB ≠ validating VVB on the same project — enforced at pool construction, so the draw cannot produce it · VVB ≠ owner of the project · accreditation active, in-scope, unexpired · Steering selection ∈ the stored shortlist for that draw · approver ∉ audit team (person-level) · report lead holds the phase's certification (person-level) · no report issuance with open CAR/CL, unassessed sections or unsigned site visit · ERVR `verified_quantity` ≡ BE − PE − LE as stated on it · no mint without an issued ERVR, an approved issuance decision **and** a `CONFIRMED` authorization record for the same period · minted quantity ≡ ERVR `verified_quantity` · monitoring period not already issued · monitoring period within the crediting period and non-overlapping · Steering member with declared interest excluded from that decision · issuance votes only from Creditor Committee members · Operations holds no capability that reads or writes audit content, assignments, or decisions · the Competent Authority holds no capability beyond recording an authorization outcome.

**Seed as data, not code.** `institution_type`, `person_role`, `capability`, `stage.owner` and `invariant` are tables. Adding the Competent Authority was an insert plus one stage (S11b) — that is the test the design has to keep passing. Any `if (type === 'steering')` in a guard is a defect.

---

## 8. Delivery plan

Each milestone is a vertical slice that runs end to end and is demonstrable on its own.

**M0 — Foundations.** Institutions (five types), users with person roles, accounts, capability table with role scoping, `can()` guard, audit log, seed data.
*Exit:* a VVB user cannot perform an owner action or a Steering action; a VVB user without the Certified Creditor role cannot sign an ERVR; a Steering member outside the Creditor Committee cannot vote on issuance; the attempts are logged, and every write carries a resolved capability set. FR-1..3.

**M1 — Registration path.** S1–S6 with documents, completeness gate, consultation window with public submission and Operations moderation, the published fee schedule + escrow ledger with the S1 payment gate, the seeded shortlist draw and Steering selection with public reason, decision log, and SC-2 v1 anchoring with tx hashes surfaced in the UI. Validation audit is a stub that produces a report artifact.
*Exit:* one project reaches REGISTERED with a fixed crediting period and no credits in existence; the decision log reconstructs why; every artifact shows an anchor tx; the validation fee was HELD before submission; the shortlist is recomputable from the seed commitment and Steering could not select outside it. FR-4..11, FR-19..21, FR-33, FR-46, FR-48, FR-51, FR-56.

**M2 — Audit workspace (validation).** Desk sections, evidence, findings loop, site visit, opinion, readiness gates, approver sign-off, PVR issuance signed by a Certified Auditor.
*Exit:* a report cannot be issued with an open CAR; the owner's inbox round-trip closes a finding; the approver cannot also be a team member. FR-12..18.

**M3 — Issuance loop.** S7–S12 including S11b: quantification with materiality and the BE/PE/LE decomposition, verified quantity, Operations compliance review with the identity pre-check, Creditor Committee decision, issuance packet generation, Competent Authority login and confirm/refuse, escrow release keyed to SC-2 report attestation, per-VVB delta capture, buffer allocation at mint, minting, serials, vintage, certificate, loop to period n+1.
*Exit:* VVB-A never appears in a verification shortlist; quantity minted equals the ERVR verified quantity; an ERVR whose terms do not sum is rejected before Operations sees it; a second issuance for the same period is refused; no code path reaches the ex-ante estimate; a failing automated pre-check cannot be waived by an Operations user; **no mint occurs on an approved decision alone — a refusal returns the project to S11 with the reason visible, and a confirmation is required, never inferred from elapsed time**; **the platform portion is provably identical across the approve, reject and adverse-opinion branches, and escrow release fires identically on an adverse opinion**. FR-22..25, FR-34..39, FR-42..45, FR-49, FR-55, FR-57..62.

**M4 — Holdings & retirement.** Account ledger, transfer with range splitting, retirement with certificate, immutability enforcement; SC-1/SC-3/SC-4 deployed and SC-2 upgraded per Annex A including `attestAuthorization` and the Competent Authority key; event indexer and mirror reconciliation.
*Exit:* a retired serial cannot be transferred, by any path including direct API calls; on-chain balance and database mirror reconcile; a mint without the Creditor Committee threshold attestation reverts; a mint without the authority attestation reverts. FR-26..29, FR-47.

**M5 — Public surface.** Public project page with comments + VVB responses, serial lookup, honest eligibility labelling including the MoECC confirmation label, per-VVB statistics with shortlisted-vs-selected counts, the public pending-authorization queue, listing view for available credits.
*Exit:* a third party with no login can verify a serial end to end, recompute a shortlist, read any VVB's claimed-vs-verified and selection record, and see how long every pending authorization has waited. FR-30..32, FR-52, FR-53, FR-56, FR-61.

**M6 — Hardening.** Conflict-of-interest declarations, SLA timers and reminders, exports, demo seed set, negative-path test suite.

**Ordering rationale.** M0 first because retrofitting authorization is the most expensive rewrite in this system. M2 before M3 because the audit workspace is the engine both phases share. M4 before M5 because a public surface that shows unverifiable units is worse than no public surface.

---

## 9. Seed data

Three Project Owning Firms (one with two projects across different methodologies), **three VVBs** (so a verification shortlist of k = 3 can be drawn with VVB-A excluded and separation of duties still demonstrated), each with at least one Certified Auditor and one Certified Creditor, one Operations institution with a moderator and a compliance reviewer, one Steering Committee with three members and a chair of whom two hold the Creditor Committee role, one Competent Authority institution (labelled MoECC in the demo) with an Authorizing Officer and a key, two to three real published methodology identifiers with versions and source URLs, one project pre-seeded at each stage including one waiting in S11b, so any milestone can be demoed without replaying the whole pipeline.

---

## 10. Non-functional requirements

Server-authoritative authorization. Append-only audit and decision logs with no update or delete path exposed. Documents in object storage with a stored content hash. All timestamps UTC from a server clock, never a client clock. Canonical JSON serialization plus a hash for every report, decision and issuance record, stored from M1 onward — this is the anchoring seam for D-1 and costs nothing now. Reversible seed and reset for demos.

---

## 11. Known limitations (publish these)

- **L-1** The Steering Committee admits VVBs, **selects the engagement VVB from a drawn shortlist of k**, and decides on the reports they produce; Operations only moderates and screens. Human choice therefore re-enters assignment, bounded to the shortlist: the claim that survives is "no human chose the pool or the shortlist", not "no human chose the VVB", and a committee that consistently picks the most lenient of three regains roughly a third of the selection power the 0.5 draw had removed. FR-56 makes that pattern public; it does not make it impossible. Operations and Steering are also organs of the same legal party, so their separation is internal control rather than institutional independence; the GCC-style split of a separate rule-making committee is the roadmap fix.
- **L-2** No accreditation workflow. Accreditation is recorded as external evidence — now with a required evidence URL and expiry (expiry blocks the draw via FR-10) — but verification against the issuing body remains manual.
- **L-3** The Competent Authority confirmation (S11b) is a **product gate, not a legal act**. No enabling law or decree in Qatar currently gives MoECC a statutory role in confirming project-level credits, no corresponding adjustment is made, and the confirmation is not Article 6 host-country authorization. Nothing here is CORSIA-eligible, nothing prevents double *claiming*, and the label in FR-32 must say so. Until an instrument exists, MoECC's participation rests on an agreement with the platform, and the gate's value is exactly the value of that agreement.
- **L-4** The completeness gate is automated presence checking, not screening.
- **L-5** Superseded by D-10/FR-55: a flat-percentage buffer allocation exists, but there is **no clawback or cancellation logic** — the buffer only accumulates in the MVP, so reversal cover is accounting, not yet insurance. The percentage must be set well above the ~2% industry practice the research showed to be inadequate.
- **L-6** Only Project Owning Firms may hold credits, so MVP trading is firm-to-firm. A dedicated buyer institution is post-MVP.
- **L-7** No appeals or grievance mechanism. Hard gate: one must exist before any real-money project onboards — GCC, the program this platform models, publishes a Grievance and Appeal Procedure, so the MVP is currently below the baseline it digitizes.
- **L-8** Methodology text is referenced, not republished.
- **L-9** The PVR receives no procedural compliance review before the registration decision, only the ERVR does. Accepted because registration mints nothing; revisit if registration ever confers a tradable right.
- **L-10** One verification event covers exactly one monitoring period. Real programs batch several consecutive periods into one audit; the schema permits it, the MVP does not.
- **L-11** The platform earns a flat fee per engagement, so a portfolio-level volume incentive survives: more projects means more revenue, which pressures the *rulebook* toward permissiveness even though no single project decision is corruptible. Mitigations: outcome-independent fees (FR-48), rule-based assignment (FR-51), public deltas (FR-52), and the governance split on the roadmap. No fee structure removes this — Isometric carries it too.
- **L-12** Comment submission locks when the window closes. Verra accepts and obliges responses to late comments; the MVP is slightly below that bar.
- **L-13** The FR-54 double-registration check is a manual lookup with stored evidence, not an automated integration. Cross-registry double counting is a market-structure gap no single registry can close; the concrete thing this registry can do is be legible from outside — the roadmap item is aligning the public data model to CAD Trust v2.0 so the platform's records are machine-comparable with other registries'.
- **L-14** Every issuance now waits on a state ministry. The platform shows the delay (FR-61) but cannot bound it, and a refusal has no appeal route other than one resubmission (FR-60) — L-7 applies with more force. This is stricter than any comparable program: none gates *every* issuance on a government act. Issuance throughput is therefore a property of MoECC's process, not of the software.
- **L-15** "Issuance based on certified equations" is implemented as an arithmetic identity check (FR-57) — the platform confirms that the stated terms sum to the verified quantity and that the GWP set matches the methodology. It does not derive BE, PE or LE and cannot detect a wrong emission factor or an inflated baseline; that remains the Certified Creditor's work. Presenting FR-57 as automated quantification would overstate the control.
- **L-16** The Creditor Committee is a subset of Steering, so the issuance decision now rests on fewer people than the registration decision. Whether that is specialisation or concentration depends on how the subset is appointed and rotated; the charter must say, and it is not yet written.

---

## 12. Open decisions

- **D-1 On-chain scope.** **CLOSED.** The chain is a stated selling point; SC-2 anchoring ships at M1, the full contract set at M4, on Arbitrum testnet, chain-authoritative for the unit once minted. Annex A is the specification.
- **D-2 Trading venue.** Internal marketplace (an escrow order-book contract; we own custody and settlement semantics) or external venue (an export boundary and a `TRANSFERRED_OUT` lock so a unit cannot be double-spent across the seam). Now gates only the market contract; the rest of the chain layer is closed under D-1. The business flow's "Carbon Market" node is deliberately venue-neutral. A later ETS-GCC integration (D-3) would make the external option the natural default, but nothing is decided by that.
- **D-3 Posture and branding.** Decided for now: **independent**. 2C2MRV and ETS-GCC are separate systems; the product is hosted at `credits.ets-gcc.org` for convenience and speed of shipping, with integration planned later. Two things follow. The domain will be read as affiliation by anyone evaluating the platform, so the independence claim needs to be stated wherever the domain appears. And the GCC partner-vs-collision question is *deferred*, not answered: the vocabulary (PSF, PVR, PMR, ERVR, ACC, Steering Committee) is GCC's, the pipeline is GCC-inspired, and the new MoECC gate positions the platform as national infrastructure rather than a rival standard — which is the partner posture in everything but name. Decide explicitly before any external-facing release.
- **D-4 Consultation duration.** **CLOSED** — 15 calendar days, matching GCC's project-level Global Stakeholder Consultation. Quorum values remain a Steering charter constant.
- **D-5 VVB rotation.** Open, now phrased as a draw-eligibility cap: after how many consecutive periods a VVB is excluded from a project's draw pool. Industry precedent: Verra's six-consecutive-years limit with a three-year break.
- **D-6 Cooling-off window** for a VVB that previously consulted for an owner. Required as a constant in the conflict-of-interest invariant.
- **D-7 Verification batching.** Whether one verification event may cover several consecutive monitoring periods. MVP assumes 1:1; note that batching produces issuance blocks spanning multiple vintages, which is why vintage is keyed to the period.
- **D-8 PVR naming.** **CLOSED for the MVP** — keep *Project Verification Report* and *Emission Reduction Verification Report*: the first version is GCC-inspired and inherits GCC's names. The conflation risk stands (§4.1); the "Project Validation Report" rename, which matches ISO 14065 / 17029 usage, is the recommended change at external launch if the names are still ours to choose.
- **D-11 Competent Authority interface.** **CLOSED for the MVP — login plus exportable packet.** Research finding (Sept 2026): MoECC has no digital intake for project-level credits. The national MRV platform it launched with GGGI/CITEPA in July 2025 is an Enhanced Transparency Framework tool — inventory, NDC-progress and support-tracking modules — not a registry or an authorization portal; GCC separately sells "national registry infrastructure" for Article 6.2 to governments, which is a product, not a ministry system. So the MVP gives MoECC an Authorizing Officer login and a key (FR-59), and the issuance packet is generated in a form (canonical JSON, CAD Trust-aligned field names) that can be filed with any system the ministry later adopts. Re-open if MoECC stands up a registry or authorization workflow.
- **D-12 Shortlist size k.** Open constant; default 3. Smaller than 3 makes Steering's choice nearly a draw again (fine for integrity, pointless as a feature); larger than 5 hands Steering most of the selection power back. Must be ≥ 2 and ≤ the eligible pool size, with the rule for pools smaller than k stated (the whole pool is the shortlist).
- **D-13 Authorization SLA.** Open constant for FR-61: the target number of days after which a pending packet is flagged publicly as overdue. Displayed, not enforced — the platform has no lever over a ministry.
- **D-9 Fee routing.** **CLOSED** — flat-fee escrow. Published, versioned tiers; the owner pays the full engagement fee into escrow at submission, before any outcome exists; the VVB portion releases on SC-2 attestation of the issued report, identically for any opinion; the platform portion is outcome-independent; assignment is a seeded draw, not a choice. Rationale: the issuer-pays conflict is the market's proven central flaw (CAR VPM §1.5, Gold Standard process documents, 9.2× cookstove over-crediting, 6.1% REDD+ additionality); this captures Isometric's decoupling property without its concentration of appointment power. Residue recorded as L-11.
- **D-10 Reversal cover.** **CLOSED** — flat published percentage per activity class allocated to the buffer system account at mint (FR-55); clawback logic deferred post-MVP. Rationale: registries' ~2% deductions versus the >28% the Berkeley evidence supports; Puro-style pre-issuance deduction chosen over a full pool for MVP simplicity.

---

## 13. Acceptance demo (end to end)

Firm A pays the published validation fee into escrow and submits under a pinned methodology version → gate passes → consultation runs and a comment is filed → the seeded draw produces a shortlist of three and Steering selects VVB-1 with a public reason, unable to pick outside the three → VVB-1's Certified Auditor raises a CAR, the firm responds, VVB-1 closes it, answers the comment, the approver signs, the PVR issues → SC-2 attests it and **escrow releases VVB-1's fee** → Steering registers the project and fixes the crediting period, **creating no credits** → Firm A pays the verification fee and submits the period-1 PMR → VVB-1 is **absent from the verification shortlist** and Steering selects VVB-2 → VVB-2's Certified Creditor recalculates below the claim, states BE, PE and LE, and issues the ERVR; the identity check passes; its claimed-vs-verified delta posts to the public stats → escrow releases VVB-2's fee **before any committee has seen anything** → Operations runs the compliance review → the Creditor Committee approves issuance and the issuance packet is generated, **still nothing minted** → the MoECC Authorizing Officer confirms the packet and the confirmation is attested with the authority's key → the system mints the serial range at the **verified** quantity, the buffer percentage allocating to the buffer account → Firm A transfers part of the range to Firm B → Firm B retires it, naming a beneficiary → a logged-out visitor resolves the serial, sees it retired, recomputes the shortlists from the seed commitments, and reads the MoECC confirmation with its transaction → the decision log, authorization record and escrow ledger reconstruct every gate and every payment that allowed it. A second run in which the officer **refuses** ends at S11 with the reason visible and no credits in existence.

If that script runs, the MVP is done.

---

## 14. Tech stack

**React Router v8, Framework Mode** (Node 22.22+, React 19.2.7+, Vite 7, ESM-only) as the BFF: loaders/actions hold the session and call the API over the internal network. **FastAPI** (Pydantic v2, SQLAlchemy 2, Alembic) owns the domain — the guard, the state machine, every invariant. The guard exists exactly once, in FastAPI; router middleware resolves identity only. **PostgreSQL 16+** with `btree_gist` for the serial-range exclusion constraint. **Redis + ARQ** for the publisher (outbox → chain, single-concurrency so the relayer nonce has one owner) and the indexer (chain events → read model). **Object storage** for documents, content hash in Postgres. **Solidity + Foundry** on **Arbitrum testnet**, web3.py in the workers. Cache read models (public lookup, marketplace inventory); never cache gates, capability sets, or stage state.

**Hosting.** One VPS running several applications under Docker (Portainer). **NGINX Proxy Manager** is the host-level edge — the only process binding 80/443 — and routes `credits.ets-gcc.org` to this application's stack. Inside the stack, **Caddy** is the application's own reverse proxy in front of the router and API containers; everything else stays on the internal Docker network. The Competent Authority's signing key must not live on this host: it is the authority's, held in its own HSM or hardware wallet, and the platform only submits transactions it has signed.

---
