const Sequelize = require('sequelize');
// making connection to db
// const bcrypt = require('bcrypt');

const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.USERNAME, process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: 'mssql',
  dialectOptions: {
    options: {
      encrypt: true,
    }
  } 
});
//checking for connection, can be commented out once you know connection is made
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
});

// used for creating tables, make sure to turn off once tables are set, otherwise it will clear the whole table
// sequelize.sync({
//   force: true, // Drops info in database for testing
// })

//table for user
const User = sequelize.define('user', {
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  picture: Sequelize.STRING,
});

// table for group
const Group = sequelize.define('group', {
  name: Sequelize.STRING,
  destination: Sequelize.STRING,
  date_start: Sequelize.STRING,
  date_end: Sequelize.STRING,
});

//joined table for users in groups many to many
const User_group = sequelize.define('user_group', {});
User_group.belongsTo(User);
User_group.belongsTo(Group);

//interest for user
const Interest = sequelize.define('interest', {
  name: Sequelize.STRING
});

const Values = sequelize.define('values', {
  tradition: Sequelize.INTEGER,
  achievement: Sequelize.INTEGER,
  pleasure: Sequelize.INTEGER,
  stimulation: Sequelize.INTEGER,
  helpfulness: Sequelize.INTEGER,
})

// interst for user, many to many
const Int_user = sequelize.define('int_group', {});
Int_user.belongsTo(User);
Int_user.belongsTo(Interest);

module.exports = { User, Group, User_group, Interest, Int_user, Values }; 