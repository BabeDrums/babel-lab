# Babel Lab — Repository Instructions

Use **Babel** as the project-facing name.

Shared process, feedback interpretation, continuity, closeout, and cross-app architecture come from the Truth commit pinned in `BABEL_TRUTH.md`. Keep this file Lab-local.

## Entry

1. `BABEL_TRUTH.md`
2. pinned Truth `START_HERE.md` / `AGENTS.md`
3. relevant `FOUNDATIONS.md` / ADR only when needed
4. local `START_HERE.md`
5. relevant experiment/code
6. current Issue #1 state when unresolved context matters

## Boundary

> **Lab is evidence, never authority.**

Use Lab when the uncertainty is genuinely **what an interaction/product behavior should be** and cheap disposability is useful.

- new-product auditions may live here until they earn an owning repo
- an existing product may audition a bounded unproven interaction here without transferring ownership
- work directly in the owning product when the remaining question depends on real runtime/data/navigation/persistence/migration

Prototype code is never promoted automatically.

## Generic shell / Shell Gallery

Lab does not invent a parallel generic Babel shell. Proven same-role behavior starts from the adopted Truth contract and frozen FIRE reference.

Use **Shell Gallery** for generic UI roles that plausibly need reuse. Label them **Proven / Candidate / Experimental**. Product-specific expression stays local unless repeated evidence earns promotion.

A deliberate shell divergence is allowed only when that divergence is itself the experiment or the product job truly requires it.

No universal runtime component package is earned yet.

## Prototype safety

- prefer fake/local state unless the hypothesis explicitly requires something else
- never read/write FIRE production/G7 storage, schema, or projects from Lab
- do not create hidden runtime dependencies on owning products
- do not turn developer controls into implied product mechanics
- do not promote a visual metaphor into shared semantics because it worked once
- keep product-local experiments inside their owned paths unless a shared need is first classified

## Parallel lanes

Default product-local ownership:
- FIRE Core → `fire/core/**`
- WORLD → `world/**`

Shared integration surfaces include:
- root launcher/navigation
- `shared/**`
- `shell/**`
- `BABEL_TRUTH.md`
- broad Lab authority/handoff files
- `.github/**`
- tests spanning multiple experiment families

Before a shared-surface write—and again before merge—refresh Lab `main`, inspect open PRs/changed files, and serialize overlap. One lane must not silently rewrite another lane's product logic.

## Local workflow

**refresh → branch → bounded experiment → verify → classify learning → remove obsolete experiment code → PR → recheck overlap → merge**

Classify outcomes:
- cross-app transferable → Truth candidate
- owning-product specific → owning product
- future-product specific → that product once it exists
- durable unresolved → Truth Issue #1

## Done

A Lab pass is done when:
- the question/hypothesis is explicit
- production data remains isolated
- proven shell roles start from the shared reference
- intentional deviations are labeled
- product/shared ownership is respected
- obsolete experiment code is removed
- shared-surface overlap is reconciled
- durable unresolved findings are captured
