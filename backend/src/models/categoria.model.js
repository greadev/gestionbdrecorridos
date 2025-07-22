const pool = require('./db');

// Listar todos desde la tabla
const getAll = async () => {
  const res = await pool.query('SELECT "CODIGO_CATEGORIA", "DESCRIPCION_cat" FROM "CATEGORIA" ORDER BY "DESCRIPCION_cat"');
  return res.rows;
};

module.exports = { getAll };
