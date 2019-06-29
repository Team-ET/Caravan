const axios = require('axios');


const { User, Group, Message, User_group, Values, Photo } = require('../database/index.js');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;



// function for storing user in db
const storeUser = (name, email, picture, pers_test, pers_percent) => User.findOrCreate({
  where: { email },
  defaults: { name, email, picture, pers_test, pers_percent }
});
//function for storing group in db
const storeGroup = (name, destination, date_start, date_end) => Group.findOrCreate({
  where: { name },
  defaults: { name, destination, date_start, date_end }
});
//function for storing photo
const storePhoto = async (photo) => {
  const imageObj = {
    image: photo.url
  }
  return Photo.create(imageObj);
};

const findPhotos = (photo) => {
  return Photo.findAll({})
};
// store a message
const storeMessage = message => {
  Message.create({ message });
}
// get all of a group's messages
const getMessages = groupId => {
  return Message.findAll({
    where: { groupId }
  })
}
//function for getting all Groups from the db
const findAllGroups = groups =>
 Group.findAll({
 });
// function for getting all Users from the db
const findAllUsers = (users) =>
 User.findAll(
 );

// find user by email
const findUser = email => User.findOne({
  where: { email }
});

// find group by id
const findGroup = id => Group.findOne({
  where: { id }
});

// find group by groupId

// get user groups by user id
const findUserGroups = userId => User_group.findAll({
    attributes: ['groupId'],
    where: { userId }
});

// get users by group id
const findGroupUsers = groupId => User_group.findAll({
    attributes: ['userId'],
    where: { groupId: groupId }
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

// check if user is a member of a group
const isGroupMember = (name, groupId) => {
  console.log('hi');
  // User.findOne({
  //   where: { name: name }
  // })
  // .then(user => User_group.findAll({groupId: groupId}))
  // .then(userGroups => console.log(userGroups))
  // .catch(err => console.error(err));
}

module.exports = {
  storeUser,
  storeGroup,
  getMessages,
  findAllGroups,
  findAllUsers,
  findUser,
  findGroup,
  findUserGroups,
  findGroupUsers,
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
  isGroupMember
};