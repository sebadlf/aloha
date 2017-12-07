const {
  cabanaCity, cabanaLocation, cabanaData, cabanaImg,
} = require('./db');

const fs = require('fs');
const { eachLimit } = require('async');

const data = fs.readFileSync('./locations.json');
const json = JSON.parse(data);

json.forEach((city) => {
  cabanaCity.create({
    name: city.name.trim(),
    url: city.url.trim(),
  }).then((cityDb) => {
    city.locations.forEach((location) => {
      cabanaLocation.addCabanaLocation({
        cityName: location.cityName,
        name: location.name,
        url: location.url,


      // location.data.forEach((data) => {

      // });
      // location.imgs.forEach((img) => {

      // });
      });
    });
  });
});

// console.log(json);

