const { TableClient, AzureNamedKeyCredential } = require('@azure/data-tables');

const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING || '';
const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME || '';
const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY || '';
const tableEndpoint = process.env.AZURE_TABLES_ENDPOINT || (accountName ? `https://${accountName}.table.core.windows.net` : '');

function buildClient(tableName) {
  if (connectionString) {
    return TableClient.fromConnectionString(connectionString, tableName);
  }

  if (tableEndpoint && accountName && accountKey) {
    const credential = new AzureNamedKeyCredential(accountName, accountKey);
    return new TableClient(tableEndpoint, tableName, credential);
  }

  return null;
}

async function ensureTable(client) {
  if (!client) return false;
  try {
    await client.createTable();
  } catch (err) {
    if (err.statusCode !== 409) throw err;
  }
  return true;
}

module.exports = {
  attemptsClient: buildClient('QuizAttempts'),
  responsesClient: buildClient('QuizResponses'),
  summaryClient: buildClient('QuizUsersSummary'),
  ensureTable
};
