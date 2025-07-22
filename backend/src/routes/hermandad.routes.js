const express = require('express');
const router = express.Router();
const hermandadController = require('../controllers/hermandad.controller');

router.get('/', hermandadController.getAll);

module.exports = router;

