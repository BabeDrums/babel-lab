const ACHIEVEMENTS = [
  {
    id: 'first-finish',
    title: 'First Finish',
    kind: 'standard',
    art: 'spark',
    summary: 'Carry a FIRE project through a complete production journey.',
    hint: 'Finish what you started.',
    source: 'FIRE'
  },
  {
    id: 'clear-space',
    title: 'Clear Space',
    kind: 'standard',
    art: 'arch',
    summary: 'Resolve a masking problem intentionally and evaluate the result.',
    hint: 'Make room without making it empty.',
    source: 'FIRE'
  },
  {
    id: 'carry-it-over',
    title: 'Carry It Over',
    kind: 'standard',
    art: 'diamond',
    summary: 'Demonstrate the same production judgment in a different context.',
    hint: 'Use what you learned somewhere new.',
    source: 'FIRE'
  },
  {
    id: 'late-light',
    title: 'Late Light',
    kind: 'secret',
    art: 'moon',
    summary: 'A hidden Babel discovery.',
    hint: '⟡ ⋮ ⊹ ⫶ ⌁ ⟠',
    source: 'FIRE'
  },
  {
    id: 'quiet-ember',
    title: 'Quiet Ember',
    kind: 'secret',
    art: 'ember',
    summary: 'A hidden Babel discovery.',
    hint: '⌁ ⟠ ⋮ ⟡ ⊹ ⋰',
    source: 'FIRE'
  }
];

const state = {
  unlocked: new Set(),
  view: { name: 'collection' }
};

function iconSvg(kind) {
  const a = 'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
  if (kind === 'arch') return `<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M17 50V31c0-12 6-20 15-20s15 8 15 20v19" ${a}/><path d="M24 50V31c0-7 3-12 8-12s8 5 8 12v19" ${a}/><path d="M13 50h38" ${a}/></svg>`;
  if (kind === 'diamond') return `<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M32 9 52 31 32 55 12 31 32 9Z" ${a}/><path d="M12 31h40M32 9l7 22-7 24-7-24 7-22Z" ${a}/></svg>`;
  if (kind === 'moon') return `<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M44 13c-16 2-24 21-13 34 8 9 20 9 28 1-7 3-15 0-20-6-7-10-4-23 5-29Z" ${a}/></svg>`;
  if (kind === 'ember') return `<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M32 10c8 10 13 17 13 25 0 9-6 17-13 17s-13-8-13-17c0-7 4-13 9-20 0 8 2 12 5 15 2-7 1-13-1-20Z" ${a}/></svg>`;
  return `<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M32 8l5 18 18 6-18 6-5 18-5-18-18-6 18-6 5-18Z" ${a}/><circle cx="32" cy="32" r="4" fill="currentColor"/></svg>`;
}

function topbar(detail) {
  return `<header class="lab-topbar">
    <div class="lab-topbar-left">
      ${detail
        ? '<button class="back-link" data-action="detail-back" aria-label="Back to achievements">←</button>'
        : '<a class="back-link" href="../" aria-label="Back to Babel Lab">←</a>'}
      <h1>${detail ? 'Achievement' : 'World Lab'}</h1>
    </div>
    <span class="experiment-tag">World-bound</span>
  </header>`;
}

function achievementCard(a) {
  const unlocked = state.unlocked.has(a.id);
  const secret = a.kind === 'secret';
  const title = unlocked ? a.title : (secret ? a.hint : 'Unknown');
  const subtitle = unlocked ? 'Achievement' : (secret ? 'Hidden' : 'Locked');
  return `<button class="achievement-card ${unlocked ? 'unlocked' : 'locked'} ${secret ? 'secret' : ''}" data-achievement="${a.id}">
    <div class="badge-wrap ${unlocked ? '' : 'silhouette'}">${iconSvg(a.art)}</div>
    <strong class="achievement-title ${secret && !unlocked ? 'glyph-text' : ''}">${title}</strong>
    <small>${subtitle}</small>
    ${unlocked ? '<span class="source-dot" aria-label="Source FIRE">🔥</span>' : ''}
  </button>`;
}

function renderCollection() {
  return `${topbar(false)}
    <main>
      <section class="section achievements-section">
        <div class="section-title-row">
          <div>
            <div class="eyebrow">Collection experiment</div>
            <h2>Achievements</h2>
          </div>
          <small>${state.unlocked.size}/${ACHIEVEMENTS.length}</small>
        </div>
        <div class="achievement-grid">${ACHIEVEMENTS.map(achievementCard).join('')}</div>
      </section>
    </main>
    <p class="lab-footnote">World Lab is an experiment. If World becomes a real product, it earns its own repository.</p>`;
}

function renderAchievement(id) {
  const a = ACHIEVEMENTS.find(item => item.id === id) || ACHIEVEMENTS[0];
  const unlocked = state.unlocked.has(a.id);
  const visibleTitle = unlocked ? a.title : (a.kind === 'secret' ? a.hint : 'Unknown Achievement');
  const visibleSummary = unlocked ? a.summary : (a.kind === 'secret' ? 'Something is here, but it has not revealed itself yet.' : a.hint);

  return `${topbar(true)}
    <main>
      <section class="achievement-detail section card ${unlocked ? 'unlocked' : 'locked'} ${a.kind === 'secret' ? 'secret' : ''}">
        <div class="detail-badge ${unlocked ? '' : 'silhouette'}">${iconSvg(a.art)}</div>
        <div class="eyebrow">${unlocked ? 'Earned achievement' : (a.kind === 'secret' ? 'Hidden achievement' : 'Locked achievement')}</div>
        <h2 class="${a.kind === 'secret' && !unlocked ? 'glyph-text' : ''}">${visibleTitle}</h2>
        <p>${visibleSummary}</p>
        ${unlocked ? '<button class="source-mark" data-action="source-quick">🔥 <span>FIRE</span></button>' : ''}
      </section>

      <section class="developer-panel section card">
        <div>
          <div class="eyebrow">Developer</div>
          <strong>Prototype state</strong>
          <p>Achievement earning logic is intentionally not implemented.</p>
        </div>
        <button class="${unlocked ? 'secondary-btn' : 'primary-btn'}" data-action="toggle-achievement" data-id="${a.id}">${unlocked ? 'Lock achievement' : 'Earn achievement'}</button>
      </section>
    </main>`;
}

function render() {
  const app = document.getElementById('app');
  app.innerHTML = state.view.name === 'achievement' ? renderAchievement(state.view.id) : renderCollection();
  bindEvents();
}

function openAchievement(id) {
  state.view = { name: 'achievement', id };
  history.pushState({ worldDetail: true, id, fromCollection: true }, '', `#achievement=${encodeURIComponent(id)}`);
  window.scrollTo({ top: 0, behavior: 'auto' });
  render();
}

function detailBack() {
  if (history.state && history.state.fromCollection) {
    history.back();
  } else {
    history.replaceState(null, '', location.pathname);
    state.view = { name: 'collection' };
    render();
  }
}

function readLocation() {
  const match = location.hash.match(/^#achievement=([^&]+)$/);
  if (match) {
    const id = decodeURIComponent(match[1]);
    if (ACHIEVEMENTS.some(a => a.id === id)) {
      state.view = { name: 'achievement', id };
      return;
    }
  }
  state.view = { name: 'collection' };
}

function quickSource() {
  const root = document.getElementById('quickview-root');
  root.innerHTML = `<div class="quickview-backdrop" data-dismiss>
    <div class="quickview" role="dialog" aria-modal="true" aria-labelledby="source-title">
      <div class="eyebrow">Source mark experiment</div>
      <h3 id="source-title">🔥 FIRE</h3>
      <p>This temporary mark shows where the achievement originated. It does not represent skill level or power.</p>
      <button class="primary-btn" data-dismiss>Got it</button>
    </div>
  </div>`;
  root.querySelectorAll('[data-dismiss]').forEach(el => {
    el.addEventListener('click', e => {
      if (e.target === el || el.tagName === 'BUTTON') root.innerHTML = '';
    });
  });
}

function bindEvents() {
  document.querySelectorAll('[data-achievement]').forEach(el => el.addEventListener('click', () => openAchievement(el.dataset.achievement)));
  document.querySelectorAll('[data-action="detail-back"]').forEach(el => el.addEventListener('click', detailBack));
  document.querySelectorAll('[data-action="source-quick"]').forEach(el => el.addEventListener('click', quickSource));
  document.querySelectorAll('[data-action="toggle-achievement"]').forEach(el => el.addEventListener('click', () => {
    const id = el.dataset.id;
    if (state.unlocked.has(id)) state.unlocked.delete(id); else state.unlocked.add(id);
    render();
  }));
}

window.addEventListener('popstate', () => {
  readLocation();
  render();
});

readLocation();
render();
