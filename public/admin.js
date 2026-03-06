const $ = (id) => document.getElementById(id);

function formatSeconds(total) {
  if (!Number.isFinite(total)) return '—';
  const minutes = Math.floor(total / 60);
  const seconds = Math.floor(total % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

function setAuthUi(signedIn) {
  $('loginBtn').hidden = signedIn;
  $('logoutBtn').hidden = !signedIn;
}

async function getAuthUser() {
  const res = await fetch('/.auth/me');
  if (!res.ok) return null;
  const data = await res.json();
  return data?.clientPrincipal || null;
}

function renderMetrics(metrics) {
  $('mUsers').textContent = metrics.totalUsers;
  $('mAttempts').textContent = metrics.totalAttempts;
  $('mPassRate').textContent = `${metrics.passRate}%`;
  $('mAvgScore').textContent = `${metrics.averageScore}%`;
  $('mAvgAttempts').textContent = metrics.averageAttemptsPerUser;
  $('mAvgDuration').textContent = formatSeconds(metrics.averageDurationSeconds);
}

function renderUsers(users) {
  const tbody = document.querySelector('#usersTable tbody');
  tbody.innerHTML = users.map((user) => `
    <tr>
      <td>${user.displayName}</td>
      <td>${user.email}</td>
      <td>${user.attempts}</td>
      <td>${user.averageScore}%</td>
      <td>${user.latestScore}%</td>
      <td>${user.bestScore}%</td>
      <td><span class="status-pill ${user.passedEver ? 'ok' : 'warn'}">${user.passedEver ? 'Yes' : 'No'}</span></td>
      <td>${formatSeconds(user.latestDurationSeconds)}</td>
      <td><span class="status-pill ${user.thirdFailRisk ? 'danger' : 'ok'}">${user.thirdFailRisk ? '3+ fails' : 'Clear'}</span></td>
    </tr>
  `).join('');
}

function renderAttempts(attempts) {
  const tbody = document.querySelector('#attemptsTable tbody');
  tbody.innerHTML = attempts.map((attempt) => `
    <tr>
      <td>${new Date(attempt.submittedAt).toLocaleString()}</td>
      <td>${attempt.displayName}</td>
      <td>${attempt.email}</td>
      <td>${attempt.attemptNumber}</td>
      <td>${attempt.score}%</td>
      <td><span class="status-pill ${attempt.passed ? 'ok' : 'warn'}">${attempt.passed ? 'Pass' : 'Fail'}</span></td>
      <td>${formatSeconds(Number(attempt.durationSeconds || 0))}</td>
      <td>${attempt.shuffled ? 'Yes' : 'No'}</td>
    </tr>
  `).join('');
}

async function loadAdminReport() {
  $('adminStatus').textContent = 'Loading report...';
  const res = await fetch('/api/getAdminReport');
  const data = await res.json();

  if (!res.ok) {
    $('adminStatus').textContent = data.error || 'Unable to load admin report.';
    return;
  }

  $('adminStatus').textContent = `Loaded ${data.metrics.quizTitle}.`;
  renderMetrics(data.metrics);
  renderUsers(data.users);
  renderAttempts(data.attempts);
}

async function boot() {
  $('loginBtn').addEventListener('click', () => {
    window.location.href = '/.auth/login/aad';
  });
  $('logoutBtn').addEventListener('click', () => {
    window.location.href = '/.auth/logout';
  });
  $('refreshBtn').addEventListener('click', loadAdminReport);

  const user = await getAuthUser();
  const signedIn = !!user;
  setAuthUi(signedIn);

  if (!signedIn) {
    $('adminStatus').textContent = 'Sign in first.';
    return;
  }

  await loadAdminReport();
}

boot();
