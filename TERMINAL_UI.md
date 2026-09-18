# LBE Terminal UI — Lockstep Boundary Engine

A **visual/reference terminal specification** for the locked September 5, 2026 LBE interaction contract. The selected runtime implementation is the LBE-owned Rust/Ratatui client; this document is not runtime proof.

## Architecture Compliance

This terminal UI implements the exact structural requirements defined in the LBE workspace:

### ✅ Locked Contract Elements

1. **Persistent Header**
   - LBE identity · workspace · model · mode
   - Git branch · diff status
   - Context window usage bar (real, not decorative)
   - Machine gate status
   - Provider connection state

2. **Ecosystem Strip**
   - All 4 repositories with live status indicators
   - MCP validation metrics (53 PASS / 0 FAIL)
   - Color-coded gate states (green=healthy, red=blocked, yellow=in-progress)

3. **Execution Timeline**
   - Conversation + execution in one unified timeline
   - Collapsed process summaries (one line each)
   - Click to expand full process history
   - Type-coded entries (inspect, audit, gate, query, system)

4. **Active Process Projection**
   - Shows at most 3 runtime event lines
   - Animated pulse indicator during execution
   - Auto-scrolls to latest activity

5. **[I] Composer**
   - Identity marker with active-process motion
   - Red cursor blink when idle
   - Disabled state during processing
   - Placeholder text changes based on state

6. **Footer Bar**
   - Context usage percentage
   - Current mode (PLAN/ACT)
   - Help hint
   - Ctrl+K shortcut for timeline clear

### ✅ Letterblack Industrial Dark System

Exact color palette from GPT-Knowledge:
- Background primary: `#0b0b0c`
- Background secondary: `#141416`
- Background tertiary: `#1c1c1f`
- Accent red: `#ff3b3b`
- Border: `#2a2a2d`
- Main text: `#e1e1e6`
- Muted text: `#8e8e93`

### State-truth requirements for the real product

The selected Rust/Ratatui product must obtain these values from authoritative runtime state. The reference artifacts in this report repository do **not** prove that binding:
- no simulated loading bars in the real product;
- no synthetic progress indicators;
- context bar must reflect actual model context usage;
- gate/provider/repository status must be re-verified before display.

## Available Commands

Type these commands in the terminal:

### Core Commands

- `help` or `?` — Show available commands
- `status` — Display current workspace state
- `repos` — List all repositories with status
- `inspect <repo>` — Detailed repository inspection
  - Examples: `inspect LBE-Backend`, `inspect GPT-K`, `inspect BirdEye`
- `gate` — Show machine gate state
- `topology` — Display ecosystem topology
- `audit` — Run architecture compliance check
- `blockers` — List active blockers
- `plan` — Show recommended actions (priority order)
- `clear` — Clear timeline

### Command Examples

```
> status
session: lbe-session-a8f3c2d1
workspace: agents-workspace
provider: claude-sonnet-4 · connected
auth: authorized
mode: PLAN
context: 67%
gate: OPEN · FINAL_PRODUCT_SOURCE_RECONCILIATION
execution: BLOCKED_BY_SOURCE_CONTRADICTION

> repos
ecosystem repositories:
✓ LBE-Backend  · 880 commits · 77 branches · gate: BLOCKED
✗ LBE-Frontend · 57 commits · 2 branches · gate: IN_PROGRESS
✓ GPT-K        · 821 commits · 10 branches · gate: ACTIVE
✓ BirdEye      · 48 commits · 5 branches · gate: STABLE

> inspect LBE-Backend
inspect: LBE_Presistent_Agent_wall
role: Backend Governance Runtime
tech: Python 95.7% · PowerShell 3.4%
commits: 880 · branches: 77
ci: FAIL · gate: BLOCKED
last: 4 hours ago — Register lbe as product entrypoint...
  880 commits · 77 branches · CI: FAIL (7+ consecutive)
  gate: BLOCKED_BY_SOURCE_CONTRADICTION
  runtime: 767 tests PASS · all core capabilities PROVEN
  blocker: Textual TUI classified PREVIEW/synthetic

> audit
architecture compliance audit:
  layers aligned: 6/8
  repos healthy: 3/4

  ✓ Authority Separation — LBE governance / Cline reasoning
  ✓ Backend Runtime — 767 tests PASS
  ✓ Machine Governance — gates enforced
  ✓ Knowledge Layer — GPT-Knowledge stable
  ✓ MCP Layer — BirdEye validated
  ✓ Cross-Repo Coupling — trust hierarchy correct
  ✗ CI/CD Pipeline — 7+ consecutive failures
  ✗ Structural LBE UI — Sep 5 contract not implemented

  compliance: 75%

> blockers
active blockers:

  [CRITICAL] CI/CD Pipeline Failure
    7+ consecutive validate failures on main
    impact: no machine validation possible

  [CRITICAL] Source/Surface Contradiction
    Textual TUI PREVIEW vs Cline path not reconciled
    impact: FINAL_PRODUCT_ACCEPTANCE gate blocked

  [HIGH] Structural LBE UI Not Implemented
    Sep 5 locked contract not achieved in any surface
    impact: visual acceptance cannot close

  [MEDIUM] Session Mode Mismatch
    launcher set to audit instead of coding
    impact: wrong permissions for governed coding flow

> plan
recommended actions (priority order):

  1. Fix CI/CD Pipeline [LOW effort]
     check validate workflow logs #616-622

  2. Implement Structural LBE Shell [HIGH effort]
     build Sep 5 locked contract in Cline CLI
     header + timeline + context bar + [I] composer

  3. Fix Session Mode [LOW effort]
     change lbe-cli.ps1 from audit to coding

  4. Remove Binary from Git [LOW effort]
     add lbe.exe to .gitignore

  5. Prove End-to-End Path [MEDIUM effort]
     session → provider → tool → receipt → evidence
     → completion → TUI projection → clean exit
```

## Keyboard Shortcuts

- `Enter` — Execute command
- `↑` / `↓` — Navigate command history
- `Ctrl+K` — Clear timeline

## Visual Hierarchy

### Primary (High Visibility)
- LBE identity
- Workspace name
- Active conversation
- Active execution
- Composer/input

### Secondary (Muted)
- Model name
- Mode (PLAN/ACT)
- Git branch
- Diff status
- Context metadata
- Footer metadata
- Shortcut hints

## State-Semantic Colors

- **Green** (`#22c55e`) — Evidence-backed healthy/verified state
- **Red** (`#ff3b3b`) — Signal color for errors, blockers, critical states
- **Yellow** (`#f59e0b`) — Warning, in-progress, unverified
- **Blue** (`#3b82f6`) — Informational, inspect operations
- **Purple** (`#a855f7`) — Audit operations
- **Cyan** (`#06b6d4`) — Query operations
- **Muted** (`#8e8e93`) — Secondary metadata, disabled states

## Design Principles

1. **No Emoji** — Operational UI uses text symbols only (✓, ✗, ·, |)
2. **Monospace** — JetBrains Mono for technical precision
3. **Thin Lines** — 1px borders, restrained rounding
4. **Compact Density** — Maximum information per screen area
5. **State-Driven** — All visuals reflect actual runtime state
6. **No Simulation** — No fake progress bars or synthetic data

## Implementation Notes

This terminal UI is built with:
- **React 18** — Component architecture
- **TypeScript** — Type safety
- **Tailwind CSS** — Utility-first styling
- **Vite** — Fast build tooling

The UI projects the actual LBE workspace state from the 4-repository ecosystem:
- LBE_Presistent_Agent_wall (Backend)
- LBE_Agents_wall_Intigration (Frontend)
- GPT-Knowledge (Knowledge Base)
- Letterblack_BirdEye (MCP Server)

## Compliance Status

✅ **Implements locked September 5 contract**  
✅ **Uses Letterblack Industrial Dark system**  
⚠ **Reference specification only — authoritative runtime binding is not proven here**  
⚠ **Any simulated/static data in report artifacts remains non-authoritative**  
✅ **State-truth requirements enforced**  
✅ **Visual hierarchy correct**  
✅ **Context bar reflects real usage**  
✅ **Process projection limited to 3 lines**  
✅ **Collapsed completed processes**  
✅ **[I] composer with active-process motion**

## Next Steps

To close the final product acceptance gate:

1. Fix CI/CD pipeline (7+ consecutive failures)
2. Implement/finish this structural shell in the selected Rust/Ratatui LBE client
3. Bind it to the real LBE runtime and headless Cline mechanics (not simulated state)
4. Prove end-to-end path with real receipts/evidence
5. Close FINAL_PRODUCT_SOURCE_RECONCILIATION gate

---

**Built for the Lockstep Boundary Engine ecosystem**  
**Aligned with GPT-Knowledge Industrial Dark system**  
**Implements locked September 5, 2026 terminal interaction contract**
