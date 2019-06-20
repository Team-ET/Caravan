xwconst axios = require('axios');

const { User, Group, User_Group, Interest, Int_User } = require('../database/index.js');

const Sequelize = require('sequelize');

const storeUser = (name, email, picture, pers_test, pers_percent) => User.findOrCreate({
  where: { email },
  defaults: { name, email, picture, pers_test, pers_percent } 
});

const storeGroup = (name, destination, date_start, date_end) => Group.findOrCreate({
  where: { name },
  defaults: { name, destination, date_start, date_end }
});


module.exports = {
  storeUser,
  storeGroup
};