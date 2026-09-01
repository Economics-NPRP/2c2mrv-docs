/**
 * The vocabulary behind the chart — every abbreviation and term of art used
 * on the diagram and in the detail modals, in plain language.
 * Opened from the "Vocabulary" item in the header navigation.
 */

export interface VocabTerm {
  term: string;
  /** Expansion of an abbreviation, shown next to the term. */
  expansion?: string;
  definition: string;
}

export interface VocabGroup {
  group: string;
  blurb?: string;
  terms: VocabTerm[];
}

export const VOCABULARY: VocabGroup[] = [
  {
    group: "The four documents",
    blurb:
      "Every phase follows the same beats: the owner claims, an auditor audits, the committee decides. Two of the four documents are written by the party whose revenue scales with the number in them — which is why exactly one document, the ERVR, may carry the quantity that gets minted.",
    terms: [
      {
        term: "PSF",
        expansion: "Project Submission Form",
        definition:
          "The owner's project plan: design, baseline, additionality argument, monitoring plan, safeguards, proof of ownership, the proposed crediting period, and an ex-ante estimate that is reference only. One per project, versioned.",
      },
      {
        term: "PVR",
        expansion: "Project Verification Report",
        definition:
          "Auditor A's design audit, signed by a Certified Auditor before anything runs: an assessment of every PSF section, a baseline and additionality conclusion, responses to every public comment, a findings register, an opinion, and a recommendation on registration. One per project. Despite the name, it verifies the design — not the results.",
      },
      {
        term: "PMR",
        expansion: "Project Monitoring Report",
        definition:
          "The owner's measured results for one monitoring period: period boundaries, measured parameters, raw evidence, the claimed reductions and their calculation, and any deviations from the monitoring plan. One per period.",
      },
      {
        term: "ERVR",
        expansion: "Emission Reduction Verification Report",
        definition:
          "Auditor B's performance audit, signed by a Certified Creditor after measurement: a recalculation of the reductions from evidence, decomposed into BE − PE − LE, with the verified quantity — the only number the mint ever reads. One per period.",
      },
    ],
  },
  {
    group: "Who's who",
    terms: [
      {
        term: "VVB",
        expansion: "Validation & Verification Body",
        definition:
          "An independent, externally accredited auditing firm. On the chart it appears twice per project: Auditor A validates the design, Auditor B verifies the performance — and they are never the same institution.",
      },
      {
        term: "Certified Auditor",
        definition:
          "A person role inside a VVB: the certification required to lead and sign a design audit (a PVR).",
      },
      {
        term: "Certified Creditor",
        definition:
          "A person role inside a VVB: the certification required to lead and sign a performance audit (an ERVR) and its verified quantity. Despite the finance echo, not a lender — the name means “the person certified to establish what a project may be credited”.",
      },
      {
        term: "Approver",
        definition:
          "The VVB reviewer who signs off a report after an independent technical review — and who must not have worked on that engagement's audit team.",
      },
      {
        term: "Steering Committee",
        definition:
          "The deciding body: admits VVBs, selects the engagement auditor from the drawn shortlist with a public reason, and votes on registration. It never performs audit work.",
      },
      {
        term: "Creditor Committee",
        definition:
          "The designated subset of Steering members who alone vote on issuance decisions — a committee role, not to be confused with the Certified Creditor person role inside a VVB.",
      },
      {
        term: "Operations",
        definition:
          "The administrative organ that moderates public comments and runs the procedural compliance review of the ERVR. It can return a report for correction — it can never approve, decide, assign, or touch a quantity.",
      },
      {
        term: "MoECC",
        expansion: "Ministry of Environment and Climate Change",
        definition:
          "The Competent Authority — a state ministry, independent of the platform. Its Authorizing Officer confirms or refuses every issuance packet, with a reason, before any mint; the confirmation is signed with the ministry's own key.",
      },
      {
        term: "Registry",
        definition:
          "Not a person or an institution: the locked system permission that mints and burns credits. It can never be granted to an account, so nobody with a login can create supply.",
      },
    ],
  },
  {
    group: "Quantities & method",
    terms: [
      {
        term: "Methodology (pinned)",
        definition:
          "The externally published rulebook a project is measured under. Its exact version is frozen at submission and can never change for the lifetime of the project.",
      },
      {
        term: "BE − PE − LE",
        expansion: "Baseline − Project − Leakage emissions",
        definition:
          "The methodology's own decomposition of a reduction: what would have been emitted anyway (BE), minus what the project actually emitted (PE), minus emissions the project pushed elsewhere (LE). The verified quantity must equal exactly this arithmetic, and the platform rejects an ERVR whose terms don't sum.",
      },
      {
        term: "Verified quantity",
        definition:
          "Auditor B's recalculation of the reductions, stated on the ERVR. It is the only number the mint reads — the owner's claim is never credited.",
      },
      {
        term: "tCO₂e",
        expansion: "tonnes of CO₂-equivalent",
        definition:
          "The common unit all greenhouse gases are converted into, so one credit always represents one tonne of CO₂-equivalent reduction.",
      },
      {
        term: "GWP set",
        expansion: "Global Warming Potential set",
        definition:
          "The conversion table (e.g. IPCC AR5 or AR6, 100-year) used to translate other gases into CO₂-equivalent. The pinned methodology dictates which set applies, and the platform checks the report used it.",
      },
      {
        term: "Materiality (±5%)",
        definition:
          "The threshold against which the gap between claimed and verified figures is judged. The workspace computes the gap live, and a material divergence must be documented and explained in the ERVR.",
      },
      {
        term: "Ex-ante estimate",
        definition:
          "The forecast of annual reductions in the owner's plan. A plausibility reference only: it carries no balance, the issuance machinery cannot read it, and issuing against a forecast is exactly what the pipeline exists to prevent.",
      },
    ],
  },
  {
    group: "Periods & credits",
    terms: [
      {
        term: "Crediting period",
        definition:
          "The outer time window fixed at registration, within which the project may earn credits at all. A project without one cannot enter monitoring.",
      },
      {
        term: "Monitoring period",
        definition:
          "One measured slice of the crediting period, covered by one PMR and one ERVR. Periods may not overlap, gaps earn nothing, and each period can be issued at most once, ever.",
      },
      {
        term: "Vintage",
        definition:
          "The monitoring period a credit was earned in — stamped on every serial so a 2026 tonne is never interchangeable with a 2021 tonne.",
      },
      {
        term: "Serial number / range",
        definition:
          "The globally unique, never-reused identifiers carried by every credit, tying it to its project and vintage. Anyone can look up any serial without a login.",
      },
      {
        term: "Mint / issuance",
        definition:
          "The automatic creation of serialized credits once — and only once — a published ERVR, an approved committee decision, and a ministry confirmation all exist for the same period. The quantity is exactly the ERVR's verified quantity.",
      },
      {
        term: "Buffer account",
        definition:
          "For activity classes with reversal risk (a forest that could burn), a published flat percentage of each issuance is set aside in a system-held buffer at mint; the remainder goes to the owner.",
      },
      {
        term: "Retirement",
        definition:
          "The permanent using-up of a credit against a named beneficiary, with a certificate issued. Retired credits can never be transferred or revived — enforced in the database and on-chain.",
      },
    ],
  },
  {
    group: "Process terms",
    terms: [
      {
        term: "Completeness check",
        definition:
          "The automated gate after submission: are all required fields and attachments present and well-formed? A presence check, deliberately not a judgment — failing it returns the plan to the owner with a machine-generated reason list.",
      },
      {
        term: "Consultation window",
        definition:
          "The fixed 15-calendar-day period in which anyone may comment on a submitted project, on the record. The design audit cannot conclude until every comment has a recorded auditor response.",
      },
      {
        term: "Seeded draw & shortlist",
        definition:
          "How auditors are assigned: the system draws a shortlist at random from the eligible pool, with the random seed committed publicly before the draw so anyone can recompute the result and confirm it wasn't rigged. The committee then picks one from the shortlist — never outside it — with a public reason.",
      },
      {
        term: "Findings — CAR / CL / FAR",
        expansion:
          "Corrective Action Request · Clarification Request · Forward Action Request",
        definition:
          "The auditor's issue register. CARs (something is wrong) and CLs (something is unclear) block the report until the owner responds and the auditor closes them; FARs don't block but carry forward to the next audit, which must address them.",
      },
      {
        term: "Opinion & assurance level",
        definition:
          "The audit's conclusion (positive, qualified, or adverse) and the degree of confidence behind it. The auditor is paid identically whatever the opinion, so there is nothing to gain from a friendly one.",
      },
      {
        term: "Escrow",
        definition:
          "Where the engagement fee sits: the owner pays the full fee up front, before any outcome exists; the platform holds it and releases the auditor's portion when the report is published — regardless of what the report concludes. The auditor's counterparty is the escrow, never the owner.",
      },
      {
        term: "Issuance packet",
        definition:
          "The bundle the ministry reviews: project identity, methodology pin, fingerprints of all four documents, the verified quantity and its decomposition, auditor identities and accreditation, the consultation summary, both decisions with votes, and the compliance-review outcome.",
      },
      {
        term: "Anchoring / tamper-evident",
        definition:
          "Every submission, report, decision and outcome is fingerprinted and written to a public blockchain, with the transaction shown on the artifact. Anyone can verify nothing was altered after the fact — which is why the honest claims are “publicly verifiable” and “tamper-evident”, not “immutable” or “trustless”.",
      },
    ],
  },
];
