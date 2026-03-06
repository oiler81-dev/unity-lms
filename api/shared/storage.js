const { TableClient, AzureNamedKeyCredential } = require("@azure/data-tables");

const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME || "";
const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY || "";

const tableNames = {
  attempts: "CourseAttempts",
  summaries: "UserTrainingSummary"
};

function getClient(tableName) {
  if (!accountName || !accountKey) {
    throw new Error("AZURE_STORAGE_ACCOUNT_NAME and AZURE_STORAGE_ACCOUNT_KEY are required.");
  }

  const credential = new AzureNamedKeyCredential(accountName, accountKey);
  const url = `https://${accountName}.table.core.windows.net`;
  return new TableClient(url, tableName, credential);
}

async function ensureTables() {
  for (const table of Object.values(tableNames)) {
    const client = getClient(table);
    try {
      await client.createTable();
    } catch (err) {
      if (err.statusCode !== 409) {
        throw err;
      }
    }
  }
}

async function listAttemptsForUserCourse(courseId, userId) {
  const client = getClient(tableNames.attempts);
  const filter = `PartitionKey eq '${courseId}' and userId eq '${userId}'`;
  const rows = [];
  for await (const entity of client.listEntities({ queryOptions: { filter } })) {
    rows.push(entity);
  }
  rows.sort((a, b) => Number(a.attemptNumber || 0) - Number(b.attemptNumber || 0));
  return rows;
}

async function saveAttempt(entity) {
  const client = getClient(tableNames.attempts);
  await client.upsertEntity(entity, "Merge");
}

async function getSummary(courseId, userId) {
  const client = getClient(tableNames.summaries);
  try {
    return await client.getEntity(courseId, userId);
  } catch (err) {
    if (err.statusCode === 404) {
      return null;
    }
    throw err;
  }
}

async function saveSummary(entity) {
  const client = getClient(tableNames.summaries);
  await client.upsertEntity(entity, "Merge");
}

async function listAllSummaries() {
  const client = getClient(tableNames.summaries);
  const rows = [];
  for await (const entity of client.listEntities()) {
    rows.push(entity);
  }
  return rows;
}

module.exports = {
  ensureTables,
  listAttemptsForUserCourse,
  saveAttempt,
  getSummary,
  saveSummary,
  listAllSummaries
};
