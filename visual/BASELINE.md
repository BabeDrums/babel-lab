# FIRE Shell Lab — Control Baseline

Status: experimental control condition, not product authority.

Source behavior reference: `BabeDrums/babel-fire` current G7 `/v7-preview/` at the time this baseline is reconciled.

## Contract

The baseline exists so visual experiments can be compared against FIRE rather than against an invented mini-app.

- normal canvas should feel/behave like G7 before deliberate divergence
- every visible shell affordance required for review should function
- no permanent Lab navigation pills or explanatory footer inside the FIRE canvas
- Lab developer controls, if added, live outside the canvas or behind an explicit Lab-only control
- Lab state uses `babel-lab-fire-shell-v1` only
- never read/write `production-projects-v1` or `production-projects-v1-v7-preview`
- FIRE remains canonical product authority

## Baseline coverage

Projects, project Home, Setup, Structure, Tracks, project management, create/edit/delete/reset, Setup values/toggles, Structure add/edit/reorder/verify, Tracks selection/custom creation/confirmation, Back, toolbar actions, modal/sheet adaptation, selection/completion states.

## Experiment rule

First verify parity on physical iPhone and iPad. Then make deliberate candidate changes. If a candidate wins, record the decision and reimplement it in FIRE; do not turn this directory into production FIRE.
