const express = require('express');
const router = express.Router();
const toponimoController = require('../controllers/toponimos.controller')

router.get('/', toponimoController.getAll);

module.exports = router;

