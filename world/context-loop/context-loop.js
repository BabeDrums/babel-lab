const STORAGE_KEY = 'babel-world-context-loop-v0';

const DEFAULT_STATE = {
  stage: 'handoff',
  linked: false,
  fireProgress: 'active-focus',
  declined: false
};

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    return saved && typeof saved === 'object' ? { ...DEFAULT_STATE, ...saved } : { ...DEFAULT_STATE };
  } catch (_) {
    return { ...DEFAULT_STATE };
  }
}

let state = loadState();

function saveState() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (_) {}
}

function updateState(patch) {
  state = { ...state, ...patch };
  saveState();
  window.scrollTo({ top: 0, behavior: 'auto' });
  render();
}

function resetState() {
  state = { ...DEFAULT_STATE };
  try { localStorage.removeItem(STORAGE_KEY); } catch (_) {}
  closePrototypeInfo();
  window.scrollTo({ top: 0, behavior: 'auto' });
  render();
}

function topbar() {
  return `<header class="context-topbar">
    <a class="back-link" href="../../" aria-label="Back to Babel Lab">←</a>
    <button class="context-info-btn" data-action="prototype-info" aria-label="Prototype info">i</button>
  </header>`;
}

function header(kicker, title, subtitle) {
  return `<div class="context-header">
    ${kicker ? `<div class="eyebrow">${kicker}</div>` : ''}
    <h1>${title}</h1>
    ${subtitle ? `<p>${subtitle}</p>` : ''}
  </div>`;
}

function objectRow(icon, name, type, status) {
  return `<div class="object-row">
    <div class="object-icon" aria-hidden="true">${icon}</div>
    <div class="object-copy"><strong>${name}</strong><small>${type}</small></div>
    ${status ? `<div class="object-state">${status}</div>` : ''}
  </div>`;
}

function shell(kicker, title, subtitle, body) {
  return `${topbar()}${header(kicker, title, subtitle)}<main class="context-main">${body}</main>`;
}

function renderHandoff() {
  return shell(
    'FIRE',
    'Even',
    'Song',
    `<section class="context-card">
      <h2>There’s a bigger picture available.</h2>
      <p class="lede">If this song is part of something larger, WORLD can help connect it.</p>

      <div class="context-object-space">
        ${objectRow('♪', 'Even', 'Song', 'In FIRE')}
      </div>

      <div class="action-stack">
        <button class="context-primary" data-action="open-world">See the bigger picture</button>
        <button class="context-quiet" data-action="decline-world">Not right now</button>
      </div>
    </section>`
  );
}

function renderRelationship() {
  return shell(
    'WORLD',
    'Connect the work',
    'Even · Song',
    `<section class="context-card question-card">
      ${objectRow('♪', 'Even', 'Song', '')}
      <div class="relationship"><span>possible relationship</span><span class="relationship-line"></span></div>
      ${objectRow('◫', 'Even', 'Album', '')}

      <p class="question">Is this song part of the album <strong>Even</strong>?</p>

      <div class="action-stack">
        <button class="context-primary" data-action="confirm-link">Yes — link it</button>
        <button class="context-secondary" data-action="decline-world">Not right now</button>
      </div>
    </section>`
  );
}

function firstRecommendation() {
  return `<div class="recommendation">
    <div class="recommendation-label">Recommended now</div>
    <h3>Finish the current production move before expanding the album plan.</h3>
    <div class="reason"><strong>Why</strong><span>You already have momentum in the song. More planning right now would pull you away from making.</span></div>
    <div class="alternative"><strong>Alternative:</strong> pause and capture one sentence about what the album should feel like as a whole.</div>
  </div>`;
}

function updatedRecommendation() {
  return `<div class="recommendation">
    <div class="recommendation-label">Recommended now</div>
    <h3>Choose the next production decision for the song.</h3>
    <div class="reason"><strong>Why</strong><span>The latest production pass has a useful stopping point, and the album relationship is already in place.</span></div>
    <div class="alternative"><strong>Alternative:</strong> pause production and define one album-level direction before pushing the song further.</div>
  </div>`;
}

function renderWorld() {
  return shell(
    'WORLD',
    'Even',
    'Album',
    `<section class="context-card">
      <h2>Even is connected.</h2>
      <p>The title song is now part of the album.</p>
      ${firstRecommendation()}
      <div class="action-stack">
        <button class="context-primary" data-action="continue-fire">Continue in FIRE</button>
        <button class="context-quiet" data-action="leave-world">Leave for now</button>
      </div>
    </section>`
  );
}

function renderFire() {
  return shell(
    'FIRE',
    'Even',
    'Song · part of Even',
    `<section class="context-card">
      <h2>Back to the song.</h2>
      <p>The album connection is already here. You don’t need to set it up again.</p>

      <div class="action-stack">
        <button class="context-primary" data-action="simulate-progress">Simulate production progress</button>
        <button class="context-quiet" data-action="back-world">Back to WORLD</button>
      </div>
    </section>`
  );
}

function renderFireUpdated() {
  return shell(
    'FIRE',
    'Even',
    'Song · part of Even',
    `<section class="context-card">
      <h2>A production pass is complete.</h2>
      <p>You’ve reached a useful stopping point and can decide what deserves attention next.</p>

      <div class="action-stack">
        <button class="context-primary" data-action="return-progress">Return to WORLD</button>
      </div>
    </section>`
  );
}

function renderFireNext() {
  return shell(
    'FIRE',
    'Even',
    'Song · part of Even',
    `<section class="context-card">
      <h2>Ready for the next production decision.</h2>
      <p>Your place in the larger project is still attached.</p>

      <div class="action-stack">
        <button class="context-secondary" data-action="back-world-updated">Back to WORLD</button>
      </div>
    </section>`
  );
}

function renderWorldUpdated() {
  return shell(
    'WORLD',
    'Even',
    'Album',
    `<section class="context-card">
      <h2>The project moved forward.</h2>
      <div class="change-note">
        <strong>Even · Song</strong>
        <p>The latest production pass reached a useful stopping point.</p>
      </div>

      ${updatedRecommendation()}

      <div class="action-stack">
        <button class="context-primary" data-action="continue-fire">Continue in FIRE</button>
        <button class="context-secondary" data-action="leave-world">Leave for now</button>
      </div>
    </section>`
  );
}

function renderAway() {
  return `${topbar()}<main class="interruption">
    <div>
      <div class="pause-mark" aria-hidden="true">···</div>
      <h2>You stepped away from Even.</h2>
      <p>Come back when you’re ready.</p>
      <div class="action-stack">
        <button class="context-primary" data-action="return-after-break">Return to Even</button>
      </div>
    </div>
  </main>`;
}

function renderReentry() {
  return shell(
    'WORLD',
    'Welcome back to Even',
    'Album',
    `<section class="context-card">
      <h2>Here’s where you left off.</h2>

      <div class="reentry-summary">
        <div class="reentry-item"><small>LAST TIME</small><strong>The title song was connected to the album.</strong></div>
        <div class="reentry-item"><small>WHAT CHANGED</small><strong>Even · Song reached a production stopping point.</strong></div>
        <div class="reentry-item"><small>NEXT</small><strong>Choose the next production decision in FIRE.</strong><p>Or pause and define one album-level direction first.</p></div>
      </div>

      <div class="action-stack">
        <button class="context-primary" data-action="continue-fire">Continue in FIRE</button>
        <button class="context-secondary" data-action="back-world-updated">Stay with the album</button>
      </div>
    </section>`
  );
}

function renderDeclined() {
  return shell(
    'FIRE',
    'Even',
    'Song',
    `<section class="context-card declined">
      <div>
        <h2>Stay with the song.</h2>
        <p class="lede">WORLD won’t keep asking. You can come back to the bigger picture later if it becomes useful.</p>
      </div>
    </section>`
  );
}

function openPrototypeInfo() {
  const root = document.getElementById('quickview-root');
  root.innerHTML = `<div class="quickview-backdrop" data-dismiss>
    <div class="quickview" role="dialog" aria-modal="true" aria-labelledby="prototype-info-title">
      <div class="eyebrow">Prototype info</div>
      <h3 id="prototype-info-title">Context Loop v0</h3>
      <p>This is a Babel Lab prototype using local state on this device. It is not connected to the real FIRE or WORLD products.</p>
      <div class="prototype-actions">
        <button class="secondary-btn" data-action="reset">Reset specimen</button>
        <button class="primary-btn" data-dismiss>Done</button>
      </div>
    </div>
  </div>`;
  bindPrototypeInfoEvents();
}

function closePrototypeInfo() {
  const root = document.getElementById('quickview-root');
  if (root) root.innerHTML = '';
}

function bindPrototypeInfoEvents() {
  const root = document.getElementById('quickview-root');
  root.querySelectorAll('[data-dismiss]').forEach(el => {
    el.addEventListener('click', e => {
      if (e.target === el || el.tagName === 'BUTTON') closePrototypeInfo();
    });
  });
  root.querySelectorAll('[data-action="reset"]').forEach(el => el.addEventListener('click', resetState));
}

function render() {
  const app = document.getElementById('app');
  const views = {
    handoff: renderHandoff,
    relationship: renderRelationship,
    world: renderWorld,
    fire: renderFire,
    'fire-updated': renderFireUpdated,
    'fire-next': renderFireNext,
    'world-updated': renderWorldUpdated,
    away: renderAway,
    reentry: renderReentry,
    declined: renderDeclined
  };
  const renderer = views[state.stage] || renderHandoff;
  app.innerHTML = renderer();
  bindEvents();
}

function bindEvents() {
  document.querySelectorAll('[data-action]').forEach(button => {
    button.addEventListener('click', () => {
      const action = button.dataset.action;
      if (action === 'prototype-info') return openPrototypeInfo();
      if (action === 'open-world') return updateState({ stage: 'relationship' });
      if (action === 'decline-world') return updateState({ stage: 'declined', declined: true, linked: false });
      if (action === 'confirm-link') return updateState({ stage: 'world', linked: true, declined: false });
      if (action === 'continue-fire') return updateState({ stage: state.fireProgress === 'rough-pass' ? 'fire-next' : 'fire' });
      if (action === 'simulate-progress') return updateState({ stage: 'fire-updated', fireProgress: 'rough-pass' });
      if (action === 'return-progress') return updateState({ stage: 'world-updated', fireProgress: 'rough-pass' });
      if (action === 'back-world') return updateState({ stage: 'world' });
      if (action === 'leave-world') return updateState({ stage: 'away' });
      if (action === 'return-after-break') return updateState({ stage: 'reentry' });
      if (action === 'back-world-updated') return updateState({ stage: 'world-updated' });
    });
  });
}

render();
