const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    addNewUser,
    updateUser,
    deleteUser,
    addNewFriend,
    deleteFriend,
} = require('../../controllers/userController');

// get / add all users
router.route('/').get(getAllUsers).post(addNewUser);

// get / delete /update users by ID
router.route('/:userId').get(getUserById).delete(deleteUser).put(updateUser);

// add friends
router.route('/:userId/friends/:friendId').post(addNewFriend).delete(deleteFriend);

module.exports = router; 