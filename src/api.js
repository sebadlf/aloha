const express = require('express');

const router = express.Router();
const { cabanaCity } = require('../db');

const getAll = async () => cabanaCity.findAll({
//   where: {
//     authorId: 2,
//   },
});

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const cities = await getAll();

  res.send(cities);
});

module.exports = router;
