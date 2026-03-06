function getClientPrincipal(req) {
  const encoded = req.headers["x-ms-client-principal"];
  if (!encoded) return null;

  try {
    const decoded = JSON.parse(Buffer.from(encoded, "base64").toString("utf8"));
    return decoded;
  } catch {
    return null;
  }
}

function getUserFromRequest(req) {
  const principal = getClientPrincipal(req);
  if (!principal) {
    return null;
  }

  return {
    userId: principal.userId,
    displayName: principal.userDetails || principal.identityProvider || "Authenticated User",
    email: principal.userDetails || "",
    roles: Array.isArray(principal.userRoles) ? principal.userRoles : []
  };
}

module.exports = {
  getClientPrincipal,
  getUserFromRequest
};
