const $ = require('cheerio');
const axios = require('axios');

const homeUrl = 'https://www.cabanias.com.ar/';


async function getData(url) {
  let result = '';

  try {
    const response = await axios.get(url);
    result = response.data;
  } catch (ex) {
    result = ex;
  }

  return result;
}

async function main() {
  const homePage = await getData(homeUrl);
  const links = $('li.subregiones-flechita a', homePage);

  const pages = [];
  links.each((i, link) => {
    // console.log($(link).html());
    pages.push($(link).attr('href'));
  });

  links.each(async (i, elem) => {
    const pagina = $(elem).attr('href');
    console.log('--------', pagina);

    const cityPage = await getData(homeUrl + pagina);
    const cityPageLinks = $('.listado-todos .layout-33 ul li div a', cityPage);

    cityPageLinks.each(async (j, cityPageLink) => {
      console.log($(cityPageLink).attr('href'));
    });
  });
  // const ciudades = links.map((i, link) => $(link).html());

  // console.log($(ciudades));

  // links.each(async (i, elem) => {
  //   const pagina = $(elem).attr('href');
  //   console.log('--------', pagina);

  //   const cityPage = await getData(homeUrl + pagina);
  //   const cityPageLinks = $('.listado-todos .layout-33 ul li div a', cityPage);

  //   cityPageLinks.each(async (j, cityPageLink) => {
  //     console.log($(cityPageLink).attr('href'));
  //   });
  // });

  return 'a';
}

main();


// axios.get(url)
//   .then((response) => {
//     const links = $('li.subregiones-flechita a', response.data);

//     links.each((i, elem) => {
//       const pagina = $(elem).attr('href');


//       axios.get(url + pagina)
//         .then((responsePagina) => {
//           const links = $('.listado-todos .layout-33 ul li div', responsePagina.data);

//           links.each((i, elem) => {
//             const pagina = $(elem).attr('href');
//           });
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     });
//   })
//   .catch((error) => {
//     console.log(error);
//   });
