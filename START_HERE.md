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

Shell Gallery status:
- **Proven** — already validated shared behavior with a canonical reference.
- **Candidate** — reusable-looking pattern under test; not Truth yet.
- **Experimental** — exploratory/product-specific expression.

Current Gallery focus:
- Proven header / toolbar composition.
- Proven rows + ordinary action hierarchy.
- Candidate large-card family: **Destination / Orientation / Decision**.
- Candidate progress/status treatment.

Do not extract a universal shared component package yet. Shared implementation must be earned by repeated need across real products.

### Minor physical-review gate

Toolbar circle geometry is settled unless new device evidence contradicts it: **44px interaction host + one centered 36px visible circle**.

Physical iPhone review confirmed the corrected lowercase Info `i` is vertically seated correctly, but the font glyph does not visually belong to the same symbol family as Back / Plus / More. The current candidate keeps the approved geometry and centered artwork box while replacing the font-rendered `i` with purpose-built vector artwork using the same 2px rounded-stroke / filled-dot language as the existing symbols.

Remaining shell gate: physically confirm on iPhone that the vector Info symbol preserves the good seating **and** now reads as part of the same toolbar family. Do not reopen the circle geometry without new evidence.

## FIRE Core incubation

FIRE doctrine and canonical behavior live in `babel-fire`. The first unproven interaction should be auditioned here under `fire/core/**` with fake/local state.

Current interaction contract:

**Active Focus → concise why → one useful DAW experiment → return with result → preserve evidence → update project/domain state → changed next Active Focus**

Use the current proof pair:
- `Creep` — Recreation/reference case.
- `Even` — Original using already-known artist-authored context.

The old FIRE PR #99 is closed seed/history, not a merge path or production implementation. Reuse ideas selectively; reshape/delete freely in Lab. If the behavior survives physical use, implement it deliberately back in FIRE against real state/navigation/data.

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

1. Physically recheck the shared vector Info symbol on iPhone for both seating and family resemblance.
2. Review/refine Shell Gallery large-card candidates and the Lab-home Destination-card consumer; do not canonize the current composition by default.
3. Continue WORLD Phase 1 **one screen at a time**, judging whether WORLD genuinely improves larger-project orientation and next action.
4. FIRE lane may build the bounded `fire/core/**` audition independently.

Do not create a WORLD repo, backend/account/sync layer, universal schema, universal shared UI package, full Artist Development curriculum, generic notes database, full visual-identity builder, or production FIRE Core implementation from Lab without evidence earning it.

Durable unresolved findings belong in Babel Truth Issue #1. Historical incidents belong in Git/PR/Issue history, not this handoff.
