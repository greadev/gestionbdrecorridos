const Hermandad = require('../models/hermandad.model');

exports.getAll = async (req, res) => {
  try {
    const data = await Hermandad.getAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

