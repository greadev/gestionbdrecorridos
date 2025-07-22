const pool = require('./db');

// Listar todos desde la vista
const getAll = async () => {
  const res = await pool.query('SELECT * FROM "RECORRIDOS_APP_GESTION"');
  return res.rows;
};

// Buscar uno por ID desde la vista
const getById = async (id) => {
  const res = await pool.query('SELECT * FROM "RECORRIDO" WHERE "CODIGO_RECORRIDO" = $1', [id]);
  return res.rows[0];
};

// Crear en la tabla real
const create = async (recorrido) => {
  const res = await pool.query(
    `INSERT INTO "RECORRIDO" (
      "CODIGO_HERMANDAD", "CODIGO_TRACCION", "CODIGO_FECHA", "CODIGO_HORA",
      "CODIGO_JORNADA", "CODIGO_TOPONIMO", "CODIGO_CATEGORIA", "CODIGO_PARCELA", "OBSERVACIONES"
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
    RETURNING *`,
    [
      recorrido.CODIGO_HERMANDAD,
      recorrido.CODIGO_TRACCION,
      recorrido.CODIGO_FECHA,
      recorrido.CODIGO_HORA,
      recorrido.CODIGO_JORNADA,
      recorrido.CODIGO_TOPONIMO,
      recorrido.CODIGO_CATEGORIA,
      recorrido.CODIGO_PARCELA,
      recorrido.OBSERVACIONES
    ]
  );
  return res.rows[0];
};

// Editar en la tabla real
const update = async (id, recorrido) => {
  const res = await pool.query(
    `UPDATE "RECORRIDO" SET
      "CODIGO_HERMANDAD"=$1, "CODIGO_TRACCION"=$2, "CODIGO_FECHA"=$3, "CODIGO_HORA"=$4,
      "CODIGO_JORNADA"=$5, "CODIGO_TOPONIMO"=$6, "CODIGO_CATEGORIA"=$7, "CODIGO_PARCELA"=$8, "OBSERVACIONES"=$9
    WHERE "CODIGO_RECORRIDO"=$10
    RETURNING *`,
    [
      recorrido.CODIGO_HERMANDAD,
      recorrido.CODIGO_TRACCION,
      recorrido.CODIGO_FECHA,
      recorrido.CODIGO_HORA,
      recorrido.CODIGO_JORNADA,
      recorrido.CODIGO_TOPONIMO,
      recorrido.CODIGO_CATEGORIA,
      recorrido.CODIGO_PARCELA,
      recorrido.OBSERVACIONES,
      id
    ]
  );
  return res.rows[0];
};

// Eliminar en la tabla real
const remove = async (id) => {
  await pool.query('DELETE FROM "RECORRIDO" WHERE "CODIGO_RECORRIDO" = $1', [id]);
  return true;
};

module.exports = { getAll, getById, create, update, remove };
