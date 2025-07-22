const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/auth.middleware');
const { requireRole, requireAnyRole } = require('../middlewares/role.middleware');
const recorridosController = require('../controllers/recorridos.controller');


router.get('/publico', (req, res) => {
  res.json({ mensaje: 'Soy público, no necesitas login' });
});

router.get('/privado', verifyToken, (req, res) => {
  res.json({ mensaje: `Hola, ${req.user.username}! Estás autenticado`, rol: req.user.rol });
});

router.get('/solo-admin', verifyToken, requireRole('admin'), (req, res) => {
  res.json({ mensaje: 'Solo los admin ven esto', user: req.user });
});

router.get('/admin-o-gestor', verifyToken, requireAnyRole(['admin', 'gestor']), (req, res) => {
  res.json({ mensaje: 'Solo admin o gestor pueden ver esto', user: req.user });
});

router.get('/', verifyToken, recorridosController.getAll);

router.get('/:id', verifyToken, recorridosController.getById);

router.put('/:id', verifyToken, requireRole('admin'), recorridosController.update);

router.put('/:id', verifyToken, requireRole('admin'), recorridosController.remove);

module.exports = router;
