const Sequelize = require('sequelize');

const sequelize = new Sequelize('aloha', 'aloha', 'Al0h@123', {
  host: '165.227.73.154',
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
  name: Sequelize.STRING(500),
  url: Sequelize.STRING(255),
});

const cabanaLocation = sequelize.define('cabanaLocation', {
  cityName: Sequelize.STRING(255),

  region: Sequelize.STRING(500),
  regionSlug: Sequelize.STRING(500),
  localidad: Sequelize.STRING(500),
  localidadSlug: Sequelize.STRING(500),

  name: Sequelize.STRING(500),
  url: Sequelize.STRING(255),
});

const cabanaData = sequelize.define('cabanaData', {
  slug: Sequelize.STRING(255),
  title: Sequelize.STRING(255),
  text: Sequelize.STRING(8000),
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

module.exports = {
  db: sequelize,
  cabanaCity,
  cabanaLocation,
  cabanaData,
  cabanaImg,
};

