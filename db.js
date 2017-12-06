const Sequelize = require('sequelize');

const sequelize = new Sequelize('aloha', 'aloha', 'Aloha123!', {
  host: '192.34.62.22',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },

  operatorsAliases: false,
});

const User = sequelize.define('user', {
  username: Sequelize.STRING,
  birthday: Sequelize.DATE,
});

const cabanas = sequelize.define('user', {
  username: Sequelize.STRING,
  birthday: Sequelize.DATE,
});

// sequelize.sync()
//   .then(() => User.create({
//     username: 'janedoe',
//     birthday: new Date(1980, 6, 20),
//   }))
//   .then((jane) => {
//     console.log(jane.toJSON());
//   });

module.exports = sequelize;

