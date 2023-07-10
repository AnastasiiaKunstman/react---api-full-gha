const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/Unauthorized');
const { NODE_ENV, JWT_SECRET } = require('../config');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
    req.user = payload;
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  return next();
};

module.exports = auth;
