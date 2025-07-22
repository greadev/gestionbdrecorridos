const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth.controller');

// Puedes borrar el endpoint de registro si no quieres que sea público
router.post('/register', auth.register);
router.post('/login', auth.login);

module.exports = router;
