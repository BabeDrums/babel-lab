const STORAGE_KEY = 'babel-lab-fire-core-top-flow-v0';

const root = document.getElementById('coreApp');
const modalRoot = document.getElementById('modalRoot');
let activeId = null;

function freshState() {
  return { projects: [] };
}

function loadState() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    if (!parsed || !Array.isArray(parsed.projects)) return freshState();
    return parsed;
  } catch {
    return freshState();
  }
}

let state = loadState();

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function esc(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function activeProject() {
  return state.projects.find((project) => project.id === activeId) || null;
}

function projectMeta(project) {
  const parts = [];
  if (project.type === 'cover') {
    parts.push(project.artist ? `Cover · ${project.artist}` : 'Cover');
  } else {
    parts.push('Original');
  }
  if (project.album) parts.push(project.album);
  return parts.join(' · ');
}

function albums() {
  return [...new Set(state.projects.map((project) => project.album).filter(Boolean))].sort((a, b) => a.localeCompare(b));
}

const moves = {
  'riff-extend': {
    title: 'Play the riff through a few times and let it change if it naturally wants to.',
    body: "If it isn't recorded yet, capture a rough pass. Don't worry about the guitar sound or playing it perfectly.",
    listen: 'Where repetition starts wanting something different.',
    why: 'Before building drums or production around the riff, this tells us whether the idea already contains enough movement to support a section.',
    question: 'What happened?',
    outcomes: [
      { id: 'variation', label: 'A variation came out naturally', next: 'riff-relationship' },
      { id: 'as-is', label: 'The riff still feels good as-is', next: 'riff-contrast' },
      { id: 'repetitive', label: 'It started feeling repetitive', next: 'riff-small-variation' },
      { id: 'unsure', label: 'Not sure', next: 'riff-attention' },
    ],
  },
  'riff-relationship': {
    title: 'Try moving between the original riff and the variation.',
    body: "Don't worry about how long either one should be yet. Just play them back-to-back in both directions.",
    listen: 'Does the variation feel like a continuation, or like the song has entered somewhere new?',
    why: 'You have two real musical ideas now. Their relationship matters more than naming sections or adding production around them yet.',
    question: 'How do the two ideas feel together?',
    outcomes: [
      { id: 'new-area', label: 'It feels like a new section', next: 'rough-shape' },
      { id: 'continuation', label: 'It feels like one evolving passage', next: 'evolving-passage' },
      { id: 'replace', label: 'The variation feels stronger than the original', next: 'variation-anchor' },
      { id: 'unsure', label: 'Not sure yet', next: 'relationship-focus' },
    ],
  },
  'rough-shape': {
    title: 'Make one disposable pass through both ideas and follow where the music wants to go next.',
    body: 'Start with the original riff, move into the variation, then keep going only as far as feels useful. Returning to the first idea is fine. Finding a third idea is fine.',
    listen: 'Whether the two ideas already create a larger shape, or whether something is clearly missing.',
    why: 'A rough pass creates better structural evidence than deciding the whole song on paper.',
    question: 'What did the rough pass reveal?',
    outcomes: [
      { id: 'works', label: 'The simple shape already works', next: 'build-around-shape' },
      { id: 'needs-more', label: 'It clearly needs another idea', next: 'third-idea' },
      { id: 'first-weaker', label: 'The first riff suddenly feels weaker', next: 'variation-anchor' },
      { id: 'unsure', label: 'It got confusing', next: 'relationship-focus' },
    ],
  },
  'riff-contrast': {
    title: 'Keep the riff as the anchor and sketch one deliberately different idea beside it.',
    body: 'Keep this disposable. Change one broad musical thing — rhythm, register, harmony, or intensity — instead of adding production to the riff itself.',
    listen: 'Whether contrast makes the original riff feel stronger or reveals that it already wants to stay alone.',
    why: 'The riff has survived repetition. A small contrast now creates more useful evidence than polishing the same idea.',
    question: 'What did the contrast do?',
    outcomes: [
      { id: 'second', label: 'It gave me a real second idea', next: 'riff-relationship' },
      { id: 'alone', label: 'The original still feels stronger by itself', next: 'build-around-shape' },
      { id: 'unsure', label: 'Not sure yet', next: 'riff-attention' },
    ],
  },
  'riff-small-variation': {
    title: 'Keep the riff, but change only one small thing on the next repeat.',
    body: 'Try a different ending, rhythm, or held note. Leave everything else alone for now.',
    listen: 'Which tiny change keeps the identity of the riff without making it feel like a loop.',
    why: 'The repetition gave you a real problem. A one-variable variation is cheaper than inventing an entire new section before you know what kind of change is needed.',
    question: 'What happened?',
    outcomes: [
      { id: 'variation', label: 'One variation started working', next: 'riff-relationship' },
      { id: 'still-repeats', label: 'It still feels repetitive', next: 'riff-contrast' },
      { id: 'unsure', label: 'Not sure', next: 'riff-attention' },
    ],
  },
  'riff-attention': {
    title: 'Play the riff twice at low volume and listen only for the moment your attention drops.',
    body: "Don't change anything during the pass.",
    listen: 'The exact point where another repeat stops feeling intentional.',
    why: 'A narrower listening job can create useful evidence without forcing you to invent a direction you do not hear yet.',
    question: 'What did you notice?',
    outcomes: [
      { id: 'clear-point', label: 'There is a clear point where it needs change', next: 'riff-small-variation' },
      { id: 'holds', label: 'It actually holds my attention', next: 'riff-contrast' },
      { id: 'unsure', label: 'Still not sure', next: 'riff-contrast' },
    ],
  },
  'evolving-passage': {
    title: 'Treat the riff and variation as one evolving passage for one rough pass.',
    body: 'Let the change happen naturally without naming a section boundary. Keep it loose enough to undo.',
    listen: 'Whether the evolution creates enough movement on its own or eventually asks for a real contrast.',
    why: 'The ideas already feel connected. Preserve that evidence before forcing them into separate song sections.',
    question: 'What does the passage want now?',
    outcomes: [
      { id: 'enough', label: 'The evolution feels complete for now', next: 'build-around-shape' },
      { id: 'contrast', label: 'It eventually asks for a bigger contrast', next: 'third-idea' },
      { id: 'unsure', label: 'Not sure', next: 'relationship-focus' },
    ],
  },
  'variation-anchor': {
    title: 'Play the variation as the main idea without the original riff.',
    body: 'Give it one disposable pass on its own before protecting the idea you started with.',
    listen: 'Whether the variation can carry the song by itself or only works because of the original riff.',
    why: 'FIRE should stay loyal to the record, not to the first idea merely because it came first.',
    question: 'Which idea deserves to lead?',
    outcomes: [
      { id: 'variation-wins', label: 'The variation works better as the anchor', next: 'build-around-shape' },
      { id: 'needs-original', label: 'It needs the original riff', next: 'riff-relationship' },
      { id: 'unsure', label: 'Not sure', next: 'relationship-focus' },
    ],
  },
  'relationship-focus': {
    title: 'Play the two ideas back-to-back twice without changing either one.',
    body: 'On the first pass, just listen. On the second, notice whether your ear experiences a continuation or a reset.',
    listen: 'Whether the second idea feels like more of the same thought or the beginning of a new one.',
    why: 'You do not need a section label yet. You only need enough perception to know what kind of relationship you are building.',
    question: 'What feels clearer now?',
    outcomes: [
      { id: 'new-area', label: 'It feels like a new area', next: 'rough-shape' },
      { id: 'continuation', label: 'It feels connected', next: 'evolving-passage' },
      { id: 'unsure', label: 'Still not sure', next: 'riff-contrast' },
    ],
  },
  'third-idea': {
    title: 'Keep the two ideas and make one rough answer to what feels missing next.',
    body: 'Do not solve the whole song. Make the smallest new musical object that changes the direction of the pass.',
    listen: 'Whether the new idea completes the journey or simply exposes a clearer missing piece.',
    why: 'The existing material has already told you it needs more. Create only enough new evidence to learn what kind of “more” actually helps.',
    question: 'What did the new idea do?',
    outcomes: [
      { id: 'helps', label: 'It completes the rough shape', next: 'build-around-shape' },
      { id: 'reveals', label: 'It revealed a different problem', next: 'custom-reconcile' },
      { id: 'unsure', label: 'Not sure', next: 'relationship-focus' },
    ],
  },
  'build-around-shape': {
    title: 'Keep this shape rough and start building only the parts that help you hear it as a song.',
    body: 'You have enough musical behavior to begin adding support. Keep the first pass reversible and stop if a new part changes what the structure wants to be.',
    listen: 'Whether added parts support the musical movement or start deciding the song for you.',
    why: 'The material is stable enough under current evidence to justify moving forward without pretending the arrangement is final.',
    question: 'What changed once you started building around it?',
    outcomes: [
      { id: 'working', label: 'The shape got clearer', next: 'build-around-shape' },
      { id: 'changed', label: 'The new parts changed the song', next: 'custom-reconcile' },
      { id: 'stuck', label: 'I hit a new problem', next: 'custom-reconcile' },
      { id: 'unsure', label: 'Not sure', next: 'relationship-focus' },
    ],
  },
  'start-nothing': {
    title: 'Create one disposable musical object before deciding what the song is.',
    body: 'Start from whatever feels easiest to touch right now — a sound, rhythm, chord, lyric, melody, or instrument. Keep only enough to give yourself something real to react to.',
    listen: 'What makes you want to keep going rather than what sounds finished.',
    why: 'A blank Original needs musical evidence more than it needs a creative brief.',
    question: 'What appeared?',
    outcomes: [
      { id: 'idea', label: 'I found one idea worth keeping', next: 'material-extend' },
      { id: 'several', label: 'A few ideas came out', next: 'custom-reconcile' },
      { id: 'nothing', label: 'Nothing stuck yet', next: 'start-nothing' },
      { id: 'unsure', label: 'Not sure', next: 'start-nothing' },
    ],
  },
  'material-extend': {
    title: 'Give what you already have enough time to show you what it wants next.',
    body: 'Make one rough pass without polishing it. Let repetition, variation, or a natural stopping point happen before adding production around it.',
    listen: 'Where the material starts asking for change.',
    why: 'The cheapest next evidence is usually how the existing idea behaves across time.',
    question: 'What happened?',
    outcomes: [
      { id: 'changed', label: 'A new direction emerged', next: 'custom-reconcile' },
      { id: 'holds', label: 'It holds together as-is', next: 'build-around-shape' },
      { id: 'stalls', label: 'It stalls quickly', next: 'riff-contrast' },
      { id: 'unsure', label: 'Not sure', next: 'riff-attention' },
    ],
  },
  'lyrics-shape': {
    title: 'Read or sing the lyrics through once and mark where the thought naturally turns.',
    body: 'Do not force sections yet. Notice where the language wants a new pace, harmony, melody, or silence.',
    listen: 'The first place the lyric itself asks the music to change.',
    why: 'The words can create structural evidence before you decide what production belongs around them.',
    question: 'What did the lyric reveal?',
    outcomes: [
      { id: 'turn', label: 'There is a clear turn', next: 'custom-reconcile' },
      { id: 'steady', label: 'It feels like one continuous thought', next: 'material-extend' },
      { id: 'unsure', label: 'Not sure', next: 'material-extend' },
    ],
  },
  'existing-listen': {
    title: 'Play the current version once without fixing anything.',
    body: 'Use the pass only to re-establish what the record actually is right now.',
    listen: 'The first moment that clearly feels unfinished, confusing, or unlike what you want.',
    why: 'A developed project needs fresh current evidence before FIRE can responsibly diagnose it.',
    question: 'What did you notice?',
    outcomes: [
      { id: 'issue', label: 'One problem became obvious', next: 'custom-reconcile' },
      { id: 'works', label: 'Nothing obvious feels wrong', next: 'custom-reconcile' },
      { id: 'unsure', label: 'Not sure', next: 'custom-reconcile' },
    ],
  },
  'cover-first-slice': {
    title: 'Build one small slice of the reference before chasing exact sounds.',
    body: 'Rough in enough material to hear one important section relationship. Keep the sounds and performances disposable.',
    listen: 'Whether your version already establishes the same kind of musical contrast as the reference.',
    why: 'Reference knowledge can tell FIRE what is worth establishing first; it cannot diagnose a version that does not exist yet.',
    question: 'What did the first slice reveal?',
    outcomes: [
      { id: 'works', label: 'The basic relationship is there', next: 'cover-current-compare' },
      { id: 'missing', label: 'The relationship still feels missing', next: 'cover-current-compare' },
      { id: 'different', label: 'I started changing it on purpose', next: 'custom-reconcile' },
      { id: 'unsure', label: 'Not sure', next: 'cover-current-compare' },
    ],
  },
  'cover-current-compare': {
    title: 'Compare one meaningful relationship in your version against the reference.',
    body: 'Ignore tiny tone differences. Pick the first difference that actually matters to the kind of cover you are making.',
    listen: 'Whether that difference is something you want to match, keep intentionally, or keep exploring.',
    why: 'A Cover should track meaningful differences, not chase a similarity percentage.',
    question: 'What kind of difference did you find?',
    outcomes: [
      { id: 'match', label: 'I want this closer to the reference', next: 'custom-reconcile' },
      { id: 'intentional', label: 'I want to keep this difference', next: 'custom-reconcile' },
      { id: 'explore', label: 'I am not sure yet', next: 'custom-reconcile' },
    ],
  },
};

function classifyStartingReality(project, text) {
  const normalized = text.toLowerCase();
  if (project.type === 'cover') {
    if (/nothing|starting from scratch|blank/.test(normalized)) return 'cover-first-slice';
    return 'cover-current-compare';
  }
  if (/nothing|no idea|blank|starting from scratch/.test(normalized)) return 'start-nothing';
  if (/riff|guitar/.test(normalized)) return 'riff-extend';
  if (/lyric|words/.test(normalized)) return 'lyrics-shape';
  if (/demo|rough|bounce|mix|instrumental|whole song|finished/.test(normalized)) return 'existing-listen';
  return 'material-extend';
}

function moveFor(project) {
  if (project.moveId === 'custom-reconcile') {
    const note = project.customNote || 'The project changed in a way the previous Move did not predict.';
    return {
      title: 'Listen once to the version you actually have now.',
      body: `You said: “${note}” Keep this pass observational — do not fix everything at once.`,
      listen: 'The one change that matters most compared with where you were before.',
      why: 'When reality changes unexpectedly, FIRE should reconcile the current record before pretending the old recommendation still applies.',
      question: 'What deserves attention now?',
      outcomes: [
        { id: 'clear', label: 'One thing clearly matters most', next: 'custom-reconcile' },
        { id: 'working', label: 'The new direction is working', next: 'build-around-shape' },
        { id: 'unsure', label: 'Not sure yet', next: 'riff-attention' },
      ],
    };
  }
  if (project.moveId === 'direction-reconcile') {
    const direction = project.direction || 'something else';
    return {
      title: `Work on ${direction} without pretending the rest of the song disappeared.`,
      body: 'Keep this pass reversible. FIRE will preserve the broader project state while you follow the direction you chose.',
      listen: 'What would make this work worth keeping in the actual record.',
      why: 'A recommendation is advice, not an assignment. Artist priority can redirect the current focus without erasing what FIRE already knows.',
      question: 'What changed?',
      outcomes: [
        { id: 'useful', label: 'That direction was useful', next: 'custom-reconcile' },
        { id: 'not-useful', label: 'It was not helping', next: 'custom-reconcile' },
        { id: 'unsure', label: 'Not sure', next: 'custom-reconcile' },
      ],
    };
  }
  return moves[project.moveId] || null;
}

function renderSongs() {
  activeId = null;
  const rows = state.projects.map((project) => `
    <button class="core-project-row" type="button" data-open-project="${esc(project.id)}">
      <span class="core-project-copy">
        <strong>${esc(project.title)}</strong>
        <small>${esc(projectMeta(project))}</small>
      </span>
      <span class="core-project-arrow" aria-hidden="true">›</span>
    </button>
  `).join('');

  root.innerHTML = `
    <main class="lab-shell core-shell">
      <header class="lab-topbar">
        <a class="back-link" href="../" aria-label="Back to Fire Lab">Back</a>
        <button class="icon-btn core-add" type="button" data-new-song aria-label="New song">Add</button>
      </header>
      <header class="lab-page-header core-header">
        <h1>FIRE</h1>
        <p>Songs</p>
      </header>
      <section class="core-column">
        ${rows ? `<div class="core-project-list">${rows}</div>` : `
          <div class="core-empty">
            <h2>No songs yet.</h2>
            <p>Make one from whatever you already have — even if that is basically nothing.</p>
            <button class="secondary-btn core-empty-action" type="button" data-new-song>New Song</button>
          </div>
        `}
        ${state.projects.length ? '<button class="core-lab-reset" type="button" data-reset-audition>Lab reset</button>' : ''}
      </section>
    </main>
  `;
}

function renderStartingReality(project) {
  root.innerHTML = `
    <main class="lab-shell core-shell">
      <header class="lab-topbar">
        <button class="back-link" type="button" data-back-songs aria-label="Back to songs">Back</button>
        <span></span>
      </header>
      <header class="lab-page-header core-header">
        <h1>${esc(project.title)}</h1>
        <p>${esc(projectMeta(project))}</p>
      </header>
      <section class="core-column">
        <form class="core-reality-form" data-starting-reality>
          <div class="core-question-head">
            <h2>What are you starting with?</h2>
            <p>Just the smallest factual thing that already exists.</p>
          </div>
          <label class="core-field-label" for="startingReality">Starting with</label>
          <input class="core-input" id="startingReality" name="reality" type="text" autocomplete="off" autocapitalize="sentences" placeholder="a guitar riff" required />
          <p class="core-examples">some lyrics · a rough demo · basically nothing</p>
          <button class="primary-btn core-form-primary" type="submit">Continue</button>
          <button class="core-text-action" type="button" data-nothing-yet>Nothing yet</button>
        </form>
      </section>
    </main>
  `;
}

function renderGuidance(project) {
  const move = moveFor(project);
  if (!move) return renderStartingReality(project);
  root.innerHTML = `
    <main class="lab-shell core-shell">
      <header class="lab-topbar">
        <button class="back-link" type="button" data-back-songs aria-label="Back to songs">Back</button>
        <span></span>
      </header>
      <header class="lab-page-header core-header">
        <h1>${esc(project.title)}</h1>
        <p>${esc(projectMeta(project))}</p>
      </header>
      <section class="core-column core-guidance">
        <div class="core-kicker">Next</div>
        <h2>${esc(move.title)}</h2>
        <p class="core-guidance-copy">${esc(move.body)}</p>
        <div class="core-listen">
          <span>Listen for</span>
          <p>${esc(move.listen)}</p>
        </div>
        <details class="core-why">
          <summary>Why this?</summary>
          <p>${esc(move.why)}</p>
        </details>
        <div class="core-guidance-actions">
          <button class="secondary-btn core-update" type="button" data-update>Update</button>
          <button class="core-text-action" type="button" data-change-direction>Change direction</button>
        </div>
      </section>
    </main>
  `;
}

function renderProject(project) {
  if (!project) return renderSongs();
  if (!project.moveId) return renderStartingReality(project);
  renderGuidance(project);
}

function render() {
  const project = activeProject();
  if (project) renderProject(project);
  else renderSongs();
}

function closeModal() {
  modalRoot.hidden = true;
  modalRoot.innerHTML = '';
}

function openModal(body, label) {
  modalRoot.innerHTML = `
    <div class="quickview-backdrop" data-modal-backdrop>
      <section class="quickview core-sheet" role="dialog" aria-modal="true" aria-label="${esc(label)}">
        ${body}
      </section>
    </div>
  `;
  modalRoot.hidden = false;
  requestAnimationFrame(() => modalRoot.querySelector('input, textarea, button')?.focus({ preventScroll: true }));
}

function openNewSong() {
  const albumOptions = albums().map((album) => `<option value="${esc(album)}">${esc(album)}</option>`).join('');
  openModal(`
    <form data-new-song-form>
      <h3>New Song</h3>
      <div class="core-segmented" role="group" aria-label="Song type">
        <button class="core-segment is-selected" type="button" data-new-type="original">Original</button>
        <button class="core-segment" type="button" data-new-type="cover">Cover</button>
      </div>
      <input type="hidden" name="type" value="original" />
      <label class="core-field-label" for="newTitle" data-title-label>Title</label>
      <input class="core-input" id="newTitle" name="title" type="text" autocomplete="off" autocapitalize="words" placeholder="Untitled" />
      <div data-artist-field hidden>
        <label class="core-field-label" for="newArtist">Original artist</label>
        <input class="core-input" id="newArtist" name="artist" type="text" autocomplete="off" autocapitalize="words" placeholder="Artist" />
      </div>
      <label class="core-field-label" for="newAlbum">Album</label>
      <select class="core-input core-select" id="newAlbum" name="album">
        <option value="">No album</option>
        ${albumOptions}
        <option value="__new__">New album…</option>
      </select>
      <div data-new-album-field hidden>
        <label class="core-field-label" for="newAlbumName">New album</label>
        <input class="core-input" id="newAlbumName" name="newAlbum" type="text" autocomplete="off" autocapitalize="words" placeholder="Album name" />
      </div>
      <button class="primary-btn core-sheet-primary" type="submit">Create</button>
      <button class="secondary-btn core-sheet-cancel" type="button" data-close-modal>Cancel</button>
    </form>
  `, 'New Song');
}

function openUpdate(project) {
  const move = moveFor(project);
  if (!move) return;
  const options = move.outcomes.map((outcome) => `
    <button class="core-result-btn" type="button" data-outcome="${esc(outcome.id)}">
      <strong>${esc(outcome.label)}</strong>
    </button>
  `).join('');
  openModal(`
    <h3>${esc(move.question || 'What changed?')}</h3>
    <div class="core-result-stack">${options}</div>
    <button class="secondary-btn core-other-btn" type="button" data-custom-update>Something else</button>
    <button class="secondary-btn core-sheet-cancel" type="button" data-close-modal>Cancel</button>
  `, move.question || 'What changed?');
}

function openCustomUpdate() {
  openModal(`
    <form data-custom-update-form>
      <h3>What changed?</h3>
      <p>One sentence is enough.</p>
      <textarea class="core-textarea" name="note" rows="3" placeholder="I ended up making a drum part instead…" required></textarea>
      <button class="primary-btn core-sheet-primary" type="submit">Use that</button>
      <button class="secondary-btn core-sheet-cancel" type="button" data-close-modal>Cancel</button>
    </form>
  `, 'What changed?');
}

function openChangeDirection() {
  openModal(`
    <form data-change-direction-form>
      <h3>What do you want to work on?</h3>
      <p>FIRE will keep the broader song context and follow your direction.</p>
      <input class="core-input" name="direction" type="text" autocomplete="off" placeholder="the drums" required />
      <button class="primary-btn core-sheet-primary" type="submit">Go there</button>
      <button class="secondary-btn core-sheet-cancel" type="button" data-close-modal>Cancel</button>
    </form>
  `, 'Change direction');
}

function openResetAudition() {
  openModal(`
    <h3>Reset this Lab audition?</h3>
    <p>This clears only the isolated FIRE Core prototype state on this device.</p>
    <button class="primary-btn core-sheet-primary" type="button" data-confirm-reset>Reset audition</button>
    <button class="secondary-btn core-sheet-cancel" type="button" data-close-modal>Cancel</button>
  `, 'Reset audition');
}

function applyOutcome(project, outcomeId) {
  const move = moveFor(project);
  const outcome = move?.outcomes.find((item) => item.id === outcomeId);
  if (!outcome) return;
  project.history ||= [];
  project.history.push({ at: Date.now(), move: project.moveId, outcome: outcome.id, label: outcome.label });
  project.moveId = outcome.next || project.moveId;
  project.customNote = null;
  saveState();
  closeModal();
  renderProject(project);
  window.scrollTo({ top: 0, behavior: 'auto' });
}

root.addEventListener('click', (event) => {
  if (event.target.closest('[data-new-song]')) return openNewSong();

  const openProject = event.target.closest('[data-open-project]');
  if (openProject) {
    activeId = openProject.dataset.openProject;
    render();
    window.scrollTo({ top: 0, behavior: 'auto' });
    return;
  }

  if (event.target.closest('[data-back-songs]')) {
    activeId = null;
    renderSongs();
    window.scrollTo({ top: 0, behavior: 'auto' });
    return;
  }

  if (event.target.closest('[data-nothing-yet]')) {
    const project = activeProject();
    if (!project) return;
    project.reality = 'nothing yet';
    project.moveId = classifyStartingReality(project, project.reality);
    saveState();
    renderProject(project);
    return;
  }

  if (event.target.closest('[data-update]')) {
    const project = activeProject();
    if (project) openUpdate(project);
    return;
  }

  if (event.target.closest('[data-change-direction]')) return openChangeDirection();
  if (event.target.closest('[data-reset-audition]')) return openResetAudition();
});

root.addEventListener('submit', (event) => {
  const form = event.target.closest('[data-starting-reality]');
  if (!form) return;
  event.preventDefault();
  const project = activeProject();
  if (!project) return;
  const reality = new FormData(form).get('reality')?.trim();
  if (!reality) return form.querySelector('input')?.focus();
  project.reality = reality;
  project.moveId = classifyStartingReality(project, reality);
  project.history = [];
  saveState();
  renderProject(project);
  window.scrollTo({ top: 0, behavior: 'auto' });
});

modalRoot.addEventListener('click', (event) => {
  if (event.target.matches('[data-modal-backdrop], [data-close-modal]')) {
    closeModal();
    return;
  }

  const typeButton = event.target.closest('[data-new-type]');
  if (typeButton) {
    const form = modalRoot.querySelector('[data-new-song-form]');
    if (!form) return;
    form.elements.type.value = typeButton.dataset.newType;
    form.querySelectorAll('[data-new-type]').forEach((button) => button.classList.toggle('is-selected', button === typeButton));
    const isCover = typeButton.dataset.newType === 'cover';
    form.querySelector('[data-artist-field]').hidden = !isCover;
    form.querySelector('[data-title-label]').textContent = isCover ? 'Song' : 'Title';
    return;
  }

  const outcomeButton = event.target.closest('[data-outcome]');
  if (outcomeButton) {
    const project = activeProject();
    if (project) applyOutcome(project, outcomeButton.dataset.outcome);
    return;
  }

  if (event.target.closest('[data-custom-update]')) return openCustomUpdate();

  if (event.target.closest('[data-confirm-reset]')) {
    state = freshState();
    activeId = null;
    localStorage.removeItem(STORAGE_KEY);
    closeModal();
    renderSongs();
  }
});

modalRoot.addEventListener('change', (event) => {
  if (event.target.matches('[name="album"]')) {
    const form = event.target.closest('[data-new-song-form]');
    if (form) form.querySelector('[data-new-album-field]').hidden = event.target.value !== '__new__';
  }
});

modalRoot.addEventListener('submit', (event) => {
  const newSongForm = event.target.closest('[data-new-song-form]');
  if (newSongForm) {
    event.preventDefault();
    const data = new FormData(newSongForm);
    const type = data.get('type') === 'cover' ? 'cover' : 'original';
    const title = data.get('title')?.trim() || 'Untitled';
    const artist = type === 'cover' ? data.get('artist')?.trim() || 'Unknown artist' : '';
    const albumValue = data.get('album');
    const album = albumValue === '__new__' ? data.get('newAlbum')?.trim() || '' : albumValue || '';
    const project = {
      id: `song-${Date.now()}`,
      type,
      title,
      artist,
      album,
      reality: '',
      moveId: null,
      history: [],
      createdAt: Date.now(),
    };
    state.projects.unshift(project);
    saveState();
    activeId = project.id;
    closeModal();
    renderProject(project);
    window.scrollTo({ top: 0, behavior: 'auto' });
    return;
  }

  const customUpdateForm = event.target.closest('[data-custom-update-form]');
  if (customUpdateForm) {
    event.preventDefault();
    const project = activeProject();
    const note = new FormData(customUpdateForm).get('note')?.trim();
    if (!project || !note) return;
    project.history ||= [];
    project.history.push({ at: Date.now(), move: project.moveId, outcome: 'custom', label: note });
    project.customNote = note;
    project.moveId = 'custom-reconcile';
    saveState();
    closeModal();
    renderProject(project);
    window.scrollTo({ top: 0, behavior: 'auto' });
    return;
  }

  const directionForm = event.target.closest('[data-change-direction-form]');
  if (directionForm) {
    event.preventDefault();
    const project = activeProject();
    const direction = new FormData(directionForm).get('direction')?.trim();
    if (!project || !direction) return;
    project.direction = direction;
    project.moveId = 'direction-reconcile';
    project.history ||= [];
    project.history.push({ at: Date.now(), outcome: 'redirect', label: direction });
    saveState();
    closeModal();
    renderProject(project);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }
});

render();
