const Toponimo = require('../models/toponimos.model');

exports.getAll = async (req, res) => {
  try {
    const data = await Toponimo.getAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

