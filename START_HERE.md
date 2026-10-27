# Babel Lab — Start Here

Use **Babel** as the project-facing name.

Read `BABEL_TRUTH.md` first. This file owns only Lab's current structure, experiment boundaries, and immediate gates.

## Current structure

- **Shell Gallery — `shell/`**: living visual/device-testable proving ground for generic Babel UI.
- **Fire Lab — `fire/`**
  - `fire/visualization/` — Fire visualization/progression experiment.
  - `fire/core/` — non-canonical FIRE Core interaction incubation.
- **World Lab — `world/`**
  - `world/achievements/` — collection/discovery experiment only.
  - `world/context-loop/` — WORLD Phase 1 orientation/next-step audition.
- **Root + `shared/`**: Lab host chrome; shared integration surface, not an independent design system.

> **Lab is evidence, never authority.**

## Shared shell / Gallery

The frozen FIRE G7 runtime `4a258c5170dd1d96dcbc0f2b0a9c35b283cec489` remains the implementation reference for currently proven generic shell behavior.

Physical review established that Lab had only partially translated that reference: toolbar geometry matched, but page typography, spacing tokens, navigation composition, row geometry, footer placement, and large-card consumers had drifted into a second visual language.

The shared shell therefore uses FIRE directly as the baseline:
- one `760px` maximum canvas owned by `shared/lab.css`; experiments do not widen/narrow it;
- `34px / 1.04` large page title role;
- `14px / 1.35` metadata immediately below the title; related metadata uses `·` separators;
- `44px` toolbar interaction host + one centered `36px` visible circle;
- `64px` grouped navigation/state rows with `16px` primary label and `12px` supporting metadata;
- FIRE surface, border, radius, spacing, control-height, and safe-area values;
- tiny fixed build/version footer when a build footer exists;
- one stable page frame: toolbar → `8px` → title/meta → `20px` → content.

The former generic **Destination / Orientation / Decision large-card family is retired**. Physical review showed that it made Lab feel like unrelated screens pasted together rather than one Babel shell. Product-specific expressive surfaces can still exist when their meaning earns them; they do not define generic Lab navigation.

### Latest physical falsification — iPad / landscape

The first unification pass still failed as a system under broader physical review:
- moving from Lab home into nested pages could produce a subtle row/frame width shift;
- FIRE Core still overrode the shared canvas to `900px` and nested content inside a separate `700px` left-aligned column, producing an obvious left shift at deeper states and in landscape;
- FIRE Core navigation/choice rows were still `72px` instead of the shared `64px` row contract;
- WORLD Phase 1 still carried a visually weak Info symbol, a separate arrow glyph, a star badge/star-field treatment in the doorway, and an overbuilt nested-box Prototype Info dialog.

Current correction:
- no experiment may override the shared `760px` canvas;
- FIRE Core content is full-width inside that shared content frame at every depth and its navigation/choice/result rows use `64px` geometry;
- the shared forward chevron is purpose-built vector artwork and is reused by Lab rows, FIRE Core choices, WORLD relationship choices, and the WORLD doorway;
- Info remains custom vector artwork but has been optically reweighted after the landscape review showed the previous candidate still read too thin;
- WORLD doorway keeps only its earned material expression: no star glyph, no star field, no arrow glyph; it ends in the shared chevron;
- WORLD Prototype Info is now a compact two-setting sheet rather than nested segmented-control cards;
- shell regression now includes a `1024px` iPad-landscape lane and explicitly enters deep FIRE Core to verify the canvas/content left edge and width do not change.

Do not call this shell frozen until physical iPhone/iPad review confirms the corrected build.

## FIRE Core incubation

FIRE doctrine and canonical behavior live in `babel-fire`. The first unproven interaction should be auditioned here under `fire/core/**` with fake/local state.

Current Lab main has already advanced to the **FIRE Core V2** audition from Lab PR #34. That newer product interaction is authoritative for the Lab experiment; shared-shell work must preserve it rather than reconstructing the older screenshot state.

Current interaction intent remains bounded: FIRE should earn enough project evidence to offer one useful DAW move, accept the result, and change direction from what actually happened.

Use the current proof pair:
- `Creep` — Recreation/reference case.
- `Even` — Original using already-known artist-authored context.

The old FIRE PR #99 is closed seed/history, not a merge path or production implementation. If the Lab behavior survives physical use, implement it deliberately back in FIRE against real state/navigation/data.

## WORLD Phase 1

WORLD is still a Lab product audition; there is no `babel-world` repo yet.

Current product job:

> **Understand the real creative/project state, determine what kind of decision exists now, and help the artist take the next meaningful step without pretending there is always one correct path.**

Current bounded flow:
1. **FIRE finish** — `Even` / `You're done.`
2. optional expressive **WORLD** doorway — `Want to take it further?`
3. establish larger-project relationship only if genuinely unknown
4. orient with only enough meaningful state to understand where the project is
5. show **Required**, **Suggested**, or genuinely **Open** next direction
6. stop; do not simulate the entire ecosystem

Guidance rule:

> **Use what the work already tells us. Ask only when the answer would change the next step.**

For suggestions, the strongest current pattern is **Recommended / Why / Alternative**. Current recommendation copy is hypothesis, not artist-development doctrine.

Visual identity is currently understood as layered **artist identity ↔ project/album identity**. It may be noticed, recommended, or clarified when relevant; do not build a full visual-identity workspace in Phase 1.

WORLD earns a standalone repo only after physical use proves independent value, the orientation/decision job survives more than one exact scenario, and enough WORLD-local structure is proven to stop treating it as disposable fake state.

## Immediate gates

1. Physically review the corrected Lab as one continuous app on iPhone **and iPad landscape**.
2. Specifically verify that Lab home → World Lab / Fire Lab / Shell Gallery / FIRE Core keeps the exact same horizontal frame, and that deep FIRE Core no longer shifts left.
3. Recheck the Info symbol, WORLD doorway chevron/no-glyph treatment, and the simplified WORLD Prototype Info sheet.
4. If those shared-shell corrections survive physical review, stop shell work and return to WORLD Phase 1 one screen at a time.
5. FIRE lane may continue the bounded `fire/core/**` audition independently, but shared shell/frame geometry remains owned here.

Do not create a WORLD repo, backend/account/sync layer, universal schema, universal shared UI package, full Artist Development curriculum, generic notes database, full visual-identity builder, or production FIRE Core implementation from Lab without evidence earning it.

Durable unresolved findings belong in Babel Truth Issue #1. Historical incidents belong in Git/PR/Issue history, not this handoff.
