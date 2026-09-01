/**
 * The vocabulary behind the chart: the abbreviations and terms of art used
 * on the diagram and in the detail modals, in plain language.
 * Opened from the "Vocabulary" item in the header navigation.
 * Prose follows the stop-slop skill (.claude/skills/stop-slop).
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
      "Each phase repeats one pattern: the owner claims, an auditor audits, the committee decides. The owner writes two of the four documents, and the owner's revenue scales with the numbers in them. For that reason a single document, the ERVR, may carry the quantity that mints.",
    terms: [
      {
        term: "PSF",
        expansion: "Project Submission Form",
        definition:
          "The owner's project plan: design, baseline, additionality case, monitoring plan, safeguards, proof of ownership, a proposed crediting period, and an ex-ante estimate that stays a reference figure. One per project, versioned.",
      },
      {
        term: "PVR",
        expansion: "Project Verification Report",
        definition:
          "Auditor A's design audit, signed by a Certified Auditor before anything runs: a grade on each PSF section, a conclusion on baseline and additionality, an answer to each public comment, a findings register, an opinion, and a recommendation on registration. One per project. The name says verification; the object is the design, since no results exist yet.",
      },
      {
        term: "PMR",
        expansion: "Project Monitoring Report",
        definition:
          "The owner's measured results for one monitoring period: boundaries, measured parameters, raw evidence, the claimed reductions with their calculation, and deviations from the monitoring plan. One per period.",
      },
      {
        term: "ERVR",
        expansion: "Emission Reduction Verification Report",
        definition:
          "Auditor B's performance audit, signed by a Certified Creditor after measurement: a rebuild of the reductions from evidence, broken into BE − PE − LE, carrying the verified quantity. The mint reads this number and no other. One per period.",
      },
    ],
  },
  {
    group: "The cast",
    terms: [
      {
        term: "VVB",
        expansion: "Validation & Verification Body",
        definition:
          "An independent auditing firm accredited by an outside body. Each project meets two: Auditor A validates the design, Auditor B verifies the performance, and one firm never plays both parts.",
      },
      {
        term: "Certified Auditor",
        definition:
          "A person role inside a VVB: the certification to lead and sign a design audit, the PVR.",
      },
      {
        term: "Certified Creditor",
        definition:
          "A person role inside a VVB: the certification to lead and sign a performance audit, the ERVR, and its verified quantity. No lender, despite the finance echo; read it as “certified to establish what a project may be credited”.",
      },
      {
        term: "Approver",
        definition:
          "The VVB reviewer who signs a report after an independent read, having done no team work on that engagement.",
      },
      {
        term: "Steering Committee",
        definition:
          "The deciding body. It admits VVBs, picks the engagement auditor from the drawn shortlist with a public reason, and votes on registration. It audits nothing.",
      },
      {
        term: "Creditor Committee",
        definition:
          "The Steering subset that alone votes on issuance. A committee role; a Certified Creditor, by contrast, works inside a VVB.",
      },
      {
        term: "Operations",
        definition:
          "The administrative organ that moderates public comments and runs the ERVR's procedural review. It can return a report for correction and holds no approval, decision, assignment or quantity power.",
      },
      {
        term: "MoECC",
        expansion: "Ministry of Environment and Climate Change",
        definition:
          "The Competent Authority, a state ministry outside the platform. Its Authorizing Officer confirms or refuses each issuance packet, with a reason, before any mint, and signs with the ministry's own key.",
      },
      {
        term: "Registry",
        definition:
          "No person and no institution: the reserved system permission that mints and burns. No account can receive it, so no login creates supply.",
      },
    ],
  },
  {
    group: "Quantities & method",
    terms: [
      {
        term: "Methodology (pinned)",
        definition:
          "The rulebook a project measures under, published outside the platform. Submission freezes the exact version for the project's lifetime.",
      },
      {
        term: "BE − PE − LE",
        expansion: "Baseline − Project − Leakage emissions",
        definition:
          "The methodology's decomposition of a reduction: baseline emissions (the without-project world), minus project emissions, minus leakage (emissions the project pushed elsewhere). The verified quantity must equal this sum, and the platform bounces an ERVR whose terms miss it.",
      },
      {
        term: "Verified quantity",
        definition:
          "Auditor B's recalculation, stated on the ERVR. The mint copies it; the owner's claim mints nothing.",
      },
      {
        term: "tCO₂e",
        expansion: "tonnes of CO₂-equivalent",
        definition:
          "The common unit each greenhouse gas converts into. One credit stands for one tonne.",
      },
      {
        term: "GWP set",
        expansion: "Global Warming Potential set",
        definition:
          "The conversion table (IPCC AR5 or AR6, 100-year, for example) that turns other gases into CO₂-equivalent. The pinned methodology names the set, and the platform checks the report used it.",
      },
      {
        term: "Materiality (±5%)",
        definition:
          "The tolerance for the gap between claimed and verified figures. The workspace computes the gap live, and a gap past the threshold demands documentation in the ERVR.",
      },
      {
        term: "Ex-ante estimate",
        definition:
          "The forecast in the owner's plan. A reference figure with no balance behind it; the issuance machinery cannot read the field, since minting forecasts is the failure this pipeline exists to block.",
      },
    ],
  },
  {
    group: "Periods & credits",
    terms: [
      {
        term: "Crediting period",
        definition:
          "The outer window locked at registration, inside which the project may earn at all. Without one, a project cannot enter monitoring.",
      },
      {
        term: "Monitoring period",
        definition:
          "One measured slice of the crediting period, covered by one PMR and one ERVR. Periods never overlap, gaps earn nothing, and each period mints at most once.",
      },
      {
        term: "Vintage",
        definition:
          "The monitoring period a credit came from, stamped on each serial. A 2026 tonne and a 2021 tonne stay distinct goods.",
      },
      {
        term: "Serial number / range",
        definition:
          "Unique, never-reused identifiers on each credit, tying it to project and vintage. You can look up any serial without an account.",
      },
      {
        term: "Mint / issuance",
        definition:
          "The automatic creation of serialised credits once a published ERVR, an approved committee decision and a ministry confirmation exist for one period. The quantity copies the ERVR.",
      },
      {
        term: "Buffer account",
        definition:
          "The set-aside for reversal risk, a forest that could burn: a published flat share of each such issuance lands in a system buffer at mint, and the rest goes to the owner.",
      },
      {
        term: "Retirement",
        definition:
          "The permanent use of a credit against a named beneficiary, with a certificate. A retired credit never moves again; the database and the chain both enforce the lock.",
      },
    ],
  },
  {
    group: "Process terms",
    terms: [
      {
        term: "Completeness check",
        definition:
          "The automated gate after submission: required fields and attachments, present and well-formed. A presence check with no judgment in it; a failure returns the plan with a machine-written reason list.",
      },
      {
        term: "Consultation window",
        definition:
          "Fifteen calendar days in which anyone may comment on a submitted project, on the record. The design audit cannot close while a comment lacks an auditor response.",
      },
      {
        term: "Seeded draw & shortlist",
        definition:
          "The assignment mechanism. The system draws a shortlist at random from the eligible pool and commits the seed in public before drawing, so you can recompute the result and confirm a straight draw. The committee then picks from the list, never outside it, with a public reason.",
      },
      {
        term: "Findings: CAR / CL / FAR",
        expansion:
          "Corrective Action Request · Clarification Request · Forward Action Request",
        definition:
          "The auditor's issue register. A CAR marks a defect and a CL marks an ambiguity; both block the report until the owner responds and the auditor closes them. A FAR blocks nothing and rolls to the next audit, which must address it.",
      },
      {
        term: "Opinion & assurance level",
        definition:
          "The audit's conclusion (positive, qualified or adverse) and the confidence grade behind it. The fee stays the same across conclusions, so a friendly opinion pays nothing extra.",
      },
      {
        term: "Escrow",
        definition:
          "The holding pen for the engagement fee. The owner pays the full fee up front, the platform holds it, and the auditor's share releases when the report publishes, whatever it concludes. The auditor's counterparty is the escrow rather than the owner.",
      },
      {
        term: "Issuance packet",
        definition:
          "The bundle the ministry reviews: project identity, methodology pin, fingerprints of the four documents, the verified quantity and its terms, auditor identities and accreditation, the consultation summary, both decisions with votes, and the compliance outcome.",
      },
      {
        term: "Anchoring / tamper-evident",
        definition:
          "The platform fingerprints each submission, report, decision and outcome and writes the fingerprint to a public blockchain, transaction shown on the artifact. You can prove a record went unaltered; proving it matches physical reality still takes trust in the audit. Hence the working claims: verifiable by anyone, tamper-evident, and no more.",
      },
    ],
  },
];
