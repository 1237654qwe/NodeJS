const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  const payload = { id };
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "12h" });
}

module.exports = {
  generateToken,
}