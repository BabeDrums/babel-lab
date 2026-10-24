# Why this baseline exists

A shell experiment is only useful when the surrounding product behavior is stable enough that visual differences are attributable. The previous simplified harness introduced its own navigation, row geometry, explanatory chrome, and dead controls. That made review partly about the harness instead of the shell.

This baseline fixes that by treating current G7 as the control condition while keeping Lab isolated and non-authoritative.
