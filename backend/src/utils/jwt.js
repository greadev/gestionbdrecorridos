const jwt = require('jsonwebtoken');
const config = require('../config');

const sign = (payload) =>
  jwt.sign(payload, config.jwtSecret, { expiresIn: '2h' });

const verify = (token) =>
  jwt.verify(token, config.jwtSecret);

module.exports = { sign, verify };
