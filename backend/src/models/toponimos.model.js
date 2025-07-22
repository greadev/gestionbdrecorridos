const pool = require('./db');

// Listar todos desde la tabla
const getAll = async () => {
  const res = await pool.query('SELECT "codigo_top", "nombre_top" FROM "TOPONIMO" WHERE "nombre_top" IS NOT NULL ORDER BY "nombre_top"');
  return res.rows;
};

module.exports = { getAll };
