const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoria.controller');

router.get('/', categoriaController.getAll);

module.exports = router;