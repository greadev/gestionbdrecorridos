const express = require('express');
const router = express.Router();
const horaController = require('../controllers/horas.controller');

router.get('/', horaController.getAll);

module.exports = router;

