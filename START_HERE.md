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

A critical correction from physical review: **the G7 reference is `babel-fire/v7-preview/**`, not the root/V6 FIRE stylesheet, and the final computed G7 cascade matters more than any one early declaration.**

Frozen G7 starts with this base frame:
- `width: min(100%, 760px)`
- `margin: 0 auto`
- `padding-inline: 20px`
- `padding-top: calc(10px + env(safe-area-inset-top))`
- `padding-bottom: calc(26px + env(safe-area-inset-bottom))`

But G7 then overrides that frame at `min-width: 700px`:
- `padding-inline: 34px`
- `padding-bottom: 54px`
- page-title size `35px`
- root build footer bottom `20px`

Do not infer G7 geometry from root/V6 `styles.css`, and do not stop reading `v7-preview/styles.css` at the base rule. Physical iPad screenshots proved that omitting G7's later `>=700px` override makes Lab sit visibly too close to the screen edge.

The shared shell therefore uses frozen G7's **final computed behavior** as the baseline:
- one centered `760px` maximum canvas owned by `shared/lab.css`; experiments do not widen/narrow it;
- `20px` horizontal page padding below `700px`;
- `34px` horizontal page padding and `54px` bottom padding at `>=700px`;
- `34px / 1.04` page title below `700px`, `35px / 1.04` at `>=700px`;
- `14px / 1.35` metadata immediately below the title; related metadata uses `·` separators;
- `44px` toolbar interaction host + one centered `36px` visible circle;
- `64px` grouped navigation/state rows with `16px` primary label and `12px` supporting metadata;
- FIRE surface, border, radius, spacing, control-height, and safe-area values;
- tiny fixed build footer when a build footer exists;
- one stable page frame: toolbar → `8px` → title/meta → `20px` → content.

The Lab root build footer is not a manually maintained semantic version. Source uses `LAB · local`; the GitHub Pages workflow replaces that marker during deployment with the exact seven-character `GITHUB_SHA`, producing `LAB · <sha>` on the live site. Use that footer to confirm which Git revision is physically under review.

The former generic **Destination / Orientation / Decision large-card family is retired**. Physical review showed that it made Lab feel like unrelated screens pasted together rather than one Babel shell. Product-specific expressive surfaces can still exist when their meaning earns them; they do not define generic Lab navigation.

### Physical shell baseline — confirmed

The shared Lab shell is physically accepted on iPhone/iPad after the G7 cascade correction merged at Lab main `6a1a4b7a7cbf3495eeb274d043f426f6cc088774`.

That accepted baseline includes:
- G7's final `20px` mobile / `34px` tablet inline frame;
- G7 title/meta rhythm and fixed page frame;
- `44px` host / `36px` visible toolbar controls;
- shared vector Back / Plus / More / Info / forward-chevron family;
- `64px` shared navigation/state rows;
- FIRE Core remaining on the same centered frame at depth;
- Git-stamped `LAB · <sha>` footer on the live Lab root.

Do **not** reopen shared shell geometry or toolbar/icon family during routine WORLD/FIRE experiment work unless new physical-device evidence contradicts this baseline.

## FIRE Core incubation

FIRE doctrine and canonical behavior live in `babel-fire`. Unproven interaction behavior may be auditioned here under `fire/core/**` with fake/local isolated state.

The current Lab specimen is the **top-of-product FIRE Core heartbeat** merged in Lab PR #41 at `ee1214be831a8f880f54c9a1930608dd12c63532`. It supersedes the earlier V1/V2 interaction auditions; those remain rejected/superseded evidence and history, not behavior to reconstruct.

Current bounded heartbeat:

**Songs → New Song → starting reality → earned Next → Update when meaningful → smarter Next → reopen/continue**

The current hypotheses are intentionally lightweight:
- begin from a real Songs surface;
- keep Original/Cover in one creation surface;
- capture one factual starting-reality input rather than a rigid stage taxonomy or broad questionnaire;
- persist one useful `Next` recommendation without task-status bookkeeping;
- let the musician use `Update` only when there is meaningful new evidence;
- use Move-specific outcomes, `Not sure`, unexpected evidence, and artist redirection to reconcile the next move;
- preserve the project and current recommendation across return/reopen.

Physical gate: iPhone first. Exercise the one-riff Original path (`+` → Original + title/optional album → `a guitar riff` → first `Next` → `Update` with a meaningful result → changed `Next` → Songs → reopen) and judge whether it feels like calm musical guidance rather than onboarding, chat, or task management.

The old FIRE PR #99 is closed seed/history, not a merge path or production implementation. If the Lab behavior survives physical use, implement/reconcile the surviving behavior deliberately back in FIRE against real state/navigation/data.

## WORLD Phase 1

WORLD is still a Lab product audition; there is no `babel-world` repo yet.

Current product job:

> **Understand the real creative/project state, determine what kind of decision exists now, and help the artist take the next meaningful step without pretending there is always one correct path.**

Current bounded flow:
1. **FIRE finish** — `Even` / `You're done.`
2. optional expressive **WORLD** doorway — `Want to take it further?`
3. establish larger-project relationship only if genuinely unknown
4. if relationship is already known, go directly to the relevant guidance state
5. show **Required**, **Suggested**, or genuinely **Open** next direction
6. stop; do not simulate the entire ecosystem

Guidance rule:

> **Use what the work already tells us. Ask only when the answer would change the next step.**

### WORLD-local presentation grammar under audition

The current Phase 1 hypothesis is:

> **Show the state only when it adds information. Recommend the move. Explain only when asked.**

For known project relationships, the page header already supplies the meaningful state (`Even` / `Album`). Do not repeat that fact in an orientation card.

Suggested guidance uses one reusable WORLD-local grammar:
- small `Suggested next` context;
- one dominant direction;
- one local inline `Why this?` disclosure, closed by default;
- one secondary `Alternative` section with quieter supporting copy.

The rationale is progressive disclosure, not a permanent explanation row, modal, or second card.

Relationship and scope are different concepts. **`Song belongs to Album` does not imply a known or fixed album track count.** Album size may be unknown and may change. Do not require track-count metadata to create or attach to an album, and do not turn optional/planned track counts into completion percentages, ordered dots, or progress rails.

Production order is not track order. WORLD must not visually imply that album songs are completed sequentially.

When WORLD genuinely lacks the relationship, ask only `Where does this belong?` and offer existing project / create album / keep standalone. Creating a new album requires only the information needed now (currently the album name), not a forecast of final scope.

Needs-context and Open states reuse the same guidance surface and typography but do not manufacture rationale or certainty:
- Needs context asks the one question that changes the recommendation.
- Open says `Choose where to go next.` and presents genuinely equivalent directions.
- Standalone resolves quietly with `Kept standalone.` and no product-doctrine explanation.

The real Even specimen defaults to the **known relationship** because Babel already knows Even is part of the album. Prototype Info can switch to `Unattached` to exercise the unknown branch.

This grammar stays WORLD-local until repeated evidence elsewhere earns promotion. Do not force it onto Achievements, which is a separate collection/discovery product hypothesis.

Visual identity is currently understood as layered **artist identity ↔ project/album identity**. It may be noticed, recommended, or clarified when relevant; do not build a full visual-identity workspace in Phase 1.

WORLD earns a standalone repo only after physical use proves independent value, the orientation/decision job survives more than one exact scenario, and enough WORLD-local structure is proven to stop treating it as disposable fake state.

## Immediate gates

1. Physically review the current FIRE Core top-of-product heartbeat on iPhone using the one-riff Original path; do not promote it into FIRE production merely because CI/deploy passed.
2. Physically review the current WORLD Phase 1 known-relationship path: FIRE finish → WORLD doorway → `Even · Album` → Suggested guidance.
3. Judge whether `Make the next musical anchor.` is instantly understandable or still too conceptual.
4. Verify `Why this?` stays visually subordinate when closed, expands locally without creating another card/modal, and contains enough rationale when opened.
5. Verify `Alternative` reads as clearly secondary and its header/supporting-copy hierarchy matches Babel's established title/meta grammar.
6. Use Prototype Info to test `Unattached`, `Needs context`, and `Open`; confirm none reintroduces track counts, progress rails, redundant orientation, or product-doctrine copy.
7. Leave Achievements untouched until its own product/physical review.
8. Keep the physically accepted shared shell frozen unless new device evidence contradicts it.

Do not create a WORLD repo, backend/account/sync layer, universal schema, universal shared UI package, full Artist Development curriculum, generic notes database, full visual-identity builder, or production FIRE Core implementation from Lab without evidence earning it.

Durable unresolved findings belong in Babel Truth Issue #1. Historical incidents belong in Git/PR/Issue history, not this handoff.
