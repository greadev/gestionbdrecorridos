const User = require('../models/user.model');
const { hash, compare } = require('../utils/password');
const { sign } = require('../utils/jwt');

// Registro de usuario (puedes pasar el rol opcionalmente)
exports.register = async (req, res) => {
  const { username, password, rol } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: 'Faltan campos' });

  const userExists = await User.findByUsername(username);
  if (userExists) return res.status(409).json({ error: 'Ya existe usuario' });

  const passwordHash = await hash(password);
  // Si no llega rol, por defecto es 'usuario'
  const user = await User.create(username, passwordHash, rol || 'usuario');
  res.status(201).json({ username: user.USERNAME, rol: user.ROL });
};

// Login con JWT que incluye el rol
exports.login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: 'Faltan campos' });

  const user = await User.findByUsername(username);
  if (!user) return res.status(401).json({ error: 'Usuario/clave incorrectos' });

  const valid = await compare(password, user.PASSWORD_HASH);
  if (!valid) return res.status(401).json({ error: 'Usuario/clave incorrectos' });

  // Incluye el rol en el token
  const token = sign({ id: user.ID, username: user.USERNAME, rol: user.ROL });
  res.json({ token, user: { id: user.ID, username: user.USERNAME, rol: user.ROL } });
};

// Cambiar contraseña de un usuario
exports.resetPassword = async (req, res) => {
  const { username, newPassword } = req.body;
  if (!username || !newPassword)
    return res.status(400).json({ error: 'Faltan campos' });

  const user = await User.findByUsername(username);
  if (!user) return res.status(404).json({ error: 'Usuario no existe' });

  const passwordHash = await hash(newPassword);
  await User.updatePassword(username, passwordHash);
  res.json({ mensaje: 'Contraseña actualizada correctamente' });
};

// Listar todos los usuarios (solo admin/superadmin)
exports.listUsers = async (req, res) => {
  const users = await User.getAll();
  res.json(users);
};

