const $ = (id) => document.getElementById(id);

let rawRows = [];

function formatDuration(seconds) {
  const mins = Math.floor((seconds || 0) / 60);
  const secs = (seconds || 0) % 60;
  return `${mins}m ${String(secs).padStart(2, "0")}s`;
}

function downloadCsv(filename, rows) {
  const csv = rows.map((r) => r.map((v) => `"${String(v ?? "").replaceAll('"', '""')}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function renderTable(rows) {
  const tbody = $("adminTableBody");
  tbody.innerHTML = rows.map((row) => `
    <tr>
      <td>${row.displayName || ""}</td>
      <td>${row.email || ""}</td>
      <td>${row.courseTitle || ""}</td>
      <td>${row.attemptCount || 0}</td>
      <td>${row.averageScore || 0}%</td>
      <td>${row.latestScore || 0}%</td>
      <td>${row.bestScore || 0}%</td>
      <td>${row.passed ? "Yes" : "No"}</td>
      <td>${formatDuration(row.latestDurationSeconds || 0)}</td>
      <td>${row.lastAttemptAt ? new Date(row.lastAttemptAt).toLocaleString() : ""}</td>
      <td>${row.thirdFailNotified ? "Yes" : "No"}</td>
    </tr>
  `).join("");
}

function renderStats(summary) {
  $("totalUsers").textContent = summary.totalUsers;
  $("totalAttempts").textContent = summary.totalAttempts;
  $("passRate").textContent = `${summary.passRate}%`;
  $("averageScore").textContent = `${summary.averageScore}%`;
  $("averageTime").textContent = formatDuration(summary.averageDurationSeconds || 0);
  $("thirdFailCount").textContent = summary.thirdFailCount;
}

function applyFilters() {
  const q = $("searchInput").value.trim().toLowerCase();
  const courseFilter = $("courseFilter").value;

  const filtered = rawRows.filter((row) => {
    const matchesSearch =
      !q ||
      (row.displayName || "").toLowerCase().includes(q) ||
      (row.email || "").toLowerCase().includes(q);

    const matchesCourse = !courseFilter || row.courseId === courseFilter;
    return matchesSearch && matchesCourse;
  });

  renderTable(filtered);
}

async function loadDashboard() {
  const res = await fetch("/api/getAdminDashboard", { credentials: "include" });
  if (!res.ok) {
    throw new Error("Failed to load admin dashboard");
  }

  const data = await res.json();
  rawRows = data.rows || [];
  renderStats(data.summary || {
    totalUsers: 0,
    totalAttempts: 0,
    passRate: 0,
    averageScore: 0,
    averageDurationSeconds: 0,
    thirdFailCount: 0
  });
  renderTable(rawRows);
}

function wireEvents() {
  $("refreshBtn").addEventListener("click", loadDashboard);
  $("searchInput").addEventListener("input", applyFilters);
  $("courseFilter").addEventListener("change", applyFilters);

  $("exportBtn").addEventListener("click", () => {
    const rows = [
      ["User", "Email", "Course", "Attempts", "Average Score", "Latest Score", "Best Score", "Passed", "Latest Duration Seconds", "Last Attempt", "Third Fail Alert"],
      ...rawRows.map((row) => [
        row.displayName,
        row.email,
        row.courseTitle,
        row.attemptCount,
        row.averageScore,
        row.latestScore,
        row.bestScore,
        row.passed ? "Yes" : "No",
        row.latestDurationSeconds || 0,
        row.lastAttemptAt || "",
        row.thirdFailNotified ? "Yes" : "No"
      ])
    ];
    downloadCsv("unity-training-admin-report.csv", rows);
  });
}

window.addEventListener("DOMContentLoaded", async () => {
  try {
    wireEvents();
    await loadDashboard();
  } catch (err) {
    console.error(err);
    alert("Could not load admin dashboard. Check your deployment, auth, and API settings.");
  }
});
