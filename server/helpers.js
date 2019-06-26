const axios = require('axios');

const { User, Group, User_group, Interest, Int_User, Values } = require('../database/index.js');

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
  return Group.findAll({ // find all movies that match the given id's in the movieDbArr
    where: {
      id: {
        [Op.or]: groupIds
      }
    }
  })
}

const findUsers = userIds => {
  return User.findAll({ // find all movies that match the given id's in the movieDbArr
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
  let counter = 0;
  if (user.tradition === group.tradition) {
    counter++;
  } if (user.achievement === group.achievement) {
    counter++;
  }
  if (user.pleasure === group.pleasure) {
    counter++;
  }
  if (user.stimulation === group.stimulation) {
    counter++;
  }
  if (user.helpfulness === group.stimulation) {
    counter++;
  } 

  if (counter >= 3) {
    return console.log('Matched!');
  } else {
    return console.log('Not Matched!');
  }
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
};