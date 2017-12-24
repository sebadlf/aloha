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
  group: Sequelize.STRING(255),
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

  temporada: Sequelize.STRING(255),
  'cantidad-de-cabanas': Sequelize.STRING(500),
  'pax-por-cabana': Sequelize.STRING(255),
  precios: Sequelize.STRING(2000),
  servicios: Sequelize.STRING(6000),
  'recreacion-en-la-zona': Sequelize.STRING(2000),
  direccion: Sequelize.STRING(1000),
  'distancia-aproximada-a-buenos-aires': Sequelize.STRING(50),
  telefono: Sequelize.STRING(500),
  'mas-info': Sequelize.STRING(255),
  mapa: Sequelize.STRING(255),
  'coordenadas-gps': Sequelize.STRING(255),
  latitud: Sequelize.STRING(20),
  longitud: Sequelize.STRING(20),
  promo: Sequelize.STRING(2000),
  facebook: Sequelize.STRING(255),
  'cantidad-de-habitaciones': Sequelize.STRING(50),
  'pax-por-habitacion': Sequelize.STRING(50),
  twitter: Sequelize.STRING(50),
  instagram: Sequelize.STRING(50),
});

const cabanaImg = sequelize.define('cabanaImg', {
  url: Sequelize.STRING(255),
});

cabanaCity.hasMany(cabanaLocation);
cabanaLocation.belongsTo(cabanaCity);

cabanaLocation.hasMany(cabanaImg);
cabanaImg.belongsTo(cabanaLocation);

module.exports = {
  db: sequelize,
  cabanaCity,
  cabanaLocation,
  cabanaImg,
};

