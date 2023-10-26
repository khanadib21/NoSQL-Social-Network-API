const router = require('express').Router();
const {
  allUsers,
  findUser,
  addUser,
  updateUser,
  destroyUser,
  addNewFriend,
  destroyFriend,
} = require('../../controllers/user');

router.route('/').get(allUsers).post(addUser);

router.route('/:uId').get(findUser).put(updateUser).delete(destroyUser);

router.route('/:uId/friends/:friendId').post(addNewFriend).delete(destroyFriend);
module.exports = router;