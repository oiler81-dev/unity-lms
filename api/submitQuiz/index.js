const crypto = require("crypto");
const { getCourseDefinition } = require("../shared/courseDefinitions");
const { getUserFromRequest } = require("../shared/auth");
const { ensureTables, listAttemptsForUserCourse, saveAttempt, getSummary, saveSummary } = require("../shared/storage");
const { scoreCourse } = require("../shared/scoring");
const { notifyThirdFailure } = require("../shared/notify");

module.exports = async function (context, req) {
  try {
    const body = req.body || {};
    const courseId = body.courseId || process.env.COURSE_ID_DEFAULT || "front-desk-checkin-v1";
    const course = getCourseDefinition(courseId);

    if (!course) {
      context.res = { status: 404, body: { error: "Course not found" } };
      return;
    }

    const user = getUserFromRequest(req);
    if (!user?.userId) {
      context.res = { status: 401, body: { error: "Authentication required" } };
      return;
    }

    await ensureTables();

    const startedAt = new Date(body.startedAt || new Date().toISOString());
    const submittedAt = new Date(body.submittedAt || new Date().toISOString());
    const durationSeconds = Math.max(0, Math.round((submittedAt - startedAt) / 1000));
    const answers = body.answers || {};

    const priorAttempts = await listAttemptsForUserCourse(courseId, user.userId);
    const attemptNumber = priorAttempts.length + 1;

    const result = scoreCourse(course, answers);

    const attemptId = crypto.randomUUID();
    const incorrect = result.incorrect.map((r) => {
      const q = course.questions.find((x) => x.id === r.questionId);
      return {
        questionId: r.questionId,
        questionText: q.prompt,
        selectedAnswer: r.selectedAnswer,
        selectedAnswerText: q.options.find((o) => o.id === r.selectedAnswer)?.text || null,
        correctAnswer: r.correctAnswer,
        correctAnswerText: q.options.find((o) => o.id === r.correctAnswer)?.text || "",
        explanation: q.explanation || ""
      };
    });

    const entity = {
      partitionKey: courseId,
      rowKey: `${user.userId}_${attemptId}`,
      PartitionKey: courseId,
      RowKey: `${user.userId}_${attemptId}`,
      userId: user.userId,
      displayName: user.displayName,
      email: user.email,
      courseId,
      courseTitle: course.title,
      attemptNumber,
      score: result.score,
      passed: result.passed,
      startedAt: startedAt.toISOString(),
      submittedAt: submittedAt.toISOString(),
      durationSeconds,
      shuffled: !!body.shuffled,
      incorrectCount: incorrect.length,
      answersJson: JSON.stringify(answers),
      resultsJson: JSON.stringify(result.results)
    };

    await saveAttempt(entity);

    const existingSummary = await getSummary(courseId, user.userId);
    const priorCount = Number(existingSummary?.attemptCount || 0);
    const priorTotalScore = Number(existingSummary?.totalScore || 0);
    const newAttemptCount = priorCount + 1;
    const totalScore = priorTotalScore + result.score;
    const averageScore = Math.round((totalScore / newAttemptCount) * 100) / 100;
    const bestScore = Math.max(Number(existingSummary?.bestScore || 0), result.score);
    const failedAttemptCount = Number(existingSummary?.failedAttemptCount || 0) + (result.passed ? 0 : 1);
    const thirdFailNotifiedAlready = existingSummary?.thirdFailNotified === true;
    let thirdFailNotified = thirdFailNotifiedAlready;

    if (!result.passed && failedAttemptCount >= 3 && !thirdFailNotifiedAlready) {
      await notifyThirdFailure({
        user,
        course,
        latestScore: result.score,
        averageScore,
        attemptNumber,
        durationSeconds
      });
      thirdFailNotified = true;
    }

    await saveSummary({
      partitionKey: courseId,
      rowKey: user.userId,
      PartitionKey: courseId,
      RowKey: user.userId,
      userId: user.userId,
      displayName: user.displayName,
      email: user.email,
      courseId,
      courseTitle: course.title,
      attemptCount: newAttemptCount,
      totalScore,
      averageScore,
      latestScore: result.score,
      bestScore,
      passed: result.passed,
      failedAttemptCount,
      latestDurationSeconds: durationSeconds,
      lastAttemptAt: submittedAt.toISOString(),
      thirdFailNotified
    });

    context.res = {
      status: 200,
      body: {
        score: result.score,
        passed: result.passed,
        attemptNumber,
        nextAttemptNumber: attemptNumber + 1,
        durationSeconds,
        averageScore,
        incorrect
      }
    };
  } catch (err) {
    context.log.error(err);
    context.res = {
      status: 500,
      body: { error: err.message }
    };
  }
};
