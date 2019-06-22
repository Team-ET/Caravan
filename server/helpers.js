const axios = require('axios');

const { User, Group, User_Group, Interest, Int_User } = require('../database/index.js');

const Sequelize = require('sequelize');
const Op = Sequelize.Op; 

const storeUser = (name, email, picture, pers_test, pers_percent) => User.findOrCreate({
  where: { email },
  defaults: { name, email, picture, pers_test, pers_percent } 
});

const storeGroup = (name, destination, date_start, date_end) => Group.findOrCreate({
  where: { name },
  defaults: { name, destination, date_start, date_end }
});

const findAllGroups = groups =>
 Group.findAll({
   where: {
     id: {
       [Op.or]: groups
     }
   }
 });

module.exports = {
  storeUser,
  storeGroup,
  findAllGroups,
};