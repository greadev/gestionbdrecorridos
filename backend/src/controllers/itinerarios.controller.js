const pool = require('../models/db');

// GeoJSON de todos los itinerarios
exports.getAllGeoJson = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        "CODIGO_RECORRIDO",
        ST_AsGeoJSON(geom)::json AS geometry
        -- añade aquí más campos si quieres en properties
      FROM "ITINERARIOS_APP_GESTION"
    `);

    if (!result.rows.length) {
      return res.status(404).json({ error: 'No hay itinerarios' });
    }

    const features = result.rows.map(row => ({
      type: 'Feature',
      geometry: row.geometry,
      properties: Object.fromEntries(
        Object.entries(row).filter(([k]) => k !== 'geometry')
      ),
    }));

    res.json({
      type: 'FeatureCollection',
      features
    });
  } catch (err) {
    console.error('Error al obtener todos los geojson:', err);
    res.status(500).json({ error: 'Error interno' });
  }
};

// GeoJSON de un recorrido concreto
exports.getGeoJsonByRecorrido = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pool.query(
      `
      SELECT 
        "CODIGO_RECORRIDO",
        ST_AsGeoJSON(geom)::json AS geometry
      FROM "ITINERARIOS_APP_GESTION"
      WHERE "CODIGO_RECORRIDO" = $1
      `,
      [id]
    );

    if (!result.rows.length) {
      return res.status(404).json({ error: 'No se encontró el recorrido' });
    }

    const features = result.rows.map(row => ({
      type: 'Feature',
      geometry: row.geometry,
      properties: Object.fromEntries(
        Object.entries(row).filter(([k]) => k !== 'geometry')
      ),
    }));

    res.json({
      type: 'FeatureCollection',
      features
    });
  } catch (err) {
    console.error('Error al obtener geojson por recorrido:', err);
    res.status(500).json({ error: 'Error interno' });
  }
};
