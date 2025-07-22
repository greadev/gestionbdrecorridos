// Middleware para requerir un rol concreto (ej: 'admin')
exports.requireRole = (rol) => (req, res, next) => {
  if (!req.user || req.user.rol !== rol) {
    return res.status(403).json({ error: 'No autorizado' });
  }
  next();
};

// Middleware para requerir cualquier rol de una lista
exports.requireAnyRole = (roles = []) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.rol)) {
    return res.status(403).json({ error: 'No autorizado' });
  }
  next();
};
