const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/Unauthorized');
const config = require('../config');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, config.JWT_SECRET);
    req.user = payload;
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  return next();
};

module.exports = auth;
