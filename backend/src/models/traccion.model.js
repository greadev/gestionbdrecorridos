const pool = require('./db');

// Listar todos desde la tabla
const getAll = async () => {
  const res = await pool.query('SELECT "CODIGO_TRACCION", "DESCRIPCION_trac" FROM "TRACCION" ORDER BY "DESCRIPCION_trac"');
  return res.rows;
};

module.exports = { getAll };
