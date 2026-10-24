# Babel Lab — Start Here

Use **Babel** as the project-facing name.

Babel Lab is the experimental sandbox/incubator for Babel ecosystem concepts. It is not a production product and it does not own cross-app truth.

## Read order

1. `BABEL_TRUTH.md`
2. Babel Truth shared authority at the pinned commit
3. this file
4. `README.md`
5. the relevant experiment under `fire/`, `world/`, or `visual/`
6. relevant Lab/ecosystem items in Babel Truth Issue #1

## Core Lab rule

> **Lab is evidence, never authority.**

Lab may contain mutually contradictory visual systems, component shapes, controls, interactions, product concepts, and prototypes. Never make another product "match the Lab." There is no canonical Lab design system.

## Current Lab structure

### Fire Lab — `fire/`
FIRE-bound visualization/progression-expression experiment. Preserve its existing behavior and fake state unless explicitly changing that experiment.

### World Lab — `world/`
World-bound achievement-collection experiment. If Babel World becomes a real product, it earns its own repository later.

### Visual Lab / FIRE Shell Lab — `visual/`
Experimental visual-interaction environment for the unresolved FIRE generic shell.

### FIRE Shell Lab control-baseline rule

Before exploring visual alternatives, Visual Lab must provide a **faithful observable replica of the current FIRE G7 shell** using isolated fake/local Lab state.

Faithful means the normal user-facing canvas should initially behave like FIRE G7 rather than like a simplified component demo:

- preserve the same user-facing navigation model instead of adding permanent Lab navigation pills
- preserve representative row geometry, toolbar semantics, forms, selection states, sheets/dialogs, menus, focus/keyboard behavior, and iPhone/iPad adaptation
- every visible shell-level button/affordance needed for review should work; do not leave dead `•••`, add, edit, delete, selection, or modal controls in the control baseline
- project create/edit/delete/reset, Setup editing, Structure add/edit/reorder/verify, Tracks selection/custom creation/confirmation, and Back behavior should be exercisable when present in G7
- Lab-only explanatory text and developer controls must stay outside the FIRE canvas or behind an explicitly Lab-only control; they must not masquerade as product UI
- use isolated Lab storage only; never read/write FIRE production or G7 storage

The purpose is a **control condition**: establish parity first, then make deliberate visual experiments so differences can be attributed to the experiment rather than missing behavior or invented harness chrome.

This still does **not** make Visual Lab a FIRE fork or authority. FIRE owns product doctrine, specs, runtime, data, tests, and canonical implementation. Lab owns only the disposable experiment.

When a candidate wins, extract the approved decisions and deliberately implement them in FIRE. Do not declare Lab itself to be FIRE and do not make FIRE depend on Lab runtime/code.

Default shell path:

**current G7 → faithful isolated Lab control baseline → verify parity → visual experiments → physical-device comparison → approved candidate → FIRE implementation → FIRE physical validation → transferable rules promoted to Babel Truth.**

## Product-boundary rule

Fire Lab, World Lab, and Visual Lab share a repository only because Lab is the experiment chamber. Co-location does not merge their product meanings. The repository root is a Lab launcher, not a production home screen.

## Visual treatment of the Lab itself

The Lab launcher/shared chrome may use a calm current early-Babel treatment. That workspace chrome is provisional and not an approved Babel shell. Do not let Lab chrome leak into the FIRE Shell Lab control baseline unless the experiment explicitly tests it.

## Process

For nontrivial Lab work use:

**Observe → Diagnose → Shape → Contract → Build → Verify → Consolidate**

For FIRE Shell Lab specifically, **Verify** includes two separate checks:

1. **Parity check** — does the control baseline expose and correctly operate the G7 shell behavior/surfaces needed for comparison?
2. **Experiment check** — after parity, does the proposed visual change improve the intended problem on physical iPhone and iPad without accidental semantic drift?

Do not judge a visual candidate against a knowingly incomplete or behaviorally different harness.

## Continuity

New unresolved durable Lab findings go to Babel Truth Issue #1 under the persist-before-reply threshold. Mature experimental conclusions should be documented locally; genuinely cross-app lessons may be promoted to Babel Truth only after owning-product validation and review.

## Current next action

Replace the simplified Shell Harness 01 with the faithful G7 control baseline, verify its visible shell interactions on physical iPhone and iPad, and only then resume visual-system exploration. Keep Fire Lab and World Lab intact.
