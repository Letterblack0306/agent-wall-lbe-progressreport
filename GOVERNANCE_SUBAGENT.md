# LBE Dual-Agent Governance Pattern — Specification

## Overview

The **Dual-Agent Governance Pattern** is an architectural pattern where two agents work in parallel:

1. **Coding Agent** — Focused exclusively on implementation (coding, debugging, testing, feature development)
2. **Governance Subagent** — Focused exclusively on governance (documentation, intent tracking, gate state, contradiction detection, acceptance checkpoints)

This pattern solves the problem where coding agents forget to maintain governance documentation, leading to contradictions, stale state, and blocked acceptance gates.

---

## The Problem

When a coding agent focuses on implementation:

- Intent tracking gets deprioritized
- PROJECT_INDEX.md updates are forgotten
- Gate state drifts from actual implementation
- Contradictions accumulate silently
- Acceptance checkpoints are never created
- Documentation becomes stale
- Machine gate becomes unreliable
- Final product acceptance never closes

**Evidence from current LBE workspace:**
- 880 commits but machine gate is `BLOCKED_BY_SOURCE_CONTRADICTION`
- Textual TUI classified as PREVIEW/synthetic but documentation wasn't updated fast enough
- Sep 5 locked contract wasn't implemented but no governance process caught the drift
- 7+ consecutive CI failures from governance drift

---

## The Solution

A dedicated **governance subagent** runs in parallel with the coding agent. The governance subagent's **only job** is to maintain governance truth — it never codes, it only documents, validates, and tracks.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER                                     │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    CODING AGENT (Primary)                        │
│                                                                  │
│  Focus: Implementation, coding, debugging, testing              │
│  Does NOT: Write intent docs, update PROJECT_INDEX,             │
│            manage gate state, create checkpoints                │
│                                                                  │
│  Communicates:                                                   │
│    → Announces intent before mutation                           │
│    → Reports completed changes                                  │
│    → Requests gate validation                                   │
│    → Signals slice completion                                   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ Intent / Completion Signals
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│              GOVERNANCE SUBAGENT (Parallel)                      │
│                                                                  │
│  Focus: Documentation, validation, tracking                     │
│  Does NOT: Write code, modify runtime, execute tools            │
│                                                                  │
│  Maintains:                                                      │
│    • PROJECT_INDEX.md (structural registry)                     │
│    • implementation-gates.json (machine state)                  │
│    • CURRENT_STATUS.md (human-readable state)                   │
│    • PROJECT_INTENT_LEDGER.md (decision history)                │
│    • docs/acceptance/* (checkpoints)                            │
│    • DOCUMENT_INTENT_MANIFEST.md (doc roles)                    │
│                                                                  │
│  Actions:                                                        │
│    → Validates intent against index                             │
│    → Registers intent in ledger                                 │
│    → Updates all artifacts after mutation                       │
│    → Scans for contradictions                                   │
│    → Creates acceptance checkpoints                             │
│    → Blocks publication without authorization                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Interaction Protocol

### Phase 1: Pre-Mutation (Before Coding Agent Changes Anything)

1. **Intent Registration**
   - Coding agent announces: "I need to add a new governed tool to the registry"
   - Governance subagent records intent in `PROJECT_INTENT_LEDGER.md`

2. **Index Validation**
   - Governance subagent checks `PROJECT_INDEX.md`
   - Confirms existing owner, checks mutation boundary
   - Returns: "Intent registered. Owner: LBE audit/rule owner. Boundary: Active implementation intent + affected rule owner. Proceed."

3. **Gate State Check**
   - Governance subagent verifies `implementation-gates.json` allows the mutation
   - Checks active slice, status, and rules

4. **Contradiction Scan**
   - Governance subagent checks if proposed intent contradicts any existing documented decision, locked contract, or canonical source

### Phase 2: Implementation (Coding Agent Works)

5. **Coding Agent Implements**
   - Writes code, tests, validation
   - Focuses exclusively on implementation

6. **Completion Report**
   - Coding agent reports: "Implementation complete. Files changed: rules/new_tool.py, tests/test_new_tool.py"

### Phase 3: Post-Mutation (After Coding Agent Completes Changes)

7. **Index Update**
   - If new structure was added, governance subagent registers it in `PROJECT_INDEX.md`
   - Includes: purpose, owner, supporting contract, mutation boundary

8. **Gate State Update**
   - Governance subagent updates `implementation-gates.json` to reflect current machine state
   - Updates slice status if applicable

9. **Status Documentation**
   - Governance subagent updates `CURRENT_STATUS.md` with human-readable current state
   - Ensures it matches machine gate

10. **Completion Recording**
    - Governance subagent records completion in `PROJECT_INTENT_LEDGER.md`
    - If slice complete, creates acceptance checkpoint in `docs/acceptance/`

### Phase 4: Continuous Monitoring (Always Running)

11. **Contradiction Detection**
    - Continuously scan for contradictions between: canonical sources, locked contracts, machine gate state, documentation, and actual implementation
    - Flag immediately when found

12. **Document Role Inventory**
    - Maintain `DOCUMENT_INTENT_MANIFEST.md` — every document must have a declared role, owner, and mutation boundary

13. **Publication Gate**
    - Block any publication/version work unless separately authorized by machine gate and user
    - Publication is never implicit

---

## Hard Rules (Non-Negotiable)

### RULE 1: UNINDEXED_STRUCTURE = NO_MUTATION

If a new subsystem, adapter, provider, UI, database, integration, or directory is discovered, the governance subagent **MUST** register its purpose, owner, supporting contract, and mutation boundary in `PROJECT_INDEX.md` **BEFORE** the coding agent implements it.

### RULE 2: No Parallel Architecture

The governance subagent enforces one active slice at a time. No parallel architecture work. No next phase without PASS on current phase.

### RULE 3: Fail Closed

When in doubt, the governance subagent blocks. It does not guess, infer, or assume. If evidence is insufficient, status is `INSUFFICIENT_EVIDENCE` or `BLOCKED`.

### RULE 4: Coding Agent May Not Silently Change Gate

Only the governance subagent (or explicit user authorization) may change gate state. The coding agent must request gate changes through the governance subagent.

### RULE 5: Documentation Is Not Code

The governance subagent **NEVER** writes code. The coding agent **NEVER** writes governance documentation (except inline comments). Separation of concerns is absolute.

### RULE 6: README Is Not a Release Record

The governance subagent ensures READMEs are not treated as status/release records. Current truth lives in `CURRENT_STATUS.md` and `implementation-gates.json`.

---

## Governance Artifacts Maintained by Subagent

| Artifact | Purpose | Update Trigger | Authority |
|----------|---------|----------------|-----------|
| `PROJECT_INDEX.md` | Root structural authority registry | Before any new structure mutation | LBE governance |
| `implementation-gates.json` | Machine authorization and active slice | Every state transition, slice change | Machine governance |
| `CURRENT_STATUS.md` | Human-readable current state | After every significant state change | Documentation owner |
| `PROJECT_INTENT_LEDGER.md` | Decision/intent history | Before and after every mutation | Governance subagent |
| `docs/acceptance/*` | Bounded acceptance checkpoints | Slice completion | Machine gate + acceptance owners |
| `DOCUMENT_INTENT_MANIFEST.md` | Document role inventory | New document creation | Documentation owner |
| `docs/IMPLEMENTATION_PLAN.md` | Ordered implementation sequence | Phase/slice changes | Implementation owner |

---

## Implementation Pattern

```python
# Coding Agent Session
coding_agent = Cline  # or Codex, or any selected reasoning agent
coding_agent.focus = "implementation"

# Governance Subagent Session (parallel)
governance_agent = LBE-governance  # dedicated governance process
governance_agent.focus = "documentation and validation"

# Interaction Loop
while active_slice is not complete:
    # 1. Coding agent announces intent
    intent = coding_agent.announce_intent("add governed tool X")
    
    # 2. Governance subagent validates and registers
    governance_agent.register_intent(intent)
    governance_agent.validate_against_index(intent)
    governance_agent.check_gate_state(intent)
    approval = governance_agent.approve_or_block(intent)
    
    if approval.blocked:
        coding_agent.receive_feedback(approval.reason)
        continue
    
    # 3. Coding agent implements
    result = coding_agent.implement(intent)
    
    # 4. Governance subagent updates all artifacts
    governance_agent.update_project_index(result)
    governance_agent.update_gate_state(result)
    governance_agent.update_current_status(result)
    governance_agent.record_completion(intent, result)
    governance_agent.scan_for_contradictions()
    
    # 5. If slice complete, create checkpoint
    if governance_agent.is_slice_complete():
        governance_agent.create_acceptance_checkpoint()
```

---

## Implementation Options

### Option 1: Separate Cline Session

Run a second Cline session in parallel with the coding session. The governance session has read/write access to all governance artifacts but no access to code files.

**Pros:**
- Uses existing Cline infrastructure
- Familiar interface
- Can use BirdEye MCP for workspace queries

**Cons:**
- Two separate sessions to manage
- Communication protocol needs definition

### Option 2: Python Governance Script

A Python script that runs alongside the coding agent, monitoring file changes and updating governance artifacts automatically.

**Pros:**
- Automated, no manual intervention
- Can integrate with existing LBE runtime
- Can use BirdEye MCP

**Cons:**
- Requires development
- Less flexible than agent-based approach

### Option 3: BirdEye MCP Tool

A BirdEye MCP tool that provides governance subagent capabilities as a service. The coding agent calls the tool to register intent, validate against index, etc.

**Pros:**
- Integrated with existing BirdEye infrastructure
- Can be called from any client
- Centralized governance logic

**Cons:**
- Requires BirdEye development
- May add latency

---

## Connection to Current LBE Blockers

The current LBE workspace has exactly this problem:

- Backend has 880 commits but machine gate is `BLOCKED_BY_SOURCE_CONTRADICTION`
- Textual TUI was classified as PREVIEW/synthetic but documentation wasn't updated fast enough
- Sep 5 locked contract wasn't implemented but no governance process caught the drift
- 7+ consecutive CI failures from governance drift

**A governance subagent running in parallel would have:**
- Caught the Textual/Cline surface contradiction earlier
- Flagged the missing structural UI implementation immediately
- Kept CURRENT_STATUS.md aligned with machine gate state
- Created acceptance checkpoints for each completed slice
- Prevented the 7+ consecutive CI failures by catching drift early

---

## Next Steps

1. **Implement governance subagent as parallel process**
   - Can be a separate Cline session, a Python script, or a BirdEye MCP tool
   - Must have read/write access to all governance artifacts

2. **Define communication protocol**
   - How does coding agent announce intent?
   - How does governance subagent respond?
   - File-based, MCP tool, or shared state?

3. **Test with current active slice**
   - Run both agents on `FINAL_PRODUCT_SOURCE_RECONCILIATION`
   - Verify governance subagent catches contradictions and maintains truth

4. **Integrate with BirdEye MCP**
   - Governance subagent can use BirdEye for workspace queries, memory access, and skills retrieval

---

## Document Metadata

- **Date:** 2026-09-18
- **Classification:** GOVERNANCE ARCHITECTURE PATTERN
- **Authority:** LBE governance
- **Status:** SPECIFIED — READY FOR IMPLEMENTATION

---

**Built for the Lockstep Boundary Engine ecosystem**  
**Defines the dual-agent governance pattern**  
**Solves the documentation drift problem**
