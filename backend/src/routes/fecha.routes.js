const express = require('express');
const router = express.Router();
const fechaController = require('../controllers/fecha.controller');

router.get('/', fechaController.getAll);

module.exports = router;

