# Babel Lab

Experimental sandbox for Babel ecosystem concepts, interaction prototypes, and visual systems.

Before substantive work, read `BABEL_TRUTH.md` → Babel Truth at the pinned commit → `START_HERE.md` → this file.

Babel Lab is intentionally isolated from production runtime/data. It can host contradictory experiments without implying they belong to one final app or one shared style.

## Current experiments

### Fire Lab — `/fire/`
Tests the Fire visualization primitive. Existing renderer, shape, emission, simulation, developer-control, fake Evolve, and Reduce Motion behavior remain preserved.

### World Lab — `/world/`
Tests the achievement collection system. If Babel World becomes a real product, it earns its own repository later. Lab is not Babel World.

### Visual Lab / FIRE Shell Lab — `/visual/`
Tests unresolved FIRE shell visuals and interactions.

The active baseline is intentionally a **faithful, isolated replica of the observable G7 shell**, not a simplified mini-FIRE. It uses Lab-only local state but reproduces the shell surfaces and interactions needed for meaningful comparison: Projects, project Home, Setup, Structure, Tracks, toolbar actions, project management, creation/editing, selection/completion, custom inputs, sheets/dialogs, and adaptive phone/wide presentation.

Normal FIRE canvas first; Lab controls second. Permanent experiment navigation, explanatory footers, or other developer chrome should not alter the control condition. Developer conveniences may exist outside the product canvas or behind an explicit Lab-only control.

This replica is still disposable experimental evidence. FIRE remains the product authority; Lab never becomes a runtime dependency or canonical implementation.

## Shared Lab foundation

The repository root is a lightweight experiment launcher. `shared/lab.css` contains provisional workspace chrome/tokens/accessibility defaults. That shared Lab chrome may feel like an early Babel product, but it is not an approved Babel shell.

## Run

Open `index.html` or the GitHub Pages deployment, then choose an experiment. No build step or dependencies are required.

## Important boundaries

- **Lab is evidence, never authority**
- contradictory experiments are allowed
- fake/local prototype state by default
- no production FIRE or G7 storage/data in Lab
- FIRE Shell Lab establishes behavioral/visual parity before deliberate divergence
- every visible shell affordance required for review should work in the control baseline
- developer controls are not final mechanics
- app-local meaning stays with the owning product
- shell path: G7 → faithful Lab baseline → parity verification → visual experiment → physical comparison → FIRE implementation → FIRE validation → Truth for genuinely transferable rules
- validated decisions move forward; prototype implementation does not automatically move with them
