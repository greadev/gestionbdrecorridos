const pool = require('./db');

// Crea un usuario nuevo (con rol opcional)
const create = async (username, passwordHash, rol = 'usuario') => {
  const res = await pool.query(
    `INSERT INTO "USUARIO" ("USERNAME", "PASSWORD_HASH", "ROL") VALUES ($1, $2, $3) RETURNING *`,
    [username, passwordHash, rol]
  );
  return res.rows[0];
};

// Busca usuario por username (lee todos los campos, incluido ROL)
const findByUsername = async (username) => {
  const res = await pool.query(
    `SELECT * FROM "USUARIO" WHERE "USERNAME" = $1`, [username]
  );
  return res.rows[0];
};

module.exports = { create, findByUsername };
