from pathlib import Path
import re
import sys

OWNER = Path('shared/header-reference.css')
SHARED_SELECTORS = (
    '.lab-topbar',
    '.context-topbar',
    '.back-link',
    '.context-info-btn',
    '.lab-header',
    '.lab-page-header',
    '.context-header',
)

errors = []

for path in sorted(Path('.').rglob('*.css')):
    if path == OWNER:
        continue
    text = path.read_text(encoding='utf-8')
    text = re.sub(r'/\*.*?\*/', '', text, flags=re.S)
    for match in re.finditer(r'([^{}]+)\{([^{}]*)\}', text, flags=re.S):
        selector = ' '.join(match.group(1).split())
        if any(token in selector for token in SHARED_SELECTORS):
            errors.append(f'{path}: shared header selector must be owned by {OWNER}: {selector}')

if errors:
    print('\n'.join(errors))
    sys.exit(1)

print('Shared header ownership is clean.')
