const express = require('express');

const router = express.Router();
const { cabanaCity, cabanaLocation, cabanaImg } = require('../db');

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

module.exports = router;
