function decodeBase64Json(raw) {
  if (!raw) return null;
  try {
    return JSON.parse(Buffer.from(raw, 'base64').toString('utf8'));
  } catch {
    return null;
  }
}

function getUser(req) {
  const principal = decodeBase64Json(req.headers['x-ms-client-principal']);
  const roles = Array.isArray(principal?.userRoles) ? principal.userRoles : [];

  return {
    isAuthenticated: !!principal,
    userId: principal?.userId || null,
    displayName: principal?.userDetails || req.headers['x-ms-client-principal-name'] || 'Unknown User',
    email: principal?.userDetails || req.headers['x-ms-client-principal-name'] || null,
    identityProvider: principal?.identityProvider || null,
    roles,
    isAdmin: roles.includes('admin') || roles.includes('authenticated') && (process.env.ADMIN_EMAILS || '').toLowerCase().split(',').map(s => s.trim()).filter(Boolean).includes((principal?.userDetails || '').toLowerCase())
  };
}

module.exports = { getUser };
