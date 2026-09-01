/**
 * Modal content for every clickable element of the business-flow diagram,
 * written from the 2C2MRV MVP PRD v0.6 (references/2C2MRV-MVP-PRD.md) with
 * chain details from Annex A (references/2C2MRV-Annex-A-Contract-Framework.md).
 *
 * Refs use the PRD's own ids: S# stages (§5.2), FR-# functional requirements
 * (§6), L-# published limitations (§11), D-# decisions (§12), §# sections.
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
  refs?: string[];
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
          "Holds, transfers and retires credits — the only institution type that can (§3.4).",
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
          "Firm Admin · Project Manager · Read-only (§3.3).",
          "Submission and PMR attestation is performed by a named user and recorded as such.",
        ],
      },
      {
        heading: "Worth knowing",
        paras: [
          "Only owner-firm accounts may hold credits in the MVP, so trading is firm-to-firm; a dedicated buyer institution is post-MVP (L-6). The owner pays the engagement fee into escrow before any outcome exists, and has no choice and no veto over which auditor is assigned (FR-48, FR-51).",
        ],
      },
    ],
    refs: ["§3.1", "§3.3", "§3.4", "FR-48", "FR-51", "L-6"],
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
          "Validates project design through its Certified Auditor role (the PVR, ex-ante).",
          "Verifies performance through its Certified Creditor role (the ERVR, ex-post).",
          "Raises and closes findings; issues reports with an opinion and assurance level.",
        ],
      },
      {
        heading: "What it never does",
        bullets: [
          "Validate and verify the same project — enforced at institution level (FR-11).",
          "Approve anything. The auditor recommends; the committee decides.",
          "Hold credits.",
        ],
      },
      {
        heading: "People inside it",
        bullets: [
          "VVB Admin (no audit-content capabilities) · Team Leader · Team Member.",
          "Approver — independent technical review; must not be on the audit team for that engagement (FR-17).",
          "Certified Auditor — may lead and sign a validation engagement (PVR).",
          "Certified Creditor — may lead and sign a verification engagement (ERVR and its verified quantity).",
          "A person may hold both certifications; the institution-level separation still applies.",
        ],
      },
      {
        heading: "Worth knowing",
        paras: [
          "Accreditation is recorded as external evidence — the platform does not grant it, and expiry or out-of-scope accreditation blocks the draw (FR-10, L-2). The VVB is paid from escrow on report attestation, identically for any opinion — an adverse opinion pays the same as a positive one (FR-49).",
          "Naming hazard: in finance a “creditor” is a lender. Buyers and regulators will read “Certified Creditor” that way on first contact — expect to explain it (§3.3).",
        ],
      },
    ],
    refs: ["§3.1", "§3.3", "FR-10", "FR-11", "FR-17", "FR-49", "L-2"],
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
          "Selects the engagement VVB from the drawn shortlist, with a recorded public reason (FR-9).",
          "Decides registration (all members vote).",
          "Decides issuance — through its Creditor Committee role, a designated subset with its own quorum (FR-19).",
        ],
      },
      {
        heading: "What it never does",
        bullets: [
          "Perform any audit work.",
          "Select a VVB outside the shortlist, re-order it, or trigger a re-draw without a declared conflict.",
          "Decide where a member has declared an interest — the exclusion is recorded (FR-20).",
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
          "Operations and the Steering Committee are organs of one legal party — the program administrator. Their separation is internal control, not institutional independence, and the PRD says so publicly (L-1).",
          "The Creditor Committee is a subset, so issuance rests on fewer people than registration. Whether that is specialisation or concentration depends on how the subset is appointed and rotated; the charter must say, and it is not yet written (L-16).",
        ],
      },
    ],
    refs: ["§3.1", "§3.3", "FR-9", "FR-19", "FR-20", "L-1", "L-16"],
  },

  lg4: {
    title: "Operations",
    actorLabel: "Institution",
    tagline: "Moderation and procedural review — nothing else.",
    sections: [
      {
        heading: "What it does",
        bullets: [
          "Moderates consultation comments: soft-hide with a reason code; the comment and the redaction are both retained (FR-40).",
          "May extend a consultation window once, by no more than the original duration, with a recorded reason (FR-41).",
          "Performs the procedural compliance review of the ERVR (S10).",
        ],
      },
      {
        heading: "What it never does",
        bullets: [
          "Assign VVBs, screen intake, or admit VVBs.",
          "Decide anything — it can return the ERVR to the auditor, never reject or approve (FR-44).",
          "Touch audit content, quantities or findings.",
          "Hold credits.",
        ],
      },
      {
        heading: "People inside it",
        bullets: [
          "Moderator — comment redaction, window extension.",
          "Compliance Reviewer — completes the S10 judgment checklist.",
          "No Operations person role carries any audit, assignment or decision capability.",
        ],
      },
    ],
    refs: ["§3.1", "§3.3", "FR-40", "FR-41", "FR-44"],
  },

  lg5: {
    title: "Automatic (system) stages",
    actorLabel: "No human owner",
    tagline: "Steps with no human owner, logged as “system” so the audit trail has no gaps.",
    sections: [
      {
        heading: "Which steps are automatic",
        bullets: [
          "S2 — the completeness gate.",
          "S3 — the consultation window (opens and closes on its own).",
          "The shortlist draw inside S4 and S8 — the selection that follows is Steering's, so those stages as a whole are not automatic (FR-9).",
          "S12 — issuance (the mint).",
        ],
      },
      {
        heading: "Why the mint has no owner",
        paras: [
          "credit.mint and credit.burn are bound to the institution type REGISTRY, which a database constraint makes unassignable to any account. The mint is callable only by the issuance job, which derives its quantity from the attested ERVR and requires both the approved Steering decision and the Competent Authority confirmation for the same period; it takes no quantity parameter.",
          "The Registry is not an institution and not an actor with judgment — it is the enforced answer to “who may create supply”: nobody with a login (§3.2).",
        ],
      },
    ],
    refs: ["§3.2", "FR-6", "FR-9", "FR-22"],
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
          "Confirms or refuses it, with a reason, before any mint (S11b).",
        ],
      },
      {
        heading: "What it never does",
        bullets: [
          "Audit anything or alter a quantity.",
          "Decide registration or issuance; admit or select VVBs.",
          "Mint, or hold credits.",
          "No authority capability reads or writes audit content, findings, quantities, decisions, or balances — it sees the packet and the public record, nothing else (FR-62).",
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
          "Unlike Operations and Steering, the authority is an independent party — a state ministry. That is what makes its confirmation worth more than another internal gate, and also what makes its response time a risk the platform does not control (L-14).",
          "The confirmation is a product gate, not a legal act: no enabling law currently gives MoECC a statutory role here, no corresponding adjustment is made, and it is not Article 6 host-country authorization (L-3). The MVP interface is a login plus an exportable packet (D-11); the authority's signing key lives in its own HSM or hardware wallet, never on the platform host.",
        ],
      },
    ],
    refs: ["§3.1", "FR-58", "FR-59", "FR-62", "L-3", "L-14", "D-11"],
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
          "The Project Owner submits the PSF under a pinned methodology version → an automated completeness gate checks presence and schema → a public consultation window runs and comments are recorded → the system draws a shortlist of accredited, in-scope VVBs by seeded lottery and the Steering Committee selects one from that shortlist with a recorded, public reason, the engagement funded from the escrowed fee → that VVB (Auditor A, led by a Certified Auditor) conducts the validation audit, running the findings loop with the owner until every CAR is closed and every CL resolved, and issues the PVR recommending registration or not → the Steering Committee approves or rejects.",
        ],
      },
      {
        heading: "What approval fixes",
        bullets: [
          "The project becomes REGISTERED.",
          "The crediting period is fixed — the outer window within which any monitoring period may earn credits (FR-33).",
          "No credits are created at registration.",
        ],
      },
      {
        heading: "Money",
        paras: [
          "The validation fee — VVB portion + platform portion — is paid into escrow at submission, before any outcome exists. The platform portion is identical in every outcome branch (FR-48).",
        ],
      },
    ],
    refs: ["§5.1", "S1–S6", "FR-33", "FR-48"],
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
          "Monitoring periods must not overlap; gaps are permitted and earn nothing (FR-34).",
          "Every period must fall entirely within the crediting period (FR-35).",
          "A period may be issued at most once, ever — enforced on the period record and again on-chain (FR-36).",
        ],
      },
    ],
    refs: ["§5.1", "S7–S12", "FR-34", "FR-35", "FR-36"],
  },

  ph3: {
    title: "Phase 3 — Use the credits",
    tagline: "Hold, trade firm-to-firm, retire permanently, verify publicly.",
    sections: [
      {
        heading: "Credit unit states",
        paras: [
          "ISSUED → HELD → (TRANSFERRED → HELD)* → RETIRED. Retirement is terminal, immutable and non-transferable (§5.2).",
        ],
      },
      {
        heading: "The rules",
        bullets: [
          "Transfer moves a serial range between accounts and appends to ownership history; partial ranges may be split (FR-26).",
          "Only HELD units may be transferred; RETIRED units are locked at the database level, not just in application code (FR-27).",
          "Nothing is ever hard-deleted; states are appended, never overwritten (FR-29).",
          "A public serial lookup resolves any credit with no login (FR-31).",
        ],
      },
    ],
    refs: ["§5.2", "FR-26", "FR-27", "FR-29", "FR-31"],
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
          "The owner drafts and submits the Project Submission Form under a pinned methodology_id and methodology_version — both immutable for the lifetime of the project (FR-4). The platform consumes externally published methodologies; it does not author them.",
        ],
      },
      {
        heading: "What the PSF carries",
        bullets: [
          "Design, baseline, additionality, monitoring plan, safeguards, ownership proof.",
          "Proposed crediting period.",
          "An ex-ante estimate — reference only. It is stored as estimated_annual_reductions_reference, carries no balance, and is not readable by the issuance path (FR-38).",
        ],
      },
      {
        heading: "Exit condition",
        bullets: [
          "Required fields and attachments present; methodology version pinned.",
          "The validation fee is HELD in escrow — paid before any outcome exists (FR-48).",
        ],
      },
      {
        heading: "If it goes wrong",
        paras: [
          "A failed completeness gate returns the project to S1, editable, with a machine-generated reason list (FR-5).",
        ],
      },
    ],
    refs: ["S1", "FR-4", "FR-5", "FR-38", "FR-48"],
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
          "An automated gate checks that required fields and attachments are present and schema-valid. It passes or it fails; no human is involved, and the transition is logged with “system” as the acting principal (FR-6).",
        ],
      },
      {
        heading: "What it is not",
        paras: [
          "It is not screening, and the PRD requires the UI to label it as such: automated validation is presence checking, and calling it screening would overstate the control (§5.2 note, L-4). Nobody at the platform reviews or filters submissions here — Operations never screens intake.",
        ],
      },
      {
        heading: "If it fails",
        paras: [
          "The project returns to S1, editable, with a machine-generated reason list (FR-5). On pass, the consultation window opens automatically (FR-6).",
        ],
      },
    ],
    refs: ["S2", "FR-5", "FR-6", "L-4"],
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
          "The window opens automatically when the completeness gate passes and runs for a configured duration — 15 calendar days, matching GCC's project-level Global Stakeholder Consultation (D-4). Comments are recorded with an author identity and are visible on the public project page (FR-7).",
        ],
      },
      {
        heading: "The teeth",
        bullets: [
          "The validation audit cannot reach “ready to issue” until every consultation comment has a recorded auditor response (FR-8).",
          "At close, a Merkle root over the comment set is anchored on-chain, so no comment can be added or removed afterwards (FR-46, Annex A).",
          "Every comment is later shown on the public project page together with the VVB's response (FR-53).",
        ],
      },
      {
        heading: "Moderation, bounded",
        bullets: [
          "Operations may soft-hide a comment with a reason code — the comment and the redaction are both retained (FR-40).",
          "Operations may extend the window once, by no more than the original duration. No party may close a window early (FR-41).",
        ],
      },
      {
        heading: "Worth knowing",
        paras: [
          "Comment submission locks when the window closes. Verra accepts and obliges responses to late comments; the MVP is slightly below that bar (L-12).",
        ],
      },
    ],
    refs: ["S3", "D-4", "FR-6", "FR-7", "FR-8", "FR-40", "FR-41", "FR-53", "L-12"],
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
          "The system draws a shortlist of k VVBs (default 3, D-12) by seeded lottery from the eligible pool. The seed is committed on-chain before the draw runs, and the pool snapshot and shortlist are stored — anyone can recompute the shortlist from the commitment (FR-51). The Steering Committee then selects exactly one from that shortlist and must record a selection reason, which is public (FR-9).",
        ],
      },
      {
        heading: "The pool filter (published)",
        bullets: [
          "Accreditation active, in scope, unexpired — exclusion happens before the draw, not as a check on the result (FR-10).",
          "Methodology-family experience or newcomer pairing; capacity cap; rotation cap (D-5); no declared conflict.",
          "The draw is uniform over the filtered pool — it never ranks.",
        ],
      },
      {
        heading: "What Steering cannot do",
        bullets: [
          "Select outside the shortlist, re-order it, or trigger a re-draw — except on a conflict declared by the selected VVB, logged with reason (FR-9).",
          "The owner has no choice and no veto at any step (FR-51).",
        ],
      },
      {
        heading: "Worth knowing",
        paras: [
          "The claim that survives is “no human chose the pool or the shortlist”, not “no human chose the VVB”. A committee that consistently picks the most lenient of three regains roughly a third of the selection power the pure draw had removed. FR-56 makes that pattern public — every engagement shows seed, pool, shortlist, selection and reason, and the per-VVB statistics page shows shortlisted-vs-selected counts next to each VVB's claimed-vs-verified delta — but it does not make it impossible (L-1).",
        ],
      },
    ],
    refs: ["S4", "FR-9", "FR-10", "FR-51", "FR-56", "D-5", "D-12", "L-1"],
  },

  b4: {
    title: "Validation audit (ex-ante) — the PVR",
    stage: "S5",
    actorLabel: "Auditor A · signed by a Certified Auditor",
    tagline: "The design audit: is this project sound before anything is measured?",
    sections: [
      {
        heading: "What happens",
        paras: [
          "Auditor A (the VVB selected in S4), led by a Certified Auditor, assesses the project design: a desk assessment per PSF section, a baseline and additionality conclusion, a site visit with a named sign-off, and a response to every consultation comment. The result is the Project Verification Report — an ex-ante audit of design — with an opinion, an assurance level, and a recommendation on registration and crediting period (§4.1).",
        ],
      },
      {
        heading: "The findings loop",
        bullets: [
          "Desk sections are individually assessed Pass / CAR / CL; unassessed sections block the report (FR-12).",
          "CAR and CL block advancement; FAR carries forward. The owner responds; only the VVB may close (FR-13).",
          "Both audits record a cross-registry double-registration check (FR-54).",
        ],
      },
      {
        heading: "Report gates",
        bullets: [
          "Every section assessed · all CARs closed · all CLs resolved · site visit signed off · opinion set (FR-16).",
          "Approver sign-off — and the approver must not hold any team assignment on the engagement (FR-17).",
          "The signing lead must hold the Certified Auditor certification (FR-16).",
          "Issuing the report advances the stage; it mints nothing (FR-18).",
        ],
      },
      {
        heading: "Worth knowing",
        paras: [
          "The escrowed VVB fee releases when the issued report is attested on-chain — identically for any opinion, so an adverse opinion pays the same as a positive one (FR-49).",
          "The PVR receives no Operations compliance review — only the ERVR does. Accepted because registration mints nothing (L-9).",
        ],
      },
    ],
    refs: ["S5", "§4.1", "FR-8", "FR-12–18", "FR-49", "FR-54", "L-9"],
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
          "Steering members vote; the decision requires the configured quorum and is finalized by the Chair (FR-19). A member with a declared interest in the project is excluded, and the exclusion is recorded (FR-20). Every decision writes an append-only log entry containing outcome, rationale and the evidence gates that permitted it (FR-21).",
        ],
      },
      {
        heading: "On approval",
        bullets: [
          "The project becomes REGISTERED.",
          "The crediting period is fixed — a project without one cannot enter monitoring (FR-33).",
          "No credits are created at registration.",
        ],
      },
      {
        heading: "On rejection",
        paras: ["The project returns to S1 with notes."],
      },
    ],
    refs: ["S6", "FR-19", "FR-20", "FR-21", "FR-33"],
  },

  b5n: {
    title: "Why no credits exist yet",
    tagline: "Registration credits nothing, because nothing has been measured.",
    sections: [
      {
        paras: [
          "The ex-ante estimate in the PSF is a plausibility reference, never an entitlement — crediting it would mean issuing retirable permits against a forecast, and a retired credit cannot be recalled when the forecast proves wrong (§5.1).",
          "The estimate is stored as estimated_annual_reductions_reference, carries no balance behind it, and is not readable by the issuance path (FR-38). Exactly one document — the ERVR, written later by the second auditor — may carry a verified_quantity, and it is the only field the mint reads (FR-37).",
          "Where an issuance for a period materially exceeds the pro-rata ex-ante estimate, the verification workspace raises an automatic flag for the auditor to address in the ERVR (FR-39).",
        ],
      },
    ],
    refs: ["§5.1", "FR-37", "FR-38", "FR-39"],
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
          "For each monitoring period n, the owner operates the activity, measures against the monitoring plan, and submits the Project Monitoring Report: period boundaries, measured parameters, raw evidence, the claimed reductions and their calculation, deviations, and responses to carried-forward FARs (§4.1). PMR attestation is performed by a named user.",
        ],
      },
      {
        heading: "Exit condition",
        bullets: [
          "PMR and evidence submitted.",
          "The verification fee is HELD in escrow (FR-48).",
        ],
      },
      {
        heading: "Period rules",
        bullets: [
          "Every monitoring period must fall entirely within the crediting period (FR-35).",
          "Periods must not overlap; gaps are permitted and earn nothing (FR-34).",
          "A period may be issued at most once, ever (FR-36).",
        ],
      },
    ],
    refs: ["S7", "§4.1", "FR-34", "FR-35", "FR-36", "FR-48"],
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
          "Assignment runs exactly as in S4 — seeded draw of a shortlist, Steering selects one with a public reason — with one difference: the institution that validated the project is removed from the eligible pool before the draw, so the draw cannot produce Auditor A (S8, FR-11).",
        ],
      },
      {
        heading: "Enforced three times",
        bullets: [
          "At pool construction — the draw cannot select the validator.",
          "In the database.",
          "On-chain — SC-1's recordEngagement(verification) reverts if the VVB already holds a validation engagement on that project (Annex A §3).",
        ],
      },
      {
        heading: "Why it matters",
        paras: [
          "This is rule 1 made operational: the party that audits a project's design is never the party that audits its performance. The auditor who approved the design has an interest in the design looking right; the performance recalculation must come from someone without that stake (§1).",
        ],
      },
    ],
    refs: ["S8", "FR-9", "FR-11", "FR-51", "Annex A §3"],
  },

  b7: {
    title: "ER verification (ex-post) — the ERVR",
    stage: "S9",
    actorLabel: "Auditor B · signed by a Certified Creditor",
    tagline: "The recalculation that becomes the minted quantity.",
    sections: [
      {
        heading: "What happens",
        paras: [
          "Auditor B, led by a Certified Creditor, recalculates the reductions from evidence — never from the owner's claim. The ERVR states the verified quantity as BE − PE − LE (baseline minus project minus leakage emissions), each term given separately in tCO₂e, together with the GWP set required by the pinned methodology; where non-CO₂ gases are involved, the per-gas conversion Σ Eᵢ × GWPᵢ is shown (FR-57).",
        ],
      },
      {
        heading: "In the workspace",
        bullets: [
          "Claimed figures are displayed beside editable verified values; the delta is computed live against a ±5% materiality threshold (FR-14).",
          "The recommended quantity is derived from verified values only.",
          "An issuance materially above the pro-rata ex-ante estimate raises an automatic flag to address in the report (FR-39).",
          "Same gates as validation: sections, findings, site visit, approver, and the signing lead must hold the Certified Creditor certification (FR-16).",
        ],
      },
      {
        heading: "Why this number is special",
        bullets: [
          "verified_quantity exists on the ERVR only — the PSF, PMR and PVR have no such field, and the mint reads no other source (FR-37).",
          "The claimed-vs-verified delta posts to the public per-VVB statistics page (FR-52).",
          "Escrow releases the auditor's fee on report attestation — before any committee has seen anything, and identically for an adverse opinion (FR-49).",
        ],
      },
      {
        heading: "Honest limit",
        paras: [
          "The platform checks the arithmetic identity and the GWP-set match; it does not compute BE, PE or LE and has no methodology-as-code engine. The derivation of each term is the Certified Creditor's work under the methodology — its correctness is what the audit, not the software, vouches for (L-15).",
        ],
      },
    ],
    refs: ["S9", "FR-14", "FR-16", "FR-37", "FR-39", "FR-49", "FR-52", "FR-57", "L-15"],
  },

  b8: {
    title: "Compliance review",
    stage: "S10",
    actorLabel: "Operations",
    tagline: "Automated pre-checks a human cannot waive, then a bounded judgment checklist.",
    sections: [
      {
        heading: "Automated pre-checks first (FR-42)",
        bullets: [
          "ERVR issued by the assigned Auditor B and signed by a Certified Creditor.",
          "All readiness gates passed.",
          "Period within the crediting period, non-overlapping, not already issued.",
          "Verified quantity present and equal to BE − PE − LE as decomposed on the report (FR-57).",
          "GWP set stated and matching the pinned methodology.",
          "Materiality delta documented; carried-forward FARs addressed.",
          "A failing pre-check blocks the stage and is not overridable by any human.",
        ],
      },
      {
        heading: "Then the judgment checklist (FR-43)",
        paras: [
          "Only what a machine cannot decide: does the ERVR narrative support the quantity, are monitoring-plan deviations explained, and is anything anomalous against prior periods or the ex-ante reference?",
        ],
      },
      {
        heading: "Return, not reject",
        paras: [
          "Operations may send the ERVR back to Auditor B with notes, or pass it to Steering. It cannot approve issuance, alter a quantity, close a finding, or edit any audit artifact (FR-44). The Steering decision screen then displays the review outcome, the count of consultation comments, and how many became findings (FR-45).",
        ],
      },
    ],
    refs: ["S10", "FR-42", "FR-43", "FR-44", "FR-45"],
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
          "Issuance is voted only by Steering members holding the Creditor Committee role, with their own quorum constant, finalized by the Chair (FR-19). The decision is yes / no only: the quantity minted is the ERVR's verified quantity, and no override path exists (FR-24). A member with a declared interest is excluded, recorded (FR-20); the decision writes an append-only log entry (FR-21).",
        ],
      },
      {
        heading: "On approval",
        paras: [
          "The system generates the issuance packet and the project enters S11b — the Competent Authority's queue. Nothing is minted in this state (FR-58).",
        ],
      },
      {
        heading: "On rejection",
        paras: ["The project returns to S7 (monitoring)."],
      },
      {
        heading: "Worth knowing",
        paras: [
          "Note the name: this is the Creditor Committee — a Steering subset — not the “Certified Creditor”, which is a person role inside a VVB. Because the subset is smaller than the full committee, issuance rests on fewer people than registration; the appointment and rotation charter that would justify that is not yet written (L-16).",
        ],
      },
    ],
    refs: ["S11", "FR-19", "FR-20", "FR-21", "FR-24", "FR-58", "L-16"],
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
          "Generated the moment the issuance decision is approved: canonical JSON plus a rendered PDF bundling the project identity and methodology pin, the PSF/PVR/PMR/ERVR hashes and their anchor transactions, the verified quantity with its BE/PE/LE components and GWP set, the auditors' identities with accreditation records, the consultation summary, both decisions with votes, and the compliance-review outcome. Immutable, hash-anchored, and exportable so it can be filed with any system the ministry later adopts (§4.2, FR-58, D-11).",
        ],
      },
      {
        heading: "Exactly one outcome per packet",
        bullets: [
          "CONFIRMED — signed with the authority's own key and attested on-chain. The key lives in the ministry's HSM or hardware wallet, never on the platform host (FR-59, §14).",
          "REFUSED — with a reason, anchored on-chain. The record is append-only.",
          "No auto-confirm on elapsed time, and no auto-refuse: silence is neither (FR-60).",
        ],
      },
      {
        heading: "On refusal",
        paras: [
          "The project returns to S11 with the reason visible to Steering and the owner. Steering may withdraw its decision (project returns to S7 with notes) or resubmit the packet once with additional information; a second refusal ends the period's issuance path (FR-60).",
        ],
      },
      {
        heading: "Visible, not enforceable",
        paras: [
          "The authority's queue publicly shows every pending packet and the days elapsed since its generation (FR-61; the overdue target is open decision D-13). The delay is visible; the platform has no lever over a ministry.",
        ],
      },
      {
        heading: "Honest limits",
        paras: [
          "This is a product gate, not a legal act: no enabling law or decree currently gives MoECC a statutory role in confirming project-level credits, no corresponding adjustment is made, and the confirmation is not Article 6 host-country authorization — the public label must say so (L-3, FR-32).",
          "Every issuance now waits on a state ministry — stricter than any comparable program, and it makes issuance throughput a property of MoECC's process, not of the software (L-14).",
        ],
      },
    ],
    refs: ["S11b", "§4.2", "FR-58–62", "L-3", "L-14", "D-11", "D-13"],
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
          "An issued ERVR.",
          "An approved issuance decision.",
          "A CONFIRMED authorization record.",
          "Each attested on-chain; the token contract mints only when the committee-threshold attestation and the authority attestation both exist — never on the platform's relayer alone, and never on either one alone (FR-22, FR-47).",
        ],
      },
      {
        heading: "What the mint does",
        bullets: [
          "Quantity minted equals the verified quantity in the ERVR — the issuance job takes no quantity parameter, and no override path exists (FR-24, §3.2).",
          "Serial ranges are globally unique, non-reusable, and carry project id and vintage = monitoring period n (FR-23).",
          "A monitoring period may produce at most one issuance, ever — enforced on the period record and again on-chain (FR-25, FR-36).",
          "For activity classes flagged with reversal risk, a published flat percentage of the issuance is allocated at mint to the buffer system account; the remainder goes to the owner. The split happens at allocation — the mint itself still equals the ERVR quantity exactly (FR-55).",
        ],
      },
      {
        heading: "Afterwards",
        paras: ["The project returns to S7 for period n+1."],
      },
      {
        heading: "Worth knowing",
        paras: [
          "The buffer only accumulates in the MVP — there is no clawback or cancellation logic yet, so reversal cover is accounting, not yet insurance (L-5, D-10).",
        ],
      },
    ],
    refs: ["S12", "§3.2", "FR-22–25", "FR-36", "FR-47", "FR-55", "L-5", "D-10"],
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
          "Minted credits are credited to the owner firm's account as HELD units. Every institution has an account, but in the MVP only Project Owning Firm accounts may hold, transfer or retire; VVB, Steering, Operations and Competent Authority accounts are permanently zero-balance (§3.4).",
        ],
      },
      {
        heading: "One balance, never two",
        paras: [
          "Once a unit is minted, the chain is authoritative for it and the database holding record becomes a mirror. One authoritative balance — the double-spend path the product exists to prevent appears the moment credits exist in both places (Annex A §12).",
        ],
      },
    ],
    refs: ["§3.4", "FR-26", "Annex A §12"],
  },

  b12: {
    title: "Carbon Market",
    actorLabel: "Account holders",
    tagline: "Deliberately venue-neutral — the trading venue is an open decision.",
    sections: [
      {
        heading: "What works today",
        paras: [
          "MVP trading is firm-to-firm transfer: a transfer moves a serial range between accounts and appends to ownership history; partial ranges may be split (FR-26). Only HELD units may be transferred (FR-27). Real payment processing is out of scope — escrow mechanics run on test-mode money.",
        ],
      },
      {
        heading: "The open decision (D-2)",
        bullets: [
          "Option A — internal marketplace: an escrow order-book contract; credits and stablecoin swap atomically. Deliberately not an AMM: pooling means treating unlike tonnes as interchangeable, which is the quality laundering the product exists to prevent (Annex A §7).",
          "Option B — external venue: an export boundary with a TRANSFERRED_OUT lock so a unit cannot be double-spent across the seam.",
        ],
      },
      {
        heading: "Worth knowing",
        paras: [
          "Only Project Owning Firms may hold credits, so a dedicated buyer institution is post-MVP (L-6). Eligibility labels on listings render as “Not assessed” — never omitted, never implied (FR-32).",
        ],
      },
    ],
    refs: ["D-2", "§3.4", "FR-26", "FR-27", "FR-32", "L-6", "Annex A §7"],
  },

  b13: {
    title: "Retired — permanent",
    actorLabel: "Holding account",
    tagline: "The only way a credit is ever used up. There is no way back.",
    sections: [
      {
        heading: "What happens",
        paras: [
          "Retirement records the beneficiary (a free-text name, so retiring on behalf of a third party is meaningful), the reason and the timestamp, and generates a certificate with a verifiable id (FR-28).",
        ],
      },
      {
        heading: "Why it is irreversible",
        bullets: [
          "RETIRED units are immutable and non-transferable — enforced at the database level, not only in application code (FR-27).",
          "Nothing is ever hard-deleted; states are appended, never overwritten (FR-29).",
          "On-chain, retire() burns the tokens and mints the soulbound certificate in the same transaction — a certificate exists if and only if a burn occurred (Annex A §5–6).",
          "The token contract is not upgradeable: no admin mint, no rescue function, no pause on retirement, no path back (Annex A §5).",
        ],
      },
    ],
    refs: ["FR-27", "FR-28", "FR-29", "Annex A §5–6"],
  },

  b14: {
    title: "Public lookup — no login",
    actorLabel: "Anyone",
    tagline: "The whole pipeline is checkable from outside.",
    sections: [
      {
        heading: "What anyone can see",
        bullets: [
          "Serial lookup: any serial resolves to its project, vintage, current state and, if retired, its retirement record (FR-31).",
          "The public project page: pinned methodology, stage, every consultation comment with the auditor's response, issued reports, issuance history (FR-30, FR-53).",
          "Per-VVB statistics: engagements, opinions issued, average claimed-vs-verified delta, and shortlisted-vs-selected counts — a computed view, never cached (FR-52, FR-56).",
          "Every engagement's seed commitment, pool snapshot, shortlist, selection and public reason — the shortlist is recomputable by anyone (FR-51, FR-56).",
          "The authority's queue: every pending issuance packet and the days it has waited (FR-61).",
        ],
      },
      {
        heading: "Honest labels",
        paras: [
          "Eligibility labels (CORSIA, Article 6) render as “Not assessed” with an explanatory note — not omitted, not implied. The MoECC confirmation is shown as its own label, with date and anchor transaction, and must never be rendered as, or adjacent to, Article 6 authorization or CORSIA eligibility (FR-32, L-3).",
        ],
      },
    ],
    refs: ["FR-30", "FR-31", "FR-32", "FR-51", "FR-52", "FR-53", "FR-56", "FR-61"],
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
          "The auditor recommends, the committee decides, the authority confirms, the system mints. No institution performs another's step, and no credit exists without an independent audit, a recorded decision and a state confirmation (§1).",
          "Positioning, in one sentence: Isometric asks the market to trust one company's integrity; 2C2MRV makes the separation of roles independently checkable.",
        ],
      },
    ],
    refs: ["§1"],
  },

  tr1: {
    title: "Rule 1 — Design auditor ≠ performance auditor",
    tagline: "Separation of duties at institution level, enforced three ways.",
    sections: [
      {
        heading: "The rule",
        paras: [
          "The party that audits a project's design is never the party that audits its performance — Certified Auditor versus Certified Creditor, at institution level (§1). A person may hold both certifications; the institution that validated a project still never verifies it.",
        ],
      },
      {
        heading: "How it is enforced",
        bullets: [
          "At pool construction: the verification draw cannot produce the validator (FR-11).",
          "In the database.",
          "On-chain: SC-1's recordEngagement(verification) reverts for the project's validator (Annex A §3).",
        ],
      },
      {
        heading: "And inside each audit",
        paras: [
          "The approver who signs off a report must not hold any team assignment on that engagement (FR-17), and the signing lead must hold the certification the phase requires — Certified Auditor for a PVR, Certified Creditor for an ERVR (FR-16).",
        ],
      },
    ],
    refs: ["§1", "FR-11", "FR-16", "FR-17", "Annex A §3"],
  },

  tr2: {
    title: "Rule 2 — The quantity is a checked recalculation",
    tagline: "“Issuance based on certified equations”, implemented as a hard identity check.",
    sections: [
      {
        heading: "The rule",
        paras: [
          "The issued quantity is the Certified Creditor's recalculation, decomposed into the methodology's own terms — verified_quantity = BE − PE − LE, each term in tCO₂e, under the GWP set the pinned methodology requires (e.g. AR5 or AR6, 100-year); where non-CO₂ gases are involved, the per-gas conversion Σ Eᵢ × GWPᵢ is shown (FR-57).",
        ],
      },
      {
        heading: "The check",
        paras: [
          "The platform verifies the identity and the GWP-set match as a hard pre-check and rejects an ERVR that fails it — before Operations or any committee sees it (FR-42, FR-57). The verified quantity exists on the ERVR only, and the mint reads no other source (FR-37).",
        ],
      },
      {
        heading: "Honest limit",
        paras: [
          "The platform does not compute BE, PE or LE and has no methodology-as-code engine. It confirms the stated terms sum and the GWP set matches; it cannot detect a wrong emission factor or an inflated baseline — that remains the Certified Creditor's work, and presenting this check as automated quantification would overstate the control (L-15).",
        ],
      },
    ],
    refs: ["FR-37", "FR-42", "FR-57", "L-15"],
  },

  tr3: {
    title: "Rule 3 — No person mints; everything is published",
    tagline: "Tamper-evident by construction — and honest about what that does not mean.",
    sections: [
      {
        heading: "No person can mint or un-retire",
        paras: [
          "credit.mint and credit.burn bind to the unassignable REGISTRY type — a database constraint keeps it off every account, so nobody with a login can create supply (§3.2). On-chain, minting requires the Creditor Committee's threshold signatures and the Competent Authority's key — never the platform's relayer alone (FR-47). Retirement is terminal: no admin mint, no rescue function, no path back (Annex A §5).",
        ],
      },
      {
        heading: "Everything is published",
        paras: [
          "From the first milestone, every PSF, PMR, report, decision, compliance outcome and consultation-close Merkle root is hashed and anchored to a public ledger, with the transaction hash displayed on the artifact; publishing runs through an outbox so the product functions when the chain does not (FR-46). From M4, credits are chain-authoritative once minted (FR-47).",
        ],
      },
      {
        heading: "Honest claims only",
        paras: [
          "Two claims are true and used: publicly verifiable and tamper-evident. Three are false under a relayer and a permissioned committee, and are not used: immutable, trustless, decentralised (Annex A §0).",
          "The chain cannot verify a tonne, make a captured auditor honest, or make an inflated baseline true. Over-crediting is prevented off-chain — separation of duties, blocking findings, the ±5% materiality threshold, the independent approver. The contracts prevent a narrower and still valuable set: double issuance of a period, forged retirement, silent revision of a decision, and undetectable tampering with a report (Annex A §10).",
        ],
      },
    ],
    refs: ["§3.2", "FR-46", "FR-47", "Annex A §0", "Annex A §10"],
  },

  docs: {
    title: "The four documents",
    tagline: "Claim, audit, claim, audit — every phase follows the same beats.",
    sections: [
      {
        heading: "The pattern",
        paras: [
          "Each phase follows the same three beats — claim (owner) → audit (VVB) → decision (Steering). Every artifact belongs to exactly one beat (§4.1).",
        ],
      },
      {
        heading: "The set",
        bullets: [
          "PSF — Project Submission Form. The owner's claim of design: baseline, additionality, monitoring plan, safeguards, ownership proof, proposed crediting period, ex-ante estimate (reference only). One per project, versioned.",
          "PVR — Project Verification Report. Auditor A's ex-ante audit of design, signed by a Certified Auditor. One per project.",
          "PMR — Project Monitoring Report. The owner's claim of results for one period: measured parameters, evidence, claimed reductions, deviations. One per monitoring period.",
          "ERVR — Emission Reduction Verification Report. Auditor B's ex-post audit of performance, signed by a Certified Creditor: recalculated BE, PE, LE, the GWP set, and the verified quantity. One per monitoring period.",
        ],
      },
      {
        heading: "Why the ERVR is special",
        paras: [
          "Two of the four documents are written by the party whose revenue scales with the number in them. Exactly one — the ERVR — may carry a verified_quantity, and it is the only field the mint reads (FR-37).",
        ],
      },
      {
        heading: "Naming",
        paras: [
          "Both audit reports abbreviate colloquially to “the verification report” and will be conflated: the PVR audits design ex-ante, the ERVR audits performance ex-post. “Verification report” never appears unqualified, and “MRV” is part of the platform name, never a document name (§4.1, D-8).",
        ],
      },
    ],
    refs: ["§4.1", "FR-37", "D-8"],
  },
};
