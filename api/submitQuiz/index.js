const { v4: uuidv4 } = require('uuid');
const { quiz } = require('../shared/quizData');
const { scoreQuiz } = require('../shared/scoring');
const { getUser } = require('../shared/auth');
const { listUserAttempts, saveAttempt, saveResponses, getSummary, saveSummary } = require('../shared/storage');
const { notifyThirdFailure } = require('../shared/notify');

module.exports = async function (context, req) {
  try {
    const user = getUser(req);
    if (!user.isAuthenticated) {
      context.res = { status: 401, body: { error: 'Authentication required.' } };
      return;
    }

    const body = req.body || {};
    const answers = body.answers || {};
    const startedAt = new Date(body.startedAt || new Date().toISOString());
    const submittedAt = new Date(body.submittedAt || new Date().toISOString());
    const durationSeconds = Math.max(0, Math.round((submittedAt.getTime() - startedAt.getTime()) / 1000));

    const priorAttempts = await listUserAttempts(quiz.quizId, user.userId);
    const attemptNumber = priorAttempts.length + 1;
    const scoreResult = scoreQuiz(quiz.questions, answers, quiz.pointsPerQuestion);
    const attemptId = uuidv4();
    const failedAttemptsAfterSubmit = [...priorAttempts.filter((a) => !a.passed), ...(scoreResult.passed ? [] : [{ failed: true }])].length;

    const attemptEntity = {
      PartitionKey: quiz.quizId,
      RowKey: `${user.userId}_${attemptId}`,
      attemptId,
      userId: user.userId,
      displayName: user.displayName,
      email: user.email,
      attemptNumber,
      score: scoreResult.score,
      passed: scoreResult.passed,
      startedAt: startedAt.toISOString(),
      submittedAt: submittedAt.toISOString(),
      durationSeconds,
      questionCount: quiz.questions.length,
      incorrectCount: scoreResult.incorrect.length,
      shuffled: !!body.shuffled,
      failedAttempts: failedAttemptsAfterSubmit
    };

    await saveAttempt(attemptEntity);

    const responseRows = scoreResult.results.map((result) => ({
      PartitionKey: `${quiz.quizId}_${attemptId}`,
      RowKey: result.questionId,
      attemptId,
      userId: user.userId,
      displayName: user.displayName,
      email: user.email,
      questionId: result.questionId,
      selectedAnswer: result.selectedAnswer || '',
      correctAnswer: result.correctAnswer,
      isCorrect: result.isCorrect,
      submittedAt: submittedAt.toISOString()
    }));

    await saveResponses(responseRows);

    const existingSummary = await getSummary(quiz.quizId, user.userId);
    const previousAttemptCount = Number(existingSummary?.attemptCount || 0);
    const previousAverage = Number(existingSummary?.averageScore || 0);
    const totalAttempts = previousAttemptCount + 1;
    const averageScore = Number((((previousAverage * previousAttemptCount) + scoreResult.score) / totalAttempts).toFixed(2));
    const bestScore = Math.max(Number(existingSummary?.bestScore || 0), scoreResult.score);
    const hasPassedEver = !!existingSummary?.passedEver || scoreResult.passed;

    let thirdFailNotified = !!existingSummary?.thirdFailNotified;
    if (!scoreResult.passed && failedAttemptsAfterSubmit >= 3 && !thirdFailNotified) {
      thirdFailNotified = await notifyThirdFailure({
        displayName: user.displayName,
        email: user.email,
        quizTitle: quiz.title,
        attemptNumber,
        score: scoreResult.score,
        averageScore,
        durationSeconds
      }, context);
    }

    await saveSummary({
      PartitionKey: quiz.quizId,
      RowKey: user.userId,
      userId: user.userId,
      displayName: user.displayName,
      email: user.email,
      attemptCount: totalAttempts,
      averageScore,
      latestScore: scoreResult.score,
      bestScore,
      latestPassed: scoreResult.passed,
      passedEver: hasPassedEver,
      latestDurationSeconds: durationSeconds,
      lastSubmittedAt: submittedAt.toISOString(),
      failedAttempts: failedAttemptsAfterSubmit,
      thirdFailNotified
    });

    const incorrect = scoreResult.incorrect.map((item) => {
      const question = quiz.questions.find((q) => q.id === item.questionId);
      return {
        questionId: question.id,
        questionText: question.prompt,
        selectedAnswer: item.selectedAnswer,
        selectedAnswerText: question.options.find((o) => o.id === item.selectedAnswer)?.text || 'No answer selected',
        correctAnswer: item.correctAnswer,
        correctAnswerText: question.options.find((o) => o.id === item.correctAnswer)?.text || '',
        explanation: question.explanation || ''
      };
    });

    context.res = {
      status: 200,
      body: {
        score: scoreResult.score,
        passed: scoreResult.passed,
        attemptNumber,
        durationSeconds,
        averageScore,
        failedAttempts: failedAttemptsAfterSubmit,
        thirdFailNotified,
        incorrect,
        message: scoreResult.passed ? 'Assessment passed.' : 'Score below 90%. Retake required.'
      }
    };
  } catch (err) {
    context.res = { status: 500, body: { error: err.message } };
  }
};
