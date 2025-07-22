const Fecha = require('../models/fecha.model');

exports.getAll = async (req, res) => {
  try {
    const data = await Fecha.getAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

