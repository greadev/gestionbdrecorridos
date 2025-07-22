const express = require('express');
const router = express.Router();
const traccionController = require('../controllers/traccion.controller');

router.get('/', traccionController.getAll);

module.exports = router;

