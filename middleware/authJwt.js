const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.JWT_SECRET;

const authenticateToken = async (req, res, next) => {
  let token = req.header('Authorization');
  
  // Check if the token exists and starts with "Bearer "
  if (!token || !token.startsWith('Bearer ')) {
    return res.status(400).send({ message: 'Authentication Failed! Token missing or incorrect format.' });
  }

  // Remove "Bearer " prefix from the token
  token = token.split(' ')[1];

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).send({ message: 'Token is not valid' });

    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
