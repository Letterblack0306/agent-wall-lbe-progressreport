# LBE Workspace - Cline Dependency Seam Analysis

## Overview

This workspace now includes a comprehensive **Cline Dependency Seam Analysis** that documents the embedded Cline client dependency, recovery options, and authority boundaries.

## What Was Added

### 1. Interactive HTML Analysis (`/cline-dependency-seam.html`)

A fully interactive, tabbed analysis document that covers:

**Current Dependency State:**
- Pinned Cline commit: `952df213ee654633fb3f7abda23a1c1b24e92d7f`
- 5 runtime files inspected from `apps/cli/src/runtime/`
- npm package `@cline/agents@0.0.75` (already installed)
- Missing `cline/` directory analysis

**Authority Boundaries:**
- Minimum Cline source/mechanics set needed
- Explicitly excluded native Cline authority
- LBE vs Cline vs Rust ownership map

**Dependency Composition Map:**
- Visual flow showing LBE Backend → cline_worker → @cline/agents → Rust TUI
- Missing `cline/` directory highlighted

**Recovery Options:**
- **Option A (Recommended):** npm @cline/agents into bounded cline/ adapter
- **Option B:** git clone full Cline repository (not recommended)
- **Option C:** Keep npm-only, no local cline/ tree

**Authority Risks:**
- No proven authorization for deletion
- Rust must NOT be promoted
- Conflicting README statements
- Undeclared external dependency

**Acceptance Commands:**
- Verification steps for npm package, Rust compilation, LBE runtime

### 2. Markdown Documentation (`CLINE_DEPENDENCY_SEAM.md`)

Complete markdown version of the analysis with:
- Executive summary
- Detailed tables and code blocks
- File structure recommendations
- Recovery path documentation

### 3. Landing Page Integration

The main landing page (`/`) now includes:
- New card for "Cline Dependency Seam Analysis"
- Purple color coding for RECOVERY/COMPOSITION classification
- Quick stats: pinned commit, npm package, missing directory, recovery option
- Link to the interactive analysis

## How to Access

### Option 1: Via Landing Page
1. Run `npm run dev`
2. Open `http://localhost:5173`
3. Click the "Cline Dependency Seam Analysis" card

### Option 2: Direct Access
Open `public/cline-dependency-seam.html` directly in a browser

## Key Findings

### ✅ What's Working
- npm package `@cline/agents@0.0.75` is installed in `cline_worker/node_modules/`
- 5 upstream runtime files are accessible and inspected
- LBE backend runtime is functional
- Rust TUI compiles successfully

### ⚠️ What's Missing
- `cline/` directory tree is missing from `C:\LBE-TUI-Lab\`
- No deletion authorization was recorded
- README has conflicting identity statements
- System-installed 'cline' binary creates undeclared dependency

### 🎯 Recommended Recovery Path

**Option A — Bounded Adapter (Smallest Safe Seam)**

1. Create `C:\LBE-TUI-Lab\cline\` directory
2. Add `package.json` pinning `@cline/agents@0.0.75`
3. Add `ADAPTER-MANIFEST.md` recording the composition seam
4. Copy 5 reference files (read-only, not executed)
5. Update `run-cline-lbe.ps1` to remove system 'cline' fallback
6. Reconcile README.md conflicting statements

**This does NOT require:**
- Restoring full historical Cline workspace
- Copying node_modules into LBE-TUI-Lab
- Modifying Rust code
- Changing product architecture

## Authority Boundaries Summary

### LBE Owns:
- Session/workspace identity
- Provider configuration (via providers.json)
- Session lifecycle
- Validation
- Projection schema
- Cancel policy
- Workspace mutation
- Shell/process execution
- MCP authority
- Session persistence
- Approval authority
- Receipt/evidence authority
- Completion authority

### Cline Provides:
- Terminal shell rendering (via Rust TUI)
- Provider/model UX
- Conversation timeline (event bridge)
- Input/composer handling
- Event projection
- Session interaction (start/send/abort)
- Cancellation/steering (control.cancel only)

### Rust TUI:
- Reference/integration only
- NOT promoted to final-product authority
- Must NOT be promoted merely because it still runs

## Files Created/Modified

### New Files:
- `public/cline-dependency-seam.html` - Interactive analysis
- `CLINE_DEPENDENCY_SEAM.md` - Markdown documentation

### Modified Files:
- `src/App.tsx` - Added cline-seam view and card
- `README.md` - Added documentation for new artifact

## Interactive Features

The HTML analysis includes:
- **Tabbed interface** for different analysis sections
- **Color-coded status indicators** (present, missing, warning, info)
- **Dependency composition map** with visual flow
- **Recovery options** with detailed comparisons
- **Authority risk warnings** with severity levels
- **Acceptance commands** for verification

## Next Steps

After reviewing the analysis:

1. **Decision Required:** Authorize Option A recovery path
2. **Create bounded adapter** in `C:\LBE-TUI-Lab\cline\`
3. **Update launchers** to remove undeclared dependencies
4. **Reconcile README** conflicting statements
5. **Run acceptance commands** to verify
6. **Document decision** in CLEANUP_PLAN.md Phase 3

## Classification

**Document Type:** RECOVERY/COMPOSITION SEAM ANALYSIS  
**Authority:** LBE governance / Cline dependency analysis  
**Status:** ANALYZED — RECOVERY PATH IDENTIFIED  
**Recommendation:** Option A (bounded adapter) — smallest safe seam

---

**Built for the Lockstep Boundary Engine ecosystem**  
**Documents the LBE × Cline composition seam**  
**Provides actionable recovery path with authority boundaries**
