const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/auth.middleware');
const itinerariosController = require('../controllers/itinerarios.controller');

// GeoJSON de TODOS los itinerarios (con o sin filtro, puedes mejorar después)
router.get('/geojson', verifyToken, itinerariosController.getAllGeoJson);

// GeoJSON de UN recorrido concreto
router.get('/:id/geojson', verifyToken, itinerariosController.getGeoJsonByRecorrido);

module.exports = router;
