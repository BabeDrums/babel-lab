const STORAGE_KEY = 'babel-world-context-loop-v1';

const DEFAULT_STATE = {
  stage: 'fire-finish',
  scenario: 'known',
  projectName: 'Even',
  createdNewProject: false
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

function resetState(scenario = state.scenario || 'known') {
  state = { ...DEFAULT_STATE, scenario };
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (_) {}
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

function shell(kicker, title, subtitle, body) {
  return `${topbar()}${header(kicker, title, subtitle)}<main class="context-main">${body}</main>`;
}

function objectRow(icon, name, type, status = '') {
  return `<div class="object-row">
    <div class="object-icon" aria-hidden="true">${icon}</div>
    <div class="object-copy"><strong>${name}</strong><small>${type}</small></div>
    ${status ? `<div class="object-state">${status}</div>` : ''}
  </div>`;
}

function projectChoice(icon, name, type, action) {
  return `<button class="project-choice" data-action="${action}">
    <span class="object-icon" aria-hidden="true">${icon}</span>
    <span class="object-copy"><strong>${name}</strong><small>${type}</small></span>
    <span class="choice-chevron" aria-hidden="true">›</span>
  </button>`;
}

function renderFireFinish() {
  const known = state.scenario === 'known';
  return shell(
    'FIRE',
    'Even',
    known ? 'Song · Even album' : 'Song',
    `<section class="context-card finish-card">
      <div class="status-pill">Ready</div>
      <h2>The production pass is complete.</h2>
      <p class="lede">Even has reached a natural stopping point.</p>

      ${known ? `<div class="known-project">
        <div class="known-label">Part of</div>
        ${objectRow('◫', 'Even', 'Album', '')}
      </div>` : ''}
    </section>

    <section class="context-card next-level-card">
      <div class="eyebrow">Take it further</div>
      <h2>${known ? 'See what this changes for the album.' : 'See whether this belongs to something larger.'}</h2>
      <p>${known ? 'Step back from the song and look at the bigger creative picture.' : 'WORLD can help place the finished song in a larger project when that actually matters.'}</p>
      <div class="action-stack">
        <button class="context-primary" data-action="open-world">Open in WORLD</button>
        <button class="context-quiet" data-action="stay-fire">Stay in FIRE</button>
      </div>
    </section>`
  );
}

function renderStayFire() {
  return shell(
    'FIRE',
    'Even',
    state.scenario === 'known' ? 'Song · Even album' : 'Song',
    `<section class="context-card quiet-result">
      <h2>Done for now.</h2>
      <p class="lede">The broader path stays optional. Nothing else needs your attention here.</p>
      <div class="action-stack">
        <button class="context-secondary" data-action="back-finish">Back</button>
      </div>
    </section>`
  );
}

function renderProjectChoice() {
  return shell(
    'WORLD',
    'Where does Even belong?',
    'Song',
    `<section class="context-card choice-card">
      <h2>Is this part of something larger?</h2>
      <p class="lede">Choose an existing project, start something new, or keep the song on its own.</p>

      <div class="choice-group">
        <div class="choice-label">Existing</div>
        ${projectChoice('◫', 'Even', 'Album', 'choose-even-album')}
      </div>

      <div class="action-stack compact-actions">
        <button class="context-secondary" data-action="new-album">Create new album</button>
        <button class="context-quiet" data-action="standalone">Keep it standalone</button>
      </div>
    </section>`
  );
}

function renderNewAlbum() {
  return shell(
    'WORLD',
    'Start something new',
    'Even · Song',
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

function recommendation(projectName) {
  return `<section class="recommendation">
    <div class="recommendation-label">Recommended now</div>
    <h3>Capture what “Even” establishes for ${projectName}.</h3>
    <div class="reason">
      <strong>Why</strong>
      <span>The title track is fresh evidence. One short album-level takeaway can give the rest of the project something real to relate to without turning this into a planning session.</span>
    </div>
    <div class="alternative"><strong>Alternative</strong><span>Skip the reflection and go straight back to FIRE with the next song that already has momentum.</span></div>
  </section>`;
}

function renderWorldProject() {
  const isEvenAlbum = state.projectName === 'Even';
  const albumSequence = isEvenAlbum
    ? `<div class="album-sequence" aria-label="Album sequence"><strong>Even</strong><span>After</span><span>Fire</span><span>Fades</span><span>Embers</span><span>Still</span><span>Glow</span></div>`
    : `<p class="new-project-note">Even is the first song attached to this album.</p>`;

  return shell(
    'WORLD',
    state.projectName,
    'Album',
    `<section class="context-card project-card">
      <div class="project-heading">
        <div>
          <div class="eyebrow">Album</div>
          <h2>${state.projectName}</h2>
        </div>
        ${isEvenAlbum ? '<div class="project-count">7 songs</div>' : '<div class="project-count">1 song</div>'}
      </div>
      ${albumSequence}
      <div class="project-song">${objectRow('♪', 'Even', 'Song', 'Ready')}</div>
    </section>

    ${recommendation(state.projectName)}

    <div class="world-footer-action">
      <button class="context-secondary" data-action="back-finish">Back to FIRE</button>
    </div>`
  );
}

function renderStandalone() {
  return shell(
    'WORLD',
    'Even',
    'Song',
    `<section class="context-card quiet-result">
      <h2>No bigger project needed.</h2>
      <p class="lede">If Even is meant to stand on its own, WORLD does not need to invent extra structure around it.</p>
      <div class="action-stack">
        <button class="context-secondary" data-action="back-finish">Back to FIRE</button>
      </div>
    </section>`
  );
}

function openPrototypeInfo() {
  const root = document.getElementById('quickview-root');
  const knownActive = state.scenario === 'known' ? 'active' : '';
  const unknownActive = state.scenario === 'unknown' ? 'active' : '';
  root.innerHTML = `<div class="quickview-backdrop" data-dismiss>
    <div class="quickview" role="dialog" aria-modal="true" aria-labelledby="prototype-info-title">
      <div class="eyebrow">Prototype info</div>
      <h3 id="prototype-info-title">Context Loop v1</h3>
      <p>This Lab specimen tests one moment only: a finished FIRE song optionally stepping into WORLD for a useful larger-project next move.</p>

      <div class="scenario-control" aria-label="Test scenario">
        <div class="scenario-label">Test relationship state</div>
        <div class="scenario-options">
          <button class="scenario-option ${knownActive}" data-scenario="known">Already known</button>
          <button class="scenario-option ${unknownActive}" data-scenario="unknown">Unknown</button>
        </div>
      </div>

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
  root.querySelectorAll('[data-action="reset"]').forEach(el => el.addEventListener('click', () => resetState()));
  root.querySelectorAll('[data-scenario]').forEach(el => {
    el.addEventListener('click', () => resetState(el.dataset.scenario));
  });
}

function bindCreateAlbumField() {
  const input = document.getElementById('album-name');
  const button = document.querySelector('[data-action="create-album"]');
  if (!input || !button) return;
  const sync = () => { button.disabled = !input.value.trim(); };
  input.addEventListener('input', sync);
  sync();
}

function render() {
  const app = document.getElementById('app');
  const views = {
    'fire-finish': renderFireFinish,
    'stay-fire': renderStayFire,
    'project-choice': renderProjectChoice,
    'new-album': renderNewAlbum,
    'world-project': renderWorldProject,
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
        return updateState({ stage: state.scenario === 'known' ? 'world-project' : 'project-choice', projectName: 'Even', createdNewProject: false });
      }
      if (action === 'stay-fire') return updateState({ stage: 'stay-fire' });
      if (action === 'back-finish') return updateState({ stage: 'fire-finish' });
      if (action === 'choose-even-album') return updateState({ stage: 'world-project', projectName: 'Even', createdNewProject: false });
      if (action === 'new-album') return updateState({ stage: 'new-album' });
      if (action === 'back-choice') return updateState({ stage: 'project-choice' });
      if (action === 'standalone') return updateState({ stage: 'standalone' });
      if (action === 'create-album') {
        const input = document.getElementById('album-name');
        const name = input ? input.value.trim() : '';
        if (!name) return;
        return updateState({ stage: 'world-project', projectName: name, createdNewProject: true });
      }
    });
  });
}

render();
