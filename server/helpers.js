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
// function for getting all User's Groups from the db
const findUserGroups = userGroups => User_group.findAll({});
//need to change this function to get a specifi users values/personality traits
const getUserValues = userId =>
  Values.findAll({});

// function for getting the avg of a group, for using when comparing the matching alogrithim
const groupAvg = (array) => {
  return array.reduce((total, curr) => {
    return {
      tradition: Math.trunc((total.tradition + curr.tradition) / array.length), 
      achievement: Math.trunc((total.achievement + curr.achievement) / array.length),
      pleasure: Math.trunc((total.pleasure + curr.pleasure) / array.length),
      stimulation: Math.trunc((total.stimulation + curr.stimulation) / array.length),
      helpfulness: Math.trunc((total.helpfulness + curr.helpfulness) / array.length),
    }
  })
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
  groupAvg,
  getUserValues,
  userMatch,
};