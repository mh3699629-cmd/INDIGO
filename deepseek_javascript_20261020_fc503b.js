/* ============================================================
   Learn Lingua — application
   - Hash routing (home / level / reading / progress / about)
   - Reading texts with comprehension questions
   - Instant feedback per question
   - Score tracking + localStorage progress
   - Audio via Web Speech API (no audio files needed)
   ============================================================ */

/* =================== CONTENT =================== */

const LEVELS = [
  { code: 'A1', name: 'Beginner',         desc: 'Simple everyday English' },
  { code: 'A2', name: 'Elementary',       desc: 'Basic conversations' },
  { code: 'B1', name: 'Intermediate',     desc: 'Real-life situations' },
  { code: 'B2', name: 'Upper-intermediate', desc: 'Complex topics' },
  { code: 'C1', name: 'Advanced',         desc: 'Nuanced, academic English' }
];

const TEXTS = {
  A1: [
    {
      id: 'a1-1',
      title: 'My Morning',
      paragraphs: [
        'I wake up at seven o\'clock. I brush my teeth and take a shower. Then I eat breakfast. I have bread, butter, and tea. At eight o\'clock, I go to work. I work in a small office. I like my job.',
        'In the evening, I come home at six. I cook dinner and read a book. I go to bed at ten o\'clock. I sleep for eight hours.'
      ],
      questions: [
        { q: 'What time does the person wake up?',
          options: ['Six o\'clock', 'Seven o\'clock', 'Eight o\'clock', 'Ten o\'clock'], a: 1 },
        { q: 'What does the person eat for breakfast?',
          options: ['Rice and eggs', 'Bread, butter, and tea', 'Fruit and coffee', 'Nothing'], a: 1 },
        { q: 'Where does the person work?',
          options: ['At home', 'In a small office', 'In a school', 'In a hospital'], a: 1 },
        { q: 'What time does the person come home?',
          options: ['Five o\'clock', 'Six o\'clock', 'Seven o\'clock', 'Eight o\'clock'], a: 1 },
        { q: 'How long does the person sleep?',
          options: ['Six hours', 'Seven hours', 'Eight hours', 'Ten hours'], a: 2 }
      ]
    },
    {
      id: 'a1-2',
      title: 'My Family',
      paragraphs: [
        'I have a small family. There are four people in my family: my father, my mother, my sister, and me. My father is a driver. My mother is a teacher. My sister is ten years old.',
        'We live in a small house. We have a dog. His name is Rocky. We are happy together.'
      ],
      questions: [
        { q: 'How many people are in the family?',
          options: ['Three', 'Four', 'Five', 'Six'], a: 1 },
        { q: 'What does the father do?',
          options: ['He is a teacher', 'He is a driver', 'He is a doctor', 'He is a farmer'], a: 1 },
        { q: 'How old is the sister?',
          options: ['Five years old', 'Eight years old', 'Ten years old', 'Twelve years old'], a: 2 },
        { q: 'What is the dog\'s name?',
          options: ['Tommy', 'Rocky', 'Rex', 'Buddy'], a: 1 }
      ]
    }
  ],

  A2: [
    {
      id: 'a2-1',
      title: 'A Weekend Trip',
      paragraphs: [
        'Last weekend, my friends and I went to the mountains. We left on Saturday morning at six o\'clock. The bus trip took three hours. When we arrived, the weather was cold but sunny.',
        'We walked for two hours and took many photos. In the evening, we stayed in a small hotel and ate warm soup. On Sunday, we came back home. We were tired, but very happy.'
      ],
      questions: [
        { q: 'When did they leave for the mountains?',
          options: ['Friday evening', 'Saturday morning', 'Saturday evening', 'Sunday morning'], a: 1 },
        { q: 'How long was the bus trip?',
          options: ['One hour', 'Two hours', 'Three hours', 'Four hours'], a: 2 },
        { q: 'What was the weather like?',
          options: ['Cold and sunny', 'Hot and dry', 'Rainy and windy', 'Snowy'], a: 0 },
        { q: 'Where did they stay in the evening?',
          options: ['At a friend\'s house', 'In a tent', 'In a small hotel', 'They went home'], a: 2 },
        { q: 'How did they feel on Sunday?',
          options: ['Angry', 'Tired but happy', 'Sad', 'Bored'], a: 1 }
      ]
    },
    {
      id: 'a2-2',
      title: 'At the Supermarket',
      paragraphs: [
        'Yesterday I went to the supermarket to buy food. I needed milk, eggs, bread, and vegetables. The supermarket was very big and I could not find the milk.',
        'A shop assistant helped me. She showed me where everything was. When I went to pay, there was a long queue. I waited for fifteen minutes. I paid by card and went home.'
      ],
      questions: [
        { q: 'Why did the person go to the supermarket?',
          options: ['To buy clothes', 'To buy food', 'To meet a friend', 'To return something'], a: 1 },
        { q: 'What was NOT on the shopping list?',
          options: ['Milk', 'Eggs', 'Chocolate', 'Bread'], a: 2 },
        { q: 'Who helped the person find the milk?',
          options: ['A security guard', 'A shop assistant', 'Another customer', 'No one'], a: 1 },
        { q: 'How long did the person wait in the queue?',
          options: ['Five minutes', 'Ten minutes', 'Fifteen minutes', 'Thirty minutes'], a: 2 }
      ]
    }
  ],

  B1: [
    {
      id: 'b1-1',
      title: 'Working from Home',
      paragraphs: [
        'In recent years, working from home has become common for many people. It offers flexibility and saves time on commuting. However, it also brings challenges. Many remote workers say they find it difficult to separate work from personal life.',
        'Some companies now offer a hybrid model, where employees work from the office two or three days a week and stay home on other days. This balance seems popular with most employees, as it allows both focus and social contact.',
        'However, experts warn that remote work is not for everyone. People who need structure and social interaction may struggle with long periods alone at home.'
      ],
      questions: [
        { q: 'What is one benefit of working from home mentioned in the text?',
          options: ['Higher salary', 'Less commuting time', 'More holidays', 'Free lunch'], a: 1 },
        { q: 'What challenge do many remote workers face?',
          options: ['Loud coworkers', 'Missing deadlines', 'Separation of work and personal life', 'Poor internet'], a: 2 },
        { q: 'What is a "hybrid model" in the text?',
          options: ['Working only from home', 'Working only from office', 'Mix of home and office work', 'Working for two companies'], a: 2 },
        { q: 'Why is the hybrid model popular?',
          options: ['It saves more money', 'It allows focus and social contact', 'It requires no manager', 'It gives more holidays'], a: 1 },
        { q: 'Who may struggle with remote work?',
          options: ['People who like structure and social contact', 'People who live alone', 'People with fast internet', 'Young employees'], a: 0 }
      ]
    },
    {
      id: 'b1-2',
      title: 'A Letter to a Friend',
      paragraphs: [
        'Dear Sam,',
        'How are you? I hope everything is going well with your new job. I wanted to tell you about my trip to Goa last month. I finally managed to take a week off work, and I spent seven days by the beach.',
        'I tried surfing for the first time — I was terrible at it, but I loved every minute. The food was amazing, especially the fresh fish. I also met some interesting people from different countries, and we have stayed in touch.',
        'I would love to hear your news. Write back when you have time.',
        'Best wishes,',
        'Priya'
      ],
      questions: [
        { q: 'Who is the letter from?',
          options: ['Sam', 'Priya', 'A stranger', 'A coworker'], a: 1 },
        { q: 'Where did Priya go for her holiday?',
          options: ['Kerala', 'Goa', 'Mumbai', 'Delhi'], a: 1 },
        { q: 'How long was the trip?',
          options: ['Three days', 'Five days', 'Seven days', 'Two weeks'], a: 2 },
        { q: 'What did Priya try for the first time?',
          options: ['Scuba diving', 'Surfing', 'Cooking fish', 'Sailing'], a: 1 },
        { q: 'How does Priya feel about her trip?',
          options: ['Disappointed', 'Bored', 'Enthusiastic', 'Angry'], a: 2 }
      ]
    }
  ],

  B2: [
    {
      id: 'b2-1',
      title: 'The Future of Work',
      paragraphs: [
        'Automation and artificial intelligence are reshaping the labour market at an unprecedented pace. While some predict mass unemployment, others argue that new technologies will create new types of jobs we cannot yet imagine.',
        'Historically, technological change has led to the disappearance of certain occupations, but it has also generated entirely new industries. The key difference today is the speed of change. What once took decades now happens within a few years, giving workers less time to adapt.',
        'Education systems are struggling to keep up. Many experts argue that schools should focus less on memorising facts and more on developing adaptable skills such as critical thinking, creativity, and emotional intelligence.',
        'Governments, meanwhile, face pressure to introduce new social protections. Universal basic income is one proposal gaining traction, though it remains controversial.'
      ],
      questions: [
        { q: 'What does the author say about new technologies?',
          options: ['They will destroy all jobs', 'They may create new types of jobs', 'They will not change anything', 'They will only affect farming'], a: 1 },
        { q: 'What is the key difference between past and current technological change?',
          options: ['The cost', 'The speed of change', 'The location', 'The age of workers'], a: 1 },
        { q: 'What skill does the author suggest schools should focus on?',
          options: ['Memorisation', 'Critical thinking', 'Handwriting', 'Athletics'], a: 1 },
        { q: 'What is universal basic income according to the text?',
          options: ['A popular job', 'A controversial proposal', 'A school subject', 'A type of tax'], a: 1 },
        { q: 'What is the overall tone of the passage?',
          options: ['Panic', 'Balanced analysis', 'Pure optimism', 'Humor'], a: 1 }
      ]
    },
    {
      id: 'b2-2',
      title: 'Climate and Cities',
      paragraphs: [
        'Urban areas are particularly vulnerable to the effects of climate change. As temperatures rise, city dwellers face increased risks from heatwaves, flooding, and poor air quality. Concrete surfaces absorb and retain heat, creating what scientists call the "urban heat island" effect.',
        'Some cities have begun implementing green infrastructure to counter these problems. Trees, green roofs, and parks can reduce temperatures significantly and improve mental well-being. In Singapore, for example, the government has integrated green spaces into high-rise buildings for decades.',
        'Critics point out that green infrastructure alone cannot solve the climate crisis. They argue that deeper structural changes — particularly in transportation and energy — are essential. Still, they acknowledge that local actions remain an important piece of the larger puzzle.'
      ],
      questions: [
        { q: 'What does "urban heat island" effect refer to?',
          options: ['Island cities becoming hotter', 'Cities absorbing and retaining heat', 'Islands with high temperatures', 'Artificial heat from factories'], a: 1 },
        { q: 'What solution does the text mention for reducing heat?',
          options: ['More concrete', 'Green infrastructure', 'Building taller towers', 'Closing streets'], a: 1 },
        { q: 'Which country is used as an example of green building integration?',
          options: ['Japan', 'Singapore', 'India', 'Germany'], a: 1 },
        { q: 'What do critics say about green infrastructure?',
          options: ['It is enough on its own', 'It cannot solve the crisis alone', 'It is a waste of money', 'It causes more pollution'], a: 1 },
        { q: 'What is the author\'s view on local actions?',
          options: ['Useless', 'A part of the solution', 'The only solution', 'Harmful'], a: 1 }
      ]
    }
  ],

  C1: [
    {
      id: 'c1-1',
      title: 'The Paradox of Choice',
      paragraphs: [
        'For decades, the assumption that more choice leads to greater satisfaction dominated economic thought. The expansion of options — from supermarkets to streaming platforms — was celebrated as a marker of prosperity and freedom. Yet psychological research has begun to challenge this view with striking results.',
        'The psychologist Barry Schwartz famously argued that excessive choice can produce anxiety, regret, and even paralysis. When faced with too many alternatives, individuals often postpone decisions, second-guess themselves after choosing, and remain dissatisfied with what they selected — constantly wondering whether another option might have been better.',
        'Schwartz distinguished between "maximisers", who seek the very best option in every situation, and "satisficers", who accept the first option that meets their standards. Paradoxically, maximisers often report lower levels of happiness than satisficers, despite investing more effort in decision-making.',
        'The implications extend beyond consumer choices. The instinct to maximise can shape how people approach relationships, careers, and even leisure — often at considerable emotional cost. The solution, Schwartz suggests, is not to eliminate choice, but to recalibrate our expectations about what "good enough" can mean.'
      ],
      questions: [
        { q: 'What was the dominant economic belief regarding choice?',
          options: ['Choice has no effect on happiness', 'More choice leads to more satisfaction', 'Choice should be limited', 'Choice is irrelevant'], a: 1 },
        { q: 'According to the passage, what is a consequence of too much choice?',
          options: ['Faster decisions', 'Greater satisfaction', 'Anxiety and paralysis', 'Higher income'], a: 2 },
        { q: 'How does the passage define "maximisers"?',
          options: ['People who accept the first good option', 'People who seek the very best option', 'People who avoid choice', 'People who delegate decisions'], a: 1 },
        { q: 'What paradox is described in the third paragraph?',
          options: ['Maximisers are happier than satisficers', 'Maximisers invest more effort but are less happy', 'Satisficers make worse decisions', 'Effort guarantees happiness'], a: 1 },
        { q: 'What solution does Schwartz suggest?',
          options: ['Eliminate all choices', 'Add more choices', 'Recalibrate expectations', 'Avoid decision-making'], a: 2 }
      ]
    }
  ]
};

/* =================== HELPERS =================== */

const $ = (s, ctx = document) => ctx.querySelector(s);
const $$ = (s, ctx = document) => [...ctx.querySelectorAll(s)];

const appEl = $('#app');

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/* =================== PROGRESS =================== */

const STORAGE_KEY = 'learnlingua-progress-v1';

function getProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}

function saveResult(textId, score, total) {
  const p = getProgress();
  const existing = p[textId];
  if (!existing || score > existing.score) {
    p[textId] = { score, total, done: true };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  }
}

function getLevelProgress(levelCode) {
  const texts = TEXTS[levelCode] || [];
  const p = getProgress();
  const done = texts.filter(t => p[t.id]).length;
  return { done, total: texts.length };
}

/* =================== AUDIO =================== */

let currentUtterance = null;

function speak(text) {
  if (!('speechSynthesis' in window)) {
    alert('Your browser does not support audio playback.');
    return;
  }
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'en-US';
  u.rate = 0.92;
  u.pitch = 1;
  currentUtterance = u;
  window.speechSynthesis.speak(u);
}

function stopSpeaking() {
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
}

/* =================== ROUTER =================== */

function parseRoute() {
  const hash = location.hash.replace(/^#\/?/, '') || 'home';
  const parts = hash.split('/').filter(Boolean);
  return {
    view: parts[0] || 'home',
    level: parts[1] || null,
    textId: parts[2] || null
  };
}

function navigate(path) {
  location.hash = '#/' + path;
}

function handleRoute() {
  stopSpeaking();
  const route = parseRoute();
  window.scrollTo({ top: 0, behavior: 'instant' });

  if (route.view === 'home') return renderHome();
  if (route.view === 'level' && route.level) return renderLevel(route.level);
  if (route.view === 'text' && route.level && route.textId) return renderText(route.level, route.textId);
  if (route.view === 'progress') return renderProgress();
  if (route.view === 'about') return renderAbout();

  renderHome();
}

/* =================== VIEWS =================== */

function renderHome() {
  const all = Object.values(TEXTS).flat();
  const p = getProgress();
  const completed = all.filter(t => p[t.id]).length;

  appEl.innerHTML = `
    <div class="container">
      <section class="hero">
        <h1>Read. Understand. <em>Improve.</em></h1>
        <p>Practice English reading with level-based texts and comprehension questions. Free, no sign-up, no ads.</p>
      </section>

      <p class="section-label">Choose your level · ${completed} / ${all.length} texts completed</p>
      <div class="level-grid">
        ${LEVELS.map(lv => {
          const prog = getLevelProgress(lv.code);
          return `
            <button class="level-card" data-level="${lv.code}">
              <span class="level-card__code">${lv.code}</span>
              <div class="level-card__name">${lv.name}</div>
              <div class="level-card__desc">${lv.desc}</div>
              <div class="level-card__progress">${prog.done} / ${prog.total} done</div>
            </button>
          `;
        }).join('')}
      </div>
    </div>
  `;

  $$('.level-card').forEach(card => {
    card.addEventListener('click', () => navigate(`level/${card.dataset.level}`));
  });
}

function renderLevel(levelCode) {
  const level = LEVELS.find(l => l.code === levelCode);
  const texts = TEXTS[levelCode] || [];

  if (!level) return renderHome();

  const p = getProgress();

  appEl.innerHTML = `
    <div class="container">
      <a href="#/" class="back-link">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        All levels
      </a>
      <h1 class="page-title">${level.code} — ${level.name}</h1>
      <p class="page-subtitle">${level.desc} · ${texts.length} text${texts.length !== 1 ? 's' : ''}</p>

      <div class="text-list">
        ${texts.map(t => {
          const done = p[t.id];
          return `
            <button class="text-item" data-text="${t.id}">
              <div class="text-item__info">
                <div class="text-item__title">${escapeHtml(t.title)}</div>
                <div class="text-item__meta">${t.questions.length} questions</div>
              </div>
              <span class="text-item__status ${done ? 'done' : 'new'}">
                ${done ? `${done.score}/${done.total} ✓` : 'New'}
              </span>
              <svg class="text-item__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          `;
        }).join('')}
      </div>
    </div>
  `;

  $$('.text-item').forEach(btn => {
    btn.addEventListener('click', () => navigate(`text/${levelCode}/${btn.dataset.text}`));
  });
}

function renderText(levelCode, textId) {
  const level = LEVELS.find(l => l.code === levelCode);
  const text = (TEXTS[levelCode] || []).find(t => t.id === textId);

  if (!level || !text) return renderHome();

  appEl.innerHTML = `
    <div class="container">
      <a href="#/level/${levelCode}" class="back-link">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        ${level.code} texts
      </a>

      <div class="reading-header">
        <span class="reading-badge">${level.code} · ${level.name}</span>
        <h1 class="reading-title">${escapeHtml(text.title)}</h1>
      </div>

      <div class="audio-bar">
        <button class="audio-btn" id="listenBtn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H2v6h4l5 4V5z"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
          Listen
        </button>
        <button class="audio-btn" id="stopBtn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>
          Stop
        </button>
      </div>

      <div class="reading-text">
        ${text.paragraphs.map(p => `<p>${escapeHtml(p)}</p>`).join('')}
      </div>

      <div class="questions-header">
        <h2>Questions</h2>
        <div class="score-tracker" id="scoreTracker">0 / ${text.questions.length} correct</div>
      </div>

      <div id="questionsBox"></div>
      <div id="resultBanner" class="result-banner" hidden></div>
    </div>
  `;

  // Audio
  const fullText = text.paragraphs.join(' ');
  $('#listenBtn').addEventListener('click', () => speak(fullText));
  $('#stopBtn').addEventListener('click', stopSpeaking);

  // Render questions
  renderQuestions(text);
}

function renderQuestions(text) {
  const box = $('#questionsBox');
  const total = text.questions.length;
  let answered = 0;
  let correct = 0;

  const letters = ['A', 'B', 'C', 'D'];

  box.innerHTML = text.questions.map((q, qi) => `
    <div class="question-card" data-qi="${qi}">
      <div class="question-title">${qi + 1}. ${escapeHtml(q.q)}</div>
      <div class="options" data-qi="${qi}">
        ${q.options.map((opt, oi) => `
          <button class="option" data-qi="${qi}" data-oi="${oi}">
            <span class="option__letter">${letters[oi]}</span>
            <span>${escapeHtml(opt)}</span>
          </button>
        `).join('')}
      </div>
    </div>
  `).join('');

  box.addEventListener('click', (e) => {
    const btn = e.target.closest('.option');
    if (!btn) return;
    const qi = parseInt(btn.dataset.qi);
    const oi = parseInt(btn.dataset.oi);
    const q = text.questions[qi];

    // Already answered?
    const group = btn.parentElement;
    if (group.dataset.answered === 'true') return;
    group.dataset.answered = 'true';

    // Disable all options in this question
    const allOpts = group.querySelectorAll('.option');
    allOpts.forEach(o => (o.disabled = true));

    const isCorrect = oi === q.a;

    if (isCorrect) {
      btn.classList.add('correct');
      correct++;
    } else {
      btn.classList.add('wrong');
      // Reveal correct answer
      const correctBtn = group.querySelector(`[data-oi="${q.a}"]`);
      if (correctBtn) correctBtn.classList.add('reveal');
    }

    answered++;

    // Update tracker
    const tracker = $('#scoreTracker');
    if (tracker) tracker.innerHTML = `<strong>${correct}</strong> / ${total} correct`;

    // All answered? Show result
    if (answered === total) {
      showResult(text, correct, total);
    }
  });
}

function showResult(text, score, total) {
  saveResult(text.id, score, total);

  const banner = $('#resultBanner');
  if (!banner) return;

  const pct = score / total;
  let title, message;
  if (pct === 1) {
    title = 'Perfect score!';
    message = `You got all ${total} questions correct. Excellent work.`;
  } else if (pct >= 0.8) {
    title = 'Very good!';
    message = `You got ${score} out of ${total} correct. Almost perfect.`;
  } else if (pct >= 0.6) {
    title = 'Good effort.';
    message = `You got ${score} out of ${total} correct. Read the text again to improve.`;
  } else {
    title = 'Keep practicing.';
    message = `You got ${score} out of ${total} correct. Try reading more slowly.`;
  }

  banner.hidden = false;
  banner.innerHTML = `
    <h3>${title}</h3>
    <p>${message}</p>
    <div class="result-actions">
      <button class="btn btn--primary" id="nextBtn">Choose another text</button>
      <button class="btn btn--ghost" id="retryBtn">Read again</button>
    </div>
  `;

  $('#nextBtn').addEventListener('click', () => {
    const route = parseRoute();
    navigate(`level/${route.level}`);
  });
  $('#retryBtn').addEventListener('click', () => {
    const route = parseRoute();
    renderText(route.level, route.textId);
  });

  banner.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function renderProgress() {
  const p = getProgress();
  const all = Object.values(TEXTS).flat();
  const completed = all.filter(t => p[t.id]).length;
  const totalQuestions = all.reduce((s, t) => s + t.questions.length, 0);
  const correctQuestions = all.reduce((s, t) => {
    const r = p[t.id];
    return s + (r ? r.score : 0);
  }, 0);

  appEl.innerHTML = `
    <div class="container">
      <h1 class="page-title">My progress</h1>
      <p class="page-subtitle">Saved in this browser. No account needed.</p>

      <div class="info-card">
        <h2>Overview</h2>
        <p><strong>${completed}</strong> of <strong>${all.length}</strong> texts completed</p>
        <p><strong>${correctQuestions}</strong> of <strong>${totalQuestions}</strong> questions answered correctly</p>
      </div>

      <p class="section-label">By level</p>
      <div class="progress-grid">
        ${LEVELS.map(lv => {
          const prog = getLevelProgress(lv.code);
          const pct = prog.total ? Math.round((prog.done / prog.total) * 100) : 0;
          return `
            <div class="progress-row">
              <div class="progress-row__name">${lv.code} — ${lv.name}</div>
              <div class="progress-row__bar"><div class="progress-row__fill" style="width:${pct}%"></div></div>
              <div class="progress-row__stat">${prog.done}/${prog.total}</div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

function renderAbout() {
  appEl.innerHTML = `
    <div class="container">
      <h1 class="page-title">About Learn Lingua</h1>
      <p class="page-subtitle">Free English reading practice for everyone.</p>

      <div class="info-card">
        <h2>What is this site?</h2>
        <p>Learn Lingua is a free reading-comprehension practice platform. Each text is written for a specific CEFR level, followed by multiple-choice questions with instant feedback.</p>
      </div>

      <div class="info-card">
        <h2>Why reading?</h2>
        <p>Reading is the fastest way to build vocabulary and understand grammar in real context. Comprehension questions make sure you actually understood what you read — not just skimming.</p>
      </div>

      <div class="info-card">
        <h2>Levels explained</h2>
        <ul>
          <li><strong>A1 – A2 (Beginner):</strong> Simple sentences, everyday topics, basic vocabulary.</li>
          <li><strong>B1 – B2 (Intermediate):</strong> Real-life situations, longer paragraphs, some abstract ideas.</li>
          <li><strong>C1 (Advanced):</strong> Complex arguments, nuanced language, academic tone.</li>
        </ul>
      </div>

      <div class="info-card">
        <h2>Privacy</h2>
        <p>Your progress is stored locally in your browser. Nothing is sent to any server. No tracking, no accounts, no ads.</p>
      </div>
    </div>
  `;
}

/* =================== INIT =================== */

function init() {
  // Set current year in footer
  const y = $('#year');
  if (y) y.textContent = new Date().getFullYear();

  // Route handling
  window.addEventListener('hashchange', handleRoute);
  handleRoute();

  // Header nav — use data-nav for consistent navigation
  $$('[data-nav]').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const target = a.dataset.nav;
      if (target === 'home') navigate('');
      else navigate(target);
    });
  });
}

document.addEventListener('DOMContentLoaded', init);