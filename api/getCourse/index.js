const { getCourseDefinition } = require("../shared/courseDefinitions");
const { getUserFromRequest } = require("../shared/auth");
const { ensureTables, listAttemptsForUserCourse } = require("../shared/storage");

module.exports = async function (context, req) {
  try {
    const courseId = req.query.courseId || process.env.COURSE_ID_DEFAULT || "front-desk-checkin-v1";
    const course = getCourseDefinition(courseId);

    if (!course) {
      context.res = { status: 404, body: { error: "Course not found" } };
      return;
    }

    await ensureTables();

    const user = getUserFromRequest(req);
    let attempts = [];
    if (user?.userId) {
      attempts = await listAttemptsForUserCourse(courseId, user.userId);
    }

    const nextAttemptNumber = attempts.length + 1;
    const shouldShuffle = attempts.length > 0 && attempts[attempts.length - 1]?.passed !== true;

    context.res = {
      status: 200,
      body: {
        course,
        nextAttemptNumber,
        shouldShuffle
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
