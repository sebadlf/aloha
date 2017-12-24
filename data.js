/* eslint-disable no-await-in-loop,  no-plusplus */
const fs = require('fs');

async function insert() {
  const allKeys = {};

  const data = fs.readFileSync('./locations.json');
  const json = JSON.parse(data);

  for (let i = 0; i < json.length; i++) {
    const city = json[i];

    for (let j = 0; j < city.locations.length; j++) {
      const location = city.locations[j];

      const keys = Object.keys(location.data);

      for (let k = 0; k < keys.length; k++) {
        const key = keys[k];


        if (!allKeys[key]) {
          allKeys[key] = location.data[key].value.length;
        } else if (allKeys[key].length < location.data[key].value.length) {
          allKeys[key] = location.data[key].value.length;
        }
      }
    }
  }

  console.log(allKeys);

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

insert();


// console.log(json);

