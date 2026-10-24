# Babel Lab — Repository Instructions

Use **Babel** as the project-facing name.

## Shared authority

Read `BABEL_TRUTH.md` before substantive work. It pins the Babel Truth commit this repo last reconciled against.

Then read local `START_HERE.md` and `README.md`.

## What Lab is

Babel Lab is an experimental sandbox/incubator.

Use it to test:
- interaction concepts
- visual systems
- progression metaphors
- cross-app concepts
- prototype feature ideas
- World-like surfaces before a World product exists

Lab is not production authority and does not automatically define FIRE/World/future-app behavior.

## Truth relationship

Follow Babel Truth by default, but preserve intentional experimental divergence.

Classify conflicts before editing:

1. stale divergence → adopt Truth
2. intentional experiment → preserve and document the hypothesis
3. potential upstream improvement → surface to Babel before overwriting either side
4. app/product-local exception → keep local and clarify scope

Do not bump the local Truth pointer until reconciliation against the newer Truth state is complete.

## Prototype safety

- Fake/simulated state is preferred unless the experiment explicitly needs real data.
- Do not read/write FIRE production storage, schemas, or projects.
- Do not create a hidden dependency on another app's runtime.
- Do not turn prototype controls into implied product mechanics without review.
- Do not promote a visual metaphor into a shared semantic rule merely because it looks good in one experiment.

## Workflow

Use Babel Truth `PROCESS.md` as the shared iteration model:

**Observe → Diagnose → Shape → Contract → Build → Verify → Consolidate**

For meaningful Lab changes:

**branch → experiment → verify the hypothesis → document what was learned → PR → merge**

When a prototype result matters outside Lab, classify it before promotion:

- global transferable lesson → candidate Babel Truth change
- FIRE-specific lesson → `babel-fire`
- future product-specific lesson → that product's authority once it exists
- unresolved durable conflict/question → Babel Truth Issue #1

## Continuity

Use Babel Truth Issue #1 for unresolved durable items whose loss at a chat boundary would cost real work.

Do not store every brainstorm turn.

## Current prototype

Prototype 02 focuses on Fire + Achievements. Read `START_HERE.md` / `README.md` for its current boundaries before modifying it.

## Definition of done

A Lab pass is complete when:

- the experiment/question is clear
- the prototype remains isolated from production data
- intentional deviations from Truth are explicit
- findings are classified instead of silently promoted
- obsolete prototype code/content from the replaced approach is cleaned up
- relevant unresolved findings are captured in the central buffer
