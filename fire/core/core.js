const STORAGE_KEY = 'babel-lab-fire-core-audition-v1';

const fixtures = {
  creep: {
    id: 'creep',
    title: 'Creep',
    artist: 'Radiohead',
    meta: 'Recreation · Match',
    target: 'Recreate the defining verse-to-chorus contrast and major production relationships before chasing exact sonic details.',
    start: 'c-arrangement',
    nodes: {
      'c-arrangement': {
        domain: 'Arrangement & Roles',
        title: 'Prove the verse → chorus lift before matching tone',
        why: 'The reference gets much of its impact from a change in role, density, and energy. If the lift is weak, exact guitar tone is downstream.',
        experiment: 'In Logic, rough one verse and the first chorus with fast-to-build sounds. Match the major roles and density change, keep levels rough, and listen straight through once.',
        alternate: 'Mute everything except vocal, drums, bass, and the main guitar role. Add parts back one at a time only when they clearly increase the chorus lift.',
        helped: {
          next: 'c-source',
          evidence: 'The section contrast is convincing enough to stop treating arrangement as the blocker.',
          states: { 'Arrangement & Roles': 'stable', 'Source & Performance': 'active' },
        },
        reveals: [
          { label: 'The chorus guitar itself feels weak', next: 'c-source', states: { 'Arrangement & Roles': 'reopened', 'Source & Performance': 'active' } },
          { label: 'The vocal gets lost when the chorus hits', next: 'c-balance', states: { 'Arrangement & Roles': 'stable', 'Balance & Hierarchy': 'active' } },
        ],
      },
      'c-source': {
        domain: 'Source & Performance',
        title: 'Make the chorus source carry the lift before processing it',
        why: 'The section structure can work. Now test whether the actual source and performance create enough weight and aggression without mix rescue.',
        experiment: 'Choose one chorus guitar part and test two minimally processed versions: one closer to verse behavior and one intentionally heavier. Level-match them and keep the version that creates the stronger lift in context.',
        alternate: 'Keep the same sound and level. Change only one performance variable—attack, register, voicing, or doubling—and compare it in the chorus.',
        helped: {
          next: 'c-balance',
          evidence: 'The source/performance now carries its role well enough to judge hierarchy.',
          states: { 'Source & Performance': 'stable', 'Balance & Hierarchy': 'active' },
        },
        reveals: [
          { label: 'The section still does not lift', next: 'c-arrangement', states: { 'Source & Performance': 'reopened', 'Arrangement & Roles': 'reopened' } },
          { label: 'The guitar works, but it masks the vocal', next: 'c-balance', states: { 'Source & Performance': 'stable', 'Balance & Hierarchy': 'active' } },
        ],
      },
      'c-balance': {
        domain: 'Balance & Hierarchy',
        title: 'Make the chorus hierarchy obvious before deeper mix work',
        why: 'The important parts exist. Before deeper processing, the listener should understand what is foreground and how the guitar weight relates to the vocal.',
        experiment: 'Reset the chorus to a simple static balance. At low monitoring level, use only faders and pan until the vocal, drums, bass, and guitars read in the intended order.',
        alternate: 'Turn the monitor level down until the mix is barely audible. Touch only faders and pan until the vocal and chorus lift still read.',
        helped: {
          next: 'c-balance',
          evidence: 'The hierarchy reads clearly enough that this domain is stable for now.',
          states: { 'Balance & Hierarchy': 'stable' },
        },
        reveals: [
          { label: 'The guitar source is the real problem', next: 'c-source', states: { 'Balance & Hierarchy': 'reopened', 'Source & Performance': 'reopened' } },
          { label: 'The chorus is overcrowded', next: 'c-arrangement', states: { 'Balance & Hierarchy': 'reopened', 'Arrangement & Roles': 'reopened' } },
        ],
      },
    },
  },

  even: {
    id: 'even',
    title: 'Even',
    artist: 'Babel',
    meta: 'Original',
    target: 'Start playful and slightly off-balance, then reveal frustration and vulnerability until the record feels like a genuine plea to be heard. Keep the intimate ukulele-rooted core as the production grows more urgent.',
    start: 'e-arrangement',
    nodes: {
      'e-arrangement': {
        domain: 'Arrangement & Roles',
        title: 'Prove the emotional escalation before polishing sounds',
        why: 'Even needs to move from playful and slightly off-balance into frustration and vulnerability. That arc has to read before detailed sound polish.',
        experiment: 'In Logic, rough Verse → Pre-Chorus → Chorus plus one later high-energy moment. Use existing parts or placeholders and make the changes in density, urgency, and focal roles obvious without chasing mix quality.',
        alternate: 'Mute everything nonessential. Rebuild the same sections with the fewest roles that can communicate playful → urgent. Add one element at a time only when it strengthens that turn.',
        helped: {
          next: 'e-source',
          evidence: 'The emotional arc reads clearly enough to stop treating arrangement as the blocker.',
          states: { 'Arrangement & Roles': 'stable', 'Source & Performance': 'active' },
        },
        reveals: [
          { label: 'The hook or musical material is not carrying the turn', next: 'e-material', states: { 'Arrangement & Roles': 'reopened', 'Material & Form': 'active' } },
          { label: 'It gets bigger, but less intimate', next: 'e-source', states: { 'Arrangement & Roles': 'stable', 'Source & Performance': 'active' } },
          { label: 'The vocal gets buried when the production opens up', next: 'e-balance', states: { 'Arrangement & Roles': 'stable', 'Balance & Hierarchy': 'active' } },
        ],
      },
      'e-material': {
        domain: 'Material & Form',
        title: 'Check the musical turn before asking production to fake it',
        why: 'If the arrangement cannot create the emotional turn, FIRE should test whether the underlying melody, harmony, rhythm, or lyric moment is doing enough work.',
        experiment: 'Play the key transition with only vocal and ukulele. Change one musical variable—melody contour, chord movement, rhythmic emphasis, or lyric placement—and keep the version that makes the emotional turn clearer without extra production.',
        alternate: 'Keep the same notes and change only rhythmic emphasis or lyric placement. Compare once in context before rewriting more material.',
        helped: {
          next: 'e-arrangement',
          evidence: 'The musical turn is clearer now, so arrangement is reopened with better evidence instead of more guesswork.',
          states: { 'Material & Form': 'stable', 'Arrangement & Roles': 'reopened' },
        },
        reveals: [
          { label: 'The performance changes the meaning more than the notes', next: 'e-source', states: { 'Material & Form': 'stable', 'Source & Performance': 'active' } },
        ],
      },
      'e-source': {
        domain: 'Source & Performance',
        title: 'Keep the intimate core while the record opens up',
        why: 'The next risk is making the song bigger by replacing its intimate ukulele-rooted identity instead of expanding around it.',
        experiment: 'Choose one section where the production opens up. Keep the vocal/ukulele relationship intact, then audition one supporting source or performance choice at a time. Keep only additions that increase urgency without making the song feel emotionally farther away.',
        alternate: 'Solo the vocal/ukulele core, then add supporting elements back one by one. Stop at the first addition that makes the song feel less immediate and change only that source or performance behavior.',
        helped: {
          next: 'e-balance',
          evidence: 'The added sources can increase urgency without replacing the intimate core.',
          states: { 'Source & Performance': 'stable', 'Balance & Hierarchy': 'active' },
        },
        reveals: [
          { label: 'The escalation itself still feels flat', next: 'e-arrangement', states: { 'Source & Performance': 'reopened', 'Arrangement & Roles': 'reopened' } },
          { label: 'The source/performance relationship is the blocker', next: 'e-source', states: { 'Source & Performance': 'reopened' } },
          { label: 'The sources work, but the vocal disappears in the hierarchy', next: 'e-balance', states: { 'Source & Performance': 'stable', 'Balance & Hierarchy': 'active' } },
        ],
      },
      'e-balance': {
        domain: 'Balance & Hierarchy',
        title: 'Let urgency grow without burying the plea',
        why: 'The record can get bigger without letting the emotional focal point disappear. The vocal should feel more exposed, not merely surrounded by louder production.',
        experiment: 'Build a static balance across one earlier section and one later urgent section. Add no new processing. Make the later section feel larger while keeping the vocal emotionally forward enough that the lyric remains the reason the production is growing.',
        alternate: 'Turn the mix down until it is barely audible. Use only faders and pan until the vocal still reads as the emotional center while the later section feels larger.',
        helped: {
          next: 'e-balance',
          evidence: 'The larger section keeps the vocal as the emotional center; this domain is stable for now.',
          states: { 'Balance & Hierarchy': 'stable' },
        },
        reveals: [
          { label: 'The section is simply too dense', next: 'e-arrangement', states: { 'Balance & Hierarchy': 'reopened', 'Arrangement & Roles': 'reopened' } },
          { label: 'The vocal performance loses urgency', next: 'e-source', states: { 'Balance & Hierarchy': 'reopened', 'Source & Performance': 'reopened' } },
        ],
      },
    },
  },
};

const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[char]);

function freshProject(fixture) {
  return {
    currentNode: fixture.start,
    retry: false,
    domainState: { [fixture.nodes[fixture.start].domain]: 'active' },
    history: [],
    customReveal: null,
  };
}

function seedState() {
  return {
    version: 1,
    selected: null,
    projects: {
      creep: freshProject(fixtures.creep),
      even: freshProject(fixtures.even),
    },
  };
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved?.version === 1 && saved.projects?.creep && saved.projects?.even) return saved;
  } catch (_) {}
  const fresh = seedState();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
  return fresh;
}

let state = loadState();
const root = document.getElementById('coreApp');
const modalRoot = document.getElementById('modalRoot');

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function statusLabel(value) {
  if (value === 'stable') return 'Stable for now';
  if (value === 'reopened') return 'Reopened';
  return 'Active';
}

function outcomeLabel(value) {
  if (value === 'helped') return 'Helped';
  if (value === 'didnt') return "Didn't help";
  return 'Revealed something else';
}

function fixtureAndProject() {
  if (!state.selected) return [null, null];
  return [fixtures[state.selected], state.projects[state.selected]];
}

function currentFocus(project, fixture) {
  if (project.customReveal) {
    const source = fixture.nodes[project.customReveal.fromNode];
    return {
      domain: source.domain,
      title: 'Isolate the new evidence before continuing',
      why: `Your last experiment revealed: “${project.customReveal.note}” New evidence outranks the planned route until FIRE knows whether it changes the real cause.`,
      experiment: project.retry
        ? 'Keep the same stripped-down setup and change one different upstream variable. If it still does not move, keep the domain reopened rather than forcing a conclusion.'
        : 'In Logic, isolate that behavior with the fewest elements possible. Change one plausible upstream variable, then return with whether the behavior changed.',
      alternate: 'Keep the setup stripped down and test one different plausible cause.',
      helped: {
        next: project.customReveal.resumeNode,
        evidence: 'The newly revealed behavior changed under an isolated test, so FIRE can return to the nearest useful route with that evidence preserved.',
        states: { [source.domain]: 'reopened' },
      },
      reveals: [],
    };
  }

  const node = fixture.nodes[project.currentNode];
  if (!project.retry) return node;
  return {
    ...node,
    title: 'Try a cheaper alternate before escalating',
    why: `The first experiment did not move this enough. ${node.why}`,
    experiment: node.alternate,
  };
}

function applyStates(project, updates = {}) {
  Object.entries(updates).forEach(([domain, value]) => { project.domainState[domain] = value; });
}

function stateSummary(project) {
  return Object.entries(project.domainState)
    .slice(-4)
    .map(([domain, value]) => `${domain}: ${statusLabel(value)}`)
    .join(' · ');
}

function renderPicker() {
  const rows = Object.values(fixtures).map((fixture) => {
    const project = state.projects[fixture.id];
    const focus = currentFocus(project, fixture);
    const last = project.history[project.history.length - 1];
    return `
      <button class="core-project-row" data-select-project="${fixture.id}">
        <span class="core-project-copy">
          <strong>${esc(fixture.title)}</strong>
          <small>${esc(last ? `${outcomeLabel(last.outcome)} · ${focus.domain}` : `${fixture.meta} · ${focus.domain}`)}</small>
        </span>
        <span class="core-project-arrow" aria-hidden="true">›</span>
      </button>`;
  }).join('');

  root.innerHTML = `
    <main class="lab-shell core-shell">
      <header class="lab-topbar"><a class="back-link" href="../" aria-label="Back to Fire Lab">Back</a></header>
      <header class="lab-page-header core-header"><h1>FIRE Core</h1><p>Interaction audition · fake local state</p></header>
      <section class="core-column">
        <p class="core-intro">Pick a real fixture. FIRE should give you one useful DAW move, then change direction from what actually happened.</p>
        <div class="core-project-list">${rows}</div>
        <p class="core-boundary">Lab evidence only. Nothing here reads or writes FIRE production data.</p>
      </section>
    </main>`;
}

function renderProject() {
  const [fixture, project] = fixtureAndProject();
  if (!fixture || !project) return renderPicker();
  const focus = currentFocus(project, fixture);
  const last = project.history[project.history.length - 1];

  root.innerHTML = `
    <main class="lab-shell core-shell">
      <header class="lab-topbar">
        <button class="back-link core-back" data-back-projects aria-label="Back to FIRE Core fixtures">Back</button>
        <button class="core-reset" data-reset-project type="button">Reset</button>
      </header>
      <header class="lab-page-header core-header"><h1>${esc(fixture.title)}</h1><p>${esc(fixture.artist)} · ${esc(fixture.meta)}</p></header>
      <section class="core-column">
        <div class="core-target"><span>Target</span><p>${esc(fixture.target)}</p></div>
        <article class="core-focus-card">
          <div class="core-kicker">Active Focus · ${esc(focus.domain)} · ${esc(statusLabel(project.domainState[focus.domain] || 'active'))}</div>
          <h2>${esc(focus.title)}</h2>
          <p class="core-why">${esc(focus.why)}</p>
          <div class="core-daw-card"><span>Try in Logic</span><p>${esc(focus.experiment)}</p></div>
          <button class="primary-btn core-primary" data-tried type="button">I tried it</button>
        </article>
        ${last ? `
          <section class="core-evidence" aria-label="Latest evidence">
            <span>Evidence preserved</span>
            <strong>${esc(outcomeLabel(last.outcome))} · ${esc(last.domain)}</strong>
            <p>${esc(last.evidence)}</p>
            <small>${esc(stateSummary(project))}</small>
          </section>` : ''}
      </section>
    </main>`;
}

function render() {
  state.selected ? renderProject() : renderPicker();
}

function closeModal() {
  modalRoot.hidden = true;
  modalRoot.innerHTML = '';
}

function openModal(body, label) {
  modalRoot.innerHTML = `<div class="quickview-backdrop" data-modal-backdrop><section class="quickview core-sheet" role="dialog" aria-modal="true" aria-label="${esc(label)}">${body}</section></div>`;
  modalRoot.hidden = false;
  requestAnimationFrame(() => modalRoot.querySelector('button, textarea')?.focus({ preventScroll: true }));
}

function openEvaluation() {
  openModal(`
    <h3>What happened?</h3>
    <p>Your result changes what FIRE does next.</p>
    <div class="core-result-stack">
      <button class="core-result-btn" data-outcome="helped"><strong>Helped</strong><small>Stable enough to move.</small></button>
      <button class="core-result-btn" data-outcome="didnt"><strong>Didn't help</strong><small>Keep this domain active and try cheaper.</small></button>
      <button class="core-result-btn" data-outcome="revealed"><strong>Revealed something else</strong><small>Redirect or reopen from new evidence.</small></button>
    </div>
    <button class="secondary-btn core-sheet-cancel" data-close-modal type="button">Cancel</button>
  `, 'What happened?');
}

function openRevealChoices() {
  const [fixture, project] = fixtureAndProject();
  const focus = currentFocus(project, fixture);
  const choices = (focus.reveals || []).map((choice, index) => `
    <button class="core-reveal-choice" data-reveal-choice="${index}">
      <strong>${esc(choice.label)}</strong>
      <small>${esc(fixture.nodes[choice.next]?.domain || focus.domain)}</small>
    </button>`).join('');

  openModal(`
    <h3>What did it reveal?</h3>
    <p>Choose the closest thing. The point is to change the route, not maintain FIRE.</p>
    ${choices ? `<div class="core-result-stack">${choices}</div>` : ''}
    <button class="secondary-btn core-other-btn" data-custom-reveal type="button">Something different</button>
    <button class="secondary-btn core-sheet-cancel" data-close-modal type="button">Cancel</button>
  `, 'What did it reveal?');
}

function openCustomReveal() {
  openModal(`
    <h3>What did it reveal?</h3>
    <p>One sentence is enough. FIRE will reopen this domain and isolate the new evidence before continuing.</p>
    <textarea class="core-textarea" id="customRevealText" rows="4" placeholder="Example: The vocal suddenly feels detached from the band."></textarea>
    <button class="primary-btn core-primary" data-save-custom-reveal type="button">Use this evidence</button>
    <button class="secondary-btn core-sheet-cancel" data-close-modal type="button">Cancel</button>
  `, 'Describe the new evidence');
}

function commitHelped() {
  const [fixture, project] = fixtureAndProject();
  const focus = currentFocus(project, fixture);
  applyStates(project, focus.helped.states);
  project.history.push({ at: Date.now(), outcome: 'helped', domain: focus.domain, evidence: focus.helped.evidence });
  project.currentNode = focus.helped.next;
  project.retry = false;
  project.customReveal = null;
  saveState();
  closeModal();
  render();
  window.scrollTo({ top: 0, behavior: 'auto' });
}

function commitDidntHelp() {
  const [fixture, project] = fixtureAndProject();
  const focus = currentFocus(project, fixture);
  const alreadyRetrying = project.retry;
  project.domainState[focus.domain] = 'active';
  project.history.push({
    at: Date.now(),
    outcome: 'didnt',
    domain: focus.domain,
    evidence: alreadyRetrying
      ? 'The alternate test also did not help, so the domain stays active instead of being marked stable.'
      : 'The first experiment did not help, so FIRE kept the domain active and chose a cheaper alternate test.',
  });
  project.retry = true;
  saveState();
  closeModal();
  render();
  window.scrollTo({ top: 0, behavior: 'auto' });
}

function commitReveal(choice) {
  const [fixture, project] = fixtureAndProject();
  const focus = currentFocus(project, fixture);
  applyStates(project, choice.states);
  project.history.push({ at: Date.now(), outcome: 'revealed', domain: focus.domain, evidence: choice.label });
  project.currentNode = choice.next;
  project.retry = false;
  project.customReveal = null;
  saveState();
  closeModal();
  render();
  window.scrollTo({ top: 0, behavior: 'auto' });
}

function commitCustomReveal(note) {
  const [fixture, project] = fixtureAndProject();
  const focus = currentFocus(project, fixture);
  project.domainState[focus.domain] = 'reopened';
  project.history.push({ at: Date.now(), outcome: 'revealed', domain: focus.domain, evidence: note });
  project.customReveal = { fromNode: project.currentNode, note, resumeNode: focus.helped?.next || project.currentNode };
  project.retry = false;
  saveState();
  closeModal();
  render();
  window.scrollTo({ top: 0, behavior: 'auto' });
}

root.addEventListener('click', (event) => {
  const select = event.target.closest('[data-select-project]');
  if (select) {
    state.selected = select.dataset.selectProject;
    saveState();
    render();
    window.scrollTo({ top: 0, behavior: 'auto' });
    return;
  }

  if (event.target.closest('[data-back-projects]')) {
    state.selected = null;
    saveState();
    render();
    window.scrollTo({ top: 0, behavior: 'auto' });
    return;
  }

  if (event.target.closest('[data-reset-project]')) {
    const [fixture] = fixtureAndProject();
    if (!fixture) return;
    state.projects[fixture.id] = freshProject(fixture);
    saveState();
    render();
    return;
  }

  if (event.target.closest('[data-tried]')) openEvaluation();
});

modalRoot.addEventListener('click', (event) => {
  if (event.target.matches('[data-modal-backdrop], [data-close-modal]')) return closeModal();

  const outcome = event.target.closest('[data-outcome]')?.dataset.outcome;
  if (outcome === 'helped') return commitHelped();
  if (outcome === 'didnt') return commitDidntHelp();
  if (outcome === 'revealed') return openRevealChoices();

  const revealButton = event.target.closest('[data-reveal-choice]');
  if (revealButton) {
    const [fixture, project] = fixtureAndProject();
    const focus = currentFocus(project, fixture);
    const choice = focus.reveals?.[Number(revealButton.dataset.revealChoice)];
    if (choice) return commitReveal(choice);
  }

  if (event.target.closest('[data-custom-reveal]')) return openCustomReveal();
  if (event.target.closest('[data-save-custom-reveal]')) {
    const field = document.getElementById('customRevealText');
    const note = field?.value.trim();
    if (!note) return field?.focus();
    return commitCustomReveal(note);
  }
});

render();
