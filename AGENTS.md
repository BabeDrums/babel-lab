# Babel Lab — Repository Instructions

Use **Babel** as the project-facing name.

Shared process, feedback interpretation, research expectations, foundations, conflict handling, and continuity come from the immutable Babel Truth commit pinned in `BABEL_TRUTH.md`. Do not duplicate them here unless Lab needs a real local exception.

## Entry

1. `BABEL_TRUTH.md`
2. pinned Truth `START_HERE.md` / `AGENTS.md` / relevant `FOUNDATIONS.md`
3. local `START_HERE.md`
4. the relevant experiment/code

## Lab boundary

> **Lab is evidence, never authority.**

Use Lab for bounded experiments: interactions, visual systems, progression metaphors, prototype feature ideas, and product concepts that do not yet have a real owning product.

Lab may contain contradictory experiments. Another product does not inherit a Lab design merely because it exists here.

If the question requires the complete real app shell, navigation, state relationships, or product interactions to judge honestly, work in the owning product's isolated preview instead of reconstructing it in Lab.

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
- `world/` — World achievement-collection experiment
- root launcher / `shared/lab.css` — provisional Lab workspace chrome only

There is no active full FIRE shell replica. Git history preserves the rejected replica; do not recreate one unless Babel deliberately changes that boundary.

## Definition of done

A Lab pass is complete when the question is clear, production data remains isolated, deviations are explicit, findings are classified instead of silently promoted, obsolete experiment code is removed, and any durable unresolved finding is captured through the shared Truth process.
