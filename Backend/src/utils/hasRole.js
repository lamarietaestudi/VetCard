const hasRole = (user, role) => {
  if (!user || !user.role) return false;
  if (Array.isArray(user.role)) return user.role.includes(role);
  return user.role === role;
};

module.exports = hasRole;
