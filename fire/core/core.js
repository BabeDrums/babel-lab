const STORAGE_KEY = 'babel-lab-fire-core-audition-v2';

const fixtures = {
  creep: {
    id: 'creep',
    title: 'Creep',
    artist: 'Radiohead',
    meta: 'Recreation · Match',
    stages: [
      { id: 'starting', label: 'Just starting', detail: 'Nothing useful is built yet.', needs: [
        { id: 'first-slice', label: 'I need a useful first chunk', focus: 'c-first-slice' },
        { id: 'what-first', label: "I don't know what to copy first", focus: 'c-reference-pass' },
      ]},
      { id: 'rough', label: 'Verse + chorus roughed in', detail: 'Enough exists to compare the transition.', needs: [
        { id: 'lift', label: "The chorus doesn't hit", focus: 'c-lift' },
        { id: 'vocal', label: 'The vocal disappears', focus: 'c-vocal' },
        { id: 'guitar', label: 'The guitars feel wrong', focus: 'c-guitar' },
        { id: 'unsure', label: "I'm not sure what is wrong", focus: 'c-listen' },
      ]},
      { id: 'built', label: 'Most of the song is built', detail: 'The problem is somewhere inside the production.', needs: [
        { id: 'lift', label: "The chorus doesn't hit", focus: 'c-lift' },
        { id: 'vocal', label: 'The vocal disappears', focus: 'c-vocal' },
        { id: 'guitar', label: 'The guitars feel wrong', focus: 'c-guitar' },
        { id: 'reference', label: "It just doesn't feel like the reference", focus: 'c-reference-gap' },
      ]},
    ],
    focuses: {
      'c-first-slice': {
        title: 'Build only the part that can teach you something.',
        experiment: 'In Logic, make the last 4 bars of a verse into the first 4 bars of the chorus. Use drums, bass, one guitar, and vocal if you have it. Stop there. Do not chase tone yet.',
        why: 'Eight useful bars can expose the section change, the main roles, and what you actually need next without making you build the whole song blind.',
        domain: 'Material & Form',
        helped: { next: 'c-listen', learned: 'You now have a small playable slice FIRE can diagnose instead of guessing.' },
        didnt: { next: 'c-reference-pass', learned: 'Building before understanding the reference is costing more than it is teaching.' },
        reveals: [
          { label: 'The chorus already feels weak', next: 'c-lift', learned: 'The first useful problem is the verse-to-chorus lift.' },
          { label: 'The guitar is the obvious mismatch', next: 'c-guitar', learned: 'The guitar is already the clearest mismatch worth isolating.' },
        ],
      },
      'c-reference-pass': {
        title: 'Listen for entrances, not tone.',
        experiment: 'Play the reference from the end of a verse into the chorus. Write down only what enters, leaves, or gets noticeably more forceful. One pass. Ignore EQ, distortion, and exact sounds.',
        why: 'You need the section skeleton before tone details are useful. This keeps reference listening focused instead of turning it into vague note-taking.',
        domain: 'Arrangement & Roles',
        helped: { next: 'c-first-slice', learned: 'You have enough of the section skeleton to build a useful test slice.' },
        didnt: { next: 'c-listen', learned: 'Entry/exit listening did not make the difference clear; use a simpler perception test.' },
        reveals: [
          { label: 'The drums are the biggest change', next: 'c-rhythm-lift', learned: 'The rhythm section may be carrying more of the lift than the guitar.' },
          { label: 'The guitar change is the obvious moment', next: 'c-guitar', learned: 'The guitar change is the clearest reference clue.' },
        ],
      },
      'c-lift': {
        title: 'Turn the chorus guitar down before touching its tone.',
        experiment: 'Loop the verse into the chorus. Pull the main chorus guitar down about 4 dB for one pass. Change nothing else. Does the chorus suddenly feel bigger because the vocal and drums have room again?',
        why: 'This separates a hierarchy problem from a tone problem. If less guitar makes the chorus feel larger, more distortion or EQ was never the first fix.',
        domain: 'Balance & Hierarchy',
        helped: { next: 'c-guitar-ceiling', learned: 'The lift already exists; the guitar was crowding it.' },
        didnt: { next: 'c-rhythm-lift', learned: 'Guitar level is not the main reason the chorus feels small.' },
        reveals: [
          { label: 'The vocal suddenly feels right', next: 'c-guitar-ceiling', learned: 'The guitar/vocal relationship is the real pressure point.' },
          { label: 'The drums are what feel small', next: 'c-rhythm-lift', learned: 'The rhythm section is the better place to investigate.' },
          { label: 'The guitar itself sounds weak', next: 'c-guitar', learned: 'The source/character of the guitar is now the clearer issue.' },
        ],
      },
      'c-guitar-ceiling': {
        title: 'Find the loudest the guitar can be without shrinking the chorus.',
        experiment: 'Keep the loop running. Bring the chorus guitar up 1 dB at a time until the vocal or drums start feeling smaller, then back it off 1 dB. Leave it there for now.',
        why: 'This gives you a practical ceiling instead of mixing by habit. You can chase aggression later without sacrificing the section hierarchy you just proved.',
        domain: 'Balance & Hierarchy',
        helped: { next: 'c-guitar', learned: 'You have a believable guitar level ceiling; now tone choices can be judged in context.' },
        didnt: { next: 'c-vocal', learned: 'Level alone cannot create the relationship you want; the vocal side needs checking.' },
        reveals: [
          { label: 'The guitar loses all aggression', next: 'c-guitar', learned: 'The guitar needs character from source/performance, not just more level.' },
        ],
      },
      'c-rhythm-lift': {
        title: 'Check whether the lift exists without guitars.',
        experiment: 'Mute the chorus guitars. Play verse into chorus with only drums, bass, and vocal. If the chorus still does not feel like a step up, stop touching guitar tone — the lift is missing earlier in the chain.',
        why: 'A chorus cannot be rescued by one loud guitar if the underlying energy does not change. This tells you whether the rhythm section already creates a usable foundation.',
        domain: 'Arrangement & Roles',
        helped: { next: 'c-guitar', learned: 'The rhythm section creates the lift; the guitar can now be judged as support instead of rescue.' },
        didnt: { next: 'c-reference-pass', learned: 'The underlying section change still needs work before guitar detail is worth chasing.' },
        reveals: [
          { label: 'The drums are the weak link', next: 'c-listen', learned: 'The drums are now the clearest thing to study against the reference.' },
          { label: 'The bass is flattening the change', next: 'c-listen', learned: 'The bass behavior is now the clearest thing to compare.' },
        ],
      },
      'c-vocal': {
        title: 'Find out what is actually covering the vocal.',
        experiment: 'Loop the chorus. Drop the guitars 3 dB. If the vocal comes back, stop there — you found a hierarchy problem. If it barely changes, put the guitars back and drop the next loudest support element instead.',
        why: 'One-at-a-time level changes reveal masking relationships faster than stacking EQ on the vocal and hoping.',
        domain: 'Balance & Hierarchy',
        helped: { next: 'c-guitar-ceiling', learned: 'A support element was masking the vocal; the vocal itself did not need rescuing first.' },
        didnt: { next: 'c-listen', learned: 'Simple support-level masking does not explain the vocal problem.' },
        reveals: [
          { label: 'The vocal feels weak even by itself', next: 'c-listen', learned: 'The vocal source/performance may be the issue, not the mix around it.' },
          { label: 'The guitar is definitely the problem', next: 'c-guitar-ceiling', learned: 'The guitar/vocal relationship is confirmed as the blocker.' },
        ],
      },
      'c-guitar': {
        title: 'Strip the guitar back before adding more processing.',
        experiment: 'Save your current chorus guitar sound. Make a second version with only the core amp/sound and no extra EQ, compression, or space. Level-match them. Which one feels closer to the job the guitar needs to do?',
        why: 'This separates a bad source/performance choice from a processing pile-up. More plugins are only useful after you know which side is wrong.',
        domain: 'Source & Performance',
        helped: { next: 'c-guitar-ceiling', learned: 'The simpler guitar sound is giving you a clearer source to balance.' },
        didnt: { next: 'c-reference-gap', learned: 'Removing extra processing did not solve the mismatch; the gap is probably earlier than the mix chain.' },
        reveals: [
          { label: 'The stripped version is way better', next: 'c-guitar-ceiling', learned: 'Extra processing was hiding the useful character of the guitar.' },
          { label: 'Both versions feel wrong', next: 'c-reference-gap', learned: 'The source/performance itself needs comparison before more mixing.' },
        ],
      },
      'c-reference-gap': {
        title: 'Name one difference you can actually hear.',
        experiment: 'A/B your chorus against the reference at roughly similar loudness. Ignore “better” or “worse.” Pick one audible difference only: weight, attack, width, vocal position, or section energy.',
        why: '“It does not feel like the reference” is too big to act on. One perceptual difference gives FIRE something real to diagnose next.',
        domain: 'Current evidence',
        helped: { next: 'c-listen', learned: 'You turned a vague mismatch into one audible difference FIRE can work with.' },
        didnt: { next: 'c-listen', learned: 'Direct A/B is still too broad; use a focused listening pass next.' },
        reveals: [
          { label: 'The main difference is guitar weight', next: 'c-guitar', learned: 'Guitar weight is the clearest reference difference.' },
          { label: 'The main difference is vocal position', next: 'c-vocal', learned: 'Vocal position is the clearest reference difference.' },
          { label: 'The whole chorus has less energy', next: 'c-rhythm-lift', learned: 'Section energy is the clearer problem than exact tone.' },
        ],
      },
      'c-listen': {
        title: 'Do one pass with a single listening job.',
        experiment: 'Play verse into chorus at low volume. On this pass, listen only for what becomes harder to hear when the chorus arrives. Do not fix anything yet. Come back with the first thing you notice.',
        why: 'A narrow listening job is often more useful than another random mix move when you are not sure what is wrong.',
        domain: 'Current evidence',
        helped: { next: 'c-vocal', learned: 'You found a concrete masking or hierarchy clue instead of guessing.' },
        didnt: { next: 'c-reference-gap', learned: 'Your own mix is not revealing the issue clearly; compare one difference against the reference.' },
        reveals: [
          { label: 'The vocal gets harder to hear', next: 'c-vocal', learned: 'The vocal relationship is the first concrete clue.' },
          { label: 'The drums feel smaller', next: 'c-rhythm-lift', learned: 'The rhythm section is the first concrete clue.' },
          { label: 'Nothing disappears — it just feels flat', next: 'c-rhythm-lift', learned: 'The issue is more likely section energy than masking.' },
        ],
      },
    },
  },

  even: {
    id: 'even', title: 'Even', artist: 'Babel', meta: 'Original',
    stages: [
      { id: 'idea', label: 'Mostly an idea / demo', detail: 'The production is not fully mapped yet.', needs: [
        { id: 'first-shape', label: 'I need a useful first production move', focus: 'e-first-shape' },
        { id: 'what-first', label: "I don't know what to build first", focus: 'e-first-shape' },
      ]},
      { id: 'rough', label: 'Sections are roughed in', detail: 'Enough exists to hear the emotional movement.', needs: [
        { id: 'emotion', label: "It doesn't build emotionally", focus: 'e-emotion' },
        { id: 'intimacy', label: 'It gets bigger but less intimate', focus: 'e-intimacy' },
        { id: 'vocal', label: 'The vocal gets buried', focus: 'e-vocal' },
        { id: 'unsure', label: "I'm not sure what is wrong", focus: 'e-listen' },
      ]},
      { id: 'built', label: 'Full rough arrangement', detail: 'The song exists; the production needs judgment.', needs: [
        { id: 'emotion', label: "It doesn't build emotionally", focus: 'e-emotion' },
        { id: 'intimacy', label: 'It gets bigger but less intimate', focus: 'e-intimacy' },
        { id: 'vocal', label: 'The vocal gets buried', focus: 'e-vocal' },
        { id: 'flat', label: 'The whole thing feels flat', focus: 'e-listen' },
      ]},
    ],
    focuses: {
      'e-first-shape': {
        title: 'Build one emotional turn, not the whole production.',
        experiment: 'Pick the moment where Even should stop feeling playful and start feeling more exposed. Build 8 bars before that moment and 8 bars after it with only the parts you already care about. Placeholders are fine. Stop after the turn works at all.',
        why: 'The song’s production idea lives in the change of feeling. A small working transition teaches you more than filling an entire arrangement with guesses.',
        domain: 'Arrangement & Roles',
        helped: { next: 'e-emotion', learned: 'You now have one real emotional transition to judge instead of a whole unfinished song.' },
        didnt: { next: 'e-core-check', learned: 'The production turn is not reading yet; check whether the musical core carries it first.' },
        reveals: [
          { label: 'The vocal/ukulele already carries the turn', next: 'e-intimacy', learned: 'The intimate core is doing useful work before extra production.' },
          { label: 'The turn feels weak even stripped down', next: 'e-core-check', learned: 'The musical/performance core needs attention before more production.' },
        ],
      },
      'e-emotion': {
        title: 'Find the exact element that creates the emotional jump.',
        experiment: 'Loop 8 bars before the section that should open up and 8 bars after it. Mute the elements that enter at the turn. Add them back one at a time. Stop as soon as the emotional jump appears.',
        why: 'This shows which addition actually changes the feeling and which additions are only making the section busier.',
        domain: 'Arrangement & Roles',
        helped: { next: 'e-intimacy', learned: 'You found the element that actually creates the emotional turn.' },
        didnt: { next: 'e-core-check', learned: 'Added production is not creating the turn; the core material/performance needs checking.' },
        reveals: [
          { label: 'One element makes it feel less personal', next: 'e-intimacy', learned: 'The emotional problem is not size — it is loss of intimacy.' },
          { label: 'The vocal itself is not changing enough', next: 'e-core-check', learned: 'The performance may need to carry more of the emotional turn.' },
        ],
      },
      'e-intimacy': {
        title: 'Find the first thing that pushes the song away from you.',
        experiment: 'Solo the vocal + ukulele core in the bigger section. Add the supporting elements back one at a time. The first addition that makes the vocal feel farther away is your suspect. Leave everything after it muted for now.',
        why: 'Bigger does not have to mean more distant. This isolates the first production choice that starts replacing the intimate core instead of supporting it.',
        domain: 'Source & Performance',
        helped: { next: 'e-vocal', learned: 'You found the production element that starts costing intimacy.' },
        didnt: { next: 'e-vocal', learned: 'No single added element explains the distance; check the hierarchy around the vocal next.' },
        reveals: [
          { label: 'The vocal performance is what feels distant', next: 'e-core-check', learned: 'The issue is in the performance/core, not just the supporting production.' },
          { label: 'The whole section is simply too dense', next: 'e-emotion', learned: 'Density is obscuring the emotional turn.' },
        ],
      },
      'e-vocal': {
        title: 'Make the bigger section support the lyric instead of competing with it.',
        experiment: 'Turn the monitor down. Loop one intimate section and one bigger section. In the bigger section, move only the supporting elements — not the vocal — until the lyric feels just as easy to follow.',
        why: 'If the vocal only works after you keep turning it up, the surrounding hierarchy is probably the problem. This protects the emotional center instead of mixing everything louder.',
        domain: 'Balance & Hierarchy',
        helped: { next: 'e-emotion', learned: 'The vocal can stay emotionally forward without being made louder; the support balance was the issue.' },
        didnt: { next: 'e-core-check', learned: 'Support level alone does not explain why the vocal loses impact.' },
        reveals: [
          { label: 'One support element keeps swallowing words', next: 'e-intimacy', learned: 'One specific support element is competing with the lyric.' },
          { label: 'The vocal feels weak even when exposed', next: 'e-core-check', learned: 'The vocal performance/core needs attention before more mix work.' },
        ],
      },
      'e-core-check': {
        title: 'See if the song can make the turn with nothing to hide behind.',
        experiment: 'Play the important transition with only vocal + ukulele. Change one thing in the performance — intensity, rhythm, phrasing, or space between lines. Keep the version that makes the emotional change clearest without adding production.',
        why: 'If the stripped core cannot communicate the turn, production will mostly decorate the problem. This keeps authorship in the song instead of asking the mix to fake it.',
        domain: 'Material & Form',
        helped: { next: 'e-emotion', learned: 'The core now carries more of the emotional turn; production can support something real.' },
        didnt: { next: 'e-listen', learned: 'A performance-only change did not reveal the answer; return to a focused listening pass.' },
        reveals: [
          { label: 'The lyric placement changes everything', next: 'e-emotion', learned: 'Lyric/rhythmic placement is doing more emotional work than extra production.' },
          { label: 'The vocal delivery changes everything', next: 'e-intimacy', learned: 'Performance intimacy is a major part of the target.' },
        ],
      },
      'e-listen': {
        title: 'Find where the song stops feeling like the same person.',
        experiment: 'Listen through once without touching anything. The moment the song feels emotionally farther away, pause. What changed right there — a new element, a vocal change, density, or nothing obvious?',
        why: 'You do not need a production diagnosis before you have a real perception. This gives FIRE one concrete moment to work from instead of a vague “flat” feeling.',
        domain: 'Current evidence',
        helped: { next: 'e-intimacy', learned: 'You found a specific moment where the emotional relationship changes.' },
        didnt: { next: 'e-core-check', learned: 'No single production moment stands out; test the stripped core next.' },
        reveals: [
          { label: 'A new element changes the feeling', next: 'e-intimacy', learned: 'A specific added element is the first useful suspect.' },
          { label: 'The vocal changes', next: 'e-core-check', learned: 'The performance is the first useful suspect.' },
          { label: 'It never really changes enough', next: 'e-emotion', learned: 'The arrangement needs a clearer emotional turn.' },
        ],
      },
    },
  },
};

const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);

function freshProject() { return { stage: null, need: null, currentFocus: null, history: [], customReveal: null }; }
function seedState() { return { version: 2, selected: null, projects: { creep: freshProject(), even: freshProject() } }; }
function loadState() {
  try { const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)); if (saved?.version === 2 && saved.projects?.creep && saved.projects?.even) return saved; } catch (_) {}
  const fresh = seedState(); localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh)); return fresh;
}

let state = loadState();
const root = document.getElementById('coreApp');
const modalRoot = document.getElementById('modalRoot');
function saveState() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
function selectedPair() { if (!state.selected) return [null, null]; return [fixtures[state.selected], state.projects[state.selected]]; }
function stageFor(fixture, project) { return fixture.stages.find((item) => item.id === project.stage) || null; }
function needFor(fixture, project) { return stageFor(fixture, project)?.needs.find((item) => item.id === project.need) || null; }
function focusFor(fixture, project) {
  if (project.customReveal) return {
    title: 'Isolate the thing you just noticed.',
    experiment: `You noticed: “${project.customReveal}” Loop the smallest part where you hear it. Mute or bypass one likely cause at a time until that behavior changes. Stop when you find the first cause that actually moves it.`,
    why: 'Unexpected evidence is more useful than forcing the planned route. One-variable isolation turns the surprise into something FIRE can reason from.',
    domain: 'Current evidence',
    helped: { next: project.currentFocus, learned: 'The unexpected behavior now has a more specific cause to carry forward.' },
    didnt: { next: project.currentFocus, learned: 'The first suspected cause was wrong; the original focus stays open.' }, reveals: [], custom: true,
  };
  return fixture.focuses[project.currentFocus] || null;
}
function latestLearned(project) { return project.history[project.history.length - 1]?.learned || ''; }

function renderPicker() {
  const rows = Object.values(fixtures).map((fixture) => {
    const project = state.projects[fixture.id];
    const status = project.currentFocus ? 'In progress' : project.stage ? 'Finish orientation' : fixture.meta;
    return `<button class="core-project-row" data-select-project="${fixture.id}"><span class="core-project-copy"><strong>${esc(fixture.title)}</strong><small>${esc(fixture.artist)} · ${esc(status)}</small></span><span class="core-project-arrow" aria-hidden="true">›</span></button>`;
  }).join('');
  root.innerHTML = `<main class="lab-shell core-shell"><header class="lab-topbar"><a class="back-link" href="../" aria-label="Back to Fire Lab">Back</a></header><header class="lab-page-header core-header"><h1>FIRE Core</h1><p>V2 audition · earn the recommendation first</p></header><section class="core-column"><p class="core-intro">Pick a project. FIRE should learn just enough to give you one move worth trying in the DAW.</p><div class="core-project-list">${rows}</div><p class="core-boundary">Lab-only state. No production FIRE data is touched.</p></section></main>`;
}

function renderChoiceQuestion(fixture, project) {
  const stage = stageFor(fixture, project), isStage = !stage, options = isStage ? fixture.stages : stage.needs;
  const title = isStage ? 'Where are you actually at?' : 'What do you want help with right now?';
  const copy = isStage ? 'One tap. FIRE should not pretend it knows your session.' : 'This is what earns the next move.';
  const attribute = isStage ? 'data-stage' : 'data-need';
  const rows = options.map((option) => `<button class="core-choice" ${attribute}="${option.id}"><span><strong>${esc(option.label)}</strong>${option.detail ? `<small>${esc(option.detail)}</small>` : ''}</span><span class="core-project-arrow" aria-hidden="true">›</span></button>`).join('');
  root.innerHTML = `<main class="lab-shell core-shell"><header class="lab-topbar"><button class="back-link core-back" data-back-projects aria-label="Back to FIRE Core projects">Back</button>${project.stage ? '<button class="core-reset" data-reset-project type="button">Start over</button>' : '<span></span>'}</header><header class="lab-page-header core-header"><h1>${esc(fixture.title)}</h1><p>${esc(fixture.artist)} · ${esc(fixture.meta)}</p></header><section class="core-column"><div class="core-question-head"><h2>${esc(title)}</h2><p>${esc(copy)}</p></div><div class="core-choice-list">${rows}</div></section></main>`;
}

function basisText(fixture, project) { const stage = stageFor(fixture, project), need = needFor(fixture, project); return stage && need ? `${stage.label} · ${need.label}` : ''; }
function renderFocus(fixture, project) {
  const focus = focusFor(fixture, project); if (!focus) return renderChoiceQuestion(fixture, project); const learned = latestLearned(project);
  root.innerHTML = `<main class="lab-shell core-shell"><header class="lab-topbar"><button class="back-link core-back" data-back-projects aria-label="Back to FIRE Core projects">Back</button><button class="core-reset" data-reset-project type="button">Start over</button></header><header class="lab-page-header core-header"><h1>${esc(fixture.title)}</h1><p>${esc(fixture.artist)} · ${esc(fixture.meta)}</p></header><section class="core-column">${!focus.custom ? `<p class="core-basis"><span>Based on</span>${esc(basisText(fixture, project))}</p>` : ''}${learned ? `<div class="core-learned"><span>Learned</span><strong>${esc(learned)}</strong></div>` : ''}<article class="core-focus-card"><div class="core-kicker">Try this next</div><h2>${esc(focus.title)}</h2><div class="core-daw-card"><p>${esc(focus.experiment)}</p></div><details class="core-why"><summary>Why this?</summary><p>${esc(focus.why)}</p></details><button class="primary-btn core-primary" data-tried type="button">Tried it</button></article></section></main>`;
}
function renderProject() { const [fixture, project] = selectedPair(); if (!fixture || !project) return renderPicker(); if (!project.stage || !project.need || !project.currentFocus) return renderChoiceQuestion(fixture, project); renderFocus(fixture, project); }
function render() { state.selected ? renderProject() : renderPicker(); }
function closeModal() { modalRoot.hidden = true; modalRoot.innerHTML = ''; }
function openModal(body, label) { modalRoot.innerHTML = `<div class="quickview-backdrop" data-modal-backdrop><section class="quickview core-sheet" role="dialog" aria-modal="true" aria-label="${esc(label)}">${body}</section></div>`; modalRoot.hidden = false; requestAnimationFrame(() => modalRoot.querySelector('button, textarea')?.focus({ preventScroll: true })); }
function openEvaluation() { openModal(`<h3>What happened?</h3><div class="core-result-stack"><button class="core-result-btn" data-outcome="helped"><strong>Yeah — that changed it</strong></button><button class="core-result-btn" data-outcome="didnt"><strong>No real difference</strong></button><button class="core-result-btn" data-outcome="revealed"><strong>Something else jumped out</strong></button></div><button class="secondary-btn core-sheet-cancel" data-close-modal type="button">Cancel</button>`, 'What happened?'); }
function openRevealChoices() {
  const [fixture, project] = selectedPair(), focus = focusFor(fixture, project);
  const choices = (focus?.reveals || []).map((choice, index) => `<button class="core-reveal-choice" data-reveal-choice="${index}"><strong>${esc(choice.label)}</strong></button>`).join('');
  openModal(`<h3>What stood out?</h3>${choices ? `<div class="core-result-stack">${choices}</div>` : ''}<button class="secondary-btn core-other-btn" data-custom-reveal type="button">Something different</button><button class="secondary-btn core-sheet-cancel" data-close-modal type="button">Cancel</button>`, 'What stood out?');
}
function openCustomReveal() { openModal(`<h3>What did you notice?</h3><textarea class="core-textarea" id="customRevealText" rows="3" placeholder="One sentence is enough."></textarea><button class="primary-btn core-primary" data-save-custom-reveal type="button">Use that</button><button class="secondary-btn core-sheet-cancel" data-close-modal type="button">Cancel</button>`, 'What did you notice?'); }
function moveFromResult(kind, result) {
  const [, project] = selectedPair(); if (!project || !result) return;
  project.history.push({ at: Date.now(), outcome: kind, learned: result.learned, from: project.currentFocus }); project.currentFocus = result.next || project.currentFocus; project.customReveal = null;
  saveState(); closeModal(); render(); window.scrollTo({ top: 0, behavior: 'auto' });
}
function commitCustomReveal(note) { const [, project] = selectedPair(); if (!project) return; project.history.push({ at: Date.now(), outcome: 'revealed', learned: note, from: project.currentFocus }); project.customReveal = note; saveState(); closeModal(); render(); window.scrollTo({ top: 0, behavior: 'auto' }); }

root.addEventListener('click', (event) => {
  const projectButton = event.target.closest('[data-select-project]'); if (projectButton) { state.selected = projectButton.dataset.selectProject; saveState(); render(); window.scrollTo({ top: 0, behavior: 'auto' }); return; }
  if (event.target.closest('[data-back-projects]')) { state.selected = null; saveState(); render(); window.scrollTo({ top: 0, behavior: 'auto' }); return; }
  if (event.target.closest('[data-reset-project]')) { const [fixture] = selectedPair(); if (!fixture) return; state.projects[fixture.id] = freshProject(); saveState(); render(); return; }
  const stageButton = event.target.closest('[data-stage]'); if (stageButton) { const [, project] = selectedPair(); project.stage = stageButton.dataset.stage; project.need = null; project.currentFocus = null; saveState(); render(); return; }
  const needButton = event.target.closest('[data-need]'); if (needButton) { const [fixture, project] = selectedPair(), stage = stageFor(fixture, project), need = stage?.needs.find((item) => item.id === needButton.dataset.need); if (!need) return; project.need = need.id; project.currentFocus = need.focus; project.history = []; project.customReveal = null; saveState(); render(); window.scrollTo({ top: 0, behavior: 'auto' }); return; }
  if (event.target.closest('[data-tried]')) openEvaluation();
});

modalRoot.addEventListener('click', (event) => {
  if (event.target.matches('[data-modal-backdrop], [data-close-modal]')) return closeModal();
  const outcome = event.target.closest('[data-outcome]')?.dataset.outcome;
  if (outcome) { const [fixture, project] = selectedPair(), focus = focusFor(fixture, project); if (!focus) return; if (outcome === 'helped') return moveFromResult('helped', focus.helped); if (outcome === 'didnt') return moveFromResult('didnt', focus.didnt); if (outcome === 'revealed') return openRevealChoices(); }
  const revealButton = event.target.closest('[data-reveal-choice]'); if (revealButton) { const [fixture, project] = selectedPair(), focus = focusFor(fixture, project), choice = focus?.reveals?.[Number(revealButton.dataset.revealChoice)]; if (choice) return moveFromResult('revealed', choice); }
  if (event.target.closest('[data-custom-reveal]')) return openCustomReveal();
  if (event.target.closest('[data-save-custom-reveal]')) { const field = document.getElementById('customRevealText'), note = field?.value.trim(); if (!note) return field?.focus(); return commitCustomReveal(note); }
});

render();
