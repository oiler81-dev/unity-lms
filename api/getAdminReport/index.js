const { quiz } = require('../shared/quizData');
const { getUser } = require('../shared/auth');
const { getAllAttempts } = require('../shared/storage');

module.exports = async function (context, req) {
  try {
    const user = getUser(req);
    if (!user.isAuthenticated) {
      context.res = { status: 401, body: { error: 'Authentication required.' } };
      return;
    }

    if (!user.isAdmin) {
      context.res = { status: 403, body: { error: 'Admin access required.' } };
      return;
    }

    const attempts = (await getAllAttempts(quiz.quizId)).sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
    const perUser = new Map();

    for (const row of attempts) {
      const key = row.userId;
      if (!perUser.has(key)) {
        perUser.set(key, {
          userId: row.userId,
          displayName: row.displayName,
          email: row.email,
          attempts: 0,
          totalScore: 0,
          latestScore: Number(row.score),
          bestScore: Number(row.score),
          passedEver: !!row.passed,
          latestDurationSeconds: Number(row.durationSeconds || 0),
          latestSubmittedAt: row.submittedAt,
          thirdFailRisk: Number(row.failedAttempts || 0) >= 3,
          scores: []
        });
      }

      const item = perUser.get(key);
      item.attempts += 1;
      item.totalScore += Number(row.score || 0);
      item.bestScore = Math.max(item.bestScore, Number(row.score || 0));
      item.passedEver = item.passedEver || !!row.passed;
      item.thirdFailRisk = item.thirdFailRisk || Number(row.failedAttempts || 0) >= 3;
      item.scores.push(Number(row.score || 0));
    }

    const users = [...perUser.values()].map((u) => ({
      ...u,
      averageScore: Number((u.totalScore / u.attempts).toFixed(2))
    }));

    const metrics = {
      quizId: quiz.quizId,
      quizTitle: quiz.title,
      totalAttempts: attempts.length,
      totalUsers: users.length,
      passRate: users.length ? Number(((users.filter((u) => u.passedEver).length / users.length) * 100).toFixed(2)) : 0,
      averageScore: attempts.length ? Number((attempts.reduce((sum, a) => sum + Number(a.score || 0), 0) / attempts.length).toFixed(2)) : 0,
      averageAttemptsPerUser: users.length ? Number((attempts.length / users.length).toFixed(2)) : 0,
      averageDurationSeconds: attempts.length ? Math.round(attempts.reduce((sum, a) => sum + Number(a.durationSeconds || 0), 0) / attempts.length) : 0
    };

    context.res = { status: 200, body: { metrics, users, attempts } };
  } catch (err) {
    context.res = { status: 500, body: { error: err.message } };
  }
};
