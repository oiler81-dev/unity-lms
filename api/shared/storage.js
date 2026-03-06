const { attemptsClient, responsesClient, summaryClient, ensureTable } = require('./tableClient');

const memory = {
  attempts: [],
  responses: [],
  summaries: []
};

async function setupTables() {
  await Promise.all([
    ensureTable(attemptsClient),
    ensureTable(responsesClient),
    ensureTable(summaryClient)
  ]);
}

async function listUserAttempts(quizId, userId) {
  if (attemptsClient) {
    await setupTables();
    const results = [];
    const filter = `PartitionKey eq '${quizId}' and userId eq '${userId}'`;
    for await (const entity of attemptsClient.listEntities({ queryOptions: { filter } })) {
      results.push(entity);
    }
    return results.sort((a, b) => Number(a.attemptNumber) - Number(b.attemptNumber));
  }

  return memory.attempts
    .filter((a) => a.PartitionKey === quizId && a.userId === userId)
    .sort((a, b) => Number(a.attemptNumber) - Number(b.attemptNumber));
}

async function saveAttempt(attempt) {
  if (attemptsClient) {
    await setupTables();
    await attemptsClient.upsertEntity(attempt, 'Replace');
    return attempt;
  }
  memory.attempts.push(attempt);
  return attempt;
}

async function saveResponses(rows) {
  if (responsesClient) {
    await setupTables();
    for (const row of rows) {
      await responsesClient.upsertEntity(row, 'Replace');
    }
    return rows;
  }
  memory.responses.push(...rows);
  return rows;
}

async function getSummary(quizId, userId) {
  if (summaryClient) {
    await setupTables();
    try {
      return await summaryClient.getEntity(quizId, userId);
    } catch (err) {
      if (err.statusCode === 404) return null;
      throw err;
    }
  }
  return memory.summaries.find((s) => s.PartitionKey === quizId && s.RowKey === userId) || null;
}

async function saveSummary(summary) {
  if (summaryClient) {
    await setupTables();
    await summaryClient.upsertEntity(summary, 'Replace');
    return summary;
  }

  const idx = memory.summaries.findIndex((s) => s.PartitionKey === summary.PartitionKey && s.RowKey === summary.RowKey);
  if (idx >= 0) memory.summaries[idx] = summary;
  else memory.summaries.push(summary);
  return summary;
}

async function getAllAttempts(quizId) {
  if (attemptsClient) {
    await setupTables();
    const results = [];
    const filter = `PartitionKey eq '${quizId}'`;
    for await (const entity of attemptsClient.listEntities({ queryOptions: { filter } })) {
      results.push(entity);
    }
    return results;
  }
  return memory.attempts.filter((a) => a.PartitionKey === quizId);
}

module.exports = {
  listUserAttempts,
  saveAttempt,
  saveResponses,
  getSummary,
  saveSummary,
  getAllAttempts
};
