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

The current shared-shell pass therefore uses FIRE directly as the baseline:
- `34px / 1.04` large page title role.
- `14px / 1.35` metadata immediately below the title; related metadata uses `·` separators.
- `44px` toolbar interaction host + one centered `36px` visible circle.
- `64px` grouped navigation/state rows with `16px` primary label and `12px` supporting metadata.
- FIRE surface, border, radius, spacing, control-height, and safe-area values.
- tiny fixed build/version footer when a build footer exists.
- one stable page frame: toolbar → `8px` → title/meta → `20px` → content.

The physically approved vector Info symbol is settled unless new device evidence contradicts it.

The former generic **Destination / Orientation / Decision large-card family is retired**. Physical review showed that it made Lab feel like unrelated screens pasted together rather than one Babel shell. Product-specific expressive surfaces can still exist when their meaning earns them; they do not define generic Lab navigation.

Shell Gallery now proves the shared FIRE-derived header, toolbar, rows/actions, and a bounded progress/status candidate. Do not extract a universal component/runtime package yet; shared implementation still has to be earned across real products.

### Current physical-review gate

Review the deployed Lab on iPhone as one continuous system, not page-by-page mockups. Check that:
- headers remain the same size and vertical position across Lab home, Fire Lab, World Lab, Shell Gallery, and experiment pages;
- grouped rows remain the same height and text roles across navigation surfaces;
- small metadata/footer roles no longer jump in scale or position;
- WORLD Phase 1 reads as FIRE-family content rather than a separate card-based design system.

Do not reopen already approved toolbar/icon geometry unless new physical evidence specifically contradicts it.

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

1. Physically review the unified FIRE-derived Lab shell on iPhone across multiple pages; judge continuity before local polish.
2. If the shared geometry holds, freeze it and return to WORLD Phase 1 one screen at a time.
3. Continue judging WORLD by whether it improves larger-project orientation and next action without creating management work.
4. FIRE lane may continue the bounded `fire/core/**` audition independently.

Do not create a WORLD repo, backend/account/sync layer, universal schema, universal shared UI package, full Artist Development curriculum, generic notes database, full visual-identity builder, or production FIRE Core implementation from Lab without evidence earning it.

Durable unresolved findings belong in Babel Truth Issue #1. Historical incidents belong in Git/PR/Issue history, not this handoff.
