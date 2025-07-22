const pool = require('./db');

// Listar todos desde la tabla
const getAll = async () => {
  const res = await pool.query('SELECT "CODIGO_FECHA", "DIA_SEMANA" FROM "FECHA" ORDER BY "FECHA"');
  return res.rows;
};

module.exports = { getAll };
