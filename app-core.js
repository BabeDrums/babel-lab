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
    hint: 'ᒲᔑꖌᒷ ᓭ!¡ᔑᓵᒷ ⎓𝙹∷ ᓭ𝙹ᒲᒷℸ ̣ ⍑╎リ⊣ ᓭℸ ̣ ∷ᔑリ⊣ᒷ.',
    source: 'FIRE'
  },
  {
    id: 'quiet-ember',
    title: 'Quiet Ember',
    kind: 'secret',
    art: 'ember',
    summary: 'A hidden Babel discovery.',
    hint: '⋮∷ ᓵᔑリリ𝙹ℸ ̣  ᓭᒷᒷ ᒷ⍊ᒷ∷||ℸ ̣ ⍑╎リ⊣.',
    source: 'FIRE'
  }
];

const FIRE_PRESETS = [
  { name: 'Ember', intensity: 0.28, turbulence: 0.25, diversity: 0.28 },
  { name: 'Growing', intensity: 0.56, turbulence: 0.45, diversity: 0.55 },
  { name: 'Developed', intensity: 0.82, turbulence: 0.62, diversity: 0.76 }
];

const state = {
  route: { name: 'world' },
  unlocked: new Set(),
  fire: {
    intensity: FIRE_PRESETS[1].intensity,
    turbulence: FIRE_PRESETS[1].turbulence,
    diversity: FIRE_PRESETS[1].diversity,
    particleStyle: 'mixed',
    renderer: 'particles',
    presetIndex: 1
  }
};

let activeFireController = null;

function iconSvg(kind) {
  const a = 'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
  if (kind === 'arch') return `<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M17 50V31c0-12 6-20 15-20s15 8 15 20v19" ${a}/><path d="M24 50V31c0-7 3-12 8-12s8 5 8 12v19" ${a}/><path d="M13 50h38" ${a}/></svg>`;
  if (kind === 'diamond') return `<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M32 9 52 31 32 55 12 31 32 9Z" ${a}/><path d="M12 31h40M32 9l7 22-7 24-7-24 7-22Z" ${a}/></svg>`;
  if (kind === 'moon') return `<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M44 13c-16 2-24 21-13 34 8 9 20 9 28 1-7 3-15 0-20-6-7-10-4-23 5-29Z" ${a}/></svg>`;
  if (kind === 'ember') return `<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M32 10c8 10 13 17 13 25 0 9-6 17-13 17s-13-8-13-17c0-7 4-13 9-20 0 8 2 12 5 15 2-7 1-13-1-20Z" ${a}/></svg>`;
  return `<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M32 8l5 18 18 6-18 6-5 18-5-18-18-6 18-6 5-18Z" ${a}/><circle cx="32" cy="32" r="4" fill="currentColor"/></svg>`;
}

function topbar(title, back) {
  return `<header class="topbar">
    <div class="brand-wrap">
      ${back ? '<button class="icon-btn" data-action="back" aria-label="Back">←</button>' : '<div class="brand-pip">⌂</div>'}
      <h1>${title}</h1>
    </div>
    <button class="icon-btn" data-action="about" aria-label="About Babel Lab">•••</button>
  </header>`;
}

function achievementCard(a) {
  const unlocked = state.unlocked.has(a.id);
  const secret = a.kind === 'secret';
  const title = unlocked ? a.title : (secret ? a.hint : 'Unknown');
  const subtitle = unlocked ? 'Achievement' : (secret ? 'Hidden' : 'Locked');
  return `<button class="achievement-card ${unlocked ? 'unlocked' : 'locked'} ${secret ? 'secret' : ''}" data-open="achievement:${a.id}">
    <div class="badge-wrap ${unlocked ? '' : 'silhouette'}">${iconSvg(a.art)}</div>
    <strong class="achievement-title ${secret && !unlocked ? 'glyph-text' : ''}">${title}</strong>
    <small>${subtitle}</small>
    ${unlocked ? '<span class="source-dot" aria-label="Source FIRE">🔥</span>' : ''}
  </button>`;
}

function renderWorld() {
  return `${topbar('World', false)}
    <main>
      <section class="fire-hero section card">
        <div class="fire-hero-copy">
          <div class="eyebrow">Your Fire</div>
          <h2>A living artifact.</h2>
        </div>
        <div class="home-fire-stage">
          <canvas id="home-fire" aria-label="Generated Fire"></canvas>
        </div>
        <div class="fire-hero-actions">
          <button class="primary-btn" data-open="fire:main">Explore Fire</button>
          <button class="secondary-btn developer" data-action="evolve">Evolve</button>
        </div>
      </section>

      <section class="section achievements-section">
        <div class="section-title-row">
          <div>
            <div class="eyebrow">Collection</div>
            <h2>Achievements</h2>
          </div>
          <small>${state.unlocked.size}/${ACHIEVEMENTS.length}</small>
        </div>
        <div class="achievement-grid">${ACHIEVEMENTS.map(achievementCard).join('')}</div>
      </section>
    </main>
    <p class="lab-note">Babel Lab · prototype state only</p>`;
}

function renderAchievement(id) {
  const a = ACHIEVEMENTS.find(x => x.id === id);
  const unlocked = state.unlocked.has(a.id);
  const visibleTitle = unlocked ? a.title : (a.kind === 'secret' ? a.hint : 'Unknown Achievement');
  const visibleSummary = unlocked ? a.summary : (a.kind === 'secret' ? 'Something is here, but it has not revealed itself yet.' : a.hint);

  return `${topbar('Achievement', true)}
    <main>
      <section class="achievement-detail section card ${unlocked ? 'unlocked' : 'locked'} ${a.kind === 'secret' ? 'secret' : ''}">
        <div class="detail-badge ${unlocked ? '' : 'silhouette'}">${iconSvg(a.art)}</div>
        <div class="eyebrow">${unlocked ? 'Earned achievement' : (a.kind === 'secret' ? 'Hidden achievement' : 'Locked achievement')}</div>
        <h2 class="${a.kind === 'secret' && !unlocked ? 'glyph-text' : ''}">${visibleTitle}</h2>
        <p>${visibleSummary}</p>
        ${unlocked ? `<button class="source-mark" data-action="source-quick">🔥 <span>FIRE</span></button>` : ''}
      </section>

      <section class="developer-panel section card">
        <div>
          <div class="eyebrow">Developer</div>
          <strong>Prototype state</strong>
          <p>Skip earning logic for now. Toggle this achievement manually.</p>
        </div>
        <button class="${unlocked ? 'secondary-btn' : 'primary-btn'}" data-action="toggle-achievement" data-id="${a.id}">${unlocked ? 'Lock achievement' : 'Earn achievement'}</button>
      </section>
    </main>`;
}

function rangeControl(label, key, value) {
  return `<label class="control">
    <span>${label}</span>
    <input type="range" min="0" max="1" step="0.01" value="${value}" data-fire-range="${key}">
  </label>`;
}

function renderFire() {
  const f = state.fire;
  return `${topbar('Your Fire', true)}
    <main>
      <section class="fire-lab section card">
        <div class="fire-detail-stage">
          <canvas id="detail-fire" aria-label="Generated Fire"></canvas>
        </div>

        <div class="renderer-toggle">
          <button class="${f.renderer === 'particles' ? 'active' : ''}" data-renderer="particles">Free particles</button>
          <button class="${f.renderer === 'grid' ? 'active' : ''}" data-renderer="grid">Rigid grid</button>
        </div>

        <div class="developer-heading">
          <div class="eyebrow">Developer controls</div>
          <small>Visual probes only</small>
        </div>

        <div class="style-chips">
          ${['mixed','square','diamond','circle'].map(style => `<button class="chip ${f.particleStyle === style ? 'active' : ''}" data-particle-style="${style}">${style[0].toUpperCase()+style.slice(1)}</button>`).join('')}
        </div>

        <div class="controls-grid">
          ${rangeControl('Intensity','intensity',f.intensity)}
          ${rangeControl('Turbulence','turbulence',f.turbulence)}
          ${rangeControl('Shape diversity','diversity',f.diversity)}
        </div>

        <div class="preset-row">
          <button class="secondary-btn" data-action="reset-fire">Reset</button>
          <button class="secondary-btn developer" data-action="evolve">Evolve</button>
        </div>
      </section>
    </main>`;
}

function render() {
  if (activeFireController) {
    activeFireController.destroy();
    activeFireController = null;
  }

  const app = document.getElementById('app');
  const r = state.route;
  if (r.name === 'world') app.innerHTML = renderWorld();
  if (r.name === 'achievement') app.innerHTML = renderAchievement(r.id);
  if (r.name === 'fire') app.innerHTML = renderFire();
  bindEvents();
  afterRender();
}

function openRoute(spec) {
  const [name, id] = spec.split(':');
  state.route = { name, id };
  window.scrollTo({ top: 0, behavior: 'auto' });
  render();
}

function quickSource() {
  const root = document.getElementById('quickview-root');
  root.innerHTML = `<div class="quickview-backdrop" data-dismiss>
    <div class="quickview" role="dialog" aria-modal="true">
      <div class="eyebrow">Source mark</div>
      <h3>🔥 FIRE</h3>
      <p>This achievement came from FIRE. The mark shows origin; it is not a skill level.</p>
      <button class="primary-btn" data-dismiss>Got it</button>
    </div>
  </div>`;
  root.querySelectorAll('[data-dismiss]').forEach(el => {
    el.addEventListener('click', e => {
      if (e.target === el || el.tagName === 'BUTTON') root.innerHTML = '';
    });
  });
}

function aboutLab() {
  const root = document.getElementById('quickview-root');
  root.innerHTML = `<div class="quickview-backdrop" data-dismiss>
    <div class="quickview" role="dialog" aria-modal="true">
      <div class="eyebrow">Babel Lab</div>
      <h3>Prototype 02</h3>
      <p>Testing only two ecosystem objects right now: Fire and Achievements. Nothing here is final product UI.</p>
      <button class="primary-btn" data-dismiss>Got it</button>
    </div>
  </div>`;
  root.querySelectorAll('[data-dismiss]').forEach(el => {
    el.addEventListener('click', e => {
      if (e.target === el || el.tagName === 'BUTTON') root.innerHTML = '';
    });
  });
}

function evolveFire() {
  state.fire.presetIndex = (state.fire.presetIndex + 1) % FIRE_PRESETS.length;
  const p = FIRE_PRESETS[state.fire.presetIndex];
  state.fire.intensity = p.intensity;
  state.fire.turbulence = p.turbulence;
  state.fire.diversity = p.diversity;
  render();
}

function bindEvents() {
  document.querySelectorAll('[data-open]').forEach(el => el.addEventListener('click', () => openRoute(el.dataset.open)));
  document.querySelectorAll('[data-action="back"]').forEach(el => el.addEventListener('click', () => { state.route = { name: 'world' }; render(); }));
  document.querySelectorAll('[data-action="about"]').forEach(el => el.addEventListener('click', aboutLab));
  document.querySelectorAll('[data-action="source-quick"]').forEach(el => el.addEventListener('click', quickSource));
  document.querySelectorAll('[data-action="evolve"]').forEach(el => el.addEventListener('click', evolveFire));
  document.querySelectorAll('[data-action="toggle-achievement"]').forEach(el => el.addEventListener('click', () => {
    const id = el.dataset.id;
    if (state.unlocked.has(id)) state.unlocked.delete(id); else state.unlocked.add(id);
    render();
  }));
  document.querySelectorAll('[data-action="reset-fire"]').forEach(el => el.addEventListener('click', () => {
    state.fire.presetIndex = 1;
    Object.assign(state.fire, FIRE_PRESETS[1]);
    state.fire.particleStyle = 'mixed';
    state.fire.renderer = 'particles';
    render();
  }));
  document.querySelectorAll('[data-renderer]').forEach(el => el.addEventListener('click', () => {
    state.fire.renderer = el.dataset.renderer;
    render();
  }));
  document.querySelectorAll('[data-particle-style]').forEach(el => el.addEventListener('click', () => {
    state.fire.particleStyle = el.dataset.particleStyle;
    render();
  }));
  document.querySelectorAll('[data-fire-range]').forEach(el => el.addEventListener('input', () => {
    state.fire[el.dataset.fireRange] = Number(el.value);
    if (activeFireController) activeFireController.updateConfig();
  }));
}

function afterRender() {
  if (!window.createFireController) return;
  const home = document.getElementById('home-fire');
  const detail = document.getElementById('detail-fire');
  if (home) activeFireController = window.createFireController(home, () => state.fire, { compact: true, renderer: 'particles' });
  if (detail) activeFireController = window.createFireController(detail, () => state.fire, { compact: false, renderer: state.fire.renderer });
}

window.addEventListener('fire-engine-ready', () => {
  if (state.route.name === 'world' || state.route.name === 'fire') render();
}, { once: true });
