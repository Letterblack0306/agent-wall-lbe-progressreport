# Dual-Agent Governance Pattern - Implementation Guide

## Problem Statement

**From your earlier discussion:** You wanted a subagent that runs in parallel with the coding agent to handle governance, documentation, and intent tracking. The coding agent focuses on implementation while the governance subagent ensures nothing falls through the cracks.

**Why this matters:**
- Coding agents forget to update documentation
- Intent tracking gets deprioritized during implementation
- Gate state drifts from actual implementation
- Contradictions accumulate silently
- Acceptance checkpoints are never created
- Final product acceptance never closes

## Solution: Dual-Agent Pattern

### Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      CODING AGENT                            │
│                                                              │
│  Focus: Implementation, coding, debugging, testing          │
│  Does NOT: Write intent docs, update PROJECT_INDEX,         │
│            manage gate state, create checkpoints            │
│                                                              │
│  Communicates:                                               │
│    → Announces intent before mutation                       │
│    → Reports completed changes                              │
│    → Requests gate validation                               │
│    → Signals slice completion                               │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ Intent / Completion Signals
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                 GOVERNANCE SUBAGENT                          │
│                                                              │
│  Focus: Documentation, validation, tracking                 │
│  Does NOT: Write code, modify runtime, execute tools        │
│                                                              │
│  Maintains:                                                  │
│    • PROJECT_INDEX.md (structural registry)                 │
│    • implementation-gates.json (machine state)              │
│    • CURRENT_STATUS.md (human-readable state)               │
│    • PROJECT_INTENT_LEDGER.md (decision history)            │
│    • docs/acceptance/* (checkpoints)                        │
│    • DOCUMENT_INTENT_MANIFEST.md (doc roles)                │
│                                                              │
│  Actions:                                                    │
│    → Validates intent against index                         │
│    → Registers intent in ledger                             │
│    → Updates all artifacts after mutation                   │
│    → Scans for contradictions                               │
│    → Creates acceptance checkpoints                         │
│    → Blocks publication without authorization               │
└─────────────────────────────────────────────────────────────┘
```

## Interaction Protocol

### Phase 1: Pre-Mutation (Before Coding Agent Changes Anything)

1. **Coding Agent Announces Intent**
   ```
   "I need to add a new governed tool to the registry"
   ```

2. **Governance Subagent Validates**
   - Checks `PROJECT_INDEX.md` for existing owner
   - Verifies mutation boundary
   - Records intent in `PROJECT_INTENT_LEDGER.md`
   - Returns approval or blocks with reason

3. **If Blocked**
   - Coding agent receives feedback
   - Must address governance concerns before proceeding

### Phase 2: Implementation (Coding Agent Works)

4. **Coding Agent Implements**
   - Writes code, tests, validation
   - Focuses exclusively on implementation
   - No documentation responsibilities

5. **Coding Agent Reports Completion**
   ```
   "Implementation complete. Files changed: rules/new_tool.py, tests/test_new_tool.py"
   ```

### Phase 3: Post-Mutation (After Coding Agent Completes Changes)

6. **Governance Subagent Updates Everything**
   - Updates `PROJECT_INDEX.md` if new structure added
   - Updates `implementation-gates.json` with current state
   - Updates `CURRENT_STATUS.md` with human-readable state
   - Records completion in `PROJECT_INTENT_LEDGER.md`
   - Scans for contradictions
   - Creates acceptance checkpoint if slice complete

### Phase 4: Continuous Monitoring (Always Running)

7. **Contradiction Detection**
   - Continuously scans for contradictions between:
     - Canonical sources
     - Locked contracts
     - Machine gate state
     - Documentation
     - Actual implementation
   - Flags immediately when found

8. **Document Role Inventory**
   - Maintains `DOCUMENT_INTENT_MANIFEST.md`
   - Every document has declared role, owner, mutation boundary

9. **Publication Gate**
   - Blocks publication without explicit authorization
   - Publication is never implicit

## Hard Rules (Non-Negotiable)

### RULE 1: UNINDEXED_STRUCTURE = NO_MUTATION
If a new subsystem, adapter, provider, UI, database, integration, or directory is discovered, the governance subagent **MUST** register it in `PROJECT_INDEX.md` **BEFORE** the coding agent implements it.

### RULE 2: No Parallel Architecture
One active slice at a time. No parallel architecture work. No next phase without PASS on current phase.

### RULE 3: Fail Closed
When in doubt, the governance subagent blocks. It does not guess, infer, or assume. If evidence is insufficient, status is `INSUFFICIENT_EVIDENCE` or `BLOCKED`.

### RULE 4: Coding Agent May Not Silently Change Gate
Only the governance subagent (or explicit user authorization) may change gate state.

### RULE 5: Documentation Is Not Code
The governance subagent **NEVER** writes code. The coding agent **NEVER** writes governance documentation (except inline comments). Separation of concerns is absolute.

### RULE 6: README Is Not a Release Record
READMEs are not treated as status/release records. Current truth lives in `CURRENT_STATUS.md` and `implementation-gates.json`.

## Implementation Options

### Option 1: Separate Cline Session (Recommended)

Run a second Cline session in parallel with the coding session.

**Setup:**
```bash
# Terminal 1: Coding Agent
cd /path/to/workspace
cline

# Terminal 2: Governance Subagent
cd /path/to/workspace
cline --governance-mode
```

**Pros:**
- Uses existing Cline infrastructure
- Familiar interface
- Can use BirdEye MCP for workspace queries
- Easy to set up

**Cons:**
- Two separate sessions to manage
- Communication protocol needs definition (file-based or MCP)

### Option 2: Python Governance Script

A Python script that runs alongside the coding agent, monitoring file changes and updating governance artifacts automatically.

**Setup:**
```bash
# Terminal 1: Coding Agent
cline

# Terminal 2: Governance Script
python governance_watcher.py --workspace /path/to/workspace
```

**Pros:**
- Automated, no manual intervention
- Can integrate with existing LBE runtime
- Can use BirdEye MCP
- Real-time monitoring

**Cons:**
- Requires development
- Less flexible than agent-based approach

### Option 3: BirdEye MCP Tool

A BirdEye MCP tool that provides governance subagent capabilities as a service.

**Setup:**
```bash
# Coding agent calls governance tools via MCP
cline --mcp-tools governance
```

**Pros:**
- Integrated with existing BirdEye infrastructure
- Can be called from any client
- Centralized governance logic

**Cons:**
- Requires BirdEye development
- May add latency

## Connection to Current LBE Blockers

The current LBE workspace has **exactly this problem**:

- Backend has 880 commits but machine gate is `BLOCKED_BY_SOURCE_CONTRADICTION`
- Textual TUI was classified as PREVIEW/synthetic but documentation wasn't updated fast enough
- Sep 5 locked contract wasn't implemented but no governance process caught the drift
- 7+ consecutive CI failures from governance drift

**A governance subagent running in parallel would have:**
- ✅ Caught the Textual/Cline surface contradiction earlier
- ✅ Flagged the missing structural UI implementation immediately
- ✅ Kept CURRENT_STATUS.md aligned with machine gate state
- ✅ Created acceptance checkpoints for each completed slice
- ✅ Prevented the 7+ consecutive CI failures by catching drift early

## Next Steps

### 1. Choose Implementation Option

**Recommended:** Option 1 (Separate Cline Session)
- Easiest to set up
- Uses existing infrastructure
- Can be tested immediately

### 2. Define Communication Protocol

**File-based approach:**
```
/workspace/.governance/
├── intent_queue.json       # Coding agent writes, governance reads
├── completion_queue.json   # Coding agent writes, governance reads
├── approval_queue.json     # Governance writes, coding agent reads
└── contradiction_alerts.json  # Governance writes, coding agent reads
```

**MCP-based approach:**
- Use BirdEye MCP tools for communication
- More structured, less error-prone
- Requires BirdEye development

### 3. Test with Current Active Slice

Run both agents on `FINAL_PRODUCT_SOURCE_RECONCILIATION`:

**Coding Agent Tasks:**
- Implement structural LBE shell in Cline CLI
- Fix session mode in launcher
- Remove binary from git
- Prove end-to-end path

**Governance Subagent Tasks:**
- Track each intent
- Update PROJECT_INDEX.md
- Update implementation-gates.json
- Update CURRENT_STATUS.md
- Create acceptance checkpoints
- Catch contradictions early

### 4. Integrate with BirdEye MCP

Governance subagent can use BirdEye for:
- Workspace queries
- Memory access
- Skills retrieval
- Cross-repository coordination

## Success Criteria

The dual-agent pattern is successful when:

- ✅ No documentation drift between coding and governance
- ✅ Gate state always matches implementation
- ✅ Contradictions caught within 1 interaction cycle
- ✅ Acceptance checkpoints created at every slice completion
- ✅ CI failures prevented by early contradiction detection
- ✅ Final product acceptance closes without blockers

## Files Created

1. **`public/governance-subagent.html`** - Interactive visualization of the dual-agent pattern
2. **`GOVERNANCE_SUBAGENT.md`** - Complete specification document
3. **`DUAL_AGENT_IMPLEMENTATION.md`** - This implementation guide

## How to Access

### Via Landing Page
```bash
npm run dev
# Open http://localhost:5173
# Click "Dual-Agent Governance Pattern" card
```

### Direct Access
Open `public/governance-subagent.html` in browser

## Summary

The dual-agent governance pattern solves the fundamental problem of coding agents forgetting governance documentation. By running a dedicated governance subagent in parallel, we ensure:

- Intent is always tracked
- Documentation is always current
- Gate state always matches implementation
- Contradictions are caught immediately
- Acceptance checkpoints are created automatically
- Final product acceptance can close

This pattern is **ready for implementation** and directly addresses the current LBE blockers.

---

**Built for the Lockstep Boundary Engine ecosystem**  
**Solves the documentation drift problem**  
**Ready for immediate implementation**
