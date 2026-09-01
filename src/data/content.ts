/**
 * Modal content for every clickable element of the business-flow diagram.
 *
 * Written from the 2C2MRV MVP PRD v0.6 (references/2C2MRV-MVP-PRD.md) with
 * chain details from Annex A — but phrased as standalone explanations: no
 * document citations. The S-numbers are the platform's own stage ids, which
 * also appear as badges on the diagram.
 */

export interface ContentSection {
  heading?: string;
  paras?: string[];
  bullets?: string[];
}

export interface ContentEntry {
  title: string;
  /** Stage id chip, e.g. "S4" or "S11b". */
  stage?: string;
  /** Who acts here, shown as a chip in the modal header. */
  actorLabel?: string;
  /** One-line summary under the title. */
  tagline?: string;
  sections: ContentSection[];
}

export const CONTENT: Record<string, ContentEntry> = {
  /* ------------------------------------------------------------------ */
  /* Legend — the five institutions + the automatic stages              */
  /* ------------------------------------------------------------------ */

  lg1: {
    title: "Project Owning Firm",
    actorLabel: "Institution",
    tagline: "The party that claims — and later holds — the credits.",
    sections: [
      {
        heading: "What it does",
        bullets: [
          "Drafts and submits the PSF (project plan) and operates the activity.",
          "Submits a monitoring report (PMR) for each period and answers audit findings.",
          "Holds, transfers and retires credits — the only institution type that can.",
        ],
      },
      {
        heading: "What it never does",
        bullets: [
          "Assess its own submission.",
          "Set its own verified quantity — that number is always the second auditor's recalculation.",
        ],
      },
      {
        heading: "People inside it",
        bullets: [
          "Firm Admin · Project Manager · Read-only.",
          "Submission and PMR attestation is performed by a named user and recorded as such.",
        ],
      },
      {
        heading: "Worth knowing",
        paras: [
          "Only owner-firm accounts may hold credits for now, so trading is firm-to-firm; a dedicated buyer institution comes later. The owner pays the engagement fee into escrow before any outcome exists, and has no choice and no veto over which auditor is assigned.",
        ],
      },
    ],
  },

  lg2: {
    title: "Auditor (VVB)",
    actorLabel: "Institution",
    tagline:
      "Validation & Verification Body — audits, recommends, and never approves.",
    sections: [
      {
        heading: "What it does",
        bullets: [
          "Validates project design through its Certified Auditor role (the PVR, before anything runs).",
          "Verifies performance through its Certified Creditor role (the ERVR, after measurement).",
          "Raises and closes findings; issues reports with an opinion and assurance level.",
        ],
      },
      {
        heading: "What it never does",
        bullets: [
          "Validate and verify the same project — enforced at institution level.",
          "Approve anything. The auditor recommends; the committee decides.",
          "Hold credits.",
        ],
      },
      {
        heading: "People inside it",
        bullets: [
          "VVB Admin (no audit-content capabilities) · Team Leader · Team Member.",
          "Approver — independent technical review; must not be on the audit team for that engagement.",
          "Certified Auditor — may lead and sign a validation engagement (PVR).",
          "Certified Creditor — may lead and sign a verification engagement (ERVR and its verified quantity).",
          "A person may hold both certifications; the institution-level separation still applies.",
        ],
      },
      {
        heading: "Worth knowing",
        paras: [
          "Accreditation is recorded as external evidence — the platform does not grant it, and an expired or out-of-scope accreditation blocks the draw. The VVB is paid from escrow when its report is published, identically for any opinion — an adverse opinion pays the same as a positive one, so the auditor has nothing to gain from pleasing the owner.",
          "Naming hazard: in finance a “creditor” is a lender. Buyers and regulators will read “Certified Creditor” that way on first contact — expect to explain it.",
        ],
      },
    ],
  },

  lg3: {
    title: "Steering Committee",
    actorLabel: "Institution",
    tagline: "The body that decides — never the one that audits.",
    sections: [
      {
        heading: "What it does",
        bullets: [
          "Admits VVBs to the platform.",
          "Selects the engagement VVB from the drawn shortlist, with a recorded public reason.",
          "Decides registration (all members vote).",
          "Decides issuance — through its Creditor Committee role, a designated subset with its own quorum.",
        ],
      },
      {
        heading: "What it never does",
        bullets: [
          "Perform any audit work.",
          "Select a VVB outside the shortlist, re-order it, or trigger a re-draw without a declared conflict.",
          "Decide where a member has declared an interest — the exclusion is recorded.",
        ],
      },
      {
        heading: "People inside it",
        bullets: [
          "Member — votes on registration.",
          "Creditor Committee member — only these members vote on issuance decisions.",
          "Chair — finalizes a decision once quorum is met.",
        ],
      },
      {
        heading: "Worth knowing",
        paras: [
          "Operations and the Steering Committee are organs of one legal party — the program administrator. Their separation is internal control, not institutional independence, and the platform publishes that limitation rather than implying more.",
          "The Creditor Committee is a subset, so issuance rests on fewer people than registration. Whether that is specialisation or concentration depends on how the subset is appointed and rotated; the charter that will govern this is not yet written.",
        ],
      },
    ],
  },

  lg4: {
    title: "Operations",
    actorLabel: "Institution",
    tagline: "Moderation and procedural review — nothing else.",
    sections: [
      {
        heading: "What it does",
        bullets: [
          "Moderates consultation comments: soft-hide with a reason code; the comment and the redaction are both retained.",
          "May extend a consultation window once, by no more than the original duration, with a recorded reason.",
          "Performs the procedural compliance review of the ERVR.",
        ],
      },
      {
        heading: "What it never does",
        bullets: [
          "Assign VVBs, screen intake, or admit VVBs.",
          "Decide anything — it can return the ERVR to the auditor, never reject or approve.",
          "Touch audit content, quantities or findings.",
          "Hold credits.",
        ],
      },
      {
        heading: "People inside it",
        bullets: [
          "Moderator — comment redaction, window extension.",
          "Compliance Reviewer — completes the judgment checklist of the compliance review.",
          "No Operations person role carries any audit, assignment or decision capability.",
        ],
      },
    ],
  },

  lg5: {
    title: "Automatic (system) stages",
    actorLabel: "No human owner",
    tagline: "Steps with no human owner, logged as “system” so the audit trail has no gaps.",
    sections: [
      {
        heading: "Which steps are automatic",
        bullets: [
          "S2 — the completeness check.",
          "S3 — the consultation window (opens and closes on its own).",
          "The shortlist draw inside S4 and S8 — the selection that follows is Steering's, so those stages as a whole are not automatic.",
          "S12 — issuance (the mint).",
        ],
      },
      {
        heading: "Why the mint has no owner",
        paras: [
          "The permissions to mint and burn credits are bound to a special “Registry” institution type that a database constraint makes unassignable to any account. The mint is callable only by an automated issuance job, which derives its quantity from the published ERVR and requires both the approved Steering decision and the Competent Authority confirmation for the same period; it takes no quantity parameter.",
          "The Registry is not an institution and not an actor with judgment — it is the enforced answer to “who may create supply”: nobody with a login.",
        ],
      },
    ],
  },

  lg6: {
    title: "Competent Authority (MoECC)",
    actorLabel: "Institution — a state ministry",
    tagline: "Confirms or refuses every issuance, before any mint.",
    sections: [
      {
        heading: "What it does",
        bullets: [
          "Receives the issuance packet after an approved issuance decision.",
          "Confirms or refuses it, with a reason, before any mint.",
        ],
      },
      {
        heading: "What it never does",
        bullets: [
          "Audit anything or alter a quantity.",
          "Decide registration or issuance; admit or select VVBs.",
          "Mint, or hold credits.",
          "No authority capability reads or writes audit content, findings, quantities, decisions, or balances — it sees the packet and the public record, nothing else.",
        ],
      },
      {
        heading: "People inside it",
        bullets: [
          "Authorizing Officer — records the outcome and signs a confirmation with the authority's own key.",
          "Read-only.",
        ],
      },
      {
        heading: "Worth knowing",
        paras: [
          "Unlike Operations and Steering, the authority is an independent party — a state ministry. That is what makes its confirmation worth more than another internal gate, and also what makes its response time a risk the platform does not control.",
          "The confirmation is a product gate, not a legal act: no enabling law currently gives the ministry a statutory role here, no international registry adjustment is made, and it is not Article 6 host-country authorization. The interface is a login plus an exportable packet; the authority's signing key lives in its own hardware, never on the platform host.",
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* Phase headers                                                       */
  /* ------------------------------------------------------------------ */

  ph1: {
    title: "Phase 1 — Register the project",
    stage: "S1–S6",
    tagline: "From a submitted plan to a registered project. No credits yet.",
    sections: [
      {
        heading: "The path in one sentence",
        paras: [
          "The Project Owner submits the PSF under a pinned methodology version → an automated completeness gate checks presence and schema → a public consultation window runs and comments are recorded → the system draws a shortlist of accredited, in-scope VVBs selected at random and the Steering Committee selects one from that shortlist with a recorded, public reason, the engagement funded from the escrowed fee → that VVB (Auditor A, led by a Certified Auditor) conducts the validation audit, running the findings loop with the owner until every CAR is closed and every CL resolved, and issues the PVR recommending registration or not → the Steering Committee approves or rejects.",
        ],
      },
      {
        heading: "What approval fixes",
        bullets: [
          "The project becomes REGISTERED.",
          "The crediting period is fixed — the outer window within which any monitoring period may earn credits.",
          "No credits are created at registration.",
        ],
      },
      {
        heading: "Money",
        paras: [
          "The validation fee — auditor portion + platform portion — is paid into escrow at submission, before any outcome exists. The platform portion is identical in every outcome branch.",
        ],
      },
    ],
  },

  ph2: {
    title: "Phase 2 — Earn credits",
    stage: "S7–S12",
    tagline: "Once per monitoring period: measure, verify, review, decide, confirm, mint.",
    sections: [
      {
        heading: "The loop in one sentence",
        paras: [
          "The owner submits the PMR with the claimed reductions for period n → the system draws a shortlist from which Auditor A is excluded and Steering selects a second, different auditor (B ≠ A) → Auditor B's Certified Creditor recalculates the reductions from evidence and issues the ERVR carrying the verified quantity decomposed into BE, PE and LE → Operations performs a procedural compliance review → the Creditor Committee approves or rejects issuance → on approval the system generates the issuance packet and the Competent Authority (MoECC) confirms or refuses it → on confirmation the Registry mints serialized credits for period n, in exactly the quantity the ERVR verified. The project then returns to monitoring for period n+1.",
        ],
      },
      {
        heading: "Hard period rules",
        bullets: [
          "Monitoring periods must not overlap; gaps are permitted and earn nothing.",
          "Every period must fall entirely within the crediting period.",
          "A period may be issued at most once, ever — enforced on the period record and again on-chain.",
        ],
      },
    ],
  },

  ph3: {
    title: "Phase 3 — Use the credits",
    tagline: "Hold, trade firm-to-firm, retire permanently, verify publicly.",
    sections: [
      {
        heading: "Credit unit states",
        paras: [
          "ISSUED → HELD → (TRANSFERRED → HELD)* → RETIRED. Retirement is terminal, immutable and non-transferable.",
        ],
      },
      {
        heading: "The rules",
        bullets: [
          "Transfer moves a serial range between accounts and appends to ownership history; partial ranges may be split.",
          "Only HELD units may be transferred; RETIRED units are locked at the database level, not just in application code.",
          "Nothing is ever hard-deleted; states are appended, never overwritten.",
          "A public serial lookup resolves any credit with no login.",
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* Phase 1 stages                                                      */
  /* ------------------------------------------------------------------ */

  b1: {
    title: "Owner submits the project plan (PSF)",
    stage: "S1",
    actorLabel: "Project Owning Firm",
    tagline: "The claim that starts everything — under a methodology pinned forever.",
    sections: [
      {
        heading: "What happens",
        paras: [
          "The owner drafts and submits the Project Submission Form under a pinned methodology and version — both immutable for the lifetime of the project. The platform consumes externally published methodologies; it does not author them.",
        ],
      },
      {
        heading: "What the PSF carries",
        bullets: [
          "Design, baseline, additionality, monitoring plan, safeguards, ownership proof.",
          "Proposed crediting period.",
          "An ex-ante estimate — reference only. It carries no balance and the issuance machinery cannot read it.",
        ],
      },
      {
        heading: "Exit condition",
        bullets: [
          "Required fields and attachments present; methodology version pinned.",
          "The validation fee is held in escrow — paid before any outcome exists.",
        ],
      },
      {
        heading: "If it goes wrong",
        paras: [
          "A failed completeness check returns the project here, editable, with a machine-generated reason list.",
        ],
      },
    ],
  },

  b1a: {
    title: "Completeness check",
    stage: "S2",
    actorLabel: "Automatic (system)",
    tagline: "A presence and schema check — not a judgment.",
    sections: [
      {
        heading: "What happens",
        paras: [
          "An automated gate checks that required fields and attachments are present and schema-valid. It passes or it fails; no human is involved, and the transition is logged with “system” as the acting principal.",
        ],
      },
      {
        heading: "What it is not",
        paras: [
          "It is not screening, and the platform deliberately labels it that way: automated validation is presence checking, and calling it screening would overstate the control. Nobody at the platform reviews or filters submissions here — Operations never screens intake.",
        ],
      },
      {
        heading: "If it fails",
        paras: [
          "The project returns to submission, editable, with a machine-generated reason list. On pass, the consultation window opens automatically.",
        ],
      },
    ],
  },

  b2: {
    title: "Public consultation window",
    stage: "S3",
    actorLabel: "Automatic · Operations moderates",
    tagline: "15 calendar days in which anyone can comment, on the record.",
    sections: [
      {
        heading: "What happens",
        paras: [
          "The window opens automatically when the completeness check passes and runs for 15 calendar days — matching the project-level public consultation of the GCC program this platform is modelled on. Comments are recorded with an author identity and are visible on the public project page.",
        ],
      },
      {
        heading: "The teeth",
        bullets: [
          "The validation audit cannot conclude until every consultation comment has a recorded auditor response.",
          "At close, a fingerprint of the whole comment set is anchored to the public ledger, so no comment can be added or removed afterwards.",
          "Every comment is later shown on the public project page together with the auditor's response.",
        ],
      },
      {
        heading: "Moderation, bounded",
        bullets: [
          "Operations may soft-hide a comment with a reason code — the comment and the redaction are both retained.",
          "Operations may extend the window once, by no more than the original duration. No party may close a window early.",
        ],
      },
      {
        heading: "Worth knowing",
        paras: [
          "Comment submission locks when the window closes. Some established registries accept and answer late comments; this platform is slightly below that bar for now.",
        ],
      },
    ],
  },

  b3: {
    title: "Seeded draw + Committee selection",
    stage: "S4",
    actorLabel: "Automatic draw → Steering selects",
    tagline: "No human composes the pool or the shortlist. The choice that remains is public.",
    sections: [
      {
        heading: "What happens",
        paras: [
          "The system draws a shortlist of k or all VVBs (default three) selected at random from the eligible pool. The random seed is committed on-chain before the draw runs, and the pool snapshot and shortlist are stored — anyone can recompute the shortlist and confirm it wasn't rigged. The Steering Committee then selects exactly one from that shortlist and must record a selection reason, which is public.",
        ],
      },
      {
        heading: "The pool filter (published)",
        bullets: [
          "Accreditation active, in scope, unexpired — exclusion happens before the draw, not as a check on the result.",
          "Methodology-family experience or newcomer pairing; a capacity cap; a rotation cap; no declared conflict.",
          "The draw is uniform over the filtered pool — it never ranks.",
        ],
      },
      {
        heading: "What Steering cannot do",
        bullets: [
          "Select outside the shortlist, re-order it, or trigger a re-draw — except on a conflict declared by the selected VVB, logged with reason.",
          "The owner has no choice and no veto at any step.",
        ],
      },
      {
        heading: "Worth knowing",
        paras: [
          "The claim that survives is “no human chose the pool or the shortlist”, not “no human chose the VVB”. A committee that consistently picks the most lenient of three regains roughly a third of the selection power the pure draw had removed. The platform makes that pattern public — every engagement shows the seed, pool, shortlist, selection and reason, and the public per-VVB statistics page shows shortlisted-vs-selected counts next to each VVB's claimed-vs-verified gap — but public is not the same as impossible.",
        ],
      },
    ],
  },

  b4: {
    title: "Validation audit — the PVR",
    stage: "S5",
    actorLabel: "Auditor A · signed by a Certified Auditor",
    tagline: "The design audit: is this project sound before anything is measured?",
    sections: [
      {
        heading: "What happens",
        paras: [
          "Auditor A (the VVB just selected), led by a Certified Auditor, assesses the project design: a desk assessment of every PSF section, a baseline and additionality conclusion, a site visit with a named sign-off, and a response to every consultation comment. The result is the Project Verification Report — an audit of design, before anything runs — with an opinion, an assurance level, and a recommendation on registration and crediting period.",
        ],
      },
      {
        heading: "The findings loop",
        bullets: [
          "Desk sections are individually assessed Pass / CAR / CL; unassessed sections block the report.",
          "CARs and CLs block advancement; FARs carry forward to the next audit. The owner responds; only the auditor may close.",
          "The audit also records a check that the project is not registered on any other registry.",
        ],
      },
      {
        heading: "Report gates",
        bullets: [
          "Every section assessed · all CARs closed · all CLs resolved · site visit signed off · opinion set.",
          "Approver sign-off — and the approver must not have worked on the audit team.",
          "The signing lead must hold the Certified Auditor certification.",
          "Issuing the report advances the stage; it mints nothing.",
        ],
      },
      {
        heading: "Worth knowing",
        paras: [
          "The escrowed auditor fee is released when the issued report is published — identically for any opinion, so an adverse opinion pays the same as a positive one.",
          "The PVR receives no Operations compliance review — only the ERVR does. Accepted because registration mints nothing.",
        ],
      },
    ],
  },

  b5: {
    title: "Registration decision",
    stage: "S6",
    actorLabel: "Steering Committee",
    tagline: "Approve → REGISTERED, crediting period fixed. Still zero credits.",
    sections: [
      {
        heading: "What happens",
        paras: [
          "Steering members vote; the decision requires the configured quorum and is finalized by the Chair. A member with a declared interest in the project is excluded, and the exclusion is recorded. Every decision writes an append-only log entry containing outcome, rationale and the evidence gates that permitted it.",
        ],
      },
      {
        heading: "On approval",
        bullets: [
          "The project becomes REGISTERED.",
          "The crediting period is fixed — a project without one cannot enter monitoring.",
          "No credits are created at registration.",
        ],
      },
      {
        heading: "On rejection",
        paras: ["The project returns to submission with notes."],
      },
    ],
  },

  b5n: {
    title: "Why no credits exist yet",
    tagline: "Registration credits nothing, because nothing has been measured.",
    sections: [
      {
        paras: [
          "The ex-ante estimate in the PSF is a plausibility reference, never an entitlement — crediting it would mean issuing retirable permits against a forecast, and a retired credit cannot be recalled when the forecast proves wrong.",
          "The estimate carries no balance behind it, and the issuance machinery cannot read it. Exactly one document — the ERVR, written later by the second auditor — may carry a verified quantity, and it is the only number the mint reads.",
          "Where an issuance for a period materially exceeds the pro-rata ex-ante estimate, the verification workspace raises an automatic flag for the auditor to address in the ERVR.",
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* Phase 2 stages                                                      */
  /* ------------------------------------------------------------------ */

  b6: {
    title: "Monitoring & the PMR",
    stage: "S7",
    actorLabel: "Project Owning Firm",
    tagline: "Operate, measure, report — the claim for period n.",
    sections: [
      {
        heading: "What happens",
        paras: [
          "For each monitoring period n, the owner operates the activity, measures against the monitoring plan, and submits the Project Monitoring Report: period boundaries, measured parameters, raw evidence, the claimed reductions and their calculation, deviations, and responses to carried-forward FARs. PMR attestation is performed by a named user.",
        ],
      },
      {
        heading: "Exit condition",
        bullets: [
          "PMR and evidence submitted.",
          "The verification fee is held in escrow.",
        ],
      },
      {
        heading: "Period rules",
        bullets: [
          "Every monitoring period must fall entirely within the crediting period.",
          "Periods must not overlap; gaps are permitted and earn nothing.",
          "A period may be issued at most once, ever.",
        ],
      },
    ],
  },

  b6a: {
    title: "Second seeded draw — Auditor A excluded",
    stage: "S8",
    actorLabel: "Automatic draw → Steering selects",
    tagline: "B ≠ A is impossible by construction, not merely checked.",
    sections: [
      {
        heading: "What happens",
        paras: [
          "Assignment runs exactly as before — a randomly drawn shortlist, Steering selects one with a public reason — with one difference: the institution that validated the project is removed from the eligible pool before the draw, so the draw cannot produce Auditor A.",
        ],
      },
      {
        heading: "Enforced three times",
        bullets: [
          "At pool construction — the draw cannot select the validator.",
          "In the database.",
          "On-chain — the registry contract refuses to record a verification engagement for the VVB that validated the project.",
        ],
      },
      {
        heading: "Why it matters",
        paras: [
          "This is rule 1 made operational: the party that audits a project's design is never the party that audits its performance. The auditor who approved the design has an interest in the design looking right; the performance recalculation must come from someone without that stake.",
        ],
      },
    ],
  },

  b7: {
    title: "Performance verification — the ERVR",
    stage: "S9",
    actorLabel: "Auditor B · signed by a Certified Creditor",
    tagline: "The recalculation that becomes the minted quantity.",
    sections: [
      {
        heading: "What happens",
        paras: [
          "Auditor B, led by a Certified Creditor, recalculates the reductions from evidence — never from the owner's claim. The ERVR states the verified quantity as BE − PE − LE (baseline minus project minus leakage emissions), each term given separately in tonnes of CO₂-equivalent, together with the greenhouse-gas conversion table (GWP set) the pinned methodology requires; where gases other than CO₂ are involved, the per-gas conversion is shown.",
        ],
      },
      {
        heading: "In the workspace",
        bullets: [
          "Claimed figures are displayed beside editable verified values; the gap is computed live against a ±5% materiality threshold.",
          "The recommended quantity is derived from verified values only.",
          "An issuance materially above the pro-rata ex-ante estimate raises an automatic flag to address in the report.",
          "Same gates as validation: sections, findings, site visit, approver — and the signing lead must hold the Certified Creditor certification.",
        ],
      },
      {
        heading: "Why this number is special",
        bullets: [
          "The verified quantity exists on the ERVR only — the PSF, PMR and PVR have no such field, and the mint reads no other source.",
          "The claimed-vs-verified gap posts to the public per-VVB statistics page.",
          "Escrow releases the auditor's fee when the report is published — before any committee has seen anything, and identically for an adverse opinion.",
        ],
      },
      {
        heading: "Honest limit",
        paras: [
          "The platform checks the arithmetic identity and the GWP-set match; it does not compute BE, PE or LE and has no methodology-as-code engine. The derivation of each term is the Certified Creditor's work under the methodology — its correctness is what the audit, not the software, vouches for.",
        ],
      },
    ],
  },

  b8: {
    title: "Compliance review",
    stage: "S10",
    actorLabel: "Operations",
    tagline: "Automated pre-checks a human cannot waive, then a bounded judgment checklist.",
    sections: [
      {
        heading: "Automated pre-checks first",
        bullets: [
          "ERVR issued by the assigned Auditor B and signed by a Certified Creditor.",
          "All report gates passed.",
          "Period within the crediting period, non-overlapping, not already issued.",
          "Verified quantity present and equal to BE − PE − LE as decomposed on the report.",
          "GWP set stated and matching the pinned methodology.",
          "Materiality gap documented; carried-forward FARs addressed.",
          "A failing pre-check blocks the stage and is not overridable by any human.",
        ],
      },
      {
        heading: "Then the judgment checklist",
        paras: [
          "Only what a machine cannot decide: does the ERVR narrative support the quantity, are monitoring-plan deviations explained, and is anything anomalous against prior periods or the ex-ante reference?",
        ],
      },
      {
        heading: "Return, not reject",
        paras: [
          "Operations may send the ERVR back to Auditor B with notes, or pass it to Steering. It cannot approve issuance, alter a quantity, close a finding, or edit any audit artifact. The Steering decision screen then displays the review outcome, the count of consultation comments, and how many became findings.",
        ],
      },
    ],
  },

  b9: {
    title: "Issuance decision",
    stage: "S11",
    actorLabel: "Steering · Creditor Committee members only",
    tagline: "A binary decision — the quantity is not on the table.",
    sections: [
      {
        heading: "What happens",
        paras: [
          "Issuance is voted only by Steering members holding the Creditor Committee role, with their own quorum, finalized by the Chair. The decision is yes / no only: the quantity minted is the ERVR's verified quantity, and no override path exists. A member with a declared interest is excluded, recorded; the decision writes an append-only log entry.",
        ],
      },
      {
        heading: "On approval",
        paras: [
          "The system generates the issuance packet and the project enters the Competent Authority's queue. Nothing is minted in this state.",
        ],
      },
      {
        heading: "On rejection",
        paras: ["The project returns to monitoring."],
      },
      {
        heading: "Worth knowing",
        paras: [
          "Note the name: this is the Creditor Committee — a Steering subset — not the “Certified Creditor”, which is a person role inside a VVB. Because the subset is smaller than the full committee, issuance rests on fewer people than registration; the appointment and rotation charter that would justify that is not yet written.",
        ],
      },
    ],
  },

  "JaASU19LGJu8xGfdlSRQ-6": {
    title: "Authorization — the MoECC gate",
    stage: "S11b",
    actorLabel: "Competent Authority · Authorizing Officer",
    tagline: "A state actor's key between the committee and the mint.",
    sections: [
      {
        heading: "The issuance packet",
        paras: [
          "Generated the moment the issuance decision is approved: a canonical data file plus a rendered PDF bundling the project identity and methodology pin, fingerprints of all four documents and their public-ledger anchors, the verified quantity with its BE/PE/LE components and GWP set, the auditors' identities with accreditation records, the consultation summary, both decisions with votes, and the compliance-review outcome. Immutable, anchored, and exportable so it can be filed with any system the ministry later adopts.",
        ],
      },
      {
        heading: "Exactly one outcome per packet",
        bullets: [
          "CONFIRMED — signed with the authority's own key and recorded on-chain. The key lives in the ministry's own hardware, never on the platform host.",
          "REFUSED — with a reason, recorded on-chain. The record is append-only.",
          "No auto-confirm on elapsed time, and no auto-refuse: silence is neither.",
        ],
      },
      {
        heading: "On refusal",
        paras: [
          "The project returns to the issuance decision with the reason visible to Steering and the owner. Steering may withdraw its decision (project returns to monitoring with notes) or resubmit the packet once with additional information; a second refusal ends the period's issuance path.",
        ],
      },
      {
        heading: "Visible, not enforceable",
        paras: [
          "The authority's queue publicly shows every pending packet and the days elapsed since its generation (the overdue threshold is still to be set). The delay is visible; the platform has no lever over a ministry.",
        ],
      },
      {
        heading: "Honest limits",
        paras: [
          "This is a product gate, not a legal act: no enabling law or decree currently gives the ministry a statutory role in confirming project-level credits, no international registry adjustment is made, and the confirmation is not Article 6 host-country authorization — the public label says so.",
          "Every issuance now waits on a state ministry — stricter than any comparable program, and it makes issuance throughput a property of the ministry's process, not of the software.",
        ],
      },
    ],
  },

  b10: {
    title: "Credits minted",
    stage: "S12",
    actorLabel: "Automatic — the Registry binding",
    tagline: "Exactly the ERVR number. Nobody with a login can do this.",
    sections: [
      {
        heading: "What must exist first — all three, for the same period",
        bullets: [
          "A published ERVR.",
          "An approved issuance decision.",
          "A CONFIRMED authorization record.",
          "Each recorded on the public ledger; the token contract mints only when the committee's threshold signatures and the authority's signature both exist — never on the platform's own key alone, and never on either one alone.",
        ],
      },
      {
        heading: "What the mint does",
        bullets: [
          "Quantity minted equals the verified quantity in the ERVR — the issuance job takes no quantity parameter, and no override path exists.",
          "Serial ranges are globally unique, non-reusable, and carry the project id and vintage (the monitoring period the credits were earned in).",
          "A monitoring period may produce at most one issuance, ever — enforced on the period record and again on-chain.",
          "For activity classes with reversal risk (say, a forest that could burn), a published flat percentage of the issuance is set aside in a buffer account; the remainder goes to the owner. The split happens at allocation — the mint itself still equals the ERVR quantity exactly.",
        ],
      },
      {
        heading: "Afterwards",
        paras: ["The project returns to monitoring for period n+1."],
      },
      {
        heading: "Worth knowing",
        paras: [
          "The buffer only accumulates for now — there is no clawback or cancellation logic yet, so reversal cover is accounting, not yet insurance.",
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* Phase 3 stages                                                      */
  /* ------------------------------------------------------------------ */

  b11: {
    title: "Owner holds them",
    actorLabel: "Project Owning Firm",
    tagline: "Credits live in accounts — and only owner-firm accounts have balances.",
    sections: [
      {
        heading: "What happens",
        paras: [
          "Minted credits are credited to the owner firm's account as HELD units. Every institution has an account, but only Project Owning Firm accounts may hold, transfer or retire; auditor, Steering, Operations and Competent Authority accounts are permanently zero-balance.",
        ],
      },
      {
        heading: "One balance, never two",
        paras: [
          "Once a unit is minted, the blockchain is authoritative for it and the database holding record becomes a mirror. One authoritative balance — the double-spend path this product exists to prevent appears the moment credits exist in two places at once.",
        ],
      },
    ],
  },

  b12: {
    title: "Carbon Market",
    actorLabel: "Account holders",
    tagline: "Deliberately venue-neutral — the trading venue is still an open decision.",
    sections: [
      {
        heading: "What works today",
        paras: [
          "Trading is firm-to-firm transfer: a transfer moves a serial range between accounts and appends to ownership history; partial ranges may be split. Only HELD units may be transferred. Real payment processing is out of scope for now — the fee and escrow mechanics run on test-mode money.",
        ],
      },
      {
        heading: "The open decision",
        bullets: [
          "Option A — internal marketplace: an escrow order book where credits and payment swap atomically. Deliberately not an automated market maker: pooling means treating unlike tonnes as interchangeable, which is the quality laundering this product exists to prevent.",
          "Option B — external venue: an export boundary that locks a unit locally the moment it leaves, so it cannot be spent twice across the seam.",
        ],
      },
      {
        heading: "Worth knowing",
        paras: [
          "Only Project Owning Firms may hold credits, so a dedicated buyer institution comes later. Eligibility labels on listings render as “Not assessed” — never omitted, never implied.",
        ],
      },
    ],
  },

  b13: {
    title: "Retired — permanent",
    actorLabel: "Holding account",
    tagline: "The only way a credit is ever used up. There is no way back.",
    sections: [
      {
        heading: "What happens",
        paras: [
          "Retirement records the beneficiary (a free-text name, so retiring on behalf of a third party is meaningful), the reason and the timestamp, and generates a certificate with a verifiable id.",
        ],
      },
      {
        heading: "Why it is irreversible",
        bullets: [
          "RETIRED units are immutable and non-transferable — enforced at the database level, not only in application code.",
          "Nothing is ever hard-deleted; states are appended, never overwritten.",
          "On-chain, retirement burns the tokens and mints a non-transferable certificate in the same transaction — a certificate exists if and only if a burn occurred.",
          "The token contract cannot be upgraded: no admin mint, no rescue function, no pause on retirement, no path back.",
        ],
      },
    ],
  },

  b14: {
    title: "Public lookup — no login",
    actorLabel: "Anyone",
    tagline: "The whole pipeline is checkable from outside.",
    sections: [
      {
        heading: "What anyone can see",
        bullets: [
          "Serial lookup: any serial resolves to its project, vintage, current state and, if retired, its retirement record.",
          "The public project page: pinned methodology, stage, every consultation comment with the auditor's response, issued reports, issuance history.",
          "Per-VVB statistics: engagements, opinions issued, the average claimed-vs-verified gap, and how often each VVB was shortlisted versus selected — computed live, never cached.",
          "Every engagement's draw: seed commitment, pool snapshot, shortlist, selection and public reason — the shortlist is recomputable by anyone.",
          "The authority's queue: every pending issuance packet and the days it has waited.",
        ],
      },
      {
        heading: "Honest labels",
        paras: [
          "Eligibility labels (CORSIA, Article 6) render as “Not assessed” with an explanatory note — not omitted, not implied. The MoECC confirmation is shown as its own label, with date and ledger anchor, and is never rendered as, or next to, Article 6 authorization or CORSIA eligibility.",
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* Strips                                                              */
  /* ------------------------------------------------------------------ */

  tr: {
    title: "The three rules",
    tagline: "The product's central assertion, printed on the diagram and kept true in code.",
    sections: [
      {
        paras: [
          "The auditor recommends, the committee decides, the authority confirms, the system mints. No institution performs another's step, and no credit exists without an independent audit, a recorded decision and a state confirmation.",
          "Positioning, in one sentence: incumbents ask the market to trust one company's integrity; 2C2MRV makes the separation of roles independently checkable.",
        ],
      },
    ],
  },

  tr1: {
    title: "Rule 1 — Design auditor ≠ performance auditor",
    tagline: "Separation of duties at institution level, enforced three ways.",
    sections: [
      {
        heading: "The rule",
        paras: [
          "The party that audits a project's design is never the party that audits its performance — Certified Auditor versus Certified Creditor, at institution level. A person may hold both certifications; the institution that validated a project still never verifies it.",
        ],
      },
      {
        heading: "How it is enforced",
        bullets: [
          "At pool construction: the verification draw cannot produce the validator.",
          "In the database.",
          "On-chain: the registry contract refuses to record a verification engagement for the project's validator.",
        ],
      },
      {
        heading: "And inside each audit",
        paras: [
          "The approver who signs off a report must not have worked on that engagement's audit team, and the signing lead must hold the certification the phase requires — Certified Auditor for a PVR, Certified Creditor for an ERVR.",
        ],
      },
    ],
  },

  tr2: {
    title: "Rule 2 — The quantity is a checked recalculation",
    tagline: "“Issuance based on certified equations”, implemented as a hard identity check.",
    sections: [
      {
        heading: "The rule",
        paras: [
          "The issued quantity is the Certified Creditor's recalculation, decomposed into the methodology's own terms — verified quantity = BE − PE − LE, each term in tonnes of CO₂-equivalent, under the greenhouse-gas conversion table (GWP set) the pinned methodology requires; where gases other than CO₂ are involved, the per-gas conversion is shown.",
        ],
      },
      {
        heading: "The check",
        paras: [
          "The platform verifies the identity and the GWP-set match as a hard pre-check and rejects an ERVR that fails it — before Operations or any committee sees it. The verified quantity exists on the ERVR only, and the mint reads no other source.",
        ],
      },
      {
        heading: "Honest limit",
        paras: [
          "The platform does not compute BE, PE or LE and has no methodology-as-code engine. It confirms the stated terms sum and the GWP set matches; it cannot detect a wrong emission factor or an inflated baseline — that remains the Certified Creditor's work, and presenting this check as automated quantification would overstate the control.",
        ],
      },
    ],
  },

  tr3: {
    title: "Rule 3 — No person mints; everything is published",
    tagline: "Tamper-evident by construction — and honest about what that does not mean.",
    sections: [
      {
        heading: "No person can mint or un-retire",
        paras: [
          "The permission to create or destroy credits binds to a locked “Registry” system role that no account can ever be given, so nobody with a login can create supply. On-chain, minting requires the Creditor Committee's threshold signatures and the Competent Authority's key — never the platform's own key alone. Retirement is terminal: no admin mint, no rescue function, no path back.",
        ],
      },
      {
        heading: "Everything is published",
        paras: [
          "From the first release, every submission, report, decision, compliance outcome and consultation close is fingerprinted and anchored to a public ledger, with the transaction hash displayed on the artifact; publishing runs through a queue so the product keeps working even when the chain does not. Once minted, the credits themselves live on-chain and the database becomes a mirror.",
        ],
      },
      {
        heading: "Honest claims only",
        paras: [
          "Two claims are true and used: publicly verifiable and tamper-evident. Three would be false under a platform-operated relayer and a permissioned committee, and are not used: immutable, trustless, decentralised.",
          "The chain cannot verify a tonne, make a captured auditor honest, or make an inflated baseline true. Over-crediting is prevented off-chain — separation of duties, blocking findings, the ±5% materiality threshold, the independent approver. The contracts prevent a narrower and still valuable set: double issuance of a period, forged retirement, silent revision of a decision, and undetectable tampering with a report.",
        ],
      },
    ],
  },
};
