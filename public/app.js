const state = {
  authUser: null,
  quiz: null,
  attemptNumber: 1,
  shouldShuffle: false,
  startedAt: null,
  timerId: null,
  signedIn: false,
  shuffledQuestions: []
};

const $ = (id) => document.getElementById(id);

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function formatSeconds(total) {
  const minutes = Math.floor(total / 60).toString().padStart(2, '0');
  const seconds = Math.floor(total % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

function shuffleArray(items) {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

async function getAuthUser() {
  const res = await fetch('/.auth/me');
  if (!res.ok) return null;
  const data = await res.json();
  return data?.clientPrincipal || null;
}

function updateAuthUi() {
  $('loginBtn').hidden = state.signedIn;
  $('logoutBtn').hidden = !state.signedIn;
  $('startBtn').disabled = !state.signedIn;
  $('startBtn').textContent = state.signedIn ? 'Start assessment' : 'Sign in to start';
  $('userName').textContent = state.authUser?.userDetails || 'Not signed in';
  $('userEmail').textContent = state.authUser?.userDetails || '—';
}

async function loadQuiz() {
  const res = await fetch('/api/getQuiz');
  if (!res.ok) {
    throw new Error('Unable to load quiz.');
  }

  const data = await res.json();
  state.quiz = data.quiz;
  state.attemptNumber = data.nextAttemptNumber || 1;
  state.shouldShuffle = !!data.shouldShuffle;
  state.shuffledQuestions = state.shouldShuffle ? shuffleArray(state.quiz.questions) : [...state.quiz.questions];

  $('quizTitle').textContent = data.quiz.title;
  $('questionCount').textContent = data.quiz.questionCount;
  $('attemptNumber').textContent = state.attemptNumber;
}

function startTimer() {
  state.startedAt = new Date();
  $('sessionStatus').textContent = 'In progress';
  $('timer').textContent = '00:00';

  clearInterval(state.timerId);
  state.timerId = setInterval(() => {
    const elapsedSeconds = Math.round((Date.now() - state.startedAt.getTime()) / 1000);
    $('timer').textContent = formatSeconds(elapsedSeconds);
  }, 1000);
}

function stopTimer() {
  clearInterval(state.timerId);
  state.timerId = null;
}

function renderQuiz() {
  const form = $('quizForm');
  const questions = state.shuffledQuestions;

  form.innerHTML = questions.map((question, index) => `
    <article class="question-block">
      <div class="question-index">Question ${index + 1}</div>
      <h3>${escapeHtml(question.prompt)}</h3>
      <div class="option-list">
        ${question.options.map((option) => `
          <label class="option-card">
            <input type="radio" name="${escapeHtml(question.id)}" value="${escapeHtml(option.id)}" required>
            <span>${escapeHtml(option.text)}</span>
          </label>
        `).join('')}
      </div>
    </article>
  `).join('') + `
    <div class="form-actions">
      <button type="submit" class="btn btn-primary">Submit assessment</button>
    </div>
  `;

  form.hidden = false;
}

function renderResults(data) {
  const resultCard = $('resultCard');
  $('quizForm').hidden = true;
  resultCard.hidden = false;
  $('sessionStatus').textContent = data.passed ? 'Passed' : 'Retake required';

  const missedHtml = (data.incorrect || []).map((item, idx) => `
    <li class="missed-item">
      <strong>${idx + 1}. ${escapeHtml(item.questionText)}</strong>
      <div>Your answer: <span class="bad">${escapeHtml(item.selectedAnswerText || 'No answer')}</span></div>
      <div>Correct answer: <span class="good">${escapeHtml(item.correctAnswerText)}</span></div>
      <p>${escapeHtml(item.explanation || '')}</p>
    </li>
  `).join('');

  resultCard.innerHTML = `
    <div class="result-banner ${data.passed ? 'passed' : 'failed'}">
      <div>
        <div class="eyebrow">${data.passed ? 'Completed' : 'Needs retake'}</div>
        <h3>${data.passed ? 'Assessment passed' : 'Score below 90. Retake required.'}</h3>
      </div>
      <div class="score-chip">${data.score}%</div>
    </div>

    <div class="pill-row">
      <span class="pill"><strong>Attempt</strong><span>${data.attemptNumber}</span></span>
      <span class="pill"><strong>Average</strong><span>${data.averageScore}%</span></span>
      <span class="pill"><strong>Duration</strong><span>${formatSeconds(data.durationSeconds)}</span></span>
      <span class="pill"><strong>Status</strong><span>${data.passed ? 'Pass' : 'Fail'}</span></span>
    </div>

    ${data.passed ? `
      <div class="callout success">Nice. This attempt met the required passing score.</div>
    ` : `
      <div class="callout danger">
        <strong>Incorrect answers were revealed below.</strong> Review them and start the retake when ready.
        ${data.thirdFailNotified ? '<div class="small-note">Third failed attempt notification was triggered for leadership review.</div>' : ''}
      </div>
      <ol class="missed-list">${missedHtml}</ol>
      <div class="form-actions">
        <button type="button" id="retakeBtn" class="btn btn-primary">Retake assessment</button>
      </div>
    `}
  `;

  const retakeBtn = $('retakeBtn');
  if (retakeBtn) {
    retakeBtn.addEventListener('click', async () => {
      resultCard.hidden = true;
      $('welcomeCard').hidden = true;
      await loadQuiz();
      renderQuiz();
      startTimer();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

async function submitQuiz(event) {
  event.preventDefault();
  stopTimer();

  const formData = new FormData(event.target);
  const answers = {};
  state.shuffledQuestions.forEach((question) => {
    answers[question.id] = formData.get(question.id);
  });

  const res = await fetch('/api/submitQuiz', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      answers,
      startedAt: state.startedAt?.toISOString(),
      submittedAt: new Date().toISOString(),
      shuffled: state.shouldShuffle
    })
  });

  const data = await res.json();
  if (!res.ok) {
    $('sessionStatus').textContent = 'Error';
    $('resultCard').hidden = false;
    $('resultCard').innerHTML = `<div class="callout danger">${escapeHtml(data.error || 'Something went wrong submitting the quiz.')}</div>`;
    return;
  }

  renderResults(data);
}

async function boot() {
  $('loginBtn').addEventListener('click', () => {
    window.location.href = '/.auth/login/aad';
  });

  $('logoutBtn').addEventListener('click', () => {
    window.location.href = '/.auth/logout';
  });

  $('startBtn').addEventListener('click', async () => {
    $('welcomeCard').hidden = true;
    $('resultCard').hidden = true;
    await loadQuiz();
    renderQuiz();
    startTimer();
  });

  $('quizForm').addEventListener('submit', submitQuiz);

  state.authUser = await getAuthUser();
  state.signedIn = !!state.authUser;
  updateAuthUi();

  if (state.signedIn) {
    try {
      await loadQuiz();
      $('sessionStatus').textContent = 'Ready to start';
    } catch (err) {
      $('welcomeCard').innerHTML = `<div class="callout danger">${escapeHtml(err.message)}</div>`;
    }
  }
}

boot();
