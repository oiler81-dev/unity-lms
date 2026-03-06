async function notifyThirdFailure({ user, course, latestScore, averageScore, attemptNumber, durationSeconds }) {
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || "mvargas@unitymsk.com";

  // Stub for now. Replace with Logic App, ACS Email, or Graph later.
  console.log("THIRD FAILURE NOTIFICATION", {
    to: adminEmail,
    user: user.displayName,
    email: user.email,
    course: course.title,
    latestScore,
    averageScore,
    attemptNumber,
    durationSeconds
  });

  return true;
}

module.exports = { notifyThirdFailure };
