const { sanitizedQuiz } = require('../shared/quizData');
const { getUser } = require('../shared/auth');
const { listUserAttempts } = require('../shared/storage');

module.exports = async function (context, req) {
  try {
    const user = getUser(req);
    if (!user.isAuthenticated) {
      context.res = { status: 401, body: { error: 'Authentication required.' } };
      return;
    }

    const quiz = sanitizedQuiz();
    const attempts = await listUserAttempts(quiz.quizId, user.userId);
    const lastAttempt = attempts.at(-1) || null;
    const shouldShuffle = !!lastAttempt && !lastAttempt.passed;

    context.res = {
      status: 200,
      body: {
        quiz,
        nextAttemptNumber: attempts.length + 1,
        shouldShuffle,
        priorAttempts: attempts.length,
        lastScore: lastAttempt ? Number(lastAttempt.score) : null,
        lastPassed: lastAttempt ? !!lastAttempt.passed : null,
        user: {
          displayName: user.displayName,
          email: user.email
        }
      }
    };
  } catch (err) {
    context.res = { status: 500, body: { error: err.message } };
  }
};
