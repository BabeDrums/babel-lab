# Babel Lab

Experimental sandbox for Babel ecosystem concepts, interaction prototypes, and visual systems.

Before substantive work, read `BABEL_TRUTH.md` → Babel Truth at the pinned commit → `START_HERE.md` → this file.

Babel Lab is intentionally isolated from production runtime/data. It can host contradictory experiments without implying they belong to one final app or one shared style.

## Current experiments

### Fire Lab — `/fire/`

Tests the Fire visualization primitive. Existing renderer, shape, emission, simulation, developer-control, fake Evolve, and Reduce Motion behavior remain preserved.

If promoted, validated Fire semantics move deliberately into `BabeDrums/babel-fire` rather than making Lab a production dependency.

### World Lab — `/world/`

Tests the achievement collection system. Existing locked-state, developer Earn/Lock, hidden/lore, source-mark, and fake-state behavior remain preserved.

If Babel World becomes a real product, it earns its own repository later. Lab is not Babel World.

### Visual Lab / FIRE Shell Lab — `/visual/`

Tests unresolved FIRE shell visuals and interactions against a **parity-first current-G7 baseline**.

The ordinary FIRE canvas should behave like FIRE rather than like a component gallery: Projects, project Home, Setup, Structure, Tracks, toolbar actions, project management, editing, creation, selection, verification, confirmation, responsive sheets/dialogs, focus/input behavior, and navigation are expected to be clickable for the surfaces under review.

Lab uses its own isolated local fixture key and never reads or writes FIRE production/G7 storage. The fork boundary is ownership and data authority, not intentionally missing interactions.

Harness-only navigation pills and explanatory footer copy do not belong inside the judged FIRE canvas. Lab developer utilities may exist outside that canvas; the current baseline keeps only a small collapsible reset control outside the shell.

After parity is verified, visual candidates may intentionally diverge. Those divergences are experiments, not automatic FIRE changes.

It is not a FIRE fork and it is not a Babel design-system authority.

## Shared Lab foundation

The repository root is a lightweight experiment launcher. `shared/lab.css` contains provisional workspace chrome/tokens/accessibility defaults that help navigate the Lab comfortably.

That shared Lab chrome may feel like an early Babel product, but it is not an approved Babel shell. Do not infer shared product semantics from shared Lab code.

## Run

Open `index.html` or the GitHub Pages deployment, then choose an experiment.

No build step or dependencies are required.

## Important boundaries

- **Lab is evidence, never authority**
- contradictory experiments are allowed
- fake/isolated prototype state by default
- no production FIRE data/runtime in Lab
- developer controls stay outside the judged product canvas when possible
- FIRE Shell workflow is current G7 → faithful functional Lab baseline → parity verification → visual experiments → physical test → FIRE implementation → FIRE physical validation → Truth for genuinely transferable rules
- app-local meaning stays with the owning product
- validated semantics move forward; prototype implementation does not automatically move with them
