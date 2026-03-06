const { ensureTables, listAllSummaries } = require("../shared/storage");

module.exports = async function (context) {
  try {
    await ensureTables();
    const rows = await listAllSummaries();

    const totalUsers = rows.length;
    const totalAttempts = rows.reduce((sum, r) => sum + Number(r.attemptCount || 0), 0);
    const passCount = rows.filter((r) => r.passed === true).length;
    const passRate = totalUsers ? Math.round((passCount / totalUsers) * 100) : 0;
    const averageScore = totalUsers
      ? Math.round((rows.reduce((sum, r) => sum + Number(r.averageScore || 0), 0) / totalUsers) * 100) / 100
      : 0;
    const averageDurationSeconds = totalUsers
      ? Math.round(rows.reduce((sum, r) => sum + Number(r.latestDurationSeconds || 0), 0) / totalUsers)
      : 0;
    const thirdFailCount = rows.filter((r) => r.thirdFailNotified === true).length;

    context.res = {
      status: 200,
      body: {
        summary: {
          totalUsers,
          totalAttempts,
          passRate,
          averageScore,
          averageDurationSeconds,
          thirdFailCount
        },
        rows
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
