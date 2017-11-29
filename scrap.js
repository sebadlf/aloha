const $ = require('cheerio');
const axios = require('axios');

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

  let locations = cities.reduce((acc, city) => acc.concat(city.locations), []);

  locations = await Promise.all(locations.map(async (location) => {
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

    const result = Object.assign(
      {},
      location, {
        data,
        imgs,
      },
    );

    return result;
  }));

  return locations;
}

main();

