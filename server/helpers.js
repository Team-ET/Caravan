const { User, Group, Message, User_group, Values, Photo } = require('../database/index.js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

//storing user in db
const storeUser = (id_api, name, picture) => User.findOrCreate({
  where: { id_api },
  defaults: { id_api, name, picture }
});
//function for storing group in db
const storeGroup = (name, destination, date_start, date_end, picture) => Group.findOrCreate({
  where: { name },
  defaults: { name, destination, date_start, date_end, picture }
});

//storing user id and group id in User_group table; adding user to a group
const addUserToGroup = (userId, groupId, pending) => User_group.findOrCreate({
  where: { userId, groupId },
  defaults: { userId, groupId, pending }
});

//storing photo
const storePhoto = async (photo) => {
  const imageObj = {
    image: photo.url
  }
  return Photo.create(imageObj);
};

// store a message
const storeMessage = message => {
  const { text, username, groupId } = message;
  console.log(message);
  Message.create({
    text,
    username,
    groupId
  });
}

const findPhotos = () => {
  return Photo.findAll({})
};

// get all of a group's messages
const getMessages = groupId => {
  return Message.findAll({
    where: { groupId }
  })
}

//function for getting all Groups from the db
const findAllGroups = () =>
Group.findAll({
});

// function for getting all Users from the db
const findAllUsers = () =>
User.findAll(
);

// find user by email
const findUser = id_api => User.findOne({
  where: { id_api }
});

// find user by user id
const findUserById = id => User.findOne({
  where: { id }
});

// find group by id
const findGroup = id => Group.findOne({
  where: { id }
});

// find group by groupId

// get user groups by user id
const findUserGroups = userId => User_group.findAll({
    attributes: ['groupId'],
    where: { userId, pending: false }
});

// get users by group id
const findPendingUsers = groupIds => User_group.findAll({
    attributes: ['userId', 'groupId'],
    where: {
      groupId: {
        [Op.or]: groupIds
      },
      pending: true
    }
  });

// update status of pending in user groups from true to false
const updateGroup = (userId, groupId) => {
  return User_group.update({
    pending: false
  },
  {
    returning: true,
    where: {userId, groupId}
  }
)};

const findGroupUsers = groupId => User_group.findAll({
  where: { groupId, pending: false }
});

const findGroups = groupIds => {
  return Group.findAll({ // find all
    where: {
      id: {
        [Op.or]: groupIds
      }
    }
  })
}

const findUsers = userIds => {
  return User.findAll({ // find all users
    where: {
      id: {
        [Op.or]: userIds
      }
    }
  })
};

const getUserValues = userId =>
  Values.findOne({ where: { userId }})
  .then(user => user.id);

// handle angular client errors
function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' })
  } else {
    next(err)
  }
}

function userMatch(group, user) {
  // need to account for 0, need to account for no matches at all
  
  let counter = 0;
  if (user.tradition - 10 >= group.tradition) {
    counter++;
  } if (user.achievement - 10 >= group.achievement) {
    counter++;
  }
  if (user.pleasure - 10 >= group.pleasure) {
    counter++;
  }
  if (user.stimulation - 10 >= group.stimulation) {
    counter++;
  }
  if (user.helpfulness - 10 >= group.stimulation) {
    counter++;
  } 

  if (counter >= 3) {
    return console.log('Matched!');
  } else {
    return console.log('Not Matched!');
  }
}
//lets make some helper functions for find these photos BOIIIIIIIIII******************************************************************************
//user this function for testing, once it works, then test with findUserPhoto
const findAllPhotos = (photo) => {
  return Photo.findAll({});
}
//this should be your MAIN function for finding all the users Photos, export once you start testing
const findUserPhoto = (photo) => {
  Photo.findAll({
    where: {
      id: {
        [Op.or]: userId
      }
    }
  })
}
//once finding the user's photos by Id, this should work for the group Id's, will need to check, but make sure the user's phots are working first
// dont forget that you will need to adjust your tables in the db in order to handle the group photos, should follow the same format as user photos
const findGroupPhoto = (photo) => {
  Photo.findAll({
    where: {
      id: {
        [Op.or]: groupId
      }
    }
  })
}

module.exports = {
  storeUser,
  storeGroup,
  getMessages,
  addUserToGroup,
  updateGroup,
  findAllGroups,
  findAllUsers,
  findUser,
  findUserById,
  findGroup,
  findUserGroups,
  findGroupUsers,
  findPendingUsers,
  findGroups,
  findUsers,
  getUserValues,
  clientErrorHandler,
  userMatch,
  findAllPhotos,
  findUserPhoto,
  findGroupPhoto,
  storePhoto,
  findPhotos,
  storeMessage,
};