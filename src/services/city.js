const { cabanaCity } = require('../../db');

export const getAll = async () => cabanaCity.findAll({
//   where: {
//     authorId: 2,
//   },
});

