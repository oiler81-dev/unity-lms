const fetch = require('node-fetch');
const { EmailClient } = require('@azure/communication-email');

async function sendViaWebhook(payload) {
  const url = process.env.LOGIC_APP_FAILURE_WEBHOOK || process.env.FAILURE_WEBHOOK_URL;
  if (!url) return false;

  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return true;
}

async function sendViaAcs(payload) {
  const connectionString = process.env.ACS_EMAIL_CONNECTION_STRING;
  const sender = process.env.ACS_EMAIL_SENDER;
  if (!connectionString || !sender) return false;

  const client = new EmailClient(connectionString);
  const subject = `Unity Quiz Alert: Third Failed Attempt - ${payload.displayName}`;
  const plainText = [
    'A user has failed the Unity Front Desk quiz three times.',
    '',
    `User: ${payload.displayName}`,
    `Email: ${payload.email}`,
    `Quiz: ${payload.quizTitle}`,
    `Attempt: ${payload.attemptNumber}`,
    `Latest Score: ${payload.score}%`,
    `Average Score: ${payload.averageScore}%`,
    `Duration: ${payload.durationSeconds} seconds`
  ].join('\n');

  const poller = await client.beginSend({
    senderAddress: sender,
    content: {
      subject,
      plainText,
      html: `<p>A user has failed the Unity Front Desk quiz three times.</p>
             <p><strong>User:</strong> ${payload.displayName}<br>
             <strong>Email:</strong> ${payload.email}<br>
             <strong>Quiz:</strong> ${payload.quizTitle}<br>
             <strong>Attempt:</strong> ${payload.attemptNumber}<br>
             <strong>Latest Score:</strong> ${payload.score}%<br>
             <strong>Average Score:</strong> ${payload.averageScore}%<br>
             <strong>Duration:</strong> ${payload.durationSeconds} seconds</p>`
    },
    recipients: {
      to: [{ address: 'mvargas@unitymsk.com' }]
    }
  });

  await poller.pollUntilDone();
  return true;
}

async function notifyThirdFailure(payload, context) {
  try {
    const sent = await sendViaWebhook(payload) || await sendViaAcs(payload);
    if (!sent && context?.log) context.log('Third-fail notification was skipped because no webhook or ACS email config exists.');
    return sent;
  } catch (err) {
    if (context?.log) context.log('Third-fail notification failed:', err.message);
    return false;
  }
}

module.exports = { notifyThirdFailure };
