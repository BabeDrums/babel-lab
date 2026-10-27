const STORAGE_KEY = 'babel-world-phase-1-v2';

const OPEN_DIRECTIONS = [
  { id: 'music', label: 'Music', detail: 'Make another song.' },
  { id: 'visual', label: 'Visual identity', detail: 'Shape how the album looks.' },
  { id: 'story', label: 'Story / world', detail: 'Clarify what the album is about.' }
];

const GUIDANCE = {
  music: {
    kicker: 'Suggested next',
    title: 'Make the next musical anchor.',
    rationale: 'Another finished song gives you another reference point for the album’s identity without asking one song to define it.',
    alternative: 'Shape the album’s visual identity.'
  },
  visual: {
    kicker: 'Suggested next',
    title: 'Shape the album’s visual identity.',
    rationale: 'The finished song gives the visual side something real to respond to while it’s still fresh.',
    alternative: 'Make another song.'
  }
};

const DEFAULT_STATE = {
  stage: 'fire-finish',
  relationship: 'known',
  projectName: 'Even',
  createdNewProject: false,
  decisionMode: 'suggested',
  contextAnswer: null,
  openChoice: null,
  randomChoice: null
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
let randomTimer = null;

function saveState() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (_) {}
}

function updateState(patch) {
  if (randomTimer) {
    window.clearInterval(randomTimer);
    randomTimer = null;
  }
  state = { ...state, ...patch };
  saveState();
  window.scrollTo({ top: 0, behavior: 'auto' });
  render();
}

function resetState(overrides = {}) {
  if (randomTimer) {
    window.clearInterval(randomTimer);
    randomTimer = null;
  }
  state = { ...DEFAULT_STATE, ...overrides };
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (_) {}
  closePrototypeInfo();
  window.scrollTo({ top: 0, behavior: 'auto' });
  render();
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  })[character]);
}

function topbar() {
  return `<header class="context-topbar">
    <a class="back-link" href="../../" aria-label="Back to Babel Lab">←</a>
    <button class="context-info-btn" data-action="prototype-info" aria-label="Prototype info">i</button>
  </header>`;
}

function header(kicker, title, subtitle = '') {
  return `<div class="context-header">
    ${kicker ? `<div class="eyebrow">${kicker}</div>` : ''}
    <h1>${title}</h1>
    ${subtitle ? `<p>${subtitle}</p>` : ''}
  </div>`;
}

function shell(kicker, title, subtitle, body, extraClass = '') {
  return `${topbar()}${header(kicker, title, subtitle)}<main class="context-main ${extraClass}">${body}</main>`;
}

function projectChoice(name, type, action) {
  return `<button class="project-choice" data-action="${action}">
    <span class="object-copy"><strong>${name}</strong><small>${type}</small></span>
    <span class="choice-chevron" aria-hidden="true">›</span>
  </button>`;
}

function nextWorldStage() {
  if (state.decisionMode === 'question' && !state.contextAnswer) return 'context-question';
  if (state.decisionMode === 'open') return 'world-open';
  return state.contextAnswer === 'anchor' ? 'world-visual' : 'world-suggested';
}

function renderFireFinish() {
  return `${topbar()}<main class="fire-finish-screen">
    <div class="fire-finish-identity">
      <div class="eyebrow">FIRE</div>
      <h1>Even</h1>
    </div>

    <section class="completion-moment" aria-label="Song complete">
      <div class="completion-mark" aria-hidden="true">✓</div>
      <h2>You’re done.</h2>
    </section>

    <section class="world-invite">
      <h3>Want to take it further?</h3>
      <button class="world-doorway" data-action="open-world" aria-label="Open in WORLD">
        <span class="world-doorway-balance" aria-hidden="true"></span>
        <span class="world-doorway-label">WORLD</span>
        <span class="world-doorway-chevron" aria-hidden="true">›</span>
      </button>
    </section>
  </main>`;
}

function renderProjectChoice() {
  return shell(
    'WORLD',
    'Even',
    'Finished song',
    `<section class="relationship-step">
      <div class="step-label">Required next</div>
      <h2>Where does this belong?</h2>

      <div class="choice-group">
        <div class="choice-label">Existing project</div>
        ${projectChoice('Even', 'Album', 'choose-even-album')}
      </div>

      <div class="relationship-actions">
        <button class="context-secondary" data-action="new-album">Create new album</button>
        <button class="context-quiet" data-action="standalone">Keep it standalone</button>
      </div>
    </section>`,
    'relationship-main'
  );
}

function renderNewAlbum() {
  return shell(
    'WORLD',
    'New album',
    'Even · finished song',
    `<section class="context-card create-card">
      <label class="field-label" for="album-name">Album name</label>
      <input id="album-name" class="context-input" type="text" autocomplete="off" autocapitalize="words" placeholder="Name the album" />
      <div class="action-stack">
        <button class="context-primary" data-action="create-album" disabled>Create album</button>
        <button class="context-quiet" data-action="back-choice">Cancel</button>
      </div>
    </section>`
  );
}

function guidanceDecision(kind = 'music') {
  const guidance = GUIDANCE[kind] || GUIDANCE.music;
  return `<section class="guidance-card">
    <div class="guidance-primary">
      <div class="guidance-kicker">${guidance.kicker}</div>
      <h2>${guidance.title}</h2>
      <details class="guidance-why">
        <summary><span>Why this?</span><span class="guidance-why-chevron" aria-hidden="true"></span></summary>
        <p>${guidance.rationale}</p>
      </details>
    </div>
    <div class="guidance-alternative">
      <h3>Alternative</h3>
      <p>${guidance.alternative}</p>
    </div>
  </section>`;
}

function renderWorldSuggested() {
  return shell(
    'WORLD',
    escapeHTML(state.projectName),
    'Album',
    guidanceDecision('music'),
    'guidance-main'
  );
}

function renderWorldVisual() {
  return shell(
    'WORLD',
    escapeHTML(state.projectName),
    'Album',
    guidanceDecision('visual'),
    'guidance-main'
  );
}

function renderContextQuestion() {
  return shell(
    'WORLD',
    escapeHTML(state.projectName),
    'Album',
    `<section class="guidance-card context-question">
      <div class="guidance-primary">
        <h2>Is Even meant to set the direction for the album?</h2>
      </div>
      <div class="question-options">
        <button class="question-option" data-context-answer="anchor">Yeah — it’s an anchor</button>
        <button class="question-option" data-context-answer="piece">It’s one piece of it</button>
        <button class="question-option" data-context-answer="unsure">I’m not sure yet</button>
      </div>
    </section>`,
    'guidance-main'
  );
}

function directionButton(direction) {
  const selected = state.openChoice === direction.id ? 'is-selected' : '';
  return `<button class="direction-option ${selected}" data-direction="${direction.id}">
    <strong>${direction.label}</strong>
    <span>${direction.detail}</span>
  </button>`;
}

function renderWorldOpen() {
  const randomText = state.randomChoice
    ? `Try ${OPEN_DIRECTIONS.find(item => item.id === state.randomChoice)?.label || 'something new'}`
    : 'Pick for me';

  return shell(
    'WORLD',
    escapeHTML(state.projectName),
    'Album',
    `<section class="guidance-card open-decision">
      <div class="guidance-primary">
        <div class="guidance-kicker">Open</div>
        <h2>Choose where to go next.</h2>
      </div>
      <div class="direction-grid">
        ${OPEN_DIRECTIONS.map(directionButton).join('')}
      </div>
      <button class="random-picker" data-action="random-pick">
        <span data-random-label>${randomText}</span>
      </button>
    </section>`,
    'guidance-main'
  );
}

function renderStandalone() {
  return shell(
    'WORLD',
    'Even',
    'Finished song',
    `<section class="quiet-result">
      <div class="completion-mark small" aria-hidden="true">✓</div>
      <h2>Kept standalone.</h2>
      <button class="context-secondary standalone-back" data-action="back-finish">Back to FIRE</button>
    </section>`
  );
}

function openPrototypeInfo() {
  const root = document.getElementById('quickview-root');
  root.innerHTML = `<div class="quickview-backdrop" data-dismiss>
    <div class="quickview prototype-sheet" role="dialog" aria-modal="true" aria-labelledby="prototype-info-title">
      <h3 id="prototype-info-title">WORLD Phase 1</h3>
      <div class="prototype-sheet-meta">Prototype controls · local only</div>

      <div class="prototype-setting-list">
        <div class="prototype-setting-row">
          <label for="prototype-relationship">Song relationship</label>
          <span class="prototype-select-wrap">
            <select id="prototype-relationship" class="prototype-select" data-prototype-relationship>
              <option value="known" ${state.relationship === 'known' ? 'selected' : ''}>Already in Even</option>
              <option value="unknown" ${state.relationship === 'unknown' ? 'selected' : ''}>Unattached</option>
            </select>
          </span>
        </div>
        <div class="prototype-setting-row">
          <label for="prototype-decision">Guidance</label>
          <span class="prototype-select-wrap">
            <select id="prototype-decision" class="prototype-select" data-prototype-decision>
              <option value="suggested" ${state.decisionMode === 'suggested' ? 'selected' : ''}>Suggested</option>
              <option value="open" ${state.decisionMode === 'open' ? 'selected' : ''}>Open</option>
              <option value="question" ${state.decisionMode === 'question' ? 'selected' : ''}>Needs context</option>
            </select>
          </span>
        </div>
      </div>

      <div class="prototype-actions">
        <button class="primary-btn" data-dismiss>Done</button>
        <button class="prototype-reset" data-action="reset" type="button">Reset specimen</button>
      </div>
    </div>
  </div>`;
  bindPrototypeInfoEvents();
}

function closePrototypeInfo() {
  const root = document.getElementById('quickview-root');
  if (root) root.innerHTML = '';
}

function applyPrototypeScenario(patch) {
  state = {
    ...DEFAULT_STATE,
    relationship: state.relationship,
    decisionMode: state.decisionMode,
    ...patch
  };
  saveState();
  window.scrollTo({ top: 0, behavior: 'auto' });
  render();
}

function bindPrototypeInfoEvents() {
  const root = document.getElementById('quickview-root');
  root.querySelectorAll('[data-dismiss]').forEach(el => {
    el.addEventListener('click', event => {
      if (event.target === el || el.tagName === 'BUTTON') closePrototypeInfo();
    });
  });

  root.querySelectorAll('[data-action="reset"]').forEach(el => {
    el.addEventListener('click', () => resetState({
      relationship: state.relationship,
      decisionMode: state.decisionMode
    }));
  });

  const relationship = root.querySelector('[data-prototype-relationship]');
  if (relationship) {
    relationship.addEventListener('change', () => applyPrototypeScenario({ relationship: relationship.value }));
  }

  const decision = root.querySelector('[data-prototype-decision]');
  if (decision) {
    decision.addEventListener('change', () => applyPrototypeScenario({ decisionMode: decision.value }));
  }
}

function bindCreateAlbumField() {
  const input = document.getElementById('album-name');
  const button = document.querySelector('[data-action="create-album"]');
  if (!input || !button) return;
  const sync = () => { button.disabled = !input.value.trim(); };
  input.addEventListener('input', sync);
  sync();
}

function runRandomPicker() {
  if (randomTimer) return;
  const label = document.querySelector('[data-random-label]');
  const button = document.querySelector('[data-action="random-pick"]');
  if (!label || !button) return;

  const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finalChoice = OPEN_DIRECTIONS[Math.floor(Math.random() * OPEN_DIRECTIONS.length)];

  if (reducedMotion) {
    updateState({ randomChoice: finalChoice.id, openChoice: finalChoice.id });
    return;
  }

  button.classList.add('is-picking');
  let index = 0;
  randomTimer = window.setInterval(() => {
    const current = OPEN_DIRECTIONS[index % OPEN_DIRECTIONS.length];
    label.textContent = current.label;
    index += 1;
    if (index >= 10) {
      window.clearInterval(randomTimer);
      randomTimer = null;
      state = { ...state, randomChoice: finalChoice.id, openChoice: finalChoice.id };
      saveState();
      render();
    }
  }, 85);
}

function render() {
  const app = document.getElementById('app');
  const views = {
    'fire-finish': renderFireFinish,
    'project-choice': renderProjectChoice,
    'new-album': renderNewAlbum,
    'context-question': renderContextQuestion,
    'world-suggested': renderWorldSuggested,
    'world-visual': renderWorldVisual,
    'world-open': renderWorldOpen,
    standalone: renderStandalone
  };

  const renderer = views[state.stage] || renderFireFinish;
  app.innerHTML = renderer();
  bindEvents();
  if (state.stage === 'new-album') bindCreateAlbumField();
}

function bindEvents() {
  document.querySelectorAll('[data-action]').forEach(button => {
    button.addEventListener('click', () => {
      const action = button.dataset.action;
      if (action === 'prototype-info') return openPrototypeInfo();
      if (action === 'open-world') {
        if (state.relationship === 'known') {
          return updateState({ stage: nextWorldStage(), projectName: 'Even', createdNewProject: false });
        }
        return updateState({ stage: 'project-choice', projectName: 'Even', createdNewProject: false });
      }
      if (action === 'choose-even-album') {
        state = { ...state, relationship: 'known', projectName: 'Even', createdNewProject: false };
        saveState();
        return updateState({ stage: nextWorldStage() });
      }
      if (action === 'new-album') return updateState({ stage: 'new-album' });
      if (action === 'back-choice') return updateState({ stage: 'project-choice' });
      if (action === 'standalone') return updateState({ stage: 'standalone' });
      if (action === 'back-finish') return updateState({ stage: 'fire-finish' });
      if (action === 'random-pick') return runRandomPicker();
      if (action === 'create-album') {
        const input = document.getElementById('album-name');
        const name = input ? input.value.trim() : '';
        if (!name) return;
        state = { ...state, relationship: 'known', projectName: name, createdNewProject: true };
        saveState();
        return updateState({ stage: nextWorldStage() });
      }
    });
  });

  document.querySelectorAll('[data-context-answer]').forEach(button => {
    button.addEventListener('click', () => {
      const answer = button.dataset.contextAnswer;
      if (answer === 'anchor') return updateState({ contextAnswer: answer, stage: 'world-visual' });
      if (answer === 'piece') return updateState({ contextAnswer: answer, stage: 'world-suggested' });
      return updateState({ contextAnswer: answer, stage: 'world-open' });
    });
  });

  document.querySelectorAll('[data-direction]').forEach(button => {
    button.addEventListener('click', () => updateState({ openChoice: button.dataset.direction, randomChoice: null }));
  });
}

render();