# LBE × Cline Recovery Seam Analysis

## Executive Summary

The `cline/` directory tree is **missing** from `C:\LBE-TUI-Lab\`. No deletion authorization was recorded in CLEANUP_PLAN.md Phase 3. However, the npm package `@cline/agents@0.0.75` is present in `cline_worker/node_modules/` and provides the actual runtime dependency.

**Recovery Path:** Option A (bounded adapter) is the smallest safe seam — install `@cline/agents@0.0.75` into a bounded `cline/` adapter directory with a manifest recording the composition. This does not require restoring the full historical Cline workspace.

---

## Current Dependency State

### Pinned Cline Repository & Commit

| Field | Value |
|-------|-------|
| Repository | `cline/cline` |
| Commit | `952df213ee654633fb3f7abda23a1c1b24e92d7f` |
| Source Mode | worktree (check/prove), origin/main (build/package) |
| Upstream Status | ✅ ACCESSIBLE |

### Exact Cline Files Currently Inspected/Reused

Five runtime/interactive files from `apps/cli/src/runtime/`:

```
✓ apps/cli/src/runtime/run-interactive.ts (27,551 B)
✓ apps/cli/src/runtime/interactive/session-runtime.ts (27,576 B)
✓ apps/cli/src/runtime/interactive/approvals.ts (1,788 B)
✓ apps/cli/src/runtime/session-events.ts (4,750 B)
✓ apps/cli/src/runtime/tool-policies.ts (2,351 B)
```

**Note:** These are the interactive session mechanics only — not the full Cline TUI, not the CLI shell, not the hub transport.

### Current Backend Packaging/Build/Install Owners

| Owner | Path | Role |
|-------|------|------|
| `lbe_guard_inspector` Python pkg | `C:\Agents-Memory-Tool-v6-integration` | v2.0.3, sole runtime authority |
| `@letterblack/lbe-cline-worker` | `lbe_guard_inspector\runtime\cline_worker\` | Node worker that hosts Cline agent runtime |
| `@cline/agents` npm package | `cline_worker\node_modules\@cline\agents\` | v0.0.75 — pinned, installed |
| `cline_worker\worker.mjs` | `lbe_guard_inspector\runtime\cline_worker\worker.mjs` | Imports `{ AgentRuntime, createAgentRuntime }` from `@cline/agents` |
| Rust client binary | `C:\LBE-TUI-Lab\target\release\lbe.exe` | Reference/integration only |

**Acquisition Method:** npm package `@cline/agents` v0.0.75 (already installed locally in cline_worker). The `run-cline-lbe.ps1` launcher falls back to system-installed cline npm binary.

---

## Current Missing Modules

⚠️ **Missing:** The `cline/` directory tree (full git checkout) is missing from `C:\LBE-TUI-Lab\`. No deletion authorization was recorded.

✅ **Present:** The npm package `@cline/agents` is present locally in `cline_worker` but NOT in `LBE-TUI-Lab`.

**Expected Local Location:**
```
C:\LBE-TUI-Lab\cline\  (intended bounded adapter location,
per .gitignore and CLEANUP_PLAN.md Phase 3 Option A)
```

---

## Authority Boundaries

### Minimum Cline Source/Mechanics Set Needed

| Capability | Source | LBE Authority Boundary |
|------------|--------|------------------------|
| Terminal shell | Rust TUI (src/) | **LBE owns rendering** |
| Provider/model UX | `@cline/agents` npm (v0.0.75) | **LBE owns provider config via providers.json** |
| Conversation timeline | session-events.ts (event bridge) | **LBE owns session identity** |
| Input/composer | run-interactive.ts (input handling) | **LBE owns validation** |
| Event projection | session-events.ts + worker.mjs | **LBE owns projection schema** |
| Session interaction | session-runtime.ts (start/send/abort) | **LBE owns session lifecycle** |
| Cancellation/steering | worker.mjs (control.cancel) | **LBE owns cancel policy**; control.steer is explicitly unsupported |

### Explicitly Excluded Native Cline Authority

| Authority | LBE Owner |
|-----------|-----------|
| Workspace mutation | `lbe_guard_inspector` ToolRegistry |
| Shell/process execution | LBE governed dispatcher |
| MCP authority | BirdEye MCP through LBE |
| Session persistence | LBE session service |
| Approval authority | LBE authorization |
| Receipt/evidence authority | LBE evidence service |
| Completion authority | LBE completion truth |

---

## Dependency Composition Map

```
LBE Backend (Python)
C:\Agents-Memory-Tool-v6-integration
Sole runtime authority · v2.0.3 · Session/governance/evidence/completion owner
  ↓
@letterblack/lbe-cline-worker
lbe_guard_inspector\runtime\cline_worker\
Node worker hosting Cline agent runtime · Imports from @cline/agents@0.0.75
  ↓
@cline/agents npm package
cline_worker\node_modules\@cline\agents\ (v0.0.75)
Pinned, installed · Provides AgentRuntime, createAgentRuntime
  ↑
Rust TUI Client
C:\LBE-TUI-Lab\target\release\lbe.exe
Reference/integration only · Not promoted to final-product authority
  ?
cline/ Directory (Bounded Adapter) — MISSING
C:\LBE-TUI-Lab\cline\
Intended bounded adapter location · No deletion authorization recorded
```

---

## Recovery Options

### Option A: npm @cline/agents into bounded cline/ adapter (RECOMMENDED)

**SMALLEST SAFE RECOVERY SEAM**

Install `@cline/agents@0.0.75` into a bounded `cline/` adapter directory containing ONLY:
- `package.json` (pinning `@cline/agents@0.0.75`)
- The 5 reference files from upstream (read-only, not executed)
- A bounded adapter manifest recording the composition seam

**Do NOT:**
- Restore the full historical cline/ workspace
- Copy node_modules into LBE-TUI-Lab

**Files That Would Need Change:**
```
+ C:\LBE-TUI-Lab\cline\package.json (new, pinning @cline/agents)
+ C:\LBE-TUI-Lab\cline\ADAPTER-MANIFEST.md (new, recording seam)
~ C:\LBE-TUI-Lab\run-cline-lbe.ps1 (remove system 'cline' fallback)
~ C:\LBE-TUI-Lab\README.md (reconcile conflicting identity statements)
~ C:\LBE-TUI-Lab\.gitignore (confirm /cline/ entries)
~ C:\LBE-TUI-Lab\agent.md (update key paths table if needed)
```

### Option B: git clone full Cline repository

```bash
git clone --depth 1 cline/cline @ pinned commit → bounded
adapter extraction (full source, larger footprint)
```

**Not Recommended:** Larger footprint, unnecessary source, potential for confusion about what is actually used.

### Option C: Keep npm-only, no local cline/ tree

The npm package `@cline/agents` is already present in `cline_worker`. `LBE-TUI-Lab` only needs the Rust projection layer.

**Consider:** This leaves the `cline/` directory question unresolved and may cause confusion about the intended architecture.

---

## Authority Risks

### ⚠️ Risk 1: No Proven Authorization for Deletion
CLEANUP_PLAN.md Phase 3 decision is unrecorded. The decision line says "Decision needed from owner" but no owner decision was recorded.

### ⚠️ Risk 2: Rust Must NOT Be Promoted
Rust must NOT be promoted merely because it still runs. The Rust client is reference/integration only.

### ⚠️ Risk 3: Conflicting README Statements
LBE-TUI-Lab README has conflicting statements:
- One version says "LBE-NATIVE INTERFACE (NOT Cline)"
- Another says "Cline-based user-facing product surface"

README must be reconciled before any source change.

### ⚠️ Risk 4: Undeclared External Dependency
The system-installed 'cline' binary fallback in `run-cline-lbe.ps1` creates an undeclared external dependency.

---

## Acceptance Commands

```bash
# Verify npm package loads
node -e "require('@cline/agents')" --from cline_worker/

# Verify Rust still compiles, unmodified
cargo check

# Verify LBE runtime still functions
python -m lbe_guard_inspector.cli --format json session list

# Verify no untracked debris
git status --short on LBE-TUI-Lab
```

---

## Structured Summary

### Current Cline Dependency Owner
```
@letterblack/lbe-cline-worker (Python package lbe_guard_inspector,
runtime/cline_worker/) — npm @cline/agents v0.0.75
```

### Pinned Upstream Revision
```
cline/cline @ 952df213ee654633fb3f7abda23a1c1b24e92d7f
(5 runtime files inspected, upstream confirmed accessible)
```

### Required Source Modules
```
@cline/agents@0.0.75 (npm package — already installed in cline_worker)
+ 5 upstream runtime files for reference/validation only:
  run-interactive.ts, session-runtime.ts, approvals.ts,
  session-events.ts, tool-policies.ts
```

### Current Missing Modules
```
The cline/ directory tree (full git checkout) is missing from
C:\LBE-TUI-Lab\. No deletion authorization was recorded.
The npm package @cline/agents is present locally in cline_worker
but NOT in LBE-TUI-Lab.
```

---

## Key Recommendation

**Option A — Install @cline/agents@0.0.75 into a bounded cline/ adapter directory** in `C:\LBE-TUI-Lab\` with a manifest recording the composition, and remove the undeclared system-cline fallback from `run-cline-lbe.ps1`.

This does not require restoring the full historical Cline workspace, does not modify Rust, and does not change the product architecture (LBE = product, Cline = embedded, Rust = reference).

---

## Document Metadata

- **Date:** 2026-09-18
- **Classification:** RECOVERY/COMPOSITION SEAM ANALYSIS
- **Authority:** LBE governance / Cline dependency analysis
- **Status:** ANALYZED — RECOVERY PATH IDENTIFIED

---

**Built for the Lockstep Boundary Engine ecosystem**  
**Aligned with GPT-Knowledge Industrial Dark system**  
**Documents the LBE × Cline composition seam and recovery path**
