const express = require('express');
const router = express.Router();
const parcelaController = require('../controllers/parcela.controller');

router.get('/', parcelaController.getAll);

module.exports = router;

