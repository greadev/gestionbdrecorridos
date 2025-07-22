const pool = require('./db');

// Listar todos desde la tabla
const getAll = async () => {
  const res = await pool.query('SELECT "codigo_par", "nombre_par" FROM "PARCELA" WHERE nombre_par IS NOT NULL ORDER BY "nombre_par"');
  return res.rows;
};

module.exports = { getAll };
