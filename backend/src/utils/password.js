const bcrypt = require('bcrypt');

const hash = async (plain) => await bcrypt.hash(plain, 10);

const compare = async (plain, hashVal) => await bcrypt.compare(plain, hashVal);

module.exports = { hash, compare };
