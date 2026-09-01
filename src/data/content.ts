/**
 * Modal content for every clickable element of the business-flow diagram.
 *
 * Source material: the 2C2MRV MVP PRD v0.6 (references/2C2MRV-MVP-PRD.md)
 * and Annex A. The prose stands alone, cites nothing, and follows the
 * stop-slop skill (.claude/skills/stop-slop): active voice, named actors,
 * no em dashes, no adverb padding. The S-numbers are the platform's own
 * stage ids, printed as badges on the diagram.
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
  /* Legend: the five institutions + the automatic stages               */
  /* ------------------------------------------------------------------ */

  lg1: {
    title: "Project Owning Firm",
    actorLabel: "Institution",
    tagline: "This firm claims the reductions, then holds the credits.",
    sections: [
      {
        heading: "The job",
        bullets: [
          "Drafts and submits the PSF, then runs the activity it describes.",
          "Files a monitoring report (PMR) for each period and answers audit findings.",
          "Holds, transfers and retires credits. No other institution type can.",
        ],
      },
      {
        heading: "Off limits",
        bullets: [
          "Assessing its own submission.",
          "Setting its own verified quantity. The second auditor recalculates that number from evidence.",
        ],
      },
      {
        heading: "The people",
        bullets: [
          "Firm Admin, Project Manager, and a read-only seat.",
          "A named user signs each submission, and the record keeps the name.",
        ],
      },
      {
        heading: "Notes",
        paras: [
          "Owner accounts alone may hold credits for now, so firms trade with firms; a dedicated buyer role comes later. The owner pays the engagement fee into escrow before any outcome exists and gets no say in which auditor the draw produces.",
        ],
      },
    ],
  },

  lg2: {
    title: "Auditor (VVB)",
    actorLabel: "Institution",
    tagline: "Audits and recommends. The committee decides.",
    sections: [
      {
        heading: "The job",
        bullets: [
          "Validates project design through its Certified Auditor role: the PVR, written before anything runs.",
          "Verifies performance through its Certified Creditor role: the ERVR, written after measurement.",
          "Raises findings, closes them, and issues reports that carry an opinion and an assurance level.",
        ],
      },
      {
        heading: "Off limits",
        bullets: [
          "Auditing both design and performance on one project. The platform blocks this at institution level.",
          "Approving anything. The committee holds that power.",
          "Holding credits.",
        ],
      },
      {
        heading: "The people",
        bullets: [
          "VVB Admin (no reach into audit content), Team Leader, Team Member.",
          "Approver: reviews and signs a report they did no team work on.",
          "Certified Auditor: may lead and sign a PVR.",
          "Certified Creditor: may lead and sign an ERVR and its verified quantity.",
          "One person may hold both certifications. The institution-level split still applies.",
        ],
      },
      {
        heading: "Notes",
        paras: [
          "An outside body grants accreditation; the platform records it as evidence, and an expired or out-of-scope record blocks the draw. The escrow pays the auditor when the report publishes, the same for any opinion, so a friendly conclusion earns nothing extra.",
          "One naming trap: finance readers see “creditor” and think lender. Expect to explain the term on first contact.",
        ],
      },
    ],
  },

  lg3: {
    title: "Steering Committee",
    actorLabel: "Institution",
    tagline: "The body that decides and audits nothing.",
    sections: [
      {
        heading: "The job",
        bullets: [
          "Admits VVBs to the platform.",
          "Picks the engagement auditor from the drawn shortlist and records a public reason.",
          "Votes on registration (all members).",
          "Votes on issuance (Creditor Committee members alone, under their own quorum).",
        ],
      },
      {
        heading: "Off limits",
        bullets: [
          "Audit work of any kind.",
          "Picking outside the shortlist, re-ordering it, or forcing a re-draw. One exception: the selected VVB declares a conflict, and the log records the re-draw.",
          "Voting with a declared interest. The platform excludes the member and records the exclusion.",
        ],
      },
      {
        heading: "The people",
        bullets: [
          "Member: votes on registration.",
          "Creditor Committee member: votes on issuance.",
          "Chair: finalizes a decision once quorum is met.",
        ],
      },
      {
        heading: "Limits",
        paras: [
          "Operations and Steering belong to one legal party, the program administrator. Their separation is internal control, and the platform publishes that limit instead of claiming independence.",
          "The Creditor Committee is a subset, so fewer people decide issuance than registration. A charter for appointing and rotating that subset does not exist yet.",
        ],
      },
    ],
  },

  lg4: {
    title: "Operations",
    actorLabel: "Institution",
    tagline: "Moderation and paperwork review, nothing more.",
    sections: [
      {
        heading: "The job",
        bullets: [
          "Moderates public comments: a soft hide with a reason code. The record keeps both the comment and the redaction.",
          "May extend a comment window once, by at most its original length, with a recorded reason.",
          "Runs the procedural compliance review of the ERVR.",
        ],
      },
      {
        heading: "Off limits",
        bullets: [
          "Assigning, screening or admitting VVBs.",
          "Deciding anything. It can return an ERVR for correction; approval and rejection sit with the committee.",
          "Touching audit content, quantities or findings.",
          "Holding credits.",
        ],
      },
      {
        heading: "The people",
        bullets: [
          "Moderator: comment redaction, window extension.",
          "Compliance Reviewer: completes the review's judgment checklist.",
          "No Operations role carries audit, assignment or decision power.",
        ],
      },
    ],
  },

  lg5: {
    title: "Automatic stages",
    actorLabel: "No human owner",
    tagline: "Steps no person owns, logged as “system”.",
    sections: [
      {
        heading: "The automatic steps",
        bullets: [
          "S2, the completeness check.",
          "S3, the comment window. It opens and closes on its own clock.",
          "The shortlist draw inside S4 and S8. The pick that follows belongs to Steering, so those stages as a whole keep a human owner.",
          "S12, the mint.",
        ],
      },
      {
        heading: "The mint has no owner",
        paras: [
          "Mint and burn permissions bind to a reserved “Registry” type that a database rule keeps off all accounts. An automated job performs the mint, reads its quantity from the published ERVR, and runs once the committee decision and the ministry confirmation both exist for the period. The job accepts no quantity argument.",
          "The Registry holds no judgment and no seat. It exists so that creating supply belongs to no login.",
        ],
      },
    ],
  },

  lg6: {
    title: "Competent Authority (MoECC)",
    actorLabel: "Institution: a state ministry",
    tagline: "A ministry confirms or refuses each issuance before the mint.",
    sections: [
      {
        heading: "The job",
        bullets: [
          "Receives the issuance packet once the committee approves.",
          "Confirms or refuses it, with a reason, before any mint.",
        ],
      },
      {
        heading: "Off limits",
        bullets: [
          "Auditing, or touching a quantity.",
          "Deciding registration or issuance; admitting or selecting VVBs.",
          "Minting, or holding credits.",
          "Reading or writing audit content, findings, decisions or balances. The ministry sees the packet and the public record.",
        ],
      },
      {
        heading: "The people",
        bullets: [
          "Authorizing Officer: records the outcome and signs a confirmation with the ministry's own key.",
          "A read-only seat.",
        ],
      },
      {
        heading: "Limits",
        paras: [
          "The ministry stands outside the platform, unlike Operations and Steering. Its signature carries weight for that reason, and its response time sits outside the platform's control for the same reason.",
          "The confirmation is a product gate. Qatar has no law that assigns the ministry this role, the record adjusts no international registry, and it is not Article 6 host-country authorization. The ministry gets a login and an exportable packet; its signing key stays in its own hardware, off the platform host.",
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* Phase headers                                                       */
  /* ------------------------------------------------------------------ */

  ph1: {
    title: "Phase 1: register the project",
    stage: "S1–S6",
    tagline: "The path from a submitted plan to a registered project. Zero credits at the end.",
    sections: [
      {
        heading: "The path",
        paras: [
          "The owner submits the PSF under a pinned methodology version → the completeness gate checks presence and schema → the public comments for a fixed window → the system draws a shortlist of accredited, in-scope VVBs at random and Steering picks one with a recorded public reason, funded from the escrowed fee → Auditor A, led by a Certified Auditor, audits the design, works the findings loop with the owner until each CAR closes and each CL resolves, and issues the PVR with a recommendation → Steering approves or rejects.",
        ],
      },
      {
        heading: "Approval fixes two things",
        bullets: [
          "The platform marks the project REGISTERED.",
          "The crediting period locks: the outer window in which any monitoring period may earn.",
          "Credits created at registration: zero.",
        ],
      },
      {
        heading: "Money",
        paras: [
          "The owner pays the validation fee, auditor portion plus platform portion, into escrow at submission, before any outcome exists. The platform's cut stays the same in each outcome branch.",
        ],
      },
    ],
  },

  ph2: {
    title: "Phase 2: earn credits",
    stage: "S7–S12",
    tagline: "One loop per monitoring period, from measurement to mint.",
    sections: [
      {
        heading: "The loop",
        paras: [
          "The owner files the PMR with the claimed reductions for period n → the system draws a shortlist without Auditor A and Steering picks a second, different auditor (B ≠ A) → Auditor B's Certified Creditor recalculates the reductions from evidence and issues the ERVR carrying the verified quantity, broken into BE, PE and LE → Operations runs its procedural review → the Creditor Committee votes yes or no → on a yes the system builds the issuance packet and the ministry confirms or refuses it → on a confirmation the Registry mints serialized credits for period n in the quantity the ERVR verified. The project then returns to monitoring for period n+1.",
        ],
      },
      {
        heading: "Period rules",
        bullets: [
          "Monitoring periods never overlap. Gaps earn nothing.",
          "Each period sits whole inside the crediting period.",
          "Each period mints at most once, ever. The period record enforces this, and the chain enforces it again.",
        ],
      },
    ],
  },

  ph3: {
    title: "Phase 3: use the credits",
    tagline: "Credits change hands, retire, and stay checkable by anyone.",
    sections: [
      {
        heading: "Unit states",
        paras: [
          "ISSUED → HELD → (TRANSFERRED → HELD)* → RETIRED. A retired unit stays retired; no path leads back.",
        ],
      },
      {
        heading: "The rules",
        bullets: [
          "A transfer moves a serial range between accounts and appends to the ownership history. Ranges split as needed.",
          "HELD units alone may move. The database locks RETIRED units; application code gets no vote.",
          "The ledger appends states and deletes nothing.",
          "You can resolve any serial in the public lookup without an account.",
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* Phase 1 stages                                                      */
  /* ------------------------------------------------------------------ */

  b1: {
    title: "The owner submits the plan (PSF)",
    stage: "S1",
    actorLabel: "Project Owning Firm",
    tagline: "A plan under a methodology pinned for life.",
    sections: [
      {
        paras: [
          "The owner drafts and submits the Project Submission Form under a pinned methodology and version, both frozen for the project's lifetime. The current version of the platform uses methodologies published elsewhere and writes none of its own, for example, gcc, vcs or verra.",
        ],
      },
      {
        heading: "Inside the PSF",
        bullets: [
          "Design, baseline, additionality case, monitoring plan, safeguards, proof of ownership.",
          "A proposed crediting period.",
          "An ex-ante estimate. A reference figure: no balance behind it, and the issuance machinery cannot read the field.",
        ],
      },
      {
        heading: "Exit",
        bullets: [
          "Required fields and attachments in place; methodology version pinned.",
          "Validation fee sitting in escrow, paid before any outcome exists.",
        ],
      },
      {
        heading: "On failure",
        paras: [
          "A failed completeness check sends the plan back here, editable, with a machine-written reason list.",
        ],
      },
    ],
  },

  b1a: {
    title: "Completeness check",
    stage: "S2",
    actorLabel: "Automatic (system)",
    tagline: "The gate checks presence and schema. It judges nothing.",
    sections: [
      {
        paras: [
          "An automated gate checks that required fields and attachments exist and parse. Pass or fail, no person involved; the log books the transition under “system”.",
        ],
      },
      {
        heading: "No screening happens here",
        paras: [
          "The gate does no screening, and the platform labels it that way on purpose, because calling a presence check “screening” would overstate the control. Nobody at the platform filters submissions at this step, and Operations screens no intake.",
        ],
      },
      {
        heading: "On failure",
        paras: [
          "The plan returns to the owner, editable, with a machine-written reason list. On a pass, the comment window opens on its own.",
        ],
      },
    ],
  },

  b2: {
    title: "The public comment window",
    stage: "S3",
    actorLabel: "Automatic · Operations moderates",
    tagline: "Fifteen days for anyone to comment on the record.",
    sections: [
      {
        paras: [
          "The window opens when the completeness check passes and runs 15 calendar days, the same span as the GCC program this platform draws on. The system records each comment under its author's name and shows it on the public project page.",
        ],
      },
      {
        heading: "Teeth",
        bullets: [
          "Auditor A cannot close the design audit while any comment lacks a recorded response.",
          "At close, the system anchors a fingerprint of the full comment set to the public ledger, freezing the set.",
          "The public project page later pairs each comment with the auditor's answer.",
        ],
      },
      {
        heading: "Moderation limits",
        bullets: [
          "Operations may soft-hide a comment with a reason code; the record keeps both the comment and the redaction.",
          "Operations may extend the window once, by at most its original length. No role can close a window early.",
        ],
      },
      {
        heading: "Limits",
        paras: [
          "Comment submission locks at close. Some older registries accept and answer late comments; this platform sits under that bar for now.",
        ],
      },
    ],
  },

  b3: {
    title: "A random draw, then a public pick",
    stage: "S4",
    actorLabel: "Automatic draw → Steering selects",
    tagline: "Chance builds the shortlist. The committee picks in the open.",
    sections: [
      {
        paras: [
          "The system draws a shortlist of k or all VVBs (default three) at random from the eligible pool, commits the random seed on-chain before the draw, and stores the pool snapshot with the result. You can recompute the shortlist from the seed and confirm the draw ran straight. Steering then picks one name from the list and records a public reason.",
        ],
      },
      {
        heading: "The pool filter, published",
        bullets: [
          "Accreditation active, in scope and unexpired. The filter runs before the draw.",
          "Experience with the methodology family, or a newcomer pairing; a capacity cap; a rotation cap; no declared conflict.",
          "The draw ranks nothing and weights nothing. Each filtered candidate carries equal odds.",
        ],
      },
      {
        heading: "Bounds on Steering",
        bullets: [
          "The pick must come from the list. No re-ordering, no re-draws, with one exception: the selected VVB declares a conflict, and the log records the re-draw.",
          "The owner gets no choice and no veto at any step.",
        ],
      },
      {
        heading: "Limits",
        paras: [
          "The claim that survives scrutiny: no person built the pool or the shortlist. A person still picks from three, and a committee that keeps choosing the softest option wins back about a third of the power the draw removed. Each engagement's seed, pool, shortlist, pick and reason sit on the public record, and the per-VVB statistics page sets shortlisted-vs-picked counts beside each firm's claimed-vs-verified gap. The platform exposes the pattern; it cannot forbid the choice.",
        ],
      },
    ],
  },

  b4: {
    title: "The design audit (PVR)",
    stage: "S5",
    actorLabel: "Auditor A · signed by a Certified Auditor",
    tagline: "Auditor A tests the design before anything runs.",
    sections: [
      {
        paras: [
          "Auditor A, under a Certified Auditor lead, works through the design: a desk assessment of each PSF section, a conclusion on baseline and additionality, a site visit signed by a named person, and an answer to each public comment. The output is the Project Verification Report, with an opinion, an assurance level, and a recommendation on registration and crediting period.",
        ],
      },
      {
        heading: "The findings loop",
        bullets: [
          "The auditor grades each desk section Pass, CAR or CL. An ungraded section blocks the report.",
          "CARs and CLs block until closed; FARs roll forward to the next audit. The owner responds, and the auditor alone closes.",
          "The audit also logs a check against other registries for a duplicate registration.",
        ],
      },
      {
        heading: "Report gates",
        bullets: [
          "All sections graded, all CARs closed, all CLs resolved, the site visit signed, an opinion set.",
          "An approver signs off, and that approver did no team work on the engagement.",
          "The signing lead holds the Certified Auditor certification.",
          "Issuing the report moves the project forward and mints nothing.",
        ],
      },
      {
        heading: "Notes",
        paras: [
          "The escrow pays the auditor once the report publishes, whatever the opinion. An adverse finding earns the same fee as a clean one.",
          "The PVR skips the Operations compliance review; the ERVR alone gets one. The design accepts this because registration mints nothing.",
        ],
      },
    ],
  },

  b5: {
    title: "The registration decision",
    stage: "S6",
    actorLabel: "Steering Committee",
    tagline: "Approval registers the project and fixes its crediting window.",
    sections: [
      {
        paras: [
          "Steering members vote, quorum applies, and the Chair finalizes. A member with a declared interest sits out, and the record shows the exclusion. Each decision lands in an append-only log with outcome, rationale and the gates that allowed it.",
        ],
      },
      {
        heading: "On approval",
        bullets: [
          "The platform marks the project REGISTERED.",
          "The crediting period locks. A project without one cannot enter monitoring.",
          "Credits created: zero.",
        ],
      },
      {
        heading: "On rejection",
        paras: ["The plan goes back to the owner with notes."],
      },
    ],
  },

  b5n: {
    title: "Zero credits at registration",
    tagline: "Nothing measured yet, so nothing credited.",
    sections: [
      {
        paras: [
          "The ex-ante estimate in the PSF is a plausibility reference. Crediting it would mean issuing retirable permits against a forecast, and no one can recall a retired credit when the forecast breaks.",
          "The estimate carries no balance, and the issuance machinery cannot read the field. One document, the ERVR, may carry a verified quantity, and the mint reads that number and no other.",
          "An issuance far past the pro-rata estimate trips an automatic flag, and the auditor addresses the gap in the ERVR.",
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* Phase 2 stages                                                      */
  /* ------------------------------------------------------------------ */

  b6: {
    title: "Monitoring and the PMR",
    stage: "S7",
    actorLabel: "Project Owning Firm",
    tagline: "The owner operates, measures, and files the claim for period n.",
    sections: [
      {
        paras: [
          "For each monitoring period the owner runs the activity, measures against the monitoring plan, and files the Project Monitoring Report: period boundaries, measured parameters, raw evidence, the claimed reductions with their calculation, deviations, and answers to rolled-forward FARs. A named user signs the filing.",
        ],
      },
      {
        heading: "Exit",
        bullets: [
          "PMR and evidence filed.",
          "Verification fee sitting in escrow.",
        ],
      },
      {
        heading: "Period rules",
        bullets: [
          "Each period sits whole inside the crediting period.",
          "Periods never overlap. Gaps earn nothing.",
          "Each period mints at most once, ever.",
        ],
      },
    ],
  },

  b6a: {
    title: "The second draw excludes Auditor A",
    stage: "S8",
    actorLabel: "Automatic draw → Steering selects",
    tagline: "The pool drops the validator before the draw runs.",
    sections: [
      {
        paras: [
          "Assignment repeats the earlier pattern, a random shortlist and a public pick, with one change: the platform removes the validating institution from the pool before the draw. A draw over that pool cannot produce Auditor A.",
        ],
      },
      {
        heading: "Enforcement",
        bullets: [
          "At pool construction: the draw cannot select the validator.",
          "In the database.",
          "On-chain: the registry contract rejects a verification engagement for the firm that validated the project.",
        ],
      },
      {
        heading: "The point",
        paras: [
          "Rule 1 runs through this box. The firm that approved the design holds a stake in the design looking right, so the recalculation has to come from a firm without that stake.",
        ],
      },
    ],
  },

  b7: {
    title: "The performance audit (ERVR)",
    stage: "S9",
    actorLabel: "Auditor B · signed by a Certified Creditor",
    tagline: "Auditor B recalculates the number the mint will copy.",
    sections: [
      {
        paras: [
          "Auditor B, under a Certified Creditor lead, rebuilds the reductions from evidence rather than from the owner's claim. The framework's three equations give the work its shape.",
        ],
      },
      {
        heading: "The recalculation, equation by equation",
        bullets: [
          "Convert: CO₂e = Σ (Eᵢ × GWPᵢ). Auditor B takes each measured gas from the monitoring evidence, applies the Global Warming Potential the pinned methodology names, and lands each stream in tonnes of CO₂-equivalent. The ERVR shows a per-gas line wherever a gas other than CO₂ appears, and the platform checks the GWP set matches.",
          "Rebuild: ER = BE − PE − LE. Auditor B derives each term from evidence under the methodology: the baseline BE (the emissions of a world without the project), the project's own emissions PE, and leakage LE (emissions the project pushed elsewhere). The difference is the verified quantity, and this derivation carries the audit's judgment.",
          "Scope: A = Σ Ay. One ERVR covers one monitoring period, so Auditor B contributes one term of the accumulation. The project's total grows period by period, one mint each, and no period counts twice.",
        ],
      },
      {
        heading: "In the workspace",
        bullets: [
          "Claimed figures sit beside editable verified values, and the workspace computes the gap live against a ±5% materiality threshold.",
          "Verified values alone feed the recommended quantity.",
          "An issuance far above the pro-rata estimate trips a flag the report must address.",
          "The validation gates repeat here: sections, findings, site visit, approver, and a Certified Creditor as signing lead.",
        ],
      },
      {
        heading: "The number",
        bullets: [
          "The verified quantity lives on the ERVR alone. The PSF, PMR and PVR carry no such field, and the mint reads no other source.",
          "The claimed-vs-verified gap posts to the public per-VVB statistics page.",
          "The escrow pays Auditor B when the report publishes, before any committee reads it, adverse opinion or not.",
        ],
      },
      {
        heading: "Limits",
        paras: [
          "The platform checks the arithmetic and the GWP match. It computes no BE, PE or LE and runs no methodology engine; the Certified Creditor derives each term. The audit vouches for the derivation, and the software vouches for the arithmetic.",
        ],
      },
    ],
  },

  b8: {
    title: "The compliance review",
    stage: "S10",
    actorLabel: "Operations",
    tagline: "Machine checks first, bounded judgment second.",
    sections: [
      {
        heading: "The machine checks",
        bullets: [
          "The assigned Auditor B issued the ERVR, and a Certified Creditor signed it.",
          "All report gates passed.",
          "The period sits inside the crediting window, overlaps nothing, and has no prior issuance.",
          "The verified quantity exists and equals BE − PE − LE as decomposed on the report.",
          "The stated GWP set matches the pinned methodology.",
          "The materiality gap has documentation, and rolled-forward FARs have answers.",
          "A failed check blocks the stage, and no person can wave it through.",
        ],
      },
      {
        heading: "The judgment checklist",
        paras: [
          "Operations then answers the questions no machine can: does the ERVR narrative support the quantity, do the deviation explanations hold, and does anything look off against prior periods or the ex-ante reference.",
        ],
      },
      {
        heading: "The return path",
        paras: [
          "Operations sends the ERVR back to Auditor B with notes, or passes it to Steering. It approves nothing, alters no quantity, closes no finding, edits no artifact. The Steering screen then shows the review outcome, the comment count, and how many comments became findings.",
        ],
      },
    ],
  },

  b9: {
    title: "The issuance decision",
    stage: "S11",
    actorLabel: "Steering · Creditor Committee members only",
    tagline: "A yes or no. The quantity stays off the table.",
    sections: [
      {
        paras: [
          "Creditor Committee members alone vote, under their own quorum, and the Chair finalizes. The vote is binary: the mint takes the ERVR's verified quantity, and no override path exists. A member with a declared interest sits out, on the record. The decision lands in the append-only log.",
        ],
      },
      {
        heading: "On approval",
        paras: [
          "The system builds the issuance packet and queues it for the Competent Authority. The mint stays idle at this point.",
        ],
      },
      {
        heading: "On rejection",
        paras: ["The project drops back to monitoring."],
      },
      {
        heading: "Notes",
        paras: [
          "Two similar names, two different things: the Creditor Committee is a Steering subset, while a Certified Creditor works inside a VVB. And since the subset is smaller than the full committee, fewer people decide issuance than registration; a charter for appointing and rotating them has yet to exist.",
        ],
      },
    ],
  },

  "JaASU19LGJu8xGfdlSRQ-6": {
    title: "The MoECC gate",
    stage: "S11b",
    actorLabel: "Competent Authority · Authorizing Officer",
    tagline: "A ministry key stands between the committee and the mint.",
    sections: [
      {
        heading: "The issuance packet",
        paras: [
          "The moment the committee approves, the system builds the packet: a canonical data file plus a rendered PDF holding the project identity and methodology pin, fingerprints of all four documents with their ledger anchors, the verified quantity with its BE/PE/LE terms and GWP set, the auditors' identities and accreditation records, the consultation summary, both decisions with votes, and the compliance outcome. The packet never changes after generation, carries its own anchor, and exports whole for any system the ministry adopts later.",
        ],
      },
      {
        heading: "One outcome per packet",
        bullets: [
          "CONFIRMED: the Authorizing Officer signs with the ministry's own key, and the ledger records it. The key lives in ministry hardware, off the platform host.",
          "REFUSED: the officer states a reason, and the ledger records that. The record appends and nothing overwrites it.",
          "Elapsed time confirms nothing and refuses nothing.",
        ],
      },
      {
        heading: "On refusal",
        paras: [
          "The project returns to the committee with the reason in view of Steering and the owner. Steering may withdraw its decision, sending the project back to monitoring with notes, or resubmit the packet once with more information. A second refusal closes the period's path to issuance.",
        ],
      },
      {
        heading: "The queue",
        paras: [
          "The ministry's queue sits on the public record, each pending packet beside its days of waiting (the overdue threshold has no set value yet). You can see a delay; the platform cannot shorten one.",
        ],
      },
      {
        heading: "Limits",
        paras: [
          "A product gate. Qatar has no law or decree that hands the ministry this role, the record adjusts no international registry, and the confirmation is not Article 6 host-country authorization. The public label states this.",
          "Each issuance now waits on a ministry, a stricter bar than comparable programs set, and it ties issuance speed to the ministry's process rather than to the software.",
        ],
      },
    ],
  },

  b10: {
    title: "Credits minted",
    stage: "S12",
    actorLabel: "Automatic, via the Registry binding",
    tagline: "The ERVR number, serialised. No login can trigger this.",
    sections: [
      {
        heading: "Required first, all for one period",
        bullets: [
          "A published ERVR.",
          "An approved issuance decision.",
          "A CONFIRMED authorization record.",
          "Each sits on the public ledger, and the token contract requires the committee's threshold signatures plus the ministry's signature. The platform's own key opens nothing alone.",
        ],
      },
      {
        heading: "The mint",
        bullets: [
          "The minted quantity copies the ERVR's verified quantity. The job takes no quantity argument, and no override path exists.",
          "Serial ranges stay unique for good and carry the project id and vintage, the period the credits came from.",
          "One issuance per period. The period record enforces it, and the chain enforces it again.",
          "Activity classes with reversal risk, a forest that could burn, give up a published flat share to a buffer account at mint; the rest lands with the owner. The split happens at allocation, and the mint itself still matches the ERVR to the tonne.",
        ],
      },
      {
        heading: "After",
        paras: ["The project heads back to monitoring for period n+1."],
      },
      {
        heading: "Limits",
        paras: [
          "The buffer grows and does nothing else so far. No clawback logic exists, so the cover amounts to accounting rather than insurance.",
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* Phase 3 stages                                                      */
  /* ------------------------------------------------------------------ */

  b11: {
    title: "The owner holds them",
    actorLabel: "Project Owning Firm",
    tagline: "Credits sit in accounts, and owner accounts alone carry balances.",
    sections: [
      {
        paras: [
          "The mint credits the owner firm's account with HELD units. Each institution has an account, and the platform keeps auditor, Steering, Operations and ministry balances at zero.",
        ],
      },
      {
        heading: "One balance",
        paras: [
          "After the mint, the blockchain owns the truth about a unit and the database mirrors it. Two authoritative balances would open the double-spend path this product exists to shut.",
        ],
      },
    ],
  },

  b12: {
    title: "Carbon Market",
    actorLabel: "Account holders",
    tagline: "Firms trade with firms today. The venue question stays open.",
    sections: [
      {
        heading: "Live today",
        paras: [
          "A transfer moves a serial range between owner accounts and appends to the ownership history; ranges split as needed. HELD units alone may move. Payment rails sit out of scope for now, so fees and escrow run on test-mode money.",
        ],
      },
      {
        heading: "The open decision",
        bullets: [
          "Option A, an internal marketplace: an escrow order book where credits and payment swap in one atomic step. No automated market maker, since pooling treats unlike tonnes as alike, the quality laundering this product exists to prevent.",
          "Option B, an external venue: an export boundary that locks a unit at home the moment it leaves, closing the double-spend across the seam.",
        ],
      },
      {
        heading: "Notes",
        paras: [
          "Owner firms alone hold credits for now; a dedicated buyer institution comes later. Listings show eligibility labels as “Not assessed”, spelled out rather than dropped.",
        ],
      },
    ],
  },

  b13: {
    title: "Retired, for good",
    actorLabel: "Holding account",
    tagline: "A credit gets used once.",
    sections: [
      {
        paras: [
          "Retirement books the beneficiary (free text, so retiring for a third party carries their name), the reason and the timestamp, and issues a certificate with a verifiable id.",
        ],
      },
      {
        heading: "No way back",
        bullets: [
          "The database locks RETIRED units against change and transfer; application code gets no vote.",
          "The ledger appends and deletes nothing.",
          "On-chain, one transaction burns the tokens and mints a non-transferable certificate. A certificate without a burn cannot exist.",
          "The token contract accepts no upgrades: no admin mint, no rescue hook, no pause switch, no reverse path.",
        ],
      },
    ],
  },

  b14: {
    title: "Public lookup, no login",
    actorLabel: "Anyone",
    tagline: "You can check the pipeline from outside, without an account.",
    sections: [
      {
        heading: "Open to anyone",
        bullets: [
          "Type a serial and get its project, vintage, current state and, for a retired unit, its retirement record.",
          "Open a project page and read the pinned methodology, the stage, each comment with the auditor's answer, the reports, and the issuance history.",
          "Read per-VVB statistics: engagements, opinions, the average claimed-vs-verified gap, and shortlisted-vs-picked counts, computed at read time with no cache.",
          "Recompute any shortlist from its seed commitment, pool snapshot and stored result.",
          "Watch the ministry's queue: each pending packet and its days of waiting.",
        ],
      },
      {
        heading: "Honest labels",
        paras: [
          "Eligibility labels (CORSIA, Article 6) read “Not assessed”, with a note, in place rather than dropped. The MoECC confirmation gets its own label with date and ledger anchor, and the site keeps it apart from Article 6 and CORSIA claims, so a product gate never reads as a legal one.",
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* Strips                                                              */
  /* ------------------------------------------------------------------ */

  tr: {
    title: "The three rules",
    tagline: "The claims the product keeps true in code.",
    sections: [
      {
        paras: [
          "The auditor recommends, the committee decides, the authority confirms, the system mints. No institution performs another's step, and a credit requires an independent audit, a recorded decision and a state confirmation before it exists.",
          "Incumbent registries ask the market to trust one company's integrity. 2C2MRV lets anyone check the separation of roles.",
        ],
      },
    ],
  },

  tr1: {
    title: "Rule 1: two different auditors",
    tagline: "The design auditor never audits performance.",
    sections: [
      {
        heading: "The rule",
        paras: [
          "The firm that audits a project's design never audits its performance: Certified Auditor versus Certified Creditor, split at institution level. One person may hold both certifications; the firm that validated still cannot verify.",
        ],
      },
      {
        heading: "Enforcement",
        bullets: [
          "At pool construction: the verification draw cannot produce the validator.",
          "In the database.",
          "On-chain: the registry contract rejects a verification engagement for the project's validator.",
        ],
      },
      {
        heading: "Inside each audit",
        paras: [
          "The approver who signs a report did no team work on the engagement, and the signing lead holds the certification the phase demands: Certified Auditor for a PVR, Certified Creditor for an ERVR.",
        ],
      },
    ],
  },

  tr2: {
    title: "Rule 2: a checked recalculation",
    tagline: "The minted number has to sum in the framework's own equations.",
    sections: [
      {
        heading: "The three equations",
        paras: [
          "The carbon credit framework quantifies a credit with three equations, and the ERVR walks through all of them. One credit stands for one tonne of CO₂-equivalent.",
        ],
        bullets: [
          "CO₂e = Σ (Eᵢ × GWPᵢ). Gas conversion: each gas's emissions Eᵢ times its Global Warming Potential GWPᵢ, summed, turns methane, N₂O and the rest into tonnes of CO₂-equivalent. The pinned methodology names the GWP set (IPCC AR5 or AR6, 100-year, for example), and the ERVR shows a per-gas line wherever a gas other than CO₂ appears.",
          "ER = BE − PE − LE. The central equation across standards: baseline emissions minus project emissions minus leakage emissions gives the reduction. The verified quantity on the ERVR is this number, each term stated in tCO₂e.",
          "A = Σ Ay. Accumulation: the abatement A for a reporting span sums the adjusted net abatement Ay of each year y it covers. Here a verification covers one monitoring period, so a project's running total is the sum of its issued periods, one mint per period.",
        ],
      },
      {
        heading: "The check",
        paras: [
          "The platform verifies the ER sum and the GWP-set match as a hard pre-check and bounces a failing ERVR before Operations or any committee reads it. The verified quantity lives on the ERVR alone, and the mint reads no other source.",
        ],
      },
      {
        heading: "Limits",
        paras: [
          "The platform computes no BE, PE or LE and runs no methodology engine. It confirms the terms sum and the table matches; a wrong emission factor or an inflated baseline slips past arithmetic, and catching those stays the Certified Creditor's job. Selling this check as automated quantification would oversell it.",
        ],
      },
    ],
  },

  tr3: {
    title: "Rule 3: no hand on the mint",
    tagline: "No person mints, and the record sits in public.",
    sections: [
      {
        heading: "The mint",
        paras: [
          "Mint and burn permissions bind to a reserved Registry role that no account can receive, so no login creates supply. On-chain, a mint demands the Creditor Committee's threshold signatures plus the ministry's key; the platform's own key moves nothing alone. Retirement ends a credit: no admin mint, no rescue hook, no path back.",
        ],
      },
      {
        heading: "The record",
        paras: [
          "From the first release, the platform fingerprints each submission, report, decision, compliance outcome and comment-set close, anchors the fingerprint to a public ledger, and prints the transaction hash on the artifact. Publishing runs through a queue, so a dead chain leaves the product working. After a mint, the credits themselves live on-chain and the database mirrors them.",
        ],
      },
      {
        heading: "Claims that hold",
        paras: [
          "Two claims hold and get used: verifiable by anyone, and tamper-evident. Three would break under a platform-run relayer and a permissioned committee, and stay unused: immutable, trustless, decentralised.",
          "A chain verifies no tonnes. It cannot make a captured auditor honest or an inflated baseline true; separation of duties, blocking findings, the ±5% threshold and the independent approver carry that load off-chain. The contracts stop a narrower set worth stopping: double issuance of a period, forged retirement, silent revision of a decision, and quiet edits to a report.",
        ],
      },
    ],
  },
};
