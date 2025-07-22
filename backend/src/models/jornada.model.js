const pool = require('./db');

// Listar todos desde la tabla
const getAll = async () => {
  const res = await pool.query('SELECT "CODIGO_JORNADA", "DESCRIPCION_jor" FROM "JORNADA" ORDER BY "DESCRIPCION_jor"');
  return res.rows;
};

module.exports = { getAll };
