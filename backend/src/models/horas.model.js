const pool = require('./db');

// Listar todos desde la tabla
const getAll = async () => {
  const res = await pool.query('SELECT "CODIGO_HORA", "HORA" FROM "HORA" ORDER BY "HORA"');
  return res.rows;
};

module.exports = { getAll };
