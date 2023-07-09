const router = require('express').Router();
const userRouters = require('./users');
const cardsRouters = require('./cards');
const { createUser, login } = require('../controllers/users');
const { validateUser, validateLogin } = require('../middlewares/validation');
const NotFoundError = require('../errors/NotFound');
const auth = require('../middlewares/auth');

router.post('/signup', validateUser, createUser);
router.post('/signin', validateLogin, login);

router.use(auth);

router.use('/users', userRouters);
router.use('/cards', cardsRouters);

router.use('/*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
