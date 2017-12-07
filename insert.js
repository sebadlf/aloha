/* eslint-disable no-await-in-loop,  no-plusplus */
const {
  db, cabanaCity, cabanaLocation, cabanaImg,
} = require('./db');

const fs = require('fs');
const { eachLimit } = require('async');


async function insert() {
  const data = fs.readFileSync('./locations.json');
  const json = JSON.parse(data);

  for (let i = 0; i < json.length; i++) {
    const city = json[i];

    const cabanaCityDb = await cabanaCity.create({
      name: city.name.trim(),
      url: city.url.trim(),
    });

    for (let j = 0; j < city.locations.length; j++) {
      const location = city.locations[j];

      const cabanaLocationDb = await cabanaLocation.create({
        cabanaCityId: cabanaCityDb.id,
        cityName: location.cityName,
        name: location.name,
        url: location.url,

        temporada: location.data.Temporada,
        cantidad: location.data['Cantidad de cabañas'],
        pax: location.data['Pax por cabaña'],
        precios: location.data.Precios,
      });

      for (let k = 0; k < location.imgs.length; k++) {
        const img = location.imgs[k];

        await cabanaImg.create({
          cabanaLocationId: cabanaLocationDb.id,
          url: img,
        });
      }
    }
  }


  // json.forEach(await (city) => {
  //   cabanaCity.create({
  //     name: city.name.trim(),
  //     url: city.url.trim(),
  //   }).then((cityDb) => {
  //     city.locations.forEach((location) => {
  //       cabanaLocation.addCabanaLocation({
  //         cityName: location.cityName,
  //         name: location.name,
  //         url: location.url,


  //       // location.data.forEach((data) => {

  //       // });
  //       // location.imgs.forEach((img) => {

  //       // });
  //       });
  //     });
  //   });
  // });
}

db.sync({ force: true })
  .then(() => {
    insert();
  });


// console.log(json);

