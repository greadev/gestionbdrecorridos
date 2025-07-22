const pool = require('./db');

// Listar todos desde la tabla
const getAll = async () => {
  const res = await pool.query('SELECT "CODIGO_HERMANDAD", "NOMBRE" FROM "HERMANDAD" ORDER BY "NOMBRE"');
  return res.rows;
};

module.exports = { getAll };
