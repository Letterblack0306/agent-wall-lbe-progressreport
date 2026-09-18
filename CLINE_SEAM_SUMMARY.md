# LBE × Cline Seam Summary — Current Direction

## Current decision

```text
LBE / LetterBlack        = product + visible UI
Rust/Ratatui             = canonical terminal implementation
HTML/React               = visual/interaction reference
Cline                    = headless reasoning/provider/model/continuation mechanics
LBE runtime              = sole authority
```

The earlier bounded-visible-`cline/` Option A recommendation is superseded.

## What remains from Cline

Retain the governed backend dependency:

- `lbe_guard_inspector/runtime/cline_worker/`
- `@cline/agents@0.0.75`
- provider/model/reasoning/continuation mechanics;
- upstream Cline source as reference when useful.

Do not require a copied Cline CLI/OpenTUI tree for the visible product.

## What remains from the LBE UI work

Preserve and promote:

- Rust/Ratatui client and RealLbeWrapper integration;
- HTML/React visual hierarchy and interaction ideas;
- [I] composer;
- unified conversation/work timeline;
- context usage indicator;
- PLAN/ACT/AUDIT;
- LetterBlack Industrial Dark branding.

Reject simulated/hard-coded runtime state.

## Current implementation seam

The canonical product integration owner must make:

```text
contract target
= build target
= package target
= installed launcher target
= Rust/Ratatui LBE client
```

with Cline headless behind LBE.

Final installed TTY/ConPTY acceptance remains open.
