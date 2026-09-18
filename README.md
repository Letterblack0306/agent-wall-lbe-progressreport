# LBE Workspace - Terminal UI Reference Prototypes

This workspace contains **reference prototypes** for the Lockstep Boundary Engine (LBE) terminal UI. These are visual references only and have **NO runtime connection** to the actual LBE system.

## ⚠️ Important Classification

**All artifacts in this workspace are:**
- `REFERENCE_REUSE_INPUT_NOT_FINAL_PRODUCT_AUTHORITY`
- Visual references with hard-coded state
- Not connected to RealLbeWrapper, Cline provider, or BirdEye MCP
- Not suitable for production use without runtime integration

## 📦 What's Included

### 1. Landing Page (`/`)
The main entry point that provides access to all three artifacts with clear classification labels.

### 2. React Terminal Prototype (`/react-terminal.html`)
Interactive terminal UI built with React + TypeScript + Tailwind CSS.

**Features:**
- Command system: `help`, `status`, `repos`, `inspect`, `gate`, `topology`, `audit`, `blockers`, `plan`
- Timeline with expandable entries
- Active process indicator with pulse animation
- Keyboard shortcuts: ↑/↓ for history, Ctrl+K to clear

**Limitations:**
- All state is hard-coded in `terminal-engine.ts`
- No runtime transport (no fetch, WebSocket, PTY, etc.)
- Missing AUDIT mode (canonical requires PLAN/ACT/AUDIT)
- Uses `Math.random()` for simulated delays

### 3. HTML Cockpit (`/cockpit.html`)
Single-file HTML prototype retained as an LBE visual/interaction reference.

**Features:**
- Pure HTML/CSS/JS (no framework dependency)
- Letterblack Industrial Dark system exact palette
- Locked Sep 5 contract structure
- Click-to-expand timeline entries
- Self-contained (can be deployed anywhere)

**Status:**
- Useful visual/interaction reference for the selected Rust/Ratatui client
- Not a selected runtime technology and not runtime proof

### 4. Reconciliation Document (`/reconciliation.html`)
Formal architecture reconciliation between the uploaded React prototype and canonical LBE workspace.

**Contents:**
- Prototype classification and limitations
- What the prototype gets right/wrong
- Correct implementation path
- Missing reconciliation document notice
- Next steps for production implementation

### 5. Cline Dependency Seam Analysis (`/cline-dependency-seam.html`)
Deep analysis of the embedded Cline client dependency, documenting the pinned commit, inspected files, authority boundaries, missing modules, and recovery options.

**Contents:**
- Pinned Cline commit: `952df213ee654633fb3f7abda23a1c1b24e92d7f`
- 5 runtime files inspected from `apps/cli/src/runtime/`
- npm package `@cline/agents@0.0.75` (already installed in cline_worker)
- Missing `cline/` directory analysis
- Authority boundaries (LBE vs Cline vs Rust)
- Historical recovery analysis; visible Cline UI recovery is superseded by the Rust/Ratatui product decision
- Authority risks and acceptance commands

**Status:**
- Analysis complete, recovery path identified
- Visible Cline UI recovery is superseded; Rust/Ratatui is the canonical product client
- Does not require restoring full historical Cline workspace

### 6. Dual-Agent Governance Pattern (`/governance-subagent.html`)
Architecture pattern specification for running a coding agent and governance subagent in parallel. The coding agent focuses on implementation while the governance subagent maintains documentation, tracks intent, manages gate state, and catches contradictions.

**Contents:**
- Problem statement: coding agents forget governance documentation
- Dual-agent architecture visualization
- Interaction protocol (pre-mutation, implementation, post-mutation)
- Hard rules (non-negotiable governance constraints)
- Governance artifacts maintained by subagent
- Implementation pattern with code example
- Connection to current LBE blockers
- Next steps for implementation

**Status:**
- Pattern specified and ready for implementation
- Solves the documentation drift problem
- Can be implemented as separate Cline session, Python script, or BirdEye MCP tool
- Prototype classification and limitations
- What the prototype gets right/wrong
- Correct implementation path
- Missing reconciliation document notice
- Next steps for production implementation

## 🎯 Correct Implementation Path

```
Visual Reference (this workspace)
    ↓
Reuse visual hierarchy / interaction concepts
    ↓
Implement in the selected LBE-owned Rust/Ratatui client
    ↓
Bind to REAL LBE runtime state via LbeWrapper/RealLbeWrapper
    ↓
Use Cline headlessly for reasoning/provider/model continuation
    ↓
Real TTY/ConPTY acceptance
```

## 🚀 How to Use

### Development Mode
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### Production Build
```bash
npm run build
npm run preview
```

### Direct Access
You can also open the HTML files directly:
- `public/react-terminal.html`
- `public/cockpit.html`
- `public/reconciliation.html`

## 📋 Available Commands (React Terminal)

| Command | Description |
|---------|-------------|
| `help` | Show available commands |
| `status` | Display current workspace state |
| `repos` | List all repositories with status |
| `inspect <repo>` | Detailed repository inspection |
| `gate` | Show machine gate state |
| `topology` | Display ecosystem topology |
| `audit` | Run architecture compliance check |
| `blockers` | List active blockers |
| `plan` | Show recommended actions |
| `clear` | Clear timeline |

**Repository names for `inspect`:**
- `LBE-Backend` or `lbe-backend`
- `LBE-Frontend` or `lbe-frontend`
- `GPT-K` or `gpt-k`
- `BirdEye` or `birdeye`

## 🎨 Design System

### Letterblack Industrial Dark Palette
```css
--bg-primary: #0b0b0c
--bg-secondary: #141416
--bg-tertiary: #1c1c1f
--accent-red: #ff3b3b
--border: #2a2a2d
--text-main: #e1e1e6
--text-muted: #8e8e93
--green: #22c55e
--yellow: #f59e0b
--blue: #3b82f6
--purple: #a855f7
--cyan: #06b6d4
```

### Typography
- Font: JetBrains Mono, Fira Code, Consolas (monospace)
- Base size: 13px
- Line height: 1.5

### Visual Hierarchy
- **Primary (high visibility):** LBE identity, workspace, conversation, execution, composer
- **Secondary (muted):** Model, mode, git branch, diff, context metadata, footer

## 🔍 Architecture Compliance

### ✅ What's Implemented
- Persistent header with LBE identity, workspace, model, mode
- Git branch and diff status
- Context window usage bar (real representation, though hard-coded)
- Machine gate status with color-coded states
- Provider connection state
- Ecosystem strip with 4 repositories and MCP metrics
- Execution timeline with collapsed/expanded entries
- Active process projection (max 3 runtime event lines)
- [I] composer with active-process motion
- Footer bar with context usage, mode, and shortcuts

### ❌ What's Missing for Production
- Runtime transport (no fetch/WebSocket/PTY)
- Real state from LBE runtime
- Cline provider binding
- BirdEye MCP integration
- AUDIT mode (only PLAN/ACT implemented)
- TTY/ConPTY terminal integration

## 📊 Ecosystem Status (Hard-coded)

| Repository | Commits | Branches | CI | Gate | Status |
|------------|---------|----------|----|----|--------|
| LBE-Backend | 880 | 77 | FAIL | BLOCKED | ❌ |
| LBE-Frontend | 57 | 2 | N/A | IN_PROGRESS | 🔄 |
| GPT-Knowledge | 821 | 10 | PASS | ACTIVE | ✅ |
| BirdEye | 48 | 5 | PASS | STABLE | ✅ |

**MCP Topology:** historical/reference figure only; re-verify before current claims

## 🎯 Next Steps for Production

1. **Reconcile the canonical Rust product build/package/launcher owner**
   - Check validate workflow logs #616-622
   - 7+ consecutive failures on main

2. **Implement/complete the locked LBE shell in Rust/Ratatui**
   - Reuse the existing HTML/React visual contract
   - Header + timeline + context bar + [I] composer using real state

3. **Reconcile PLAN/ACT/AUDIT with backend mode/policy/permission owners**

4. **Keep Cline headless and remove visible/system Cline UI dependency from the normal product path**

5. **Prove End-to-End Path** (MEDIUM effort)
   - Session → provider → tool → receipt → evidence → completion → TUI projection

## 📁 File Structure

```
lbe-workspace/
├── public/
│   ├── react-terminal.html         # React terminal prototype
│   ├── cockpit.html                # HTML cockpit prototype
│   ├── reconciliation.html         # Architecture reconciliation
│   ├── cline-dependency-seam.html  # Cline dependency analysis
│   └── governance-subagent.html    # Dual-agent governance pattern
├── src/
│   ├── App.tsx                # Landing page
│   ├── main.tsx               # Entry point
│   └── index.css              # Global styles
├── index.html                 # HTML template
├── package.json               # Dependencies
├── vite.config.ts             # Vite configuration
├── tsconfig.json              # TypeScript config
├── tailwind.config.js         # Tailwind config
├── TERMINAL_UI.md             # Original documentation
├── CLINE_DEPENDENCY_SEAM.md   # Cline dependency analysis (markdown)
├── GOVERNANCE_SUBAGENT.md     # Dual-agent governance pattern (markdown)
└── README.md                  # This file
```

## 🔗 Related Documentation

- `TERMINAL_UI.md` - Original terminal UI documentation
- `AUDIT_REPORT.md` - Full ecosystem audit report
- `CLINE_DEPENDENCY_SEAM.md` - Cline dependency recovery seam analysis
- `GOVERNANCE_SUBAGENT.md` - Dual-agent governance pattern specification
- `reconciliation.html` - Architecture reconciliation document
- `cline-dependency-seam.html` - Interactive Cline dependency analysis
- `governance-subagent.html` - Interactive dual-agent governance pattern

## 📝 Notes

- This workspace was created as a task/prototype workspace
- All state is simulated for demonstration purposes
- The React prototype demonstrates the visual hierarchy and interaction patterns
- The HTML cockpit is closer to the canonical production direction
- Production implementation must bind to RealLbeWrapper and prove acceptance in real TTY/ConPTY

## 🏷️ Classification

**Workspace Type:** REFERENCE_REUSE_INPUT_NOT_FINAL_PRODUCT_AUTHORITY  
**Date:** 2026-09-18  
**Status:** VISUAL REFERENCE ONLY

---

**Built for the Lockstep Boundary Engine ecosystem**  
**Aligned with GPT-Knowledge Industrial Dark system**  
**Implements locked September 5, 2026 terminal interaction contract (visual reference only)**
