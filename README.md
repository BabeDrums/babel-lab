# Babel Lab

Experimental sandbox for Babel ecosystem concepts, interaction prototypes, and visual systems.

Before substantive work, read `BABEL_TRUTH.md` → Babel Truth at the pinned commit → `START_HERE.md` → this file.

Babel Lab is intentionally isolated from `BabeDrums/babel-fire` production runtime/data. It can host FIRE-bound and World-bound experiments without implying those experiments belong to one final app.

## Current experiments

### Fire Lab — `/fire/`

Tests the Fire visualization primitive:

- flat particle renderer
- Mixed / Square / Diamond / Circle shape experiments
- time-based particle emission
- Free Particles / Rigid Grid rendering from one simulation
- developer intensity / turbulence / diversity controls
- fake `Evolve` presets
- Reduce Motion behavior

If promoted, validated Fire semantics move deliberately into `BabeDrums/babel-fire` rather than making Lab a production dependency.

### World Lab — `/world/`

Tests the achievement collection system:

- locked silhouettes
- manual developer Earn / Lock state
- normal + hidden/lore achievements in one collection
- mysterious locked-text presentation
- temporary source/origin mark behavior
- no production earning logic

If Babel World becomes a real product, it earns its own repository later. Lab is not Babel World.

## Shared Lab foundation

The repository root is a lightweight experiment launcher. `shared/lab.css` contains only basic Lab shell/tokens/accessibility defaults that genuinely help multiple experiments. Fire and World keep their own experiment-specific CSS and JavaScript.

Do not infer shared product semantics from shared Lab code.

## Run

Open `index.html` or the GitHub Pages deployment, then choose Fire Lab or World Lab.

No build step or dependencies are required.

## Important boundaries

- fake prototype state only
- no global Babel XP/level
- developer controls are not final mechanics
- app-local meaning stays with the owning product
- mature cross-app lessons may be promoted to Babel Truth after review
- validated semantics move forward; prototype implementation does not automatically move with them
