/* eslint-disable no-await-in-loop,  no-plusplus */
const {
  db, cabanaCity, cabanaLocation, cabanaImg,
} = require('./db');

const fs = require('fs');
const slug = require('slug');

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
        region: location.region,
        regionSlug: slug(location.region).toLocaleLowerCase(),
        localidad: location.localidad,
        localidadSlug: slug(location.localidad).toLocaleLowerCase(),
        name: location.name,
        url: location.url,

        temporada: location.data.temporada ? location.data.temporada.value : null,
        'cantidad-de-cabanas': location.data['cantidad-de-cabanas'] ? location.data['cantidad-de-cabanas'].value : null,
        'pax-por-cabana': location.data['pax-por-cabana'] ? location.data['pax-por-cabana'].value : null,
        precios: location.data.precios ? location.data.precios.value : null,
        servicios: location.data.servicios ? location.data.servicios.value : null,
        'recreacion-en-la-zona': location.data['recreacion-en-la-zona'] ? location.data['recreacion-en-la-zona'].value : null,
        direccion: location.data.direccion ? location.data.direccion.value : null,
        'distancia-aproximada-a-buenos-aires': location.data['distancia-aproximada-a-buenos-aires'] ? location.data['distancia-aproximada-a-buenos-aires'].value : null,
        telefono: location.data.telefono ? location.data.telefono.value : null,
        'mas-info': location.data['mas-info'] ? location.data['mas-info'].value : null,
        mapa: location.data.mapa ? location.data.mapa.value : null,
        'coordenadas-gps': location.data['coordenadas-gps'] ? location.data['coordenadas-gps'].value : null,
        latitud: location.data.latitud ? location.data.latitud.value : null,
        longitud: location.data.longitud ? location.data.longitud.value : null,
        promo: location.data.promo ? location.data.promo.value : null,
        facebook: location.data.facebook ? location.data.facebook.value : null,
        'cantidad-de-habitaciones': location.data['cantidad-de-habitaciones'] ? location.data['cantidad-de-habitaciones'].value : null,
        'pax-por-habitacion': location.data['pax-por-habitacion'] ? location.data['pax-por-habitacion'].value : null,
        twitter: location.data.twitter ? location.data.twitter.value : null,
        instagram: location.data.instagram ? location.data.instagram.value : null,
      });

      // const keys = Object.keys(location.data);

      // for (let k = 0; k < keys.length; k++) {
      //   const key = keys[k];

      //   await cabanaData.create({
      //     cabanaLocationId: cabanaLocationDb.id,
      //     slug: key,
      //     title: location.data[key].key,
      //     text: location.data[key].value,
      //   });
      // }

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

