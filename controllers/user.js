const { User } = require('../models');

const UserCon = {
  // allUsers
  allUsers(req, resp) {
    User.find({})
      .then(userObj => resp.json(userObj))
      .catch(error => resp.status(500).json(error));
  },

  // findUser
  findUser(req, resp) {
    User.findById(req.params.uId)
      .then(userObj => resp.json(userObj))
      .catch(error => resp.status(500).json(error));
  },

  // addUser
  addUser(req, resp) {
    User.create(req.body)
      .then(userObj => resp.json(userObj))
      .catch(error => resp.status(500).json(error));
  },

  // updateUser
  updateUser(req, resp) {
    User.findOneAndUpdate(req.params.id, req.body, { new: true })
      .then(userObj => {
        if (!userObj) {
          return resp.status(404).json({ message: 'User not found' });
        }
        resp.json(userObj);
      })
      .catch(error => resp.status(500).json(error));
  },

  // destroyUser
  destroyUser(req, resp) {
    User.findOneAndDelete(req.params.id)
      .then(userObj => {
        if (!userObj) {
          return resp.status(404).json({ message: 'User not found' });
        }
        resp.json({ message: 'User deleted successfully' });
      })
      .catch(error => resp.status(500).json(error));
  },

  // addNewFriend
  addNewFriend(req, resp) {
    User.findOneAndUpdate(
      { _id: req.params.use },
      { $addToSet: { friends: req.body.friendId || req.params.friendId} },
      { new: true }
    )
      .then(userObj => {
        if (!userObj) {
          return resp.status(404).json({ message: 'User not found' });
        }
        resp.json(userObj);
      })
      .catch(error => resp.status(500).json(error));
  },


  // destroyFriend
  destroyFriend({ params }, resp) {
    User.findOneAndUpdate(
      { _id: params.use },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((UserObj) => {
        if (!UserObj) {
          return resp.status(404).json({ message: "No user with this id!" });
        }
    
        const isremoved = !UserObj.friends.includes(params.friendId);
    
        if (isremoved) {
          resp.json({ message: "Friend removed", UserObj });
        } else {
          resp.json(UserObj);
        }
      })
      .catch((error) => resp.status(400).json(error));
  },
};

module.exports = UserCon;
