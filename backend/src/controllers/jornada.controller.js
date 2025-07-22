const Hora = require('../models/jornada.model');

exports.getAll = async (req, res) => {
  try {
    const data = await Hora.getAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

