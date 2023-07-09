const router = require('express').Router();
const {
  getProfile, getUsers, getUserById, updateProfile, updateAvatar,
} = require('../controllers/users');
const {
  validatePersonalInfo, validateAvatar, validateUserId,
} = require('../middlewares/validation');

router.get('/', getUsers);
router.get('/me', getProfile);
router.get('/:userId', validateUserId, getUserById);
router.patch('/me', validatePersonalInfo, updateProfile);
router.patch('/me/avatar', validateAvatar, updateAvatar);

module.exports = router;
