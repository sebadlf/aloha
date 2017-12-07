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

const cabanaCity = sequelize.define('cabanaCity', {
  name: Sequelize.STRING(255),
  url: Sequelize.STRING(255),
});

const cabanaLocation = sequelize.define('cabanaLocation', {
  cityName: Sequelize.STRING(255),
  name: Sequelize.STRING(255),
  url: Sequelize.STRING(255),
});

const cabanaData = sequelize.define('cabanaData', {
  temporada: Sequelize.STRING(255),
  cantidad: Sequelize.STRING(255),
  pax: Sequelize.STRING(255),
  precios: Sequelize.STRING(255),
});

const cabanaImg = sequelize.define('cabanaImg', {
  url: Sequelize.STRING(255),
});

cabanaCity.hasMany(cabanaLocation);
cabanaLocation.belongsTo(cabanaCity);

cabanaLocation.hasMany(cabanaData);
cabanaData.belongsTo(cabanaLocation);

cabanaLocation.hasMany(cabanaImg);
cabanaImg.belongsTo(cabanaLocation);

sequelize.sync()
  .then(() => {
    console.log('done');
  });

module.exports = {
  db: sequelize,
  cabanaCity,
  cabanaLocation,
  cabanaData,
  cabanaImg,
};

