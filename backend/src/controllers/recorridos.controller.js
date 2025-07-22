const Recorrido = require('../models/recorrido.model');

// Listar todos
exports.getAll = async (req, res) => {
  try {
    const data = await Recorrido.getAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Ver uno
exports.getById = async (req, res) => {
  try {
    const data = await Recorrido.getById(req.params.id);
    if (!data) return res.status(404).json({ error: 'No encontrado' });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear
exports.create = async (req, res) => {
  try {
    const recorrido = req.body;
    const nuevo = await Recorrido.create(recorrido);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const recorrido = req.body;
    const actualizado = await Recorrido.update(id, recorrido);
    res.json(actualizado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar
exports.remove = async (req, res) => {
  try {
    const id = req.params.id;
    await Recorrido.remove(id);
    res.json({ deleted: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
