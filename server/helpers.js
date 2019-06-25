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
// function for getting all User's Groups by email
// const findUserGroups = email => User.findOne({
//   where: { 
//     email : email
//   }
// })
//   .then(user => User_group.findAll({
//     attributes: ['groupId'],
//     where: {
//       userId: user.userId
//   }
// }));

// // get users by group id
// const findGroupUsers = groupId => Group.findAll({
//     attributes: ['userId'],
//     where: {
//       id: groupId
//     }
//   });

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
  findUserGroups,
  getUserValues,
<<<<<<< HEAD
  clientErrorHandler
=======
  userMatch,
>>>>>>> f7776e8cef7ed6c4aafcb93c9101816396091614
};