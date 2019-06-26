const axios = require('axios');

const { User, Group, User_group, Values, Message, Photo } = require('../database/index.js');

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
    where: { groupId }
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
  Photo.findAll({});
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
};