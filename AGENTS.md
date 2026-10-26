# Babel Lab — Repository Instructions

Use **Babel** as the project-facing name.

Shared process, feedback interpretation, research expectations, foundations, conflict handling, and continuity come from the immutable Babel Truth commit pinned in `BABEL_TRUTH.md`. Do not duplicate them here unless Lab needs a real local exception.

## Entry

1. `BABEL_TRUTH.md`
2. pinned Truth `START_HERE.md` / `AGENTS.md` / relevant `FOUNDATIONS.md`
3. ADR 0004 when generic shell implementation/reference boundaries matter
4. local `START_HERE.md`
5. the relevant experiment/code

## Lab boundary

> **Lab is evidence, never authority.**

Use Lab for bounded experiments: interactions, visual systems, progression metaphors, prototype feature ideas, and product concepts that do not yet have a real owning product.

Lab may contain contradictory experiments. Another product does not inherit a Lab design merely because it exists here.

### Generic shell is not an experiment

Lab must not invent a parallel generic Babel UI system. For same-role shell behavior, reconcile against the frozen FIRE G7 implementation reference named in `BABEL_TRUTH.md`: page frame, toolbar geometry, typography roles, common actions, grouped rows, generic surfaces, fields/controls, temporary UI, responsive behavior, focus/accessibility, and motion defaults.

Experiment-specific expression may layer on top when it serves the hypothesis. A deliberate shell divergence is allowed only when that divergence itself is being tested or the experimental product job genuinely requires it.

This is a reference-consumer relationship, not a runtime dependency and not a universal component library.

If the question requires the complete real owning-product workflow, navigation/state relationships, or production interactions to judge honestly, work in the owning product's isolated preview instead of rebuilding its product behavior in Lab.

## Prototype safety

- prefer fake/simulated state unless the hypothesis explicitly needs real data
- never read/write FIRE production storage, schema, or projects
- do not create hidden runtime dependencies on production apps
- do not turn developer controls into implied product mechanics without review
- do not promote a visual metaphor into shared semantics merely because it looks good once
- preserve intentional experimental divergence when the divergence itself is being tested

## Local workflow

For meaningful changes:

**branch → bounded experiment → verify the hypothesis → classify what was learned → clean obsolete experiment code → PR → merge**

Classify results before promotion:
- global transferable lesson → candidate Truth change
- FIRE-specific lesson → `babel-fire`
- future product-specific lesson → that owning product when it exists
- unresolved durable question/conflict → Truth Issue #1

## Current active experiments

- `fire/` — Fire visualization/progression-expression experiment
- `world/` — older World achievement-collection experiment
- `world/context-loop/` — WORLD Phase 1 orientation audition
- root launcher / `shared/lab.css` — Lab host using the frozen Babel shell reference as its generic baseline

Lab does **not** host a replica of FIRE product workflow. It does intentionally consume the generic frozen Babel shell reference so experiments are judged inside already-solved UI fundamentals.

## Definition of done

A Lab pass is complete when the question is clear, production data remains isolated, generic shell behavior starts from the frozen Babel reference, deviations are explicit, findings are classified instead of silently promoted, obsolete experiment code is removed, and any durable unresolved finding is captured through the shared Truth process.
