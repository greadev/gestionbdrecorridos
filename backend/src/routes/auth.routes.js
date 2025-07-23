const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth.controller');
const { verifyToken } = require('../middlewares/auth.middleware');
const { requireAnyRole } = require('../middlewares/role.middleware');

// Endpoint para registro de usuario (si quieres que sea público)
router.post('/register', auth.register);

// Endpoint de login
router.post('/login', auth.login);

// Endpoint para listar usuarios (solo admin/superadmin)
router.get('/users', verifyToken, requireAnyRole(['admin', 'superadmin']), auth.listUsers);

// Endpoint para resetear contraseña (solo admin/superadmin)
router.post('/reset-password', verifyToken, requireAnyRole(['admin', 'superadmin']), auth.resetPassword);

module.exports = router;
