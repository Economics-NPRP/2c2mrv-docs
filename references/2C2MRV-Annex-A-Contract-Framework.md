# Annex A — Smart Contract Framework

**Companion to** `2C2MRV-MVP-PRD.md` v0.3 · **Status** supersedes D-1 (see §8) · **Target** testnet

---

## 0. The governing principle

> The chain holds **what was concluded**. The database holds **how it was concluded**.

Supply, custody, retirement and the hashes of every report and decision are chain-authoritative. Findings loops, documents, evidence, comments, assignments and workflow state stay off-chain, because correction is a feature of an audit and permanence is not.

Two claims are true and should be used: **publicly verifiable** and **tamper-evident**. Three claims are false under a relayer and a permissioned committee, and must not be used: *immutable*, *trustless*, *decentralised*.

---

## 1. The contract set — four

| | Contract | Ships | Upgradeable | Purpose in one line |
|---|---|---|---|---|
| **SC-1** | Registry | M4 | yes | institutions, accreditation windows, projects, engagements |
| **SC-2** | Attestation | **M1 (anchor only) → M4 (full)** | yes | timestamps record hashes; then signs reports and decisions as the sole mint authority |
| **SC-3** | ACC Token | M4 | **no** | the credits: issue, transfer, retire |
| **SC-4** | Retirement Certificate | M4 | **no** | soulbound proof of retirement |

**SC-5 Market** is not part of the framework. It is deferred behind D-2 and may never be built — if trading happens on an external venue you need an export lock, not a market contract. See §7.

There is no separate anchor contract. SC-2 ships at M1 as a proxy whose first implementation does nothing but `anchor()`, and is upgraded at M4 to add attestation. That keeps the M1 deliverable schema-independent without adding a fifth deployment, and past events remain immutable regardless of what the implementation later becomes.

**Why SC-3 and SC-4 are not upgradeable.** If the token contract can be upgraded, it can be made to mint or to unretire, and "irreversible retirement" becomes a promise rather than a property. Everything that can change must sit in contracts that do not hold supply.

---

## 2. SC-2 v1 · Anchor (M1)

Forty lines, one function, one event. Deliberately schema-independent so nothing breaks as the state machine moves through M1–M3.

```solidity
event Anchored(bytes32 indexed recordHash, bytes32 indexed kind, uint256 ts);

function anchor(bytes32 recordHash, bytes32 kind) external onlyRelayer;
```

**Anchors:** PSF submission · completeness gate result · consultation close (a Merkle root over the comment set, so no comment can be added or removed afterwards) · PMR submission · compliance review outcome · any record without supply effect.

At M4, when SC-2 is upgraded, reports and decisions route to `attestReport` / `attestDecision`; everything else continues through `anchor()`, which is never removed.

**Why it ships first.** It gives the demo a real chain presence from M1 while deferring every schema-coupled decision — supply, custody, double-spend across the seam — until issuance has stopped changing shape.

---

## 3. SC-1 · Registry (M4)

Answers, without trusting your database: does this project exist, who owns it, and **was its auditor accredited on the date it audited**?

**State**
```
institution[addr]        → { type, status }
accreditation[vvb][]     → { body, scheme, scopes, validFrom, validTo, suspended }   // append-only
project[projectId]       → { owner, methodologyId, methodologyVersion,
                             creditingStart, creditingEnd, psfHash, registered }
engagement[projectId][]  → { phase, vvb, assignedAt }
```

**Calls** `registerInstitution` · `addAccreditation` · `suspendVVB` · `recordEngagement` · `registerProject`

**Invariants**
- Accreditation is **appended with validity windows, never overwritten**. Overwriting destroys the only question anyone ever asks.
- `recordEngagement(verification)` **reverts if the VVB already holds a validation engagement on that project.** This puts separation of duties on-chain, where a database bug cannot bypass it.
- `registerProject` sets the crediting period once and cannot move it.

**Does not do** grant accreditation (it records that an external body did) · enforce the pipeline · store documents.

---

## 4. SC-2 v2 · Attestation (M4)

The gate, and the most important contract in the set.

**State**
```
attestation[id] → { projectId, periodId, kind, docHash, opinion, assuranceLevel,
                    verifiedQuantity, signers[], timestamp }
decisionApproved[projectId][periodId]   → bool   // Creditor Committee threshold
authorityConfirmed[projectId][periodId] → bool   // Competent Authority key
seedCommitment[drawId]                  → bytes32
```

**Calls**
- `attestReport(...)` — signed by the VVB institution key and the approver key. Carries `docHash`, opinion, assurance level, and for an ERVR the `verifiedQuantity` (PRD v0.6 also records the BE/PE/LE terms in the attested document hash; the contract stores only the total).
- `attestDecision(...)` — **threshold-signed by Creditor Committee member keys** (the Steering subset that votes on issuance), per decision. Sets `decisionApproved`.
- `attestAuthorization(projectId, periodId, packetHash)` — **signed by the Competent Authority key**, exactly once per `(projectId, periodId)`. Sets `authorityConfirmed`. A refusal is not a call to this function; it is `anchor()`ed like any other outcome, so the chain records that a refusal happened without granting anything.
- `commitSeed(drawId, bytes32)` — the relayer commits the draw seed before the draw runs, so a shortlist can be recomputed and a retroactively chosen seed is impossible.
- `isMintAuthorised(projectId, periodId) → bool` — returns `decisionApproved && authorityConfirmed`. The single question SC-3 asks.

**The signer set is the whole point.** The paper this project descends from puts a ≥70% threshold over *verifiers*; that does not transfer, because in your model verifiers recommend and never approve. The threshold sits over **Creditor Committee members**, matching the off-chain quorum, and signatures are per-decision rather than a standing role. The Competent Authority adds a second, independent signer that the platform does not control: a state actor's key, not a committee the administrator appoints.

**If a single relayer key can call `attestDecision` or `attestAuthorization`, the entire positioning collapses** into "trust our server, which also writes to a chain." Minting is the one operation that creates supply, and it now requires two independent parties — a committee threshold and a ministry — neither of which is the platform. It is also the strongest thing in the demo: three members and one ministry signing, on-chain, visible.

---

## 5. SC-3 · ACC Token (M4)

**Standard.** ERC-1155, semi-fungible. Credits are fungible *within* a class and non-fungible *across* classes.

```
tokenId = keccak256(projectId, vintage, authorizationStatus)
```

`authorizationStatus` is permanently `NONE` in the MVP. It is in the key anyway, because if Article 6 authorization is ever added, authorized and unauthorized units from the same project and vintage stop being interchangeable — and splitting a class after issuance is painful.

**Serials.** Tracked as **ranges in the database**; emitted on-chain in the issuance event. On-chain you have quantities, not serials.

```solidity
event Issued(uint256 indexed tokenId, uint256 indexed projectId, uint32 vintage,
             uint64 firstSerial, uint64 lastSerial, bytes32 ervrHash);

function issue(uint256 projectId, uint32 vintage,
               uint64 firstSerial, uint64 lastSerial,
               bytes32 ervrHash, address to) external onlyRelayer
{
    require(attestation.isMintAuthorised(projectId, vintage), "not attested");
    uint256 tokenId = _classOf(projectId, vintage);
    require(!issued[tokenId], "period already issued");     // FR-36, on-chain
    issued[tokenId] = true;
    _mint(to, tokenId, lastSerial - firstSerial + 1, "");
    emit Issued(tokenId, projectId, vintage, firstSerial, lastSerial, ervrHash);
}
```

Serial-level custody is a **derived view**, reconstructed off-chain from transfer events under a published deterministic rule (always consume the holder's lowest available serial). Anyone can recompute it; the chain does not itself know who holds serial 41,203. Say so rather than implying serial-level on-chain provenance.

**Invariants** — one mint per `(project, vintage)`, ever · quantity ≡ attested `verifiedQuantity` · no burn path except `retire()` · **no admin mint, no rescue function, no pause on retirement** · retirement terminal, no path back.

`retire()` burns and then calls SC-4 in the same transaction. Retirement logic lives here, not in SC-4, so that no second privileged path into supply exists.

---

## 6. SC-4 · Retirement Certificate (M4)

ERC-721, **soulbound** — mintable, never transferable. Callable **only by SC-3**, inside `retire()`.

Each token carries: project, vintage, quantity, serial range reference, retiring account, **beneficiary name**, **reason**, timestamp.

**Why not the paper's burn badge.** Three failures: it is transferable, so the holder need not be the retirer; it records destruction rather than a legal act, with no beneficiary and no obligation; and burn and badge are separate calls, so a badge could exist without a burn. Here they are one atomic operation or neither happens.

Because you have a registry, this certificate is **corroboration, not the primary record** — the retirement already exists in your database and on the public serial-lookup page. That is a weaker requirement and a stronger position: your proof does not depend on a chain being available.

---

## 7. Market *(not in the framework — deferred pending D-2)*

An **escrow order book**: seller lists a range, buyer fills, credits and stablecoin swap atomically. Correct for low-liquidity, heterogeneous units.

**Not an AMM.** An AMM requires pooling, and pooling means treating a 2021 cookstove tonne as interchangeable with a 2026 removal tonne. That is the quality laundering your product exists to prevent. The paper's AMM assumes a homogeneous carbon token; your entire premise is that credits differ.

If trading happens on an external venue instead, you need an **export lock** — a `TRANSFERRED_OUT` state — not a market contract.

---

## 8. Where each contract sits in the flow

| Stage | Owner | Chain effect |
|---|---|---|
| S1 PSF submit | Owner Firm | SC-2 `anchor` PSF hash |
| S2 Completeness gate | automatic (`system`) | SC-2 `anchor` result |
| S3 Consultation window | automatic; Operations moderates | SC-2 `anchor` Merkle root of the comment set at close |
| S4 Validator shortlist & selection | automatic draw → Steering selects | SC-2 `commitSeed` before the draw; SC-1 `recordEngagement(validation, VVB-A)` carrying the draw id and selection-reason hash |
| S5 Validation audit | VVB-A (Certified Auditor) | SC-2 `attestReport(PVR)` — VVB + approver signatures |
| S6 Registration decision | Steering | SC-1 `registerProject` (crediting period fixed) + SC-2 `attestDecision(registration)` |
| S7 Monitoring & PMR | Owner Firm | SC-2 `anchor` PMR hash |
| S8 Verifier shortlist & selection | automatic draw → Steering selects | SC-2 `commitSeed`; SC-1 `recordEngagement(verification, VVB-B)` — **reverts if VVB-B validated this project** (belt and braces: the pool already excluded it) |
| S9 ER verification | VVB-B (Certified Creditor) | SC-2 `attestReport(ERVR)` carrying `verifiedQuantity` |
| S10 Compliance review | Operations | SC-2 `anchor` outcome — no supply effect |
| S11 Issuance decision | Steering (Creditor Committee) | SC-2 `attestDecision(issuance)` — threshold signatures → `decisionApproved`; SC-2 `anchor` issuance-packet hash |
| S11b Authorization | Competent Authority | SC-2 `attestAuthorization(packetHash)` with the authority key → `authorityConfirmed`; a refusal is `anchor`ed only |
| S12 ACC issuance | Registry binding (issuance job) | SC-3 `issue()` — reverts unless `isMintAuthorised` (both flags); mint, emit serial range |
| — transfer | Account holder | SC-3 `safeTransferFrom` |
| — retirement | Account holder | SC-3 `retire()` → burn → SC-4 certificate |
| — listing / settlement | Account holder | market contract, only if D-2 resolves internal |

**Stays off-chain at every stage:** documents and evidence (hashes only) · the CAR/CL/FAR loop · consultation comment text, which is mutable, moderatable and contains personal data · assignments detail · queues, SLAs, stage state.

---

## 9. Keys and the trust boundary

| Key | Holds | Signs |
|---|---|---|
| Relayer | platform | SC-2 `anchor`, `commitSeed`, SC-1 writes, SC-3 `issue` (gated by SC-2) |
| VVB institution + approver | each VVB | report attestations |
| **Creditor Committee member keys** | each member of the issuance subset | **issuance decision attestations, threshold** (registration attestations: all Steering members) |
| **Competent Authority key** | the ministry — in its own HSM or hardware wallet, never on the platform host | **authorization attestation**, one per period |
| Institution account keys | each institution | transfer, retire |

**Give every institution a real keypair at onboarding, even in the demo.** Custodial holdings reduce the chain's ownership record to "the platform says so," which undercuts the positioning. With fake users this costs nothing and makes the demo materially stronger.

**State the boundary plainly:** the chain gives public verifiability and tamper-evidence. It does not give decentralisation. Anyone can check that what you published is internally consistent and unaltered; nobody can check that it matches physical reality without trusting the audit process.

---

## 10. What the chain does not do

It cannot verify a tonne, make a captured VVB honest, or make an inflated baseline true. A wrong number in an ERVR will be attested, minted and traded with a perfect cryptographic trail.

Over-crediting is prevented **off-chain** — separation of duties, blocking findings, the ±5% materiality threshold, the ex-ante reference check, an independent approver. The contracts prevent a narrower and still valuable set: double issuance of a period, forged retirement, silent revision of a decision, and undetectable tampering with a report.

That distinction is the difference between a defensible pitch and one that fails at the first hostile question.

---

## 11. Build order and test obligations

**M1** — SC-2 v1 (anchor only). Publisher worker writes canonical JSON, hashes it, submits, records the tx hash, surfaces it on every artifact in the UI.

**M4** — SC-1, SC-3, SC-4 deployed and SC-2 upgraded, once issuance, serials and retirement have settled. The publisher stays a **subscriber via an outbox table**: if the publisher is down, the testnet is deprecated, or the RPC rate-limits, the product still works.

**Post-MVP** — a market contract, only if D-2 resolves to an internal venue.

**Property tests that must exist before any deployment**
- No sequence of calls mints twice for one `(project, vintage)`.
- No sequence of calls mints with `decisionApproved` alone, `authorityConfirmed` alone, or neither; the relayer key can never set either flag.
- `attestAuthorization` succeeds at most once per `(project, period)`; a second call reverts.
- A `commitSeed` for a draw id exists at a block earlier than the block in which the engagement referencing it is recorded, under every ordering.
- Minted quantity always equals the attested `verifiedQuantity`.
- No path burns tokens except `retire()`; no path unretires.
- A certificate exists if and only if a corresponding burn occurred, same transaction.
- `recordEngagement(verification)` reverts for the project's validator, under every ordering.
- Fuzz split/transfer/retire sequences: reconstructed serial custody always sums to `balanceOf`.
- No unbounded loops. Every operation is O(1) in holdings.

**Operational** — testnets get deprecated, faucets dry up, RPC providers rate-limit, pruned state breaks indexers. Verify the current testnet landscape before committing, and never let a demo depend on a live chain being reachable.

---

## 12. Effect on the PRD

- **D-1 closed** (PRD v0.4): SC-2 v1 from M1; SC-1–SC-4 at M4; chain-authoritative for the unit once minted, database authoritative for process. Reaffirmed in v0.6 against the Qatar framework paper's sovereign-database posture — this is a position the project holds deliberately and must be ready to defend (PRD §2, D-3).
- **D-2 remains open**, and blocks only the market contract.
- **PRD v0.6 alignment:** the Steering threshold is now the Creditor Committee subset; `attestAuthorization` and the Competent Authority key are new; `commitSeed` formalises what v0.5 called "seed anchored via SC-2"; the S12 owner is the Registry *binding* (issuance job), not a principal — the earlier "Registry principal" and "Gatekeeper" vocabulary in this annex is retired.
- **Standing requirement:** once a unit is minted, the database holding record is a mirror. One authoritative balance, never two. This is the double-spend path the product exists to prevent, and it appears the moment credits exist in both places.
