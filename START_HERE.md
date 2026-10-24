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

Lab is intentionally allowed to contain mutually contradictory visual systems, component shapes, controls, interactions, product concepts, and prototypes. Never make another product "match the Lab." There is no canonical Lab design system.

A Lab experiment may begin from current Babel foundations for convenience, but it can intentionally diverge. Label the experiment and judge it on its own question.

## Current Lab structure

### Fire Lab — `fire/`

FIRE-bound visualization/progression-expression experiment. Existing behavior and fake state remain preserved.

If the experiment is promoted into a real product, its destination is `BabeDrums/babel-fire`.

### World Lab — `world/`

World-bound achievement-collection experiment. Existing behavior and fake state remain preserved.

If Babel World becomes a real product, it earns its own repository later. Babel Lab itself does not become World.

### Visual Lab / FIRE Shell Lab — `visual/`

Experimental visual-interaction environment for the unresolved FIRE generic shell.

The FIRE Shell Lab uses a **parity-first baseline**. Before creative shell exploration, its ordinary user-facing canvas should reproduce the current G7 shell closely enough that Babel can judge a visual change without also judging harness artifacts.

Parity means the observable shell is functionally complete for the surfaces under review:

- Projects → project Home → Setup / Structure / Tracks
- visible toolbar and row actions work
- project create/edit/delete/management flows exist where G7 exposes them
- Setup inputs/toggles behave like the G7 fixture
- Structure add/edit/delete/reorder/verification behavior is represented
- Tracks selection/custom creation/Done behavior is represented
- Back/history behavior is represented
- sheets/dialogs, menus, focus/keyboard behavior, empty/selected/completed/long-content states, and iPhone/iPad adaptation are available when relevant

The Lab may use isolated fake/local fixture data, but incompleteness must not be used as the mechanism that prevents a fork.

### The fork boundary

The protection against creating a second FIRE product is **authority and data ownership**, not deliberately broken behavior.

- FIRE remains product authority for doctrine, runtime, data, specs, tests, and shipping implementation.
- Visual Lab may reproduce FIRE's observable shell behavior completely for experimentation.
- Visual Lab must not read/write FIRE production or G7 storage, depend on FIRE runtime at execution time, or become the source of product truth.
- Lab-only developer controls may exist, but they must be visually outside the FIRE canvas or deliberately hidden/collapsible so they do not contaminate physical shell judgment.
- Lab explanatory copy must not be inserted into the FIRE canvas merely to remind reviewers that it is a prototype.

Once baseline parity is verified, candidate visual systems may intentionally diverge. Contradictory candidates are allowed and should be labeled as experiments rather than silently becoming a new baseline.

Default shell promotion path:

**Current G7 → faithful functional Lab baseline → parity verification → visual experiments → physical-device testing → candidate → FIRE implementation → FIRE physical validation → transferable rules promoted to Babel Truth.**

Promote validated decisions/semantics, not prototype code by default.

## Product-boundary rule

Fire Lab, World Lab, and Visual Lab share a repository only because Lab is the experiment chamber. Co-location does not merge their product meanings.

The repository root is a Lab launcher, not a production home screen.

## Visual treatment of the Lab itself

The Lab launcher/shared chrome may use a calm, current early-Babel treatment so the workspace is pleasant to use. That treatment is **provisional workspace chrome**, not an approved Babel shell and not evidence by itself.

Do not let refreshing Lab chrome rewrite experiment-specific visuals or behavior. Preserve experiment content and state unless that experiment is explicitly being changed.

## Process

For nontrivial Lab work use:

**Observe → Diagnose → Shape → Contract → Build → Verify → Consolidate**

For FIRE Shell Lab specifically:

1. **Observe** the current owning FIRE implementation and physical-device behavior.
2. **Diagnose** whether a problem belongs to the baseline replica, a candidate visual system, or FIRE itself.
3. **Shape** the experiment without inventing unrelated product behavior.
4. **Contract** the parity target and intentional divergences before styling broadly.
5. **Build** against isolated Lab data with complete observable shell interactions for the tested surfaces.
6. **Verify parity first**, then verify the candidate on physical iPhone and iPad states.
7. **Consolidate** the winning decision back into FIRE for real-product validation; only later promote genuinely transferable rules to Truth.

## Continuity

New unresolved durable Lab findings go to Babel Truth Issue #1 under the persist-before-reply threshold.

Do not create a repository commit for every brainstorm sentence. Mature experimental conclusions should be documented locally; genuinely cross-app lessons may be promoted to Babel Truth after owning-product validation and review.

## Current next action

Replace the simplified Visual Lab harness with a faithful, fully clickable current-G7 baseline using isolated Lab state. Remove harness-only navigation pills and explanatory footer text from the FIRE canvas; keep any developer controls outside the judged shell. Verify behavioral/visual parity before beginning the next visual redesign pass. Keep Fire Lab and World Lab intact.
