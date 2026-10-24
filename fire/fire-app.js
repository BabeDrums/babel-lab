const FIRE_PRESETS = [
  { name: 'Ember', intensity: 0.28, turbulence: 0.25, diversity: 0.28 },
  { name: 'Growing', intensity: 0.56, turbulence: 0.45, diversity: 0.55 },
  { name: 'Developed', intensity: 0.82, turbulence: 0.62, diversity: 0.76 }
];

const state = {
  intensity: FIRE_PRESETS[1].intensity,
  turbulence: FIRE_PRESETS[1].turbulence,
  diversity: FIRE_PRESETS[1].diversity,
  particleStyle: 'mixed',
  renderer: 'particles',
  presetIndex: 1
};

let fireController = null;

function rangeControl(label, key, value) {
  return `<label class="control">
    <span>${label}</span>
    <input type="range" min="0" max="1" step="0.01" value="${value}" data-fire-range="${key}">
  </label>`;
}

function render() {
  if (fireController) {
    fireController.destroy();
    fireController = null;
  }

  const reducedMotion = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  document.getElementById('app').innerHTML = `
    <header class="lab-topbar">
      <div class="lab-topbar-left">
        <a class="back-link" href="../" aria-label="Back to Babel Lab">←</a>
        <h1>Fire Lab</h1>
      </div>
      <span class="experiment-tag">FIRE-bound</span>
    </header>

    <main>
      <section class="fire-lab section card">
        <div class="experiment-heading">
          <div>
            <div class="eyebrow">Visualization experiment</div>
            <h2>Your Fire</h2>
          </div>
          <small>Prototype state only</small>
        </div>

        <div class="fire-detail-stage">
          <canvas id="detail-fire" aria-label="Generated Fire visualization"></canvas>
        </div>

        ${reducedMotion ? '<p class="motion-note">Reduce Motion is active. Fire animation is paused while the visual state remains inspectable.</p>' : ''}

        <div class="renderer-toggle" role="group" aria-label="Fire renderer">
          <button class="${state.renderer === 'particles' ? 'active' : ''}" data-renderer="particles" aria-pressed="${state.renderer === 'particles'}">Free particles</button>
          <button class="${state.renderer === 'grid' ? 'active' : ''}" data-renderer="grid" aria-pressed="${state.renderer === 'grid'}">Rigid grid</button>
        </div>

        <div class="developer-heading">
          <div>
            <div class="eyebrow">Developer controls</div>
            <strong>Visual probes</strong>
          </div>
          <small>Not progression rules</small>
        </div>

        <div class="style-chips" role="group" aria-label="Particle style">
          ${['mixed','square','diamond','circle'].map(style => `<button class="chip ${state.particleStyle === style ? 'active' : ''}" data-particle-style="${style}" aria-pressed="${state.particleStyle === style}">${style[0].toUpperCase()+style.slice(1)}</button>`).join('')}
        </div>

        <div class="controls-grid">
          ${rangeControl('Intensity','intensity',state.intensity)}
          ${rangeControl('Turbulence','turbulence',state.turbulence)}
          ${rangeControl('Shape diversity','diversity',state.diversity)}
        </div>

        <div class="preset-row">
          <button class="secondary-btn" data-action="reset-fire">Reset</button>
          <button class="secondary-btn developer" data-action="evolve">Evolve</button>
        </div>
      </section>
    </main>

    <p class="lab-footnote">Fire Lab is an experiment. If promoted, its product destination is Babel FIRE.</p>`;

  bindEvents();
  const canvas = document.getElementById('detail-fire');
  fireController = window.createFireController(canvas, () => state, { renderer: state.renderer });
}

function evolveFire() {
  state.presetIndex = (state.presetIndex + 1) % FIRE_PRESETS.length;
  Object.assign(state, FIRE_PRESETS[state.presetIndex]);
  render();
}

function bindEvents() {
  document.querySelectorAll('[data-action="evolve"]').forEach(el => el.addEventListener('click', evolveFire));
  document.querySelectorAll('[data-action="reset-fire"]').forEach(el => el.addEventListener('click', () => {
    state.presetIndex = 1;
    Object.assign(state, FIRE_PRESETS[1]);
    state.particleStyle = 'mixed';
    state.renderer = 'particles';
    render();
  }));
  document.querySelectorAll('[data-renderer]').forEach(el => el.addEventListener('click', () => {
    state.renderer = el.dataset.renderer;
    render();
  }));
  document.querySelectorAll('[data-particle-style]').forEach(el => el.addEventListener('click', () => {
    state.particleStyle = el.dataset.particleStyle;
    render();
  }));
  document.querySelectorAll('[data-fire-range]').forEach(el => el.addEventListener('input', () => {
    state[el.dataset.fireRange] = Number(el.value);
    if (fireController) fireController.updateConfig();
  }));
}

const motionQuery = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
if (motionQuery) {
  const onMotionChange = () => render();
  if (motionQuery.addEventListener) motionQuery.addEventListener('change', onMotionChange);
  else if (motionQuery.addListener) motionQuery.addListener(onMotionChange);
}

render();
