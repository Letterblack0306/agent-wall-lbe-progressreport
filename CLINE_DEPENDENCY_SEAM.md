# LBE × Cline Composition Seam — Current Decision

## Current product decision — 2026-09-18

```text
PRODUCT / BRAND               = LBE / LetterBlack
VISIBLE TERMINAL UI           = LBE-owned Rust/Ratatui
HTML / REACT                  = LBE visual/interaction contract + reference
CLINE                          = headless reasoning/provider/model/tool-proposal/continuation mechanics
LBE RUNTIME                   = sole authority
```

The earlier recommendation to recreate a bounded visible `cline/` adapter directory is superseded.

## What is actually required from Cline

The canonical backend already owns the live Cline dependency through:

```text
lbe_guard_inspector/runtime/cline_worker/
@cline/agents@0.0.75
```

That dependency supplies headless agent/runtime mechanics. The final user-facing shell does **not** require a copied/rebranded Cline CLI/OpenTUI tree.

Pinned upstream provenance remains useful for reference/audit:

```text
repository = cline/cline
commit     = 952df213ee654633fb3f7abda23a1c1b24e92d7f
```

Upstream Cline CLI/TUI files may still be inspected for interaction ideas, but they are not product authority and need not be restored merely to provide the visible UI.

## Current canonical composition

```text
USER
  -> lbe
  -> LBE-owned Rust/Ratatui terminal UI
  -> LbeWrapper / RealLbeWrapper
  -> authoritative LBE runtime
  -> headless Cline reasoning/provider/model mechanics
  -> LBE authorization / governed execution
  -> ToolReceipt / evidence
  -> continuation / persistence / validation / completion
  -> truthful Rust terminal projection
```

## Existing LBE work to preserve

### Rust/Ratatui

`C:\LBE-TUI-Lab\src\` is now the selected visible product implementation.

Preserve and adapt:

- existing `LbeWrapper` / `RealLbeWrapper`;
- typed requests/events;
- session/provider/model projections;
- approvals;
- tool/process/evidence/receipt projection;
- PLAN/ACT/AUDIT support;
- terminal compatibility and PTY/ConPTY work.

### HTML / React

Existing HTML/React artifacts remain valuable as the LBE-owned visual and interaction contract.

Reuse:

- header hierarchy;
- one conversation/work timeline;
- [I] composer;
- context indicator;
- collapse/expand interaction;
- LetterBlack Industrial Dark visual language.

Do not reuse:

- hard-coded sessions/provider state;
- simulated execution;
- random timing/context usage;
- fabricated CI/gate/runtime data.

## Cline authority boundary

Cline may provide:

- reasoning/planning;
- provider/model interaction;
- tool proposals;
- continuation;
- response composition.

Cline must not own:

- visible product identity;
- session truth;
- workspace mutation;
- shell/process execution;
- MCP authority;
- approval/authorization;
- ToolReceipt/evidence;
- persistence/recovery;
- validation/completion.

Those remain LBE-owned.

## Current integration defect

The canonical backend integration owner historically contains contradictory assumptions:

```text
some contract checks -> expect bundled Cline CLI/TUI source
build/package path   -> builds/packages Rust lbe.exe
```

The 2026-09-18 product decision resolves the product target:

```text
contract/proof target
=
build/package target
=
installed launcher target
=
LBE-owned Rust/Ratatui client
```

with Cline headless behind the LBE boundary.

## Current recovery seam

The next implementation seam is **not** restoring a visible Cline UI.

It is:

1. reconcile the product integration verifier/builder to the selected Rust client;
2. retain the governed Cline worker dependency already owned by the backend;
3. remove normal-product dependence on a separately installed visible `cline` command;
4. adapt the LBE HTML/React visual contract into Rust without simulated state;
5. prove installed `lbe` in a real TTY/ConPTY terminal.

## Classification

```text
CLINE RUNTIME MECHANICS       = RETAIN / HEADLESS
CLINE PRODUCT UI              = REFERENCE ONLY
LOCAL CLINE UI TREE           = NOT REQUIRED AS PRODUCT SURFACE
RUST/RATATUI                  = CANONICAL VISIBLE PRODUCT IMPLEMENTATION
HTML/REACT                    = VISUAL/INTERACTION REFERENCE
LBE AUTHORITY                 = UNCHANGED
INSTALLED ACCEPTANCE          = OPEN
```
