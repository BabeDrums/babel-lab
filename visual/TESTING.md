# Testing

The control baseline is intentionally browser-native and dependency-free.

Required acceptance is physical-device parity using `PARITY_CHECKLIST.md`. Static inspection alone is not shell approval.

The baseline must remain isolated from FIRE keys. Search for these strings before merge if storage code changes:

- `production-projects-v1`
- `production-projects-v1-v7-preview`

They must not be used by executable Visual Lab code.
