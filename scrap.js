const $ = require('cheerio');
const axios = require('axios');
const { mapLimit } = require('async');
const fs = require('fs');
const prettyjson = require('prettyjson');

const homeUrl = 'https://www.cabanias.com.ar';


async function getData(url) {
  console.log(url);

  let result = '';

  try {
    const response = await axios.get(url);
    result = response.data;
  } catch (ex) {
    result = ex;
    console.log(ex);
  }

  return result;
}

async function main() {
  const homePage = await getData(homeUrl);
  const cityLinks = $('li.subregiones-flechita a', homePage);

  let cities = [];
  cityLinks.each((i, link) => {
    // console.log($(link).html());
    cities.push({
      name: $(link).text(),
      url: homeUrl + $(link).attr('href'),
      locations: [],
    });
  });

  cities = await Promise.all(cities.map(async (city) => {
    const cityPage = await getData(city.url);
    const cityPageLocations = $('.listado-todos .layout-33 ul li div:not(.clearfix)', cityPage);

    cityPageLocations.each(async (j, cityPageLocation) => {
      const link = $(cityPageLocation).find('a.nombre-complejo-trigger');
      const name = link.text();
      const url = homeUrl + link.attr('href');
      const cityName = $(cityPageLocation).find('span').text();

      city.locations.push({
        cityName,
        name,
        url,
        data: {},
        imgs: [],
      });
    });

    return city;
  }));

  const locations = cities.reduce((acc, city) => acc.concat(city.locations), []);

  // ...or ES2017 async functions
  mapLimit(locations, 50, async (location) => {
    const locationPage = await getData(location.url);
    const locationPageImgs = $('a.foto-complejo', locationPage);
    const locationPageData = $('.info-ficha div.layout-75 section', locationPage);

    const imgs = [];
    locationPageImgs.each((k, locationPageImg) => {
      imgs.push(homeUrl + $(locationPageImg).attr('href'));
    });

    const data = {};
    locationPageData.each((k, locationPageKey) => {
      const elem = $(locationPageKey);

      const key = elem.find('mark').text().replace(':', '').trim();
      const value = elem.text().replace(elem.find('mark').text(), '').trim();

      data[key] = value;
    });

    location.data = data;
    location.imgs = imgs;


    // const result = Object.assign(
    //   {},
    //   location, {
    //     data,
    //     imgs,
    //   },
    // );

    return location;
  }, (err, results) => {
    if (err) throw err;
    // results is now an array of the response bodies
    // console.log(results);

    fs.writeFileSync('./locations.json', JSON.stringify(cities));
  });

  return locations;
}

main();

