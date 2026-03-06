const COURSE_ID = "front-desk-checkin-v1";

const state = {
  course: null,
  user: null,
  answers: {},
  startedAt: null,
  timerId: null,
  attemptNumber: 1,
  shuffled: false,
  currentQuestions: []
};

const $ = (id) => document.getElementById(id);

function formatDuration(seconds) {
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

async function getAuthUser() {
  try {
    const res = await fetch("/.auth/me", { credentials: "include" });
    if (!res.ok) return null;
    const data = await res.json();
    const principal = Array.isArray(data?.clientPrincipal) ? data.clientPrincipal[0] : data?.clientPrincipal;
    if (!principal) return null;

    return {
      userId: principal.userId || "",
      displayName: principal.userDetails || "Signed In User",
      email: principal.userDetails || "Signed In User"
    };
  } catch {
    return null;
  }
}

function updateUserUI() {
  $("userName").textContent = state.user?.displayName || "Not signed in";
}

function shuffleArray(items) {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

async function loadCourse() {
  const res = await fetch(`/api/getCourse?courseId=${encodeURIComponent(COURSE_ID)}`, {
    credentials: "include"
  });
  if (!res.ok) {
    throw new Error("Failed to load course");
  }

  const data = await res.json();
  state.course = data.course;
  state.attemptNumber = data.nextAttemptNumber || 1;
  state.shuffled = !!data.shouldShuffle;
  state.currentQuestions = data.shouldShuffle
    ? shuffleArray(state.course.questions)
    : [...state.course.questions];

  $("currentCourseTitle").textContent = state.course.title;
  $("currentCourseSummary").textContent = state.course.summary;
  $("statusCourseName").textContent = state.course.title;
  $("trainingCourseTitle").textContent = state.course.title;
  $("trainingCourseDescription").textContent = state.course.description;
  $("questionCount").textContent = state.course.questions.length;
  $("pointsPerQuestion").textContent = state.course.pointsPerQuestion;
  $("passScore").textContent = `${state.course.passScore}%`;
  $("attemptNumber").textContent = state.attemptNumber;
  $("pillQuestions").textContent = `${state.course.questions.length} Questions`;
  $("pillPoints").textContent = `${state.course.pointsPerQuestion} Points Each`;
  $("pillPassing").textContent = `Pass at ${state.course.passScore}%`;
  $("moduleType").textContent = state.course.typeLabel || "Assessment";

  const infoList = $("infoList");
  infoList.innerHTML = `
    <li>Passing score is ${state.course.passScore}% or higher</li>
    <li>Each question is worth ${state.course.pointsPerQuestion} points</li>
    <li>Questions reorder on retake</li>
    <li>Third failed attempt triggers admin notification</li>
  `;
}

function startTimer() {
  state.startedAt = new Date();
  clearInterval(state.timerId);
  state.timerId = setInterval(() => {
    const elapsed = Math.max(0, Math.floor((Date.now() - state.startedAt.getTime()) / 1000));
    $("timer").textContent = formatDuration(elapsed);
  }, 1000);
}

function stopTimer() {
  clearInterval(state.timerId);
}

function renderCourseCatalog() {
  // Placeholder for future dynamic catalog loading
}

function renderQuestions() {
  const form = $("quizForm");
  form.innerHTML = "";

  state.currentQuestions.forEach((q, index) => {
    const question = document.createElement("section");
    question.className = "question";

    const optionsHtml = q.options.map((opt) => `
      <label class="option">
        <input type="radio" name="${escapeHtml(q.id)}" value="${escapeHtml(opt.id)}" />
        <span>${escapeHtml(opt.text)}</span>
      </label>
    `).join("");

    question.innerHTML = `
      <h3>${index + 1}. ${escapeHtml(q.prompt)}</h3>
      <div class="options">${optionsHtml}</div>
    `;

    form.appendChild(question);
  });

  const actions = document.createElement("div");
  actions.className = "form-actions";
  actions.innerHTML = `
    <button class="btn btn-primary" type="submit">Submit Assessment</button>
    <button class="btn btn-secondary" type="button" id="cancelQuizBtn">Cancel</button>
  `;
  form.appendChild(actions);

  const cancelBtn = document.getElementById("cancelQuizBtn");
  cancelBtn.addEventListener("click", resetToIntro);
}

function resetToIntro() {
  stopTimer();
  $("quizForm").classList.add("hidden");
  $("resultsSection").classList.add("hidden");
  $("introCard").classList.remove("hidden");
  $("timer").textContent = "00:00";
}

function renderResults(data) {
  const card = $("resultCard");
  $("resultsSection").classList.remove("hidden");

  const reviewHtml = (data.incorrect || []).map((item) => `
    <li>
      <strong>${escapeHtml(item.questionText)}</strong><br />
      Your answer: ${escapeHtml(item.selectedAnswerText || "No answer")}<br />
      Correct answer: ${escapeHtml(item.correctAnswerText)}<br />
      ${item.explanation ? `Explanation: ${escapeHtml(item.explanation)}` : ""}
    </li>
  `).join("");

  card.className = `result-card ${data.passed ? "pass" : "fail"}`;
  card.innerHTML = `
    <h3>${data.passed ? "Passed" : "Retake Required"}</h3>
    <p>${data.passed ? "Assessment completed successfully." : "A score of 90% or higher is required to pass."}</p>

    <div class="result-grid">
      <div class="result-stat">
        <span class="label">Score</span>
        <span class="value">${data.score}%</span>
      </div>
      <div class="result-stat">
        <span class="label">Attempt</span>
        <span class="value">${data.attemptNumber}</span>
      </div>
      <div class="result-stat">
        <span class="label">Time Spent</span>
        <span class="value">${formatDuration(data.durationSeconds || 0)}</span>
      </div>
      <div class="result-stat">
        <span class="label">Average Score</span>
        <span class="value">${data.averageScore ?? data.score}%</span>
      </div>
    </div>

    ${!data.passed ? `
      <h4>Incorrect Answers</h4>
      <ol class="review-list">${reviewHtml}</ol>
    ` : ""}

    <div class="result-actions">
      ${!data.passed ? `<button class="btn btn-primary" type="button" id="retakeBtn">Retake Assessment</button>` : ""}
      <a class="btn btn-secondary" href="#catalog">Back to Catalog</a>
    </div>
  `;

  if (!data.passed) {
    document.getElementById("retakeBtn").addEventListener("click", async () => {
      $("resultsSection").classList.add("hidden");
      $("introCard").classList.remove("hidden");
      await loadCourse();
    });
  }
}

async function submitAssessment(event) {
  event.preventDefault();
  stopTimer();

  const form = new FormData(event.target);
  const answers = {};
  for (const q of state.currentQuestions) {
    answers[q.id] = form.get(q.id) || null;
  }

  const payload = {
    courseId: state.course.courseId,
    answers,
    startedAt: state.startedAt?.toISOString() || new Date().toISOString(),
    submittedAt: new Date().toISOString(),
    shuffled: state.shuffled
  };

  const res = await fetch("/api/submitQuiz", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: "Submission failed" }));
    alert(error.error || "Submission failed");
    return;
  }

  const data = await res.json();
  $("attemptNumber").textContent = data.nextAttemptNumber || data.attemptNumber;
  renderResults(data);
}

function wireAuthButtons() {
  $("loginBtn").addEventListener("click", () => {
    window.location.href = "/.auth/login/aad";
  });

  $("logoutBtn").addEventListener("click", () => {
    window.location.href = "/.auth/logout";
  });
}

async function boot() {
  wireAuthButtons();

  state.user = await getAuthUser();
  updateUserUI();

  $("quizForm").addEventListener("submit", submitAssessment);

  $("startBtn").addEventListener("click", () => {
    if (!state.user) {
      alert("Please sign in with your UnityMSK account before starting the assessment.");
      return;
    }
    $("introCard").classList.add("hidden");
    $("quizForm").classList.remove("hidden");
    $("resultsSection").classList.add("hidden");
    renderQuestions();
    startTimer();
  });

  await loadCourse();
  renderCourseCatalog();
}

window.addEventListener("DOMContentLoaded", () => {
  boot().catch((err) => {
    console.error(err);
    alert("The training portal could not load. Check your API deployment and settings.");
  });
});
