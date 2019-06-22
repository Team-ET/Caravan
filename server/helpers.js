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

const getUserValues = userId =>
  Values.findOne({ where: { userId }})
  .then(user => user.id)

// function for getting the avg of a group, for using when comparing the matching alogrithim
const groupAvg = (array) => {
  return array.reduce((total, curr) => {
    return {
      tradition: Math.trunc((total.tradition + curr.tradition) / person1.length), 
      achievement: Math.trunc((total.achievement + curr.achievement) / person1.length),
      pleasure: Math.trunc((total.pleasure + curr.pleasure) / person1.length),
      stimulation: Math.trunc((total.stimulation + curr.stimulation) / person1.length),
      helpfulness: Math.trunc((total.helpfulness + curr.helpfulness) / person1.length),
    }
  })
}

module.exports = {
  storeUser,
  storeGroup,
  findAllGroups,
  findAllUsers,
  findUserGroups,
  groupAvg,
  getUserValues,
};