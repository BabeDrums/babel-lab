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
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (_) {}
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
  window.scrollTo({ top: 0, behavior: 'auto' });
  render();
}

function topbar() {
  return `<header class="context-topbar">
    <a class="back-link" href="../../" aria-label="Back to Babel Lab">←</a>
    <span class="prototype-mark">Local specimen<br>No backend or sync</span>
  </header>`;
}

function header(kicker, title, subtitle) {
  return `<div class="context-header">
    <div class="eyebrow">${kicker}</div>
    <h1>${title}</h1>
    ${subtitle ? `<p>${subtitle}</p>` : ''}
  </div>`;
}

function prototypeTools() {
  return `<div class="prototype-tools">
    <span>WORLD Context Loop v0 · fake/local state · reset clears the specimen only.</span>
    <button class="reset-btn" data-action="reset">Reset specimen</button>
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
  return `${topbar()}${header(kicker, title, subtitle)}<main class="context-main">${body}</main>${prototypeTools()}`;
}

function renderHandoff() {
  return shell(
    'FIRE → WORLD handoff experiment',
    'Even',
    'Song · prototype state after FIRE has already delivered a useful production continuation.',
    `<section class="context-card">
      <div class="eyebrow">Useful specialist value first</div>
      <h2>There’s a bigger context available.</h2>
      <p class="lede">FIRE can keep working on this song by itself. WORLD is optional here—it would only add the larger creative relationship around the work.</p>

      <div style="margin-top:20px">
        ${objectRow('♪', 'Even', 'Song · source: FIRE', 'Active focus')}
      </div>

      <div class="handoff-strip">
        <span class="mark" aria-hidden="true">↗</span>
        <div><strong>What would transfer</strong><p>Song identity, FIRE provenance, a high-level continuation point, and any broader decision you explicitly confirm. FIRE’s diagnosis and production reasoning stay in FIRE.</p></div>
      </div>

      <div class="action-stack">
        <button class="context-primary" data-action="open-world">See the bigger picture</button>
        <button class="context-quiet" data-action="decline-world">Stay in FIRE</button>
      </div>
    </section>`
  );
}

function renderRelationship() {
  return shell(
    'WORLD · smallest useful question',
    'Connect the work',
    'WORLD received the song context without asking you to rebuild it.',
    `<section class="context-card question-card">
      ${objectRow('♪', 'Even', 'Song · from FIRE', '')}
      <div class="relationship"><span>possible relationship</span><span class="relationship-line"></span></div>
      ${objectRow('◫', 'Even', 'Album · larger body of work', '')}

      <p class="question">Is this song part of the album <strong>Even</strong>?</p>
      <p style="margin-top:8px">This is the only new context WORLD needs for this handoff. It will not ask again once established.</p>

      <div class="action-stack">
        <button class="context-primary" data-action="confirm-link">Yes — link it</button>
        <button class="context-secondary" data-action="decline-world">Not right now</button>
      </div>
    </section>`
  );
}

function orientationRows(progress) {
  const workCopy = progress === 'rough-pass'
    ? 'The latest FIRE pass has a meaningful stopping point.'
    : 'A production move is already active in FIRE.';
  const workStatus = progress === 'rough-pass' ? 'Pass complete' : 'In motion';
  return `<div class="orientation-grid">
    <div class="orientation-row"><strong>Work</strong><span>${workCopy}</span><span class="status-pill">${workStatus}</span></div>
    <div class="orientation-row"><strong>Project</strong><span>This song is connected to the album Even. No larger plan is required yet.</span><span class="status-pill">Connected</span></div>
  </div>`;
}

function firstRecommendation() {
  return `<div class="recommendation">
    <div class="recommendation-label">Recommended now</div>
    <h3>Finish the current production move in FIRE before expanding the album plan.</h3>
    <div class="reason"><strong>Why</strong><span>You already have production momentum and there is no album-level blocker. More planning right now would add context switching instead of helping the song.</span></div>
    <div class="alternative"><strong>Alternative:</strong> pause the song and capture one sentence in your own notes about what the album should feel like as a whole.</div>
  </div>`;
}

function updatedRecommendation() {
  return `<div class="recommendation">
    <div class="recommendation-label">Recommended now</div>
    <h3>Choose the next production decision in FIRE—with the album relationship attached.</h3>
    <div class="reason"><strong>Why</strong><span>The first production move now has a useful stopping point. Production is still the focused job, but the next decision can happen without losing the fact that this song belongs to a larger body of work.</span></div>
    <div class="alternative"><strong>Alternative:</strong> pause production and establish one shared album-level direction before choosing what to push next.</div>
  </div>`;
}

function renderWorld() {
  return shell(
    'WORLD · larger-project orientation',
    'Even',
    'Album · only the context that matters to the current decision is shown.',
    `<section class="context-card">
      <div class="eyebrow">Relationship established</div>
      <h2>You’re not starting over.</h2>
      <p>WORLD knows this song came from FIRE and now belongs to the album Even. It does not need FIRE’s internal production reasoning to orient the larger project.</p>
      ${orientationRows('active-focus')}
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
    'Simulated specialist return',
    'Back in FIRE',
    'The focused product receives established context instead of re-onboarding you.',
    `<section class="context-card">
      <div class="eyebrow">Context received</div>
      <h2>Even · Song</h2>
      <p>FIRE still owns production. WORLD only handed back the broader meaning that matters here.</p>

      <div class="context-receipt" aria-label="Transferred context">
        <div class="receipt-row"><span>Song</span><span>Even</span></div>
        <div class="receipt-row"><span>Larger work</span><span>Even · Album</span></div>
        <div class="receipt-row"><span>Settled decision</span><span>This song belongs to the album; do not ask again.</span></div>
        <div class="receipt-row"><span>Continuation</span><span>Finish the current production move before expanding album planning.</span></div>
        <div class="receipt-row"><span>Provenance</span><span>FIRE owns production · WORLD owns the broader relationship in this specimen.</span></div>
      </div>

      <div class="handoff-strip">
        <span class="mark" aria-hidden="true">⊘</span>
        <div><strong>Not transferred</strong><p>Detailed listening observations, diagnoses, DAW experiments, processing reasoning, and production internals remain FIRE-local.</p></div>
      </div>

      <div class="action-stack">
        <button class="context-primary" data-action="simulate-progress">Simulate meaningful FIRE progress</button>
        <button class="context-quiet" data-action="back-world">Return to WORLD without changing FIRE state</button>
      </div>
    </section>`
  );
}

function renderFireUpdated() {
  return shell(
    'Simulated specialist return',
    'FIRE made progress',
    'The specimen now has one meaningful high-level state change to return to WORLD.',
    `<section class="context-card">
      <div class="eyebrow">Prototype FIRE state</div>
      <h2>A useful production pass reached a stopping point.</h2>
      <p>WORLD does not need the production diagnosis or every DAW move. For this experiment, the transferable change is deliberately thin.</p>

      <div class="context-receipt">
        <div class="receipt-row"><span>Record</span><span>Even · Song</span></div>
        <div class="receipt-row"><span>High-level state</span><span>Rough production pass complete</span></div>
        <div class="receipt-row"><span>Continuation</span><span>Ready to choose the next production decision</span></div>
        <div class="receipt-row"><span>Still private to FIRE</span><span>Observations, diagnosis, experiment details, and processing reasoning</span></div>
      </div>

      <div class="action-stack">
        <button class="context-primary" data-action="return-progress">Return meaningful state to WORLD</button>
      </div>
    </section>`
  );
}

function renderWorldUpdated() {
  return shell(
    'WORLD · state returned from FIRE',
    'Even',
    'Album · the larger context changed because one connected song changed meaningfully.',
    `<section class="context-card">
      <div class="eyebrow">WORLD re-oriented</div>
      <h2>The larger project moved without importing FIRE’s internals.</h2>
      ${orientationRows('rough-pass')}

      <div class="change-note">
        <strong>What changed</strong>
        <p>Even · Song moved from an active FIRE focus to a rough production pass with a useful stopping point. The album relationship stayed intact.</p>
      </div>

      ${updatedRecommendation()}

      <div class="action-stack">
        <button class="context-primary" data-action="leave-world">Leave WORLD</button>
        <button class="context-secondary" data-action="continue-fire">Continue refining in FIRE</button>
      </div>
    </section>`
  );
}

function renderAway() {
  return `${topbar()}<main class="interruption">
    <div>
      <div class="pause-mark" aria-hidden="true">···</div>
      <h2>Creative interruption simulated.</h2>
      <p>The local specimen has kept the relationship and high-level state. You can refresh or leave this page before returning; no account or backend is involved.</p>
      <div class="action-stack">
        <button class="context-primary" data-action="return-after-break">Return after interruption</button>
      </div>
    </div>
  </main>${prototypeTools()}`;
}

function renderReentry() {
  return shell(
    'WORLD · re-entry test',
    'Welcome back to Even',
    'The goal is to restore the creative thread before asking you to reconstruct anything.',
    `<section class="context-card">
      <div class="eyebrow">Re-entry summary</div>
      <h2>Here’s where the project actually is.</h2>

      <div class="reentry-summary">
        <div class="reentry-item"><small>WHERE YOU WERE</small><strong>Even · Album</strong><p>You were using WORLD to keep the title song connected to its larger project while production stayed in FIRE.</p></div>
        <div class="reentry-item"><small>WHAT CHANGED</small><strong>Even · Song reached a rough production stopping point.</strong><p>FIRE returned only that high-level state and the next continuation—not its internal reasoning.</p></div>
        <div class="reentry-item"><small>WHAT CONNECTS</small><strong>The song still belongs to Even · Album.</strong><p>That decision is settled, so neither WORLD nor FIRE needs to ask it again.</p></div>
        <div class="reentry-item"><small>STRONGEST CONTINUATION</small><strong>Choose the next production decision in FIRE with the album relationship attached.</strong><p>Alternative: pause production and establish one shared album-level direction first.</p></div>
      </div>

      <div class="action-stack">
        <button class="context-primary" data-action="continue-fire">Continue in FIRE</button>
        <button class="context-secondary" data-action="back-world-updated">Stay with the larger project</button>
      </div>
    </section>`
  );
}

function renderDeclined() {
  return shell(
    'Optional expansion declined',
    'Stayed in FIRE',
    'WORLD was not required for the song to remain useful.',
    `<section class="context-card declined">
      <div>
        <div class="eyebrow">No nag loop</div>
        <h2>The broader relationship was not established.</h2>
        <p class="lede">This specimen will not ask again. FIRE can continue as a standalone production product. Reset the prototype only if you intentionally want to test the invitation again.</p>
      </div>
    </section>`
  );
}

function render() {
  const app = document.getElementById('app');
  const views = {
    handoff: renderHandoff,
    relationship: renderRelationship,
    world: renderWorld,
    fire: renderFire,
    'fire-updated': renderFireUpdated,
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
      if (action === 'reset') return resetState();
      if (action === 'open-world') return updateState({ stage: 'relationship' });
      if (action === 'decline-world') return updateState({ stage: 'declined', declined: true, linked: false });
      if (action === 'confirm-link') return updateState({ stage: 'world', linked: true, declined: false });
      if (action === 'continue-fire') return updateState({ stage: state.fireProgress === 'rough-pass' ? 'fire-updated' : 'fire' });
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
