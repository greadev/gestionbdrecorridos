const express = require('express');
const router = express.Router();
const jornadaController = require('../controllers/jornada.controller');

router.get('/', jornadaController.getAll);

module.exports = router;

