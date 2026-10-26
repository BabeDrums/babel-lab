# Babel Lab — Repository Instructions

Use **Babel** as the project-facing name.

Shared process, feedback interpretation, research expectations, foundations, conflict handling, continuity, and conversation-closeout rules come from the immutable Babel Truth commit pinned in `BABEL_TRUTH.md`. Do not duplicate them here unless Lab needs a real local exception.

## Entry

1. `BABEL_TRUTH.md`
2. pinned Truth `START_HERE.md` / `AGENTS.md` / relevant `FOUNDATIONS.md`
3. relevant Truth ADRs when the task depends on them
4. local `START_HERE.md`
5. the relevant experiment/code
6. relevant current Continuity Buffer items

## Lab boundary

> **Lab is evidence, never authority.**

Use Lab for bounded experiments: interactions, visual systems, progression metaphors, prototype feature ideas, new-product auditions, and clearly scoped interaction auditions for an existing real product when cheap/disposable validation is useful.

Lab may contain contradictory experiments. Another product does not inherit a Lab design merely because it exists here.

A bounded owning-product audition does **not** transfer product ownership to Lab. The owning app keeps doctrine, canonical behavior, runtime/data, and promoted implementation. Lab owns only the disposable specimen until deliberate promotion.

### Generic shell is not an experiment

Lab must not invent a parallel generic Babel UI system. For same-role shell behavior, reconcile against the currently adopted Babel Truth shell contract and its named frozen FIRE G7 implementation reference: page frame, toolbar geometry, typography roles, common actions, grouped rows, generic surfaces, fields/controls, temporary UI, responsive behavior, focus/accessibility, and motion defaults.

The Lab Shell Gallery is the living visual/device-testable proving environment for generic shared-UI roles and reusable-looking candidates. Presence in the Gallery does not make a candidate canonical; Truth owns cross-app promotion.

Experiment-specific expression may layer on top when it serves the hypothesis. A deliberate shell divergence is allowed only when that divergence itself is being tested or the experimental product job genuinely requires it.

This is a reference-consumer relationship, not a universal runtime component dependency.

## Owning-product incubation boundary

A Lab step is optional.

Use a bounded Lab lane when the uncertainty is genuinely **what the interaction/product behavior should be** and cheap disposability is valuable.

Work directly in the owning product when the behavior is already sufficiently proven or the remaining question depends on real owning-product navigation, persistence, schema, runtime/data relationships, migration, or production integration.

Current FIRE example:
- `fire/core/` may audition unproven FIRE Core interaction slices with fake/local state
- `babel-fire` still owns FIRE doctrine, canonical behavior, runtime/data, and promoted implementation
- FIRE's historical frozen G7 Shell Test stays in FIRE as certification evidence
- surviving Lab behavior must be deliberately implemented/promoted back into FIRE; Lab prototype code is not production merely because the interaction survives review

## Prototype safety

- prefer fake/simulated state unless the hypothesis explicitly needs real data
- never read/write FIRE production storage, schema, or projects from Lab
- do not create hidden runtime dependencies on production apps
- do not turn developer controls into implied product mechanics without review
- do not promote a visual metaphor into shared semantics merely because it looks good once
- preserve intentional experimental divergence when the divergence itself is being tested
- keep product-local experiments inside their owned paths unless a genuinely shared need is first classified

## Parallel lanes / shared surfaces

FIRE- and WORLD-specific Lab work may proceed in parallel when their write scopes are disjoint.

Default product-local lanes currently include:
- FIRE Core incubation → `fire/core/**`
- WORLD product audition → `world/**`

Treat these as shared integration surfaces unless current authority explicitly says otherwise:
- root launcher / root navigation
- `shared/**`
- `shell/**`
- `BABEL_TRUTH.md`
- broad Lab authority/handoff files
- `.github/**`
- tests spanning multiple experiment families

Before a shared-surface write, refresh Lab `main`, inspect relevant open PRs/changed filenames, and serialize/reconcile overlap rather than racing another lane. Product-specific findings that imply a shared change should be classified first instead of reaching across ownership casually.

## Local workflow

For meaningful changes:

**branch → bounded experiment → verify the hypothesis → classify what was learned → clean obsolete experiment code → PR → merge**

Classify results before promotion:
- global transferable lesson → candidate Truth change
- FIRE-specific lesson → `babel-fire`
- future product-specific lesson → that owning product when it exists
- unresolved durable question/conflict → Truth Issue #1

Before merge, refresh current `main` and relevant open PRs again. A branch that was safe when created may no longer be safe at merge time.

## Current active areas

- **Shell Gallery — `shell/`**: living generic-UI proving/showroom environment with explicit Proven / Candidate / Experimental status.
- **Fire Lab — `fire/`**: FIRE-bound experiment container.
  - `fire/visualization/` — Fire visualization/progression-expression experiment.
  - `fire/core/` — non-canonical FIRE Core incubation lane.
- **World Lab — `world/`**: WORLD-bound experiment container.
  - `world/achievements/` — collection/discovery experiment only.
  - `world/context-loop/` — WORLD Phase 1 orientation/next-step audition.
- **Root + `shared/`**: Lab host chrome consuming the frozen Babel shell reference rather than defining an independent Lab design system.

## Definition of done

A Lab pass is complete when the question is clear, production data remains isolated, generic shell behavior starts from the adopted frozen Babel reference, deviations are explicit, findings are classified instead of silently promoted, obsolete experiment code is removed, shared-surface concurrency is reconciled, and any durable unresolved finding is captured through the shared Truth process.
