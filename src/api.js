const express = require('express');

const router = express.Router();
const {
  cabanaCity, cabanaLocation, cabanaData, cabanaImg,
} = require('../db');

const getAll = async () => cabanaCity.findAll({
//   where: {
//     authorId: 2,
//   },
});

const getCity = async cityId => cabanaCity.findAll({
  where: {
    id: cityId,
  },
  include: [{
    model: cabanaLocation,
    include: [cabanaImg],
  }],
});

const getLocation = async locationId => cabanaLocation.findAll({
  where: {
    id: locationId,
  },
  include: [{
    model: cabanaData,
  }, {
    model: cabanaImg,
  }],
});

/* GET city listing. */
router.get('/cities', async (req, res, next) => {
  const cities = await getAll();

  res.send(cities);
});

/* GET city. */
router.get('/city/:id', async (req, res, next) => {
  const city = await getCity(req.params.id);

  res.send(city);
});

/* GET city. */
router.get('/location/:id', async (req, res, next) => {
  const location = await getLocation(req.params.id);

  res.send(location);
});

module.exports = router;
