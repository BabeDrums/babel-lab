# Babel Lab

Experimental sandbox for Babel ecosystem concepts, interaction prototypes, and visual systems.

Before substantive work, read `BABEL_TRUTH.md` → `START_HERE.md` → this file. Shared cross-app rules come from the pinned Babel Truth commit; Lab may intentionally diverge only when the experiment is explicitly testing an alternative.

This repository is intentionally isolated from `BabeDrums/babel-fire`. It does not read or write FIRE runtime data, schemas, storage, or product code.

## Prototype 02 — Fire + Achievements

Prototype 01 proved that surfacing skills, domains, lore, evidence, and source architecture all at once was too dense. Prototype 02 intentionally narrows the visible experiment to two ecosystem objects:

- **Fire** — a generated personal artifact driven by simulated state for visual experimentation.
- **Achievements** — a single collection containing normal and hidden/lore achievements.

### What Prototype 02 tests

- A simplified World surface with only Fire and Achievements.
- Achievements begin locked and can be manually earned/locked through developer controls.
- Hidden/lore achievements live inside the same achievement collection instead of a separate Lore section.
- FIRE source marks remain supporting provenance UI rather than a separate navigation system.
- Fire uses flat 2D particles only: no blur, glow, gradient plume, or fake light emission.
- Particle style can be Mixed, Square, Diamond, or Circle for visual testing.
- Fire emission is time-based rather than frame-based so lower frame rates do not change particle density.
- Free-particle and rigid-grid views render the same underlying simulation logic.
- Rigid-grid mode remains animated; it is not a static pixel image.

### Important boundaries

- Fake prototype state only.
- Developer controls do not define the final evidence-to-visual mapping.
- `Evolve` is a simulation control, not a final progression mechanic.
- Achievement earning logic is deliberately not implemented yet.
- No global Babel XP/level is implied.
- Fire does not grow from taps, streaks, elapsed days, or page completion.
- Mature decisions belong in the owning app/Babel Truth authority, not here by default.
- A Babel World prototype may live in Lab; Babel Lab itself is not the Babel World product.

### Run

Open `index.html` in a modern browser, or use the GitHub Pages deployment. No build step or dependencies are required.
