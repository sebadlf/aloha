const $ = require('cheerio');
const axios = require('axios');

const homeUrl = 'https://www.cabanias.com.ar';


async function getData(url) {
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
  const links = $('li.subregiones-flechita a', homePage);

  let locations = [];
  links.each((i, link) => {
    // console.log($(link).html());
    locations.push({
      name: $(link).text(),
      url: homeUrl + $(link).attr('href'),
      units: [],
    });
  });

  locations = await Promise.all(locations.map(async (location) => {
    const cityPage = await getData(location.url);
    const cityPageLocations = $('.listado-todos .layout-33 ul li div:not(.clearfix)', cityPage);

    cityPageLocations.each(async (j, cityPageLocation) => {
      const link = $(cityPageLocation).find('a.nombre-complejo-trigger');
      const name = link.text();
      const url = homeUrl + link.attr('href');
      const locationName = $(cityPageLocation).find('span').text();

      console.log(name);

      const locationPage = await getData(url);
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

      location.units.push({
        locationName,
        name,
        url,
        data,
        imgs,
      });
    });

    return location;
  }));


  console.log(locations);

  return 'a';
}

main();

