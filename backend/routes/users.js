const router = require('express').Router();
const {
  validateUpdateAvatar,
  validateId,
  validateUserData,
} = require('../middlewares/validate');
const {
  getUsers,
  getUser,
  getOwner,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getOwner);
router.get('/:id', validateId, getUser);
router.patch('/me', validateUserData, updateUser);
router.patch('/me/avatar', validateUpdateAvatar, updateAvatar);

module.exports = router;
