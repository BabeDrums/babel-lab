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

A critical correction from physical review: **the G7 reference is `babel-fire/v7-preview/**`, not the root/V6 FIRE stylesheet.** The frozen G7 page frame is explicitly:
- `width: min(100%, 760px)`
- `margin: 0 auto`
- `padding-inline: 20px`
- `padding-top: calc(10px + env(safe-area-inset-top))`
- `padding-bottom: calc(26px + env(safe-area-inset-bottom))`

Do not infer G7 page-frame geometry from root/V6 `styles.css`, which has different responsive/canvas rules.

Physical review established that Lab had only partially translated G7: toolbar geometry matched, but page typography, navigation composition, row geometry, footer placement, large-card consumers, and finally the page-frame source itself had drifted.

The shared shell therefore uses frozen G7 directly as the baseline:
- one centered `760px` maximum canvas owned by `shared/lab.css`; experiments do not widen/narrow it;
- exactly `20px` horizontal page padding at all current widths, matching frozen G7;
- `34px / 1.04` large page title role;
- `14px / 1.35` metadata immediately below the title; related metadata uses `·` separators;
- `44px` toolbar interaction host + one centered `36px` visible circle;
- `64px` grouped navigation/state rows with `16px` primary label and `12px` supporting metadata;
- FIRE surface, border, radius, spacing, control-height, and safe-area values;
- tiny fixed build/version footer when a build footer exists;
- one stable page frame: toolbar → `8px` → title/meta → `20px` → content.

The former generic **Destination / Orientation / Decision large-card family is retired**. Physical review showed that it made Lab feel like unrelated screens pasted together rather than one Babel shell. Product-specific expressive surfaces can still exist when their meaning earns them; they do not define generic Lab navigation.

### Latest physical falsification — wrong FIRE generation was used as the spacing reference

Earlier Lab shell repair correctly unified route/depth geometry, rows, symbols, and FIRE Core width behavior. The remaining edge-spacing work then went wrong for a different reason:
- Lab PR #36 copied `clamp(18px, 3vw, 56px)` from FIRE root/V6 `styles.css` and treated it as frozen G7 geometry.
- Lab PR #37 added another `16px` inset after physical screenshots still disagreed.
- That compensation was mathematically coherent against the wrong source, but architecturally wrong.

The decisive evidence is the frozen runtime itself: `babel-fire` commit `4a258c5…` under `v7-preview/styles.css` owns a simple centered `760px` page frame with `20px` horizontal padding. The G7 screenshot under review is also visibly a G7 build, not V6.

Current correction:
- delete the copied V6 responsive-gutter token from Lab shell ownership;
- delete the compensating `16px` page inset;
- use the exact frozen G7 frame: centered `760px` canvas + `20px` horizontal padding;
- shell regression asserts the exact `20px` left/right padding and resulting content edge at `390px`, `820px`, and `1024px`;
- FIRE Core content remains full-width inside that shared G7 frame at every depth and its navigation/choice/result rows remain `64px`;
- the shared forward chevron remains purpose-built vector artwork reused by Lab rows, FIRE Core choices, WORLD relationship choices, and the WORLD doorway;
- Info remains custom vector artwork with the current optical-weight correction;
- WORLD doorway keeps only its earned material expression: no star glyph, no star field, no arrow glyph; it ends in the shared chevron;
- WORLD Prototype Info remains a compact two-setting sheet rather than nested segmented-control cards.

Do not call this shell physically confirmed until Babel compares the corrected Lab build directly against the frozen G7 preview on iPhone/iPad.

## FIRE Core incubation

FIRE doctrine and canonical behavior live in `babel-fire`. The first unproven interaction should be auditioned here under `fire/core/**` with fake/local isolated state.

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

1. Physically compare Lab against the **frozen G7 preview** on the same iPad/iPhone orientation; do not compare against V6/root spacing tokens.
2. Verify that Lab and G7 share the same centered `760px` frame and `20px` content inset, including title, toolbar controls, and grouped rows.
3. Re-run Lab home → World Lab / Fire Lab / Shell Gallery / FIRE Core and verify there is no horizontal shift at any depth.
4. Recheck the Info symbol, WORLD doorway chevron/no-glyph treatment, and the simplified WORLD Prototype Info sheet.
5. If those shared-shell corrections survive physical review, stop shell work and return to WORLD Phase 1 one screen at a time.
6. FIRE lane may continue the bounded `fire/core/**` audition independently, but shared shell/frame geometry remains owned here.

Do not create a WORLD repo, backend/account/sync layer, universal schema, universal shared UI package, full Artist Development curriculum, generic notes database, full visual-identity builder, or production FIRE Core implementation from Lab without evidence earning it.

Durable unresolved findings belong in Babel Truth Issue #1. Historical incidents belong in Git/PR/Issue history, not this handoff.
