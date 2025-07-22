const Traccion = require('../models/traccion.model');

exports.getAll = async (req, res) => {
  try {
    const data = await Traccion.getAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

