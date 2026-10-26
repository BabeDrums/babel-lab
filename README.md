# Babel Lab

Experimental sandbox and incubation workspace for Babel.

Start with [`BABEL_TRUTH.md`](BABEL_TRUTH.md), then [`START_HERE.md`](START_HERE.md). Shared operating/design rules come from the pinned Babel Truth commit; Lab owns experiments only.

Current spaces:
- `/shell/` — Shell Gallery for shared UI proof/candidates
- `/fire/` — Fire Lab, including visualization and bounded FIRE Core incubation
- `/world/` — World Lab, including Achievements and WORLD Phase 1

Lab consumes the proven Babel shell baseline for generic UI and keeps product-specific expression local. Experiments use fake/local state by default and must remain isolated from production product data/runtime.

No build step is required. Git/PR history is the archive; `START_HERE.md` owns the current experiment gates.
