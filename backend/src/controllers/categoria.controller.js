const Categoria = require('../models/categoria.model');

exports.getAll = async (req, res) => {
  try {
    const data = await Categoria.getAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

