# Babel Lab — Repository Instructions

Use **Babel** as the project-facing name.

Shared process, feedback interpretation, research expectations, foundations, conflict handling, continuity, bounded product-incubation ownership, and shared-surface concurrency come from the immutable Babel Truth commit pinned in `BABEL_TRUTH.md`. Do not duplicate them here unless Lab needs a real local exception.

## Entry

1. `BABEL_TRUTH.md`
2. pinned Truth `START_HERE.md` / `AGENTS.md` / relevant `FOUNDATIONS.md`
3. ADR 0004 when generic shell implementation/reference boundaries matter
4. ADR 0006 when an existing owning product is being auditioned in Lab or shared-surface concurrency matters
5. local `START_HERE.md`
6. the relevant experiment/code

## Lab boundary

> **Lab is evidence, never authority.**

Use Lab for bounded experiments: interactions, visual systems, progression metaphors, prototype feature ideas, future-product concepts, and deliberately scoped **unproven interaction behavior for an existing owning product** when fake/local state can answer the question honestly.

Lab may contain contradictory experiments. Another product does not inherit a Lab design or behavior merely because it exists here.

For an existing product incubation:
- the owning product keeps doctrine, canonical behavior, runtime/data, specs/migrations, and promoted implementation
- Lab owns only the disposable audition
- use fake/local isolated state by default
- physically validate/reshape freely in Lab
- deliberately promote surviving behavior back into the owning product when real runtime/data/navigation relationships become necessary
- prototype code is not production code merely because the behavior survives

### Generic shell is not an experiment

Lab must not invent a parallel generic Babel UI system. For same-role shell behavior, reconcile against the frozen FIRE G7 implementation reference named in `BABEL_TRUTH.md`: page frame, toolbar geometry, typography roles, common actions, grouped rows, generic surfaces, fields/controls, temporary UI, responsive behavior, focus/accessibility, and motion defaults.

Experiment-specific expression may layer on top when it serves the hypothesis. A deliberate shell divergence is allowed only when that divergence itself is being tested or the experimental product job genuinely requires it.

This is a reference-consumer relationship, not a runtime dependency and not a universal component library.

The Lab **Shell Gallery** is the living visual/device-testable proving/showroom environment for generic shared-UI roles and semantic variants. Presence in the Gallery does not make a pattern canonical. Truth owns cross-app promotion; owning products consume proven grammar deliberately.

The historical FIRE G7 Shell Test remains in FIRE as frozen certification evidence. It is not moved into Lab and is not the Shell Gallery.

## Prototype safety

- prefer fake/simulated state unless the hypothesis explicitly needs real data
- never read/write FIRE production or G7 storage, schema, or projects from a Lab specimen
- do not create hidden runtime dependencies on production apps
- do not turn developer controls into implied product mechanics without review
- do not promote a visual metaphor into shared semantics merely because it looks good once
- preserve intentional experimental divergence when the divergence itself is being tested
- a product-specific Lab audition must be clearly labeled non-canonical and must not become a second authoritative runtime

## Shared-surface concurrency

Product-specific experiment lanes may proceed in parallel when their paths are genuinely disjoint. Shared Lab surfaces require a fresh `main` + open-PR reconciliation before writes.

Treat these as shared unless current authority says otherwise:
- `shared/**`
- `shell/**`
- root launcher/navigation
- `BABEL_TRUTH.md`
- cross-cutting CI/tests that span multiple experiments

Current product-lane examples:
- FIRE Core audition → `fire/core/**`
- Fire visualization → `fire/visualization/**`
- WORLD product experiments → their owned `world/**` paths

A FIRE pass must not silently rewrite WORLD product logic; a WORLD pass must not silently rewrite FIRE Core logic. If a local finding changes a generic shell role, classify it and move the shared question into Shell Gallery/Truth rather than making competing product-local copies.

## Local workflow

For meaningful changes:

**re-read current main/open PRs → branch → bounded experiment → verify the hypothesis → classify what was learned → clean obsolete experiment code → PR → merge**

Classify results before promotion:
- global transferable lesson → candidate Truth change
- FIRE-specific lesson → `babel-fire`
- future product-specific lesson → that owning product when it exists
- unresolved durable question/conflict → Truth Issue #1

## Current active experiments

- `shell/` — Babel Shell Gallery; shared-UI proving/showroom environment with explicit Proven/Candidate/Experimental status
- `fire/visualization/` — Fire visualization/progression-expression experiment
- `fire/core/` — explicitly non-canonical FIRE Core interaction incubation lane; current seed comes from Draft FIRE PR #99
- `world/achievements/` — older collection/discovery experiment
- `world/context-loop/` — WORLD Phase 1 orientation/decision audition
- root / `shared/` — Lab host using the frozen Babel shell reference as its generic baseline

Lab does **not** own FIRE or WORLD product authority. It does intentionally host bounded product auditions under explicit ownership while using already-solved generic shell fundamentals.

## Definition of done

A Lab pass is complete when the question is clear, production data remains isolated, generic shell behavior starts from the frozen Babel reference, deviations are explicit, product/path ownership is respected, findings are classified instead of silently promoted, obsolete experiment code is removed, and any durable unresolved finding is captured through the shared Truth process.
