# Babel Truth Pointer — Lab

Babel Lab follows shared cross-app authority from:

- Truth repo: `BabeDrums/babel-truth`
- Last reconciled Truth commit: `9b9414ca360035fd76c2b30db5ecbe561bf130fe`
- Frozen shell reference implementation: Babel FIRE `4a258c5170dd1d96dcbc0f2b0a9c35b283cec489`
- Unresolved durable continuity: Babel Truth Issue #1 — `Babel Continuity Buffer`

## Shared read order

1. Babel Truth `START_HERE.md` at the commit above
2. Babel Truth `AGENTS.md`
3. Babel Truth `FOUNDATIONS.md` when shared product/design/interaction foundations matter
4. ADR 0004 when generic shell implementation/reference boundaries matter
5. ADR 0006 when an existing owning product uses Lab for bounded unproven interaction incubation or shared-surface concurrency matters
6. local `START_HERE.md`
7. the relevant active experiment/code
8. relevant Issue #1 items

## Ownership

> **Lab is evidence, never authority.**

Lab owns experiments only. It may deliberately diverge from Truth when the divergence is the hypothesis being tested. FIRE/WORLD/future products do not inherit a design or behavior merely because it exists in Lab.

For generic shell roles, Lab is a **reference consumer** rather than a parallel design system. Same-role page frame, toolbar, typography, common action, surface, row, field/control, temporary-UI, responsive, accessibility, and motion behavior should reconcile to the frozen FIRE G7 reference before experiment-specific expression is layered on top.

ADR 0006 permits a clearly bounded existing-product audition in Lab with fake/local state. The owning product still owns doctrine, canonical behavior, runtime/data, and promoted implementation. `fire/core/**` is the current FIRE-specific incubation lane; it is not a second authoritative FIRE runtime.

The Lab Shell Gallery is a living shared-UI proving/showroom environment. FIRE's historical frozen G7 Shell Test remains owning-product certification evidence; the two have different jobs.

Truth adoption is explicit. This pointer advances only after reviewing the newer Truth contract and reconciling Lab against it; it does not create a runtime dependency on FIRE or turn Lab into a shared component package.
