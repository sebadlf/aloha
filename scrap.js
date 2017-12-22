/* eslint-disable no-await-in-loop,  no-plusplus, prefer-destructuring */

const $ = require('cheerio');
const axios = require('axios');
const fs = require('fs');
const slug = require('slug');

const homeUrl = 'https://www.cabanias.com.ar';

async function getData(url) {
  // console.log(url);

  let result = '';

  try {
    const response = await axios.get(url);
    result = response.data;
  } catch (ex) {
    result = {
      error: ex.message,
    };
  }

  return result;
}

async function getMail(urlOriginal) {
  /** ************** */
  // MAIL
  const patternMail = /[A-Za-z0-9._-]+@[A-Za-z0-9._-]+\.[A-Za-z.]{2,3}/;

  const urls = [
    urlOriginal,
    `${urlOriginal}/contacto`,
    `${urlOriginal}/contacto.html`,
    `${urlOriginal}/contacto.php`,
    `${urlOriginal}/contact`,
    `${urlOriginal}/contact.html`,
    `${urlOriginal}/contact.php`,
    `${urlOriginal}/consultas`,
    `${urlOriginal}/consultas.html`,
    `${urlOriginal}/consultas.php`,
    `${urlOriginal}/contactenos`,
    `${urlOriginal}/contactenos.html`,
    `${urlOriginal}/contactenos.php`,
    `${urlOriginal}/reservas`,
    `${urlOriginal}/reservas.html`,
    `${urlOriginal}/reservas.php`,
  ];

  let i = 0;
  let mail = '';
  while (i < urls.length && mail === '') {
    const url = urls[i];

    const pagina = await getData(url);

    const resultMail = patternMail.exec(pagina);

    if (resultMail && resultMail.length) {
      mail = resultMail[0];
    }

    i++;
  }

  return mail;
  /** ************** */
}

async function main() {
  const homePage = await getData(homeUrl);
  const cityLinks = $('li.subregiones-flechita a', homePage);

  let cities = [];
  cityLinks.each((i, link) => {
    // console.log($(link).html());
    cities.push({
      name: $(link).text(),
      url: `${homeUrl}/${$(link).attr('href')}`,
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
        // region,
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

  for (let i = 0; i < locations.length; i++) {
  // for (let i = 0; i < 5; i++) {
    const location = locations[i];

    console.log(location.url);

    const locationPage = await getData(location.url);

    const region = $('.nombre-region', locationPage).text().trim();
    const localidad = $('.FichaAsideLocalidades a', locationPage).text().trim();

    location.region = region;
    location.localidad = localidad;

    const locationPageImgs = $('a.foto-complejo', locationPage);
    const locationPageData = $('.info-ficha section', locationPage);

    const imgs = [];
    locationPageImgs.each((k, locationPageImg) => {
      imgs.push(`${homeUrl}/${$(locationPageImg).attr('href')}`);
    });

    const data = {};
    locationPageData.each((k, locationPageKey) => {
      const elem = $(locationPageKey);

      const key = elem.find('mark').text().replace(':', '').trim();
      const value = elem.text().replace(elem.find('mark').text(), '').trim();

      data[slug(key).toLocaleLowerCase()] = {
        key,
        value,
      };

      // console.log(slug(key));
    });

    if (false && data['mas-info']) {
      const url = `http://${data['mas-info'].value}`;

      console.log('web: ', url);

      const pagina = await getData(url);

      if (!pagina.error) {
        const mail = await getMail(url);

        console.log('mail: ', mail);

        if (mail) {
          data.mail = {
            key: 'mail',
            value: mail,
          };
        }
      } else {
        data['pagina-status'] = {
          key: 'pagina-status',
          value: pagina.error,
        };
        console.log(pagina.error);
      }
    }

    /** ************** */
    // GPS
    const pattern = /gps:"[^"]+/;

    const result = pattern.exec(locationPage);

    if (result && result.length) {
      const clean = result[0].replace('gps:"', '');

      const [lat, long] = clean.split(',');

      data.latitud = {
        key: 'latitud',
        value: lat.trim(),
      };
      data.longitud = {
        key: 'longitud',
        value: long.trim(),
      };
    }
    /** ************** */

    /** ************** */
    // MAPA
    const patternMapa = /[^"]+\.mapa\.[^"]+/;

    const resultMapa = patternMapa.exec(locationPage);

    if (resultMapa && resultMapa.length) {
      data.mapa = {
        key: 'mapa',
        value: resultMapa[0],
      };
    }
    /** ************** */

    location.data = data;
    location.imgs = imgs;
  }


  fs.writeFileSync('./locations.json', JSON.stringify(cities));

  return cities;
}

main();

