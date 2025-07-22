const Parcela = require('../models/parcela.model');

exports.getAll = async (req, res) => {
  try {
    const data = await Parcela.getAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

