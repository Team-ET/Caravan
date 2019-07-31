const Sequelize = require('sequelize');

const sequelize = new Sequelize('CaravanAppDB', 'TeamET', 'Halleb0t748!', {
  host: 'caravandbserver.database.windows.net',
  dialect: 'mssql',
  dialectOptions: {
    options: {
      encrypt: true,
    }
  }
});

//checking for connection
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

// user schema
const User = sequelize.define('user', {
  id_api: Sequelize.STRING,
  name: Sequelize.STRING,
  picture: Sequelize.STRING,
});

// group schema
const Group = sequelize.define('group', {
  name: Sequelize.STRING,
  destination: Sequelize.STRING,
  date_start: Sequelize.STRING,
  date_end: Sequelize.STRING,
  picture: Sequelize.STRING,
});

// join for users and groups
const User_group = sequelize.define('user_group', {
  pending: Sequelize.BOOLEAN
});
User_group.belongsTo(User);
User_group.belongsTo(Group);

// move these values into user schema
const Values = sequelize.define('values', {
  tradition: Sequelize.INTEGER,
  achievement: Sequelize.INTEGER,
  enjoyment: Sequelize.INTEGER,
  stimulation: Sequelize.INTEGER,
  helpfulness: Sequelize.INTEGER,
})
// adding a user id to values
Values.belongsTo(User);

// schema for photoalbum
const Photo = sequelize.define('photo', {
  image: Sequelize.STRING,
})
// adding user id to photos
Photo.belongsTo(User);

// schema for group messages
const Message = sequelize.define('message', {
  text: Sequelize.STRING,
  username: Sequelize.STRING
});
// adding user id and group id to each message
Message.belongsTo(User);
Message.belongsTo(Group);

const Reviews = sequelize.define('reviews', {
  stars: Sequelize.INTEGER,
  comment: Sequelize.STRING,
  reviewer: Sequelize.STRING,
});
Reviews.belongsTo(User);

const References = sequelize.define('references', {
  comment: Sequelize.STRING,
  referrer: Sequelize.STRING
});
References.belongsTo(User);

module.exports = { User, Group, User_group, Values, Message, Photo };
